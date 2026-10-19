import React from 'react';
import { ScreenId, Language } from '../types/index.ts';
import { SproutLogo } from './CanonicalAssets.tsx';

interface HeaderProps {
  currentScreen: ScreenId;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBack: () => void;
  onOpenHelp: () => void;
  onOpenSupport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  language,
  onLanguageChange,
  onBack,
  onOpenHelp,
  onOpenSupport,
}) => {
  const stepMap: Record<ScreenId, { step: number; title: string }> = {
    welcome: { step: 1, title: 'Welcome' },
    prepare: { step: 2, title: 'Prepare' },
    details: { step: 3, title: 'Details' },
    verification: { step: 4, title: 'Verify' },
    complete: { step: 5, title: 'Complete' },
  };

  const currentStep = stepMap[currentScreen].step;

  if (currentScreen === 'welcome') {
    return (
      <header className="w-full pt-safe bg-surface/95 backdrop-blur-md z-40 border-b border-surface-container/60">
        <div className="h-14 px-margin flex items-center justify-between">
          <div className="flex items-center">
            <SproutLogo className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            {/* Language Pill Selector */}
            <div
              aria-label="Language selection"
              className="flex items-center bg-surface-container p-0.5 rounded-full"
              role="radiogroup"
            >
              <button
                aria-checked={language === 'en'}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                    : 'text-outline hover:text-on-surface'
                }`}
                onClick={() => onLanguageChange('en')}
                role="radio"
                type="button"
              >
                English
              </button>
              <button
                aria-checked={language === 'hi'}
                className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all duration-200 ${
                  language === 'hi'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                    : 'text-outline hover:text-on-surface'
                }`}
                onClick={() => onLanguageChange('hi')}
                role="radio"
                type="button"
              >
                Hindi
              </button>
            </div>
            {/* Help Trigger Button */}
            <button
              aria-label="Need assistance"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-primary active:scale-95 transition-transform"
              onClick={onOpenHelp}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>
          </div>
        </div>
        {/* Step Indicator */}
        <div className="px-margin pb-2 pt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">
              Step 1 of 5
            </span>
            <span className="font-label-sm text-label-sm text-outline">Welcome</span>
          </div>
          <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden flex">
            <div
              className="h-full bg-primary-container rounded-full transition-all duration-500 ease-out"
              style={{ width: '20%' }}
            />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full pt-safe bg-surface/95 backdrop-blur-md z-40 border-b border-surface-container/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-margin flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            aria-label="Go back to previous screen"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors"
            onClick={onBack}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex items-center pl-1">
            <SproutLogo className="h-7 w-auto" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="min-h-[36px] px-2.5 flex items-center justify-center text-primary font-label-md text-label-md hover:text-primary-container hover:bg-surface-container rounded-lg transition-colors"
            onClick={onOpenSupport}
            type="button"
          >
            Need help?
          </button>
          <div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-on-primary"
            title="Sprout Investor Profile"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
      {/* 5-Step Segmented Navigation Indicator */}
      <nav aria-label="Onboarding progress" className="px-margin pb-2.5 pt-0.5">
        <div className="flex items-center justify-between gap-1.5">
          {[1, 2, 3, 4, 5].map((stepNum) => {
            const isCompleted = stepNum <= currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <div key={stepNum} className="flex-1 flex flex-col gap-1">
                <div
                  className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
                    isCompleted
                      ? isCurrent
                        ? 'bg-primary'
                        : 'bg-primary-container'
                      : 'bg-surface-variant'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
