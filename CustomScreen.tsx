import React, { useState } from 'react';
import {
  CUSTOM_BASES,
  CUSTOM_PROTEINS,
  CUSTOM_SAUCES,
  HEAT_LEVELS,
  CUSTOM_ADDONS,
} from '../data/mockData';
import { CartItem } from '../types';

interface CustomScreenProps {
  onAddToCart: (item: CartItem) => void;
  onShowToast: (msg: string) => void;
}

export const CustomScreen: React.FC<CustomScreenProps> = ({
  onAddToCart,
  onShowToast,
}) => {
  const basePrice = 15.50;

  // Selections state
  const [selectedBase, setSelectedBase] = useState<string>('base-padkeemao');
  const [selectedProtein, setSelectedProtein] = useState<string>('protein-chicken');
  const [selectedSauce, setSelectedSauce] = useState<string>('sauce-greencurry');
  const [heatLevel, setHeatLevel] = useState<number>(3);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'addon-papadum',
    'addon-cheese',
  ]);
  const [isFav, setIsFav] = useState<boolean>(true);
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Price calculation
  const baseObj = CUSTOM_BASES.find((b) => b.id === selectedBase);
  const proteinObj = CUSTOM_PROTEINS.find((p) => p.id === selectedProtein);
  const baseExtra = baseObj ? baseObj.price : 0;
  const proteinExtra = proteinObj ? proteinObj.price : 0;
  const addonsExtra = selectedAddons.reduce((acc, addonId) => {
    const addon = CUSTOM_ADDONS.find((a) => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const unitTotal = basePrice + baseExtra + proteinExtra + addonsExtra;
  const total = unitTotal * quantity;

  const currentHeat = HEAT_LEVELS[heatLevel - 1];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleAddCustomDrop = () => {
    setIsAdding(true);
    const sauceObj = CUSTOM_SAUCES.find((s) => s.id === selectedSauce);
    const addonNames = selectedAddons
      .map((id) => CUSTOM_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    const summaryParts = [
      baseObj?.name,
      proteinObj?.name,
      sauceObj?.name,
      currentHeat.name,
      addonNames.length > 0 ? `Add-ons: ${addonNames.join(', ')}` : '',
    ].filter(Boolean);

    const newItem: CartItem = {
      id: `custom-wok-${Date.now()}`,
      title: 'Custom Wok Bowl / Roll',
      price: unitTotal,
      quantity,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDur4VTDCdeaaL1Aj2TjiilNka9Q8OeZi0h_UN3pYwd2_3s9MhQ0RWlAA1johUtgAEOz9Yy7ZEdAUHZ67blc1vhQRuBrDRY1vzbpsCui4RRcaaFjlU_KTSaND6D3CdkGmf6-viLmtiEhTl_3aB4XU5orSwAWFZP8BLLa4EbytiQE678fNOpgd_IcKLsUhMHPXMD0xgNCePleuAy_RaMj5nxmbQVwDiDAkBkICOwoDHmS0uXn-8sPhw8',
      optionsSummary: summaryParts.join(' • '),
      base: baseObj?.name,
      protein: proteinObj?.name,
      sauce: sauceObj?.name,
      heatLevel,
      addons: addonNames,
      notes: notes || undefined,
    };

    setTimeout(() => {
      onAddToCart(newItem);
      onShowToast(`Custom Wok Bowl dropped into bag! • $${total.toFixed(2)}`);
      setIsAdding(false);
    }, 400);
  };

  // Color classes for 5 heat bars based on current level
  const getHeatBarColor = (index: number) => {
    if (index >= heatLevel) return 'bg-surface-container-high';
    if (heatLevel <= 2) return 'bg-tertiary-fixed';
    if (heatLevel === 3) return index < 2 ? 'bg-secondary-container' : 'bg-primary-container';
    if (heatLevel === 4) return index < 1 ? 'bg-secondary-container' : 'bg-primary-container';
    return 'bg-primary-container';
  };

  return (
    <div className="flex flex-col w-full gap-space-lg select-none pb-24">
      {/* Top Visual Container / Dish Showcase */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container shadow-xl border border-outline-variant/30">
        <div
          className="w-full h-72 bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDur4VTDCdeaaL1Aj2TjiilNka9Q8OeZi0h_UN3pYwd2_3s9MhQ0RWlAA1johUtgAEOz9Yy7ZEdAUHZ67blc1vhQRuBrDRY1vzbpsCui4RRcaaFjlU_KTSaND6D3CdkGmf6-viLmtiEhTl_3aB4XU5orSwAWFZP8BLLa4EbytiQE678fNOpgd_IcKLsUhMHPXMD0xgNCePleuAy_RaMj5nxmbQVwDiDAkBkICOwoDHmS0uXn-8sPhw8')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none" />

          {/* Top badges / Sticker offsets */}
          <div className="absolute top-3 left-3 flex items-center gap-space-xs z-10">
            <span className="px-space-sm py-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase font-bold rounded shadow-md -rotate-2">
              Chef Special Drop
            </span>
            <span className="px-space-sm py-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm uppercase font-bold rounded shadow-md">
              Live Wok Fire
            </span>
          </div>

          <button
            onClick={() => setIsFav(!isFav)}
            className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high/90 backdrop-blur-md shadow-md cursor-pointer active:scale-90 transition-transform z-10"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{
                color: isFav ? '#ffb3b0' : '#e7bcba',
                fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              favorite
            </span>
          </button>

          {/* Live Sizzle Pill indicator */}
          <div className="absolute bottom-3 left-3 px-space-sm py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1.5 shadow-sm z-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-fixed" />
            </span>
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
              31 Foodies Customizing Now
            </span>
          </div>
        </div>

        {/* Dish Header Details */}
        <div className="p-space-md flex flex-col gap-space-xs bg-surface-container">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold tracking-wider">
                Indo-Thai Collision
              </span>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-tight text-on-surface">
                Build Your Own Wok Bowl / Roll
              </h1>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-headline-md text-headline-md text-primary font-bold">
                ${basePrice.toFixed(2)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant line-through">
                $18.00
              </span>
            </div>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant">
            Wok-fired street noodles or fragrant basmati drenched in your dream fusion curry. Handcrafted in 300° cast iron.
          </p>

          <div className="flex items-center gap-space-md pt-space-xs flex-wrap">
            <div className="flex items-center gap-1 bg-surface-container-high px-space-sm py-1 rounded-full shadow-sm">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                4.9
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                (1.2k reviews)
              </span>
            </div>

            <div className="flex items-center gap-1 bg-surface-container-high px-space-sm py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-primary text-sm">
                timer
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                12-15 Mins
              </span>
            </div>

            <div className="flex items-center gap-1 bg-surface-container-high px-space-sm py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-tertiary text-sm">
                local_fire_department
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                Custom Heat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: CHOOSE YOUR BASE */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">
              01
            </span>
            <h2 className="font-headline-md text-headline-md uppercase text-on-surface">
              Choose Your Base
            </h2>
          </div>
          <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase font-bold">
            Required
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {CUSTOM_BASES.map((base) => {
            const isChecked = selectedBase === base.id;
            return (
              <label
                key={base.id}
                onClick={() => setSelectedBase(base.id)}
                className={`group relative flex items-center justify-between p-space-sm rounded-xl cursor-pointer shadow-sm transition-all border ${
                  isChecked
                    ? 'bg-surface-container-high border-primary-container/40'
                    : 'bg-surface-container border-transparent hover:border-outline-variant/30'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-xl">
                      {base.icon}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg uppercase text-on-surface">
                      {base.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {base.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm">
                  {base.chefPick ? (
                    <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold">
                      Chef Pick
                    </span>
                  ) : base.price > 0 ? (
                    <span className="font-label-sm text-label-sm text-secondary font-bold">
                      + ${base.price.toFixed(2)}
                    </span>
                  ) : (
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Free
                    </span>
                  )}
                  <input
                    type="radio"
                    name="dish-base"
                    checked={isChecked}
                    onChange={() => setSelectedBase(base.id)}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: PICK YOUR PROTEIN */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">
              02
            </span>
            <h2 className="font-headline-md text-headline-md uppercase text-on-surface">
              Pick Your Protein
            </h2>
          </div>
          <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase font-bold">
            1 Choice
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {CUSTOM_PROTEINS.map((protein) => {
            const isChecked = selectedProtein === protein.id;
            return (
              <label
                key={protein.id}
                onClick={() => setSelectedProtein(protein.id)}
                className={`group relative p-space-sm rounded-xl flex flex-col justify-between h-36 cursor-pointer active:scale-95 transition-all shadow-sm border ${
                  isChecked
                    ? 'bg-surface-container-high border-primary-container/40'
                    : 'bg-surface-container border-transparent hover:border-outline-variant/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold uppercase">
                    {protein.tag}
                  </span>
                  <input
                    type="radio"
                    name="dish-protein"
                    checked={isChecked}
                    onChange={() => setSelectedProtein(protein.id)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg uppercase text-on-surface leading-tight">
                    {protein.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary mt-1 font-semibold">
                    {protein.price > 0 ? `+ $${protein.price.toFixed(2)}` : 'Included'}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: THE GRAVY / SAUCE GLAZE */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">
              03
            </span>
            <h2 className="font-headline-md text-headline-md uppercase text-on-surface">
              The Gravy / Sauce Glaze
            </h2>
          </div>
          <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase font-bold">
            1 Glaze
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {CUSTOM_SAUCES.map((sauce) => {
            const isChecked = selectedSauce === sauce.id;
            return (
              <label
                key={sauce.id}
                onClick={() => setSelectedSauce(sauce.id)}
                className={`group flex items-center justify-between p-space-sm rounded-xl cursor-pointer shadow-sm transition-all border ${
                  isChecked
                    ? 'bg-surface-container-high border-primary-container/40'
                    : 'bg-surface-container border-transparent hover:border-outline-variant/30'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <div
                    className="w-3.5 h-3.5 rounded-full shadow-sm shrink-0"
                    style={{ backgroundColor: sauce.colorHex }}
                  />
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg uppercase text-on-surface">
                      {sauce.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {sauce.desc}
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="dish-sauce"
                  checked={isChecked}
                  onChange={() => setSelectedSauce(sauce.id)}
                  className="w-5 h-5 accent-primary cursor-pointer shrink-0 ml-2"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: INTERACTIVE HEAT LEVEL SLIDER */}
      <div className="flex flex-col gap-space-sm p-space-md rounded-2xl bg-surface-container shadow-md border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">
              04
            </span>
            <h2 className="font-headline-md text-headline-md uppercase text-on-surface">
              Dial Your Heat
            </h2>
          </div>
          <div className="flex items-center gap-1 text-primary-container">
            <span className="material-symbols-outlined text-sm">warning</span>
            <span className="font-label-sm text-label-sm uppercase font-bold">
              {currentHeat.name}
            </span>
          </div>
        </div>

        {/* Pepper Scale Graphic indicator */}
        <div className="flex items-center justify-between gap-1.5 mt-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 h-3 rounded-full transition-colors duration-300 ${getHeatBarColor(
                i
              )}`}
            />
          ))}
        </div>

        {/* Native Range slider */}
        <div className="w-full relative py-2">
          <input
            type="range"
            min="1"
            max="5"
            value={heatLevel}
            onChange={(e) => setHeatLevel(parseInt(e.target.value, 10))}
            className="w-full h-2.5 rounded-lg bg-surface-container-lowest appearance-none cursor-pointer accent-primary-container"
          />
        </div>

        {/* Heat Ticks */}
        <div className="flex items-center justify-between text-center px-1">
          <div className="flex flex-col items-start">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Mild
            </span>
            <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold">
              1. Cool Lassi
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Street Standard
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-bold">
              3. Bombay Heat
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Extreme
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold">
              5. Face Melter 🌶️
            </span>
          </div>
        </div>

        {/* Warning quote */}
        <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-xs mt-1 border border-outline-variant/20">
          <span className="material-symbols-outlined text-secondary text-lg">
            local_fire_department
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant italic">
            "{currentHeat.quote}"
          </span>
        </div>
      </div>

      {/* SECTION 5: STREET CRUNCH & ADD-ONS */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center justify-center w-6 h-6 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">
              05
            </span>
            <h2 className="font-headline-md text-headline-md uppercase text-on-surface">
              Street Crunch &amp; Add-ons
            </h2>
          </div>
          <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm uppercase font-bold">
            Optional
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {CUSTOM_ADDONS.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <label
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-center justify-between p-space-sm rounded-xl cursor-pointer shadow-sm transition-all border ${
                  isChecked
                    ? 'bg-surface-container-high border-primary-container/40'
                    : 'bg-surface-container border-transparent hover:border-outline-variant/30'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAddon(addon.id)}
                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg uppercase text-on-surface">
                      {addon.name}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {addon.desc}
                    </span>
                  </div>
                </div>
                <span
                  className={`font-label-sm text-label-sm font-bold uppercase ${
                    addon.price > 0 ? 'text-secondary' : 'text-tertiary-fixed'
                  }`}
                >
                  {addon.price > 0 ? `+ $${addon.price.toFixed(2)}` : 'Free'}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Special Instructions Accordion */}
      <div className="flex flex-col gap-space-xs">
        <button
          type="button"
          onClick={() => setNotesOpen(!notesOpen)}
          className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg uppercase hover:bg-surface-container-high transition-colors"
        >
          <span className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-lg text-on-surface-variant">
              edit_note
            </span>
            Kitchen Shout-out / Allergies
          </span>
          <span className="material-symbols-outlined transition-transform">
            {notesOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {notesOpen && (
          <div className="flex flex-col gap-space-xs p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/20 animate-in fade-in duration-150">
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., No cilantro, extra lime wedge, pack gravy on the side..."
              className="w-full bg-surface-container p-space-sm rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container placeholder:text-surface-bright resize-none"
            />
          </div>
        )}
      </div>

      {/* STICKY ACTION TRAY */}
      <div className="fixed bottom-20 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-2xl py-3 px-4">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          {/* Quantity Counter & Summary Subtotal */}
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-surface-container-high rounded-full p-1 shadow-sm border border-outline-variant/20">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-bright active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="font-headline-md text-headline-md text-on-surface px-space-md leading-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-bright active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                Calculated Total
              </span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleAddCustomDrop}
            disabled={isAdding}
            className="w-full py-3.5 px-space-lg rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-space-sm shadow-xl active:scale-[0.98] transition-all cursor-pointer font-black"
          >
            <span className="material-symbols-outlined text-xl">
              {isAdding ? 'progress_activity' : 'shopping_cart_checkout'}
            </span>
            <span>
              {isAdding
                ? 'Dropping into Bag... 🔥'
                : `Add Custom Drop to Bag • $${total.toFixed(2)}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
