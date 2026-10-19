import React, { useState } from 'react';
import { SproutMascot } from '../CanonicalAssets.tsx';
import { formatCurrencyINR } from '../../utils/validation.ts';

interface SuccessScreenProps {
  selectedAmount: number | null;
  customAmount: string;
  isReviewDrawerOpen: boolean;
  onSelectPreset: (amount: number) => void;
  onCustomAmountChange: (val: string) => void;
  onOpenReviewDrawer: () => void;
  onCloseReviewDrawer: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  selectedAmount,
  customAmount,
  isReviewDrawerOpen,
  onSelectPreset,
  onCustomAmountChange,
  onOpenReviewDrawer,
  onCloseReviewDrawer,
}) => {
  const [activePreset, setActivePreset] = useState<number | null>(selectedAmount ?? 100);

  const presets = [100, 500, 1000];

  const handlePresetClick = (val: number) => {
    setActivePreset(val);
    onCustomAmountChange('');
    onSelectPreset(val);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setActivePreset(null);
    onCustomAmountChange(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num > 0) {
      onSelectPreset(num);
    } else {
      onSelectPreset(0);
    }
  };

  const currentAmount = activePreset ?? (parseInt(customAmount, 10) || null);
  const isValidAmount = Boolean(currentAmount && currentAmount > 0);

  return (
    <div className="flex-1 flex flex-col justify-between w-full pb-8 relative">
      <div className="flex flex-col w-full">
        {/* Celebration Visual: Mascot with VERIFIED Badge */}
        <div className="flex flex-col items-center text-center pt-2 pb-5">
          <div className="relative w-32 h-32 flex items-center justify-center mb-3">
            <div className="absolute inset-0 rounded-full bg-secondary-fixed/25 scale-95 animate-pulse opacity-70" />
            <div className="relative z-10 w-24 h-24 rounded-full bg-surface-container flex items-center justify-center shadow-sm">
              <SproutMascot className="w-20 h-20" />
            </div>
            {/* Verified Badge */}
            <div className="absolute -bottom-1 -right-1 z-20 flex items-center gap-1 bg-primary text-on-primary px-2.5 py-1 rounded-full shadow-md">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span className="font-label-sm text-label-sm font-bold tracking-wide">VERIFIED</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary mb-2 border border-surface-container">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span className="font-label-md text-label-md font-semibold">
              Step 5 of 5 • Complete
            </span>
          </div>

          <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold leading-snug">
            Your identity is verified.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">
            Explore available investments and choose an amount that works for you. Start with ₹100 where supported.
          </p>
        </div>

        {/* Investment Amount Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container flex flex-col gap-4 mb-5">
          <div className="flex flex-col gap-1">
            <h3 className="font-title-md text-title-md text-on-surface font-semibold">
              Choose an amount to explore
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
              Select a starting amount to see how micro-investing works. No real transaction occurs.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-2.5" id="amount-presets">
            {presets.map((preset) => {
              const isSelected = activePreset === preset;
              return (
                <button
                  key={preset}
                  className={`min-h-[48px] rounded-xl font-label-lg text-label-lg transition-all flex items-center justify-center select-none cursor-pointer border ${
                    isSelected
                      ? 'bg-surface-container-high text-primary font-bold border-primary shadow-sm ring-2 ring-primary/20'
                      : 'bg-surface-container text-on-surface border-transparent hover:bg-surface-container-high'
                  }`}
                  data-val={preset}
                  onClick={() => handlePresetClick(preset)}
                  type="button"
                >
                  ₹{preset.toLocaleString('en-IN')}
                </button>
              );
            })}
          </div>

          {/* Custom Amount Input */}
          <div className="relative flex flex-col gap-1.5 pt-1">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="custom-amount-input">
              Or enter custom amount
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-on-surface font-label-lg text-label-lg font-semibold">
                ₹
              </span>
              <input
                className="w-full h-14 pl-8 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-lg text-body-lg placeholder:text-outline border border-surface-container focus:outline-none focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                id="custom-amount-input"
                inputMode="numeric"
                onChange={handleCustomChange}
                placeholder="e.g. 250"
                type="text"
                value={customAmount}
              />
            </div>
          </div>

          {/* Simulation Mode Notice */}
          <div className="rounded-xl bg-surface-container-low p-3 flex items-start gap-2.5 border border-surface-container">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
            <p className="font-label-md text-label-md text-on-surface-variant leading-snug">
              Simulation mode active. You can adjust or cancel recurring allocations anytime with no penalties.
            </p>
          </div>
        </div>

        {/* Risk Disclosure Box */}
        <div className="rounded-2xl bg-surface-container p-4 mb-5 flex items-start gap-3 border border-surface-container">
          <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
            shield
          </span>
          <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
            All investments involve market risk and possible loss of capital. Review applicable product information and disclosures before investing.
          </p>
        </div>
      </div>

      {/* Primary Explore Action Button */}
      <button
        className={`w-full min-h-[52px] rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer select-none ${
          isValidAmount
            ? 'bg-primary text-on-primary hover:bg-primary-container active:scale-[0.99]'
            : 'bg-surface-variant text-outline cursor-not-allowed'
        }`}
        disabled={!isValidAmount}
        id="explore-cta-btn"
        onClick={onOpenReviewDrawer}
        type="button"
      >
        <span>Explore investments</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>

      {/* Review Bottom Drawer ("Explore Preview") */}
      {isReviewDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          id="review-bottom-drawer"
          onClick={onCloseReviewDrawer}
        >
          <div
            className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-surface-variant rounded-full mx-auto -mt-2" />
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold" id="preview-title">
                  Explore Preview
                </h3>
              </div>
              <button
                aria-label="Close review panel"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container text-on-surface hover:bg-surface-variant"
                id="close-drawer-btn"
                onClick={onCloseReviewDrawer}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Next, review the available investment, its costs and risks before deciding.
            </p>

            <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-3 border border-surface-container">
              <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Selected allocation
                </span>
                <span className="font-label-lg text-label-lg text-on-surface font-bold" id="drawer-amount-display">
                  {currentAmount ? formatCurrencyINR(currentAmount) : '₹100'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Estimated account debit
                </span>
                <span className="font-label-lg text-label-lg text-primary font-bold">
                  ₹0.00 (Demo)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Platform transaction fee
                </span>
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  ₹0 (Free)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 px-1">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                lock
              </span>
              <p className="font-label-sm text-label-sm text-on-surface-variant leading-snug">
                Explicitly clarifying:{' '}
                <span className="font-bold text-on-surface">No money is deducted.</span> You will explore basket details and fee structures before committing any real funds.
              </p>
            </div>

            <button
              className="w-full min-h-[48px] rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center hover:bg-primary-container active:scale-[0.99] transition-all cursor-pointer shadow-sm"
              id="confirm-drawer-btn"
              onClick={onCloseReviewDrawer}
              type="button"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
