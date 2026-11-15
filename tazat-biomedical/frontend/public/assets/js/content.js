// All website text lives here. Edit this file to change wording, prices or lists.

export const SITE = {
  name: 'TAZAT Biomedical',
  legalName: 'TAZAT Biomedical Private Limited',
  email: 'crew@tazat.co.in',
  phone: '+91 72009 25055',
  phoneLink: '+917200925055',
  whatsapp: 'https://wa.me/917200925055',
  location: 'No. 8598, Cho Kanthasamy Kunjaram Complex, 2nd Street, Thiru Nagar, Sivaganga, Sivaganga, Tamil Nadu, 630551, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('No. 8598, Cho Kanthasamy Kunjaram Complex, 2nd Street, Thiru Nagar, Sivaganga, Tamil Nadu, 630551, India'),
  // Path to your logo image, e.g. 'assets/img/logo.png'. Leave empty to show the "T" box.
  logo: 'assets/img/logo.jpg',
};

// Certification shown on the site. Only keep this if the certificate is current.
export const ISO_BADGE = 'ISO Accredited Support';

export const WHY_POINTS = [
  { icon: '✚', title: 'Safety First', text: 'Supporting the safe operation of critical medical and biomedical equipment.' , image: 'assets/img/why-1.jpg' },
  { icon: '◎', title: 'Precision & Accuracy', text: 'Calibration-focused services designed to support reliable equipment performance.' , image: 'assets/img/why-2.jpg' },
  { icon: '⌖', title: 'Biomedical Engineering Expertise', text: 'Technical solutions supported by biomedical engineering knowledge.' , image: 'assets/img/why-3.jpg' },
  { icon: '▤', title: 'Quality-Driven Processes', text: 'Systematic service procedures, documentation and quality-focused practices.' , image: 'assets/img/why-4.jpg' },
  { icon: '⌂', title: 'Healthcare Facility Support', text: 'Supporting government and private healthcare facilities across Tamil Nadu.' , image: 'assets/img/why-5.jpg' },
];

export const TRACK_RECORD = [
  { value: '300+', label: 'Medical equipment handled' },
  { value: '20+', label: 'Engineering expertise' },
  { value: '100%', label: 'Quality & safety focus' },
];

export const C1_SERVICES = [
  'Medical Equipment Calibration',
  'Biomedical Technical Support',
  'Preventive Maintenance',
  'Equipment Performance Verification',
  'Service Documentation',
];

export const R2_SERVICES = [
  'CPAP & BiPAP Rental',
  'Oxygen Equipment Rental',
  'Patient Monitoring Rental',
  'Ventilator Support',
  'Sleep Study Services',
  'Equipment Setup and Technical Assistance',
];

export const CALIBRATION_CATEGORIES = [
  { name: 'Patient Monitoring', items: ['Multiparameter monitors', 'ECG machines', 'SpO₂ / pulse oximeters', 'NIBP monitors', 'Temperature monitors', 'Capnography / EtCO₂ monitors', 'Central monitoring systems'] },
  { name: 'Critical Care & ICU', items: ['Ventilators', 'BiPAP machines', 'CPAP machines', 'High-flow oxygen therapy equipment', 'Anaesthesia workstations', 'Infusion pumps', 'Syringe pumps', 'Defibrillators', 'Patient warmers'] },
  { name: 'Respiratory Equipment', items: ['Ventilators', 'CPAP / BiPAP', 'Oxygen concentrators', 'Respiratory and gas flow meters', 'Oxygen analysers', 'Pressure gauges', 'Suction machines', 'Spirometers', 'Pulmonary function testing equipment'] },
  { name: 'Operation Theatre & Anaesthesia', items: ['Anaesthesia machines', 'Ventilators', 'Electrosurgical units / cautery', 'Defibrillators', 'Patient monitors', 'Surgical suction units', 'Temperature monitoring equipment'] },
  { name: 'Infusion & Medication Delivery', items: ['Infusion pumps', 'Syringe pumps', 'Volumetric pumps', 'PCA pumps', 'Enteral feeding pumps'] },
  { name: 'Neonatal & Paediatric', items: ['Incubators', 'Radiant warmers', 'Neonatal ventilators', 'Phototherapy units', 'Neonatal monitors', 'Infant weighing scales', 'Apnoea monitors'] },
  { name: 'Laboratory', items: ['Centrifuges', 'Micropipettes', 'Laboratory balances', 'Temperature-controlled equipment', 'Incubators and water baths', 'Blood gas analysers', 'pH meters', 'Refrigerator / freezer temperature systems'] },
  { name: 'Diagnostic Imaging', items: ['X-ray equipment', 'CT equipment', 'Ultrasound systems', 'Mammography equipment', 'Dental X-ray equipment'] },
  { name: 'Dialysis', items: ['Haemodialysis machines', 'Dialysis pressure monitoring systems', 'Conductivity measurement systems', 'Temperature measurement systems', 'Weighing systems'] },
  { name: 'Other Hospital Equipment', items: ['Medical weighing scales', 'BP apparatus', 'Thermometers', 'ECG simulators', 'Electrical safety testers', 'Medical gas flow / pressure equipment', 'Suction pressure equipment', 'Laboratory / biochemistry analysers', 'Blood bank equipment'] },
];

