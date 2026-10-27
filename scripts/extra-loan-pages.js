export const extraLoanPages = [
  {
    slug: 'business-loan', route: '/loans/business-loan', service: 'Business Loans', title: 'Business Loan', eyebrow: 'BUSINESS LOAN',
    heading: 'Fuel Your Business.<br><em>Power Your Growth.</em>', description: 'Get the right funding for your business needs, with clear guidance on available options, repayments and next steps.',
    hero: 'business-loan/hero.jpg', formTitle: 'Check Your Business Loan Eligibility in 60 Seconds', fields: ['turnover','loan','businessType','phone'],
    highlights: [['money','Funding Options','For business needs'],['approval','Quick Approval','Clear next steps'],['document','Minimal Paperwork','Helpful guidance'],['building','High Loan Amount','Subject to eligibility'],['calendar','Flexible Repayment','Options for your business'],['support','Expert Guidance','Dedicated support']],
    why: 'Solutions for Every Business Need', productsTitle: 'Business Loan Options',
    products: [['Term Loan','Funding for expansion, equipment or planned expenses.','money','business-loan'],['Working Capital Loan','Manage day-to-day operating costs and cash flow.','growth','business-loan'],['Machinery Loan','Finance eligible business machinery and equipment.','briefcase','business-loan'],['MSME Loan','Explore finance for eligible small businesses.','building','business-loan'],['Invoice Financing','Unlock working capital from eligible invoices.','document','business-loan'],['Loan Against Property','Explore secured business finance.','house','mortgage-loan']],
    calcTitle: 'Business Loan EMI Calculator', amount: 2000000, rate: 9, years: 3,
    benefits: ['Funding options for eligible business needs','Flexible repayment options based on lender terms','Support for working capital, equipment and growth','Understand documentation before applying','Guidance through the lender review process'],
    cta: 'Ready to Grow Your Business?', faq: 'business loan'
  },
  {
    slug: 'personal-loan', route: '/loans/personal-loan', service: 'Personal Loans', title: 'Personal Loan', eyebrow: 'PERSONAL LOAN',
    heading: 'For Every Need,<br><em>Every Dream.</em>', description: 'Explore personal finance options for planned expenses with clear repayment information and application guidance.',
    hero: 'personal-loan/hero.jpg', formTitle: 'Check Your Personal Loan Eligibility in 60 Seconds', fields: ['income','loan','employment','phone'],
    highlights: [['money','Competitive Rates','Explore suitable offers'],['approval','Quick Approval','Clear application steps'],['document','Minimal Paperwork','Guided process'],['shield','No Collateral','Unsecured options available'],['calendar','Flexible Tenure','Options to suit your needs'],['support','Personal Support','At every step']],
    why: 'Use a Personal Loan For', productsTitle: 'Personal Loan Uses',
    useCases: [['Travel','Plan a trip with a repayment plan that fits.','wedding','star'],['Wedding','Plan for a memorable occasion.','wedding','star'],['Education','Support education expenses.','education','document'],['Home Renovation','Make improvements to your home.','renovation','house'],['Medical Expenses','Plan for eligible medical costs.','medical','shield'],['Debt Consolidation','Combine eligible repayments.','debt','money'],['Other Personal Needs','Explore funding for planned needs.','business','briefcase']],
    calcTitle: 'Personal Loan EMI Calculator', amount: 500000, rate: 11.25, years: 3,
    benefits: ['Unsecured options may be available subject to eligibility','Compare loan amount and repayment options','Understand fees and terms before applying','Minimal documentation guidance','Support through the application process'],
    cta: 'Need Funds for Your Personal Needs?', faq: 'personal loan'
  },
  {
    slug: 'professional-loan', route: '/loans/professional-loan', service: 'Professional Loans', title: 'Professional Loans', eyebrow: 'PROFESSIONAL LOANS',
    heading: 'Empowering Professionals.<br><em>Building Bigger Futures.</em>', description: 'Explore tailored finance options for doctors, Chartered Accountants, engineers, architects and other professionals.',
    hero: 'professional-loan/hero.jpg', formTitle: 'Check Your Loan Eligibility in 60 Seconds', fields: ['professionType','income','loan','phone'],
    highlights: [['support','Specialized Loans','For professionals'],['money','Loan Amount','Based on your profile'],['growth','Competitive Rates','Explore available options'],['calendar','Flexible Tenure','Terms vary by lender'],['approval','Quick Disbursal','Subject to lender review'],['building','40+ Banks','Compare lender options']],
    why: 'Loans for Every Profession', productsTitle: 'Professional Loan Options',
    products: [['Doctor Loan','Finance for eligible medical professionals.','support','doctor-loan'],['CA Loan','Options designed for Chartered Accountants.','document','ca-loan'],['Engineer Loan','Explore options for engineers.','building','professional-loan'],['Architect Loan','Finance for eligible architecture professionals.','house','professional-loan'],['Other Professionals','Ask us about options for your profession.','briefcase','professional-loan']],
    calcTitle: 'Professional Loan EMI Calculator', amount: 2000000, rate: 8.75, years: 5,
    benefits: ['Loan options for a range of professional profiles','Compare lender rates and repayment terms','Funding for eligible practice and personal needs','Clear documentation guidance','Support from enquiry through application'],
    cta: 'Ready to Take Your Next Step?', faq: 'professional loan'
  },
  {
    slug: 'doctor-loan', route: '/loans/doctor-loan', service: 'Doctor Loans', title: 'Doctor Loan', eyebrow: 'DOCTOR LOAN',
    heading: 'Because Your Dreams Deserve<br><em>Expert Support.</em>', description: 'Explore financing for practice growth, equipment, education and other eligible professional needs.',
    hero: 'doctor-loan/hero.jpg', formTitle: 'Check Your Doctor Loan Eligibility in 60 Seconds', fields: ['income','loan','profession','phone'],
    highlights: [['money','Competitive Rates','Explore lender offers'],['approval','Quick Approval','Clear next steps'],['document','Minimal Paperwork','Application support'],['calendar','Flexible Repayment','Options depend on lender'],['building','High Loan Amount','Based on profile'],['support','Expert Guidance','Professional loan support']],
    why: 'Loan Solutions Designed for Doctors', productsTitle: 'Doctor Loan Options',
    products: [['Clinic Setup Loan','Finance an eligible clinic or practice setup.','building','doctor-loan'],['Hospital Expansion','Explore finance for practice expansion.','growth','doctor-loan'],['Medical Equipment','Options for eligible medical equipment.','briefcase','doctor-loan'],['Education & Abroad','Plan eligible education expenses.','document','doctor-loan'],['Personal Loan for Doctors','Explore personal needs finance.','person','personal-loan']],
    calcTitle: 'Doctor Loan EMI Calculator', amount: 2000000, rate: 8.5, years: 10,
    benefits: ['Finance options for practice and equipment needs','Compare lender rates and repayment terms','Explore education and personal financing needs','Understand documents required for your application','Guidance throughout the lender review process'],
    cta: 'Take the Next Step Towards Your Goals', faq: 'doctor loan'
  },
  {
    slug: 'ca-loan', route: '/loans/ca-loan', service: 'CA Loans', title: 'CA Loan', eyebrow: 'CHARTERED ACCOUNTANT LOAN',
    heading: 'CA Loan Solutions<br>Built for Your <em>Ambitions.</em>', description: 'Explore finance options to expand your practice, invest in your future and support professional goals.',
    hero: 'ca-loan/hero.jpg', formTitle: 'Check Your CA Loan Eligibility in 60 Seconds', fields: ['income','loan','profession','phone'],
    highlights: [['money','Competitive Rates','Explore lender offers'],['approval','Quick Disbursal','Subject to eligibility'],['document','Minimal Paperwork','Helpful guidance'],['calendar','Flexible Repayment','Options based on profile'],['building','Practice Funding','For eligible business needs'],['support','Expert Guidance','At each step']],
    why: 'Loan Solutions for Chartered Accountants', productsTitle: 'CA Loan Options',
    products: [['Practice Expansion','Grow your practice or open a new branch.','growth','ca-loan'],['Office Setup','Finance eligible office setup needs.','building','ca-loan'],['Partner Buy-in','Explore funding for eligible partnership needs.','briefcase','ca-loan'],['Professional Growth','Plan training and professional development.','chart','ca-loan'],['Working Capital','Support day-to-day practice operations.','money','business-loan']],
    calcTitle: 'CA Loan EMI Calculator', amount: 2500000, rate: 8.5, years: 10,
    benefits: ['Options for practice growth and office needs','Compare eligible lender offers','Flexible repayment options may be available','Clear application and document guidance','Personal support from enquiry to decision'],
    cta: 'Take Your Practice to the Next Level', faq: 'CA loan'
  },
  {
    slug: 'plot-mortgage-loan', route: '/loans/plot-mortgage-loan', service: 'Mortgage Loans', title: 'Plot Mortgage Loan', eyebrow: 'PLOT MORTGAGE LOANS',
    heading: 'Mortgage Your Plot,<br><em>Unlock Possibilities.</em>', description: 'Explore financing against eligible residential or commercial plots for business, personal or other planned needs.',
    hero: 'plot-mortgage-loan/hero.jpg', formTitle: 'Check Your Plot Loan Eligibility in 60 Seconds', fields: ['purpose','loan','employment','phone'],
    highlights: [['money','Competitive Rates','Compare secured options'],['building','High Loan Amount','Based on plot value'],['calendar','Flexible Tenure','Options up to 25 years'],['approval','Quick Approval','Clear next steps'],['document','Minimal Paperwork','Guided process'],['support','Expert Guidance','Support through application']],
    why: 'Why Choose KLL for a Plot Mortgage Loan?', productsTitle: 'Use Your Plot Mortgage For',
    useCases: [['Business Expansion','Expand or start a business.','business','briefcase'],['Construction','Build a home on an eligible plot.','self-construction','construction'],['Debt Consolidation','Combine eligible repayments.','debt','money'],['Education','Support planned education expenses.','education','document'],['Marriage','Plan a special occasion.','wedding','star'],['Personal Needs','Explore financing for planned needs.','renovation','house']],
    calcTitle: 'Plot Mortgage Loan EMI Calculator', amount: 5000000, rate: 8.5, years: 20,
    benefits: ['Unlock eligible plot value for planned needs','Loan amount depends on plot valuation and lender rules','Compare repayment options and tenure','Understand documents needed for application','Support through lender assessment'],
    cta: 'Unlock the Value of Your Plot Today', faq: 'plot mortgage loan'
  }
];
