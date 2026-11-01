import type { Course } from '../types/course';

export const coursesData: Course[] = [
  {
    id: 'adca',
    code: 'ADCA',
    name: 'Advance Diploma in Computer Applications',
    tagline: 'Comprehensive 1-Year Master Diploma for Complete IT Proficiency',
    duration: '12 Months',
    level: 'Advanced',
    eligibility: '10th / 12th Pass or Equivalent from recognized board',
    badge: 'Most Popular',
    isPopular: true,
    description: 'The flagship one-year diploma covers essential computer concepts, complete office productivity tools, database fundamentals, web development basics, graphic design fundamentals, and computerized accounting with Tally Prime.',
    skillsGained: [
      'Operating Systems & Computer Fundamentals',
      'MS Office Suite (Word, Excel, PowerPoint, Access)',
      'Tally Prime with GST & Inventory Management',
      'HTML, CSS & Web Page Design Basics',
      'Desktop Publishing (Photoshop & CorelDraw Intro)',
      'Internet, Cyber Security & Digital Banking'
    ],
    toolsCovered: [
      'Microsoft Word 365',
      'Microsoft Excel (Advanced VBA/Formulas)',
      'Microsoft PowerPoint',
      'Microsoft Access',
      'Tally Prime 4.0 with GST',
      'HTML5 & CSS3',
      'Adobe Photoshop Essentials',
      'English & Hindi Typing Master'
    ],
    practicalProjects: [
      'Automated Corporate Payroll & Salary Slip Generation in Excel',
      'End-to-End Company Accounting Finalization in Tally Prime',
      'Multi-page Responsive Business Web Template in HTML/CSS',
      'Bulk Dispatch Mail Merge System for Corporate Letters',
      'Inventory Stock Valuation and GST E-Way Bill Simulation'
    ],
    careerOpportunities: [
      'Computer Operator / Executive Assistant',
      'Data Entry Specialist / MIS Executive',
      'Accounts Executive (Tally Prime)',
      'Office Administrator & Back Office Coordinator',
      'Government Job Computer Qualification'
    ],
    modules: [
      {
        title: 'Semester 1: Fundamentals & Office Automation',
        topics: [
          'Computer Basics, Hardware Components & Operating Systems (Windows 11)',
          'MS Word: Advanced Document Formatting, Mail Merge, Tables & Reports',
          'MS Excel: Formulas, Functions (VLOOKUP, XLOOKUP, IF, INDEX-MATCH), Pivot Tables & Charts',
          'MS PowerPoint: Professional Slide Decks, Master Slides, Transitions & Media',
          'MS Access: Database creation, queries, forms, and relationship models'
        ]
      },
      {
        title: 'Semester 2: Professional Accounting & Digital Technologies',
        topics: [
          'Tally Prime: Company Creation, Ledger, Voucher Entries, GST & Invoicing',
          'Payroll, Inventory Management & Bank Reconciliation in Tally',
          'Desktop Publishing: Photo editing, banners, and document layouts',
          'HTML5 & Web Designing foundations for modern business websites',
          'Cyber Safety, Online Portals, E-Governance & Cloud Storage'
        ]
      }
    ],
    highlights: [
      'Comprehensive 1-Year Curriculum',
      'Practical Hands-on Daily Lab Sessions',
      'Industry Recognized ISO 9001:2015 Certification',
      'Job Placement & Interview Assistance'
    ],
    faqs: [
      {
        question: 'Is ADCA eligible for government jobs?',
        answer: 'Yes! The ADCA diploma issued by Apex Institute of Computer is recognized under ISO 9001:2015 and accepted for all central and state government job eligibility wherever 1-year computer proficiency is required.'
      },
      {
        question: 'Will I get individual computer access in labs?',
        answer: 'Yes, 100% guaranteed. At Apex, every student gets an individual Intel Core i5/i7 workstation during their batch hours without sharing.'
      },
      {
        question: 'Do I need prior coding or computer knowledge to join?',
        answer: 'No prior background is required. We start right from the very basics of switching on computers and keyboard ergonomics under Durgesh Sir.'
      }
    ]
  },
  {
    id: 'dca',
    code: 'DCA',
    name: 'Diploma in Computer Applications',
    tagline: 'Essential 6-Month Diploma for Rapid Office & Digital Literacy',
    duration: '6 Months',
    level: 'Beginner',
    eligibility: '10th Pass or Equivalent',
    badge: 'Fast-Track Career',
    isPopular: true,
    description: 'A focused six-month program designed to transform beginners into confident, computer-savvy professionals ready for administrative and clerical positions.',
    skillsGained: [
      'Computer Fundamentals & Windows Operating Environment',
      'MS Word: Typing, Business Letters, Formatting & Printing',
      'MS Excel: Worksheets, Formulas, Data Entry & Sorting',
      'MS PowerPoint: Presentations & Slide Design',
      'High-Speed Typing (English & Hindi)',
      'Internet Browsing, Emailing, and E-Services'
    ],
    toolsCovered: [
      'Windows 11 Operating System',
      'Microsoft Word',
      'Microsoft Excel',
      'Microsoft PowerPoint',
      'Bilingual Typing Software (English & Hindi Kruti Dev)',
      'Google Workspace & Cloud Storage'
    ],
    practicalProjects: [
      'Official Administrative Letter Drafting & Formatting',
      'Monthly Sales & Attendance Registers in Excel',
      'Speed Touch-Typing Target: 35-40+ WPM with 95% Accuracy',
      'Professional Multi-Slide Corporate Presentation'
    ],
    careerOpportunities: [
      'Data Entry Operator (DEO)',
      'Front Desk / Reception Coordinator',
      'Customer Support Executive',
      'Office Assistant'
    ],
    modules: [
      {
        title: 'Module 1: Computer Concepts & Operating Environment',
        topics: [
          'History, Generation & Architecture of Computers',
          'Storage devices, memory hierarchy, peripherals',
          'Windows File Management, Control Panel & Settings'
        ]
      },
      {
        title: 'Module 2: Productivity Suite & Internet Applications',
        topics: [
          'MS Office Suite: Word, Excel, PowerPoint',
          'Speed typing techniques with Hindi/English keyboard layouts',
          'Email etiquette, cloud drives, and cyber awareness'
        ]
      }
    ],
    highlights: [
      'Ideal for Students & Job Seekers',
      'Dedicated Typing Practice Labs',
      'Government & Private Sector Job Ready'
    ],
    faqs: [
      {
        question: 'What is the duration of DCA at Apex?',
        answer: 'DCA is a 6-month intensive diploma covering computer fundamentals, MS Office, and daily typing tests.'
      },
      {
        question: 'Can I switch to ADCA later if I want?',
        answer: 'Yes, students enrolled in DCA can upgrade to the 1-year ADCA program seamlessly by continuing into Semester 2.'
      }
    ]
  },
  {
    id: 'dfa',
    code: 'DFA',
    name: 'Diploma in Financial Accounting',
    tagline: 'Master Practical Bookkeeping, GST & Corporate Financial Ledgers',
    duration: '6 Months',
    level: 'Intermediate',
    eligibility: '10th / 12th Pass (Commerce or Any Stream)',
    badge: 'High Industry Demand',
    description: 'Specialized diploma focusing exclusively on commercial accounting standards, computerized ledgers, GST calculations, and financial reporting with modern accounting software.',
    skillsGained: [
      'Principles of Double-Entry Bookkeeping',
      'Tally Prime: Setup, Day Book, Profit & Loss, Balance Sheets',
      'Goods & Services Tax (CGST, SGST, IGST) Configuration',
      'Bank Reconciliation Statements (BRS)',
      'Inventory, Stock Valuation & Purchase Order Cycles',
      'MS Excel for Financial Modeling & MIS Statements'
    ],
    toolsCovered: [
      'Tally Prime 4.0 Release',
      'GST Portal Invoicing Sandbox',
      'Advanced MS Excel for Accounting',
      'E-Way Bill Generation Simulator',
      'Bank Reconciliation Engine'
    ],
    practicalProjects: [
      'End-to-End Enterprise Trading Ledger Setup in Tally Prime',
      'Multi-tier Tax Invoice Preparation with CGST, SGST & IGST',
      'Monthly Bank Reconciliation for Real Commercial Accounts',
      'Stock Valuation & Manufacturing Journal Entries'
    ],
    careerOpportunities: [
      'Junior Accountant / Tally Operator',
      'Accounts Payable / Receivable Clerk',
      'Billing Executive in Retail / Wholesale Enterprises',
      'Audit Assistant in CA / Tax Firms'
    ],
    modules: [
      {
        title: 'Module 1: Manual Accounting to Computerized Transition',
        topics: [
          'Rules of Debit & Credit, Journal Entries, Ledger Posting, Trial Balance',
          'Financial Statements: Trading A/C, Profit & Loss, Balance Sheet'
        ]
      },
      {
        title: 'Module 2: Enterprise Tally Prime & Taxation',
        topics: [
          'Voucher Entry, Multi-Currency, Cost Centers',
          'GST Invoicing, E-Way Bill Concepts & TDS basics',
          'Financial MIS Reporting and Exporting to Excel'
        ]
      }
    ],
    highlights: [
      'Real-world Invoice Simulation',
      'Tally Prime Latest Release Training',
      'Practical Balance Sheet Finalization'
    ],
    faqs: [
      {
        question: 'Do I need a commerce background for DFA?',
        answer: 'Not at all! We teach accounting from the basic golden rules of debit and credit so science and arts students excel equally.'
      },
      {
        question: 'Is Tally Prime taught on the latest version?',
        answer: 'Yes, we train on the latest Tally Prime Release with full GST e-invoicing support.'
      }
    ]
  },
  {
    id: 'dta',
    code: 'DTA',
    name: 'Diploma in Taxation & Accounting',
    tagline: 'Advanced Direct & Indirect Tax Computing with Practical E-Filing',
    duration: '6 Months',
    level: 'Advanced',
    eligibility: '12th Pass / Graduate (Preferred Commerce/Finance)',
    badge: 'Specialist Course',
    description: 'An advanced diploma curated for aspiring tax practitioners, covering Income Tax calculations, GST returns, TDS e-filing, and compliance workflows taught by MCA/Taxation experts.',
    skillsGained: [
      'Direct Tax (Income Tax computation under various heads)',
      'Indirect Tax (Comprehensive GST Law & Procedures)',
      'Income Tax Portal (ITR-1, ITR-4 filing workflows)',
      'GST Portal: GSTR-1, GSTR-3B return mechanics',
      'TDS / TCS rules, challans & deduction certificates',
      'Advanced Excel for Tax Computations & Audit Support'
    ],
    toolsCovered: [
      'Income Tax E-Filing Simulator',
      'GST Common Portal Sandbox (GSTR-1, 3B)',
      'TDS Utility (TRACES / TIN-NSDL)',
      'Tally Prime Taxation Suite',
      'Financial Modeling in Excel'
    ],
    practicalProjects: [
      'Live Case Study: Salary & Business Income Tax Computation',
      'Complete Monthly GSTR-1 and GSTR-3B Return Filing Mockup',
      'Form 16 / 16A Verification & TDS Return Prep (24Q/26Q)',
      'Audit Trail Verification & Tax Reconciliation Statements'
    ],
    careerOpportunities: [
      'Tax Consultant / Tax Return Preparer (TRP)',
      'Corporate Tax Executive',
      'Senior Accountant in CA Consultancies',
      'Independent GST Practitioner'
    ],
    modules: [
      {
        title: 'Module 1: Income Tax Laws & Returns',
        topics: [
          'Income heads: Salary, House Property, Business/Profession, Capital Gains',
          'Deductions under Chapter VI-A (80C, 80D, etc.) & Tax Rebates',
          'Simulated ITR-1 and ITR-4 Filing Walkthroughs'
        ]
      },
      {
        title: 'Module 2: Goods & Services Tax (GST) Practicum',
        topics: [
          'GST Registration, Tax Invoice Rules, Input Tax Credit (ITC)',
          'GSTR-1, GSTR-3B, GSTR-9 Filing workflows and reconciliation',
          'Audit documentation and assessment guidelines'
        ]
      }
    ],
    highlights: [
      'Led by Ashutosh Kumar (MCA & DTA Specialist)',
      'Live Case Studies & Government Portal Simulators',
      'Official Affiliation & Verification Standard'
    ],
    faqs: [
      {
        question: 'Who should enroll in DTA?',
        answer: 'DTA is ideal for B.Com/M.Com graduates, aspiring tax consultants, CA firm assistants, and accountants aiming for higher-paying taxation roles.'
      },
      {
        question: 'Will I learn practical tax return filing?',
        answer: 'Yes, 100% hands-on simulation of ITR and GST portals is conducted in our specialized accounting lab.'
      }
    ]
  },
  {
    id: 'office-work',
    code: 'Office Work',
    name: 'Office Work & Business Automation',
    tagline: 'High-Demand 3-Month Fast-Track Program: MS Word, MS Excel & Tally Prime',
    duration: '3 Months',
    level: 'Beginner',
    eligibility: 'Open to All Students, Job Seekers & Working Professionals',
    badge: 'New Course Added',
    isNew: true,
    isPopular: true,
    description: 'Specially engineered by Apex Institute of Computer to make students 100% job-ready in just 90 days. Focuses on the core trio that every employer demands: MS Word, MS Excel, and Tally Prime.',
    skillsGained: [
      'Professional Business Document Creation in MS Word',
      'Spreadsheet Management, Formulas & Data Processing in MS Excel',
      'Financial Accounting, Billing & Invoicing in Tally Prime',
      'Speed Typing & Drafting Skills',
      'Official Correspondence, Email Etiquette & PDF Workflows'
    ],
    toolsCovered: [
      'Microsoft Word (Advanced Formatting & Mail Merge)',
      'Microsoft Excel (Formulas, Pivot Tables, Charts)',
      'Tally Prime with GST Invoicing',
      'Touch-Typing Software',
      'PDF Tools & Professional Email Etiquette'
    ],
    practicalProjects: [
      'Official Executive Office Documentation Portfolio',
      'Automated Billing & Invoice Template in Excel and Tally',
      'Company Monthly Expense Sheet & Ledger Bookkeeping',
      'Bulk Client Communication via Word Mail Merge'
    ],
    careerOpportunities: [
      'Office Assistant / Junior Executive',
      'Billing & Invoice Clerk',
      'Data Operator & Record Keeper',
      'Small Business Operations Assistant'
    ],
    modules: [
      {
        title: 'Pillar 1: Master Microsoft Word (Month 1)',
        topics: [
          'Official letters, notices, resumes, table creation, and page setups',
          'Mail merge for bulk dispatch and professional certificates',
          'Document proofreading, headers, footers & corporate styling'
        ]
      },
      {
        title: 'Pillar 2: Practical Microsoft Excel (Month 2)',
        topics: [
          'Essential functions: SUM, AVERAGE, COUNTIF, SUMIF, IF conditions',
          'Data sorting, filtering, conditional formatting & lookup basics',
          'Creating monthly attendance, sales records & automated invoices'
        ]
      },
      {
        title: 'Pillar 3: Tally Prime Business Accounting (Month 3)',
        topics: [
          'Company setup, creating accounts & ledger entries',
          'Sales, purchase, payment & receipt vouchers with GST calculation',
          'Generating Daybook, Customer Statements & Stock Summary'
        ]
      }
    ],
    highlights: [
      'Duration: Just 3 Months (Fast-Track)',
      '100% Practical Computer Lab Practice',
      'Covers MS Word + MS Excel + Tally Prime',
      'Immediate Employability Focus'
    ],
    faqs: [
      {
        question: 'Why was the Office Work course launched?',
        answer: 'Employers in offices, retail, hospitals, schools, and firms need staff proficient in Word, Excel, and Tally billing. This 3-month course trains you directly on those essentials without delay.'
      },
      {
        question: 'Can I do this course alongside my college or job?',
        answer: 'Yes! We offer flexible morning, afternoon, and evening batches specifically for working people and college students.'
      }
    ]
  }
];
