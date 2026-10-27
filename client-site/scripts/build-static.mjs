import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loanPages } from './loan-pages.js';

const root = process.cwd();
const output = join(root, 'client-site');
const pages = [
  ['index.html', 'Home', 'references/screenshots/core/Home page.png'],
  ['loans.html', 'Loans', 'references/screenshots/core/LOANS MAIN PAGE.png'],
  ['about.html', 'About Us', 'references/screenshots/core/about us page.png'],
  ['contact.html', 'Contact Us', 'references/screenshots/core/Contact page.png'],
  ['insurance.html', 'Insurance', 'references/screenshots/core/Services - Insurance.png'],
  ['income-tax.html', 'Income Tax', 'references/screenshots/core/Services-Income Tax.png'],
  ['property-management.html', 'Property Management', 'references/screenshots/core/Property Management.png'],
  ['resources.html', 'Resources', 'references/screenshots/core/Resource page.png'],
  ['home-loans.html', 'Home Loans', 'references/screenshots/loans/home/Loans - Home Loans Main Pgae.png'],
  ['home-purchase-loans.html', 'Home Purchase Loans', 'references/screenshots/loans/home/HOME LOANS - HOME PURCHASE LOANS.png'],
  ['construction-loans.html', 'Construction Loans', 'references/screenshots/loans/home/HOME LOANS - SELF & PLOT + CONSTRUCTION.png'],
  ['balance-transfer.html', 'Home Loan Balance Transfer', 'references/screenshots/loans/home/HOME LONS -BALANCE TRANSFER.png'],
  ['top-up-loans.html', 'Top-Up Loans', 'references/screenshots/loans/home/HOME LOANS -TOPUP LOANS.png'],
  ['business-loans.html', 'Business Loans', 'references/screenshots/core/Loans- Business Loans.png'],
  ['personal-loans.html', 'Personal Loans', 'references/screenshots/core/Loans -Personal loans.png'],
  ['professional-loans.html', 'Professional Loans', 'references/screenshots/loans/professional/Loans -Profesonal Loans.png'],
  ['doctor-loans.html', 'Doctor Loans', 'references/screenshots/loans/professional/Loans - Profesonal Loans - Doctor Loans.png'],
  ['ca-loans.html', 'CA Loans', 'references/screenshots/loans/professional/Loans - Profesonal Loans - CA Loans.png'],
  ['mortgage-loans.html', 'Mortgage Loans', 'references/screenshots/loans/mortgage/Loan - Mortgage loans page.png'],
  ['residential-mortgage-loans.html', 'Residential Mortgage Loans', 'references/screenshots/loans/mortgage/LOANS - MORTGAGE LOANS - RESID MORTGAGE.png'],
  ['commercial-mortgage-loans.html', 'Commercial Mortgage Loans', 'references/screenshots/loans/mortgage/LOANS - MORTGAGE LOANS - COMMERTIAL MORTGAGE.png'],
  ['open-plot-mortgage-loans.html', 'Open Plot Mortgage Loans', 'references/screenshots/loans/mortgage/LOANS - MORTGAGE LOANS - OPEN PLOT MORTGAGE.png'],
  ['under-construction-property-loans.html', 'Loan Against Under Construction Property', 'references/screenshots/loans/mortgage/LOANS - MORTGAGE LOANS - LOAN AGAINEST UNDERCONSTRUCTION PROPERTY.png'],
];

const navigation = [
  ['Home', 'index.html', '14.5%', '0', '5%', '4.5%'], ['Loans', 'loans.html', '20%', '0', '5.5%', '4.5%'],
  ['Insurance', 'insurance.html', '31%', '0', '6%', '4.5%'], ['Income Tax', 'income-tax.html', '37%', '0', '6%', '4.5%'],
  ['Property Services', 'property-management.html', '44%', '0', '8%', '4.5%'], ['Resources', 'resources.html', '54%', '0', '6.5%', '4.5%'],
  ['About Us', 'about.html', '64%', '0', '5.5%', '4.5%'], ['Contact Us', 'contact.html', '71%', '0', '6.5%', '4.5%'],
  ['Book Free Consultation', 'enquiry.html', '91%', '0', '9%', '4.5%'],
];

