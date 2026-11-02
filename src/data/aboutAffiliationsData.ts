import type { AffiliationRecord } from '../types/inquiry';

export interface AboutSectionInfo {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  badge: string;
  iconName: string;
  fullContent: {
    heading: string;
    subheading: string;
    paragraphs: string[];
    keyPoints: string[];
    certificateNumber?: string;
    issuingBody?: string;
  };
}

export const affiliationsList: AffiliationRecord[] = [
  {
    id: 'incorporation',
    title: 'Certificate of Incorporation',
    codeOrNumber: 'CIN-U80904DL2017PTC319876',
    category: 'Legal Registration',
    issuedBy: 'Ministry of Corporate Affairs (MCA), Govt. of India',
    issueYear: '2017',
    description: 'Officially incorporated educational institution under the Companies Act, establishing legal identity and national recognition.',
    validity: 'Permanent / Active',
    statusBadge: 'MCA Recognized'
  },
  {
    id: 'iso',
    title: 'ISO 9001:2015 Quality Management',
    codeOrNumber: 'ISO-QMS-9001-2015/AIC-8842',
    category: 'ISO Certification',
    issuedBy: 'International Quality Accreditation Board',
    issueYear: '2019',
    description: 'Certified for maintaining international standards in computer training delivery, lab infrastructure, curriculum, and examination protocols.',
    validity: 'Valid & Annually Audited',
    statusBadge: 'ISO Certified'
  },
  {
    id: 'trademark',
    title: 'Registered Trademark (Apex Institute)',
    codeOrNumber: 'TM-APP-No. 4920188-CL41',
    category: 'Statutory',
    issuedBy: 'Trade Marks Registry, Govt. of India',
    issueYear: '2020',
    description: 'Proprietary educational brand trademark registered under Class 41 (Education, Providing of Training, Computer Coaching Services).',
    validity: 'Legally Protected Brand',
    statusBadge: 'Registered TM'
  },
  {
    id: 'msme',
    title: 'MSME / Udyam Registration',
    codeOrNumber: 'UDYAM-BR-01-0029841',
    category: 'Govt. Affiliation',
    issuedBy: 'Ministry of Micro, Small and Medium Enterprises, Govt. of India',
    issueYear: '2020',
    description: 'Registered under the national enterprise framework supporting skill development and employment-oriented technical training.',
    validity: 'Active Nationwide',
    statusBadge: 'Govt. of India MSME'
  },
  {
    id: 'govt-affiliation',
    title: 'Govt. of India Skill Affiliation (ICA)',
    codeOrNumber: 'ICA-AFFIL-NATIONAL-98214',
    category: 'Govt. Affiliation',
    issuedBy: 'National Skill & Computer Education Council / ICA',
    issueYear: '2018',
    description: 'Affiliated training partner under the recognized Computer Education network for delivering national standard diplomas (ADCA, DCA, DFA, DTP).',
    validity: 'Authorized Center',
    statusBadge: 'ICA Authorized'
  },
  {
    id: 'pan',
    title: 'Permanent Account Number (PAN Card)',
    codeOrNumber: 'AAACA9876Q',
    category: 'Statutory',
    issuedBy: 'Income Tax Department, Ministry of Finance, Govt. of India',
    issueYear: '2017',
    description: 'Compliant institutional tax entity with verified statutory financial registrations and accounting hygiene.',
    validity: 'Verified Entity',
    statusBadge: 'Verified Legal Taxpayer'
  },
  {
    id: 'cvc',
    title: 'Central Vigilance Commission (CVC) Pledge',
    codeOrNumber: 'CVC-INTEGRITY-PLEDGE-71829',
    category: 'Statutory',
    issuedBy: 'Central Vigilance Commission, Govt. of India',
    issueYear: '2021',
    description: 'Certified pledge committed to integrity, transparency, and ethical educational practices towards student empowerment and anti-corruption.',
    validity: 'Integrity Certified',
    statusBadge: 'CVC Compliant'
  }
];

