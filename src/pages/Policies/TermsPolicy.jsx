import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';

export default function TermsPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

      <div className="space-y-2 border-b border-neutral-200 pb-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C96F42]">
          Terms of Service
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900">
          Terms & Conditions
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: October 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-neutral-200 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">1. Acceptance of Terms</h2>
          <p>
            By browsing, interacting with, or placing purchase orders through MUJER Haute Cosmétique, you enter into a legally binding agreement in accordance with regional consumer protection regulations in Pakistan and the United Arab Emirates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">2. Regional Currency & Invoicing</h2>
          <p>
            Orders destined for delivery within Pakistan are priced and transacted in Pakistani Rupees (PKR). Orders delivered across the Gulf Cooperation Council are denominated in UAE Dirhams (AED). Product listings reflect genuine inventory allocations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">3. Intellectual Property</h2>
          <p>
            All brand trademarks, trade dress, formulation titles, custom flacon designs, photography, and editorial journal text remain the sole exclusive property of Maison MUJER.
          </p>
        </section>
      </div>
    </div>
  );
}
