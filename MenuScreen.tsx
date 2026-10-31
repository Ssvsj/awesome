import React, { useState } from 'react';
import { MENU_DISHES } from '../data/mockData';
import { CartItem, DishItem } from '../types';

interface MenuScreenProps {
  onAddToCart: (item: CartItem) => void;
  onCustomizeDish: (dish: DishItem) => void;
  onShowToast: (msg: string) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onAddToCart,
  onCustomizeDish,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHeat, setSelectedHeat] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const categories = [
    { key: 'all', label: '🔥 All Grails' },
    { key: 'mashup', label: '🔥 Indo-Thai Mashups' },
    { key: 'noodles', label: '🍜 Street Noodles & Biryanis' },
    { key: 'baos', label: '🥟 Baos & Crispy Bites' },
    { key: 'boba', label: '🧋 Boba, Chaat & Shakes' },
    { key: 'vegan', label: '🌱 Vegan / Halal' },
  ];

  const heatFilters = [
    { level: null, label: 'All Heat' },
    { level: 1, label: 'Mild 🌶️' },
    { level: 2, label: 'Street Medium 🌶️🌶️' },
    { level: 3, label: 'Gasping for Lassi 🌶️🌶️🌶️' },
    { level: 4, label: 'Atomic Bangkok 🔥' },
  ];

  // Filter items
  const filteredDishes = MENU_DISHES.filter((dish) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = dish.title.toLowerCase().includes(q);
      const matchesDesc = dish.desc.toLowerCase().includes(q);
      const matchesTags = dish.dietTags.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesDesc && !matchesTags) return false;
    }

    // Heat filter
    if (selectedHeat !== null && dish.heatLevel !== selectedHeat) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'vegan' && !dish.isVegan && !dish.isHalal) return false;
      if (selectedCategory !== 'vegan' && dish.category !== selectedCategory) return false;
    }

    return true;
  });

  const handleQuickAdd = (dish: DishItem) => {
    onAddToCart({
      id: `menu-${dish.id}-${Date.now()}`,
      title: dish.title,
      price: dish.price,
      quantity: 1,
      image: dish.image,
      optionsSummary: `${dish.heatScore} • Ready in ${dish.prepTime}`,
    });
    onShowToast(`${dish.title.split('(')[0].trim()} dropped in Bag!`);
  };

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);
    onShowToast('🎙️ Listening... Say "Butter Chicken" or "Biryani"');
    setTimeout(() => {
      setSearchQuery('Butter Chicken');
      setIsVoiceListening(false);
      onShowToast('Filtered to Butter Chicken!');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-space-md select-none">
      {/* Live Market Status Sticker & Search Bar */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-sm border border-outline-variant/20">
          <div className="flex items-center gap-space-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary" />
            </span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
              Wok Line Live
            </span>
            <span className="text-outline text-label-sm font-label-sm">
              • Avg Prep 12m
            </span>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-highest px-2.5 py-0.5 rounded-full text-secondary font-label-sm text-label-sm">
            <span
              className="material-symbols-outlined text-sm text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span>43 Orders Cooking</span>
          </div>
        </div>

        {/* Search input with voice mic */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Craving Butter Chicken Baos or Tamarind Puri?..."
            className="w-full bg-surface-container-high text-on-surface placeholder:text-outline font-body-sm text-body-sm pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-container shadow-inner border border-outline-variant/30"
          />
          <button
            type="button"
            onClick={handleVoiceSearch}
            aria-label="Voice Search"
            className={`absolute inset-y-1.5 right-1.5 px-2.5 bg-surface-container rounded-lg text-primary flex items-center justify-center hover:bg-surface-bright transition-all ${
              isVoiceListening ? 'animate-pulse text-tertiary-fixed' : ''
            }`}
          >
            <span className="material-symbols-outlined text-base">mic</span>
          </button>
        </div>
      </div>

      {/* Heat Level Meter Selector */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-primary-container">
              thermostat
            </span>
            Heat Calibration
          </span>
          <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold tracking-widest">
            Interactive Filter
          </span>
        </div>

        {/* Scrollable Spice Bar */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1">
          {heatFilters.map((h, i) => {
            const isSelected = selectedHeat === h.level;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedHeat(isSelected && h.level !== null ? null : h.level)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-secondary-container text-on-secondary-container shadow-md font-bold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {h.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pill Filters Horizontal Scroller */}
      <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md tracking-wide uppercase transition-all cursor-pointer ${
                isActive
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-md font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span>{cat.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-fixed" />
              )}
            </button>
          );
        })}
      </div>

      {/* Section Header */}
      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest block leading-none">
            Drop 04 // Signature Collision
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mt-1">
            NIGHT MARKET GRAILS
          </h2>
        </div>
        <span className="font-label-sm text-label-sm bg-surface-container-highest text-tertiary-fixed px-2 py-1 rounded-md font-bold uppercase tracking-wider">
          {filteredDishes.length} DISHES IN STOCK
        </span>
      </div>

      {/* Dynamic Street Food Grid */}
      <div className="flex flex-col gap-space-lg">
        {filteredDishes.length === 0 ? (
          <div className="p-8 text-center bg-surface-container rounded-2xl">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">
              search_off
            </span>
            <p className="font-headline-md text-on-surface">No grails match this spice filter</p>
            <p className="font-body-sm text-on-surface-variant mt-1">
              Try resetting your search or dial back the heat level.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedHeat(null);
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="relative flex flex-col bg-surface-container rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-0.5 border border-outline-variant/30"
            >
              {/* Media Box */}
              <div className="relative w-full h-52 bg-surface-container-high overflow-hidden group">
                <img
                  alt={dish.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={dish.image}
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {dish.promoTag && (
                    <span className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-md transform -rotate-1">
                      {dish.promoTag}
                    </span>
                  )}
                  {dish.isVegan && (
                    <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                      Vegan Option
                    </span>
                  )}
                  {dish.isHalal && (
                    <span className="bg-surface-container-lowest/90 backdrop-blur-md text-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                      100% Halal
                    </span>
                  )}
                </div>

                {/* Heat Pepper Score */}
                <div className="absolute bottom-3 left-3 bg-surface-container-lowest/85 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-on-surface">
                  <span className="font-label-sm text-label-sm font-bold text-secondary">
                    {dish.heatScore}
                  </span>
                  <span className="flex items-center text-primary-container">
                    {Array.from({ length: dish.heatLevel }).map((_, idx) => (
                      <span
                        key={idx}
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        local_fire_department
                      </span>
                    ))}
                  </span>
                </div>

                {/* Prep Time */}
                <div className="absolute bottom-3 right-3 bg-surface-container-lowest/85 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-xs text-tertiary">
                    timer
                  </span>
                  <span>{dish.prepTime}</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-space-md flex flex-col gap-space-sm">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">
                    {dish.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {dish.desc}
                  </p>
                </div>

                {/* Nutritional Tags */}
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded font-label-sm text-label-sm">
                    {dish.calories}
                  </span>
                  {dish.dietTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded font-label-sm text-label-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Price & Quick Add Bar */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-bold tracking-wider leading-none">
                      Price
                    </span>
                    <span className="font-headline-md text-headline-md text-tertiary-fixed font-bold leading-none mt-1">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-space-xs">
                    <button
                      type="button"
                      onClick={() => onCustomizeDish(dish)}
                      className="px-3.5 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm rounded-full tracking-wider uppercase font-bold transition-all active:scale-95 cursor-pointer"
                    >
                      Customize
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(dish)}
                      aria-label="Add to cart"
                      className="relative flex items-center justify-center w-11 h-11 bg-primary-container text-on-primary-container rounded-full shadow-md active:scale-90 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Late Night Neon Promo Footer Card */}
      <div className="mt-space-md p-space-md rounded-2xl bg-surface-container-high flex flex-col gap-space-sm relative overflow-hidden border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm uppercase font-bold tracking-wider">
            LES Midnight Secret
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Until 3:00 AM
          </span>
        </div>
        <div>
          <h4 className="font-headline-md text-headline-md text-on-surface">
            Secret Mango Lassi Float
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Show your cart total over $30 at the pickup counter for an off-menu Thai Basil Mango Milk Float.
          </p>
        </div>
      </div>
    </div>
  );
};
