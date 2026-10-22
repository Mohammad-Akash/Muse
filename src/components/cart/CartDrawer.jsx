import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, Bookmark } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useRegion } from '../../context/RegionContext.jsx';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    meetsFreeShipping,
    remainingForFreeShipping,
    freeShippingProgress
  } = useCart();

  const { formatAmount, region } = useRegion();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setPromoError('');
    const res = applyCouponCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#190D25]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        {/* Full width on mobile, max-w-md on sm and above */}
        <div className="w-full sm:w-screen sm:max-w-md bg-[#FAF7FC] border-l border-[#E5D9EE] shadow-2xl flex flex-col justify-between h-full overflow-hidden">
          
          {/* Drawer Header */}
          <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-white border-b border-[#E5D9EE] flex items-center justify-between shrink-0">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5D3891] block">
                Glowora Beauty
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#221430]">
                Your Shopping Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-[#6E5D7E] hover:text-[#221430] transition-colors rounded-full hover:bg-[#F3ECF8]"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5 stroke-2" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F3ECF8] px-4 py-3 border-b border-[#E5D9EE] text-xs shrink-0">
            <div className="flex items-center justify-between font-medium text-[#221430] mb-1.5 gap-2">
              <span className="flex items-center gap-1.5 text-[#5D3891] text-[11px] sm:text-xs min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-[#5D3891] shrink-0" />
                {meetsFreeShipping ? (
                  <span className="font-bold text-[#5D3891] truncate">Complimentary Delivery Unlocked!</span>
                ) : (
                  <span className="truncate">
                    Add <strong className="font-mono text-[#5D3891] font-bold">{formatAmount(remainingForFreeShipping)}</strong> for free shipping
                  </span>
                )}
              </span>
              <span className="text-[#6E5D7E] font-mono text-[11px] font-bold shrink-0">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#DECDEB] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#5D3891] h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6E5D7E]">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E5D9EE] flex items-center justify-center mb-4 text-[#5D3891] shadow-2xs">
                  <Sparkles className="w-7 h-7 text-[#5D3891]" />
                </div>
                <p className="font-serif text-2xl font-normal text-[#221430]">Your shopping bag is empty</p>
                <p className="text-xs text-[#6E5D7E] mt-2 max-w-xs leading-relaxed">
                  Discover our botanical serums, cellular moisturizers, and floral elixirs to curate your daily beauty ritual.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-6 px-7 py-3 bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full transition-all shadow-md active:scale-95"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => {
                const unitPrice = item.prices ? (item.prices[region.code] ?? item.prices.PKR) : 0;
                return (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="bg-white p-3.5 rounded-2xl border border-[#E5D9EE] flex gap-3.5 relative shadow-2xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 object-contain rounded-xl bg-[#F7F3FB] border border-[#E5D9EE] shrink-0 p-1"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.id}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="font-sans text-[13px] sm:text-[14px] font-semibold text-[#221430] hover:text-[#5D3891] transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id, item.variant)}
                            className="text-[#6E5D7E] hover:text-rose-600 transition-colors p-1 -mr-1 -mt-1 rounded-full"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#6E5D7E] mt-0.5">
                          {item.variant}
                        </p>
                        <p className="font-mono text-xs font-bold text-[#221430] mt-1">
                          {formatAmount(unitPrice)}
                        </p>
                      </div>

                      {/* Stepper + Save for Later */}
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#F3ECF8] gap-2">
                        <div className="flex items-center border border-[#E5D9EE] rounded-full bg-[#FAF7FC] px-1 py-0.5 shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#6E5D7E] hover:text-[#221430] transition-colors rounded-full"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-semibold px-2 text-[#221430]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#6E5D7E] hover:text-[#221430] transition-colors rounded-full"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => saveForLaterItem(item.id, item.variant)}
                          className="text-[11px] text-[#6E5D7E] hover:text-[#5D3891] flex items-center gap-1 transition-colors shrink-0 font-medium"
                        >
                          <Bookmark className="w-3 h-3" />
                          <span>Save for later</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Order Totals */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#E5D9EE] shadow-luxury-md space-y-3 shrink-0">
              
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#F3ECF8] border border-[#DECDEB] p-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-[#5D3891] font-medium truncate">
                      <Sparkles className="w-3.5 h-3.5 text-[#5D3891] shrink-0" />
                      <span className="truncate">Code <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#6E5D7E] hover:text-rose-700 font-semibold text-[11px] ml-2 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. GLOW15)"
                      className="flex-1 min-w-0 text-xs border border-[#E5D9EE] rounded-full px-3.5 py-2 uppercase font-mono tracking-wider focus:outline-none focus:border-[#5D3891] bg-[#FAF7FC]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs uppercase tracking-wider font-semibold rounded-full transition-colors shrink-0 shadow-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Calculations Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6E5D7E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-[#221430]">{formatAmount(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#5D3891] font-medium">
                    <span>Privilege Discount</span>
                    <span className="font-mono">-{formatAmount(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-mono font-medium text-[#221430]">
                    {shippingFee === 0 ? 'Free' : formatAmount(shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E5D9EE] flex justify-between text-sm font-semibold text-[#221430]">
                  <span>Total</span>
                  <span className="font-mono text-base sm:text-lg text-[#5D3891] font-bold">
                    {formatAmount(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] uppercase tracking-[0.16em] font-bold py-3 rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full bg-[#FAF7FC] hover:bg-[#F3ECF8] text-[#221430] text-[11px] uppercase tracking-wider font-semibold py-2 rounded-full border border-[#E5D9EE] transition-colors"
                >
                  View Full Bag
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6E5D7E] pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5D3891]" />
                <span>Climate-controlled shipping & satisfaction guaranteed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
