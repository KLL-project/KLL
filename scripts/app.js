import { siteConfig, services } from './config.js';
import { loanPages, renderLoanPage, renderAllLoansPage } from './loan-pages.js';

const apiBase = ['localhost', '127.0.0.1'].includes(location.hostname) ? `${location.protocol}//${location.hostname}:5500` : location.origin;
const apiUrl = (path) => new URL(path, apiBase).toString();
const app = document.querySelector('#app');
const nav = [['Home', '#/'], ['Loans', '#/services'], ['Insurance', '#/insurance'], ['Income Tax', '#/income-tax'], ['Real Estate', '#/property-management'], ['Calculators', '#/calculators'], ['Resources', '#/resources'], ['About Us', '#/about'], ['Contact Us', '#/contact']];
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const service = (slug) => services.find((item) => item.slug === slug);
const cta = (heading = 'Ready to discuss your financial needs?') => `<section class="cta-band"><div><p class="eyebrow light">Speak with our team</p><h2>${heading}</h2><p>Share your requirement and we will get back to you.</p></div><div class="cta-actions"><a class="button secondary" href="${siteConfig.phoneHref}">Call Us Now</a><a class="button white" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">Chat on WhatsApp</a></div></section>`;
const loanForService = (item) => loanPages.find((page) => page.service === item.name);
const serviceHref = (item) => item.slug === 'property-management' ? '#/property-management' : loanForService(item)?.route ? `#${loanForService(item).route}` : `#/service/${item.slug}`;
const serviceSlugHref = (slug) => { const item = services.find((entry) => entry.slug === slug); return item ? serviceHref(item) : `#/service/${slug}`; };
const cards = (items) => `<div class="service-grid">${items.map((item) => `<article class="service-card"><span class="card-icon" aria-hidden="true">${item.type === 'loan' ? '₹' : '+'}</span><h3>${esc(item.name)}</h3><p>${esc(item.blurb)}</p><a href="${serviceHref(item)}">Explore service →</a></article>`).join('')}</div>`;
const leadForm = (selected = 'General Enquiry') => `<form class="lead-form" data-lead-form novalidate><input type="hidden" name="service" value="${esc(selected)}"><input class="honeypot" name="website" tabindex="-1" autocomplete="off"><div class="form-row"><label>Your name<input name="name" required autocomplete="name"></label><label>Mobile number<input name="phone" required inputmode="tel" autocomplete="tel" pattern="[0-9+() -]{8,}"></label></div><div class="form-row"><label>Email address<input name="email" required type="email" autocomplete="email"></label><label>Service<select name="interest">${services.map((item) => `<option${item.name === selected ? ' selected' : ''}>${esc(item.name)}</option>`).join('')}<option${selected === 'General Enquiry' ? ' selected' : ''}>General Enquiry</option></select></label></div><label>Tell us how we can help<textarea name="message" rows="4" required></textarea></label><p class="form-status" aria-live="polite"></p><button class="button" type="submit">Send Enquiry</button><p class="form-note">We use your details only to respond to this enquiry.</p></form>`;
function header() { const loanLinks = [['/loans', 'All Loans'], ...loanPages.flatMap((page) => [[page.route, page.title], ...(page.aliases || []).map((route) => [route, 'Plot Construction Loan'])])].map(([route, title]) => `<a href="#${route}">${esc(title)}</a>`).join(''); const propertyRoute = location.hash.replace('#', '') === '/property-management'; const pageNav = propertyRoute ? [['Home', '#/'], ['Loans', '#/services'], ['Property Services', '#/property-management'], ['Insurance', '#/insurance'], ['Income Tax', '#/income-tax'], ['Calculators', '#/calculators'], ['Resources', '#/resources'], ['About Us', '#/about'], ['Contact Us', '#/contact']] : nav; const items = pageNav.map(([label, href]) => label === 'Loans' ? `<details class="loan-nav-dropdown"><summary>${label}<span aria-hidden="true">⌄</span></summary><div class="loan-nav-menu">${loanLinks}<a href="#/services">All Services</a></div></details>` : `<a href="${href}"${propertyRoute && href === '#/property-management' ? ' class="property-nav-active" aria-current="page"' : ''}>${label}</a>`).join(''); return `<header class="site-header"><div class="nav-wrap"><a class="brand" href="#/" aria-label="${esc(siteConfig.name)} home"><span class="brand-mark">KLL</span><span>Financial &amp; Marketing Services</span></a><button class="menu-button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation"><i></i><i></i><i></i></button><nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">${items}</nav><div class="nav-actions"><a class="call-link" href="${siteConfig.phoneHref}">Call us<br><strong>${esc(siteConfig.phone)}</strong></a><a class="button small" href="#/contact">Book Free Consultation</a></div></div></header>`; }
function footer() { return `<footer class="site-footer"><div class="footer-grid"><section><a class="brand inverse" href="#/"><span class="brand-mark">KLL</span><span>Financial &amp; Marketing Services</span></a><p>Your trusted partner for financial solutions. We help you explore your financial options clearly.</p></section><section><h2>Our Services</h2>${services.slice(0, 6).map((item) => `<a href="#/service/${item.slug}">${esc(item.name)}</a>`).join('')}</section><section><h2>Quick Links</h2><a href="#/about">About Us</a><a href="#/resources">Resources</a><a href="#/faq">FAQs</a><a href="#/contact">Contact Us</a><a href="admin-login.html">Admin Login</a></section><section><h2>Contact Us</h2><a href="${siteConfig.phoneHref}">${esc(siteConfig.phone)}</a><a href="mailto:${esc(siteConfig.email)}">${esc(siteConfig.email)}</a><p>Address details available on request.</p></section></div><div class="footer-bottom">© ${new Date().getFullYear()} ${esc(siteConfig.name)}. All rights reserved.<span><a href="#/privacy">Privacy Policy</a><a href="#/terms">Terms &amp; Conditions</a></span></div></footer>`; }
function homeIcon(name) {
  const shapes = {
    house: '<path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/>', briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18m-11 0v2h4v-2"/>', property: '<path d="m2 11 10-8 10 8M5 10v10h14V10M9 20v-6h6v6M3 21h18"/><path d="m7 7 2 2m6-2 2 2"/>', person: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2z"/>', document: '<path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h7M9 16h7M9 8h2"/>', shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>', building: '<path d="M4 21V4h16v17M2 21h20M8 8h2m4 0h2M8 12h2m4 0h2M8 16h2m4 0h2M11 21v-3h2v3"/>', apply: '<path d="M5 3h12l3 3v15H5zM15 3v5h5M8 12h8M8 16h6"/><path d="m3 16 2 2 4-4"/>', verify: '<path d="M5 3h12l3 3v15H5zM15 3v5h5M8 12h7"/><path d="m8 17 2 2 5-5"/>', approve: '<path d="m2 9 10-6 10 6M4 10h16M5 10v8m5-8v8m4-8v8m5-8v8M3 20h18M2 22h20"/>', disburse: '<path d="M3 17h5l3-3 3 1 6-5 1 2-6 7H9l-3 3H3zM13 8h8m-4-4 4 4-4 4"/>', award: '<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9M9 8l2 2 4-4"/>', clients: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2m1-11a3 3 0 1 0 0-6m1 9a5 5 0 0 1 5 5v2h-5"/>', money: '<circle cx="12" cy="12" r="9"/><path d="M15 8c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.3 0 3.5 6 1.2 6 4.8 0 1.4-1.3 2.5-3.2 2.5-1.4 0-2.7-.6-3.4-1.7M12 5v14"/>', thumb: '<path d="M7 10v11H3V10zm0 10h9a3 3 0 0 0 2.9-2.2l2-7A2.2 2.2 0 0 0 18.8 8H14l.7-3A2.4 2.4 0 0 0 12.4 2L7 10z"/>', star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>', chart: '<path d="M3 3v18h18M7 15l4-4 3 3 6-8"/>', calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h2m4 0h2m-8 4h2m4 0h2"/>', whatsapp: '<path d="M20 11.5a8.5 8.5 0 0 1-12.4 7.4L3 21l2.1-5.1A8.5 8.5 0 1 1 20 11.5z"/><path d="M9 8c.4 2.5 2.5 4.6 5 5l1.3-1.3 2 1c-.2 1.3-1.2 2.1-2.5 2.1-3.7-.4-6.6-3.3-7-7C7.8 6.5 8.7 5.5 10 5.3l1 2z"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${shapes[name] || shapes.star}</svg>`;
}
function home() {
  const serviceCards = [
    ['Home Loan', 'Lowest interest rates with maximum eligibility.', 'house', 'home-loans'],
    ['Business Loan', 'Fuel your business growth with quick funding.', 'briefcase', 'business-loans'],
    ['Loan Against Property', 'Unlock the value of your property.', 'property', 'loan-against-property'],
    ['Personal Loan', 'Quick funds for your personal needs.', 'person', 'personal-loans'],
    ['Income Tax Filing', 'File ITR accurately and on time.', 'document', 'income-tax'],
    ['Insurance', 'Secure your life, health and future with the right insurance.', 'shield', 'insurance'],
    ['Real Estate Solutions', 'End-to-end property and legal solutions.', 'building', 'property-management']
  ];
  const reviews = [
    ['Ramesh Kumar', 'Hyderabad', 'KLLFM made my home loan process so easy. Great service and very professional team!', 'client-ramesh.jpg'],
    ['Priya Sharma', 'Vijayawada', 'Very efficient team for ITR filing. They saved my time and filed accurately.', 'client-priya.jpg'],
    ['Suresh Reddy', 'Guntur', 'Got the best business loan offer within 3 days. Highly recommended!', 'client-suresh.jpg'],
    ['Anjali Mehta', 'Bengaluru', 'Their advice on insurance helped me secure my family’s future. Thank you KLLFM!', 'client-anjali.jpg']
  ];
  const articles = [
    ['HOME LOAN', '6 Tips to Get Your Home Loan Approved Faster', 'May 24, 2024', '5 min read', 'blog-home-loan.jpg'],
    ['TAX', 'ITR Filing AY 2024-25: Important Updates You Should Know', 'May 20, 2024', '6 min read', 'blog-tax.jpg'],
    ['BUSINESS', 'Top 5 Government Schemes for Business Owners in 2024', 'May 16, 2024', '7 min read', 'blog-business.jpg'],
    ['INSURANCE', 'Why Health Insurance is Important in 2024?', 'May 10, 2024', '4 min read', 'blog-insurance.jpg']
  ];
  return `<main id="main" class="home-page">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-hero-copy"><p class="home-kicker">Your Financial Growth, Our Responsibility</p><h1 id="home-title">One Platform. All<br><em>Financial</em> Solutions.</h1><p class="home-lead">From Home Loans to Income Tax, Insurance to Real Estate –<br class="home-desktop-break"> We make finance simple, transparent and stress-free.</p>
        <div class="home-trust-row"><div>${homeIcon('clients')}<span>Trusted by<br><b>9,000+ Clients</b></span></div><div>${homeIcon('shield')}<span><b>10+ Years of</b><br>Excellence</span></div><div>${homeIcon('building')}<span><b>40+ Banking</b><br>Partners</span></div><div>${homeIcon('chart')}<span><b>Fast &amp; Hassle</b><br>Free Process</span></div></div>
        <div class="home-actions"><a class="button" href="#/contact">Apply Now <span aria-hidden="true">➜</span></a><a class="button outline" href="${siteConfig.phoneHref}">Talk to an Expert ${contactIcon('headset')}</a><a class="button outline home-whatsapp" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">${homeIcon('whatsapp')} Chat on WhatsApp</a></div>
      </div>
      <div class="home-hero-visual"><img src="assets/home/family-hero.png" alt="A family sitting together with a model home" fetchpriority="high"><div class="home-eligibility"><span>Get Instant<br><b>Eligibility Check</b></span><a class="button small" href="#/loans">Check Now ${homeIcon('calculator')}</a></div></div>
    </section>
    <section class="home-banks" aria-label="Our banking partners"><span>Our<br>Banking Partners</span><img class="bank-sbi" src="assets/home/bank-sbi.png" alt="SBI"><img class="bank-hdfc" src="assets/home/bank-hdfc.png" alt="HDFC Bank"><img class="bank-icici" src="assets/home/bank-icici.png" alt="ICICI Bank"><img class="bank-axis" src="assets/home/bank-axis.png" alt="Axis Bank"><img class="bank-kotak" src="assets/home/bank-kotak.png" alt="Kotak Mahindra Bank"><a href="#/services">View All<br>Partners →</a></section>
    <section class="home-section home-services"><div class="home-section-heading"><p class="home-kicker">WHAT WE OFFER</p><h2>Our Services</h2><p>Comprehensive financial solutions tailored to your every need.</p></div><div class="home-service-grid">${serviceCards.map(([title, description, icon, slug]) => `<article class="home-service-card"><span class="home-card-icon">${homeIcon(icon)}</span><h3>${title}</h3><p>${description}</p><a href="${serviceSlugHref(slug)}">Explore Now →</a></article>`).join('')}</div></section>
    <section class="home-stats" aria-label="KLL achievements"><div>${homeIcon('award')}<p><b>10+</b><span>Years of Experience</span></p></div><div>${homeIcon('clients')}<p><b>9,000+</b><span>Happy Clients</span></p></div><div>${homeIcon('money')}<p><b>₹800+ Cr</b><span>Loans Processed</span></p></div><div>${homeIcon('thumb')}<p><b>98%</b><span>Client Satisfaction</span></p></div></section>
    <section class="home-section home-process"><div class="home-section-heading centered"><p class="home-kicker">HOW IT WORKS</p><h2>Our Simple 4 Step Process</h2></div><div class="home-step-grid">${[['apply','Apply','Fill in the simple application form.'],['verify','Verify','We verify your documents.'],['approve','Approve','Get approval from our partner banks.'],['disburse','Disburse','Funds disbursed quickly to your account.']].map(([icon,title,desc]) => `<article>${homeIcon(icon)}<div><h3>${title}</h3><p>${desc}</p></div></article>`).join('')}</div></section>
    <section class="home-tools"><article id="emi-calculator" class="home-calculator" data-home-calculator><h2>EMI Calculator</h2><div class="home-calculator-tabs" role="group" aria-label="Loan type"><button type="button" class="active" data-loan-type="Home Loan">Home Loan</button><button type="button" data-loan-type="Business Loan">Business Loan</button><button type="button" data-loan-type="Personal Loan">Personal Loan</button></div><div class="home-calc-layout"><div class="home-calc-inputs"><label>Loan Amount <output data-amount-label>₹50,00,000</output><input type="range" min="100000" max="20000000" step="50000" value="5000000" data-calc-amount aria-label="Loan amount"></label><label>Interest Rate <output data-rate-label>8.50%</output><input type="range" min="5" max="20" step="0.1" value="8.5" data-calc-rate aria-label="Annual interest rate"></label><label>Loan Tenure <output data-tenure-label>20 Years</output><input type="range" min="1" max="30" step="1" value="20" data-calc-tenure aria-label="Loan tenure in years"></label></div><div class="home-calc-result"><span>Your Monthly EMI</span><strong data-emi-result>₹43,391</strong><hr><small>Total Interest Payable</small><b data-interest-result>₹54,53,840</b><small>Total Payment (Principal + Interest)</small><b data-total-result>₹1,04,53,840</b><button type="button" class="button" data-calculate>Calculate EMI</button></div></div></article><article class="home-offers"><div class="home-offer-copy"><h2>Get the Best<br>Loan Offers</h2><p>Compare from 40+ banks and NBFCs for the best offer for you.</p><ul><li>Lowest Interest Rates</li><li>Maximum Eligibility</li><li>Quick Approvals</li><li>Minimal Documentation</li></ul><a class="button" href="#/contact">Check Eligibility Now</a></div><img src="assets/home/loan-offer.jpg" alt="Illustration of a home and savings"></article></section>
    <section class="home-section home-reviews"><div class="home-list-heading"><div><p class="home-kicker">TRUSTED BY THOUSANDS</p><h2>What Our Clients Say</h2></div><a href="#/about">View All Reviews →</a></div><div class="home-review-grid">${reviews.map(([name,city,quote,photo]) => `<article class="home-review-card"><div class="home-stars" aria-label="5 out of 5 stars">★★★★★</div><p>${quote}</p><div class="home-review-person"><img src="assets/home/${photo}" alt=""><span><b>${name}</b><small>${city}</small></span></div></article>`).join('')}</div></section>
    <section class="home-section home-blog"><div class="home-list-heading"><div><p class="home-kicker">LATEST FROM OUR BLOG</p><h2>Financial Insights &amp; Updates</h2></div><a href="#/resources">View All Articles →</a></div><div class="home-blog-grid">${articles.map(([category,title,date,read,image]) => `<article class="home-blog-card"><a href="#/resources" class="home-blog-image"><img src="assets/home/${image}" alt="" loading="lazy"></a><div class="home-blog-copy"><span>${category}</span><h3><a href="#/resources">${title}</a></h3><small>${date} &nbsp; • &nbsp; ${read}</small></div></article>`).join('')}</div></section>
    <section class="home-associations" aria-label="Associated financial brands"><span>We are<br>Associated with</span><img src="assets/home/associated-lic.png" alt="LIC"><img src="assets/home/associated-aditya-birla.png" alt="Aditya Birla Capital"><img src="assets/home/associated-tata-aia.png" alt="TATA AIA"><img src="assets/home/associated-icici-prudential.png" alt="ICICI Prudential"><img src="assets/home/associated-hdfc-life.png" alt="HDFC Life"><img src="assets/home/associated-bajaj-allianz.png" alt="Bajaj Allianz"></section>
  </main>`;
}
function servicePage(item) { return `<main id="main"><section class="page-hero"><div><p class="eyebrow">KLL Financial &amp; Marketing Services</p><h1>${esc(item.name)}</h1><p class="lead">${esc(item.blurb)} Our team can help you understand available options and next steps.</p><a class="button" href="#/contact">Enquire Now</a></div><aside><h2>Talk to our team</h2><p>Share your requirement and we will contact you.</p>${leadForm(item.name)}</aside></section><section class="section"><p class="eyebrow">How we can help</p><h2>Guidance for your next step</h2><div class="feature-grid"><article><h3>Understand your options</h3><p>Discuss your needs with our team and learn about relevant services.</p></article><article><h3>Know the next steps</h3><p>Get guidance on the information and documents you may need.</p></article><article><h3>Personal support</h3><p>Our team can answer questions throughout your enquiry.</p></article></div></section>${cta()}</main>`; }

function propertyServicesPage() {
  const propertyFeatures = [
    ['shield', 'Trusted', 'Guidance'], ['document', 'Legal', 'Verification'], ['clients', 'Best Market', 'Price'], ['money', 'Hassle-Free', 'Transactions']
  ];
  const benefits = [
    ['house', 'Wide Range of', 'Verified Properties'], ['clients', 'Expert Support for', 'Better Decisions'], ['money', 'Best Price', 'Negotiation'], ['document', 'Complete Legal', 'Assistance'], ['verify', 'End-to-End', 'Transaction Support']
  ];
  const propertyTypes = [
    ['house', 'Residential', 'Apartments, villas, independent houses'], ['property', 'Plots & Land', 'Residential, commercial and agricultural land'], ['building', 'Commercial', 'Office spaces, shops and showrooms'], ['award', 'Luxury Properties', 'Premium and luxury homes'], ['chart', 'Investment', 'High potential investment opportunities']
  ];
  const offers = [
    ['money', 'Property Valuation', 'Get an accurate market value for your property.'], ['verify', 'Legal Due Diligence', 'We verify legal details and property records.'], ['document', 'Documentation', 'Complete documentation support.'], ['house', 'Home Loan Assistance', 'Explore suitable home loan options.'], ['approve', 'Registration Support', 'Guidance through the registration process.'], ['clients', 'After-Sales Support', 'We stay with you after the deal.']
  ];
  const steps = [
    ['property', 'Requirement Understanding', 'We understand your needs and preferences.'], ['property', 'Property Search & Shortlisting', 'We shortlist suitable options for you.'], ['verify', 'Site Visit & Verification', 'Visit properties and verify key details.'], ['money', 'Negotiation & Best Deal', 'We help you work toward a fair deal.'], ['document', 'Documentation & Loan Support', 'Guidance with documents and loan options.'], ['approve', 'Registration & Handover', 'Support through registration and handover.']
  ];
  const reviews = [
    ['Ramesh Kumar', 'Hyderabad', 'KLL helped us buy our dream home with complete support. The process was smooth and transparent.', 'client-ramesh.jpg'],
    ['Priya Sharma', 'Vijayawada', 'We got clear guidance while selling our property. The team kept us informed at every step.', 'client-priya.jpg'],
    ['Anil Reddy', 'Bengaluru', 'Professional team, helpful advice and clear documentation. Highly recommended.', 'client-suresh.jpg']
  ];
  const questions = [
    ['How do I list my property for sale with KLL?', 'Contact our property team with the location and basic details. We can discuss valuation, documents and the next steps with you.'],
    ['Are the properties you show verified?', 'We help review available property information and documentation. Buyers should complete their own legal checks before making a purchase.'],
    ['Do you assist with home loans?', 'Yes. We can connect you with our loan team to discuss suitable home finance options.'],
    ['What documents are required for property purchase?', 'Requirements vary by property. Common items include identity and address proof, sale documents, title records and relevant approvals.'],
    ['How long does the property registration take?', 'Timing depends on document readiness, local appointments and the transaction. Our team can guide you through the process.']
  ];
  return `<main id="main" class="property-page">
    <section class="property-hero" aria-labelledby="property-title">
      <div class="property-hero-copy"><p class="property-eyebrow">PROPERTY SERVICES</p><h1 id="property-title">Find the Right Property.<br><em>Buy or Sell with Confidence.</em></h1><p class="property-lead">End-to-end property solutions for buying, selling and investing. We simplify the process and help you make the right move.</p>
        <div class="property-promises">${propertyFeatures.map(([icon, line1, line2]) => `<div>${homeIcon(icon)}<span><b>${line1}</b><br>${line2}</span></div>`).join('')}</div>
        <div class="property-actions"><a class="button" href="#property-services">Explore Properties <span aria-hidden="true">→</span></a><a class="button outline" href="${siteConfig.phoneHref}">Talk to Our Property Expert</a></div>
      </div>
      <div class="property-hero-visual"><img src="assets/loans/landing/hero.jpg" alt="Family together in front of a modern home" fetchpriority="high"><div class="property-hero-wash" aria-hidden="true"></div>
        <aside class="property-enquiry" id="property-enquiry"><h2>We’ll Help You Find Your Perfect Property</h2><p>Share your requirements and our experts will get in touch with you.</p>
          <form data-property-enquiry novalidate><label>I am looking to<select name="intent" required><option value="">Choose an option</option><option>Buy</option><option>Sell</option></select></label><label>Property Type<select name="propertyType" required><option value="">Select Property Type</option><option>Residential</option><option>Commercial</option><option>Plot / Land</option><option>Luxury Property</option></select></label><label>Preferred Location<input name="location" placeholder="Enter preferred location" maxlength="120"></label><label>Your Mobile Number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Enter mobile number" pattern="[0-9+() -]{8,40}" required></label><p class="property-form-status" aria-live="polite"></p><button class="button" type="submit">Get Free Consultation <span aria-hidden="true">→</span></button></form>
        </aside>
      </div>
    </section>
    <section class="property-benefits" aria-label="Property service benefits">${benefits.map(([icon, title, sub]) => `<div>${homeIcon(icon)}<strong>${title}<br>${sub}</strong></div>`).join('')}</section>
    <section class="property-section property-services" id="property-services"><div class="property-heading"><h2>Our Property Services</h2></div><div class="property-service-panels">
      <article class="property-service-panel property-buy"><img src="assets/loans/residential-mortgage-loan/hero.jpg" alt="Modern residential home" loading="lazy"><div class="property-panel-copy"><h3>Buying a Property?</h3><p>We help you find the right property that fits your needs and budget.</p><ul><li>Property Search &amp; Shortlisting</li><li>Site Visits &amp; Expert Guidance</li><li>Legal Verification &amp; Documentation</li><li>Home Loan Assistance</li><li>Negotiation &amp; Best Deal</li></ul><a class="property-buy-button" href="#property-enquiry" data-property-intent="Buy">Explore Properties to Buy <span aria-hidden="true">→</span></a></div></article>
      <div class="property-priority" aria-label="Your Property Our Priority">${homeIcon('property')}<b>Your Property<br>Our Priority</b></div>
      <article class="property-service-panel property-sell"><div class="property-panel-copy"><h3>Selling a Property?</h3><p>Get the best value for your property with our expert marketing and support.</p><ul><li>Property Valuation</li><li>Marketing to Genuine Buyers</li><li>Verified Buyer Network</li><li>Negotiation Support</li><li>Smooth &amp; Secure Transactions</li></ul><a class="button" href="#property-enquiry" data-property-intent="Sell">List Your Property <span aria-hidden="true">→</span></a></div><img src="assets/loans/commercial-mortgage-loan/hero.jpg" alt="Modern apartment building" loading="lazy"></article>
    </div></section>
    <section class="property-section property-types"><div class="property-heading"><h2>Properties We Support</h2></div><div class="property-type-grid">${propertyTypes.map(([icon, name, desc]) => `<article>${homeIcon(icon)}<div><h3>${name}</h3><p>${desc}</p></div></article>`).join('')}</div></section>
    <section class="property-section property-why"><article class="property-why-card"><div><h2>Why Choose KLL Property Services?</h2><ul><li>Deep market knowledge &amp; expert advice</li><li>Support reviewing property information</li><li>Transparent process &amp; honest guidance</li><li>Network of property owners and professionals</li><li>Guidance through registration steps</li></ul></div><img src="assets/loans/residential-mortgage-loan/hero.jpg" alt="A modern home and property investment" loading="lazy"></article><article class="property-offer-card"><h2>What We Offer</h2><div>${offers.map(([icon, title, desc]) => `<section>${homeIcon(icon)}<p><b>${title}</b><span>${desc}</span></p></section>`).join('')}</div></article></section>
    <section class="property-section property-process"><div class="property-heading"><h2>Our Simple 6 Step Process</h2></div><ol>${steps.map(([icon, title, desc], index) => `<li><span class="property-step-icon">${homeIcon(icon)}<b>${index + 1}</b></span><h3>${title}</h3><p>${desc}</p></li>`).join('')}</ol></section>
    <section class="property-section property-reviews-faq"><article class="property-reviews"><h2>What Our Clients Say</h2><div>${reviews.map(([name, city, quote, photo]) => `<section><div class="property-stars" aria-label="5 out of 5 stars">★★★★★</div><p>${quote}</p><div class="property-review-person"><img src="assets/home/${photo}" alt="" loading="lazy"><span><b>${name}</b><small>${city}</small></span></div></section>`).join('')}</div></article><article class="property-faq"><div class="property-section-title"><h2>Frequently Asked Questions</h2><a href="#/faq">View All FAQs →</a></div><div>${questions.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></article></section>
    <section class="property-cta"><img src="assets/loans/residential-mortgage-loan/hero.jpg" alt="A modern home" loading="lazy"><div><h2>Ready to Take the Next Step?</h2><p>Whether you want to buy your dream home or sell your property at the best price, we are here to help you.</p></div><div class="property-cta-actions"><a class="button outline" href="${siteConfig.phoneHref}">Talk to Our Expert</a><a class="button white" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">${homeIcon('whatsapp')} Chat on WhatsApp</a></div></section>
  </main>`;
}
const incomeTaxIcon = (name) => {
  const icons = {
    person: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    house: '<path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/>',
    chart: '<path d="M3 20h18M5 17l5-6 4 3 6-9M16 5h4v4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18m-11 0v2h4v-2"/>',
    document: '<path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h7M9 16h7M9 8h2"/><circle cx="16" cy="17" r="2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M5 6h14M5 18h14"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h3m2 0h3m-8 4h3"/>',
    support: '<path d="M4 13v-2a8 8 0 0 1 16 0v2M6 13h2v6H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm12 0h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>',
    upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 16v4h16v-4"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M8 11l2 2 4-4"/>',
    check: '<path d="M5 3h14v18H5zM8 8h8M8 12h3m2 0 1 1 3-3M8 17l2 1 2-2"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/>',
    refund: '<circle cx="12" cy="12" r="9"/><path d="M16 8c-1-1-2-1.5-4-1.5-2 0-3 .9-3 2.2 0 3.5 6 1.2 6 4.8 0 1.4-1.3 2.5-3.2 2.5-1.4 0-2.7-.6-3.4-1.7M12 5v14"/>',
    money: '<circle cx="12" cy="12" r="9"/><path d="M15 8c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.3 0 3.5 6 1.2 6 4.8 0 1.4-1.3 2.5-3.2 2.5-1.4 0-2.7-.6-3.4-1.7M12 5v14"/>',
    clients: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2m1-11a3 3 0 1 0 0-6m1 9a5 5 0 0 1 5 5v2h-5"/>',
    thumb: '<path d="M7 10v11H3V10zm0 10h9a3 3 0 0 0 2.9-2.2l2-7A2.2 2.2 0 0 0 18.8 8H14l.7-3A2.4 2.4 0 0 0 12.4 2L7 10z"/>',
    message: '<path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.4L3 21l2.1-5.1A8.5 8.5 0 1 1 20 11.5z"/><path d="M9 8c.4 2.5 2.5 4.6 5 5l1.3-1.3 2 1c-.2 1.3-1.2 2.1-2.5 2.1-3.7-.4-6.6-3.3-7-7"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || icons.document}</svg>`;
};
function incomeTaxPage() {
  const servicesList = [
    ['person', 'Salaried Individuals', 'File ITR with ease and claim all deductions you are eligible for.'],
    ['house', 'House Property', 'Income from house property? We help you file it the right way.'],
    ['chart', 'Capital Gains', 'Stocks, mutual funds, property sale? Report and save tax legally.'],
    ['briefcase', 'Business & Profession', 'For freelancers, consultants & professionals (ITR 3) filing made simple.'],
    ['document', 'Presumptive Taxation', 'File under Sections 44AD, 44ADA, 44AE with maximum benefits.'],
    ['globe', 'NRI Tax Filing', 'For NRIs with income in India. Accurate & compliant filing.'],
  ];
  const testimonials = [
    ['Ramesh Kumar', 'Hyderabad', 'Very professional and helpful team. Got higher refund than expected.', 'client-ramesh.jpg'],
    ['Priya Sharma', 'Bengaluru', 'Quick filing, great support and very transparent charges. Highly recommend!', 'client-priya.jpg'],
    ['Anil Reddy', 'Vijayawada', 'They helped me save tax legally and the process was so easy.', 'client-suresh.jpg'],
  ];
  const questions = [
    ['When does ITR filing start for AY 2026-27?', 'ITR filing for AY 2026-27 (FY 2025-26) starts in May 2026.'],
    ['What is the last date to file ITR?', 'The reference filing deadline shown here is 31st July 2026.'],
    ['Which ITR form is applicable to me?', 'The right form depends on your income sources, employment, business activity and other filing details. Our tax team can help you identify it.'],
    ['What documents are required for ITR filing?', 'Common documents include Form 16 or 16A, PAN and Aadhaar, bank statements, investment proofs and Form 26AS/AIS/TIS.'],
    ['Can I file ITR without Form 16?', 'Yes. Depending on your income sources, other records such as salary slips, bank statements and tax statements may be used. Ask a tax professional to review your situation.'],
  ];
  return `<main id="main" class="income-tax-page">
    <section class="income-tax-hero" aria-labelledby="income-tax-title">
      <div class="income-tax-hero-copy"><p class="income-tax-eyebrow">INCOME TAX FILING</p><h1 id="income-tax-title">Income Tax Filing<br>Made Simple.<br><em>Maximize Your Refund.</em></h1><p class="income-tax-lead">Expert assistance for individuals, salaried employees, businesses &amp; professionals. File accurately, save tax legally and stay 100% compliant.</p>
        <div class="income-tax-promises"><div>${incomeTaxIcon('document')}<span>Accurate<br>Filing</span></div><div>${incomeTaxIcon('refund')}<span>Maximum<br>Refund</span></div><div>${incomeTaxIcon('shield')}<span>100% Secure<br>&amp; Confidential</span></div><div>${incomeTaxIcon('lock')}<span>Expert<br>Support</span></div></div>
        <div class="income-tax-actions"><a class="button" href="#/income-tax" data-income-tax-scroll>File Your ITR Now <span aria-hidden="true">➜</span></a><a class="button outline" href="${siteConfig.phoneHref}">Talk to a Tax Expert ${incomeTaxIcon('support')}</a></div>
      </div>
      <div class="income-tax-visual"><img src="assets/loans/ca-loan/hero.jpg" alt="Indian chartered accountant working with a laptop at his desk" fetchpriority="high"><div class="income-tax-hero-form" id="income-tax-form"><h2>File Your ITR in 3 Easy Steps</h2><p>Get started in less than 60 seconds</p><form data-income-tax-form novalidate><label>Full Name<input name="name" autocomplete="name" required minlength="2" maxlength="120" placeholder="Enter your full name"></label><label>Mobile Number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="[0-9+() -]{8,40}" placeholder="Enter mobile number"></label><label>Select ITR Type<select name="itrType" required><option value="">Select ITR Type</option><option>ITR 1 - Salaried</option><option>ITR 2 - Capital Gains / Property</option><option>ITR 3 - Business &amp; Profession</option><option>ITR 4 - Presumptive Taxation</option><option>NRI Tax Filing</option><option>Not sure - help me choose</option></select></label><p class="income-tax-form-status" aria-live="polite"></p><button class="button" type="submit">Get Started <span aria-hidden="true">➜</span></button><div class="income-tax-form-assurance"><span>● 100% Secure</span><span>● No Spam Guarantee</span></div></form></div></div>
    </section>
    <section class="income-tax-highlights" aria-label="Income tax filing information">${[['calendar','AY 2026-27','(FY 2025-26)'],['document','ITR Filing','Starts May 2026'],['calendar','Last Date','31st July 2026'],['support','Expert CA','Assistance'],['refund','Best Refund','Guaranteed'],['money','Affordable','Pricing']].map(([icon,title,detail]) => `<div>${incomeTaxIcon(icon)}<span><strong>${title}</strong><small>${detail}</small></span></div>`).join('')}</section>
    <section class="income-tax-section income-tax-service-section"><div class="income-tax-heading centered"><h2>ITR Services for Every Need</h2></div><div class="income-tax-service-grid">${servicesList.map(([icon,title,description]) => `<article class="income-tax-service-card"><span class="income-tax-icon">${incomeTaxIcon(icon)}</span><h3>${title}</h3><p>${description}</p><a href="#/income-tax" data-income-tax-scroll>Learn More <span aria-hidden="true">→</span></a></article>`).join('')}</div></section>
    <section class="income-tax-feature-pair"><article class="income-tax-benefits"><img src="assets/about/team-meeting.jpg" alt="Financial advisors reviewing tax and financial information" loading="lazy"><div class="income-tax-benefits-shade"></div><div class="income-tax-benefits-copy"><h2>Why File ITR with KLL?</h2><ul>${['Maximum refund with legal tax planning','100% accurate filing & on-time submission','Expert CA review & support','Secure handling of your data','Quick response on queries','Affordable & transparent pricing'].map((item) => `<li>${incomeTaxIcon('check')}<span>${item}</span></li>`).join('')}</ul></div></article><article class="income-tax-documents"><div><h2>Documents You May Need</h2><ul>${[['document','Form 16 / 16A'],['lock','PAN Card & Aadhaar Card'],['document','Bank Statements'],['check','Investments Proof (80C, 80D, etc.)'],['document','Form 26AS / AIS / TIS'],['document','Other Income Proof (If any)']].map(([icon,item]) => `<li>${incomeTaxIcon(icon)}<span>${item}</span></li>`).join('')}</ul></div><img src="assets/home/blog-tax.jpg" alt="Documents prepared for tax filing" loading="lazy"></article></section>
    <section class="income-tax-section income-tax-process-section"><div class="income-tax-heading centered"><h2>Our Simple 5 Step Filing Process</h2></div><ol class="income-tax-process">${[['document','Share Details','Share your basic details & income sources'],['upload','Upload Documents','Upload required documents securely'],['search','Review & Verify','Our experts review & verify your documents'],['check','File ITR','We file your ITR accurately & on time'],['download','Get Acknowledgement','Receive ITR-V & acknowledgement']].map(([icon,title,description],index) => `<li><span class="income-tax-process-icon">${incomeTaxIcon(icon)}</span><b>${index + 1}</b><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol></section>
    <section class="income-tax-proof-grid"><article class="income-tax-trust-card"><h2>Why Clients Trust KLL</h2><div class="income-tax-trust-items">${[['clients','10,000+','ITR Filed'],['thumb','98%','Client Satisfaction'],['support','Expert','CA Team'],['lock','100%','Data Security']].map(([icon,value,label]) => `<div>${incomeTaxIcon(icon)}<span><b>${value}</b><small>${label}</small></span></div>`).join('')}</div></article><article class="income-tax-testimonials"><h2>What Our Clients Say</h2><div class="income-tax-review-grid">${testimonials.map(([name,city,quote,avatar]) => `<article><div class="income-tax-stars" aria-label="5 out of 5 stars">★★★★★</div><p>${quote}</p><div class="income-tax-review-person"><img src="assets/home/${avatar}" alt="" loading="lazy"><span><b>${name}</b><small>${city}</small></span></div></article>`).join('')}</div></article><article class="income-tax-faq"><div class="income-tax-faq-heading"><h2>Frequently Asked Questions</h2><a href="#/faq">View All FAQs →</a></div><div class="income-tax-faq-list">${questions.map(([question,answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div></article></section>
    <section class="income-tax-cta"><div class="income-tax-cta-art"><img src="assets/home/blog-tax.jpg" alt="Tax documents ready for filing" loading="lazy"></div><div><h2>Don’t Wait Till Last Date!</h2><p>File early, avoid rush and get your refund faster.</p></div><div class="income-tax-cta-actions"><a class="button outline" href="${siteConfig.phoneHref}">Talk to a Tax Expert ${incomeTaxIcon('support')}</a><a class="button white" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">${incomeTaxIcon('message')} Chat on WhatsApp</a></div></section>
  </main>`;
}
const insuranceIcon = (name) => {
  const icons = {
    family: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m1-6a5 5 0 0 1 5 5v1h-5"/>',
    health: '<path d="M12 21s-9-5.4-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.6-9 12-9 12z"/><path d="M8 12h2l1-3 2 6 1-3h2"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    chart: '<path d="M3 20h18M5 17l5-6 4 3 6-9M16 5h4v4"/>',
    car: '<path d="m5 11 2-5h10l2 5M3 11h18l1 8H2zM6 15h.01M18 15h.01M7 19v2m10-2v2"/><path d="M6 11 4 9m14 2 2-2"/>',
    house: '<path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2m1-11a3 3 0 1 0 0-6m1 9a5 5 0 0 1 5 5v2h-5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9"/>',
    rupee: '<circle cx="12" cy="12" r="9"/><path d="M8 7h9M8 10h9m-7-3c6 0 6 6 0 6h-2l7 6"/>',
    wallet: '<rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 9h18M16 14h5m-4 0h.01M6 6V4h12v2"/>',
    headset: '<path d="M3 13v-2a9 9 0 0 1 18 0v2M5 13h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm14 0h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>',
    document: '<path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h7M9 16h7M9 8h2"/><path d="m9 19 2 2 4-4"/>',
    compare: '<path d="M12 3v18M5 6h14M5 6l-3 7h6L5 6zm14 0-3 7h6l-3-7zM8 20h8"/>',
    guide: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01"/>',
    goals: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m13 11 7-7m-3 0h3v3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M5 6h14M5 18h14"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/>',
    message: '<path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.4L3 21l2.1-5.1A8.5 8.5 0 1 1 20 11.5z"/><path d="M9 8c.4 2.5 2.5 4.6 5 5l1.3-1.3 2 1c-.2 1.3-1.2 2.1-2.5 2.1-3.7-.4-6.6-3.3-7-7"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || icons.shield}</svg>`;
};
function insurancePage() {
  const solutions = [
    ['family', 'Life Insurance', 'Secure your family’s future and achieve long term financial security.'],
    ['health', 'Health Insurance', 'Quality healthcare access with cashless treatment and wide coverage.'],
    ['shield', 'Term Insurance', 'High life cover at affordable premium for your family’s financial protection.'],
    ['chart', 'ULIP Plans', 'Invest and grow your wealth while enjoying life cover benefits.'],
    ['car', 'Motor Insurance', 'Protect your vehicle with comprehensive coverage and quick claim support.'],
    ['house', 'General Insurance', 'Secure your home, travel and assets with reliable general insurance plans.'],
  ];
  const highlights = [
    ['shield', 'High Coverage', 'Comprehensive protection for you and your loved ones.'],
    ['wallet', 'Affordable Premium', 'Plans that fit your budget and your needs.'],
    ['document', 'Easy Process', 'Simple process, minimal paperwork and quick approval.'],
    ['headset', 'Claim Support', 'End-to-end claim assistance for complete peace of mind.'],
  ];
  const stages = [
    ['loans/professional-loan/hero.jpg', 'Young Achievers', 'Start early & secure your dreams with low premiums.'],
    ['loans/home-purchase-loan/hero.jpg', 'Growing Families', 'Secure your family’s future with the right protection.'],
    ['about/consultation-office.jpg', 'For Parents', 'Health & wealth protection for a worry free retirement.'],
    ['loans/doctor-loan/hero.jpg', 'Senior Citizens', 'Special plans for senior citizens with great benefits.'],
    ['loans/shared/education.jpg', 'Child Future', 'Build your child’s future with education plans.'],
    ['loans/personal-loan/hero.jpg', 'Travel Insurance', 'Travel worry free with worldwide coverage.'],
  ];
  const partners = [
    ['associated-lic.png', 'LIC'],
    ['associated-hdfc-life.png', 'HDFC Life'],
    ['associated-tata-aia.png', 'TATA AIA'],
    ['associated-icici-prudential.png', 'ICICI Prudential'],
    ['associated-bajaj-allianz.png', 'Bajaj Allianz'],
  ];
  const process = [
    ['family', 'Understand Your Need'], ['compare', 'Compare Best Plans'], ['document', 'Choose & Apply Easily'], ['shield', 'Get Your Policy & Stay Protected'],
  ];
  const reviewsForInsurance = [
    ['Ramesh Kumar', 'Hyderabad', 'KLL team helped me choose the best health insurance plan for my family. The claim support was excellent!', 'client-ramesh.jpg'],
    ['Priya Sharma', 'Vijayawada', 'Very transparent guidance and quick process. Highly recommended!', 'client-priya.jpg'],
    ['Anil Reddy', 'Bengaluru', 'Found the right term plan at the best premium. Thank you KLL!', 'client-suresh.jpg'],
  ];
  const questions = [
    ['What is the difference between term insurance and life insurance?', 'Term insurance provides life cover for a chosen period, while life insurance can include savings or maturity benefits depending on the plan.'],
    ['How do I choose the right health insurance plan?', 'Compare the cover amount, hospitals in the network, exclusions, waiting periods, co-payments and premium against your family’s needs.'],
    ['What documents are required for insurance?', 'Requirements vary by policy. Common documents include identity and address proof, photographs, and health or vehicle details for the relevant plan.'],
    ['How can I claim my insurance?', 'Contact your insurer promptly, share the policy and claim details, and submit the required documents. KLL can guide you through the process.'],
  ];
  return `<main id="main" class="insurance-page">
    <section class="insurance-hero" aria-labelledby="insurance-title">
      <div class="insurance-hero-copy"><p class="insurance-eyebrow">INSURANCE SERVICES</p><h1 id="insurance-title">Secure Today.<br>Protect Tomorrow.<br><em>Insure Your Dreams.</em></h1><p class="insurance-lead">Comprehensive insurance solutions for you, your family and your future. Get the right protection with trusted plans and expert advice.</p><div class="insurance-promises"><div>${insuranceIcon('shield')}<span>Trusted Insurance<br>Partners</span></div><div>${insuranceIcon('award')}<span>100% Claim<br>Assistance</span></div><div>${insuranceIcon('rupee')}<span>Affordable<br>Premiums</span></div><div>${insuranceIcon('family')}<span>Expert<br>Guidance</span></div></div><div class="insurance-actions"><a class="button" href="#/insurance" data-insurance-scroll="insurance-solutions">Explore Plans <span aria-hidden="true">➜</span></a><a class="button outline" href="${siteConfig.phoneHref}">Talk to an Expert ${insuranceIcon('headset')}</a></div></div>
      <div class="insurance-hero-visual"><img src="assets/insurance/hero-family.jpg" alt="Indian parents and child together at home, representing family protection" fetchpriority="high"><span class="insurance-home-outline" aria-hidden="true"></span><span class="insurance-hero-shield" aria-hidden="true">${insuranceIcon('shield')}</span><aside class="insurance-quote-card" id="insurance-quote-form"><h2>Check Your Best<br>Insurance Plan</h2><p>Get instant recommendation in 60 seconds</p><form data-insurance-form novalidate><label>Your Name<input name="name" required minlength="2" maxlength="120" autocomplete="name" placeholder="Enter your name"></label><label>Mobile Number<input name="phone" type="tel" inputmode="tel" required pattern="[0-9+() -]{8,40}" autocomplete="tel" placeholder="Enter mobile number"></label><label>Requirement<select name="requirement" required><option value="">Select Requirement</option><option>Life Insurance</option><option>Health Insurance</option><option>Term Insurance</option><option>ULIP Plans</option><option>Motor Insurance</option><option>General Insurance</option></select></label><p class="insurance-form-status" aria-live="polite"></p><button class="button" type="submit">Get Free Quote</button><div class="insurance-form-assurance"><span>● 100% Free</span><span>● No Spam</span></div></form></aside></div>
    </section>
    <section id="insurance-solutions" class="insurance-section insurance-solutions"><div class="insurance-section-heading"><h2>Insurance Solutions For Every Need</h2></div><div class="insurance-solutions-grid">${solutions.map(([icon,title,description]) => `<article class="insurance-solution-card"><span class="insurance-solution-icon">${insuranceIcon(icon)}</span><h3>${title}</h3><p>${description}</p><a href="#/insurance" data-insurance-scroll="insurance-quote-form">View Plans <span aria-hidden="true">→</span></a></article>`).join('')}</div></section>
    <section class="insurance-feature-grid"><article class="insurance-why"><img src="assets/insurance/hero-family.jpg" alt="Family protected at home" loading="lazy"><div class="insurance-why-shade"></div><div class="insurance-why-copy"><h2>Why Choose KLL Insurance Services?</h2><ul>${['Compare the best plans from top insurers','Expert advice to choose the right plan','Quick policy issuance','100% Claim support and guidance','Hassle-free documentation & assistance'].map((item) => `<li><span aria-hidden="true">✓</span>${item}</li>`).join('')}</ul></div><span class="insurance-why-shield" aria-hidden="true">${insuranceIcon('shield')}</span></article><article class="insurance-highlights"><h2>Top Plan Highlights</h2><div class="insurance-highlights-grid">${highlights.map(([icon,title,description]) => `<div><span>${insuranceIcon(icon)}</span><h3>${title}</h3><p>${description}</p></div>`).join('')}</div></article></section>
    <section class="insurance-section insurance-stages-section"><div class="insurance-section-heading"><h2>Plans For Every Stage Of Life</h2></div><div class="insurance-stages-grid">${stages.map(([src,title,description]) => `<article class="insurance-stage-card"><img src="assets/${src}" alt="${title}" loading="lazy"><h3>${title}</h3><p>${description}</p></article>`).join('')}</div></section>
    <section class="insurance-benefits-strip" aria-label="Insurance benefits">${[['shield','Financial Security','Protect your income and loved ones.'],['rupee','Tax Benefits','Save tax up to ₹46,800 under Sec 80C.'],['family','Peace of Mind','Stay worry-free with the right coverage.'],['goals','Life Goals','Achieve your dreams with financial discipline.']].map(([icon,title,description]) => `<div><span>${insuranceIcon(icon)}</span><p><strong>${title}</strong><small>${description}</small></p></div>`).join('')}<img src="assets/insurance/hero-family.jpg" alt="Family protected together" loading="lazy"></section>
    <section class="insurance-partners-process"><article class="insurance-partners"><div class="insurance-section-subheading"><h2>Our Insurance Partners</h2><a href="#/services">View All Partners →</a></div><div class="insurance-partner-row">${partners.map(([file,name]) => `<div><img src="assets/home/${file}" alt="${name}" loading="lazy"></div>`).join('')}</div></article><article class="insurance-process"><h2>Our Simple Process</h2><ol>${process.map(([icon,title],index) => `<li><span>${insuranceIcon(icon)}</span><b>${index+1}</b><h3>${title}</h3></li>`).join('')}</ol></article></section>
    <section class="insurance-reviews-faq"><article class="insurance-reviews"><h2>What Our Customers Say</h2><div class="insurance-review-grid">${reviewsForInsurance.map(([name,city,quote,photo]) => `<article><div class="insurance-stars" aria-label="5 out of 5 stars">★★★★★</div><p>${quote}</p><div><img src="assets/home/${photo}" alt="" loading="lazy"><span><b>${name}</b><small>${city}</small></span></div></article>`).join('')}</div></article><article class="insurance-faq"><div class="insurance-section-subheading"><h2>Frequently Asked Questions</h2><a href="#/faq">View All FAQs →</a></div><div class="insurance-faq-list">${questions.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></article></section>
    <section class="insurance-cta"><img src="assets/loans/shared/medical.jpg" alt="Insurance and family health protection" loading="lazy"><div><h2>Let Us Help You Protect What Matters Most</h2><p>Talk to our insurance expert and find the right plan for you and your family.</p></div><div class="insurance-cta-actions"><a class="button outline" href="${siteConfig.phoneHref}">Talk to an Expert ${insuranceIcon('headset')}</a><a class="button white" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">${insuranceIcon('message')} Chat on WhatsApp</a></div></section>
  </main>`;
}
function bind() {
  const route = location.hash.replace('#', '') || '/';
  if (route === '/property-management') {
    const menuButton = document.querySelector('.menu-button');
    const primaryNav = document.querySelector('#primary-nav');
    menuButton?.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      primaryNav?.classList.toggle('open', !expanded);
    });
    const form = document.querySelector('[data-property-enquiry]');
    const status = form?.querySelector('.property-form-status');
    document.querySelectorAll('.property-page a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
      event.preventDefault();
      const intent = form?.querySelector('[name="intent"]');
      if (link.dataset.propertyIntent && intent) intent.value = link.dataset.propertyIntent;
      document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const phone = form.querySelector('[name="phone"]');
      const digits = phone.value.replace(/\D/g, '');
      phone.setCustomValidity(digits.length >= 8 && digits.length <= 15 ? '' : 'Enter a valid mobile number with 8 to 15 digits.');
      if (!form.checkValidity()) {
        status.textContent = 'Choose whether you are buying or selling, select a property type and enter a valid mobile number.';
        status.classList.add('is-error');
        form.reportValidity();
        return;
      }
      const values = new FormData(form);
      const message = `Property consultation request\nLooking to: ${values.get('intent')}\nProperty type: ${values.get('propertyType')}\nPreferred location: ${values.get('location') || 'Not specified'}\nMobile number: ${values.get('phone')}`;
      const chatUrl = `${siteConfig.whatsappHref}${siteConfig.whatsappHref.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
      window.open(chatUrl, '_blank', 'noopener,noreferrer');
      status.textContent = 'Your details are ready in WhatsApp. Press Send there to share your request with our team.';
      status.classList.remove('is-error');
    });
    return;
  }
  if (route === '/insurance') {
    document.querySelectorAll('[data-insurance-scroll]').forEach((link) => link.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById(link.dataset.insuranceScroll)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));
    const form = document.querySelector('[data-insurance-form]');
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.insurance-form-status');
      const phone = form.querySelector('[name="phone"]');
      const digitCount = phone.value.replace(/\D/g, '').length;
      phone.setCustomValidity(digitCount >= 8 && digitCount <= 15 ? '' : 'Enter a valid mobile number with 8 to 15 digits.');
      if (!form.checkValidity()) {
        status.textContent = 'Please enter your name, a valid mobile number and choose an insurance requirement.';
        status.classList.add('is-error');
        form.reportValidity();
        return;
      }
      status.textContent = 'Your details are valid. Please call or WhatsApp our team to continue; online quote submission is not connected yet.';
      status.classList.remove('is-error');
    });
    return;
  }
  if (route === '/resources') {
    const searchForm = document.querySelector('[data-resources-search]');
    const searchInput = searchForm?.querySelector('[name="query"]');
    searchForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLocaleLowerCase();
      let matches = 0;
      document.querySelectorAll('.resources-page [data-resource-search]').forEach((item) => {
        const visible = !query || item.dataset.resourceSearch.toLocaleLowerCase().includes(query);
        item.hidden = !visible;
        if (visible) matches += 1;
      });
      document.querySelectorAll('.resources-page [data-resources-section]').forEach((section) => {
        const hasVisibleItem = [...section.querySelectorAll('[data-resource-search]')].some((item) => !item.hidden);
        section.hidden = Boolean(query) && !hasVisibleItem;
      });
      const emptyMessage = document.querySelector('[data-resources-empty]');
      emptyMessage.hidden = Boolean(!query || matches);
    });
    document.querySelectorAll('[data-resources-scroll]').forEach((link) => link.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById(link.dataset.resourcesScroll)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));
    const newsletter = document.querySelector('[data-resources-newsletter]');
    newsletter?.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = newsletter.querySelector('.resources-newsletter-status');
      if (!newsletter.checkValidity()) {
        status.textContent = 'Enter a valid email address to continue.';
        status.classList.add('is-error');
        newsletter.reportValidity();
        return;
      }
      status.textContent = 'Your email is valid. Newsletter sign-up is not connected yet.';
      status.classList.remove('is-error');
    });
    return;
  }
  if (route !== '/income-tax') return;
  document.querySelectorAll('[data-income-tax-scroll]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#income-tax-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.querySelector('#income-tax-form input[name="name"]')?.focus({ preventScroll: true });
  }));
  const form = document.querySelector('[data-income-tax-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.income-tax-form-status');
    if (!form.checkValidity()) {
      status.textContent = 'Please enter your name, a valid mobile number and select an ITR type.';
      status.classList.add('is-error');
      form.reportValidity();
      return;
    }
    status.textContent = 'Your details are valid. Please call our tax team to continue; online ITR submission is not connected yet.';
    status.classList.remove('is-error');
  });
}
function servicesHub() { return `<main id="main"><section class="page-hero simple"><p class="eyebrow">Explore services</p><h1>Financial services for your needs</h1><p class="lead">Browse loan options and related services from KLL Financial &amp; Marketing Services.</p></section><section class="section">${cards(services)}</section>${cta()}</main>`; }
function contact() { return `<main id="main"><section class="page-hero contact-hero"><div><p class="eyebrow">Get in touch</p><h1>Let’s talk about your needs.</h1><p class="lead">Contact our team for guidance on loans, insurance, income tax and property services.</p></div><aside><h2>Send an enquiry</h2>${leadForm()}</aside></section><div class="contact-bar"><a href="${siteConfig.phoneHref}"><b>Call us</b>${esc(siteConfig.phone)}</a><a href="${siteConfig.whatsappHref}"><b>WhatsApp</b>Chat with our team</a><a href="mailto:${esc(siteConfig.email)}"><b>Email</b>${esc(siteConfig.email)}</a><span><b>Office</b>Address details available on request</span></div><section class="section contact-grid"><article><h2>How can we help?</h2><p>Send us your questions and our team will follow up.</p></article><aside class="location-card"><h2>Our Office Location</h2><div class="map-placeholder">Map integration placeholder<br><a href="https://maps.google.com" target="_blank" rel="noopener">Open Google Maps</a></div><p>Address details are available in the approved business brief.</p></aside></section></main>`; }
function simplePage(title, description) { return `<main id="main"><section class="page-hero simple"><p class="eyebrow">KLL Financial &amp; Marketing Services</p><h1>${title}</h1><p class="lead">${description}</p></section><section class="section"><h2>How we can help</h2><p>${description}</p><a class="button" href="#/contact">Talk to our team</a></section>${cta()}</main>`; }
const aboutIcon = (name) => {
  const shapes = {
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5v1"/>',
    rupee: '<path d="M6 4h12M6 8h12M8 4c7 0 7 8 0 8h-2l9 8"/>',
    bank: '<path d="m3 9 9-5 9 5M5 10v8m5-8v8m8-8v8M3 20h18M2 22h20"/>',
    thumb: '<path d="M7 10v11H3V10zm0 10h9a3 3 0 0 0 2.9-2.2l2-7A2.2 2.2 0 0 0 18.8 8H14l.7-3A2.4 2.4 0 0 0 12.4 2L7 10z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m13 11 7-7m-3 0h3v3"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    handshake: '<path d="m3 12 4-4 4 2 2-1 6 3-6 6-4-2-3 2-3-3zm4-4 2-3 5 1 2-2 5 4-2 3M8 15l3 2m1-3 3 2m1-4 2 1"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    team: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20v-1a7 7 0 0 1 14 0v1zm15-5a5 5 0 0 1 5 5h-4"/>',
    journey: '<path d="M4 19 9 5l3 8 3-5 5 11zM3 21h18"/><circle cx="9" cy="5" r="2"/>',
    growth: '<path d="M3 17 9 11l4 4 8-9M15 6h6v6"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${shapes[name] || shapes.star}</svg>`;
};
function about() {
  const leaders = [
    ['KLL. Rajendra', 'Founder & CEO', 'Visionary leader with over 10 years of experience in financial services.', 'leader-rajendra.jpg'],
    ['KLL. Rupai Pawala Mithra', 'Co-Founder & Director', 'Expert in business strategy and client relationship management.', 'leader-rupai.jpg'],
    ['KLL. Sunitha', 'Director – Operations', 'Operations specialist ensuring smooth processes and client delight.', 'leader-sunitha.jpg'],
    ['KLL. Venkat Das', 'Director – Business Development', 'Passionate about growth, partnerships and delivering value.', 'leader-venkat.jpg'],
  ];
  const values = [
    ['Integrity', 'We believe in honesty, transparency and ethical practices.', 'handshake'],
    ['Customer First', 'Our clients’ goals and satisfaction are always our top priority.', 'people'],
    ['Excellence', 'We strive for excellence in everything we do.', 'star'],
    ['Teamwork', 'We grow together, support each other and deliver the best.', 'team'],
  ];
  const journey = [
    ['2014', 'KLL FM was founded with a vision to simplify financial services.', 'journey'],
    ['2016', 'Expanded our services and partnered with leading banks.', 'bank'],
    ['2018', 'Reached 1,000+ happy clients across multiple cities.', 'people'],
    ['2020', 'Launched digital platforms for a better client experience.', 'growth'],
    ['2022', 'Processed ₹500+ Cr in loans with 35+ banking partners.', 'rupee'],
    ['2024+', 'Continuing our journey towards becoming India’s most trusted financial partner.', 'team'],
  ];
  return `<main id="main" class="about-page">
    <section class="about-hero" aria-labelledby="about-title">
      <div class="about-hero-copy"><nav class="about-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><span aria-hidden="true">›</span><span aria-current="page">About Us</span></nav><p class="about-eyebrow">ABOUT US</p><h1 id="about-title">Your Financial Growth<br>is <em>Our Responsibility.</em></h1><p class="about-lead">At KLL Financial &amp; Marketing Services, we are committed to delivering smart, transparent and personalized financial solutions that help individuals, families and businesses achieve their goals.</p><a class="about-outline-button" href="#our-story">Know More About Us <span aria-hidden="true">→</span></a></div>
      <img class="about-hero-image" src="assets/about/consultation-office.jpg" alt="A KLL financial advisor meeting with customers in the company office" fetchpriority="high">
    </section>
    <section class="about-stats" aria-label="KLL at a glance">
      <div class="about-stat">${aboutIcon('people')}<p><strong>10+</strong><span>Years of Experience</span></p></div>
      <div class="about-stat">${aboutIcon('people')}<p><strong>9,000+</strong><span>Happy Clients</span></p></div>
      <div class="about-stat">${aboutIcon('rupee')}<p><strong>₹800+ Cr</strong><span>Loans Processed</span></p></div>
      <div class="about-stat">${aboutIcon('bank')}<p><strong>40+</strong><span>Banking Partners</span></p></div>
      <div class="about-stat">${aboutIcon('thumb')}<p><strong>98%</strong><span>Client Satisfaction</span></p></div>
    </section>
    <section class="about-story about-shell" id="our-story">
      <div class="about-story-copy"><p class="about-eyebrow">OUR STORY</p><h2>Built on Trust.<br>Driven by <em>Values.</em></h2><p>KLL Financial &amp; Marketing Services was founded with a simple vision — to make financial services easy, accessible and beneficial for everyone.</p><p>From a small team of passionate professionals, we have grown into a trusted financial advisory partner for thousands of individuals and businesses across India.</p><p>Our goal is not just to provide financial products, but to build long-term relationships based on trust, transparency and results.</p></div>
      <div class="about-story-visual"><img src="assets/about/team-meeting.jpg" alt="KLL financial professionals reviewing charts together in a meeting"><div class="about-trust-badge">${aboutIcon('shield')}<span>Trusted by Thousands.<br>Recommended for a Reason.</span></div></div>
    </section>
    <section class="about-purpose about-shell">
      <div class="about-mission"><p class="about-eyebrow">OUR MISSION &amp; VISION</p><div class="about-mission-grid"><article class="about-mission-card"><span class="about-round-icon">${aboutIcon('target')}</span><h3>Our Mission</h3><p>To provide customized financial solutions with integrity and transparency, empowering our clients to achieve their dreams and secure their future.</p></article><article class="about-mission-card"><span class="about-round-icon">${aboutIcon('eye')}</span><h3>Our Vision</h3><p>To be India’s most trusted financial services brand, known for innovation, client satisfaction and societal contribution.</p></article></div></div>
      <div class="about-values"><p class="about-eyebrow">OUR CORE VALUES</p><div class="about-values-grid">${values.map(([title, description, iconName]) => `<article class="about-value-card"><span class="about-round-icon">${aboutIcon(iconName)}</span><div><h3>${title}</h3><p>${description}</p></div></article>`).join('')}</div></div>
    </section>
    <section class="about-leadership about-shell"><p class="about-eyebrow">OUR LEADERSHIP TEAM</p><div class="about-leader-grid">${leaders.map(([name, role, description, image]) => `<article class="about-leader-card"><img src="assets/about/${image}" alt="${name}" loading="lazy"><div><h3>${name}</h3><p class="about-leader-role">${role}</p><p>${description}</p></div></article>`).join('')}</div></section>
    <section class="about-journey about-shell"><p class="about-eyebrow">OUR JOURNEY</p><ol class="about-timeline">${journey.map(([year, description, iconName]) => `<li><span class="about-timeline-icon">${aboutIcon(iconName)}</span><h3>${year}</h3><p>${description}</p></li>`).join('')}</ol></section>
    <section class="about-cta about-shell"><div><h2>Let’s Build Your Financial Future Together</h2><p>Have questions or need expert advice? We’re here to help.</p></div><div class="about-cta-actions"><a class="about-cta-call" href="${siteConfig.phoneHref}">Talk to an Expert <span aria-hidden="true">☎</span></a><a class="about-cta-whatsapp" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener"><span class="about-whatsapp-mark" aria-hidden="true">WA</span> Chat on WhatsApp</a></div></section>
  </main>`;
}
function resourcesIcon(name) {
  const paths = {
    home: '<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3z"/><path d="M12 8v8m-3-3h6"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    tax: '<rect x="4" y="3" width="13" height="18" rx="2"/><path d="M8 7h5m-5 4h5m-5 4h3m9-5v11m-3-3h6"/>',
    property: '<path d="m2 11 10-8 10 8M5 10v11h14V10M9 21v-7h6v7m4-10 3 2v8"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8v4H8zm0 8h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m14 10 7-7m-4 0h4v4"/>',
    book: '<path d="M12 7v14m0-14C9 4 5 3 2 4v14c4-1 7 0 10 3m0-14c3-3 7-4 10-3v14c-4-1-7 0-10 3"/>',
    umbrella: '<path d="M3 12a9 9 0 0 1 18 0H3zm9 0v7a3 3 0 0 0 6 0"/><path d="M7 7 6 5m11 2 1-2m-6-1V2"/>',
    document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6m-12 4h8m-8 4h8m-8 4h5"/>',
    article: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    trend: '<path d="M3 3v18h18M7 16l5-5 4 3 6-8"/><path d="M17 6h5v5"/>',
    money: '<circle cx="12" cy="12" r="9"/><path d="M15 8c-.6-1-1.5-1.5-3-1.5-1.7 0-3 .8-3 2s1.2 1.8 3 2.2 3 1 3 2.3-1.3 2.2-3 2.2c-1.4 0-2.5-.5-3.2-1.6M12 5v14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.article}</svg>`;
}
function resources() {
  const categories = [
    ['home', 'Loans', 'Home Loans, Personal Loans, Business Loans, Loan Guides & Eligibility Tips.', 'loans personal business guides eligibility', '#/loans'],
    ['shield', 'Insurance', 'Life, Health, Motor & General Insurance guides, benefits & claim process.', 'insurance life health motor claims guides', '#/insurance'],
    ['tax', 'Income Tax', 'ITR Filing, Tax Saving Tips, Deductions, Exemptions & Compliance.', 'income tax itr filing deductions compliance', '#/income-tax'],
    ['property', 'Property / Real Estate', 'Buying & Selling Tips, Market Trends, Legal Checks & Real Estate Insights.', 'property real estate buying selling market legal', '#/property-management'],
    ['calculator', 'Calculators & Tools', 'EMI Calculators, Tax Calculators, Affordability Calculators & more.', 'calculators tools emi tax affordability', '#/calculators'],
    ['target', 'Financial Planning', 'Budgeting, Saving, Investing & Wealth Creation Resources.', 'financial planning budgeting saving investing wealth', '#/resources'],
  ];
  const articles = [
    ['assets/home/blog-home-loan.jpg', 'How to Choose the Right Home Loan for Your Dream Home', 'Home Loan Guide', '5 min read', 'home loan guide house finance eligibility', '#/loans/home-loan'],
    ['assets/home/blog-tax.jpg', 'Top 10 Tax Saving Investments under Section 80C', 'Tax Planning', '4 min read', 'tax saving investments section 80c income tax', '#/income-tax'],
    ['assets/home/blog-insurance.jpg', 'Term Insurance vs Endowment Plan: Which is Better?', 'Insurance Guide', '6 min read', 'insurance term endowment family protection', '#/insurance'],
    ['assets/resources/home-loan-documents.svg', 'Documents Required for Home Loan in 2024', 'Home Loan', '3 min read', 'home loan documents paperwork property', '#/loans/home-loan'],
  ];
  const tools = [
    ['calculator', 'Home Loan EMI Calculator', 'Calculate your monthly EMI instantly', 'home loan emi calculator', '#/loans/home-loan'],
    ['tax', 'Income Tax Calculator', 'Explore income-tax filing and tax guidance', 'income tax calculator itr tax', '#/income-tax'],
    ['home', 'Home Loan Eligibility Calculator', 'Check home-loan options and eligibility', 'home loan eligibility calculator', '#/loans/home-loan'],
    ['money', 'Personal Loan EMI Calculator', 'Explore personal loan options and payments', 'personal loan emi calculator', '#/loans/personal-loan'],
    ['document', 'Stamp Duty & Registration Calculator', 'Property registration tools are not available yet', 'stamp duty registration calculator property', ''],
  ];
  const faqs = [
    ['How can I check my eligibility for a home loan?', 'Eligibility depends on factors such as income, existing obligations, credit profile, loan amount and tenure. Start with the home-loan eligibility form to discuss your situation.'],
    ['What is the minimum income required for a personal loan?', 'Minimum income criteria vary by lender, location and employment profile. Check the current requirements with the lender before applying.'],
    ['Which documents are required for ITR filing?', 'Common documents include Form 16, PAN, Aadhaar, bank statements, investment proofs and income details relevant to your return.'],
    ['How can I save more tax legally?', 'Review eligible deductions and exemptions for your circumstances and compare the available tax regimes. Consult a tax professional for personal advice.'],
    ['How do I choose the right insurance plan?', 'Compare cover, exclusions, waiting periods, claim support and premiums against your needs and budget.'],
  ];
  const marketUpdates = [
    'RBI repo-rate decisions: what borrowers should know',
    'Home loan interest rates: what affects your EMI',
    'Budget highlights and what they may mean for you',
    'Gold prices: key factors to understand',
  ];
  const knowledge = [
    ['book', 'Loan Guides', 'Step-by-step guides to help you understand different types of loans.', 'loan guides home personal business', '#/loans'],
    ['umbrella', 'Insurance Guides', 'Understand policies, benefits, claims and how to choose the right plan.', 'insurance guides policies benefits claims', '#/insurance'],
    ['document', 'Tax Guides', 'Everything you need to know about ITR filing, deductions and tax planning.', 'tax guides itr deductions planning', '#/income-tax'],
  ];
  return `<main id="main" class="resources-page">
    <section class="resources-hero" aria-labelledby="resources-title">
      <div class="resources-hero-copy"><p class="resources-eyebrow">RESOURCES CENTER</p><h1 id="resources-title">Knowledge Today,<br><span class="resources-heading-line"><em>Better Decisions</em> Tomorrow.</span></h1><p class="resources-lead">Your trusted hub for financial knowledge, expert insights, and tools to help you make informed decisions about loans, insurance, taxes, and property.</p>
        <div class="resources-benefits"><div>${resourcesIcon('shield')}<span>Expert<br>Insights</span></div><div>${resourcesIcon('document')}<span>Up-to-Date<br>Information</span></div><div>${resourcesIcon('book')}<span>Practical<br>Guides</span></div><div>${resourcesIcon('calculator')}<span>Smart<br>Tools</span></div></div>
        <form class="resources-search" data-resources-search role="search"><label class="sr-only" for="resources-query">Search resources</label><span>${resourcesIcon('search')}</span><input id="resources-query" name="query" type="search" placeholder="Search for articles, guides, tools &amp; more..."><button type="submit">Search</button></form>
      </div>
      <img class="resources-hero-art" src="assets/about/team-meeting.jpg" alt="Financial professionals reviewing market charts together in a bright office" fetchpriority="high">
    </section>
    <p class="resources-no-results" data-resources-empty hidden>No matching resources found</p>
    <section class="resources-block resources-search-section" data-resources-section><h2>Explore Resources by Category</h2><div class="resources-category-grid">${categories.map(([icon,title,description,terms,href]) => `<article class="resources-category-card" data-resource-search="${terms}"><span>${resourcesIcon(icon)}</span><h3>${title}</h3><p>${description}</p><a href="${href}"${title === 'Financial Planning' ? ' data-resources-scroll="resources-knowledge"' : ''}>Explore <b aria-hidden="true">→</b></a></article>`).join('')}</div></section>
    <section class="resources-feature-layout resources-search-section" data-resources-section>
      <article class="resources-panel resources-featured" data-resources-section><div class="resources-panel-heading"><h2>Featured Resources</h2><a href="#/resources" data-resources-scroll="resources-featured">View All Articles <span>→</span></a></div><div class="resources-article-list">${articles.map(([image,title,category,time,terms,href]) => `<a class="resources-article" href="${href}" data-resource-search="${terms}"><img src="${image}" alt="${title}" loading="lazy"><span class="resources-article-copy"><strong>${title}</strong><small><b>${category}</b><i>${time}</i></small></span></a>`).join('')}</div></article>
      <article class="resources-panel resources-tools" data-resources-section><div class="resources-panel-heading"><h2>Popular Tools &amp; Calculators</h2><a href="#/calculators">View All Tools <span>→</span></a></div><div class="resources-tool-list">${tools.map(([icon,title,description,terms,href]) => href ? `<a class="resources-tool" href="${href}" data-resource-search="${terms}"><span>${resourcesIcon(icon)}</span><span><strong>${title}</strong><small>${description}</small></span>${resourcesIcon('arrow')}</a>` : `<div class="resources-tool resources-tool-disabled" aria-disabled="true" data-resource-search="${terms}"><span>${resourcesIcon(icon)}</span><span><strong>${title}</strong><small>${description}</small></span><small class="resources-coming-soon">Soon</small></div>`).join('')}</div></article>
      <article class="resources-market resources-search-section" data-resources-section id="resources-updates"><h2>Market &amp; Finance Updates</h2><p class="resources-market-note">Editorial explainers, not live market data.</p><svg class="resources-market-chart" viewBox="0 0 360 150" role="img" aria-label="Illustrative orange finance growth chart"><path class="resources-chart-grid" d="M18 25H340M18 65H340M18 105H340"/><g class="resources-chart-bars"><path d="M32 116V93h22v23zm51 0V76h22v40zm51 0V86h22v30zm51 0V55h22v61zm51 0V43h22v73zm51 0V22h22v94z"/></g><path class="resources-chart-line" d="m27 91 45-20 35 12 42-31 39 15 39-37 40 10 53-31"/><path class="resources-chart-arrow" d="M303 9h20v20"/></svg><ul>${marketUpdates.map((title) => `<li data-resource-search="${title} guide market finance update"><span>✓</span>${title}</li>`).join('')}</ul><a class="resources-market-button" href="#/resources" data-resources-scroll="resources-updates">View All Updates <b>→</b></a></article>
    </section>
    <section class="resources-lower-layout">
      <section class="resources-panel resources-knowledge resources-search-section" data-resources-section id="resources-knowledge"><div class="resources-panel-heading"><h2>Knowledge Center</h2><a href="#/resources" data-resources-scroll="resources-knowledge">View All Guides <span>→</span></a></div><div class="resources-knowledge-grid">${knowledge.map(([icon,title,description,terms,href]) => `<article data-resource-search="${terms}"><span>${resourcesIcon(icon)}</span><h3>${title}</h3><p>${description}</p><a href="${href}">Read More <b>→</b></a></article>`).join('')}</div></section>
      <section class="resources-panel resources-faq resources-search-section" data-resources-section><div class="resources-panel-heading"><h2>Frequently Asked Questions</h2><a href="#/faq">View All FAQs <span>→</span></a></div><div class="resources-faq-list">${faqs.map(([question,answer]) => `<details data-resource-search="${question}"><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div></section>
    </section>
    <section class="resources-newsletter"><img src="assets/resources/newsletter.svg" alt="Newsletter documents and a protection shield" loading="lazy"><div><h2>Stay Informed. Stay Ahead.</h2><p>Subscribe to our newsletter and get expert tips, updates and exclusive offers delivered to your inbox.</p></div><form data-resources-newsletter novalidate><label class="sr-only" for="resources-email">Email address</label><input id="resources-email" name="email" type="email" required maxlength="254" autocomplete="email" placeholder="Enter your email address"><button type="submit">Subscribe Now</button><p class="resources-newsletter-status" aria-live="polite"></p></form></section>
  </main>`;
}
function faq() { return `<main id="main"><section class="page-hero simple"><p class="eyebrow">Questions and answers</p><h1>Frequently asked questions</h1><p class="lead">A few helpful details before you get in touch.</p></section><section class="section faq-list">${[['How do I get started?', 'Send an enquiry or call our team and tell us which service you need.'], ['What information should I share?', 'Share your contact details and a short description of your requirement. Our team will advise on next steps.'], ['How will you contact me?', 'Our team will follow up using the contact information you provide.']].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>${cta()}</main>`; }
function contactIcon(name) {
  const paths = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.2a2 2 0 0 1-.6 1.8L7.2 10.5a16 16 0 0 0 6.3 6.3l1.8-1.8a2 2 0 0 1 1.8-.6l3.2.5a2 2 0 0 1 1.7 2z"/>',
    headset: '<path d="M3 13v-2a9 9 0 0 1 18 0v2M5 13h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm14 0h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zM17 20a5 5 0 0 1-5 2h-1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5v1"/>',
    chat: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
    message: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.1A8.5 8.5 0 1 1 21 11.5z"/><path d="m8 12 2.5 2.5L16 9"/>',
    support: '<path d="M4 13v-2a8 8 0 0 1 16 0v2M6 13h2v6H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm12 0h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/><path d="M12 4v2m-2 13h4"/>',
    guide: '<path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h4"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.message}</svg>`;
}
function contactPage() {
  const offices = [
    ['Head Office - Hyderabad', '2nd Floor, KLLFM Tower, Ameerpet, Hyderabad - 500016, Telangana, India'],
    ['Vijayawada', '40-1-8, Near Benz Circle, Patamata, Vijayawada - 520010, Andhra Pradesh, India'],
    ['Bengaluru', '#202, 1st Floor, 16th Cross, Koramangala, Bengaluru - 560034, Karnataka, India'],
    ['Visakhapatnam', 'Door No. 47-12-20, 2nd Floor, Dwaraka Nagar, Visakhapatnam - 530016, Andhra Pradesh, India'],
  ];
  const benefits = [
    ['Quick & Easy', 'Reach us in the way that’s convenient for you.', 'headset'],
    ['Personalized Support', 'Get solutions tailored to your needs.', 'people'],
    ['Transparent Communication', 'Clear answers and honest guidance always.', 'guide'],
    ['Long Term Relationship', 'We’re with you at every step of your financial journey.', 'shield'],
  ];
  const officeAddress = 'Padmaja Apartments, 1st Floor, Road No 3, SR Nagar, Hyderabad - 500038, Telangana, India';
  const officeMapQuery = officeAddress;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeMapQuery)}`;
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(officeMapQuery)}&z=19&output=embed`;
  return `<main id="main" class="contact-page">
    <section class="contact-hero-grid">
      <div class="contact-hero-copy"><p class="contact-eyebrow">CONTACT US</p><h1>We’re Here to Help You<br><em>Every Step of the Way.</em></h1><p class="contact-hero-description">Have a question or need assistance? Our expert team is ready to help you with loans, insurance, tax filing, and property solutions.</p><div class="contact-promises"><div>${contactIcon('headset')}<span>Expert<br>Support</span></div><div>${contactIcon('clock')}<span>Quick<br>Response</span></div><div>${contactIcon('shield')}<span>Trusted<br>Advisors</span></div><div>${contactIcon('people')}<span>Client<br>First Approach</span></div></div></div>
      <img class="contact-hero-image" src="assets/contact/office-reception.jpg" alt="Modern reception at KLL Financial &amp; Marketing Services" fetchpriority="high">
    </section>
    <section class="contact-info-grid" aria-label="Contact information">
      <a class="contact-info-card" href="${siteConfig.phoneHref}">${contactIcon('phone')}<span><strong>Call Us</strong><b>${esc(siteConfig.phone)}</b><small>Mon - Sat | 9:30 AM - 7:00 PM</small></span></a>
      <a class="contact-info-card" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">${contactIcon('chat')}<span><strong>WhatsApp</strong><b>${esc(siteConfig.phone)}</b><small>Chat with us anytime</small></span></a>
      <a class="contact-info-card" href="mailto:${esc(siteConfig.email)}">${contactIcon('mail')}<span><strong>Email Us</strong><b>${esc(siteConfig.email)}</b><small>We reply within 24 hrs</small></span></a>
      <div class="contact-info-card">${contactIcon('clock')}<span><strong>Office Hours</strong><b>Mon - Sat | 9:30 AM - 7:00 PM</b><small>Sunday by appointment</small></span></div>
    </section>
    <section class="contact-message-location contact-shell">
      <article class="contact-panel contact-form-panel"><h2>Send Us a Message</h2><p class="contact-panel-intro">Fill out the form and our team will get back to you shortly.</p>
        <form class="contact-form" data-lead-form novalidate><input type="hidden" name="service" value="General Enquiry"><input class="honeypot" name="website" tabindex="-1" autocomplete="off">
          <div class="contact-form-row"><label><span class="sr-only">Your Name</span><input name="name" placeholder="Your Name" required autocomplete="name"></label><label><span class="sr-only">Mobile Number</span><input name="phone" placeholder="Mobile Number" required inputmode="tel" autocomplete="tel" pattern="[0-9+() -]{8,}"></label></div>
          <div class="contact-form-row"><label><span class="sr-only">Email Address</span><input name="email" placeholder="Email Address" required type="email" autocomplete="email"></label><label><span class="sr-only">Service You’re Interested In</span><select name="interest" required><option value="">Service You’re Interested In</option>${services.map((item) => `<option>${esc(item.name)}</option>`).join('')}<option>General Enquiry</option></select></label></div>
          <label><span class="sr-only">Subject</span><input name="subject" placeholder="Subject" required maxlength="160"></label>
          <label><span class="sr-only">Your Message</span><textarea name="message" placeholder="Your Message" rows="4" required maxlength="4000"></textarea></label>
          <p class="form-status" aria-live="polite"></p><button class="button contact-submit" type="submit">Send Message <span aria-hidden="true">➤</span></button><p class="contact-privacy">${contactIcon('shield')}<span>Your information is safe with us. We never spam.</span></p>
        </form>
      </article>
      <article class="contact-panel contact-location-panel"><h2>Our Office Location</h2><div class="contact-map"><iframe title="Map to Padmaja Apartments, SR Nagar, Hyderabad" src="${mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><div class="contact-map-card"><strong>KLL Financial &amp; Marketing Services</strong><p>${officeAddress}</p><a href="${mapUrl}" target="_blank" rel="noopener">View on Google Maps</a></div></div></article>
    </section>
    <section class="contact-offices contact-shell"><h2>Meet Us at Our Offices</h2><div class="contact-office-grid">${offices.map(([name, address]) => `<article class="contact-office-card">${contactIcon('pin')}<div><h3>${name}</h3><p>${address}</p><a href="${siteConfig.phoneHref}">${contactIcon('phone')}<span>${esc(siteConfig.phone)}</span></a></div></article>`).join('')}</div></section>
    <section class="contact-benefits contact-shell"><h2>Why Clients Love Connecting with Us</h2><div class="contact-benefit-grid">${benefits.map(([title, description, icon]) => `<article class="contact-benefit-card">${contactIcon(icon)}<div><h3>${title}</h3><p>${description}</p></div></article>`).join('')}</div></section>
    <section class="contact-cta contact-shell"><div class="contact-cta-illustration">${contactIcon('headset')}</div><div class="contact-cta-copy"><h2>Still have questions?</h2><p>Our experts are just a call away.<br>Let’s build your financial success together.</p></div><div class="contact-cta-actions"><a href="${siteConfig.phoneHref}">Call Us Now ${contactIcon('phone')}</a><a href="${siteConfig.whatsappHref}" target="_blank" rel="noopener"><span class="contact-whatsapp-mark">WA</span> Chat on WhatsApp</a></div></section>
  </main>`;
}
function render() {
  const route = location.hash.replace('#', '') || '/';
  const slug = route.match(/^\/service\/(.+)$/)?.[1];
  const item = slug && service(slug);
  const loanPage = loanPages.find((page) => page.route === route || page.aliases?.includes(route));
  const allLoans = route === '/loans';
  document.body.classList.toggle('route-loan', Boolean(loanPage) || allLoans);
  document.body.classList.toggle('route-home', route === '/' || route === '/calculators');
  document.body.classList.toggle('route-about', route === '/about');
  document.body.classList.toggle('route-contact', route === '/contact');
  document.body.classList.toggle('route-property-services', route === '/property-management');
  const content = loanPage ? renderLoanPage(loanPage) : allLoans ? renderAllLoansPage() : route === '/' ? home() : route === '/services' ? servicesHub() : item ? servicePage(item) : route === '/insurance' ? insurancePage() : route === '/income-tax' ? incomeTaxPage() : route === '/property-management' ? propertyServicesPage() : route === '/contact' ? contactPage() : route === '/about' ? about() : route === '/resources' ? resources() : route === '/faq' ? faq() : route === '/privacy' ? simplePage('Privacy Policy', 'We use the details you share to respond to this enquiry.') : route === '/terms' ? simplePage('Terms and Conditions', 'Please contact our team if you have questions about our services.') : home();
  app.innerHTML = header() + content + footer() + '<a class="whatsapp-float" href="' + siteConfig.whatsappHref + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.5 28.5l6.3-1.6A12.7 12.7 0 1 0 16 3.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M11.1 9.4c-.3-.6-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.3 3.6 1.5 3.9c.2.3 2.6 4.1 6.4 5.6 3.2 1.3 3.8 1 4.5 1 .7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.4.4-.6.1-.2 0-.5 0-.6-.1-.2-.8-2-1.1-2.7Z" fill="currentColor"/></svg></a>';
  bind();
  if (route === '/calculators') document.querySelector('.home-calculator')?.scrollIntoView({ block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
}
window.addEventListener('hashchange', render);
render();
