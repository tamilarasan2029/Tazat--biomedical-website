import json
import logging
import os
import re
import smtplib
import sqlite3
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, request

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

DB_PATH = Path(os.environ.get("ENQUIRIES_DB", BASE_DIR / "tazat_enquiries.db"))
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE_RE = re.compile(r"^\+?[0-9 ()-]{7,20}$")
ALLOWED_TYPES = {
    "General enquiry",
    "Calibration",
    "Respiratory rental",
    "Sleep study",
    "Equipment sales",
    "Other",
}
RATE_WINDOW_SECONDS = 600
RATE_LIMIT = 5

app = Flask(__name__)
app.logger.setLevel(logging.INFO)
_recent_requests = defaultdict(deque)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    with conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS web_enquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                enquiry_type TEXT NOT NULL,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                message TEXT,
                details TEXT,
                ip TEXT,
                email_status TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
    conn.close()


init_db()


def client_ip():
    # The Node server adds X-Forwarded-For; fall back to the socket address.
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.remote_addr or "unknown"


def is_rate_limited(ip):
    now = time.time()
    hits = _recent_requests[ip]
    while hits and now - hits[0] > RATE_WINDOW_SECONDS:
        hits.popleft()
    if len(hits) >= RATE_LIMIT:
        return True
    hits.append(now)
    return False


def email_settings():
    user = os.environ.get("SMTP_USER", "").strip()
    return {
        "host": os.environ.get("SMTP_HOST", "").strip(),
        "port": int(os.environ.get("SMTP_PORT", "587")),
        "user": user,
        "password": os.environ.get("SMTP_PASSWORD", ""),
        "use_ssl": os.environ.get("SMTP_USE_SSL", "false").lower() == "true",
        "from": os.environ.get("ENQUIRY_FROM", "").strip() or user,
        "to": os.environ.get("ENQUIRY_TO", "").strip(),
    }


def send_enquiry_email(enquiry, settings):
    lines = [
        f"Enquiry type: {enquiry['enquiry_type']}",
        f"Name: {enquiry['name']}",
        f"Phone: {enquiry['phone']}",
    ]
    for label, value in enquiry["details"].items():
        lines.append(f"{label}: {value}")
    if enquiry["message"]:
        lines.extend(["", "Message:", enquiry["message"]])

    msg = EmailMessage()
    msg["Subject"] = f"Website enquiry: {enquiry['enquiry_type']} from {enquiry['name']}"
    msg["From"] = settings["from"]
    msg["To"] = settings["to"]
    msg.set_content("\n".join(lines) + "\n")

    if settings["use_ssl"]:
        server = smtplib.SMTP_SSL(settings["host"], settings["port"], timeout=20)
    else:
        server = smtplib.SMTP(settings["host"], settings["port"], timeout=20)
        server.starttls()
    with server:
        if settings["user"]:
            server.login(settings["user"], settings["password"])
        server.send_message(msg)


def set_email_status(enquiry_id, status):
    conn = get_db()
    with conn:
        conn.execute("UPDATE web_enquiries SET email_status = ? WHERE id = ?", (status, enquiry_id))
    conn.close()


@app.get("/api/health")
def health():
    return jsonify(status="ok")


@app.post("/api/enquiry")
def create_enquiry():
    if is_rate_limited(client_ip()):
        return jsonify(error="You have sent several enquiries recently. Please wait a few minutes and try again."), 429

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify(error="Send the form as JSON."), 400

    # Honeypot: people never fill in this hidden field, bots often do.
    if data.get("website"):
        return jsonify(ok=True, message="Thank you! Your enquiry has been sent."), 201

    enquiry_type = str(data.get("type", "")).strip()
    name = str(data.get("name", "")).strip()
    phone = str(data.get("phone", "")).strip()
    message = str(data.get("message", "") or "").strip()

    details = {}
    raw_details = data.get("details", {})
    if isinstance(raw_details, dict):
        for key, value in list(raw_details.items())[:15]:
            key = str(key).strip()[:60]
            value = str(value or "").strip()[:300]
            if key and value:
                details[key] = value

    errors = {}
    if enquiry_type not in ALLOWED_TYPES:
        errors["type"] = "Choose a valid enquiry type."
    if not 2 <= len(name) <= 100:
        errors["name"] = "Enter your full name."
    if not PHONE_RE.match(phone):
        errors["phone"] = "Enter a valid phone number."
    if len(message) > 2000:
        errors["message"] = "Keep your message under 2000 characters."
    if not message and not details:
        errors["message"] = "Please add a few details about your enquiry."
    if errors:
        return jsonify(error="Please check the highlighted fields.", errors=errors), 400

    # Save first, so no enquiry is lost if email delivery fails.
    conn = get_db()
    with conn:
        cur = conn.execute(
            """
            INSERT INTO web_enquiries
                (enquiry_type, name, phone, message, details, ip, email_status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                enquiry_type,
                name,
                phone,
                message or None,
                json.dumps(details, ensure_ascii=False) if details else None,
                client_ip(),
                "pending",
                datetime.now(timezone.utc).isoformat(timespec="seconds"),
            ),
        )
        enquiry_id = cur.lastrowid
    conn.close()

    settings = email_settings()
    enquiry = {
        "enquiry_type": enquiry_type,
        "name": name,
        "phone": phone,
        "message": message,
        "details": details,
    }
    try:
        if not settings["host"] or not settings["to"]:
            raise RuntimeError("Email settings are missing. Set SMTP_HOST and ENQUIRY_TO in backend/.env.")
        send_enquiry_email(enquiry, settings)
    except Exception:
        app.logger.exception("Could not send email for enquiry %s", enquiry_id)
        set_email_status(enquiry_id, "failed")
        return jsonify(
            error="We could not send your enquiry right now. Please call us directly, or try again later."
        ), 502

    set_email_status(enquiry_id, "sent")
    return jsonify(ok=True, id=enquiry_id, message="Thank you! Your enquiry has been sent. We will contact you shortly."), 201


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", 5000)), debug=False)
