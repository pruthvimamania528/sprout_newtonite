import React from 'react';

interface PrepareScreenProps {
  panChecked: boolean;
  aadhaarChecked: boolean;
  isNotReadySheetOpen: boolean;
  onTogglePan: () => void;
  onToggleAadhaar: () => void;
  onContinue: () => void;
  onOpenNotReadySheet: () => void;
  onCloseNotReadySheet: () => void;
  onContinueAnyway: () => void;
}

export const PrepareScreen: React.FC<PrepareScreenProps> = ({
  panChecked,
  aadhaarChecked,
  isNotReadySheetOpen,
  onTogglePan,
  onToggleAadhaar,
  onContinue,
  onOpenNotReadySheet,
  onCloseNotReadySheet,
  onContinueAnyway,
}) => {
  const isAllChecked = panChecked && aadhaarChecked;

  const handleContinueClick = () => {
    if (isAllChecked) {
      onContinue();
    } else {
      onOpenNotReadySheet();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full pb-6 relative">
      <div className="flex flex-col w-full">
        {/* Step Badge & Origami Accent */}
        <div className="flex items-center justify-between mb-4 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary border border-surface-container">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span className="font-label-sm text-label-sm font-semibold">
              Step 2 of 5 • Verification Prep
            </span>
          </div>
          <div className="w-7 h-7 relative flex items-center justify-center">
            <svg className="w-7 h-7 drop-shadow-sm" fill="none" viewBox="0 0 40 40">
              <path d="M20 6C16 11 15 15 20 15C25 15 24 11 20 6Z" fill="#CEEC64" />
              <path d="M12 18L20 9L20 27L12 18Z" fill="#176B52" />
              <path d="M28 18L20 9L20 27L28 18Z" fill="#00513C" />
              <path d="M20 27L15 21L20 33L20 27Z" fill="#536600" />
              <path d="M20 27L25 21L20 33L20 27Z" fill="#CEEC64" />
            </svg>
          </div>
        </div>

        {/* Heading & Subhead */}
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
            Let’s get your documents ready.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Keep your documents handy before you begin verification. It helps you complete the process with fewer interruptions.
          </p>
        </div>

        {/* Interactive Document Checklist */}
        <div aria-label="Required KYC documents checklist" className="flex flex-col gap-3.5 mb-6" role="group">
          {/* Row 1: PAN Card */}
          <div
            aria-checked={panChecked}
            aria-describedby="pan-subtext"
            aria-labelledby="pan-label"
            className="group min-h-[72px] p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between gap-3.5 cursor-pointer select-none transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            id="pan-card-row"
            onClick={onTogglePan}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onTogglePan();
              }
            }}
            role="checkbox"
            tabIndex={0}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0 text-primary transition-colors group-hover:bg-surface-variant">
                <span className="material-symbols-outlined text-[22px]">badge</span>
              </div>
              <div className="flex flex-col min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold" id="pan-label">
                    PAN Card
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                    Essential
                  </span>
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant truncate" id="pan-subtext">
                  Keep your PAN details ready.
                </span>
              </div>
            </div>
            {/* Custom Checkbox Indicator */}
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-sm ${
                panChecked
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] font-bold">check</span>
            </div>
          </div>

          {/* Row 2: Aadhaar Card */}
          <div
            aria-checked={aadhaarChecked}
            aria-describedby="aadhaar-subtext"
            aria-labelledby="aadhaar-label"
            className="group min-h-[72px] p-4 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between gap-3.5 cursor-pointer select-none transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            id="aadhaar-card-row"
            onClick={onToggleAadhaar}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onToggleAadhaar();
              }
            }}
            role="checkbox"
            tabIndex={0}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0 text-primary transition-colors group-hover:bg-surface-variant">
                <span className="material-symbols-outlined text-[22px]">fingerprint</span>
              </div>
              <div className="flex flex-col min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold" id="aadhaar-label">
                    Aadhaar Card
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    Digital OTP
                  </span>
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant leading-snug" id="aadhaar-subtext">
                  Keep your Aadhaar details ready if required for your verification.
                </span>
              </div>
            </div>
            {/* Custom Checkbox Indicator */}
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-sm ${
                aadhaarChecked
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] font-bold">check</span>
            </div>
          </div>
        </div>

        {/* Reassuring Information Callout Box */}
        <div className="rounded-2xl bg-surface-container-low p-4 mb-6 flex items-start gap-3 border border-surface-container">
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-[18px]">phonelink_lock</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-label-lg text-label-lg text-primary font-semibold">
              Mobile number link check
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
              Make sure your Aadhaar is linked to a mobile number you can access to receive the OTP, if required for your verification.
            </p>
          </div>
        </div>

        {/* Reassurance Micro-banner */}
        <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant mb-6 shadow-sm border border-surface-container">
          <span className="material-symbols-outlined text-primary text-[18px]">encrypted</span>
          <span className="font-label-sm text-label-sm">
            256-Bit Bank-grade encryption • SEBI &amp; UIDAI compliant
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          className="w-full h-14 rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-200 active:scale-[0.99] bg-primary text-on-primary hover:bg-primary-container cursor-pointer"
          id="btn-continue"
          onClick={handleContinueClick}
          type="button"
        >
          <span>Continue</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        <button
          className="min-h-[44px] w-full flex items-center justify-center text-on-surface-variant hover:text-primary font-label-lg text-label-lg transition-colors cursor-pointer"
          onClick={onOpenNotReadySheet}
          type="button"
        >
          I’m not ready yet
        </button>
      </div>

      {/* Confirmation Bottom Sheet Overlay ("Take your time") */}
      {isNotReadySheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={onCloseNotReadySheet}
        >
          <div
            className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-surface-variant rounded-full mx-auto -mt-2 mb-1 sm:hidden" />
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[28px]">pending_actions</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-title-md text-title-md text-on-surface font-bold" id="sheet-title">
                Take your time
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                You can continue, but keep your PAN and Aadhaar ready. You may need them to complete verification.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-[0.99] cursor-pointer"
                onClick={onContinueAnyway}
                type="button"
              >
                <span>Continue anyway</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                className="w-full h-12 rounded-xl bg-surface-container text-primary font-label-lg text-label-lg font-semibold hover:bg-surface-variant transition-colors cursor-pointer"
                onClick={onCloseNotReadySheet}
                type="button"
              >
                Review checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
