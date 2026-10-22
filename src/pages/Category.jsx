import React, { useMemo } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Category() {
  const { slug } = useParams();
  const { openQuickView } = useOutletContext();

  const currentCategory = useMemo(() => {
    return categories.find(c => c.slug === slug) || {
      slug: slug || 'skincare',
      name: (slug || 'Category').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      headline: 'Refined Formulations for Haute Care',
      description: 'Discover specialized formulas, luxurious pigments, and restorative botanical actives created for lasting radiance.',
      heroImage: '/src/assets/images/product_serum_elixir_1792565254298.jpg',
      tags: ['Bestsellers', 'New Arrivals', 'Signature']
    };
  }, [slug]);

  // Find products belonging to this category or subcategory
  const categoryProducts = useMemo(() => {
    const s = slug ? slug.toLowerCase() : '';
    return products.filter(p => {
      const cat = p.category.toLowerCase().replace(/\s+/g, '-');
      const subcat = p.subcategory ? p.subcategory.toLowerCase().replace(/\s+/g, '-') : '';
      return cat === s || subcat === s || p.category.toLowerCase() === s;
    });
  }, [slug]);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Category Editorial Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#FAF7FC] via-[#F3ECF8] to-[#EAE0F2] text-[#221430] overflow-hidden border-b border-[#E5D9EE]">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 hidden md:block pointer-events-none">
          <img
            src={currentCategory.heroImage}
            alt={currentCategory.name}
            className="w-full h-full object-contain p-8"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10">
          <div className="max-w-xl space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Shop', to: '/shop' },
                { label: currentCategory.name }
              ]}
            />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 text-[10px] uppercase tracking-wider font-bold text-[#5D3891] border border-[#E5D9EE] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5D3891]" />
              <span>Glowora Salon de Beauté</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#221430] leading-tight">
              {currentCategory.headline}
            </h1>

            <p className="text-xs sm:text-sm text-[#6E5D7E] leading-relaxed font-sans">
              {currentCategory.description}
            </p>

            {/* Sub-tags */}
            {currentCategory.tags && currentCategory.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans">
                {currentCategory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 bg-white/90 text-[#221430] border border-[#E5D9EE] rounded-full text-[11px] font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#E5D9EE] pb-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#221430]">
              {currentCategory.name} Formulations
            </h2>
            <p className="text-xs text-[#6E5D7E] mt-1 font-sans">
              Showing {categoryProducts.length} certified items
            </p>
          </div>

          <Link
            to="/shop"
            className="text-[11px] font-bold uppercase tracking-wider text-[#5D3891] hover:text-[#4A2578] flex items-center gap-1 transition-colors"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-[#E5D9EE] shadow-luxury-card">
            <h3 className="font-serif text-xl font-normal text-[#221430]">
              No items currently listed in this subcategory.
            </h3>
            <p className="text-xs text-[#6E5D7E] mt-2 font-sans">
              Explore our full catalog to discover available formulas.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-5 px-7 py-3 bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] uppercase tracking-wider font-bold rounded-full shadow-md"
            >
              Browse Complete Boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
