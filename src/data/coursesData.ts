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
    description: 'The flagship one-year diploma covers Basic Computer, Typing (Hindi + English), Operating System, Notepad, Wordpad, MS Paint, Ms-Office (Word, Excel, Power point), MS-Access, HTML, Photoshop, CoralDraw, PageMaker, Tally (Prime), Internet, and Basic Hardware.',
    skillsGained: [
      'Basic Computer & Typing (Hindi + English)',
      'Operating System & Basic Hardware',
      'Notepad, Wordpad & MS Paint',
      'Ms-Office (Word, Excel, Power point) & MS-Access',
      'DTP (Photoshop, CoralDraw, PageMaker)',
      'Tally (Prime), HTML & Internet'
    ],
    toolsCovered: [
      'Basic Computer & Typing (Hindi + English)',
      'Operating System (Windows)',
      'Notepad, Wordpad & MS Paint',
      'Ms-Office (Word, Excel, Power point)',
      'MS-Access',
      'HTML',
      'Photoshop',
      'CoralDraw',
      'PageMaker',
      'Tally (Prime)',
      'Internet',
      'Basic Hardware'
    ],
    practicalProjects: [
      'Complete Office Documentation & Mail Merge in Ms-Office',
      'Company Accounting, GST Billing & Finalization in Tally (Prime)',
      'Graphic Banners, ID Cards & Photo Editing in Photoshop & CoralDraw',
      'Publication Layouts & Book Designing in PageMaker',
      'Website Page Layout with HTML and Internet Services Integration'
    ],
    careerOpportunities: [
      'Computer Operator / Office Assistant',
      'Data Entry Specialist (Hindi + English)',
      'DTP Designer (Photoshop, CoralDraw, PageMaker)',
      'Accounts Executive (Tally Prime)',
      'IT Support & Hardware Assistant',
      'Government Job Computer Qualification'
    ],
    modules: [
      {
        title: 'Semester 1: Fundamentals, Office Automation & Web Design',
        topics: [
          'Basic Computer, Typing(Hindi + English)',
          'Operating System',
          'Notepad, Wordpad, MS Paint',
          'Ms-Office (Word, Excel, Power point)',
          'MS-Access',
          'HTML'
        ]
      },
      {
        title: 'Semester 2: Graphic Designing, Accounting & Hardware',
        topics: [
          'Photoshop',
          'CoralDraw',
          'PageMaker',
          'Tally (Prime)',
          'Internet',
          'Basic Hardware'
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
        answer: 'Yes, 100% guaranteed. At Apex, every student gets an individual workstation during their batch hours without sharing.'
      },
      {
        question: 'Do I need prior coding or computer knowledge to join?',
        answer: 'No prior background is required. We start right from Basic Computer and Typing under Durgesh Sir.'
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
    description: 'A focused 6-month diploma covering Computer Fundamental, DOS, Operating System, Ms-Office (Word, Excel, Power point), MS-Access, HTML, Internet, and Basic Hardware.',
    skillsGained: [
      'Computer Fundamental & Basic Hardware',
      'DOS & Operating System',
      'Ms-Office (Word, Excel, Power point)',
      'MS-Access Database Management',
      'HTML Web Page Designing Basics',
      'Internet, Emailing & Online Services'
    ],
    toolsCovered: [
      'Computer Fundamental',
      'DOS',
      'Operating System (Windows)',
      'Ms-Office (Word, Excel, Power point)',
      'MS-Access',
      'HTML',
      'Internet',
      'Basic Hardware'
    ],
    practicalProjects: [
      'Official Administrative Letter Drafting & Formatting in Ms-Office',
      'Monthly Sales, Salary & Attendance Registers in Excel',
      'Database Design, Student Record Forms & Reports in MS-Access',
      'Responsive Web Page Layout Design in HTML',
      'DOS Command Line Operations & Basic Hardware Troubleshooting'
    ],
    careerOpportunities: [
      'Data Entry Operator (DEO)',
      'Computer Operator / Office Assistant',
      'Front Desk / Reception Coordinator',
      'Administrative Support Assistant',
      'Government Job Computer Qualification'
    ],
    modules: [
      {
        title: 'Module 1: Fundamentals, Operating System & Hardware',
        topics: [
          'Computer Fundamental',
          'DOS',
          'Operating System',
          'Basic Hardware'
        ]
      },
      {
        title: 'Module 2: Office Applications, Database & Web',
        topics: [
          'Ms-Office (Word, Excel, Power point)',
          'MS-Access',
          'HTML',
          'Internet'
        ]
      }
    ],
    highlights: [
      'Ideal for Students & Job Seekers',
      'Dedicated Hands-on Lab Sessions',
      'Government & Private Sector Job Ready'
    ],
    faqs: [
      {
        question: 'What is the duration of DCA at Apex?',
        answer: 'DCA is a 6-month intensive diploma covering Computer Fundamental, DOS, Operating System, Ms-Office, MS-Access, HTML, Internet, and Basic Hardware.'
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
    tagline: 'Master Practical Bookkeeping, GST & Corporate Financial Ledgers in 4 Months',
    duration: '4 Months',
    level: 'Intermediate',
    eligibility: '10th / 12th Pass (Commerce or Any Stream)',
    badge: 'High Industry Demand',
    description: 'Comprehensive 4-month financial diploma covering Introduction of Accounting, Tally Prime With GST, Advance Feature of Tally, Cost Category & Cost Center, Discount, Physical Stock, Actual and Bill Quantity, Bill-wise Details, Batch-wise Details, Zero Value Entry, Cheque Printing, Company Logo, Credit Limit, Inventory, Currency, Budget, and Payroll.',
    skillsGained: [
      'Introduction of Accounting & Golden Rules',
      'Tally Prime With GST & Invoicing',
      'Advance Features of Tally & Cost Centers',
      'Bill-wise & Batch-wise Details Management',
      'Inventory, Physical Stock & Discount Structure',
      'Cheque Printing, Company Logo, Budget & Payroll'
    ],
    toolsCovered: [
      'Introduction of Accounting',
      'Tally Prime With GST',
      'Advance Feature of Tally',
      'Cost Category & Cost Center',
      'Discount & Physical Stock',
      'Actual and Bill Quantity',
      'Bill-wise & Batch-wise Details',
      'Zero Value Entry & Cheque Printing',
      'Company Logo & Credit Limit',
      'Inventory, Currency & Budget',
      'Payroll Management'
    ],
    practicalProjects: [
      'End-to-End Enterprise Trading Ledger Setup in Tally Prime With GST',
      'Multi-tier Tax Invoice Preparation with Discount, Actual & Bill Quantity',
      'Cost Category & Cost Center Allocation for Departmental Audits',
      'Cheque Printing, Company Logo Configuration & Bank Reconciliation',
      'Complete Employee Salary & Payroll Slip Processing'
    ],
    careerOpportunities: [
      'Junior Accountant / Tally Operator',
      'Accounts Payable / Receivable Clerk',
      'Billing & Inventory Executive in Retail / Wholesale',
      'Audit Assistant in CA / Tax Firms',
      'Payroll & Commercial Accounting Assistant'
    ],
    modules: [
      {
        title: 'Module 1: Accounting Foundations & Core Tally Prime GST',
        topics: [
          'Introduction of Accounting',
          'Tally Prime With GST',
          'Advance Feature of Tally',
          'Cost Category & Cost Center',
          'Discount, Physical Stock',
          'Actual and Bill Quantity',
          'Bill-wise Details',
          'Batch-wise Details'
        ]
      },
      {
        title: 'Module 2: Advanced Operations, Inventory, Banking & Payroll',
        topics: [
          'Zero Value Entry',
          'Cheque Printing',
          'Company Logo',
          'Credit Limit',
          'Inventory',
          'Currency',
          'Budget',
          'Payroll, Etc.'
        ]
      }
    ],
    highlights: [
      'Real-world Invoice Simulation',
      'Tally Prime Latest Release Training',
      'Practical Balance Sheet Finalization',
      'GST & Payroll Live Practice'
    ],
    faqs: [
      {
        question: 'What is the duration of DFA at Apex?',
        answer: 'DFA is a 4-month intensive diploma covering complete corporate accounting, GST, and payroll in Tally Prime.'
      },
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
    id: 'dtp',
    code: 'DTP',
    name: 'Diploma in Desktop Publishing',
    tagline: 'Master Professional Graphic Design, Photo Editing & Layout Design in 3 Months',
    duration: '3 Months',
    level: 'Intermediate',
    eligibility: '10th / 12th Pass or Equivalent',
    badge: 'Creative Career',
    description: 'A career-defining 3-month graphic & publishing diploma covering Adobe Pagemaker, Adobe Photoshop, CoralDraw, and Canva for professional printing, advertising, social media creatives, and digital design.',
    skillsGained: [
      'Adobe Pagemaker Layout & Book Designing',
      'Adobe Photoshop Image Editing & Retouching',
      'CoralDraw Vector Graphics & Logo Design',
      'Canva Social Media Marketing Creatives',
      'Visiting Cards, Banners & Pamphlet Designing',
      'Color Models (RGB/CMYK) & Commercial Printing'
    ],
    toolsCovered: [
      'Adobe Pagemaker',
      'Adobe Photoshop',
      'CoralDraw',
      'Canva'
    ],
    practicalProjects: [
      'Visiting Card, Flex Banner, Bill Book & Pamphlet Designing in CoralDraw',
      'Studio Passport Photo Retouching & Creative Poster in Photoshop',
      'Book Layout, Newspaper & Magazine Design in Adobe Pagemaker',
      'Branded Social Media Marketing Posts & Banners in Canva'
    ],
    careerOpportunities: [
      'DTP Operator & Printing Press Executive',
      'Graphic Designer & Creative Executive',
      'Photo Studio Specialist',
      'Freelance Digital Designer',
      'Advertising & Media Agency Designer'
    ],
    modules: [
      {
        title: 'Module 1: Publishing Layouts & Vector Graphics',
        topics: [
          'Adobe Pagemaker',
          'CoralDraw'
        ]
      },
      {
        title: 'Module 2: Photo Editing & Cloud Graphic Design',
        topics: [
          'Adobe Photoshop',
          'Canva'
        ]
      }
    ],
    highlights: [
      '100% Practical Designing Lab Practice',
      'Master Core Design Software: PageMaker, Photoshop, CorelDraw & Canva',
      'Portfolio Preparation for High-Paying Printing & Digital Design Jobs',
      'Industry Standard ISO 9001:2015 Certification'
    ],
    faqs: [
      {
        question: 'What is the duration of DTP at Apex?',
        answer: 'DTP is a 3-month fast-track professional diploma covering Adobe Pagemaker, Adobe Photoshop, CoralDraw, and Canva.'
      },
      {
        question: 'Do I need prior drawing or creative background to join DTP?',
        answer: 'No prior drawing background is needed. We start from the basics of tools, fonts, colors, and layout techniques under expert guidance.'
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
