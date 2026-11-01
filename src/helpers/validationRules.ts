/**
 * Custom lightweight validation rules engine without bulky third-party dependencies.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validationRules = {
  /**
   * Checks if a field is non-empty
   */
  required: (value: unknown, fieldName = 'This field'): ValidationResult => {
    if (value === undefined || value === null) {
      return { isValid: false, error: `${fieldName} is required.` };
    }
    if (typeof value === 'string' && value.trim() === '') {
      return { isValid: false, error: `${fieldName} is required.` };
    }
    if (Array.isArray(value) && value.length === 0) {
      return { isValid: false, error: `Please select at least one ${fieldName.toLowerCase()}.` };
    }
    return { isValid: true };
  },

  /**
   * Validates standard RFC-compliant email address format
   */
  email: (value: string): ValidationResult => {
    if (!value || value.trim() === '') {
      return { isValid: false, error: 'Email address is required.' };
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
      return { isValid: false, error: 'Please enter a valid email address (e.g., student@domain.com).' };
    }
    return { isValid: true };
  },

  /**
   * Validates 10-digit Indian mobile number (only numbers, exactly 10 digits)
   */
  phone: (value: string, fieldName = 'Mobile number', optional = false): ValidationResult => {
    if (!value || value.trim() === '') {
      if (optional) return { isValid: true };
      return { isValid: false, error: `${fieldName} is required.` };
    }
    const cleanDigits = value.replace(/\D/g, '');
    if (cleanDigits.length !== 10) {
      return {
        isValid: false,
        error: `${fieldName} must be exactly 10 digits.`
      };
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanDigits)) {
      return {
        isValid: false,
        error: `${fieldName} must be a valid 10-digit number starting with 6, 7, 8, or 9.`
      };
    }
    return { isValid: true };
  },

  /**
   * Validates password length and complexity
   */
  password: (value: string, minLength = 6): ValidationResult => {
    if (!value) {
      return { isValid: false, error: 'Password is required.' };
    }
    if (value.length < minLength) {
      return { isValid: false, error: `Password must be at least ${minLength} characters.` };
    }
    const hasNumberOrSpecial = /[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
    if (!hasNumberOrSpecial) {
      return { isValid: false, error: 'Password must include at least one number or special character.' };
    }
    return { isValid: true };
  },

  /**
   * Validates Date of Birth (must be a valid past date and at least 10 years old)
   */
  dateOfBirth: (value: string): ValidationResult => {
    if (!value) {
      return { isValid: false, error: 'Date of birth is required.' };
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { isValid: false, error: 'Please provide a valid date format (YYYY-MM-DD).' };
    }
    const now = new Date();
    if (date >= now) {
      return { isValid: false, error: 'Date of birth must be a past date.' };
    }
    const ageDiffMs = now.getTime() - date.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 10) {
      return { isValid: false, error: 'Student must be at least 10 years old.' };
    }
    return { isValid: true };
  },

  /**
   * Validates Completion Date
   */
  completionDate: (value: string): ValidationResult => {
    if (!value) {
      return { isValid: false, error: 'Course completion date is required.' };
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { isValid: false, error: 'Please select a valid date.' };
    }
    return { isValid: true };
  },

  /**
   * Validates Image File upload (size < 2MB, allowed mime types)
   */
  imageFile: (file: File | null, maxSizeMb = 2, optional = false): ValidationResult => {
    if (!file) {
      if (optional) return { isValid: true };
      return { isValid: false, error: 'Please upload a student profile picture.' };
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only JPG, JPEG, PNG, or WEBP image files are allowed.' };
    }
    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return { isValid: false, error: `Image file size must not exceed ${maxSizeMb}MB.` };
    }
    return { isValid: true };
  },

  /**
   * Address length validation
   */
  address: (value: string, fieldName = 'Address'): ValidationResult => {
    if (!value || value.trim().length < 8) {
      return { isValid: false, error: `${fieldName} must be at least 8 characters long with full details.` };
    }
    return { isValid: true };
  }
};