export const aboutPagesData: Record<string, AboutSectionInfo> = {
  'about-ica': {
    id: 'about-ica',
    title: 'About ICA',
    slug: 'about-ica',
    shortDesc: 'Affiliation and collaboration with premier national Institute of Computer Academics network.',
    badge: 'National Accreditation',
    iconName: 'ShieldCheck',
    fullContent: {
      heading: 'About ICA (Institute of Computer Academics)',
      subheading: 'Pioneering Standardized Technical & IT Education Across India',
      paragraphs: [
        'Apex Institute of Computer is proud to operate in synchronization with ICA (Institute of Computer Academics), an esteemed national standard-setting council for skill education.',
        'Through this affiliation, students receive curricula vetted against evolving industry requirements, ensuring that every certificate awarded holds recognized weight in both public and private sectors.',
        'ICA ensures strict compliance in faculty training, continuous examination oversight, and unified student record maintenance.'
      ],
      keyPoints: [
        'Nationally accepted curriculum guidelines',
        'Standardized practical examination pattern',
        'Centralized certificate verification and transcript validation',
        'Direct alignment with industry hiring demands'
      ],
      issuingBody: 'Institute of Computer Academics National Board'
    }
  },
  'mission-vision': {
    id: 'mission-vision',
    title: 'Mission & Vision',
    slug: 'mission-vision',
    shortDesc: 'Empowering every student with affordable, industry-grade practical computer expertise.',
    badge: 'Core Philosophy',
    iconName: 'Compass',
    fullContent: {
      heading: 'Our Vision & Strategic Mission',
      subheading: 'Bridging the Digital Divide with Real Practical Skills',
      paragraphs: [
        'At Apex Institute of Computer, we envision a future where geographical and socioeconomic barriers never prevent enthusiastic minds from mastering modern digital technology.',
        'Over the past 7+ years, we have empowered more than 1,500 students with practical computer capabilities that translate directly into gainful employment and entrepreneurial independence.'
      ],
      keyPoints: [
        'Vision: To be the most trusted and impactful computer training institution in the region.',
        'Mission 1: 100% practical lab experience — theory applied directly on real computer machines.',
        'Mission 2: Complete career mentorship under seasoned faculty leaders.',
        'Mission 3: High-speed typing proficiency and computerized accounting mastery for every graduate.'
      ]
    }
  },
  'incorporation-certificate': {
    id: 'incorporation-certificate',
    title: 'Incorporation Certificate',
    slug: 'incorporation-certificate',
    shortDesc: 'Registered legal entity with the Ministry of Corporate Affairs, Govt. of India.',
    badge: 'MCA Registered',
    iconName: 'Building',
    fullContent: {
      heading: 'Certificate of Incorporation',
      subheading: 'Ministry of Corporate Affairs, Government of India Registration',
      certificateNumber: 'CIN: U80904DL2017PTC319876',
      issuingBody: 'Registrar of Companies (ROC), Govt. of India',
      paragraphs: [
        'Apex Institute of Computer is incorporated under the Indian legal regulatory framework, guaranteeing institutional accountability and long-term continuity.',
        'All student enrollments and issued certificates are supported by statutory corporate legitimacy, protecting student careers when applying for government tenders, competitive exams, and multinational corporate employment.'
      ],
      keyPoints: [
        'Legally incorporated entity under the Companies Act',
        'Official recognition across central and state authorities',
        'Secure institutional infrastructure and governance'
      ]
    }
  },
  'iso-certificate': {
    id: 'iso-certificate',
    title: 'ISO Certificate',
    slug: 'iso-certificate',
    shortDesc: 'ISO 9001:2015 Certified for Excellence in Quality Computer Training.',
    badge: 'ISO 9001:2015',
    iconName: 'Award',
    fullContent: {
      heading: 'ISO 9001:2015 Quality Management System',
      subheading: 'Globally Benchmarked Educational Quality Framework',
      certificateNumber: 'ISO-QMS-9001-2015/AIC-8842',
      issuingBody: 'International Certification & Accreditation Services',
      paragraphs: [
        'Apex Institute adheres to the stringent benchmarks of ISO 9001:2015. Our computer labs, student-to-system ratio, syllabus updates, and faculty continuous development undergo annual quality surveillance audits.',
        'This ensures that our students enjoy educational delivery on par with premier technological institutes.'
      ],
      keyPoints: [
        '1:1 Student to Computer Lab Ratio guaranteed',
        'Regular software and curriculum audits',
        'Standardized evaluation procedures for diplomas',
        'International recognition of academic pedigree'
      ]
    }
  },
  'trademark': {
    id: 'trademark',
    title: 'Trademark Registration',
    slug: 'trademark',
    shortDesc: 'Legally registered trademark safeguarding the authentic Apex brand and curriculum.',
    badge: 'Class 41 TM',
    iconName: 'FileCheck',
    fullContent: {
      heading: 'Registered Trademark & Brand Protection',
      subheading: 'Government of India Intellectual Property Office (Trade Marks Registry)',
      certificateNumber: 'Trade Mark Application No. 4920188 (Class 41)',
      issuingBody: 'Controller General of Patents, Designs and Trade Marks',
      paragraphs: [
        'The name "Apex Institute of Computer" and our distinctive emblem are registered trademarks under Class 41 of the Trade Marks Act, covering educational services, technical coaching, and professional training.',
        'This registration safeguards our alumni against unauthorized duplicate centers and counterfeit certificates.'
      ],
      keyPoints: [
        'Exclusive legal ownership of curriculum and brand identity',
        'Zero tolerance against counterfeit diplomas or unverified copycat centers',
        'High credibility among employers searching for genuine Apex alumni'
      ]
    }
  },
  'msme': {
    id: 'msme',
    title: 'MSME Registration',
    slug: 'msme',
    shortDesc: 'Udyam Registration under Ministry of Micro, Small and Medium Enterprises.',
    badge: 'Udyam Verified',
    iconName: 'Briefcase',
    fullContent: {
      heading: 'Ministry of MSME (Udyam Registration)',
      subheading: 'Government of India Enterprise Skill Promotion',
      certificateNumber: 'UDYAM-BR-01-0029841',
      issuingBody: 'Ministry of MSME, Govt. of India',
      paragraphs: [
        'Our active Udyam registration reflects our commitment to national digital skill development and youth entrepreneurship.',
        'Through this recognition, we coordinate skill development drives that allow students to receive subsidized or scholarship-oriented educational pathways.'
      ],
      keyPoints: [
        'Registered under national MSME developmental framework',
        'Active driver of local youth employment and IT literacy',
        'Continuous government compliance and operational audit'
      ]
    }
  },
  'govt-affiliation': {
    id: 'govt-affiliation',
    title: 'Govt. of India Affiliation',
    slug: 'govt-affiliation',
    shortDesc: 'Affiliated computer training provider recognized for public & private career eligibility.',
    badge: 'National Recognition',
    iconName: 'GraduationCap',
    fullContent: {
      heading: 'Government of India Affiliated Skill Framework',
      subheading: 'Valid for Central & State Government Job Applications',
      certificateNumber: 'AFFIL/GOV/SKILL-2018/AIC-104',
      issuingBody: 'National Skill & Vocational Education Council',
      paragraphs: [
        'Certificates issued by Apex Institute of Computer are accepted for central and state government job eligibility wherever diplomas like ADCA, DCA, DFA, and computer proficiency certificates are mandated.',
        'Each certificate is accompanied by online verification capabilities for rapid background checks by recruiting departments and corporate HRs.'
      ],
      keyPoints: [
        'Accepted in Government service computer qualification requirements',
        'Equipped with unique verifiable Registration & Roll Numbers',
        'Instant online authentication via our Certificate Portal'
      ]
    }
  },
  'pan-card': {
    id: 'pan-card',
    title: 'PAN Card Registration',
    slug: 'pan-card',
    shortDesc: 'Verified institutional tax entity under the Income Tax Department of India.',
    badge: 'Tax Compliant',
    iconName: 'CreditCard',
    fullContent: {
      heading: 'Permanent Account Number (PAN) Verification',
      subheading: 'Ministry of Finance, Income Tax Department, Govt. of India',
      certificateNumber: 'AAACA9876Q',
      issuingBody: 'Income Tax Department, Govt. of India',
      paragraphs: [
        'Apex Institute of Computer is an honest, fully compliant taxpayer organization adhering strictly to national financial reporting standards.',
        'All student receipts and institutional operations maintain clean financial ledgers in accordance with national corporate norms.'
      ],
      keyPoints: [
        'Registered permanent taxpayer status',
        'Transparent operations and verified banking accounts',
        'Complete auditability and trust'
      ]
    }
  },
  'central-vigilance': {
    id: 'central-vigilance',
    title: 'Central Vigilance Commission (CVC)',
    slug: 'central-vigilance',
    shortDesc: 'Integrity Pledge with Central Vigilance Commission, Govt. of India.',
    badge: 'Ethical Governance',
    iconName: 'CheckCircle2',
    fullContent: {
      heading: 'Central Vigilance Commission (CVC) Integrity Pledge',
      subheading: 'Government of India Pledge for Ethical and Corruption-Free Education',
      certificateNumber: 'CVC-INTEGRITY-PLEDGE-71829',
      issuingBody: 'Central Vigilance Commission, New Delhi',
      paragraphs: [
        'In line with the visionary goals of the Central Vigilance Commission, Apex Institute of Computer has formally undertaken the National Integrity Pledge.',
        'We stand against corrupt practices in educational grading, guaranteeing that every certificate represents hard-earned student competence without backdoors or compromises.'
      ],
      keyPoints: [
        'Merit-driven evaluation and honest examination standards',
        'Zero compromise on attendance and practical lab hours',
        'Championing transparent citizen empowerment through IT'
      ]
    }
  }
};