export const CALIBRATION_DISCLAIMER = 'The equipment listed above represents our major calibration service categories and is not an exhaustive list. Additional medical and biomedical equipment may be supported based on equipment specifications, available reference standards and calibration requirements. If your equipment is not listed, contact us to confirm availability and scope.';

export const RENTAL = [
  { name: 'CPAP & BiPAP', image: 'assets/img/r2-cpap.jpg', deposit: '₹5,000', rates: [['1 day', '₹500'], ['15 days', '₹3,000'], ['30 days', '₹5,500']] },
  { name: 'Oxygen Equipment', image: 'assets/img/r2-oxygen.jpg', deposit: '₹5,000', rates: [['1 day', '₹500'], ['15 days', '₹2,500'], ['30 days', '₹5,000']] },
  { name: 'Patient Monitoring', image: 'assets/img/r2-monitoring.jpg', deposit: '₹5,000', rates: [['1 day', '₹500'], ['15 days', '₹3,500'], ['30 days', '₹6,000']] },
  { name: 'Ventilator Support', image: 'assets/img/r2-ventilator.jpg', deposit: '₹30,000', rates: [['1 day', '₹1,000'], ['15 days', '₹25,500'], ['30 days', '₹45,000']] },
];

export const RENTAL_NOTE = 'Indicative rates. Ventilator rates are provisional. Confirm availability, delivery, deposit and refund terms, consumables, service coverage and final quotation before booking. Rental equipment must be selected and used under appropriate clinical advice.';

export const RENTAL_SUPPORT = [
  'Equipment selection and availability confirmation',
  'Professional setup and basic user guidance',
  'Preventive maintenance and troubleshooting',
  'Technical support during the rental period',
  'Hospital and home-care support',
];

export const SLEEP_STUDIES = [
  { name: 'Half-Channel Sleep Study', price: '₹3,000', label: 'Half-channel — ₹3,000' },
  { name: 'Full-Channel Sleep Study', price: '₹8,000', label: 'Full-channel — ₹8,000' },
];

export const SLEEP_NOTE = 'Study with report. Study type and suitability should be confirmed by the referring clinician. Appointment is subject to technician and equipment availability.';

export const ABOUT = {
  intro: [
    'TAZAT Biomedical is a biomedical engineering service company focused on delivering technical excellence across government hospitals, private hospitals, clinics, diagnostic centres and home healthcare settings.',
    'Our services cover medical equipment calibration, respiratory care solutions, equipment rental, medical equipment sales and sleep study services.',
    'Our approach combines technical expertise, systematic service processes and a strong commitment to equipment reliability and patient safety.',
  ],
  mission: 'To provide dependable biomedical engineering solutions that support healthcare professionals, improve equipment reliability and contribute to safer healthcare environments.',
  vision: 'To become a trusted biomedical engineering service provider by delivering precision-focused, quality-driven and accessible healthcare equipment solutions.',
};

// Service page content, using the descriptions supplied in the brief.
export const SERVICE_PAGE = {
  kicker: 'Our calibration',
  title: 'The Centre for Medical Equipment Calibration Testing & Services',
  lead: 'Calibration is the act of checking or comparing accuracy of measuring equipment with a Standard under specified conditions.',
  features: ['On Site Calibration', 'Certification'],
  services: [
    { name: 'Weights Calibration', text: 'Our measurement process to ensure consistency of calibration, which leads to accurate results in your processes, products and services.' },
    { name: 'RTD Sensor Calibration', text: 'RTD (Resistance Temperature Detector) sensor calibration involves verifying and, if necessary, adjusting the sensor\'s resistance-to-temperature relationship against a known standard, ensuring accurate temperature measurements.' },
    { name: 'Tachometer Calibration', text: 'Tachometer calibration ensures accurate rotational speed measurements by verifying and adjusting the device against a known standard, crucial for various applications like machinery monitoring and engine diagnostics.' },
    { name: 'Micropipette Calibration', text: 'Micropipette calibration, typically done using the gravimetric method, ensures accurate liquid dispensing by verifying the mass of water delivered at a reference temperature (20°C).' },
    { name: 'Pressure Gauge Calibration', text: 'Pressure gauge calibration ensures accurate readings by comparing the gauge\'s readings against a known standard, typically using specialized equipment like a pressure calibrator or deadweight tester.' },
    { name: 'Timer Calibration', text: 'Timer calibration ensures accurate timekeeping by comparing a timer\'s readings against a known standard and making adjustments to correct any discrepancies.' },
  ],
};

// Opens a new Gmail message to this address.
export function gmailLink(email) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

// Greeting that is typed in for the visitor when they open WhatsApp.
export const WA_GREETING = 'Hello TAZAT Biomedical, I would like to know more about your services.';

// WhatsApp chat with the business number, optionally with a message already typed in.
export function whatsappLink(text = '') {
  return text ? `${SITE.whatsapp}?text=${encodeURIComponent(text)}` : SITE.whatsapp;
}
