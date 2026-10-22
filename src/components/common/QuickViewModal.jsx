import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const { formatAmount, getProductPrice, getProductOriginalPrice } = useRegion();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState(
    product.sizes?.[0] || product.shades?.[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const price = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#190D25]/65 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-luxury-lg max-w-3xl w-full overflow-hidden border border-[#E5D9EE] z-10 flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/95 hover:bg-white text-[#6E5D7E] hover:text-[#221430] shadow-2xs transition-colors border border-[#E5D9EE]"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gallery / Image Left */}
        <div className="md:w-1/2 bg-[#FAF7FC] p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#E5D9EE]">
          <div className="w-full aspect-[4/4.2] rounded-2xl overflow-hidden shadow-2xs relative bg-white flex items-center justify-center p-4 border border-[#E5D9EE]/60">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border transition-all p-1 bg-white ${
                    activeImageIndex === idx ? 'border-[#5D3891] shadow-xs ring-1 ring-[#5D3891]' : 'border-[#E5D9EE] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-[10.5px] uppercase tracking-wider text-[#6E5D7E] font-sans font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5D3891]" />
            <span>Formulation 100% Authentique Glowora</span>
          </div>
        </div>

        {/* Details Right */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-[10.5px] uppercase tracking-wider font-bold text-[#5D3891] mb-1.5 font-sans">
              {product.brand} · {product.category}
            </div>

            <h2 className="font-serif text-2xl font-normal text-[#221430] leading-snug tracking-tight">
              {product.name}
            </h2>

            {/* Rating with purple stars */}
            <div className="flex items-center gap-2 mt-2 text-xs font-sans">
              <div className="flex items-center text-[#5D3891]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#221430] tabular-nums">{product.rating}</span>
              <span className="text-[#6E5D7E]">·</span>
              <span className="text-[#6E5D7E]">{product.reviewCount} verified reviews</span>
            </div>

            {/* Price */}
            <div className="pt-3 pb-3 border-y border-[#F3ECF8] my-3 flex items-baseline gap-2">
              <span className="font-sans text-2xl font-bold text-[#221430] tabular-nums">
                {formatAmount(price)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="font-sans text-sm text-[#8F7F9E] line-through tabular-nums">
                  {formatAmount(originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-[#6E5D7E] leading-relaxed line-clamp-3 font-sans">
              {product.description}
            </p>

            {/* Variant selector (Shades or Sizes) */}
            {product.shades && product.shades.length > 0 && (
              <div className="mt-4">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#221430] block mb-2 font-sans">
                  Shade : <span className="normal-case font-bold text-[#5D3891]">{selectedVariant}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedVariant(shade.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all font-sans ${
                        selectedVariant === shade.name
                          ? 'border-[#5D3891] bg-[#F3ECF8] text-[#5D3891] font-bold shadow-xs'
                          : 'border-[#E5D9EE] hover:border-[#5D3891] text-[#221430] bg-white'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="truncate max-w-[100px]">{shade.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#221430] block mb-2 font-sans">
                  Size :
                </span>
                <div className="flex gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedVariant(sz)}
                      className={`px-3.5 py-1.5 rounded-full border text-xs transition-all font-semibold font-sans ${
                        selectedVariant === sz
                          ? 'border-[#5D3891] bg-[#5D3891] text-white'
                          : 'border-[#E5D9EE] hover:border-[#5D3891] text-[#221430] bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#F3ECF8] mt-6 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs uppercase tracking-wider font-bold py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3.5 rounded-full border transition-colors ${
                isWishlisted
                  ? 'border-[#5D3891] bg-[#5D3891] text-white'
                  : 'border-[#E5D9EE] text-[#6E5D7E] hover:text-[#5D3891] bg-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="p-3.5 rounded-full border border-[#E5D9EE] text-[#221430] hover:text-[#5D3891] hover:border-[#5D3891] bg-white transition-colors"
              title="View Product Details"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
