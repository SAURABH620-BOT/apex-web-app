export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseInterested: string;
  qualification: string;
  message: string;
  createdAt: string;
}

export interface AffiliationRecord {
  id: string;
  title: string;
  codeOrNumber: string;
  category: 'Govt. Affiliation' | 'ISO Certification' | 'Legal Registration' | 'Statutory';
  issuedBy: string;
  issueYear: string;
  description: string;
  validity: string;
  statusBadge: string;
}
