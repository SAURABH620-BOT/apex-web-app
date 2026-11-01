export type CourseOption = 'ADCA' | 'DCA' | 'DFA' | 'DTA' | 'Office Work';
export type SocialCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
export type Gender = 'Male' | 'Female' | 'Other';

export interface CertificateFormData {
  course: CourseOption;
  completionDate: string;
  name: string;
  fatherName: string;
  motherName: string;
  email: string;
  mobileNumber: string;
  alternateNumber: string;
  dob: string;
  category: SocialCategory;
  gender: Gender;
  correspondenceAddress: string;
  permanentAddress: string;
  profilePicture: File | null;
  profilePicturePreview?: string;
}

export interface CertificateRequestRecord {
  referenceId: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  course: CourseOption;
  completionDate: string;
  mobileNumber: string;
  alternateNumber?: string;
  email: string;
  dob: string;
  gender: Gender;
  category: SocialCategory;
  correspondenceAddress: string;
  permanentAddress: string;
  photoUrl?: string;
  photoDataUrl?: string;
  hasPhoto?: boolean;
  submittedAt: string;
}
