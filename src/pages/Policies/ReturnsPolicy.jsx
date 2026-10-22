import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { RotateCcw, ShieldCheck, Check } from 'lucide-react';

export default function ReturnsPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Returns & Refund Policy' }]} />

      <div className="space-y-2 border-b border-neutral-200 pb-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C96F42]">
          Client Satisfaction Assurance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900">
          Returns, Exchanges & Refund Policy
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: October 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-neutral-200 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">1. The 14-Day Doorstep Privilege</h2>
          <p>
            Maison MUJER provides a complimentary <strong>14-day return and exchange guarantee</strong>. If you are not completely enchanted by your unopened formulation, or if you wish to adjust shade choice, you may request a courier collection directly from your client account dashboard.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">2. Hygiene & Condition Requirements</h2>
          <p>
            Due to strict medical, sanitary, and dermatological guidelines governing luxury cosmetics, returned items must be in their original, unopened packaging with all factory safety seals and tamper-evident stickers intact.
          </p>
          <ul className="space-y-1.5 pt-1 text-xs">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Unopened boxes with intact protective cellophane</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Bottles and droppers free of pump actuation</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Unswatched lipstick bullets in pristine case</span>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">3. Rapid Refund Settlement</h2>
          <p>
            Once inspected by our quality laboratory, refunds are credited within 3–5 business days to your original payment method, or issued as an immediate digital store credit. For Cash on Delivery orders, bank transfer or digital voucher is arranged.
          </p>
        </section>
      </div>
    </div>
  );
}
