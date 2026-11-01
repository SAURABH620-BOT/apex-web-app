/**
 * Formatting and certificate generator utilities
 */

export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Generate sequential-like unique registration number
 */
export function generateRegistrationNo(courseCode: string): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `APEX/${year}/${courseCode}/${randomSuffix}`;
}

/**
 * Generate student roll number
 */
export function generateRollNo(): string {
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(10000 + Math.random() * 90000);
  return `AIC-${yearSuffix}${random}`;
}

/**
 * Generate unique certificate verification code
 */
export function generateCertificateId(): string {
  const hex = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `CERT-AIC-${year}-${hex}`;
}

/**
 * Get Course full name from code
 */
export function getCourseFullName(code: string): { fullName: string; duration: string } {
  switch (code) {
    case 'ADCA':
      return {
        fullName: 'Advance Diploma in Computer Applications (ADCA)',
        duration: '12 Months'
      };
    case 'DCA':
      return {
        fullName: 'Diploma in Computer Applications (DCA)',
        duration: '6 Months'
      };
    case 'DFA':
      return {
        fullName: 'Diploma in Financial Accounting (DFA)',
        duration: '6 Months'
      };
    case 'DTA':
      return {
        fullName: 'Diploma in Taxation & Accounting (DTA)',
        duration: '6 Months'
      };
    case 'Office Work':
      return {
        fullName: 'Professional Office Work & Business Automation',
        duration: '3 Months'
      };
    default:
      return {
        fullName: 'Computer Certification Program',
        duration: '3-12 Months'
      };
  }
}

/**
 * Get WhatsApp Number from environment variables (.env)
 */
export function getWhatsAppNumber(): string {
  return (
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    import.meta.env.VITE_SUPPORT_PHONE ||
    '+91 6200043032'
  );
}

/**
 * Get Certificate Portal WhatsApp Number (defaults to 6200043032)
 */
export function getCertificateWhatsAppNumber(): string {
  return (
    import.meta.env.VITE_CERTIFICATE_WHATSAPP_NUMBER ||
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    '+91 6200043032'
  );
}

/**
 * Clean WhatsApp number into digits only, ensuring country code (91 for India 10-digit numbers)
 */
export function getCleanWhatsAppDigits(phone?: string): string {
  const raw = phone || getWhatsAppNumber();
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Generate full wa.me link with encoded message
 */
export function getWhatsAppUrl(message?: string, phone?: string): string {
  const clean = getCleanWhatsAppDigits(phone);
  if (!message) {
    return `https://wa.me/${clean}`;
  }
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/**
 * Get Institute Address from environment variables (.env)
 */
export function getInstituteAddress(): string {
  return (
    import.meta.env.VITE_ADDRESS ||
    'Beldari Tola Nutan Nagar Rd, in front of Dr pushkar and Shupriya Gupta, New Area, Gaya, Bihar 823001'
  );
}
