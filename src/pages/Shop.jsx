import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { 
  Filter, 
  X, 
  Grid3X3, 
  LayoutList, 
  Search, 
  ChevronDown, 
  RotateCcw,
  SlidersHorizontal,
  Star
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { useRegion } from '../context/RegionContext.jsx';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openQuickView } = useOutletContext();
  const { formatAmount, regionCode, getProductPrice } = useRegion();

  // State from URL or defaults
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSkinType, setSelectedSkinType] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: regionCode === 'PKR' ? 40000 : 500 });
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL query changes
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Adjust max price range when region changes
  useEffect(() => {
    setPriceRange({ min: 0, max: regionCode === 'PKR' ? 40000 : 500 });
  }, [regionCode]);

  const brands = ['all', 'Glowora Skincare', 'Glowora Haute Cosmétique', 'Glowora Parfums', 'Glowora Haircare', 'Glowora Body Care', 'Glowora Accessories'];
  const skinTypes = ['all', 'All Skin Types', 'Dry & Mature', 'Sensitive', 'Normal & Combination'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query));
        if (!match) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase();
        const matchesCategory =
          p.category.toLowerCase() === cat ||
          (p.subcategory && p.subcategory.toLowerCase() === cat) ||
          (p.category.toLowerCase().replace(/\s+/g, '-') === cat);
        if (!matchesCategory) return false;
      }

      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }

      // Skin Type
      if (selectedSkinType !== 'all') {
        if (p.skinType !== selectedSkinType && p.skinType !== 'All Skin Types') {
          return false;
        }
      }

      // In Stock
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // Price
      const unitPrice = getProductPrice(p);
      if (unitPrice < priceRange.min || unitPrice > priceRange.max) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = getProductPrice(a);
      const priceB = getProductPrice(b);

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewCount - a.reviewCount;
    });
  }, [searchQuery, selectedCategory, selectedBrand, selectedSkinType, inStockOnly, minRating, priceRange, sortBy, regionCode]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedSkinType('all');
    setInStockOnly(false);
    setMinRating(0);
    setPriceRange({ min: 0, max: regionCode === 'PKR' ? 40000 : 500 });
    setSortBy('popularity');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedSkinType !== 'all' ||
    inStockOnly ||
    minRating > 0 ||
    searchQuery.trim() !== '' ||
    priceRange.min > 0 ||
    priceRange.max < (regionCode === 'PKR' ? 40000 : 500);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'Catalogue' }]} />

      {/* Page Header */}
      <div className="border-b border-[#E5D9EE] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#5D3891] block mb-1">
            Haute Cosmétique Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#221430] tracking-tight">
            {selectedCategory === 'all' ? 'All Beauty Formulations' : `${selectedCategory.replace('-', ' ').toUpperCase()}`}
          </h1>
          <p className="text-xs text-[#6E5D7E] mt-1">
            Displaying {filteredProducts.length} curated luxury formulations
          </p>
        </div>

        {/* Search inside shop */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-[#5D3891] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or active..."
              className="w-full pl-10 pr-8 py-2.5 text-xs border border-[#E5D9EE] rounded-full bg-white focus:outline-none focus:border-[#5D3891] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E5D7E] hover:text-[#221430]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Chips & View Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5D9EE] text-xs shadow-luxury-card">
        {/* Left: Mobile Filter Button + Active Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 bg-[#5D3891] text-white rounded-full font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-[#5D3891] hover:underline font-bold flex items-center gap-1 mr-2 text-[11px] uppercase tracking-wider"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}

          {/* Active chips */}
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3ECF8] rounded-full text-[#5D3891] border border-[#5D3891]/30 text-[11px] font-semibold">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="hover:text-[#4A2578]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedBrand !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3ECF8] rounded-full text-[#5D3891] border border-[#5D3891]/30 text-[11px] font-semibold">
              Maison: {selectedBrand}
              <button onClick={() => setSelectedBrand('all')} className="hover:text-[#4A2578]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3ECF8] rounded-full text-[#5D3891] border border-[#5D3891]/30 text-[11px] font-semibold">
              In Stock Only
              <button onClick={() => setInStockOnly(false)} className="hover:text-[#4A2578]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3ECF8] rounded-full text-[#5D3891] border border-[#5D3891]/30 text-[11px] font-semibold">
              Rating ≥ {minRating}★
              <button onClick={() => setMinRating(0)} className="hover:text-[#4A2578]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {/* Right: Sort & View Toggle */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#6E5D7E] font-semibold text-[11px] uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7FC] border border-[#E5D9EE] rounded-full px-3.5 py-1.5 text-xs text-[#221430] font-medium focus:outline-none focus:border-[#5D3891]"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center border border-[#E5D9EE] rounded-full p-0.5 bg-[#FAF7FC]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-[#5D3891]' : 'text-[#6E5D7E] hover:text-[#221430]'
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-2xs text-[#5D3891]' : 'text-[#6E5D7E] hover:text-[#221430]'
              }`}
              aria-label="List view"
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-[#E5D9EE] space-y-6 shadow-luxury-card">
          <div className="flex items-center justify-between border-b border-[#F3ECF8] pb-3">
            <h3 className="font-serif text-base font-bold text-[#221430] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#5D3891]" />
              <span>Refine Selection</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891] hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#221430] mb-3">
              Categories
            </h4>
            <div className="space-y-1 text-xs text-[#6E5D7E]">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left py-2 px-3 rounded-xl transition-colors font-medium ${
                  selectedCategory === 'all' ? 'bg-[#F3ECF8] text-[#5D3891] font-bold' : 'hover:bg-[#FAF7FC] text-[#221430]'
                }`}
              >
                All Categories ({products.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`w-full text-left py-2 px-3 rounded-xl transition-colors font-medium ${
                    selectedCategory.toLowerCase() === c.slug ? 'bg-[#F3ECF8] text-[#5D3891] font-bold' : 'hover:bg-[#FAF7FC] text-[#221430]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="pt-5 border-t border-[#F3ECF8]">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#221430] mb-3">
              Brand Maison
            </h4>
            <div className="space-y-1 text-xs text-[#6E5D7E]">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`w-full text-left py-2 px-3 rounded-xl transition-colors font-medium ${
                    selectedBrand === b ? 'bg-[#F3ECF8] text-[#5D3891] font-bold' : 'hover:bg-[#FAF7FC] text-[#221430]'
                  }`}
                >
                  {b === 'all' ? 'All Maisons' : b}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type Filter */}
          <div className="pt-5 border-t border-[#F3ECF8]">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#221430] mb-3">
              Skin Compatibility
            </h4>
            <div className="space-y-1 text-xs text-[#6E5D7E]">
              {skinTypes.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedSkinType(st)}
                  className={`w-full text-left py-2 px-3 rounded-xl transition-colors font-medium ${
                    selectedSkinType === st ? 'bg-[#F3ECF8] text-[#5D3891] font-bold' : 'hover:bg-[#FAF7FC] text-[#221430]'
                  }`}
                >
                  {st === 'all' ? 'All Formulations' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Availability / In Stock */}
          <div className="pt-5 border-t border-[#F3ECF8]">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#221430]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-md border-[#E5D9EE] text-[#5D3891] focus:ring-[#5D3891]"
              />
              <span>In-Stock Allocations Only</span>
            </label>
          </div>

          {/* Rating */}
          <div className="pt-5 border-t border-[#F3ECF8]">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#221430] mb-2.5">
              Client Commendations
            </h4>
            <div className="space-y-1 text-xs">
              {[4.5, 4.0, 0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`w-full flex items-center gap-1.5 py-2 px-3 rounded-xl transition-colors font-medium text-[#221430] ${
                    minRating === rate ? 'bg-[#F3ECF8] text-[#5D3891] font-bold' : 'hover:bg-[#FAF7FC]'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-[#5D3891] text-[#5D3891]" />
                  <span>{rate === 0 ? 'All Ratings' : `${rate} Stars & Above`}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Catalog Display Area */}
        <section className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-[#E5D9EE] shadow-luxury-card">
              <h3 className="font-serif text-2xl font-normal text-[#221430]">
                No beauty formulations matched your filter criteria.
              </h3>
              <p className="text-xs text-[#6E5D7E] mt-2 font-sans">
                Try widening your inquiry terms or resetting active filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-6 px-7 py-3 bg-[#5D3891] text-white text-[11px] uppercase tracking-wider font-bold rounded-full hover:bg-[#4A2578] transition-colors shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={openQuickView}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-5 rounded-2xl border border-[#E5D9EE] flex flex-col sm:flex-row gap-6 hover:shadow-luxury-card-hover transition-shadow shadow-luxury-card"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full sm:w-48 h-48 object-contain rounded-xl bg-[#FAF7FC] border border-[#E5D9EE] shrink-0 p-3"
                  />
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-wider text-[#6E5D7E]">
                        <span className="font-bold text-[#5D3891]">
                          {product.brand} · {product.category}
                        </span>
                        <span className="font-bold text-emerald-700">In Stock</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#221430] mt-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6E5D7E] mt-2 line-clamp-2 font-sans leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F3ECF8] flex items-center justify-between">
                      <div className="font-sans text-xl font-bold text-[#221430]">
                        {formatAmount(getProductPrice(product))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openQuickView(product)}
                          className="px-5 py-2.5 border border-[#E5D9EE] rounded-full text-[11px] uppercase tracking-wider font-bold hover:border-[#5D3891] hover:text-[#5D3891] transition-colors bg-[#FAF7FC]"
                        >
                          Quick Inspect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
