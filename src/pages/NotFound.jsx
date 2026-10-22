import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#FCEEE6] text-[#C96F42] flex items-center justify-center mx-auto border border-[#F5DFD1]">
        <Sparkles className="w-8 h-8" />
      </div>

      <span className="font-mono text-sm tracking-widest text-[#C96F42] font-semibold block uppercase">
        Error 404 · Uncharted Sanctuary
      </span>

      <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-neutral-900 leading-tight">
        This Formulation Page Does Not Exist
      </h1>

      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
        The boutique salon address you sought may have retired or relocated. Allow us to escort you back to our active cosmetic collections.
      </p>

      <div className="pt-2 flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#C96F42] hover:bg-[#B85C30] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
        >
          Explore Shop
        </Link>
      </div>
    </div>
  );
}