const css = `*{box-sizing:border-box}html,body{margin:0;background:#fff}body{font-family:Arial,Helvetica,sans-serif;color:#0c1a35}.page{width:100%;min-height:100vh}.frame{position:relative;width:100%;max-width:1440px;margin:0 auto}.frame img{display:block;width:100%;height:auto}.hotspot{position:absolute;display:block;z-index:2}.hotspot:focus{outline:3px solid #ff5a0a;outline-offset:-3px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.enquiry-page{min-height:100vh;background:#f6f8fb}.enquiry-header{height:74px;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 max(20px,calc((100% - 1180px)/2));border-bottom:1px solid #e4e8ee}.brand{font-weight:800;color:#ff5a0a;font-size:28px;text-decoration:none}.brand small{display:block;color:#0c1a35;font-size:8px;text-transform:uppercase}.back-link{color:#0c1a35;font-weight:700;text-decoration:none}.enquiry-wrap{width:min(1040px,calc(100% - 40px));margin:58px auto;display:grid;grid-template-columns:1fr 1fr;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 15px 35px rgba(6,29,59,.1)}.enquiry-copy{padding:54px 48px;background:linear-gradient(135deg,#061d3b,#0e365f);color:#fff}.eyebrow{color:#ff8c48;font-size:12px;font-weight:800;text-transform:uppercase}.enquiry-copy h1{font-size:42px;line-height:1.1;margin:12px 0}.enquiry-copy p{color:#d9e4f3;line-height:1.7}.enquiry-copy ul{list-style:none;padding:15px 0}.enquiry-copy li{margin:14px 0}.enquiry-copy li:before{content:'✓';color:#ff6b1a;margin-right:10px}.form-panel{padding:45px}.form-panel h2{margin:0 0 8px}.form-panel>p{color:#617087}.enquiry-form{display:grid;gap:15px;margin-top:24px}.enquiry-form label{display:grid;gap:7px;font-size:13px;font-weight:700}.enquiry-form input,.enquiry-form select,.enquiry-form textarea{width:100%;border:1px solid #d9e0e9;border-radius:5px;padding:12px;font:inherit}.enquiry-form textarea{resize:vertical}.submit{border:0;border-radius:6px;background:#ff5a0a;color:#fff;padding:14px;font-weight:800;font-size:15px;cursor:pointer}.submit:hover{background:#e94c00}.status{min-height:21px;margin:0;font-size:13px}.status.success{color:#168345}.status.error{color:#b42318}.contact-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}.contact-actions a{padding:10px 13px;border:1px solid #d9e0e9;border-radius:5px;text-decoration:none;font-size:13px;font-weight:700;color:#0c1a35}@media(max-width:720px){.enquiry-wrap{grid-template-columns:1fr;margin:28px auto}.enquiry-copy{padding:35px 25px}.enquiry-copy h1{font-size:32px}.form-panel{padding:30px 25px}}`;
const actionHotspots = [
  ['Start an enquiry', 'enquiry.html', '3%', '15%', '18%', '7%'],
  ['Check eligibility', 'enquiry.html', '78%', '12%', '20%', '14%'],
  ['Call us', 'tel:+919573108108', '84%', '0', '7%', '4.5%'],
  ['Chat on WhatsApp', 'https://wa.me/919573108108', '93%', '94%', '7%', '5%'],
];
const html = (title, image) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="KLL Financial and Marketing Services"><title>${title} | KLL Financial &amp; Marketing Services</title><link rel="stylesheet" href="assets/site.css"></head><body><main class="page"><h1 class="sr-only">${title}</h1><div class="frame"><img src="assets/screenshots/${encodeURIComponent(image.split('/').pop())}" alt="${title}">${[...navigation, ...actionHotspots].map(([label, href, left, top, width, height]) => `<a class="hotspot" href="${href}" aria-label="${label}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''} style="left:${left};top:${top};width:${width};height:${height}"></a>`).join('')}</div></main></body></html>`;
const enquiryHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Enquire with KLL Financial and Marketing Services"><title>Enquiry | KLL Financial &amp; Marketing Services</title><link rel="stylesheet" href="assets/site.css"></head><body class="enquiry-page"><header class="enquiry-header"><a class="brand" href="index.html">KLL<small>Financial &amp; Marketing Services</small></a><a class="back-link" href="index.html">← Back to Home</a></header><main class="enquiry-wrap"><section class="enquiry-copy"><p class="eyebrow">Start your enquiry</p><h1>Let us help you take the next step.</h1><p>Tell us what you need. Our team can respond with guidance for loans, insurance, income tax or property services.</p><ul><li>Simple service-specific enquiry</li><li>Client-side validation</li><li>Call and WhatsApp options</li></ul><div class="contact-actions"><a href="tel:+919573108108">Call +91 9573 108 108</a><a href="https://wa.me/919573108108" target="_blank" rel="noopener">Chat on WhatsApp</a></div></section><section class="form-panel"><h2>Send us a message</h2><p>Fields marked required must be completed.</p><form class="enquiry-form" id="enquiry-form" novalidate><label>Your name<input name="name" autocomplete="name" required></label><label>Mobile number<input name="phone" inputmode="tel" autocomplete="tel" pattern="[0-9+() -]{8,}" required></label><label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Service<select name="service" required><option value="">Select a service</option><option>Home Loans</option><option>Business Loans</option><option>Mortgage Loans</option><option>Professional Loans</option><option>Personal Loans</option><option>Insurance</option><option>Income Tax</option><option>Property Management</option></select></label><label>Your message<textarea name="message" rows="4" required></textarea></label><p class="status" id="status" aria-live="polite"></p><button class="submit" type="submit">Send Enquiry</button></form></section></main><script src="assets/enquiry.js"></script></body></html>`;
const formScript = `const form=document.querySelector('#enquiry-form');const status=document.querySelector('#status');form.addEventListener('submit',async event=>{event.preventDefault();if(!form.checkValidity()){status.textContent='Please complete all required fields with valid details.';status.className='status error';form.reportValidity();return}try{const response=await fetch((['localhost','127.0.0.1'].includes(location.hostname)?location.protocol+'//'+location.hostname+':5500':location.origin)+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});if(!response.ok)throw new Error();status.textContent='Thank you. Your enquiry has been received.';status.className='status success';form.reset()}catch{status.textContent='Could not send your enquiry. Please call us.';status.className='status error'}});`;

