export interface LabZone {
  id: string;
  title: string;
  tagline: string;
  category: 'Workstations' | 'Accounting & Taxation' | 'Typing & Speed Lab' | 'Smart Classroom';
  specs: string[];
  imageUrl: string;
  imagePosition?: string;
  description: string;
  highlights: string[];
}

export const labTourData: LabZone[] = [
  {
    id: 'lab-zone-1',
    title: 'High-Tech Computer Application Lab (ADCA / DCA)',
    tagline: '50+ High Performance Intel Workstations with High Speed LAN',
    category: 'Workstations',
    specs: ['Intel Core i5 / 16GB RAM', '24" Full HD IPS Displays', 'Windows 11 Pro Enterprise', 'Uninterrupted 10kVA Online UPS'],
    imageUrl: '/lab/lab1_workstations.jpeg',
    imagePosition: 'object-center',
    description: 'Our primary technical lab features ergonomics seating and 1:1 dedicated computer access where students practice office suites, database design, web designing, and graphic processing without waiting turns.',
    highlights: ['Zero system sharing', 'Dedicated high-speed fiber internet', 'High resolution monitors']
  },
  {
    id: 'lab-zone-2',
    title: 'Financial Accounting & Enterprise Lab (DFA / DTP)',
    tagline: 'Specialized Enterprise Accounting & GST Portal Simulation Center',
    category: 'Accounting & Taxation',
    specs: ['Licensed Tally Prime Release 4.0+', 'Live GST Portal Sandbox', 'High-Speed Thermal & Laser Printers', 'Dual-Window Workstations'],
    imageUrl: '/lab/lab2_dfa_accounting.jpeg',
    imagePosition: 'object-[center_35%]',
    description: 'Designed exclusively for commercial accounting students to simulate real-world company ledgers, voucher filings, balance sheet drafting, and income tax simulations under Nitish Kumar and Ashutosh Kumar.',
    highlights: ['Simulated business transactions', 'Real invoice printing practice', 'Bank reconciliation station']
  },
  {
    id: 'lab-zone-3',
    title: 'Precision Touch-Typing & Speed Arena',
    tagline: 'Dedicated Bilingual Keyboard Layouts (Hindi Kruti Dev / Remington & English)',
    category: 'Typing & Speed Lab',
    specs: ['Mechanical Feel Typing Keyboards', 'Custom Speed Metric Software', 'Hindi Mangal & Kruti Dev layouts', 'Real-time WPM & Accuracy Trackers'],
    imageUrl: '/lab/lab3_typing.jpeg',
    imagePosition: 'object-center',
    description: 'Speed typing is crucial for government clerkships, court typists, and corporate assistants. Our typing arena helps learners progress from 10 WPM to 45+ WPM with 95%+ accuracy within weeks.',
    highlights: ['Bilingual typing certification', 'Daily speed leaderboard', 'Ergonomic wrist-support desks']
  },
  {
    id: 'lab-zone-4',
    title: 'Interactive Projector & Smart Seminar Theater',
    tagline: 'Audio-Visual Conceptual Clarification & Career Workshops',
    category: 'Smart Classroom',
    specs: ['4K Interactive Laser Projector', 'Surround Audio Systems', 'Live Screen Casting for Code Demonstrations', 'Capacity: 60+ Students'],
    imageUrl: '/lab/lab4_seminar.jpeg',
    imagePosition: 'object-center',
    description: 'Where Durgesh Sir and visiting industry experts conduct live code walk-throughs, resume building bootcamps, and career guidance seminars.',
    highlights: ['Visual interactive learning', 'Guest lectures from IT alumni', 'Recorded session playbacks']
  }
];
