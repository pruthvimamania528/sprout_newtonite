import React, { useState } from 'react';
import { CANONICAL_LOGO_URL, CANONICAL_MASCOT_URL } from '../types/index.ts';

interface SproutLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SproutLogo: React.FC<SproutLogoProps> = ({ className = 'h-8 w-auto' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src={CANONICAL_LOGO_URL}
        alt="Sprout"
        className={`${className} object-contain select-none`}
        onError={() => setImgFailed(true)}
      />
    );
  }

  // Canonical Vector Fallback matching the exported Stitch geometry
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg
        className="w-6 h-6 shrink-0 drop-shadow-sm"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 5C16 10 15 14 20 14C25 14 24 10 20 5Z" fill="#CEEC64" />
        <path d="M12 18L20 8L20 28L12 18Z" fill="#176B52" />
        <path d="M28 18L20 8L20 28L28 18Z" fill="#00513C" />
        <path d="M20 28L14 21L20 35L20 28Z" fill="#536600" />
        <path d="M20 28L26 21L20 35L20 28Z" fill="#D5F36A" />
      </svg>
      <span className="font-bold text-[22px] tracking-tight text-primary font-sans leading-none">
        Sprout
      </span>
    </div>
  );
};

interface SproutMascotProps {
  className?: string;
  size?: number;
}

export const SproutMascot: React.FC<SproutMascotProps> = ({
  className = 'w-[72px] h-[72px]',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src={CANONICAL_MASCOT_URL}
        alt="Sprout Origami Seed Mascot"
        className={`${className} object-contain transition-transform duration-700 hover:rotate-6 hover:scale-105`}
        onError={() => setImgFailed(true)}
      />
    );
  }

  // Canonical Origami Seedling Vector Asset matching Stitch Design
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        className="w-full h-full drop-shadow-md transition-transform duration-500 hover:scale-105"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow base diamond */}
        <polygon points="50,86 64,91 50,96 36,91" fill="#bec9c2" opacity="0.6" />
        {/* Main Body Facets */}
        <polygon points="50,78 24,40 50,22 50,78" fill="#00513c" />
        <polygon points="50,78 76,40 50,22 50,78" fill="#176b52" />
        {/* Sprout Leaflets */}
        <path d="M50,22 C44,8 30,6 32,20 Z" fill="#00513c" />
        <path d="M50,22 C56,8 70,6 68,20 Z" fill="#d1ef67" />
        {/* Inner Light Accent Facet */}
        <polygon points="50,60 30,42 50,30" fill="#ceec64" />
        <polygon points="50,60 70,42 50,30" fill="#89d6b7" opacity="0.9" />
        {/* Central core seed highlight */}
        <circle cx="50" cy="46" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  );
};
