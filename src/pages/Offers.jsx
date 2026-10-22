import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Tag, 
  ArrowRight, 
  ShoppingBag,
  Percent,
  ShieldCheck
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import { offers, bundles, promoCodes } from '../data/offers.js';
import { products } from '../data/products.js';
import { useRegion } from '../context/RegionContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Offers() {
  const { openQuickView } = useOutletContext();
  const { formatAmount, regionCode } = useRegion();
  const { addToCart, applyCouponCode } = useCart();
  const { addToast } = useToast();

  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    addToast(`Privilege Code "${code}" applied to your shopping bag.`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleAddBundle = (bundle) => {
    const matchingProd = products.find(p => p.id === (bundle.id === 'bundle-masterpiece-coffret' ? 'le-coffret-prestige-set' : 'lumiere-elixir-serum')) || products[0];
    addToCart(matchingProd, 1);
    addToast(`Added "${bundle.title}" to your shopping bag.`);
  };

  const offerProducts = products.filter(p => p.isOffer || p.discountPercent > 0);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Campaign Banner */}
      <section className="bg-gradient-to-br from-[#FAF7FC] via-[#F3ECF8] to-[#EAE0F2] text-[#221430] py-16 border-b border-[#E5D9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Maison Privileges' }]} />
          
          <div className="mt-6 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/95 text-[#5D3891] text-[10.5px] font-bold uppercase tracking-wider border border-[#E5D9EE] rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5D3891]" />
              <span>Haute Cosmétique Privilège</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#221430] leading-tight">
              {offers.hero.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#6E5D7E] leading-relaxed font-sans max-w-xl">
              {offers.hero.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCopyCode(offers.hero.code)}
                className="bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] font-bold uppercase tracking-wider px-7 py-3.5 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                {copiedCode === offers.hero.code ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode === offers.hero.code ? 'Code Applied to Bag' : `Apply Privilege Code: ${offers.hero.code}`}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Promo Code Voucher Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-1 mb-10">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891]">
            Maison Vouchers
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#221430]">
            Active Privilege Codes
          </h2>
          <p className="text-xs text-[#6E5D7E] font-sans">
            Apply any certified voucher code to redeem seasonal savings instantly at checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {promoCodes.map((promo) => {
            const minSpend = regionCode === 'PKR' ? promo.minOrderPKR : promo.minOrderAED;
            return (
              <div
                key={promo.code}
                className="bg-white p-6 rounded-3xl border border-[#E5D9EE] hover:border-[#5D3891] transition-all flex flex-col justify-between space-y-4 shadow-luxury-card"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#5D3891] bg-[#F3ECF8] px-3 py-1 rounded-xl border border-[#EAE0F2]">
                      {promo.code}
                    </span>
                    <span className="text-[10px] font-bold text-[#5D3891] bg-[#F3ECF8] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {promo.discountPercent ? `${promo.discountPercent}% OFF` : 'COMPLIMENTARY'}
                    </span>
                  </div>

                  <p className="text-xs text-[#6E5D7E] mt-4 leading-relaxed font-sans">
                    {promo.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3ECF8] flex items-center justify-between">
                  <span className="text-[10.5px] text-[#6E5D7E] font-sans">
                    Min order: {formatAmount(minSpend)}
                  </span>
                  <button
                    onClick={() => handleCopyCode(promo.code)}
                    className="text-[11px] font-bold text-[#5D3891] hover:text-[#4A2578] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700">Applied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Curated Ritual Bundles */}
      <section className="bg-gradient-to-r from-[#FAF7FC] via-[#F3ECF8] to-[#EAE0F2] py-16 border-y border-[#E5D9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891] block mb-1">
              Synergistic Formulations
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#221430]">
              Curated Gift & Ritual Bundles
            </h2>
            <p className="text-xs text-[#6E5D7E] mt-1 font-sans">
              Harmoniously paired formulations bundled with exclusive seasonal price privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bundles.map((bundle) => {
              const bundlePrice = bundle.prices[regionCode] || bundle.prices.PKR;
              const bundleOriginalPrice = bundle.originalPrices[regionCode] || bundle.originalPrices.PKR;
              return (
                <div
                  key={bundle.id}
                  className="bg-white rounded-3xl border border-[#E5D9EE] overflow-hidden shadow-luxury-card hover:shadow-luxury-card-hover transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-[#FAF7FC] overflow-hidden relative flex items-center justify-center p-4">
                    <img 
                      src={bundle.image} 
                      alt={bundle.title} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" 
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#5D3891] text-white text-[9px] uppercase font-bold tracking-wider rounded-full shadow-xs">
                      {bundle.badge}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#221430] leading-snug">
                        {bundle.title}
                      </h3>
                      <p className="text-xs text-[#6E5D7E] mt-1 font-sans">{bundle.subtitle}</p>

                      <ul className="mt-4 space-y-1.5 text-xs text-[#6E5D7E] font-sans">
                        {bundle.items.map((it, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#5D3891] shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#F3ECF8] flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xl font-bold text-[#221430] block">
                          {formatAmount(bundlePrice)}
                        </span>
                        <span className="font-mono text-xs text-[#6E5D7E] line-through">
                          {formatAmount(bundleOriginalPrice)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddBundle(bundle)}
                        className="px-5 py-2.5 bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors rounded-full shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Bundle</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Discounted Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 border-b border-[#E5D9EE] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891] block mb-1">
              Seasonal Markdowns
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#221430]">
              Formulations with Privileged Pricing
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-[11px] font-bold text-[#5D3891] hover:text-[#4A2578] uppercase tracking-wider flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
