// Reusable enquiry form. Each form sends its data to POST /api/enquiry.
import { esc, notify } from './ui.js';

const registry = new Map();

/*
  fields: [{ key, label, type, options, required, placeholder, wide, role }]
  role: 'name' | 'phone' | 'message' marks the value the backend needs.
        Any other field is sent in "details" under its label.
*/
export function enquiryForm({ id, type, title, intro, fields, submit = 'Send enquiry', note = '' }) {
  registry.set(id, { type, fields });
  const rows = fields.map((f) => fieldHtml(id, f)).join('');
  return `<form class="enquiry-form reveal" data-form="${esc(id)}" novalidate>
    ${title ? `<h3>${esc(title)}</h3>` : ''}
    ${intro ? `<p class="form-intro">${esc(intro)}</p>` : ''}
    <div class="form-grid">${rows}</div>
    <div class="hp" aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
    <button class="btn" type="submit">${esc(submit)}</button>
    <p class="form-status" role="status" aria-live="polite"></p>
    ${note ? `<p class="form-note">${esc(note)}</p>` : ''}
  </form>`;
}

function fieldHtml(formId, f) {
  const id = `${formId}-${f.key}`;
  const req = f.required ? ' required' : '';
  const star = f.required ? ' <span class="req">*</span>' : '';
  const ph = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : '';
  const cls = `field${f.wide ? ' wide' : ''}`;
  let control;
  if (f.type === 'select') {
    control = `<select id="${id}" name="${f.key}"${req}>
      <option value="">${esc(f.placeholder || 'Choose')}</option>
      ${f.options.map((o) => `<option>${esc(o)}</option>`).join('')}
    </select>`;
  } else if (f.type === 'textarea') {
    control = `<textarea id="${id}" name="${f.key}" rows="4"${req}${ph} maxlength="2000"></textarea>`;
  } else if (f.type === 'date') {
    control = `<input id="${id}" name="${f.key}" type="date"${req}>`;
  } else {
    const autocomplete = f.type === 'tel' ? ' autocomplete="tel"' : '';
    control = `<input id="${id}" name="${f.key}" type="${f.type || 'text'}"${req}${ph} maxlength="150"${autocomplete}>`;
  }
  return `<div class="${cls}"><label for="${id}">${esc(f.label)}${star}</label>${control}</div>`;
}

// Attach submit handling to every enquiry form inside root.
export function bindEnquiryForms(root) {
  root.querySelectorAll('form[data-form]').forEach((form) => {
    const cfg = registry.get(form.dataset.form);
    if (cfg) form.addEventListener('submit', (e) => submitForm(e, form, cfg));
  });
}

function setStatus(el, text, kind) {
  el.textContent = text;
  el.className = `form-status${kind ? ` is-${kind}` : ''}`;
}

function showError(form, key, message) {
  const input = form.elements[key];
  if (!input) return;
  input.setAttribute('aria-invalid', 'true');
  const p = document.createElement('p');
  p.className = 'field-error';
  p.textContent = message;
  input.parentNode.appendChild(p);
}

async function submitForm(e, form, cfg) {
  e.preventDefault();
  const status = form.querySelector('.form-status');
  const btn = form.querySelector('button[type="submit"]');
  form.querySelectorAll('.field-error').forEach((n) => n.remove());
  form.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));

  const missing = cfg.fields.filter((f) => f.required && !(form.elements[f.key].value || '').trim());
  if (missing.length) {
    missing.forEach((f) => showError(form, f.key, 'This field is required.'));
    setStatus(status, 'Please fill in the highlighted fields.', 'error');
    form.elements[missing[0].key].focus();
    return;
  }

  const payload = { type: cfg.type, name: '', phone: '', message: '', details: {}, website: form.elements.website.value };
  cfg.fields.forEach((f) => {
    const value = (form.elements[f.key].value || '').trim();
    if (!value) return;
    if (f.role) payload[f.role] = value;
    else payload.details[f.label] = value;
  });

  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending…';
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      const text = body.message || 'Thank you! Your enquiry has been sent.';
      form.reset();
      setStatus(status, text, 'success');
      notify(text, true);
    } else {
      Object.entries(body.errors || {}).forEach(([key, msg]) => showError(form, key, msg));
      const text = body.error || 'Something went wrong. Please try again.';
      setStatus(status, text, 'error');
      notify(text, false);
    }
  } catch (err) {
    const text = 'We could not reach the server. Check your connection and try again.';
    setStatus(status, text, 'error');
    notify(text, false);
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
}
