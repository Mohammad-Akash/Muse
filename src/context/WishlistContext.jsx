import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext.jsx';
import { products } from '../data/products.js';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { addToast } = useToast();

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_wishlist');
      return saved ? JSON.parse(saved) : ['velvet-matte-lipstick-bordeaux', 'rose-damber-eau-de-parfum'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mujer_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    const product = products.find(p => p.id === productId);
    const prodName = product ? product.name : 'Item';
    const isCurrentlyIn = wishlistIds.includes(productId);

    if (isCurrentlyIn) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      addToast(`Removed "${prodName}" from your wishlist.`, 'info');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      addToast(`Added "${prodName}" to your wishlist.`);
    }
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
