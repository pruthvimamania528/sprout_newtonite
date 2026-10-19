import React, { useEffect } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-[0_8px_24px_rgba(23,107,82,0.12),0_2px_6px_rgba(32,41,35,0.04)] p-6 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-outline-variant rounded-full mx-auto -mt-2 mb-1 sm:hidden" />
        <div className="flex items-center justify-between">
          <h2 className="font-title-md text-title-md text-on-surface font-bold" id="support-modal-title">
            Sprout Investor Support
          </h2>
          <button
            aria-label="Close support modal"
            className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Our registered investment advisors are available 9:00 AM - 7:00 PM IST to assist with your onboarding journey.
        </p>
        <div className="flex flex-col gap-2.5 pt-1">
          <a
            className="min-h-[48px] rounded-xl bg-surface-container flex items-center gap-3 px-4 text-primary font-label-lg text-label-lg hover:bg-surface-variant transition-colors"
            href="tel:1800000000"
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
            <span>Toll-Free Helpline: 1800-000-000</span>
          </a>
          <button
            className="min-h-[48px] rounded-xl bg-surface-container flex items-center gap-3 px-4 text-primary font-label-lg text-label-lg hover:bg-surface-variant transition-colors text-left"
            onClick={() => {
              alert('Connecting you with a Sprout counselor on WhatsApp...');
              onClose();
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>WhatsApp Assistance</span>
          </button>
          <button
            className="min-h-[48px] rounded-xl bg-primary text-on-primary font-label-lg text-label-lg mt-1 hover:bg-primary-container active:scale-[0.99] transition-all"
            onClick={onClose}
            type="button"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
