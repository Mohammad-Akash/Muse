import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowLeft 
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useRegion } from '../context/RegionContext.jsx';
import { products } from '../data/products.js';

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    savedForLater,
    updateQuantity,
    removeFromCart,
    saveForLaterItem,
    moveToCartFromSaved,
    removeSavedItem,
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
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState({ error: '', success: '' });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoFeedback({ error: '', success: '' });
    const res = applyCouponCode(promoCodeInput);
    if (!res.success) {
      setPromoFeedback({ error: res.message, success: '' });
    } else {
      setPromoFeedback({ error: '', success: 'Privilege code successfully applied!' });
      setPromoCodeInput('');
    }
  };

  const recommendedItems = products
    .filter(p => !items.some(i => i.id === p.id))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      <div className="border-b border-[#E5D9EE] pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#5D3891] block mb-1">
            Maison Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#221430]">
            Your Selected Formulations ({items.length})
          </h1>
        </div>
        <Link
          to="/shop"
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5D3891] hover:text-[#4A2578] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Exploring</span>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-12 sm:p-16 text-center border border-[#E5D9EE] max-w-xl mx-auto space-y-4 rounded-3xl shadow-luxury-card">
          <div className="w-16 h-16 border border-[#E5D9EE] bg-[#FAF7FC] rounded-full flex items-center justify-center mx-auto text-[#5D3891] shadow-2xs">
            <Sparkles className="w-7 h-7 text-[#5D3891]" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-[#221430]">
            Your shopping bag is currently vacant
          </h2>
          <p className="text-xs text-[#6E5D7E] leading-relaxed max-w-sm mx-auto font-sans">
            Explore our curated collections of botanical elixirs, couture lipsticks, and rare perfumes.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Explore The Boutique
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bag Items (Col 8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Meter */}
            <div className="bg-[#F3ECF8] p-5 rounded-2xl border border-[#E5D9EE] text-xs shadow-2xs">
              <div className="flex items-center justify-between font-medium text-[#221430] mb-2 font-sans">
                <span className="flex items-center gap-2 text-[#5D3891]">
                  <Truck className="w-4 h-4 text-[#5D3891]" />
                  {meetsFreeShipping ? (
                    <span className="font-bold text-[#5D3891]">Complimentary luxury delivery unlocked!</span>
                  ) : (
                    <span>
                      Add <strong className="font-mono text-[#5D3891] font-bold">{formatAmount(remainingForFreeShipping)}</strong> more to receive free delivery
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold text-[#6E5D7E]">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#DECDEB]/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#5D3891] to-[#DFC066] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Table/Cards */}
            <div className="bg-white rounded-3xl border border-[#E5D9EE] divide-y divide-[#F3ECF8] shadow-luxury-card overflow-hidden">
              {items.map((item) => {
                const unitPrice = item.prices ? (item.prices[region.code] ?? item.prices.PKR) : 0;
                const lineTotal = unitPrice * item.quantity;
                return (
                  <div key={`${item.id}-${item.variant}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-[#FAF7FC] shrink-0 border border-[#E5D9EE] p-1.5"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891] block font-sans">
                          {item.brand}
                        </span>
                        <Link
                          to={`/product/${item.id}`}
                          className="font-serif text-sm sm:text-base font-bold text-[#221430] hover:text-[#5D3891] transition-colors leading-snug truncate block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-[#6E5D7E] mt-0.5 font-sans">
                          Size: <span className="font-medium text-[#221430]">{item.variant}</span>
                        </p>
                        <p className="font-mono text-xs text-[#6E5D7E] mt-0.5">
                          {formatAmount(unitPrice)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F3ECF8]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E5D9EE] rounded-full bg-[#FAF7FC] px-1 py-0.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[#6E5D7E] hover:text-[#221430] transition-colors rounded-full"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs px-2.5 font-bold text-[#221430]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[#6E5D7E] hover:text-[#221430] transition-colors rounded-full"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <span className="font-mono text-sm sm:text-base font-bold text-[#221430] min-w-[75px] sm:min-w-[90px] text-right shrink-0">
                        {formatAmount(lineTotal)}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        <button
                          onClick={() => saveForLaterItem(item.id, item.variant)}
                          className="p-1.5 sm:p-2 text-[#6E5D7E] hover:text-[#5D3891] transition-colors rounded-full hover:bg-[#F3ECF8]"
                          title="Save for Later"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.variant)}
                          className="p-1.5 sm:p-2 text-[#6E5D7E] hover:text-rose-600 transition-colors rounded-full hover:bg-rose-50"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Saved for Later Section */}
            {savedForLater.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-[#E5D9EE] space-y-4 mt-8 shadow-luxury-card">
                <h3 className="font-serif text-lg font-medium text-[#221430] flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#5D3891]" />
                  <span>Saved for Later ({savedForLater.length})</span>
                </h3>
                <div className="divide-y divide-[#F3ECF8]">
                  {savedForLater.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-contain rounded-xl bg-[#FAF7FC] border border-[#E5D9EE] p-1.5" />
                        <div>
                          <p className="font-serif text-sm font-bold text-[#221430]">{item.name}</p>
                          <p className="text-xs text-[#6E5D7E] font-sans">{item.variant}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => moveToCartFromSaved(item.id, item.variant)}
                          className="px-4 py-2 bg-[#221430] text-white text-[10.5px] uppercase tracking-wider font-semibold hover:bg-[#5D3891] transition-colors rounded-full"
                        >
                          Move to Bag
                        </button>
                        <button
                          onClick={() => removeSavedItem(item.id, item.variant)}
                          className="text-[#6E5D7E] hover:text-rose-600 p-1.5 rounded-full"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Summary Column (Col 4) */}
          <div className="lg:col-span-4 bg-white p-5 sm:p-7 rounded-3xl border border-[#E5D9EE] shadow-luxury-md space-y-5 sm:space-y-6">
            <h3 className="font-serif text-xl font-medium text-[#221430] border-b border-[#F3ECF8] pb-3">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <div>
              <span className="text-[10.5px] uppercase tracking-wider font-bold text-[#221430] block mb-2 font-sans">
                Privilege Promo Code
              </span>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#F3ECF8] border border-[#EAE0F2] rounded-2xl text-xs text-[#5D3891] font-sans">
                  <span className="font-semibold">Code: {appliedCoupon.code} ({appliedCoupon.discountPercent}% off)</span>
                  <button onClick={removeCoupon} className="text-[#6E5D7E] hover:text-rose-600 font-bold uppercase text-[10px] tracking-wider">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="e.g. GLOW15"
                    className="flex-1 min-w-0 text-xs border border-[#E5D9EE] px-4 py-2.5 rounded-full uppercase font-mono tracking-wider focus:outline-none focus:border-[#5D3891] bg-[#FAF7FC]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#5D3891] hover:bg-[#4A2578] text-white text-[10.5px] font-bold uppercase tracking-wider rounded-full transition-colors shrink-0 shadow-xs"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoFeedback.error && (
                <p className="text-[11px] text-rose-600 mt-1 font-sans">{promoFeedback.error}</p>
              )}
              {promoFeedback.success && (
                <p className="text-[11px] text-emerald-600 mt-1 font-sans">{promoFeedback.success}</p>
              )}
            </div>

            {/* Calculation Lines */}
            <div className="space-y-2.5 text-xs text-[#6E5D7E] pt-3 border-t border-[#F3ECF8] font-sans">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-[#221430]">{formatAmount(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#5D3891] font-semibold">
                  <span>Privilege Discount</span>
                  <span className="font-mono">-{formatAmount(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Climate-Insured Courier</span>
                <span className="font-mono font-medium text-[#221430]">
                  {shippingFee === 0 ? 'Complimentary' : formatAmount(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#F3ECF8] flex justify-between text-base font-semibold text-[#221430]">
                <span>Total Due</span>
                <span className="font-mono text-xl text-[#5D3891] font-bold">
                  {formatAmount(totalAmount)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] uppercase tracking-[0.2em] font-semibold py-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-[#F3ECF8] space-y-2.5 text-[11px] text-[#6E5D7E] font-sans">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#5D3891] shrink-0" />
                <span>Complimentary luxury velvet gift pouch included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#5D3891] shrink-0" />
                <span>Trackable express dispatch with thermal regulation</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Recommended Formulations Carousel/Strip */}
      {recommendedItems.length > 0 && (
        <section className="pt-10 border-t border-[#E5D9EE] space-y-4">
          <h3 className="font-serif text-2xl font-normal text-[#221430]">
            Recommended Additions to Your Ritual
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {recommendedItems.map((prod) => (
              <div key={prod.id} className="bg-white p-5 rounded-2xl border border-[#E5D9EE] shadow-luxury-card flex items-center gap-4 hover:border-[#5D3891] transition-all">
                <img src={prod.images[0]} alt={prod.name} className="w-16 h-16 object-contain rounded-xl bg-[#FAF7FC] border border-[#E5D9EE] p-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm font-bold text-[#221430] truncate">{prod.name}</p>
                  <p className="font-mono text-xs font-bold text-[#5D3891] mt-0.5">
                    {formatAmount(prod.prices[region.code])}
                  </p>
                  <Link
                    to={`/product/${prod.id}`}
                    className="text-[10.5px] text-[#5D3891] hover:text-[#4A2578] font-semibold uppercase tracking-wider block mt-1"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
