// Small shared helpers used by every page.

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// variant: 'primary' (maroon), 'gold', or 'outline'
export function button(href, label, variant = 'primary') {
  const cls = variant === 'primary' ? 'btn' : `btn ${variant}`;
  return `<a class="${cls}" href="${esc(href)}">${esc(label)}</a>`;
}

export function sectionHead(kicker, title, lead = '') {
  return `<header class="section-head reveal">
    <div class="kicker">${esc(kicker)}</div>
    <h2>${esc(title)}</h2>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </header>`;
}

export function featureList(items) {
  return `<ul class="feature-list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

// Shows a message in the corner toast.
export function notify(text, ok) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.className = `toast show ${ok ? 'ok' : 'err'}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), ok ? 4500 : 7000);
}

// Flip card: normal content on the front, the full image on the back when hovered or tapped.
export function whyFlipCard(p) {
  return `<article class="flip-card" tabindex="0" aria-label="${esc(p.title)}">
    <div class="flip-inner">
      <div class="flip-front">
        <div class="iconbox" aria-hidden="true">${p.icon}</div>
        <h3>${esc(p.title)}</h3>
        <p class="card-sub">${esc(p.text)}</p>
      </div>
      <div class="flip-back">
        <img class="flip-img" src="${esc(p.image)}" alt="${esc(p.title)}">
      </div>
    </div>
  </article>`;
}

// Numbers such as "300+" or "100%" count up from 0 when they come into view.
export function counterHtml(value) {
  const m = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return esc(value);
  return `<span class="count-up" data-value="${m[1]}" data-suffix="${esc(m[2])}">${esc(value)}</span>`;
}

// Service flip card: front shows the title, back shows details and an Explore More button.
export function serviceFlipCard({ title, sub = '', backHtml = '', href = '#/contact', category = '', delay = 0 }) {
  return `<article class="flip-card service-flip" tabindex="0" aria-label="${esc(title)}"${category ? ` data-category="${esc(category)}"` : ''}>
    <div class="flip-inner">
      <div class="flip-front">
        <h3>${esc(title)}</h3>
        ${sub ? `<p class="card-sub">${esc(sub)}</p>` : ''}
      </div>
      <div class="flip-back service-back">
        <h3>${esc(title)}</h3>
        ${backHtml}
        <a class="btn gold small" href="${esc(href)}">Explore More</a>
      </div>
    </div>
  </article>`;
}

// Flip card: original content on the front, the full image (uncropped) on the back. Tap or hover to flip.
export function flipCard({ frontHtml, frontClass = '', image, alt = '', delay = 0 }) {
  return `<article class="flip-card" tabindex="0" aria-label="${esc(alt)}">
    <div class="flip-inner">
      <div class="flip-front ${frontClass}">
        ${frontHtml}
      </div>
      <div class="flip-back">
        <img class="flip-img" src="${esc(image)}" alt="${esc(alt)}">
      </div>
    </div>
  </article>`;
}
