/**
 * Sprout 2.0 Pure Validation & Formatting Logic
 */

export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export function sanitizePAN(input: string): string {
  return input
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 10);
}

export function validatePAN(pan: string): { isValid: boolean; message: string; isComplete: boolean } {
  const sanitized = sanitizePAN(pan);
  if (!sanitized) {
    return { isValid: false, message: '', isComplete: false };
  }
  if (sanitized.length === 10) {
    if (PAN_REGEX.test(sanitized)) {
      return {
        isValid: true,
        message: 'Format recognized: Valid PAN structure',
        isComplete: true,
      };
    } else {
      return {
        isValid: false,
        message: 'Enter a valid PAN in the required 10-character format.',
        isComplete: true,
      };
    }
  }
  return {
    isValid: false,
    message: `${10 - sanitized.length} characters remaining (e.g. ABCDE1234F)`,
    isComplete: false,
  };
}

export function sanitizeAadhaarDigits(input: string): string {
  return input.replace(/\D/g, '').slice(0, 12);
}

export function formatAadhaar(input: string): string {
  const digits = sanitizeAadhaarDigits(input);
  let formatted = '';
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += ' ';
    }
    formatted += digits[i];
  }
  return formatted;
}

export function validateAadhaar(input: string): {
  isValid: boolean;
  message: string;
  remainingDigits: number;
} {
  const digits = sanitizeAadhaarDigits(input);
  if (!digits) {
    return { isValid: false, message: '', remainingDigits: 12 };
  }
  if (digits.length === 12) {
    return {
      isValid: true,
      message: '12-digit Aadhaar captured',
      remainingDigits: 0,
    };
  }
  return {
    isValid: false,
    message: `${12 - digits.length} digits remaining`,
    remainingDigits: 12 - digits.length,
  };
}

export function canProceedFromPrepare(panChecked: boolean, aadhaarChecked: boolean): boolean {
  return panChecked && aadhaarChecked;
}

export function validateInvestmentAmount(input: string | number): {
  isValid: boolean;
  amount: number;
  message: string;
} {
  const num = typeof input === 'string' ? parseFloat(input.replace(/[^0-9.]/g, '')) : input;
  if (isNaN(num) || num <= 0) {
    return { isValid: false, amount: 0, message: 'Please enter a valid investment amount' };
  }
  if (num < 100) {
    return { isValid: false, amount: num, message: 'Minimum investment starts at ₹100' };
  }
  return { isValid: true, amount: Math.floor(num), message: '' };
}

export function formatCurrencyINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
