import React, { useState } from 'react';
import {
  ScreenId,
  Language,
  VerificationStatusType,
} from './types/index.ts';
import { Header } from './components/Header.tsx';
import { SupportModal } from './components/SupportModal.tsx';
import { WelcomeScreen } from './components/screens/WelcomeScreen.tsx';
import { PrepareScreen } from './components/screens/PrepareScreen.tsx';
import { DetailsScreen } from './components/screens/DetailsScreen.tsx';
import { VerificationScreen } from './components/screens/VerificationScreen.tsx';
import { SuccessScreen } from './components/screens/SuccessScreen.tsx';

export default function App() {
  // Navigation & Screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [language, setLanguage] = useState<Language>('en');

  // Prepare screen state (preserved across navigation)
  const [panChecked, setPanChecked] = useState(true);
  const [aadhaarChecked, setAadhaarChecked] = useState(false);
  const [isNotReadySheetOpen, setIsNotReadySheetOpen] = useState(false);

  // Details screen state (preserved across navigation)
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isPrivacySheetOpen, setIsPrivacySheetOpen] = useState(false);

  // Verification screen state
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatusType>('in_progress');

  // Success screen state
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false);

  // Modals & Panels
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Reset scroll container position on screen change
  React.useEffect(() => {
    const el = document.getElementById('main-scroll-container');
    if (el) {
      el.scrollTop = 0;
    }
  }, [currentScreen]);

  // Navigation Handlers
  const handleBack = () => {
    switch (currentScreen) {
      case 'prepare':
        setCurrentScreen('welcome');
        break;
      case 'details':
        setCurrentScreen('prepare');
        break;
      case 'verification':
        setCurrentScreen('details');
        break;
      case 'complete':
        setCurrentScreen('verification');
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#e8eee9] flex items-center justify-center p-0 sm:p-3 select-none overflow-hidden">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-[430px] h-full sm:h-[884px] bg-surface flex flex-col relative sm:rounded-[36px] shadow-2xl overflow-hidden border sm:border-surface-variant">
        {/* Mobile Device Status Bar */}
        <div className="h-8 w-full bg-surface/90 flex items-center justify-between px-6 pt-2 shrink-0 z-50 text-on-surface">
          <span className="font-label-sm text-[12px] font-semibold tracking-tight">9:41</span>
          <div className="w-20 h-4 bg-on-surface/10 rounded-full mx-auto hidden sm:block" />
          <div className="flex items-center gap-1.5 text-on-surface">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_full</span>
          </div>
        </div>

        {/* Global Header */}
        <Header
          currentScreen={currentScreen}
          language={language}
          onBack={handleBack}
          onLanguageChange={setLanguage}
          onOpenHelp={() => setIsHelpModalOpen(true)}
          onOpenSupport={() => setIsSupportModalOpen(true)}
        />

        {/* Natural Scrollable Screen Container */}
        <main
          className="flex-1 w-full px-margin overflow-y-auto overscroll-contain flex flex-col pt-2 pb-8"
          id="main-scroll-container"
        >
          {currentScreen === 'welcome' && (
            <WelcomeScreen
              isHelpModalOpen={isHelpModalOpen}
              language={language}
              onCloseHelpModal={() => setIsHelpModalOpen(false)}
              onContinue={() => setCurrentScreen('prepare')}
              onOpenHelpModal={() => setIsHelpModalOpen(true)}
            />
          )}

          {currentScreen === 'prepare' && (
            <PrepareScreen
              aadhaarChecked={aadhaarChecked}
              isNotReadySheetOpen={isNotReadySheetOpen}
              onCloseNotReadySheet={() => setIsNotReadySheetOpen(false)}
              onContinue={() => setCurrentScreen('details')}
              onContinueAnyway={() => {
                setIsNotReadySheetOpen(false);
                setCurrentScreen('details');
              }}
              onOpenNotReadySheet={() => setIsNotReadySheetOpen(true)}
              onToggleAadhaar={() => setAadhaarChecked((prev) => !prev)}
              onTogglePan={() => setPanChecked((prev) => !prev)}
              panChecked={panChecked}
            />
          )}

          {currentScreen === 'details' && (
            <DetailsScreen
              aadhaarNumber={aadhaarNumber}
              isPrivacySheetOpen={isPrivacySheetOpen}
              onAadhaarChange={setAadhaarNumber}
              onClosePrivacySheet={() => setIsPrivacySheetOpen(false)}
              onOpenPrivacySheet={() => setIsPrivacySheetOpen(true)}
              onPanChange={setPanNumber}
              onSubmit={() => {
                setVerificationStatus('in_progress');
                setCurrentScreen('verification');
              }}
              panNumber={panNumber}
            />
          )}

          {currentScreen === 'verification' && (
            <VerificationScreen
              onOpenSupport={() => setIsSupportModalOpen(true)}
              onProceedToSuccess={() => setCurrentScreen('complete')}
              onReturnToDetails={() => setCurrentScreen('details')}
              onStatusChange={setVerificationStatus}
              status={verificationStatus}
            />
          )}

          {currentScreen === 'complete' && (
            <SuccessScreen
              customAmount={customAmount}
              isReviewDrawerOpen={isReviewDrawerOpen}
              onCloseReviewDrawer={() => setIsReviewDrawerOpen(false)}
              onCustomAmountChange={setCustomAmount}
              onOpenReviewDrawer={() => setIsReviewDrawerOpen(true)}
              onSelectPreset={(amt) => setSelectedAmount(amt)}
              selectedAmount={selectedAmount}
            />
          )}
        </main>

        {/* Mobile Device Home Bar indicator */}
        <div className="h-5 w-full bg-surface flex items-center justify-center pb-1 shrink-0">
          <div className="w-32 h-1 bg-on-surface/20 rounded-full" />
        </div>

        {/* Support Modal shared across entire app */}
        <SupportModal
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
        />
      </div>
    </div>
  );
}
