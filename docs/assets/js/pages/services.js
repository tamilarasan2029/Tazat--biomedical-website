import { SERVICE_PAGE, SITE } from '../content.js';
import { r2Page } from './r2-crew.js';
import { button, esc, sectionHead } from '../components/ui.js';

export function servicesPage() {
  return `
  <section class="page-hero"><div class="wrap">
    <div class="kicker">${esc(SERVICE_PAGE.kicker)}</div>
    <h1>${esc(SERVICE_PAGE.title)}</h1>
    <p class="lead">${esc(SERVICE_PAGE.lead)}</p>
    <div class="badge-row">
      ${SERVICE_PAGE.features.map((f) => `<span class="badge">${esc(f)}</span>`).join('')}
      <a class="btn gold small" href="#/contact">Request calibration</a>
    </div>
  </div></section>

  <section class="section">
    <div class="wrap">
      ${sectionHead('Our services', 'Calibration services we provide')}
      <div class="grid-3">
        ${SERVICE_PAGE.services.map((s) => `
        <article class="card reveal hover-lift">
          <h3>${esc(s.name)}</h3>
          <p class="card-sub">${esc(s.text)}</p>
          <p style="margin:1.25rem 0 0">${button('#/contact', 'Explore More', 'outline')}</p>
        </article>`).join('')}
      </div>
    </div>
  </section>

  ${r2Page()}

  <section class="section soft">
    <div class="wrap">
      <div class="cta-band">
        <div>
          <h2>Book a calibration</h2>
          <p>Tell us the equipment, quantity and location. We will confirm scope, schedule and certification.</p>
        </div>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap">
          ${button('#/contact', 'Send an enquiry', 'gold')}
          ${button(SITE.whatsapp, 'WhatsApp Us', 'outline')}
        </div>
      </div>
    </div>
  </section>
  `;
}
