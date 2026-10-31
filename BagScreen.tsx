import React, { useState } from 'react';
import { CartItem } from '../types';

interface BagScreenProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
  onShowToast: (msg: string) => void;
  onOrderCompleted: (earnedPoints: number) => void;
  streetRepPoints: number;
}

export const BagScreen: React.FC<BagScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
  onShowToast,
  onOrderCompleted,
  streetRepPoints,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    total: number;
    pointsEarned: number;
    eta: string;
  } | null>(null);

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? 3.50 : 0.00;
  const tax = subtotal * 0.08875; // NYC sales tax
  const promoDiscount = appliedPromo ? (appliedPromo.discount <= 1 ? subtotal * appliedPromo.discount : appliedPromo.discount) : 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount + tax + deliveryFee);
  const pointsEarned = Math.round(subtotal * 10);

  const isFreeFloatUnlocked = subtotal >= 30;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LESNIGHT') {
      setAppliedPromo({ code: 'LESNIGHT', discount: 5.00 });
      onShowToast('Promo code LESNIGHT applied: $5.00 off! 🔥');
    } else if (code === 'FIRE10') {
      setAppliedPromo({ code: 'FIRE10', discount: 0.10 });
      onShowToast('Promo code FIRE10 applied: 10% off! 🔥');
    } else {
      onShowToast('Invalid promo code. Try "LESNIGHT" or "FIRE10"');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    setTimeout(() => {
      const orderNum = `SD-${Math.floor(1000 + Math.random() * 9000)}`;
      setCompletedOrder({
        orderId: orderNum,
        total: finalTotal,
        pointsEarned,
        eta: orderType === 'pickup' ? '12-15 mins' : '22-28 mins',
      });
      setIsCheckingOut(false);
      onOrderCompleted(pointsEarned);
      onShowToast(`Order ${orderNum} locked in with Wok Line! 🔥`);
    }, 900);
  };

  if (completedOrder) {
    return (
      <div className="flex flex-col w-full gap-space-lg select-none pb-24 animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-3xl bg-surface-container p-space-md border border-tertiary-fixed/60 shadow-2xl flex flex-col items-center text-center gap-space-md">
          <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-lg animate-bounce">
            <span className="material-symbols-outlined text-3xl font-bold">check</span>
          </div>

          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Drop Secured • Sizzling Now
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile uppercase text-on-surface mt-1">
              Order {completedOrder.orderId}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Cast iron woks are fired up at 184 Orchard St.
            </p>
          </div>

          {/* Live Progress Card */}
          <div className="w-full bg-surface-container-high p-space-md rounded-2xl flex flex-col gap-space-sm border border-outline-variant/30 text-left">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-tertiary-fixed uppercase font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed animate-ping" />
                Live Wok Station 2
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                ETA: {completedOrder.eta}
              </span>
            </div>

            <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-secondary to-primary-container rounded-full w-2/3 animate-pulse" />
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Chef tossing drunken ribbons &amp; searing tandoori smoke glaze.
            </p>
          </div>

          {/* Street Rep Reward */}
          <div className="w-full p-space-sm rounded-xl bg-tertiary-container/20 border border-tertiary-fixed/40 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-fixed text-2xl">
                local_fire_department
              </span>
              <div>
                <span className="font-label-sm text-label-sm text-tertiary-fixed uppercase font-bold block">
                  Street Rep Boosted
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  +{completedOrder.pointsEarned} PTS added to your rep
                </span>
              </div>
            </div>
            <span className="font-headline-md text-headline-md text-tertiary-fixed font-bold">
              {streetRepPoints.toLocaleString()} PTS
            </span>
          </div>

          <button
            onClick={() => {
              setCompletedOrder(null);
              onClearBag();
            }}
            className="w-full py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase font-black shadow-md cursor-pointer active:scale-95 transition-transform"
          >
            Start New Street Drop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-space-lg select-none pb-28">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest block">
            Lower East Side Bag
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile uppercase text-on-surface">
            Your Street Drop
          </h2>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClearBag}
            className="font-label-sm text-label-sm uppercase text-outline hover:text-error transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Pickup vs Delivery Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-surface-container border border-outline-variant/30">
        <button
          type="button"
          onClick={() => setOrderType('pickup')}
          className={`py-2.5 px-3 rounded-xl font-label-md text-label-md uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            orderType === 'pickup'
              ? 'bg-primary-container text-on-primary-container shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">storefront</span>
          <span>LES Alley Pickup</span>
        </button>

        <button
          type="button"
          onClick={() => setOrderType('delivery')}
          className={`py-2.5 px-3 rounded-xl font-label-md text-label-md uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            orderType === 'delivery'
              ? 'bg-primary-container text-on-primary-container shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">moped</span>
          <span>Late Night Delivery</span>
        </button>
      </div>

      {/* Secret Mango Lassi Float Banner */}
      <div
        className={`p-space-sm rounded-2xl border transition-all flex items-center justify-between gap-2 ${
          isFreeFloatUnlocked
            ? 'bg-tertiary-container/20 border-tertiary-fixed text-on-surface'
            : 'bg-surface-container border-outline-variant/30 text-on-surface-variant'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-xl"
            style={{
              color: isFreeFloatUnlocked ? '#c3f400' : '#fea100',
              fontVariationSettings: "'FILL' 1",
            }}
          >
            icecream
          </span>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface">
              {isFreeFloatUnlocked
                ? '🎉 Free Mango Lassi Float Unlocked!'
                : 'Free Mango Lassi Float on $30+'}
            </span>
            <span className="text-xs">
              {isFreeFloatUnlocked
                ? 'Off-menu Thai Basil Mango Milk Float included at counter'
                : `Add $${Math.max(0, 30 - subtotal).toFixed(2)} more to secure free float`}
            </span>
          </div>
        </div>
        {isFreeFloatUnlocked ? (
          <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold uppercase">
            Included
          </span>
        ) : (
          <span className="font-label-sm text-xs text-secondary font-bold">
            ${subtotal.toFixed(0)}/30
          </span>
        )}
      </div>

      {/* Bag Items List */}
      {items.length === 0 ? (
        <div className="p-10 text-center bg-surface-container rounded-3xl border border-outline-variant/20 flex flex-col items-center gap-2">
          <span className="material-symbols-outlined text-5xl text-outline mb-1">
            shopping_bag
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Your Bag Is Empty
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
            Cop the weekly Butter Chicken Bao or customize your own wok bowl now.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container border border-outline-variant/30 shadow-sm gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="flex flex-col min-w-0">
                  <h4 className="font-label-lg text-label-lg uppercase text-on-surface truncate">
                    {item.title}
                  </h4>
                  {item.optionsSummary && (
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs line-clamp-1">
                      {item.optionsSummary}
                    </p>
                  )}
                  <span className="font-label-md text-label-md text-tertiary-fixed font-bold mt-0.5">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Adjust Quantity Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-bright active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-xs">remove</span>
                </button>
                <span className="font-headline-md text-headline-md px-1.5 text-on-surface text-sm">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-bright active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-xs">add</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label="Remove item"
                  className="w-7 h-7 rounded-full text-on-surface-variant hover:text-error flex items-center justify-center ml-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Promo Code Input */}
      {items.length > 0 && (
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo code (LESNIGHT or FIRE10)"
            className="flex-1 bg-surface-container-high px-3.5 py-2.5 rounded-xl text-on-surface placeholder:text-outline font-label-md text-label-md uppercase focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/30"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-secondary font-label-md text-label-md uppercase font-bold tracking-wider active:scale-95 transition-transform"
          >
            Apply
          </button>
        </form>
      )}

      {/* Order Summary Receipt */}
      {items.length > 0 && (
        <div className="rounded-2xl bg-surface-container p-space-md flex flex-col gap-2 border border-outline-variant/30">
          <div className="flex justify-between text-body-sm text-on-surface-variant">
            <span>Subtotal</span>
            <span className="text-on-surface">${subtotal.toFixed(2)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-body-sm text-tertiary-fixed font-bold">
              <span>Promo ({appliedPromo.code})</span>
              <span>-${promoDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-body-sm text-on-surface-variant">
            <span>Estimated NYC Tax</span>
            <span className="text-on-surface">${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-body-sm text-on-surface-variant">
            <span>{orderType === 'pickup' ? 'Alley Counter Pickup' : 'LES Courier Delivery'}</span>
            <span className="text-on-surface">
              {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
            </span>
          </div>

          <div className="h-px bg-outline-variant/30 my-1" />

          <div className="flex justify-between items-baseline">
            <span className="font-headline-md text-headline-md text-on-surface">Total</span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-tertiary-fixed font-bold">
              ${finalTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-secondary mt-1 pt-1 border-t border-outline-variant/20">
            <span className="flex items-center gap-1 font-label-sm uppercase">
              <span className="material-symbols-outlined text-sm text-primary">
                local_fire_department
              </span>
              Street Rep Earned on Drop:
            </span>
            <span className="font-bold">+{pointsEarned} PTS</span>
          </div>
        </div>
      )}

      {/* Checkout Action Button */}
      {items.length > 0 && (
        <div className="fixed bottom-20 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 py-3 px-4 shadow-2xl">
          <div className="max-w-md mx-auto">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 px-space-lg rounded-full bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all cursor-pointer font-black"
            >
              <span className="material-symbols-outlined text-xl">
                {isCheckingOut ? 'progress_activity' : 'bolt'}
              </span>
              <span>
                {isCheckingOut
                  ? 'Locking Drop Order...'
                  : `Secure Drop Order • $${finalTotal.toFixed(2)}`}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
