import React from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-2 border-b border-neutral-200 pb-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C96F42]">
          Legal & Trust
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-900">
          Privacy & Data Protection Policy
        </h1>
        <p className="text-xs text-neutral-500">Last Revised: October 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg border border-neutral-200 shadow-xs space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">1. Information We Collect</h2>
          <p>
            When you interact with the MUJER digital flagship, we collect information required to complete your beauty orders: contact coordinates (name, email, mobile phone), shipping address, and order transaction records. We do not sell your personal details to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">2. Utilization of Data</h2>
          <p>
            Your information enables doorstep courier coordination, transactional SMS notifications, fraud defense, and personalized beauty recommendations tailored to your declared skin concerns.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-semibold text-neutral-900">3. 256-Bit Cryptographic Security</h2>
          <p>
            All network communication with our boutique is protected via TLS 1.3 encryption. Saved preferences and authentication sessions are guarded according to global ISO/IEC standards.
          </p>
        </section>
      </div>
    </div>
  );
}
