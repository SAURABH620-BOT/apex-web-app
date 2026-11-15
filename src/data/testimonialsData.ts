export interface Testimonial {
  id: string;
  name: string;
  courseTaken: string;
  year: string;
  currentRole: string;
  companyOrDept: string;
  quote: string;
  rating: number;
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
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Rahul Verma',
    courseTaken: 'DFA & Tally Prime',
    year: '2023 Batch',
    currentRole: 'Accounts Executive',
    companyOrDept: 'Mahindra Logistics Hub',
    quote: 'Nitish Sir is truly a Tally and typing magician. When I enrolled, I barely knew debit from credit. Within 6 months, I was filing real GST returns and typing 42 words per minute in English. Got placed right after completing the course.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Anjali Gupta',
    courseTaken: 'Office Work (3 Months Fast-Track)',
    year: '2025 Batch',
    currentRole: 'Administrative Assistant',
    companyOrDept: 'Apex Diagnostic Healthcare',
    quote: 'The 3-Month Office Work course was exactly what I needed after completing my graduation. It focused 100% on practical Excel reports, Word documentation, and Tally billing. Best investment of time for immediate job readiness!',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Vikash Kumar',
    courseTaken: 'DTP (Diploma in Desktop Publishing)',
    year: '2024 Batch',
    currentRole: 'Senior Graphic Designer',
    companyOrDept: 'Creative Print & Media House',
    quote: 'The DTP course at Apex covered Adobe PageMaker, Photoshop, CorelDraw, and Canva in complete depth. The practical lab training helped me land my graphic design job immediately after completion.',
    rating: 5
  }
];
