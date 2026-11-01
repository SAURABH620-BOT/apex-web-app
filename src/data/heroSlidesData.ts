export interface HeroSlide {
  id: string;
  badge: string;
  badgeColor: 'blue' | 'yellow' | 'red';
  title: string;
  highlightedText: string;
  description: string;
  bgImage: string;
  primaryCtaText: string;
  primaryCtaAction: string;
  secondaryCtaText: string;
  secondaryCtaAction: string;
  stats: { value: string; label: string }[];
}

export const heroSlidesData: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: '🏆 7+ Years of Academic Excellence',
    badgeColor: 'yellow',
    title: 'Master Modern Tech at',
    highlightedText: 'Apex Institute',
    description: 'Empowering 1,500+ ambitious students with recognized IT diplomas (ADCA, DCA, DFA, DTA) and job-ready practical training.',
    bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80',
    primaryCtaText: 'Explore Courses',
    primaryCtaAction: 'courses',
    secondaryCtaText: 'Request Certificate',
    secondaryCtaAction: 'portal',
    stats: [
      { value: '1500+', label: 'Students Trained' },
      { value: '7+ Years', label: 'Apex Experience' },
      { value: '100%', label: 'Practical Labs' }
    ]
  },
  {
    id: 'slide-2',
    badge: '🚀 NEW 3-MONTH DIPLOMA',
    badgeColor: 'red',
    title: 'Fast-Track Job Skills with',
    highlightedText: 'Office Automation',
    description: 'Master the corporate trio: Microsoft Word, Advanced Excel, and Tally Prime with GST for immediate office placement.',
    bgImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80',
    primaryCtaText: 'View Course Syllabus',
    primaryCtaAction: 'courses',
    secondaryCtaText: 'Book Free Demo Class',
    secondaryCtaAction: 'contact',
    stats: [
      { value: '3 Months', label: 'Duration' },
      { value: 'MS Office', label: 'Core Suite' },
      { value: 'Tally Prime', label: 'With GST' }
    ]
  },
  {
    id: 'slide-3',
    badge: '💻 ISO 9001:2015 Certified Labs',
    badgeColor: 'blue',
    title: '100% Practical Training in',
    highlightedText: 'Next-Gen Labs',
    description: 'Guaranteed 1:1 computer ratio, modern Intel Core workstations, high-speed gigabit networking, and dedicated typing practice.',
    bgImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80',
    primaryCtaText: 'Take Virtual Lab Tour',
    primaryCtaAction: 'lab-tour',
    secondaryCtaText: 'Meet Expert Faculty',
    secondaryCtaAction: 'faculty',
    stats: [
      { value: '1 : 1', label: 'System Ratio' },
      { value: '40+ WPM', label: 'Target Typing' },
      { value: 'ISO 9001', label: 'Certified Labs' }
    ]
  }
];