await mkdir(join(output, 'assets', 'screenshots'), { recursive: true });
await writeFile(join(output, 'assets', 'site.css'), css);
await writeFile(join(output, 'assets', 'enquiry.js'), formScript);
for (const [filename, title, source] of pages) {
  const imageName = source.split('/').pop();
  await cp(join(root, source), join(output, 'assets', 'screenshots', imageName));
  await writeFile(join(output, filename), html(title, source));
}
await writeFile(join(output, 'enquiry.html'), enquiryHtml);
// The client entry page is the functional, static-hosted HTML application.
await cp(join(root, 'index.html'), join(output, 'index.html'));
await cp(join(root, 'admin.html'), join(output, 'admin.html'));
await cp(join(root, 'admin-login.html'), join(output, 'admin-login.html'));
await cp(join(root, 'scripts'), join(output, 'scripts'), { recursive: true });
await cp(join(root, 'styles'), join(output, 'styles'), { recursive: true });
await cp(join(root, 'references'), join(output, 'references'), { recursive: true });
await cp(join(root, 'assets', 'about'), join(output, 'assets', 'about'), { recursive: true });
await cp(join(root, 'assets', 'contact'), join(output, 'assets', 'contact'), { recursive: true });
await cp(join(root, 'assets', 'home'), join(output, 'assets', 'home'), { recursive: true });
await cp(join(root, 'assets', 'insurance'), join(output, 'assets', 'insurance'), { recursive: true });
await cp(join(root, 'assets', 'resources'), join(output, 'assets', 'resources'), { recursive: true });
await cp(join(root, 'assets', 'loans'), join(output, 'assets', 'loans'), { recursive: true });
await cp(join(root, 'assets', 'partners'), join(output, 'assets', 'partners'), { recursive: true });
const aboutShell = (await readFile(join(root, 'index.html'), 'utf8'))
  .replace('<title>KLL Financial & Marketing Services</title>', '<title>About Us | KLL Financial &amp; Marketing Services</title>')
  .replace('<script type="module" src="scripts/app.js?v=reference-20261002"></script>', '<script>if (!location.hash) location.hash = "#/about";</script>\n    <script type="module" src="scripts/app.js?v=reference-20261002"></script>');
await writeFile(join(output, 'about.html'), aboutShell);
const contactShell = (await readFile(join(root, 'index.html'), 'utf8'))
  .replace('<title>KLL Financial & Marketing Services</title>', '<title>Contact Us | KLL Financial &amp; Marketing Services</title>')
  .replace('<script type="module" src="scripts/app.js?v=reference-20261002"></script>', '<script>if (!location.hash) location.hash = "#/contact";</script>\n    <script type="module" src="scripts/app.js?v=reference-20261002"></script>');
await writeFile(join(output, 'contact.html'), contactShell);
const loanShellBase = (await readFile(join(root, 'index.html'), 'utf8'))
  .replace('<title>KLL Financial & Marketing Services</title>', '<title>Loan Services | KLL Financial &amp; Marketing Services</title>')
  .replace('<head>', '<head>\n    <base href="/">');
for (const page of loanPages) {
  const directory = join(output, 'loans', page.slug);
  await mkdir(directory, { recursive: true });
  const shell = loanShellBase.replace('<title>Loan Services | KLL Financial &amp; Marketing Services</title>', `<title>${page.title} | KLL Financial &amp; Marketing Services</title>`)
    .replace('<script type="module" src="scripts/app.js?v=reference-20261002"></script>', `<script>if (!location.hash) location.hash = "#${page.route}";</script>\n    <script type="module" src="scripts/app.js?v=reference-20261002"></script>`);
  await writeFile(join(directory, 'index.html'), shell);
}
console.log(`Built ${pages.length} reference pages and ${loanPages.length} loan routes in client-site.`);
