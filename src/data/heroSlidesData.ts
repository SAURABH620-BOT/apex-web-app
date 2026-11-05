export interface HeroSlide {
  id: string;
  badge: string;
  badgeColor: 'blue' | 'yellow' | 'red';
  title: string;
  highlightedText: string;
  description: string;
  bgImage: string;
  imagePosition?: string;
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
    description: 'Empowering 1,500+ ambitious students with recognized IT diplomas (ADCA, DCA, DFA, DTP) and job-ready practical training.',
    bgImage: '/carousel/slide1_certification.png',
    imagePosition: 'object-center',
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
    badge: '💻 100% Practical Smart Classroom',
    badgeColor: 'blue',
    title: 'Experience Interactive Training with',
    highlightedText: 'Live Screen Casting',
    description: 'Learn MS Office, Tally Prime, and coding on big interactive screens with live software demonstrations and 1:1 computer practice.',
    bgImage: '/carousel/slide2_classroom.png',
    imagePosition: 'object-center',
    primaryCtaText: 'Take Virtual Lab Tour',
    primaryCtaAction: 'lab-tour',
    secondaryCtaText: 'Book Free Demo Class',
    secondaryCtaAction: 'contact',
    stats: [
      { value: '1 : 1', label: 'System Ratio' },
      { value: 'Live Demo', label: 'Smart Screen' },
      { value: 'ISO 9001', label: 'Certified Labs' }
    ]
  },
  {
    id: 'slide-3',
    badge: '👨‍🏫 Personal Faculty Mentorship',
    badgeColor: 'yellow',
    title: 'Learn Directly from Expert',
    highlightedText: 'IT Faculty & Mentors',
    description: 'Experienced BCA/MCA faculty offering individual attention, doubt-clearing sessions, and career guidance for every student.',
    bgImage: '/carousel/slide3_mentorship.png',
    imagePosition: 'object-center',
    primaryCtaText: 'Meet Expert Faculty',
    primaryCtaAction: 'faculty',
    secondaryCtaText: 'Speak to Counselor',
    secondaryCtaAction: 'contact',
    stats: [
      { value: '1-on-1', label: 'Guidance' },
      { value: 'Daily', label: 'Doubt Clearing' },
      { value: '100%', label: 'Career Support' }
    ]
  },
  {
    id: 'slide-4',
    badge: '🎓 1,500+ Proud Alumni Network',
    badgeColor: 'red',
    title: 'Build Your Future with the',
    highlightedText: 'Apex Student Family',
    description: 'Join a thriving community of learners, celebrate milestones together, and launch a successful career in government and private sectors.',
    bgImage: '/carousel/slide4_community.png',
    imagePosition: 'object-center',
    primaryCtaText: 'Why Choose Apex',
    primaryCtaAction: 'why-apex',
    secondaryCtaText: 'Book Free Demo',
    secondaryCtaAction: 'contact',
    stats: [
      { value: '1500+', label: 'Graduates' },
      { value: 'Top Batches', label: 'Morning & Evening' },
      { value: 'Lifetime', label: 'Lab Practice' }
    ]
  }
];
