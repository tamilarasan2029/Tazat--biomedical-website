import { SITE, ISO_BADGE, WHY_POINTS, TRACK_RECORD, C1_SERVICES, R2_SERVICES, ABOUT, gmailLink, whatsappLink, WA_GREETING } from '../content.js';
import { button, esc, sectionHead, featureList, whyFlipCard, counterHtml } from '../components/ui.js';
import { enquiryForm } from '../components/forms.js';

function generalEnquiry() {
  return enquiryForm({
    id: 'general',
    type: 'General enquiry',
    title: 'Send us an enquiry',
    intro: 'Calibration, respiratory equipment rental, sleep study appointments, equipment sales and pricing.',
    fields: [
      { key: 'name', role: 'name', label: 'Full name', required: true, placeholder: 'Your name' },
      { key: 'phone', role: 'phone', label: 'Phone number', type: 'tel', required: true, placeholder: 'Mobile number' },
      { key: 'enquiry', label: 'Enquiry type', type: 'select', required: true, placeholder: 'Choose an enquiry type',
        options: ['Calibration', 'Respiratory rental', 'Sleep study', 'Equipment sales', 'Other'] },
      { key: 'message', role: 'message', label: 'Message', type: 'textarea', required: true, wide: true, placeholder: 'How can we help?' },
    ],
  });
}

export function homePage() {
  return `<div class="home-page">
  <section class="hero" id="home"><div class="wrap hero-grid">
    <div>
      <div class="eyebrow">Engineering Excellence • Precision • Patient Care</div>
      <h1>Empowering Patient Care Through <span>TAZAT</span> Biomedical Engineering</h1>
      <p>TAZAT Biomedical is a precision-focused biomedical engineering service company delivering reliable technical solutions for hospitals, clinics, diagnostic centres and home healthcare environments.</p>
      <p>From medical equipment calibration and respiratory equipment rental to equipment sales and sleep studies, we are committed to supporting healthcare facilities with quality-driven engineering solutions.</p>
      <ul class="expertise-list">
        <li><a href="#/services">Medical Equipment Calibration</a></li>
        <li>Respiratory Equipment Rental</li>
        <li>Sleep Study Services</li>
        <li>Medical Equipment Sales</li>
      </ul>
      <div class="hero-actions">
        ${button('#/explore', 'Explore Our Solutions', 'gold')}
        ${button('#/contact', 'Request a Service', 'outline')}
        ${button('#/contact', 'Contact Us', 'outline')}
      </div>
      <span class="badge">${esc(ISO_BADGE)}</span>
    </div>
    <div class="hero-visual">
      <img src="assets/img/hero-art.svg" alt="Biomedical engineering illustration" width="440" height="330">
    </div>
  </div></section>

  <section class="section" id="explore">
    <div class="wrap">
      ${sectionHead('Our expertise', 'Two Dedicated Teams. One Commitment to Healthcare.')}
      <div style="max-width:640px;margin:0 auto">
        <article class="card reveal">
          <span class="crew-tag">C1 CREW</span>
          <h3>Calibration &amp; Technical Services</h3>
          <p class="card-sub">Professional calibration and technical support for medical and biomedical equipment. Our services help healthcare facilities maintain equipment accuracy, reliability, safety and performance.</p>
          <div style="margin-top:1.1rem">${featureList(C1_SERVICES)}</div>
          <p style="margin:1.5rem 0 0">${button('#/sales', 'Explore C1 Calibration →', 'outline')}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section soft" id="about">
    <div class="wrap grid-2">
      <div class="reveal">
        <div class="kicker">About TAZAT Biomedical</div>
        <h2>Engineering Healthcare Through Precision and Reliability</h2>
        ${ABOUT.intro.map((p) => `<p class="lead">${esc(p)}</p>`).join('')}
      </div>
      <div class="card reveal">
        <h3>Our Mission</h3>
        <p>${esc(ABOUT.mission)}</p>
        <h3 style="margin-top:1.6rem">Our Vision</h3>
        <p>${esc(ABOUT.vision)}</p>
      </div>
    </div>
  </section>

  <section class="section" id="why">
    <div class="wrap">
      ${sectionHead('Why choose TAZAT?', 'Your Trusted Partner in Biomedical Engineering')}
      <div class="grid-5">
        ${WHY_POINTS.map(whyFlipCard).join('')}
      </div>
    </div>
  </section>

  <section class="section soft" id="track">
    <div class="wrap">
      ${sectionHead('Our track record', 'Our Commitment to Quality and Performance')}
      <div class="stats">
        ${TRACK_RECORD.map((s) => `<div class="stat reveal hover-lift"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" id="contact">
    <div class="wrap contact-grid">
      <div class="reveal">
        <div class="kicker">Contact</div>
        <h2>Let's Support Your Healthcare Equipment Requirements.</h2>
        <p class="lead">Our team is ready to assist you with calibration, rental, sleep studies, equipment purchases and quotations.</p>
        <dl class="details">
          <dt>Location</dt><dd class="ci"><span class="ci-icon">📍</span><span>${esc(SITE.location)}</span></dd>
          <dt>Email</dt><dd class="ci"><span class="ci-icon">📧</span><span><a href="${gmailLink(SITE.email)}" target="_blank" rel="noopener">${esc(SITE.email)}</a></span></dd>
          <dt>Phone</dt><dd class="ci"><span class="ci-icon">📞</span><span><a href="tel:${SITE.phoneLink}">${esc(SITE.phone)}</a></span></dd>
          <dt>WhatsApp</dt><dd class="ci"><span class="ci-icon">💬</span><span><a href="${whatsappLink(WA_GREETING)}" target="_blank" rel="noopener">${esc(SITE.phone)}</a></span></dd>
          <dt>Working days</dt><dd>Mon - Sat</dd>
          <dt>Working hours</dt><dd>09:00 AM to 07:00 PM</dd>
        </dl>
        <p style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          ${button(SITE.whatsapp, 'WhatsApp Us', 'gold')}
        </p>
      </div>
      <div>${generalEnquiry()}</div>
    </div>
  </section>
</div>`;
}
