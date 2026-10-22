import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useRegion } from '../context/RegionContext.jsx';

export default function Wishlist() {
  const { wishlistProducts, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatAmount, getProductPrice } = useRegion();
  const { openQuickView } = useOutletContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      <div className="border-b border-[#E5D9EE] pb-4 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#5D3891] block mb-1">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#221430]">
            My Desired Formulations ({wishlistProducts.length})
          </h1>
        </div>
        <Link to="/shop" className="text-[11px] uppercase tracking-wider font-semibold text-[#5D3891] hover:text-[#4A2578] transition-colors">
          Explore All Products →
        </Link>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white p-12 sm:p-16 text-center border border-[#E5D9EE] max-w-lg mx-auto space-y-4 rounded-3xl shadow-luxury-card">
          <div className="w-16 h-16 border border-[#E5D9EE] bg-[#FAF7FC] rounded-full flex items-center justify-center mx-auto text-[#5D3891] shadow-2xs">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-[#221430]">
            Your sanctuary is currently unadorned
          </h2>
          <p className="text-xs text-[#6E5D7E] leading-relaxed max-w-sm mx-auto font-sans">
            Click the heart icon on any formulation to save items to your personal beauty sanctuary.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 bg-[#5D3891] hover:bg-[#4A2578] text-white text-[11px] uppercase tracking-wider font-bold rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Discover Formulations
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      )}

    </div>
  );
}
