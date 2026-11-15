import { CALIBRATION_CATEGORIES, CALIBRATION_DISCLAIMER } from '../content.js';
import { button, esc, sectionHead } from '../components/ui.js';

export function calibrationPage() {
  const options = CALIBRATION_CATEGORIES
    .map((c) => `<option value="${esc(c.name)}">${esc(c.name)}</option>`).join('');
  const cards = CALIBRATION_CATEGORIES.map((c, i) => `
    <article class="equip-cat reveal hover-lift" style="transition-delay:${(i % 4) * 90}ms" data-category="${esc(c.name)}">
      <h3>${esc(c.name)}</h3>
      <ul class="plain-list">${c.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
    </article>`).join('');

  return `<div class="calibration-page">
  <section class="page-hero"><div class="wrap">
    <div class="kicker">Sales</div>
    <h1>Medical equipment sales and calibration</h1>
    <p class="lead">Our biomedical engineering team delivers precision-driven, safety-focused and quality-oriented services to help healthcare facilities maintain the accuracy, reliability and performance of medical equipment.</p>
  </div></section>

  <section class="section soft">
    <div class="wrap">
      ${sectionHead('Equipment calibration categories', 'Find your equipment', 'Search the list below. The categories are examples of service areas; calibration availability is confirmed according to scope, specifications and reference standards.')}
      <div class="searchbar">
        <input id="equipSearch" type="search" aria-label="Search equipment" placeholder="Search equipment (e.g. ECG, ventilator, micropipette)…">
        <select id="categoryFilter" aria-label="Filter equipment category">
          <option value="">All categories</option>
          ${options}
        </select>
      </div>
      <div class="equipment-grid">${cards}</div>
      <p class="empty" id="noResults">No matching equipment found. Contact us to check availability.</p>
      <p class="disclaimer">${esc(CALIBRATION_DISCLAIMER)}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="cta-band">
        <div>
          <h2>Need calibration for your equipment?</h2>
          <p>Tell us the equipment and the service you need. We will confirm scope and availability.</p>
        </div>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap">${button('#/services', 'View our services', 'outline')}${button('#/contact', 'Send an enquiry', 'gold')}</div>
      </div>
    </div>
  </section>
</div>`;
}

// Live search and category filter for the equipment list.
export function bindCalibration(root) {
  const search = root.querySelector('#equipSearch');
  const filter = root.querySelector('#categoryFilter');
  const empty = root.querySelector('#noResults');
  if (!search || !filter) return;
  const cards = [...root.querySelectorAll('.equip-cat')];

  const apply = () => {
    const q = search.value.toLowerCase().trim();
    const f = filter.value;
    let shown = 0;
    cards.forEach((card) => {
      const match = (!f || card.dataset.category === f) && (!q || card.textContent.toLowerCase().includes(q));
      card.hidden = !match;
      if (match) shown += 1;
    });
    empty.style.display = shown ? 'none' : 'block';
  };
  search.addEventListener('input', apply);
  filter.addEventListener('change', apply);
}
