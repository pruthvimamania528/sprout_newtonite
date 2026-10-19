import React from 'react';
import { Language } from '../../types/index.ts';
import { SproutMascot } from '../CanonicalAssets.tsx';

interface WelcomeScreenProps {
  language: Language;
  isHelpModalOpen: boolean;
  onOpenHelpModal: () => void;
  onCloseHelpModal: () => void;
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  isHelpModalOpen,
  onOpenHelpModal,
  onCloseHelpModal,
  onContinue,
}) => {
  const content = {
    en: {
      headline: 'Your investing journey starts here.',
      subhead:
        'Explore investing at your own pace. Start with ₹100 where available, and understand each step before you invest.',
      pillar1Title: 'Start with just ₹100',
      pillar1Sub: 'Accessible micro-SIPs to build habits',
      pillar2Title: 'No hidden paperwork',
      pillar2Sub: '100% digital, transparent, zero branch visits',
      pillar3Title: 'Regulated & secure process',
      pillar3Sub: 'SEBI-registered & bank-grade encryption',
      ctaText: 'Get started',
      disclosure:
        'All investments involve market risk and possible loss of capital. Review applicable product information and disclosures before investing.',
      helpTitle: 'Need help getting started?',
      helpBody:
        'Our onboarding support guides you step-by-step through setting up your first Indian mutual fund investment.',
      tollFree: 'Toll-free Assistance',
      tollFreeHours: 'Mon-Sat, 9 AM - 7 PM',
      readinessTitle: 'Instant KYC readiness',
      readinessSub: 'Takes under 3 minutes with PAN & Aadhaar',
      gotIt: 'Got it, thanks!',
    },
    hi: {
      headline: 'आपकी निवेश यात्रा यहीं से शुरू होती है।',
      subhead:
        'अपनी गति से निवेश सीखें। ₹100 से शुरुआत करें जहाँ उपलब्ध हो, और निवेश करने से पहले हर कदम को समझें।',
      pillar1Title: 'सिर्फ ₹100 से शुरुआत करें',
      pillar1Sub: 'आदतें बनाने के लिए सुलभ माइक्रो-एसआईपी',
      pillar2Title: 'कोई कागजी कार्रवाई नहीं',
      pillar2Sub: '100% डिजिटल, पारदर्शी, शून्य शाखा यात्राएं',
      pillar3Title: 'विनियमित और सुरक्षित प्रक्रिया',
      pillar3Sub: 'सेबी पंजीकृत एवं बैंक-ग्रेड एन्क्रिप्शन',
      ctaText: 'शुरू करें (Get started)',
      disclosure:
        'सभी निवेश बाज़ार जोखिमों के अधीन हैं। निवेश करने से पहले सभी प्रासंगिक उत्पाद जानकारी और प्रकटीकरण पढ़ें।',
      helpTitle: 'शुरू करने में सहायता चाहिए?',
      helpBody:
        'हमारा ऑनबोर्डिंग सपोर्ट आपको अपना पहला म्यूचुअल फंड निवेश शुरू करने में चरण-दर-चरण मार्गदर्शन करता है।',
      tollFree: 'टोल-फ्री सहायता',
      tollFreeHours: 'सोम-शनि, सुबह 9 से शाम 7 बजे तक',
      readinessTitle: 'त्वरित केवाईसी तैयारी',
      readinessSub: 'पैन और आधार के साथ 3 मिनट से भी कम समय',
      gotIt: 'समझ गया, धन्यवाद!',
    },
  }[language];

  return (
    <div className="flex-1 flex flex-col justify-between w-full pb-6 relative">
      <div className="flex flex-col w-full">
        {/* Mascot in Ambient Glow Container */}
        <div className="relative w-full flex flex-col items-center justify-center pt-3 pb-3">
          <div className="relative flex items-center justify-center">
            {/* Ambient Breathing Rings */}
            <div className="absolute w-28 h-28 rounded-full bg-primary-fixed/25 blur-md animate-pulse" />
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center shadow-sm relative z-10">
              <SproutMascot className="w-[72px] h-[72px]" />
            </div>
            {/* Soft Floor Reflection / Origami Shadow */}
            <div className="absolute -bottom-1.5 w-12 h-2 bg-outline-variant/30 rounded-full blur-[2px]" />
          </div>
        </div>

        {/* Main Copy Section */}
        <section className="text-center px-1 mb-5">
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-2">
            {content.headline}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-[340px] mx-auto">
            {content.subhead}
          </p>
        </section>

        {/* Value Pillars Card */}
        <section className="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container mb-5">
          <ul className="space-y-3.5">
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[19px]">currency_rupee</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {content.pillar1Title}
                </p>
                <p className="font-label-sm text-label-sm text-outline">{content.pillar1Sub}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[19px]">description</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {content.pillar2Title}
                </p>
                <p className="font-label-sm text-label-sm text-outline">{content.pillar2Sub}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">
                <span className="material-symbols-outlined text-[19px]">verified_user</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {content.pillar3Title}
                </p>
                <p className="font-label-sm text-label-sm text-outline">{content.pillar3Sub}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Bottom CTA & Regulatory Footer */}
      <div className="w-full flex flex-col gap-3 pt-2">
        <button
          className="w-full h-14 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.99] transition-all cursor-pointer"
          onClick={onContinue}
          type="button"
        >
          <span>{content.ctaText}</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        <footer className="w-full bg-surface-container-low rounded-xl p-3 text-center border border-surface-container">
          <p className="font-label-sm text-label-sm text-outline leading-relaxed">
            {content.disclosure}
          </p>
        </footer>
      </div>

      {/* Help & Support Bottom Sheet Modal */}
      {isHelpModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-help-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={onCloseHelpModal}
        >
          <div
            className="w-full max-w-md bg-surface-container-lowest rounded-t-2xl p-5 shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-outline-variant rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-title-md text-title-md text-on-surface font-bold" id="welcome-help-title">
                {content.helpTitle}
              </h3>
              <button
                aria-label="Close help modal"
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface"
                onClick={onCloseHelpModal}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              {content.helpBody}
            </p>
            <div className="space-y-2.5 mb-4">
              <a
                className="w-full p-3 rounded-xl bg-surface-container flex items-center gap-3 text-on-surface hover:bg-surface-variant transition-colors"
                href="tel:1800000000"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                <div className="flex-1 text-left">
                  <p className="font-label-md text-label-md font-semibold">{content.tollFree}</p>
                  <p className="font-label-sm text-label-sm text-outline">{content.tollFreeHours}</p>
                </div>
              </a>
              <div className="w-full p-3 rounded-xl bg-surface-container flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                <div className="flex-1 text-left">
                  <p className="font-label-md text-label-md font-semibold">{content.readinessTitle}</p>
                  <p className="font-label-sm text-label-sm text-outline">{content.readinessSub}</p>
                </div>
              </div>
            </div>
            <button
              className="w-full h-12 bg-primary text-on-primary font-label-lg text-label-lg font-semibold rounded-xl flex items-center justify-center hover:bg-primary-container active:scale-[0.99] transition-all"
              onClick={onCloseHelpModal}
              type="button"
            >
              {content.gotIt}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
