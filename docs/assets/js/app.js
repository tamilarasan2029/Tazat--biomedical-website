// Entry point: a small router that shows one page at a time, with smooth scrolling and scroll spy.
import { renderHeader, renderFooter, bindLayout, setActive, moveIndicator } from './components/layout.js';
import { bindEnquiryForms } from './components/forms.js';
import { homePage } from './pages/home.js';
import { calibrationPage, bindCalibration } from './pages/calibration.js';
import { servicesPage } from './pages/services.js';

import { whatsappLink, WA_GREETING } from './content.js';

document.documentElement.classList.add('js');
document.getElementById('waFloat').href = whatsappLink(WA_GREETING);

const app = document.getElementById('app');
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PAGES = {
  home: homePage,
  calibration: calibrationPage,
  services: servicesPage,
};

// Hash address -> [page, section id to scroll to]
const ROUTES = {
  '': ['home', null],
  home: ['home', null],
  about: ['home', 'about'],
  explore: ['home', 'explore'],
  why: ['home', 'why'],
  contact: ['home', 'contact'],
  calibration: ['calibration', null],
  sales: ['calibration', null],
  'r2-crew': ['services', null],
  rental: ['services', 'rental'],
  'sleep-study': ['services', 'sleep-study'],
  services: ['services', null],
};

let currentPage = null;
let spy = null;
let suppressSpyUntil = 0;

function keyFromHash(hash) {
  const key = hash.replace(/^#\/?/, '');
  return ROUTES[key] ? key : '';
}

function observeReveals(root) {
  const items = root.querySelectorAll('.reveal');
  if (REDUCED || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

// Hide the header while scrolling down; show it again when scrolling up.
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const header = document.getElementById('siteHeader');
  const menuOpen = document.querySelector('#primary-nav.open');
  const y = window.scrollY;
  if (header && !menuOpen) {
    if (y > lastScrollY && y > 120) header.classList.add('header-hidden');
    else if (y < lastScrollY) header.classList.remove('header-hidden');
  }
  lastScrollY = y;
}, { passive: true });

// Count numbers up from 0 when they scroll into view.
function startCounters(root) {
  const items = root.querySelectorAll('.count-up');
  if (REDUCED || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  items.forEach((el) => {
    el.textContent = '0' + (el.dataset.suffix || '');
    io.observe(el);
  });
}

function animateCount(el) {
  const target = parseFloat(el.dataset.value);
  const decimals = (el.dataset.value.split('.')[1] || '').length;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Scroll spy: the menu follows whichever home section is in the reading band of the screen.
function menuKeyFor(sectionId) {
  if (sectionId === 'about') return 'about';
  if (sectionId === 'contact') return 'contact';
  return 'home';
}

function spyTo(sectionId) {
  const key = menuKeyFor(sectionId);
  setActive('home', key === 'home' ? null : key);
  history.replaceState(null, '', key === 'home' ? '#/' : `#/${key}`);
}

function setupScrollSpy() {
  if (spy) spy.disconnect();
  spy = null;
  if (!('IntersectionObserver' in window)) return;
  spy = new IntersectionObserver((entries) => {
    if (Date.now() < suppressSpyUntil) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) spyTo(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  app.querySelectorAll('main section[id]').forEach((section) => spy.observe(section));
}

function renderPage(page) {
  currentPage = page;
  app.innerHTML = `${renderHeader()}<main id="main">${PAGES[page]()}</main>${renderFooter()}`;
  bindLayout(app);
  document.getElementById('siteHeader')?.classList.remove('header-hidden');
  bindEnquiryForms(app);
  if (page === 'calibration') bindCalibration(app);
  observeReveals(app);
  startCounters(app);
  if (page === 'home') setupScrollSpy();
  else if (spy) { spy.disconnect(); spy = null; }
}

function scrollToAnchor(anchor) {
  const target = document.getElementById(anchor);
  if (!target) return;
  suppressSpyUntil = Date.now() + 1000;
  target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  setTimeout(() => { if (currentPage === 'home') spyTo(anchor); }, 1000);
}

function scrollToTop() {
  suppressSpyUntil = Date.now() + 1000;
  window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
  setTimeout(() => {
    if (currentPage === 'home') spyTo('home-top');
  }, 1000);
}

// Show a route. push = true when the visitor clicked a link.
function go(key, push) {
  const [page, anchor] = ROUTES[key] || ROUTES[''];
  if (push) history.pushState(null, '', key ? `#/${key}` : '#/');
  if (page !== currentPage) renderPage(page);
  if (page === 'home') setActive('home', anchor);
  else setActive(page, null);
  if (anchor) scrollToAnchor(anchor);
  else scrollToTop();
}

// Every menu link and button inside the site goes through here, so repeat clicks work too.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#/"]');
  if (!link) return;
  const key = link.getAttribute('href').replace(/^#\/?/, '');
  if (!ROUTES[key] && key !== '') return;
  e.preventDefault();
  go(key, true);
});

// Keep the underline under the active menu item when the window is resized.
window.addEventListener('resize', moveIndicator);

// Back and forward buttons, or a typed address.
window.addEventListener('hashchange', () => go(keyFromHash(window.location.hash), false));

go(keyFromHash(window.location.hash), false);
