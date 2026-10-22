import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function About() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FAF7FC] via-[#F3ECF8] to-[#EAE0F2] text-[#221430] py-20 border-b border-[#E5D9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Maison Heritage' }]} />
          
          <div className="mt-8 max-w-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891]">
              Origin & Haute Parfumerie Heritage
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#221430] leading-[1.08]">
              The Architecture of Beauty
            </h1>
            <p className="text-sm sm:text-base text-[#6E5D7E] leading-relaxed font-sans">
              Founded on the belief that cosmetics should awaken personal sovereignty, Glowora fuses centuries-old French floral extraction with modern biocompatible Swiss cellular science.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891]">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#221430] leading-tight">
              Purity Without Compromise, Radiance Without Masking
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5D7E] leading-relaxed font-sans">
              In a landscape inundated by disposable fast-beauty, Glowora was conceived as a sanctuary of permanence. Every formulation—from our deep Bordeaux velvet lipsticks to our multi-molecular brightening elixirs—is crafted in small, deliberate batches using only the highest grade certified ingredients.
            </p>
            <p className="text-xs sm:text-sm text-[#6E5D7E] leading-relaxed font-sans">
              We reject fillers, harsh sulfates, synthetic phthalates, and unnecessary water dilution. What touches your skin is pure, bio-active potency.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-5 bg-white rounded-2xl border border-[#E5D9EE] shadow-luxury-card">
                <p className="font-serif text-base font-bold text-[#5D3891]">Grasse & Zurich</p>
                <p className="text-[#6E5D7E] mt-1">Formulated across premier European beauty laboratories</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-[#E5D9EE] shadow-luxury-card">
                <p className="font-serif text-base font-bold text-[#5D3891]">Zero Animal Testing</p>
                <p className="text-[#6E5D7E] mt-1">Leaping Bunny certified cruelty-free standard</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-luxury-lg border border-[#E5D9EE] p-2">
              <img
                src="/src/assets/images/hero_mujer_campaign_1792565253091.jpg"
                alt="House of Glowora"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 border-y border-[#E5D9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891]">
              Core Pillars
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#221430]">
              The Three Tenets of Glowora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl border border-[#E5D9EE] bg-[#FAF7FC] space-y-3 shadow-luxury-card">
              <div className="w-10 h-10 rounded-full border border-[#E5D9EE] bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-[#221430]">Biocompatible Actives</h3>
              <p className="text-xs text-[#6E5D7E] leading-relaxed font-sans">
                Formulas that work harmoniously with skin cell receptors, preventing sensitization while maximizing cellular turnover.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-[#E5D9EE] bg-[#FAF7FC] space-y-3 shadow-luxury-card">
              <div className="w-10 h-10 rounded-full border border-[#E5D9EE] bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-[#221430]">Sensorial Tactility</h3>
              <p className="text-xs text-[#6E5D7E] leading-relaxed font-sans">
                From weighted metal cases with magnetic snaps to cashmere-plush lip textures, the tactile experience is as memorable as the visual outcome.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-[#E5D9EE] bg-[#FAF7FC] space-y-3 shadow-luxury-card">
              <div className="w-10 h-10 rounded-full border border-[#E5D9EE] bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-[#221430]">Climate Invariance</h3>
              <p className="text-xs text-[#6E5D7E] leading-relaxed font-sans">
                Formulations specifically stabilized for high heat, monsoon humidity, and arid desert air across Pakistan and GCC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FAF7FC] via-[#F3ECF8] to-[#EAE0F2] p-10 sm:p-14 border border-[#E5D9EE] text-center max-w-3xl mx-auto space-y-6 shadow-luxury-card">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891]">
            Begin Your Ritual
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#221430]">
            Experience Glowora Haute Cosmétique
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5D7E] max-w-lg mx-auto leading-relaxed font-sans">
            Explore our curated catalog of certified botanical skincare, couture velvet lipsticks, and rare perfumes.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs uppercase tracking-wider font-bold rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <span>Explore The Boutique</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
