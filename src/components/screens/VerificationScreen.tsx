import React, { useState } from 'react';
import { VerificationStatusType } from '../../types/index.ts';

interface VerificationScreenProps {
  status: VerificationStatusType;
  onStatusChange: (status: VerificationStatusType) => void;
  onProceedToSuccess: () => void;
  onReturnToDetails: () => void;
  onOpenSupport: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({
  status,
  onStatusChange,
  onProceedToSuccess,
  onReturnToDetails,
  onOpenSupport,
}) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckStatus = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      onStatusChange('success');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full pb-6 relative">
      <div className="flex flex-col items-center justify-center text-center px-1 pt-2">
        {/* Central Origami Sprout Animated Visual */}
        <div className="relative w-44 h-44 flex items-center justify-center my-4">
          {/* Ambient Gentle Rings */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-700 ${
              status === 'success'
                ? 'bg-secondary-fixed/30 animate-pulse'
                : status === 'failure'
                ? 'bg-error-container/40'
                : 'bg-secondary-fixed/20 animate-ping opacity-30'
            }`}
            style={{ animationDuration: '3s' }}
          />
          <div
            className="absolute w-36 h-36 rounded-full bg-surface-container-high animate-pulse"
            style={{ animationDuration: '2.2s' }}
          />
          <div className="absolute w-28 h-28 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center" />

          {/* Rotating Geometric Seed Frame */}
          <div className="relative z-10 w-24 h-24 flex items-center justify-center">
            <div
              className={`w-20 h-20 transition-transform duration-700 ${
                status === 'success'
                  ? 'scale-110'
                  : 'animate-[spin_16s_linear_infinite]'
              }`}
            >
              <svg
                aria-label="Sprout Seed Geometry"
                className="w-full h-full drop-shadow-sm"
                fill="none"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon fill="#bec9c2" opacity="0.6" points="50,82 62,88 50,94 38,88" />
                <polygon fill="#00513c" points="50,78 26,42 50,24 50,78" />
                <polygon fill="#176b52" points="50,78 74,42 50,24 50,78" />
                <path d="M50,24 C45,10 32,8 34,22 Z" fill="#00513c" />
                <path d="M50,24 C55,10 68,8 66,22 Z" fill="#d1ef67" />
                <polygon fill="#ceec64" points="50,62 32,44 50,32" />
              </svg>
            </div>
          </div>
        </div>

        {/* Live Step Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md mb-2 border border-surface-container">
          <span
            className={`w-2 h-2 rounded-full ${
              status === 'success'
                ? 'bg-secondary'
                : status === 'failure'
                ? 'bg-error'
                : 'bg-primary animate-pulse'
            }`}
          />
          <span className="font-semibold">
            {status === 'success'
              ? 'Step 4 of 5 · Verification confirmed'
              : status === 'failure'
              ? 'Step 4 of 5 · Verification issue'
              : status === 'delayed'
              ? 'Step 4 of 5 · Verification delayed'
              : 'Step 4 of 5 · Verification in progress'}
          </span>
        </div>

        {/* Exact Required Headings */}
        <h2 className="font-headline-md text-headline-md text-on-surface text-center tracking-tight max-w-[340px] font-bold">
          {status === 'success'
            ? 'Your verification is complete.'
            : status === 'failure'
            ? 'We encountered an issue with your details.'
            : 'Verifying your details. Please keep the app open.'}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-[320px] mt-1.5 leading-relaxed">
          {status === 'success'
            ? 'All documents verified with regulatory clearing houses. Ready to explore investments.'
            : status === 'failure'
            ? 'The official regulatory clearinghouse requested re-verification. You can edit your details and retry.'
            : 'This may take a little time. We’ll update you when verification is complete.'}
        </p>

        {/* Information Security Card */}
        <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-4 mt-5 flex items-start gap-3.5 text-left">
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body-md text-body-md text-on-surface leading-snug font-medium">
              Your information is being processed. You can check your verification status here.
            </p>
            <span className="font-label-sm text-label-sm text-outline mt-1 block">
              SEBI Registered · 256-Bit Bank Grade Encryption
            </span>
          </div>
        </div>

        {/* Delayed Notice (Shown in delayed state or initial default) */}
        {(status === 'delayed' || status === 'in_progress') && (
          <div
            className="w-full bg-surface-container-high rounded-2xl p-4 mt-3 text-left transition-all border border-surface-container"
            id="delayed-state-card"
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">
                hourglass_top
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                  This is taking longer than expected
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                  Your verification may still be processing with the official regulatory repository.
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button
                    className="font-label-lg text-label-lg text-primary hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    disabled={isChecking}
                    onClick={handleCheckStatus}
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isChecking ? 'animate-spin' : ''
                      }`}
                    >
                      sync
                    </span>
                    <span>{isChecking ? 'Checking...' : 'Check status'}</span>
                  </button>
                  <button
                    className="font-label-lg text-label-lg text-outline hover:text-on-surface cursor-pointer"
                    onClick={onOpenSupport}
                    type="button"
                  >
                    Get help
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Failure / Retry Card */}
        {status === 'failure' && (
          <div
            className="w-full bg-error-container text-on-error-container rounded-2xl p-4 mt-3 text-left transition-all border border-error/20"
            id="retry-error-card"
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[22px] flex-shrink-0 mt-0.5">
                error_outline
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-label-lg text-label-lg text-on-error-container font-bold">
                  Verification Couldn’t Complete
                </p>
                <p className="font-body-md text-body-md text-on-error-container opacity-90 mt-0.5 leading-relaxed">
                  The national database could not match your document photo clearly. Please re-check your submitted details.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    className="h-10 px-4 rounded-xl bg-error text-on-error font-label-lg text-label-lg font-semibold flex items-center justify-center hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                    onClick={onReturnToDetails}
                    type="button"
                  >
                    Try again
                  </button>
                  <button
                    className="h-10 px-3 text-on-error-container font-label-lg text-label-lg hover:underline cursor-pointer"
                    onClick={() => onStatusChange('in_progress')}
                    type="button"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Banner */}
        {status === 'success' && (
          <div
            className="w-full bg-surface-container-lowest rounded-2xl p-4 mt-3 shadow-md border border-primary/20 text-left animate-in fade-in slide-in-from-bottom duration-300"
            id="success-banner"
          >
            <div className="flex items-center gap-2 text-primary mb-1">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
              <span className="font-title-md text-title-md font-bold text-primary">
                Identity Verified!
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              KYC successfully verified with KRA repository. Proceeding to set up your investment portfolio...
            </p>
            <button
              className="w-full mt-4 h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-primary-container active:scale-[0.99] transition-all cursor-pointer"
              onClick={onProceedToSuccess}
              type="button"
            >
              <span>Continue to Completion</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}

        {/* Interactive Prototype Testing Panel (Required for Sandbox Testing) */}
        <div className="w-full mt-5 bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2.5 border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">
              Prototype Sandbox
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              Flow Simulation
            </span>
          </div>

          <button
            className="w-full min-h-[48px] rounded-xl bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            id="btn-success-sim"
            onClick={() => onStatusChange('success')}
            type="button"
          >
            <span>Simulate Verification Success</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              className="min-h-[44px] rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md font-semibold hover:bg-surface-variant transition-colors flex items-center justify-center gap-1 cursor-pointer"
              onClick={() => onStatusChange('delayed')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">timer</span>
              <span>Simulate Delay</span>
            </button>
            <button
              className="min-h-[44px] rounded-xl bg-surface-container text-error font-label-md text-label-md font-semibold hover:bg-surface-variant transition-colors flex items-center justify-center gap-1 cursor-pointer"
              onClick={() => onStatusChange('failure')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span>Simulate Retry</span>
            </button>
          </div>
        </div>

        {/* Peaceful Guarantee Footnote */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-outline">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          <span className="font-label-md text-label-md">
            Sprout protects your data with AES-256 standard
          </span>
        </div>
      </div>
    </div>
  );
};
