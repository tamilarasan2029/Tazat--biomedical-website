import { RENTAL, RENTAL_NOTE, RENTAL_SUPPORT, SLEEP_STUDIES, SLEEP_NOTE } from '../content.js';
import { button, esc, sectionHead, featureList, flipCard } from '../components/ui.js';
import { enquiryForm } from '../components/forms.js';

function rentalEnquiry() {
  return enquiryForm({
    id: 'rental',
    type: 'Respiratory rental',
    title: 'Rental enquiry',
    intro: 'Send your requirement to the TAZAT team.',
    fields: [
      { key: 'name', role: 'name', label: 'Full name', required: true, placeholder: 'Your name' },
      { key: 'phone', role: 'phone', label: 'Phone number', type: 'tel', required: true, placeholder: 'Mobile number' },
      { key: 'equipment', label: 'Equipment', type: 'select', required: true, placeholder: 'Choose equipment',
        options: ['CPAP / BiPAP', 'Oxygen concentrator', 'Patient monitor', 'Ventilator', 'Other'] },
      { key: 'duration', label: 'Rental duration', type: 'select', required: true, placeholder: 'Choose duration',
        options: ['1 day', '15 days', '30 days', 'Other / To discuss'] },
      { key: 'location', label: 'Location', type: 'select', placeholder: 'Choose location', options: ['Home', 'Hospital', 'Clinic'] },
      { key: 'start', label: 'Start date', type: 'date' },
      { key: 'message', role: 'message', label: 'Details', type: 'textarea', required: true, wide: true,
        placeholder: 'Area, equipment model (if known), clinical or technical requirement' },
    ],
  });
}

function sleepAppointment() {
  return enquiryForm({
    id: 'sleep',
    type: 'Sleep study',
    title: 'Sleep study appointment',
    fields: [
      { key: 'name', role: 'name', label: 'Patient name', required: true, placeholder: 'Patient full name' },
      { key: 'doctor', label: 'Doctor reference', placeholder: 'Doctor / hospital name' },
      { key: 'phone', role: 'phone', label: 'Phone number', type: 'tel', required: true, placeholder: 'Mobile number' },
      { key: 'study', label: 'Study type', type: 'select', required: true, placeholder: 'Choose a study',
        options: SLEEP_STUDIES.map((s) => s.label) },
      { key: 'date', label: 'Preferred sleep study date', type: 'date', required: true },
      { key: 'payment', label: 'Payment method', type: 'select', placeholder: 'Choose a method',
        options: ['UPI', 'Cash', 'Bank transfer', 'To confirm'] },
      { key: 'notes', label: 'Notes', type: 'textarea', wide: true, placeholder: 'Preferred location or other details' },
    ],
    submit: 'Request appointment',
    note: 'Please do not enter medical records or detailed health information here. Our team will confirm the appointment with you.',
  });
}

export function r2Page() {
  return `
  <section class="page-hero"><div class="wrap">
    <div class="kicker">R2 Crew • Respiratory care</div>
    <h1>Respiratory equipment rental and sleep study services</h1>
    <p class="lead">Reliable respiratory equipment rental and technical support for hospitals, clinics and home healthcare, with sleep study services and reporting in one place.</p>
    <nav class="subnav" aria-label="R2 Crew sections">
      <a href="#/rental">Equipment rental</a>
      <a href="#/sleep-study">Sleep study</a>
      <a href="#/contact">Enquire</a>
    </nav>
  </div></section>

  <section class="section" id="rental">
    <div class="wrap">
      ${sectionHead('Respiratory equipment rental', 'Reliable Respiratory Support for Hospitals & Home Care', 'Access respiratory equipment through flexible rental solutions with professional technical support.')}
      <div class="grid-4">
        ${RENTAL.map((r) => flipCard({
          frontClass: 'card rate-card',
          frontHtml: `<h3>${esc(r.name)}</h3>
          <p class="rate-deposit">Refundable security deposit: ${esc(r.deposit)}</p>
          ${r.rates.map(([d, rate]) => `<div class="rate-row"><span>${esc(d)}</span><b>${esc(rate)}</b></div>`).join('')}`,
          image: r.image,
          alt: r.name,
        })).join('')}
      </div>
      <p class="note">${esc(RENTAL_NOTE)}</p>
      <div class="grid-2" style="margin-top:2.5rem">
        <div>
          <h3>Our rental support</h3>
          ${featureList(RENTAL_SUPPORT)}
        </div>
        <div>${rentalEnquiry()}</div>
      </div>
    </div>
  </section>

  <section class="section soft" id="sleep-study">
    <div class="wrap">
      ${sectionHead('Sleep study services', 'Better Sleep Assessment Through Professional Sleep Study Support', 'TAZAT provides sleep study services with reporting options. Request an appointment below and our team will coordinate availability and relevant details.')}
      <div class="grid-2">
        ${SLEEP_STUDIES.map((s) => `
        <article class="card price-card reveal">
          <h3>${esc(s.name)}</h3>
          <div class="price">${esc(s.price)}</div>
          <p class="card-sub">With report</p>
        </article>`).join('')}
      </div>
      <p class="note">${esc(SLEEP_NOTE)}</p>
      <div style="margin-top:2.5rem">${sleepAppointment()}</div>
    </div>
  </section>`;
}
