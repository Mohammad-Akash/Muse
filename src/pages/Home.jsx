import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Droplet, 
  Sun, 
  Feather, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  Search,
  SlidersHorizontal,
  Tag,
  Flower2,
  Truck,
  Heart,
  Smile,
  Palette,
  Flame,
  ShoppingBag,
  Headphones,
  Check
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard.jsx';
import { products } from '../data/products.js';
import { customerReviews } from '../data/reviews.js';
import { useRegion } from '../context/RegionContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Home() {
  const { openQuickView } = useOutletContext();
  const { formatAmount } = useRegion();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('radiance');
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: 'NATURAL SKINCARE',
      title: 'Glowing Skin,',
      subtitle: 'Naturally',
      description: 'Discover our collection of natural skincare, crafted to reveal the radiant beauty of your skin while protecting its delicate barrier.',
      ctaText: 'Discover the Collection',
      ctaLink: '/shop',
      image: '/public/assets/aistudio/image_f416e424.png',
      fallbackImage: '/src/assets/images/hero_mujer_campaign_1792565253091.jpg',
      featuredProduct: 'Hydrating Cream & Radiance Serum'
    },
    {
      badge: 'EXCLUSIVE PRIVILEGE',
      title: 'Botanical Night Ritual,',
      subtitle: 'Precious Elixir',
      description: 'A luxurious alliance of fine lavender oils and botanical peptides for complete overnight cellular renewal.',
      ctaText: 'Explore the Set',
      ctaLink: '/offers',
      image: '/src/assets/images/luxury_gift_set_1792567974413.jpg',
      featuredProduct: 'Lavender Prestige Coffret'
    }
  ];

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // 4 Featured Bestsellers matching the reference cards
  const bestsellers = [
    products.find(p => p.id === 'cellular-repair-creme-veloutee'),
    products.find(p => p.id === 'lumiere-elixir-serum'),
    products.find(p => p.id === 'sun-shield-invisible-spf50'),
    products.find(p => p.id === 'rose-damber-eau-de-parfum')
  ].filter(Boolean);

  // 6 Categories matching the reference cards
  const categoriesList = [
    { name: 'Face Care', slug: 'skincare', icon: Smile, count: '4 Products' },
    { name: 'Body Care', slug: 'body-care', icon: Flower2, count: '3 Products' },
    { name: 'Hair Care', slug: 'haircare', icon: Feather, count: 'Nectars' },
    { name: 'Makeup', slug: 'makeup', icon: Palette, count: 'Face & Lips' },
    { name: 'Fragrances', slug: 'fragrances', icon: Flame, count: 'Eau de Parfum' },
    { name: 'Accessories', slug: 'beauty-accessories', icon: ShoppingBag, count: 'Beauty Tools' }
  ];

  const skinConcerns = [
    {
      id: 'radiance',
      name: 'Radiance & Glow',
      icon: Sun,
      description: 'Awaken a fresh, luminous complexion with stabilized vitamin C and pure botanical extracts.',
      recommendedProductId: 'lumiere-elixir-serum'
    },
    {
      id: 'hydration',
      name: 'Deep Hydration & Barrier',
      icon: Droplet,
      description: 'Reinforce the lipid moisture barrier with biomimetic ceramides and Spanish olive squalane.',
      recommendedProductId: 'cellular-repair-creme-veloutee'
    },
    {
      id: 'uvdefense',
      name: 'Mineral Defense & Anti-Aging',
      icon: Feather,
      description: 'Invisible SPF 50+ mineral filter infused with white tea antioxidants and calming lavender.',
      recommendedProductId: 'sun-shield-invisible-spf50'
    }
  ];

  const currentConcern = skinConcerns.find(c => c.id === selectedConcern) || skinConcerns[0];
  const recommendedProduct = products.find(p => p.id === currentConcern.recommendedProductId) || products[0];

  return (
    <div className="space-y-14 sm:space-y-20 pb-20">
      
      {/* 1. Main Hero Campaign Banner (Matching Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#FAF6FC] via-[#F3ECF8] to-[#E9DCF3] border border-[#E5D9EE] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-luxury-md">
          
          {/* Subtle Ambient Lilac Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#EAE0F2]/70 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FAF7FC]/80 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Category Subtitle (matching reference: SOINS DE LA PEAU NATURELS) */}
              <div className="inline-block text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#5D3891]">
                {heroSlides[activeSlide].badge}
              </div>

              {/* Editorial Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#221430] leading-[1.12] tracking-tight">
                {heroSlides[activeSlide].title} <br />
                <span className="italic text-[#5D3891]">
                  {heroSlides[activeSlide].subtitle}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#6E5D7E] max-w-lg leading-relaxed font-sans">
                {heroSlides[activeSlide].description}
              </p>

              {/* Primary Pill Button (matching reference: Découvrir la collection >) */}
              <div className="pt-2">
                <Link
                  to={heroSlides[activeSlide].ctaLink}
                  className="inline-flex items-center gap-2.5 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs sm:text-sm font-semibold px-7 sm:px-9 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>{heroSlides[activeSlide].ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 3 Trust Highlights beneath CTA (matching reference image) */}
              <div className="pt-4 border-t border-[#DECDEB]/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#221430] font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/80 border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] shrink-0">
                    <Flower2 className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="font-medium text-[11.5px] text-[#221430]">
                    100% Safe Natural Formulas
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/80 border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] shrink-0">
                    <Truck className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="font-medium text-[11.5px] text-[#221430]">
                    Fast Nationwide Delivery
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/80 border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] shrink-0">
                    <Heart className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="font-medium text-[11.5px] text-[#221430]">
                    Satisfaction Guaranteed
                  </span>
                </div>
              </div>

            </div>

            {/* Right Hero Product Staging (matching reference image) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative aspect-[4/4.2] w-full max-w-md rounded-3xl overflow-hidden shadow-luxury-lg border border-white/80 bg-white/60 backdrop-blur-xs flex items-center justify-center p-3">
                <img
                  src="/src/assets/images/hero_mujer_campaign_1792565253091.jpg"
                  alt={heroSlides[activeSlide].title}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Floating "Natural Beauty" Badge (matching reference top-right badge) */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-2.5 border border-[#E5D9EE] shadow-md flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center">
                    <Flower2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="text-left leading-none">
                    <span className="text-[10.5px] font-bold text-[#221430] block">Natural</span>
                    <span className="text-[9.5px] text-[#5D3891] font-semibold">Beauty</span>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-[#E5D9EE] shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[9.5px] uppercase tracking-wider font-bold text-[#5D3891]">Glowora Signature</p>
                    <p className="text-xs font-bold text-[#221430] truncate">{heroSlides[activeSlide].featuredProduct}</p>
                  </div>
                  <Link
                    to="/shop"
                    className="text-[11px] font-bold text-[#5D3891] hover:text-[#4A2578] flex items-center gap-1"
                  >
                    <span>Discover</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? 'w-6 h-2 bg-[#5D3891]'
                    : 'w-2 h-2 bg-[#DECDEB] hover:bg-[#5D3891]/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 2. Categories Row: "OUR CATEGORIES — Explore Our Universes" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 border-b border-[#E5D9EE] pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5D3891] block mb-1">
              Our Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#221430] tracking-tight font-serif">
              Explore Our Universes
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-[#5D3891] hover:text-[#4A2578] flex items-center gap-1 transition-colors"
          >
            <span>View all categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Category Rounded Pill Boxes (matching reference) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-[#F3ECF8] hover:bg-[#EAE0F2] border border-[#E5D9EE] hover:border-[#5D3891]/30 transition-all duration-200 text-center shadow-2xs hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#5D3891] group-hover:scale-110 transition-transform mb-3 shadow-2xs">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h3 className="font-sans text-xs font-semibold text-[#221430] group-hover:text-[#5D3891] transition-colors">
                  {cat.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 border-b border-[#E5D9EE] pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5D3891] block mb-1">
              Featured Formulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#221430] tracking-tight font-serif">
              Most Loved Bestsellers
            </h2>
          </div>

          {/* Carousel Navigation Arrows matching reference */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/shop')}
              className="w-9 h-9 rounded-full border border-[#E5D9EE] bg-white flex items-center justify-center text-[#221430] hover:text-[#5D3891] hover:border-[#5D3891] transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="w-9 h-9 rounded-full border border-[#E5D9EE] bg-white flex items-center justify-center text-[#221430] hover:text-[#5D3891] hover:border-[#5D3891] transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid with full width Add to Bag buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </section>

      {/* 4. Special Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-[#EDE4F5] via-[#E8DCF2] to-[#DFCEEE] border border-[#DECDEB] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-luxury-md">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Offer Details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/95 border border-[#DECDEB] text-[10px] sm:text-[11px] font-bold text-[#5D3891] uppercase tracking-[0.16em] shadow-2xs">
                Special Offer
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#221430] leading-tight">
                Up to <span className="font-bold text-[#5D3891]">25% off our entire</span> <br />
                facial skincare line
              </h3>

              <p className="text-xs sm:text-sm text-[#6E5D7E] max-w-md font-sans">
                Indulge in self-care, you deserve it. Pure botanical actives and deep cellular hydration to unveil your royal radiance.
              </p>

              <div className="pt-2">
                <Link
                  to="/offers"
                  className="inline-flex items-center gap-2 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <span>View Offer</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Smiling Model & Script Calligraphy (matching reference) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative aspect-[4/3] w-full max-w-sm rounded-3xl overflow-hidden shadow-luxury-lg border border-white/80 bg-white">
                <img
                  src="/src/assets/images/hero_mujer_campaign_1792565253091.jpg"
                  alt="Radiance Facial Skincare"
                  className="w-full h-full object-cover"
                />

                {/* Elegant Handwritten Calligraphy Note overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <p className="font-serif italic text-xl sm:text-2xl text-[#FAF7FC] drop-shadow-sm">
                    Your beauty, our priority 💜
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Four Trust Pillars Row (matching reference icons and layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E5D9EE] p-6 sm:p-8 shadow-luxury-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#F3ECF8]">
            
            <div className="flex items-center gap-4 px-2 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#F3ECF8] border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] shrink-0">
                <Flower2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#221430]">100% Natural Formulas</h4>
                <p className="text-xs text-[#6E5D7E] mt-0.5">Clean, sustainable botanical beauty</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#F3ECF8] border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] shrink-0">
                <Truck className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#221430]">Express Delivery</h4>
                <p className="text-xs text-[#6E5D7E] mt-0.5">Tracked courier shipping in 48h</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#F3ECF8] border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#221430]">Secure Payment</h4>
                <p className="text-xs text-[#6E5D7E] mt-0.5">Encrypted checkout & Cash on Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#F3ECF8] border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] shrink-0">
                <Headphones className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#221430]">Client Concierge</h4>
                <p className="text-xs text-[#6E5D7E] mt-0.5">Beauty advisors available 7 days a week</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Interactive Diagnostic Routine Finder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl sm:rounded-[2rem] border border-[#E5D9EE] p-6 sm:p-10 shadow-luxury-card">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5D3891] block mb-1">
              Bespoke Skin Diagnosis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#221430] tracking-tight font-serif">
              Targeted Botanical Solutions
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5D7E] mt-1">
              Select your primary skincare goal to discover your personalized Glowora prescription
            </p>
          </div>

          {/* Concern Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {skinConcerns.map((concern) => {
              const Icon = concern.icon;
              const isSelected = selectedConcern === concern.id;
              return (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcern(concern.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#5D3891] text-white shadow-sm'
                      : 'bg-[#F3ECF8] text-[#6E5D7E] hover:text-[#221430] border border-[#E5D9EE]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{concern.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Diagnostic Recommendation Box */}
          {recommendedProduct && (
            <div className="bg-[#FAF7FC] rounded-2xl p-6 sm:p-8 border border-[#E5D9EE] flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-2 border border-[#E5D9EE] shrink-0">
                <img
                  src={recommendedProduct.images[0]}
                  alt={recommendedProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5D3891]">
                  Recommended Prescription
                </span>
                <h3 className="font-serif text-xl font-bold text-[#221430]">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5D7E] max-w-xl">
                  {currentConcern.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <span className="text-base font-bold text-[#221430]">
                    {formatAmount(recommendedProduct.prices.PKR)}
                  </span>
                  <Link
                    to={`/product/${recommendedProduct.id}`}
                    className="inline-flex items-center gap-1.5 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors shadow-xs"
                  >
                    <span>View Formulation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Client Reviews with Purple Stars (matching reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5D3891] block mb-1">
            Client Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#221430] tracking-tight font-serif">
            Loved by Our Community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5D9EE] shadow-luxury-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#5D3891] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#221430] leading-relaxed italic font-serif">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F3ECF8] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#221430]">{review.author}</p>
                  <p className="text-[10px] text-[#6E5D7E]">{review.location}</p>
                </div>
                <span className="text-[10px] font-semibold text-[#5D3891] bg-[#F3ECF8] px-2.5 py-0.5 rounded-full">
                  Verified Purchase
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
