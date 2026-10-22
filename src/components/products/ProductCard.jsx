import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check, Eye } from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product, onQuickView }) {
  const { formatAmount, getProductPrice, getProductOriginalPrice } = useRegion();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const price = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Determine percentage discount badge like reference image (-20%, -15%, -10%)
  const discountVal = product.discountPercent || (originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : null);

  return (
    <div className="group flex flex-col bg-white border border-[#E5D9EE] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#5D3891]/40 shadow-luxury-card hover:shadow-luxury-card-hover transition-all duration-300 relative">
      
      {/* Product Image Area with soft lavender inset (matching reference) */}
      <div className="relative aspect-[4/4.2] bg-[#F7F3FB] p-4 sm:p-5 flex items-center justify-center overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Purple Discount Badge (Top Left - matching reference image '-20%') */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
          {discountVal ? (
            <span className="bg-[#5D3891] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              -{discountVal}%
            </span>
          ) : product.isBestseller ? (
            <span className="bg-[#5D3891] text-white text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              Bestseller
            </span>
          ) : product.isNew ? (
            <span className="bg-[#F3ECF8] text-[#5D3891] text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#DECDEB]">
              New
            </span>
          ) : null}
        </div>

        {/* Quick View Button on Desktop Hover */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 text-[#221430] hover:text-[#5D3891] text-[11px] font-semibold py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md border border-[#E5D9EE] hidden sm:flex items-center gap-1.5 z-10"
            aria-label={`Quick view for ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}

        {/* Wishlist Toggle Button (Top Right circular button - matching reference) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-2xs ${
            isWishlisted
              ? 'bg-[#5D3891] text-white shadow-sm'
              : 'bg-white/90 hover:bg-white text-[#6E5D7E] hover:text-[#5D3891] border border-[#E5D9EE]/80'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-sans text-[14px] sm:text-[15px] font-medium text-[#221430] hover:text-[#5D3891] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Star Rating with review count - Purple Stars (matching reference image) */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-[#5D3891]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[11px] text-[#6E5D7E] font-sans">
              ({product.reviewCount || 124})
            </span>
          </div>

          {/* Price with strikethrough original */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[15px] sm:text-[16px] font-bold text-[#221430] tabular-nums font-sans">
              {formatAmount(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-[#8F7F9E] line-through tabular-nums font-sans">
                {formatAmount(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Full-width "Add to Bag" Button (matching reference image) */}
        <div className="pt-3 mt-2">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-full flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white scale-[1.02]'
                : 'bg-[#5D3891] hover:bg-[#4A2578] text-white hover:shadow-md active:scale-[0.98]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
