export interface Testimonial {
  id: string;
  name: string;
  courseTaken: string;
  year: string;
  currentRole: string;
  companyOrDept: string;
  quote: string;
  rating: number;
  avatarUrl: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Priya Sharma',
    courseTaken: 'ADCA (1 Year Diploma)',
    year: '2024 Batch',
    currentRole: 'Senior Data Executive',
    companyOrDept: 'State Revenue Department',
    quote: 'The practical approach at Apex Institute of Computer is unmatched. Durgesh Sir guided me through every nuance of MS Excel formulas and database design. I cleared my government computer proficiency test on the very first attempt!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'test-2',
    name: 'Rahul Verma',
    courseTaken: 'DFA & Tally Prime',
    year: '2023 Batch',
    currentRole: 'Accounts Executive',
    companyOrDept: 'Mahindra Logistics Hub',
    quote: 'Nitish Sir is truly a Tally and typing magician. When I enrolled, I barely knew debit from credit. Within 6 months, I was filing real GST returns and typing 42 words per minute in English. Got placed right after completing the course.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'test-3',
    name: 'Anjali Gupta',
    courseTaken: 'Office Work (3 Months Fast-Track)',
    year: '2025 Batch',
    currentRole: 'Administrative Assistant',
    companyOrDept: 'Apex Diagnostic Healthcare',
    quote: 'The 3-Month Office Work course was exactly what I needed after completing my graduation. It focused 100% on practical Excel reports, Word documentation, and Tally billing. Best investment of time for immediate job readiness!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'test-4',
    name: 'Vikash Kumar',
    courseTaken: 'DTA (Diploma in Taxation & Accounting)',
    year: '2024 Batch',
    currentRole: 'Junior Tax Consultant',
    companyOrDept: 'Bansal & Associates (CA Firm)',
    quote: 'Ashutosh Sir covered MCA-level taxation frameworks and income tax portal navigation that most other computer institutes never touch. The certificate portal also made verifying my credentials for my employer seamless.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  }
];
