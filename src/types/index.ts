export type ScreenId = 'welcome' | 'prepare' | 'details' | 'verification' | 'complete';

export type Language = 'en' | 'hi';

export type VerificationStatusType = 'in_progress' | 'delayed' | 'failure' | 'success';

export interface OnboardingState {
  currentScreen: ScreenId;
  language: Language;
  panChecked: boolean;
  aadhaarChecked: boolean;
  panNumber: string;
  aadhaarNumber: string;
  verificationStatus: VerificationStatusType;
  isCheckingStatus: boolean;
  selectedAmount: number | null;
  customAmount: string;
  isSupportModalOpen: boolean;
  isHelpModalOpen: boolean;
  isNotReadySheetOpen: boolean;
  isPrivacySheetOpen: boolean;
  isReviewDrawerOpen: boolean;
}

export const CANONICAL_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1UE1yS2BNnxX7nQ5BWpxrr6bVsl-B5dfVb2pn2jpSWgkW8JobgOhNX-fPDSDbvpyQN0CE8G10lOCR1qyk6QbeLCczOcwySP4XXn1OyXfDqodIzqw00FHoqH49tan513GeFJRkj6QZQDVWKFn6iR-RoZp0rkMOjMnLsg299YF0qSyt9CdzQANzcA5Bl_R77Uf7jjzo2deRn6MeA_bYMtaZuk5uMr0O5ALEc22TIsai4Qx-FYdVqgEHdPTxhV';

export const CANONICAL_MASCOT_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VLjP3BjKUvASpk_fT9eVOYc0Oj2WVC5QJ1uXWdLj6Ts1GcgOaz4CijK60BaJY_ZEgbSraiR_P_kCG5Kf7jBUj2SQU8O3FGOrLn_uuy2w_zS4n7qwgdQ-067cBCiAkqJn7jTdsaIDQBYpZMmc2900RPyPe7PdfrSAJqwaSJmWhydzsjJjJe__ySLtqjmln1bStqXlp8_C_jPiQEvvzOJkOLRvFFJ7GWUi5VDndBmwCukNoq-eHMzSentuk';
