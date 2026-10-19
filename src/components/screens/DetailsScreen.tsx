import React, { useState } from 'react';
import {
  sanitizePAN,
  validatePAN,
  formatAadhaar,
  validateAadhaar,
} from '../../utils/validation.ts';

interface DetailsScreenProps {
  panNumber: string;
  aadhaarNumber: string;
  isPrivacySheetOpen: boolean;
  onPanChange: (val: string) => void;
  onAadhaarChange: (val: string) => void;
  onOpenPrivacySheet: () => void;
  onClosePrivacySheet: () => void;
  onSubmit: () => void;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  panNumber,
  aadhaarNumber,
  isPrivacySheetOpen,
  onPanChange,
  onAadhaarChange,
  onOpenPrivacySheet,
  onClosePrivacySheet,
  onSubmit,
}) => {
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const panValidation = validatePAN(panNumber);
  const aadhaarValidation = validateAadhaar(aadhaarNumber);

  const handlePanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePAN(e.target.value);
    onPanChange(sanitized);
  };

  const handleAadhaarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    onAadhaarChange(formatted);
  };

  const clearPan = () => {
    onPanChange('');
  };

  const clearAadhaar = () => {
    onAadhaarChange('');
  };

  const fillValidSample = () => {
    onPanChange('ABCDE1234F');
    onAadhaarChange('5482 9104 3821');
  };

  const fillInvalidSample = () => {
    onPanChange('ABC1234567');
    onAadhaarChange('5482 9104 3821');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!panValidation.isValid || !aadhaarValidation.isValid) {
      return;
    }

    onSubmit();
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full pb-6 relative">
      <div className="flex flex-col w-full">
        {/* Step Badge */}
        <div className="flex flex-col gap-1 pb-3 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container w-fit border border-surface-container">
            <span className="material-symbols-outlined text-[16px] text-primary">badge</span>
            <span className="font-label-md text-label-md text-primary font-semibold tracking-wide uppercase">
              Step 3 of 5 • Details
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-1 font-bold">
            Let’s verify your identity.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Enter the details requested for KYC. Check your information before continuing.
          </p>
        </div>

        {/* Regulatory Mandate Card */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container shadow-sm flex items-center gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold">
              SEBI &amp; RBI Mandate
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Regulated bank-grade 256-bit instant identity verification
            </span>
          </div>
        </div>

        {/* KYC Form */}
        <form className="flex flex-col gap-4" id="kyc-form" onSubmit={handleSubmit}>
          {/* PAN Input Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="pan-input">
                PAN number
              </label>
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider font-mono">
                ABCDE1234F
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                autoCapitalize="characters"
                autoComplete="off"
                className={`w-full h-14 px-4 pr-12 rounded-xl bg-surface-container-lowest text-on-surface font-body-lg text-body-lg placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container uppercase transition-all border ${
                  hasAttemptedSubmit && !panValidation.isValid
                    ? 'border-error ring-1 ring-error'
                    : 'border-surface-container focus:border-primary'
                }`}
                id="pan-input"
                maxLength={10}
                onChange={handlePanInput}
                placeholder="Enter your 10-character PAN"
                spellCheck="false"
                type="text"
                value={panNumber}
              />
              {panNumber.length > 0 && (
                <button
                  aria-label="Clear PAN input"
                  className="absolute right-3 w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                  onClick={clearPan}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>

            {/* PAN Validation Feedback */}
            {panNumber.length > 0 && (
              <div
                className={`flex items-center gap-1.5 pt-0.5 ${
                  panValidation.isValid
                    ? 'text-primary'
                    : panValidation.isComplete
                    ? 'text-error'
                    : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {panValidation.isValid ? 'check_circle' : panValidation.isComplete ? 'error' : 'info'}
                </span>
                <span className="font-label-sm text-label-sm">{panValidation.message}</span>
              </div>
            )}
            {hasAttemptedSubmit && !panNumber && (
              <div className="flex items-center gap-1.5 pt-0.5 text-error">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span className="font-label-sm text-label-sm">Please enter your 10-character PAN.</span>
              </div>
            )}
          </div>

          {/* Aadhaar Input Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="aadhaar-input">
                Aadhaar number
              </label>
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">
                12 Digits
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                autoComplete="off"
                className={`w-full h-14 px-4 pr-12 rounded-xl bg-surface-container-lowest text-on-surface font-body-lg text-body-lg placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container tracking-wider transition-all border ${
                  hasAttemptedSubmit && !aadhaarValidation.isValid
                    ? 'border-error ring-1 ring-error'
                    : 'border-surface-container focus:border-primary'
                }`}
                id="aadhaar-input"
                inputMode="numeric"
                maxLength={14}
                onChange={handleAadhaarInput}
                placeholder="Enter your 12-digit Aadhaar number"
                type="text"
                value={aadhaarNumber}
              />
              {aadhaarNumber.length > 0 && (
                <button
                  aria-label="Clear Aadhaar input"
                  className="absolute right-3 w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                  onClick={clearAadhaar}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>

            {/* Aadhaar Validation Feedback */}
            {aadhaarNumber.length > 0 && (
              <div
                className={`flex items-center gap-1.5 pt-0.5 ${
                  aadhaarValidation.isValid ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {aadhaarValidation.isValid ? 'check_circle' : 'info'}
                </span>
                <span className="font-label-sm text-label-sm">{aadhaarValidation.message}</span>
              </div>
            )}
            {hasAttemptedSubmit && !aadhaarNumber && (
              <div className="flex items-center gap-1.5 pt-0.5 text-error">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span className="font-label-sm text-label-sm">Please provide complete 12-digit Aadhaar.</span>
              </div>
            )}
          </div>

          {/* Privacy Policy Link Box */}
          <div className="p-4 rounded-xl bg-surface-container flex items-start gap-3 border border-surface-container">
            <span className="material-symbols-outlined text-outline text-[20px] mt-0.5 flex-shrink-0">
              lock
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We use these details to verify your identity for KYC. See our{' '}
              <button
                className="text-primary font-label-lg text-label-lg font-semibold underline underline-offset-2 hover:text-primary-container cursor-pointer"
                onClick={onOpenPrivacySheet}
                type="button"
              >
                Privacy Policy
              </button>{' '}
              to learn how your information is handled.
            </p>
          </div>

          {/* Prototype Helper Box */}
          <div className="p-3 rounded-xl bg-surface-container-high flex items-center justify-between gap-3 border border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">science</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                Prototype helper
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold shadow-sm hover:bg-surface-variant transition-colors cursor-pointer"
                onClick={fillValidSample}
                type="button"
              >
                Valid Data
              </button>
              <button
                className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-error font-label-sm text-label-sm font-semibold shadow-sm hover:bg-error-container transition-colors cursor-pointer"
                onClick={fillInvalidSample}
                type="button"
              >
                Invalid PAN
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              className="w-full h-14 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="submit-cta"
              type="submit"
            >
              <span>Submit for verification</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-center">
              <span className="material-symbols-outlined text-outline text-[16px]">schedule</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Instant validation • takes under 15 seconds
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* Privacy Policy Bottom Sheet */}
      {isPrivacySheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={onClosePrivacySheet}
        >
          <div
            className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-outline-variant rounded-full mx-auto -mt-2 mb-1" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">security</span>
                <h3 className="font-title-md text-title-md text-on-surface font-bold" id="privacy-title">
                  Privacy &amp; Security Principles
                </h3>
              </div>
              <button
                aria-label="Close privacy policy"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
                onClick={onClosePrivacySheet}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-xl bg-surface-container flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">
                  lock
                </span>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                    End-to-End Encryption
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Your PAN and Aadhaar are salted, encrypted using AES-256 at rest and in transit, and strictly transmitted over secure TLS 1.3 tunnels.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">
                  gavel
                </span>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Regulatory Compliance
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Sprout retains records purely for statutory compliance mandated by SEBI/KRA guidelines and UIDAI masking directives.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">
                  visibility_off
                </span>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Zero Data Monetization
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    We will never sell or rent your personal documents or financial records to third parties or telemarketers.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold mt-2 hover:bg-primary-container active:scale-[0.99] transition-all cursor-pointer"
              onClick={onClosePrivacySheet}
              type="button"
            >
              I understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
