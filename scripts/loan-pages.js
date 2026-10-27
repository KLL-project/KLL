import { siteConfig } from './config.js';
import { extraLoanPages } from './extra-loan-pages.js';

const baseLoanPages = [
  {
    slug: 'home-loan', route: '/loans/home-loan', service: 'Home Loans', title: 'Home Loan', eyebrow: 'HOME LOAN',
    heading: 'Make Your Dream Home<br><em>A Reality</em>', description: 'Get the best home loan offers from 40+ leading banks and NBFCs. Low interest rates, fast approval and minimal documentation.',
    hero: 'home-loan/hero.jpg', formTitle: 'Check Your Home Loan Eligibility in 60 Seconds', fields: ['income','loan','employment','city','phone'],
    highlights: [['money','Attractive Interest Rates','Starting from 8.35%*'],['calendar','Flexible Tenure','Up to 30 Years'],['building','High Loan Amount','Up to 90% of property value'],['growth','Top-up Loan','Facility available'],['transfer','Balance Transfer','Switch & save more'],['shield','No Hidden Charges','100% transparent']],
    why: 'Why Choose KLLFM for Home Loan?', productsTitle: 'Types of Home Loans',
    products: [['Home Purchase Loan','Finance your new or resale home.','house','home-purchase-loan'],['Home Construction Loan','Build your home on your own plot.','construction','self-construction-loan'],['Plot + Construction','Finance your plot and construction together.','plot','self-construction-loan'],['Balance Transfer','Transfer your loan and reduce your EMI.','transfer','home-loan-balance-transfer'],['Top-up Loan','Get extra funds over your home loan.','growth','top-up-loan']],
    calcTitle: 'Home Loan EMI Calculator', amount: 5000000, rate: 8.5, years: 20,
    benefits: ['Tax benefits on principal and interest, subject to applicable rules','Competitive offers from 40+ banking partners','Flexible repayment tenure up to 30 years','Top-up and balance-transfer options available','Guidance from application through disbursement'],
    cta: 'Ready to Buy Your Dream Home?', faq: 'home loan'
  },
  {
    slug: 'home-purchase-loan', route: '/loans/home-purchase-loan', service: 'Home Purchase Loans', title: 'Home Purchase Loan', eyebrow: 'HOME PURCHASE LOANS',
    heading: 'Find Your Perfect Home.<br><em>We’ll Finance It.</em>', description: 'Make your dream of owning a home a reality with home purchase finance from leading banks and NBFCs. Enjoy attractive rates, higher eligibility and helpful guidance.',
    hero: 'home-purchase-loan/hero.jpg', formTitle: 'Check Your Home Loan Eligibility in 60 Seconds', fields: ['income','loan','employment','city','phone'],
    highlights: [['money','Attractive Interest Rates','Starting from 8.35%*'],['calendar','Flexible Tenure','Up to 30 Years'],['building','Up to 90%','Loan amount of property value'],['approval','Quick Approval','Clear next steps'],['shield','Minimal Documents','Guidance at every step'],['transfer','Top-up Loan','Available on eligible loans']],
    why: 'Why Choose KLL for Your Home Purchase Loan?', productsTitle: 'Types of Home Purchase Loans',
    products: [['New Home Purchase','Finance for a new home.','house','home-purchase-loan'],['Resale Home Purchase','Buy a pre-owned or resale home.','house','home-purchase-loan'],['Under-Construction Home','Finance an eligible under-construction property.','construction','loan-against-under-construction-property'],['Home Loan Balance Transfer','Transfer an existing home loan.','transfer','home-loan-balance-transfer'],['Top-up Home Loan','Additional funds on an eligible home loan.','growth','top-up-loan']],
    calcTitle: 'Home Purchase Loan EMI Calculator', amount: 5000000, rate: 8.5, years: 20,
    benefits: ['Compare offers from multiple lenders','Flexible tenure and repayment options','Loan guidance for new and resale properties','Know the documents and next steps before applying','Support through the loan process'],
    cta: 'Ready to Find Your Perfect Home?', faq: 'home purchase loan'
  },
  {
    slug: 'self-construction-loan', route: '/loans/self-construction-loan', aliases: ['/loans/plot-construction-loan'], service: 'Construction Loans', title: 'Self Construction + Plot Construction Loan', eyebrow: 'SELF CONSTRUCTION & PLOT + CONSTRUCTION LOANS',
    heading: 'Build Your Dream Home,<br><em>Your Way.</em>', description: 'Whether you own a plot or want to construct your home from the ground up, find a loan option that can support your plans.',
    hero: 'self-construction-loan/hero.jpg', formTitle: 'Check Your Loan Eligibility in 60 Seconds', fields: ['income','employment','loan','phone'],
    highlights: [['money','Attractive Interest Rates','Competitive options'],['building','High Loan Eligibility','Based on your profile'],['approval','Quick Approval','Clear next steps'],['document','Minimal Documentation','Helpful guidance'],['calendar','Flexible Tenure','Up to 30 Years'],['growth','Top-up Loan','Facility available']],
    why: 'Why Choose KLL for Your Home Construction Loan?', productsTitle: 'Choose the Right Loan for Your Home',
    panels: [['Self Construction Loan','Construct your dream home on your own plot.',['Loan for construction on an owned plot','Stage-wise disbursal linked to construction progress','Flexible tenure up to 30 years'],'self-construction.jpg'],['Plot + Construction Loan','Buy a plot and construct your home with one loan.',['One loan for plot purchase and construction','Higher loan eligibility for eligible applicants','Stage-wise disbursal and flexible repayment'],'plot-construction.jpg']],
    calcTitle: 'Construction Loan EMI Calculator', amount: 5000000, rate: 8.5, years: 20,
    benefits: ['Finance for eligible construction costs','Stage-linked disbursal options','Flexible repayment plans','Support to understand required documents','Review available lender options'],
    cta: 'Let’s Build Your Dream Home!', faq: 'construction loan'
  },
  {
    slug: 'top-up-loan', route: '/loans/top-up-loan', service: 'Top-Up Loans', title: 'Top-Up Loan', eyebrow: 'TOP-UP LOANS',
    heading: 'Get More Funds.<br><em>Achieve More.</em>', description: 'A top-up loan can provide additional finance over an eligible existing home loan for personal needs, education, medical expenses or business growth.',
    hero: 'top-up-loan/hero.jpg', formTitle: 'Check Your Top-up Loan Eligibility in 60 Seconds', fields: ['existing','loan','employment','phone'],
    highlights: [['money','Lower Interest Rates','Than many personal loans'],['approval','Quick Approval','Simple next steps'],['document','Minimal Documentation','Guided process'],['calendar','Flexible Repayment','Options up to 30 years'],['transfer','Top-up Loan','Facility available'],['shield','No Hidden Charges','Transparent guidance']],
    why: 'Why Choose KLL for Your Top-up Loan?', productsTitle: 'Use Your Top-up Loan For',
    useCases: [['Home Renovation','Upgrade your home the way you love.','renovation','house'],['Education','Fund education goals.','education','document'],['Medical Expenses','Handle planned or urgent medical needs.','medical','shield'],['Business Expansion','Grow your business and increase profits.','business','briefcase'],['Debt Consolidation','Combine eligible loan commitments.','debt','money'],['Marriage & Other Needs','Plan important life goals.','wedding','star']],
    calcTitle: 'Top-up Loan EMI Calculator', amount: 1000000, rate: 8.5, years: 15,
    benefits: ['Additional funds at competitive rates, subject to eligibility','Keep your existing home-loan benefits','Flexible tenure options','Top-up facility with minimal paperwork','Balance-transfer options may be available'],
    cta: 'Need Extra Funds?', faq: 'top-up loan'
  },
  {
    slug: 'home-loan-balance-transfer', route: '/loans/home-loan-balance-transfer', service: 'Home Loan Balance Transfer', title: 'Home Loan Balance Transfer', eyebrow: 'HOME LOAN BALANCE TRANSFER',
    heading: 'Lower Your EMI.<br><em>Transfer &amp; Save More.</em>', description: 'Move your eligible home loan to a lender with terms that suit you. Compare rates, tenure and service with help from our team.',
    hero: 'home-loan-balance-transfer/hero.jpg', formTitle: 'Check Your Balance Transfer Eligibility in 60 Seconds', fields: ['existing','outstanding','employment','phone'],
    highlights: [['money','Lower Interest Rates','Explore competitive rates'],['growth','Reduced EMI','Review repayment options'],['calendar','Flexible Tenure','Options for eligible loans'],['transfer','Top-up Loan','Facility available'],['support','Better Service','Personal guidance'],['shield','No Hidden Charges','Clear loan terms']],
    why: 'Why Choose KLLFM for Home Loan Balance Transfer?', productsTitle: 'Types of Balance Transfer',
    products: [['Full Balance Transfer','Transfer the full outstanding amount.','transfer','home-loan-balance-transfer'],['Partial Balance Transfer','Explore a partial transfer option.','money','home-loan-balance-transfer'],['With Top-up Loan','Ask about additional eligible funding.','growth','top-up-loan'],['Without Top-up Loan','Transfer without extra borrowing.','house','home-loan-balance-transfer']],
    calcTitle: 'Balance Transfer EMI Calculator', amount: 2500000, rate: 8.3, years: 15,
    benefits: ['Compare potential EMI and interest differences','Explore a top-up with an eligible transfer','Flexible repayment tenure choices','Understand charges and documents in advance','One-to-one application support'],
    cta: 'Save More on Your Home Loan Today!', faq: 'home loan balance transfer'
  },
  {
    slug: 'loan-against-under-construction-property', route: '/loans/loan-against-under-construction-property', service: 'Loan Against Under Construction Property', title: 'Loan Against Under-Construction Property', eyebrow: 'LOAN AGAINST UNDER-CONSTRUCTION PROPERTY',
    heading: 'Unlock Funds,<br><em>Fuel Your Dreams.</em>', description: 'Explore finance secured against eligible under-construction property for personal or business needs, with support through the application process.',
    hero: 'loan-against-under-construction-property/hero.jpg', formTitle: 'Check Your Loan Eligibility in 60 Seconds', fields: ['property','loan','employment','phone'],
    highlights: [['building','Higher Loan Eligibility','Based on property and profile'],['money','Lower Interest Rates','Explore secured options'],['approval','Quick Approval','Guided application'],['document','Minimal Documentation','Know what is required'],['calendar','Flexible Tenure','Options for eligible loans'],['support','Expert Guidance','At every step']],
    why: 'Why Choose KLL for Loan Against Under-Construction Property?', productsTitle: 'Use Your Loan For',
    useCases: [['Construction Funding','Complete an eligible construction project.','self-construction','construction'],['Business Expansion','Grow your business operations.','business','briefcase'],['Debt Consolidation','Consolidate eligible commitments.','debt','money'],['Education','Support education expenses.','education','document'],['Medical Expenses','Plan for medical expenses.','medical','shield'],['Personal Needs','Meet planned personal needs.','wedding','star']],
    calcTitle: 'Under-Construction Property Loan EMI Calculator', amount: 5000000, rate: 8.5, years: 20,
    benefits: ['Explore secured funding options for eligible property','Loan eligibility depends on property and borrower profile','Understand disbursal stages and documents','Flexible repayment options','Application guidance from our team'],
    cta: 'Need Funds for Your Property?', faq: 'loan against under-construction property'
  },
  {
    slug: 'commercial-mortgage-loan', route: '/loans/commercial-mortgage-loan', service: 'Commercial Mortgage Loans', title: 'Commercial Mortgage Loan', eyebrow: 'COMMERCIAL MORTGAGE LOANS',
    heading: 'Power Your Business Growth<br>with <em>Commercial Mortgage Loans.</em>', description: 'Unlock eligible commercial property value to expand, renovate, purchase business premises or meet working-capital needs.',
    hero: 'commercial-mortgage-loan/hero.jpg', formTitle: 'Check Your Commercial Loan Eligibility in 60 Seconds', fields: ['purpose','loan','employment','phone'],
    highlights: [['money','Competitive Interest Rates','Compare lender options'],['building','High Loan Amount','Subject to eligibility'],['approval','Quick Approval','Clear next steps'],['document','Minimal Documentation','Guided process'],['calendar','Flexible Tenure','Options up to 25 years'],['support','Expert Guidance','For your business']],
    why: 'Why Choose KLL for Your Commercial Mortgage Loan?', productsTitle: 'Use Your Commercial Mortgage For',
    useCases: [['Business Expansion','Expand or set up your operations.','business','briefcase'],['Property Purchase','Purchase commercial property for your business.','renovation','building'],['Construction / Renovation','Construct or renovate eligible property.','self-construction','construction'],['Debt Consolidation','Consolidate eligible high-cost debt.','debt','money'],['Working Capital','Meet working-capital and cash-flow needs.','education','chart'],['Leasehold Property','Finance eligible leasehold property.','wedding','building']],
    calcTitle: 'Commercial Mortgage EMI Calculator', amount: 10000000, rate: 8.5, years: 20,
    benefits: ['Finance for eligible commercial property','Options for purchase, renovation and expansion','Loan-to-value and tenure depend on lender criteria','Explore repayment and top-up choices','Business-focused application support'],
    cta: 'Ready to Grow Your Business?', faq: 'commercial mortgage loan'
  },
  {
    slug: 'mortgage-loan', route: '/loans/mortgage-loan', service: 'Mortgage Loans', title: 'Mortgage Loan', eyebrow: 'MORTGAGE LOAN',
    heading: 'Unlock the Value of Your Property.<br><em>Fuel Your Bigger Plans.</em>', description: 'Use eligible residential or commercial property as security to explore finance for personal or business needs.',
    hero: 'mortgage-loan/hero.jpg', formTitle: 'Check Your Mortgage Eligibility in 60 Seconds', fields: ['loan','propertyValue','employment','phone'],
    highlights: [['money','Low Interest Rates','Compare secured options'],['building','High Loan Amount','Based on property value'],['calendar','Flexible Repayment Tenure','Options up to 25 years'],['document','Minimal Documentation','Guided application'],['approval','Quick Approval','Clear next steps'],['support','Personal Guidance','From enquiry to decision']],
    why: 'Why Choose KLL for a Mortgage Loan?', productsTitle: 'Types of Mortgage Loans',
    products: [['Residential Mortgage','Explore a loan against residential property.','house','residential-mortgage-loan'],['Commercial Mortgage','Explore options secured by commercial property.','building','commercial-mortgage-loan'],['Under-Construction Property','Ask about eligible under-construction property.','construction','loan-against-under-construction-property'],['Plot Mortgage Loan','Explore loans against an eligible plot.','plot','plot-mortgage-loan']],
    calcTitle: 'Mortgage Loan EMI Calculator', amount: 5000000, rate: 8.5, years: 15,
    benefits: ['Unlock eligible property value for planned needs','Loan offers depend on property valuation and profile','Flexible tenure and repayment options','Explore residential and commercial property choices','Get support through documentation and application'],
    cta: 'Ready to Unlock Your Property’s Value?', faq: 'mortgage loan'
  },
  {
    slug: 'residential-mortgage-loan', route: '/loans/residential-mortgage-loan', service: 'Residential Mortgage Loans', title: 'Residential Mortgage Loan', eyebrow: 'RESIDENTIAL MORTGAGE LOANS',
    heading: 'Unlock the Value of Your Property.<br><em>Achieve Your Goals.</em>', description: 'Explore a mortgage loan against eligible residential property for personal, family or business plans.',
    hero: 'residential-mortgage-loan/hero.jpg', formTitle: 'Check Your Residential Mortgage Eligibility in 60 Seconds', fields: ['purpose','income','employment','phone'],
    highlights: [['money','Competitive Interest Rates','Explore secured options'],['building','High Loan Amount','Based on property value'],['calendar','Flexible Repayment','Tenure options available'],['document','Minimal Documentation','Helpful checklist'],['approval','Quick Approval','Clear next steps'],['support','Expert Guidance','Personal support']],
    why: 'Why Choose KLL for Your Residential Mortgage Loan?', productsTitle: 'Use Your Residential Mortgage For',
    useCases: [['Home Renovation','Upgrade your home.','renovation','house'],['Business Expansion','Expand a business or working capital.','business','briefcase'],['Education','Plan education expenses.','education','document'],['Medical Expenses','Plan for medical needs.','medical','shield'],['Debt Consolidation','Consolidate eligible commitments.','debt','money'],['Lifestyle Needs','Meet planned personal goals.','wedding','star']],
    calcTitle: 'Residential Mortgage EMI Calculator', amount: 5000000, rate: 8.5, years: 20,
    benefits: ['Unlock eligible residential property value','Use funds for a range of approved financial needs','Repayment terms depend on lender assessment','Understand the documents needed before applying','Dedicated guidance through the process'],
    cta: 'Unlock Your Property’s Potential', faq: 'residential mortgage loan'
  }
];
export const loanPages = [...baseLoanPages, ...extraLoanPages];

