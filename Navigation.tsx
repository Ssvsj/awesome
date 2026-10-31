import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  bagCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  bagCount,
}) => {
  const navItems: { key: TabType; label: string; icon: string }[] = [
    { key: 'drop', label: 'Drop', icon: 'local_fire_department' },
    { key: 'menu', label: 'Menu', icon: 'restaurant' },
    { key: 'custom', label: 'Custom', icon: 'skillet' },
    { key: 'vibes', label: 'Vibes', icon: 'nightlife' },
    { key: 'bag', label: 'Bag', icon: 'shopping_bag' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-space-xs">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] h-12 rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'text-tertiary-fixed bg-surface-container-high shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface active:scale-95'
              }`}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>

              {item.key === 'bag' && bagCount > 0 && (
                <span className="absolute top-1 right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[10px] flex items-center justify-center font-bold animate-pulse">
                  {bagCount}
                </span>
              )}

              <span className="font-label-sm text-label-sm tracking-wide uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
