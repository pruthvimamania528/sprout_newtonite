import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizePAN,
  validatePAN,
  sanitizeAadhaarDigits,
  formatAadhaar,
  validateAadhaar,
  canProceedFromPrepare,
  validateInvestmentAmount,
  formatCurrencyINR,
} from './validation.ts';

test('sanitizePAN strips invalid characters and enforces uppercase and max 10 chars', () => {
  assert.equal(sanitizePAN('abcde1234f'), 'ABCDE1234F');
  assert.equal(sanitizePAN('abc-de!1234@f999'), 'ABCDE1234F');
  assert.equal(sanitizePAN(''), '');
});

test('validatePAN correctly identifies valid and invalid PAN formats', () => {
  // Valid
  const valid = validatePAN('ABCDE1234F');
  assert.equal(valid.isValid, true);
  assert.equal(valid.isComplete, true);
  assert.match(valid.message, /Valid PAN structure/);

  // Incomplete
  const incomplete = validatePAN('ABCD');
  assert.equal(incomplete.isValid, false);
  assert.equal(incomplete.isComplete, false);
  assert.match(incomplete.message, /6 characters remaining/);

  // Invalid format with 10 chars
  const invalid10 = validatePAN('ABC1234567');
  assert.equal(invalid10.isValid, false);
  assert.equal(invalid10.isComplete, true);
  assert.match(invalid10.message, /Enter a valid PAN/);
});

test('formatAadhaar formats 12 digits with spaces every 4 characters', () => {
  assert.equal(formatAadhaar('548291043821'), '5482 9104 3821');
  assert.equal(formatAadhaar('548291'), '5482 91');
  assert.equal(formatAadhaar('5482'), '5482');
  assert.equal(formatAadhaar(''), '');
});

test('validateAadhaar requires exactly 12 numeric digits', () => {
  const valid = validateAadhaar('5482 9104 3821');
  assert.equal(valid.isValid, true);
  assert.equal(valid.remainingDigits, 0);

  const incomplete = validateAadhaar('5482 9104');
  assert.equal(incomplete.isValid, false);
  assert.equal(incomplete.remainingDigits, 4);

  const empty = validateAadhaar('');
  assert.equal(empty.isValid, false);
  assert.equal(empty.remainingDigits, 12);
});

test('canProceedFromPrepare only returns true when both documents are checked', () => {
  assert.equal(canProceedFromPrepare(true, true), true);
  assert.equal(canProceedFromPrepare(true, false), false);
  assert.equal(canProceedFromPrepare(false, true), false);
  assert.equal(canProceedFromPrepare(false, false), false);
});

test('validateInvestmentAmount checks positive number >= 100', () => {
  assert.equal(validateInvestmentAmount('100').isValid, true);
  assert.equal(validateInvestmentAmount(500).isValid, true);
  assert.equal(validateInvestmentAmount('1,000').isValid, true);
  assert.equal(validateInvestmentAmount('250').amount, 250);

  assert.equal(validateInvestmentAmount('50').isValid, false);
  assert.equal(validateInvestmentAmount('0').isValid, false);
  assert.equal(validateInvestmentAmount('').isValid, false);
});

test('formatCurrencyINR formats INR amounts nicely', () => {
  assert.equal(formatCurrencyINR(100), '₹100');
  assert.equal(formatCurrencyINR(1000), '₹1,000');
  assert.equal(formatCurrencyINR(25000), '₹25,000');
});
