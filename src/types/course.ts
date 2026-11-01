export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  tagline: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  eligibility: string;
  badge?: string;
  isPopular?: boolean;
  isNew?: boolean;
  description: string;
  skillsGained: string[];
  careerOpportunities: string[];
  modules: CourseModule[];
  highlights: string[];
  toolsCovered?: string[];
  practicalProjects?: string[];
  faqs?: CourseFaq[];
}
