import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How does MUJER preserve active formulations during delivery in warm climates?",
      a: "Every MUJER shipment is encased in temperature-shielded thermal insulated packaging with miniature gel cooling inserts for long transit. This guarantees that delicate active antioxidants, pure Vitamin C, and rose wax emollients arrive at full biological potency."
    },
    {
      q: "Can I pay via Cash on Delivery in Pakistan and the United Arab Emirates?",
      a: "Yes. Cash on Delivery (COD) is supported across all major metropolitan and suburban postal codes in Pakistan (PKR) and the UAE (AED). You may inspect package seals upon delivery and remit funds directly to the courier."
    },
    {
      q: "Are MUJER cosmetics cruelty-free and dermatologically validated?",
      a: "Uncompromisingly. Maison MUJER never tests on animals at any stage of formulation or raw ingredient synthesis. All formulations undergo independent patch testing and dermal tolerance validation in Switzerland and France."
    },
    {
      q: "What is your complimentary return and shade exchange policy?",
      a: "We offer a 14-day doorstep return privilege on all unopened and undamaged products. If you ordered an incorrect lipstick or foundation shade, our concierge will arrange a doorstep courier swap free of additional delivery charges."
    },
    {
      q: "How do I choose the ideal foundation or lipstick shade for warm undertones?",
      a: "Our Haute Velvet Lipsticks and Silk Fluid Foundations are color-balanced specifically for radiant olive, neutral, and warm South Asian / Gulf undertones. Bordeaux 09 and Silk Fluid Shade 02-03 are internationally renowned bestsellers."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C96F42]">
          Maison Guidance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Answers concerning formulations, regional deliveries, payment protocols, and shade selection.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100 shadow-xs">
        {faqs.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="p-5">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full text-left flex items-center justify-between gap-4 font-serif text-base font-semibold text-neutral-900 hover:text-[#C96F42] transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#C96F42]' : ''}`} />
              </button>
              {isOpen && (
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans pr-6">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
