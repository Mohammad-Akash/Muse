import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { Truck, ShieldCheck, ThermometerSnowflake, Clock } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Shipping & Delivery Policy' }]} />

      <div className="space-y-2 border-b border-neutral-200 pb-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C96F42]">
          Courier Protocols
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: October 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-neutral-200 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">1. Regional Fulfillment Zones</h2>
          <p>
            Maison MUJER operates dual luxury distribution hubs located in <strong>Lahore, Pakistan</strong> and <strong>Dubai, United Arab Emirates</strong>. This localized presence ensures minimal transit exposure and rapid doorstep dispatch.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">2. Delivery Timeframes & Thresholds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#FFF9F4] rounded border border-neutral-200 space-y-1">
              <p className="font-semibold text-neutral-900">Pakistan Metropolitan & Cities</p>
              <p className="text-xs text-neutral-600">Transit: 2–3 business days via Express Insured Courier.</p>
              <p className="text-xs text-[#C96F42] font-semibold">Free Shipping on orders above PKR 5,000</p>
            </div>
            <div className="p-4 bg-[#FFF9F4] rounded border border-neutral-200 space-y-1">
              <p className="font-semibold text-neutral-900">United Arab Emirates & Gulf</p>
              <p className="text-xs text-neutral-600">Transit: 1–2 business days via Emirates Luxury Post.</p>
              <p className="text-xs text-[#C96F42] font-semibold">Free Shipping on orders above AED 150</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">3. Temperature-Shielded Packaging</h2>
          <p>
            Cosmetic actives, especially stabilized ascorbic acid (Vitamin C), botanical squalane, and unrefined damask rose waxes, are sensitive to sustained heat. MUJER ships all skincare formulations inside climate-shielded thermal foil pouches with cooling gel buffers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">4. Tracking & Notification</h2>
          <p>
            Immediately upon courier collection, an encrypted tracking link is issued via SMS and email. Recipients may reschedule delivery windows or coordinate doorstep drop-offs directly with the courier driver.
          </p>
        </section>
      </div>
    </div>
  );
}