const icons = {
  money:'<path d="M12 2v20m5-16H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h3m-3 3h6"/>',
  building:'<path d="M4 21V4h16v17M2 21h20M8 8h2m4 0h2M8 12h2m4 0h2M8 16h2m4 0h2M11 21v-3h2v3"/>',
  growth:'<path d="M3 17 9 11l4 4 8-9M15 6h6v6"/>',
  transfer:'<path d="M4 7h15l-3-3m4 13H5l3 3M5 7v4m14 6v-4"/>',
  shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
  approval:'<path d="m4 12 5 5L20 6"/><circle cx="12" cy="12" r="10"/>',
  document:'<path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h7M9 16h7"/>',
  support:'<path d="M3 13v-2a9 9 0 0 1 18 0v2M5 13h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm14 0h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>',
  house:'<path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"/>',
  construction:'<path d="M3 21h18M5 18l7-12 7 12M7 18h10M8 13h8m-6-4h4M4 6h7m-3-3v7"/>',
  plot:'<path d="m3 17 8-13 10 6-8 13zM3 17l10 6M11 4l2 19M7 11l10 4"/>',
  briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18m-11 0v2h4v-2"/>',
  chart:'<path d="M3 3v18h18M7 15l4-4 3 3 6-8"/>',
  person:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2z"/>' ,
  star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || icons.star}</svg>`;
const esc = (value='') => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const commonWhy = [
  ['support','40+ Banks &amp; NBFCs','Compare lender options and find a suitable offer.'],
  ['money','Competitive Rates','Explore competitive rates for your profile.'],
  ['building','High Loan Eligibility','Check options with a property or income review.'],
  ['approval','Quick &amp; Hassle-Free','Clear documentation and approval steps.'],
  ['support','Expert Guidance','Personalized help at every step.'],
  ['house','End-to-End Support','From application to disbursement.']
];
const commonProcess = [['support','Check Eligibility','Review eligibility and available options.'],['document','Apply Online','Fill in the application details.'],['document','Upload Documents','Share required documents securely.'],['approval','Verification','The lender reviews your application.'],['money','Loan Approval','Receive an update from the lender.'],['growth','Disbursement','Funds are disbursed after approval.']];
const testimonials = [
  ['Ramesh Kumar','Hyderabad','KLLFM helped me understand the loan options and guided me through the application.'],
  ['Priya Sharma','Vijayawada','The team explained the process clearly and helped me prepare the documents.'],
  ['Suresh Reddy','Bengaluru','Professional guidance and clear updates at every step.'],
  ['Anjali Mehta','Chennai','Helpful support throughout my loan enquiry and application.']
];
function fieldMarkup(key, title, placeholder='', type='text', options=[]) {
  if (key === 'city') return `<label>${title}<input name="city" placeholder="${placeholder || 'Select City'}" data-eligibility-field required></label>`;
  if (key === 'employment') return `<label>${title}<select name="employment" data-eligibility-field required><option value="">Select Type</option><option>Salaried</option><option>Self-employed</option><option>Business owner</option></select></label>`;
  if (key === 'purpose') return `<label>${title}<select name="purpose" data-eligibility-field required><option value="">Select Purpose</option><option>Business expansion</option><option>Property purchase</option><option>Construction / renovation</option><option>Debt consolidation</option><option>Working capital</option></select></label>`;
  if (key === 'businessType') return `<label>Business Type<select name="businessType" data-eligibility-field required><option value="">Select Business Type</option><option>Sole proprietorship</option><option>Partnership</option><option>Private limited company</option><option>LLP</option></select></label>`;
  if (key === 'profession' || key === 'professionType') return `<label>${key === 'professionType' ? 'Profession Type' : 'Profession'}<select name="${key}" data-eligibility-field required><option value="">Select Profession</option><option>Doctor</option><option>Chartered Accountant</option><option>Engineer</option><option>Architect</option><option>Other professional</option></select></label>`;
  if (key === 'property') return `<label>${title}<select name="propertyStatus" data-eligibility-field required><option value="">Select Status</option><option>Under construction</option><option>Construction completed</option><option>Approved project</option></select></label>`;
  if (key === 'phone') return `<label>${title}<input type="tel" name="phone" inputmode="tel" pattern="[0-9+() -]{8,}" placeholder="${placeholder || '+91 9573 108 108'}" autocomplete="tel" data-eligibility-field required></label>`;
  if (key === 'name') return `<label>${title}<input name="name" autocomplete="name" placeholder="Your name" data-eligibility-field required></label>`;
  if (key === 'email') return `<label>${title}<input type="email" name="email" autocomplete="email" placeholder="you@example.com" data-eligibility-field required></label>`;
  const labels={income:'Monthly Income',loan:'Loan Amount Required',existing:'Existing Loan Amount',outstanding:'Outstanding Loan Amount',propertyValue:'Property Value',turnover:'Monthly Turnover'};
  return `<label>${labels[key] || title}<input type="text" name="${key}" inputmode="numeric" pattern="[0-9₹, ]+" placeholder="${placeholder || '₹ 50,00,000'}" data-eligibility-field required></label>`;
}
function formMarkup(page) {
  const values={name:['name','Full Name'],email:['email','Email Address'],income:['income','Monthly Income','₹ 1,00,000'],loan:['loan','Loan Amount Required','₹ 50,00,000'],existing:['existing','Existing Loan Amount','₹ 50,00,000'],outstanding:['outstanding','Outstanding Loan Amount','₹ 25,00,000'],employment:['employment','Employment Type'],city:['city','City','Select City'],phone:['phone','Mobile Number'],property:['property','Property Status'],purpose:['purpose','Loan Purpose'],propertyValue:['propertyValue','Property Value','₹ 1,00,00,000']};
  const keys=['name','email',...page.fields];
  const unique=[...new Set(keys)];
  return `<form class="loan-eligibility-form" data-lead-form novalidate><input type="hidden" name="interest" value="${esc(page.service)}"><input type="hidden" name="message" value="Loan eligibility enquiry"><input class="honeypot" name="website" tabindex="-1" autocomplete="off">${unique.map((key)=>fieldMarkup(...values[key] || [key,key])).join('')}<p class="form-status" aria-live="polite"></p><button class="button" type="submit">Check Eligibility Now <span aria-hidden="true">➜</span></button><small class="loan-form-note">Your details are used only to respond to this enquiry.</small></form>`;
}
function benefitCards() {
  return commonWhy.map(([iconName,title,desc]) => `<article class="loan-benefit-card">${icon(iconName)}<div><h3>${title}</h3><p>${desc}</p></div></article>`).join('');
}
function productCards(page) {
  if (page.panels) return `<div class="loan-panel-grid">${page.panels.map(([title,desc,points,image]) => `<article class="loan-type-panel"><div><h3>${title}</h3><p>${desc}</p><ul>${points.map((item)=>`<li>${item}</li>`).join('')}</ul><a href="#/contact">Know More →</a></div><img src="assets/loans/shared/${image}" alt="${title}" loading="lazy"></article>`).join('')}</div>`;
  if (page.useCases) return `<div class="loan-product-grid">${page.useCases.map(([title,desc,image,iconName])=>`<article class="loan-product-card"><img src="assets/loans/shared/${image}.jpg" alt="" loading="lazy"><h3>${title}</h3><p>${desc}</p><a href="#/contact">Know More →</a></article>`).join('')}</div>`;
  return `<div class="loan-product-grid">${page.products.map(([title,desc,iconName,route])=>`<article class="loan-product-card"><span class="loan-product-icon">${icon(iconName)}</span><h3>${title}</h3><p>${desc}</p><a href="${loanPages.find((item)=>item.slug===route)?.route ? `#${loanPages.find((item)=>item.slug===route).route}` : '#/contact'}">Know More →</a></article>`).join('')}</div>`;
}
function calculator(page) {
  return `<section class="loan-calc-offer" aria-label="Loan calculator and benefits"><article class="loan-calculator" data-loan-calculator><h2>${page.calcTitle}</h2><div class="loan-calc-columns"><div class="loan-calc-inputs"><label>Loan Amount <output data-loan-amount-label></output><input type="range" min="100000" max="20000000" step="50000" value="${page.amount}" data-loan-amount aria-label="Loan amount"></label><label>Interest Rate (p.a.) <output data-loan-rate-label></output><input type="range" min="5" max="20" step="0.1" value="${page.rate}" data-loan-rate aria-label="Annual interest rate"></label><label>Loan Tenure <output data-loan-tenure-label></output><input type="range" min="1" max="30" value="${page.years}" data-loan-tenure aria-label="Loan tenure in years"></label></div><div class="loan-calc-results"><span>Your Monthly EMI</span><strong data-loan-emi></strong><hr><small>Total Interest Payable</small><b data-loan-interest></b><small>Total Payment (Principal + Interest)</small><b data-loan-total></b><a class="button" href="#/contact">Apply Now →</a></div></div></article><article class="loan-benefits-panel"><div><h2>Benefits of ${page.title}</h2><ul>${page.benefits.map((item)=>`<li>${item}</li>`).join('')}</ul><a class="button" href="#/contact">Know More Benefits →</a></div><img src="assets/loans/shared/renovation.jpg" alt="Home finance illustration" loading="lazy"></article></section>`;
}
function partners() {
  const list=[['assets/home/bank-sbi.png','SBI'],['assets/home/bank-hdfc.png','HDFC Bank'],['assets/home/bank-icici.png','ICICI Bank'],['assets/home/bank-axis.png','Axis Bank'],['assets/home/bank-kotak.png','Kotak Mahindra Bank'],['assets/partners/pnb.svg','Punjab National Bank'],['assets/partners/lic-hfl.svg','LIC Housing Finance'],['assets/partners/bob.svg','Bank of Baroda'],['assets/partners/idfc-first.svg','IDFC FIRST Bank']];
  return `<section class="loan-partners"><div class="loan-section-heading"><h2>Our Banking Partners</h2><a href="#/services">View All Partners →</a></div><div class="loan-partner-grid">${list.map(([file,name],index)=>`<div class="loan-partner-card"><img src="${file}" alt="${name}" class="partner-logo partner-logo-${index}" loading="lazy"></div>`).join('')}</div></section>`;
}
function faqs(page) {
  const qs=[`What is a ${page.faq}?`,`Who can apply for a ${page.faq}?`,`How much ${page.faq} can I get?`,`What interest rate applies to a ${page.faq}?`,`What documents are needed for a ${page.faq}?`,`How long does ${page.faq} approval take?`];
  return `<section class="loan-faq-section"><div class="loan-section-heading centered"><p class="loan-eyebrow">HAVE QUESTIONS?</p><h2>Frequently Asked Questions</h2></div><div class="loan-faq-grid">${qs.map((q,i)=>`<details><summary>${q}</summary><p>${['A '+page.faq+' is a finance option subject to lender terms and eligibility.','Eligibility depends on income, credit profile, property details and lender assessment.','The eligible amount is determined by the lender after reviewing your profile and supporting documents.','Rates vary by lender, loan details and applicant eligibility. Ask our team to compare current available options.','Common documents include identity, income and property records. The exact list depends on lender and loan type.','Timing varies based on document completeness, property checks and lender review.'][i]}</p></details>`).join('')}</div></section>`;
}
export function renderLoanPage(page) {
  const highlights=page.highlights.map(([iconName,title,desc])=>`<div class="loan-highlight">${icon(iconName)}<span><b>${title}</b><small>${desc}</small></span></div>`).join('');
  const products=productCards(page);
  const testimonialsMarkup=testimonials.map(([name,city,quote],i)=>`<article class="loan-testimonial"><div class="loan-stars" aria-label="5 out of 5 stars">★★★★★</div><p>${quote}</p><div><img src="assets/home/client-${['ramesh','priya','suresh','anjali'][i]}.jpg" alt="" loading="lazy"><span><b>${name}</b><small>${city}</small></span></div></article>`).join('');
  return `<main id="main" class="loan-page" data-loan-page="${page.slug}"><section class="loan-hero"><div class="loan-hero-copy"><nav class="loan-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><span>›</span><a href="#/services">Loans</a><span>›</span><span aria-current="page">${page.title}</span></nav><p class="loan-eyebrow">${page.eyebrow}</p><h1>${page.heading}</h1><p>${page.description}</p><div class="loan-hero-points">${page.highlights.slice(0,4).map(([ico,title])=>`<span>${icon(ico)}<b>${title}</b></span>`).join('')}</div><div class="loan-hero-actions"><a href="#/contact" class="button">Check Eligibility <strong>⊕</strong></a><a href="${siteConfig.phoneHref}" class="button outline">Talk to an Expert ${icon('support')}</a></div></div><div class="loan-hero-visual"><img src="assets/loans/${page.hero}" alt="${page.title} property and family image" fetchpriority="high"></div><aside class="loan-eligibility"><h2>${page.formTitle}</h2><p>Tell us how to reach you and we’ll help you explore your options.</p>${formMarkup(page)}</aside></section><section class="loan-highlights" aria-label="${page.title} features">${highlights}</section><section class="loan-section loan-why"><div class="loan-section-heading centered"><p class="loan-eyebrow">KLL FINANCIAL &amp; MARKETING SERVICES</p><h2>${page.why}</h2></div><div class="loan-benefit-grid">${benefitCards()}</div></section><section class="loan-section loan-types"><div class="loan-section-heading centered"><p class="loan-eyebrow">OPTIONS FOR YOUR NEEDS</p><h2>${page.productsTitle}</h2></div>${products}</section>${calculator(page)}${partners()}<section class="loan-process-section"><div class="loan-section-heading centered"><p class="loan-eyebrow">CLEAR STEPS, PERSONAL SUPPORT</p><h2>Simple 6 Step ${page.title} Process</h2></div><div class="loan-process-grid">${commonProcess.map(([ico,title,desc])=>`<article>${icon(ico)}<h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></section><section class="loan-testimonials"><div class="loan-section-heading"><div><p class="loan-eyebrow">TRUSTED BY CLIENTS</p><h2>What Our Customers Say</h2></div><a href="#/about">View All Reviews →</a></div><div class="loan-testimonial-grid">${testimonialsMarkup}</div></section>${faqs(page)}<section class="loan-cta"><div><p class="loan-eyebrow">KLL FINANCIAL &amp; MARKETING SERVICES</p><h2>${page.cta}</h2><p>Talk with our team about your plans and possible next steps.</p></div><div><a class="button white" href="${siteConfig.phoneHref}">Talk to an Expert</a><a class="button white" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">Chat on WhatsApp</a></div></section></main>`;
}

const allLoansOverview = {
  slug:'all-loans', service:'Home Loans', title:'All Loans', eyebrow:'EXPLORE LOAN OPTIONS',
  heading:'Loans for Every Dream.<br>Solutions for Every <em>Need.</em>',
  description:'Choose from loan options for your home, business, profession and personal plans, with guidance from enquiry through application.',
  hero:'landing/hero.jpg', formTitle:'Get Instant Loan Eligibility', fields:['income','loan','phone'],
  highlights:[['money','Lowest Interest Rates','Compare options'],['approval','Quick Approval','Clear next steps'],['document','Minimal Documentation','Helpful guidance'],['building','40+ Banking Partners','Explore lender options']],
  productsTitle:'Our Loan Products', faq:'loan options', calcTitle:'EMI Calculator', amount:5000000, rate:8.5, years:20,
  benefits:['Compare loan options from multiple lenders','Understand repayments before applying','Get support with eligibility and documentation','Explore options for personal, professional and business needs'],
  products:[
    ['Home Loan','Finance a new home or property.','house','home-loan'],['Home Construction','Build a home on an eligible plot.','construction','self-construction-loan'],['Balance Transfer','Transfer an eligible existing home loan.','transfer','home-loan-balance-transfer'],['Top-up Loan','Explore additional funds on an eligible loan.','growth','top-up-loan'],
    ['Business Loan','Funding options for business needs.','briefcase','business-loan'],['Working Capital','Support business cash flow.','chart','business-loan'],['Loan Against Property','Explore a secured loan against property.','building','mortgage-loan'],['Personal Loan','Explore finance for planned personal needs.','person','personal-loan'],
    ['Doctor Loan','Options designed for medical professionals.','support','doctor-loan'],['CA Loan','Explore finance for Chartered Accountants.','document','ca-loan'],['Education Loan','Ask about support for education costs.','document','personal-loan'],['Vehicle Loan','Explore vehicle finance options.','growth','personal-loan']
  ]
};

export function renderAllLoansPage() {
  const highlights=allLoansOverview.highlights.map(([iconName,title,desc])=>`<div class="loan-highlight">${icon(iconName)}<span><b>${title}</b><small>${desc}</small></span></div>`).join('');
  const testimonialMarkup=testimonials.map(([name,city,quote],i)=>`<article class="loan-testimonial"><div class="loan-stars" aria-label="5 out of 5 stars">★★★★★</div><p>${quote}</p><div><img src="assets/home/client-${['ramesh','priya','suresh','anjali'][i]}.jpg" alt="" loading="lazy"><span><b>${name}</b><small>${city}</small></span></div></article>`).join('');
  return `<main id="main" class="loan-page loan-landing" data-loan-page="all-loans"><section class="loan-hero"><div class="loan-hero-copy"><nav class="loan-breadcrumb" aria-label="Breadcrumb"><a href="#/">Home</a><span>›</span><span aria-current="page">Loans</span></nav><p class="loan-eyebrow">${allLoansOverview.eyebrow}</p><h1>${allLoansOverview.heading}</h1><p>${allLoansOverview.description}</p><div class="loan-hero-points">${allLoansOverview.highlights.map(([ico,title])=>`<span>${icon(ico)}<b>${title}</b></span>`).join('')}</div><div class="loan-hero-actions"><a href="#/contact" class="button">Check Your Eligibility</a><a href="${siteConfig.phoneHref}" class="button outline">Talk to an Expert ${icon('support')}</a></div></div><div class="loan-hero-visual"><img src="assets/loans/${allLoansOverview.hero}" alt="Family planning a home purchase" fetchpriority="high"></div><aside class="loan-eligibility"><h2>${allLoansOverview.formTitle}</h2><p>Share a few details and our team can help you explore options.</p>${formMarkup(allLoansOverview)}</aside></section><section class="loan-overview-stats" aria-label="Loan service highlights"><div><b>40+</b><span>Banking Partners</span></div><div><b>9,000+</b><span>Happy Customers</span></div><div><b>₹800+ Cr</b><span>Loans Processed</span></div><div><b>10+</b><span>Years of Experience</span></div><div><b>98%</b><span>Client Satisfaction</span></div></section><section class="loan-section loan-types"><div class="loan-section-heading"><p class="loan-eyebrow">EXPLORE LOAN OPTIONS</p><h2>${allLoansOverview.productsTitle}</h2><p>Choose the loan that fits your plans.</p></div>${productCards(allLoansOverview)}</section><section class="loan-process-section"><div class="loan-section-heading centered"><p class="loan-eyebrow">HOW IT WORKS</p><h2>Our Simple 6 Step Loan Process</h2></div><div class="loan-process-grid">${commonProcess.map(([ico,title,desc])=>`<article>${icon(ico)}<h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></section><section class="loan-overview-eligibility"><div><p class="loan-eyebrow">START WITH ELIGIBILITY</p><h2>Check Your Loan Eligibility in 60 Seconds</h2><p>Share your contact details and the amount you have in mind. Our team will follow up to discuss next steps.</p></div>${formMarkup(allLoansOverview)}</section>${partners()}${calculator(allLoansOverview)}<section class="loan-testimonials"><div class="loan-section-heading"><div><p class="loan-eyebrow">TRUSTED BY THOUSANDS</p><h2>What Our Customers Say</h2></div><a href="#/about">View All Reviews →</a></div><div class="loan-testimonial-grid">${testimonialMarkup}</div></section>${faqs(allLoansOverview)}<section class="loan-cta"><div><p class="loan-eyebrow">KLL FINANCIAL &amp; MARKETING SERVICES</p><h2>Ready to Get Your Dream Loan?</h2><p>Our team can help you explore your options.</p></div><div><a class="button white" href="${siteConfig.phoneHref}">Talk to an Expert</a><a class="button white" href="${siteConfig.whatsappHref}" target="_blank" rel="noopener">Chat on WhatsApp</a></div></section></main>`;
}
