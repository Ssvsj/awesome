import React from 'react';
import { LOGO_URL, AVATAR_URL } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  streetRepPoints: number;
  onOpenLoyaltyModal?: () => void;
  onOpenBag?: () => void;
  bagCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  streetRepPoints,
  onOpenLoyaltyModal,
  onOpenBag,
  bagCount
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'drop':
        return 'Drop';
      case 'menu':
        return 'Menu';
      case 'custom':
        return 'Custom';
      case 'vibes':
        return 'Vibes';
      case 'bag':
        return 'Drop Bag';
      default:
        return 'Drop';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] pt-safe">
      <div className="max-w-md mx-auto h-20 px-space-md flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <img
            alt="Spice Drop Logo"
            className="h-8 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            src={LOGO_URL}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-md text-headline-md tracking-tight uppercase text-primary leading-none">
                SPICE DROP
              </span>
              <span className="px-space-xs py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm tracking-wider uppercase font-bold leading-none">
                NYC
              </span>
            </div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm leading-none text-primary">
                  pin_drop
                </span>{' '}
                Lower East Side
              </span>
              <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm leading-none">
                  bolt
                </span>{' '}
                25m
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <span className="hidden sm:inline-block font-label-md text-label-md uppercase text-on-surface-variant">
            {getTabTitle()}
          </span>

          <button
            onClick={onOpenLoyaltyModal}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/50 text-tertiary-fixed font-label-sm text-label-sm font-bold shadow-sm hover:border-tertiary-fixed transition-colors"
            title="View Street Rep"
          >
            <span className="material-symbols-outlined text-sm text-primary">local_fire_department</span>
            <span>{streetRepPoints.toLocaleString()} PTS</span>
          </button>

          <button
            onClick={onOpenLoyaltyModal}
            aria-label="Profile and Street Rep"
            className="relative flex items-center justify-center p-0.5 rounded-full bg-surface-container-high ring-1 ring-primary-container/40 active:scale-95 transition-transform"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={AVATAR_URL}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-tertiary border-2 border-surface"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
