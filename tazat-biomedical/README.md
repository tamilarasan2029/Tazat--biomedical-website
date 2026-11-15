# TAZAT Biomedical website

Frontend: Node.js (Express) serves the original multi-page TAZAT website and forwards enquiry requests.
Backend: Python (Flask) saves enquiries to SQLite and emails them to the administrator.

## Files you may need to edit

| What | Where |
|---|---|
| Phone, email, address, page text | HTML files in `frontend/public/` (contact details appear in the top bar, footer and contact.html) |
| Email settings and admin address | `backend/.env` (copy from `.env.example`) |
| Photos | None needed. The original design uses SVG and icons. |

## Enquiry emails

1. Copy `backend/.env.example` to `backend/.env`.
2. Fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `ENQUIRY_FROM` and `ENQUIRY_TO`.
   - Gmail needs an app password, not your normal password.
3. Restart the backend.

Every enquiry is saved to `backend/tazat_enquiries.db` before the email is sent. If the email fails, the visitor sees a message asking them to call.

## Run locally

Backend (port 5000):
cd "C:\TAZAT\tazat-biomedical\tazat-biomedical\backend"
    cd backend
    python -m venv .venv
    .venv\Scripts\Activate.ps1      (Mac/Linux: source .venv/bin/activate)
    pip install -r requirements.txt
    python app.py

Frontend (port 3000), in a second terminal:
cd "C:\TAZAT\tazat-biomedical\tazat-biomedical\frontend"
    cd frontend
    npm install
    npm start

Open http://localhost:3000

## Production notes

- Run Flask with gunicorn: `gunicorn -w 2 -b 127.0.0.1:5000 app:app`
- Run Node with pm2 or similar, behind nginx with HTTPS.
- Enquiry submissions are limited to 5 per IP every 10 minutes.
- SMTP credentials stay on the server and are never sent to the browser.

## Before launch

See the checklist at the bottom of `frontend/public/README.txt`.
