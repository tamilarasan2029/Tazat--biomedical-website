// Header, footer and navigation shared by every page.
import { SITE, gmailLink, whatsappLink, WA_GREETING } from '../content.js';
import { esc } from './ui.js';

function brandMark() {
  const mark = SITE.logo
    ? `<img class="logo-img" src="${esc(SITE.logo)}" alt="">`
    : `<span class="logo" aria-hidden="true">T</span>`;
  return `${mark}
    <span class="brand-text"><strong>TAZAT BIOMEDICAL</strong><small>ENGINEERING WITH PRECISION</small></span>`;
}

export function renderHeader() {
  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="topbar"><div class="wrap">
    <span>Biomedical Calibration • Respiratory Care • Equipment Solutions</span>
    <span><a href="${gmailLink(SITE.email)}" target="_blank" rel="noopener">${esc(SITE.email)}</a> &nbsp;|&nbsp; <a href="tel:${SITE.phoneLink}">${esc(SITE.phone)}</a></span>
  </div></div>
  <header class="site-header" id="siteHeader"><div class="wrap header-inner">
    <a class="brand" href="#/" aria-label="TAZAT Biomedical, home">${brandMark()}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
      <span class="sr-only">Open menu</span><span class="bars" aria-hidden="true"></span>
    </button>
    <nav id="primary-nav" class="nav-links" aria-label="Main">
      <span class="nav-indicator" aria-hidden="true"></span>
      <a href="#/" data-nav="home">Home</a>
      <a href="#/services" data-nav="services">Service</a>
      <a href="#/sales" data-nav="calibration">Sales</a>
      <a href="#/contact" data-nav="contact">Contact</a>
      <a href="#/about" data-nav="about">About</a>
    </nav>
    <a class="btn gold small header-cta" href="#/contact">Enquiry</a>
  </div></header>`;
}

export function renderFooter() {
  return `
  <footer class="site-footer"><div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="brand" href="#/">${brandMark()}</a>
        <p class="footer-text">Biomedical engineering, calibration and respiratory care support for healthcare environments.</p>
      </div>
      <div>
        <h4>Quick links</h4>
        <a href="#/">Home</a>
        <a href="#/about">About</a>
        <a href="#/sales">Sales</a>
        <a href="#/services">Services</a>
        <a href="#/contact">Contact</a>
      </div>
      <div>
        <h4>Services</h4>
        <a href="#/services">Medical equipment calibration</a>
        <a href="#/rental">Respiratory equipment rental</a>
        <a href="#/sleep-study">Sleep study services</a>
      </div>
      <div>
        <h4>Get in touch</h4>
        <p class="ci"><span class="ci-icon">📍</span><span>${esc(SITE.location)}</span></p>
        <a class="ci" href="${gmailLink(SITE.email)}" target="_blank" rel="noopener"><span class="ci-icon">📧</span><span>${esc(SITE.email)}</span></a>
        <a class="ci" href="tel:${SITE.phoneLink}"><span class="ci-icon">📞</span><span>${esc(SITE.phone)}</span></a>
        <a class="ci" href="${whatsappLink(WA_GREETING)}" target="_blank" rel="noopener"><span class="ci-icon">💬</span><span>${esc(SITE.phone)}</span></a>
      </div>
    </div>
    <div class="copyright">© ${new Date().getFullYear()} ${esc(SITE.legalName)}. All rights reserved. &nbsp;|&nbsp; Accuracy • Quality • Patient Care</div>
  </div>
  </footer>`;
}

// Mobile menu toggle. Call once after the header is in the page.
export function bindLayout(root) {
  const toggle = root.querySelector('.menu-toggle');
  const nav = root.querySelector('#primary-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Highlights the current item in the menu and slides the underline under it.
export function setActive(page, anchor) {
  let key = page;
  if (page === 'home') key = anchor === 'about' ? 'about' : anchor === 'contact' ? 'contact' : 'home';
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === key);
  });
  moveIndicator();
}

export function moveIndicator() {
  const nav = document.getElementById('primary-nav');
  const indicator = nav?.querySelector('.nav-indicator');
  const active = nav?.querySelector('a.active');
  if (!indicator) return;
  if (!active) {
    indicator.style.width = '0px';
    return;
  }
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
}

