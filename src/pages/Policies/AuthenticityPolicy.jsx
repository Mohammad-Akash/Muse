import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { ShieldCheck, Award, Sparkles, Check } from 'lucide-react';

export default function AuthenticityPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Authenticity Guarantee' }]} />

      <div className="space-y-2 border-b border-neutral-200 pb-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C96F42]">
          Maison Seal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900">
          Product Authenticity & Purity Guarantee
        </h1>
        <p className="text-xs text-neutral-500">Maison MUJER Official Registry</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-neutral-200 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">Direct From European Formulation Laboratories</h2>
          <p>
            Maison MUJER guarantees 100% authenticity on every formulation sold via our digital flagship. Unlike third-party resellers or unauthorized marketplaces, every item is shipped directly from our sealed, climate-regulated regional vaults.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">Our Anti-Counterfeit Verification Protocol</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FFF9F4] rounded border border-neutral-200">
              <p className="font-serif text-base font-semibold text-[#C96F42]">Laser Engraved Serials</p>
              <p className="text-xs text-neutral-600 mt-1">Every flacon and compact carries an individual laser-etched serial matching its certificate.</p>
            </div>
            <div className="p-4 bg-[#FFF9F4] rounded border border-neutral-200">
              <p className="font-serif text-base font-semibold text-[#C96F42]">Tamper Evident Seals</p>
              <p className="text-xs text-neutral-600 mt-1">Metallic burgundy security tape that indicates any unauthorized package interference.</p>
            </div>
            <div className="p-4 bg-[#FFF9F4] rounded border border-neutral-200">
              <p className="font-serif text-base font-semibold text-[#C96F42]">Batch Purity Tests</p>
              <p className="text-xs text-neutral-600 mt-1">Independent chromatographic assays verifying heavy-metal and allergen absence.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
