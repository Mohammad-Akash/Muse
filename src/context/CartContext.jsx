import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRegion } from './RegionContext.jsx';
import { useToast } from './ToastContext.jsx';
import { promoCodes } from '../data/offers.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { region, regionCode, getProductPrice } = useRegion();
  const { addToast } = useToast();

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'lumiere-elixir-serum',
          name: 'Lumière Radiance Botanical Elixir',
          brand: 'MUJER Skincare',
          prices: { PKR: 11500, AED: 155 },
          variant: '30ml / 1.0 fl oz',
          image: '/src/assets/images/product_serum_elixir_1792565254298.jpg',
          quantity: 1,
          sku: 'MJR-SKN-001',
          stockCount: 38
        }
      ];
    } catch {
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_saved_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mujer_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('mujer_saved_cart', JSON.stringify(savedForLater));
    } catch (e) {
      console.error(e);
    }
  }, [savedForLater]);

  useEffect(() => {
    try {
      localStorage.setItem('mujer_coupon', JSON.stringify(appliedCoupon));
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1, selectedVariant = '') => {
    setItems((prevItems) => {
      const variantKey = selectedVariant || (product.sizes?.[0] || product.shades?.[0]?.name || 'Standard');
      const existingIndex = prevItems.findIndex(
        (i) => i.id === product.id && i.variant === variantKey
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            brand: product.brand,
            prices: product.prices,
            variant: variantKey,
            image: product.images?.[0] || '',
            quantity,
            sku: product.sku,
            stockCount: product.stockCount
          }
        ];
      }
    });

    addToast(`Added "${product.name}" to your luxury shopping bag.`);
  };

  const updateQuantity = (itemId, variant, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId, variant);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId && item.variant === variant) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId, variant) => {
    setItems((prev) => prev.filter((i) => !(i.id === itemId && i.variant === variant)));
    addToast('Item removed from shopping bag.', 'info');
  };

  const saveForLaterItem = (itemId, variant) => {
    const target = items.find((i) => i.id === itemId && i.variant === variant);
    if (target) {
      removeFromCart(itemId, variant);
      setSavedForLater((prev) => [...prev, target]);
      addToast(`Saved "${target.name}" for later.`);
    }
  };

  const moveToCartFromSaved = (itemId, variant) => {
    const target = savedForLater.find((i) => i.id === itemId && i.variant === variant);
    if (target) {
      setSavedForLater((prev) => prev.filter((i) => !(i.id === itemId && i.variant === variant)));
      setItems((prev) => [...prev, target]);
      addToast(`Moved "${target.name}" back to your shopping bag.`);
    }
  };

  const removeSavedItem = (itemId, variant) => {
    setSavedForLater((prev) => prev.filter((i) => !(i.id === itemId && i.variant === variant)));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  // Pricing calculations based on current regional currency
  const subtotal = items.reduce((acc, item) => {
    const unitPrice = item.prices ? (item.prices[regionCode] ?? item.prices.PKR) : 0;
    return acc + unitPrice * item.quantity;
  }, 0);

  const applyCouponCode = (codeStr) => {
    if (!codeStr || !codeStr.trim()) {
      return { success: false, message: 'Please enter a promo code.' };
    }
    const clean = codeStr.trim().toUpperCase();
    const found = promoCodes.find((c) => c.code === clean);

    if (!found) {
      return { success: false, message: 'Invalid promo code. Try WELCOME15 or MUJERGOLD' };
    }

    const minSpend = regionCode === 'PKR' ? found.minOrderPKR : found.minOrderAED;
    if (subtotal < minSpend) {
      return {
        success: false,
        message: `Code ${found.code} requires a minimum order of ${region.currencySymbol} ${minSpend.toLocaleString()}`
      };
    }

    setAppliedCoupon(found);
    addToast(`Promo code "${found.code}" applied successfully!`);
    return { success: true, message: `Code ${found.code} applied.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Promo code removed.', 'info');
  };

  // Discount computation
  let discountAmount = 0;
  if (appliedCoupon && appliedCoupon.discountPercent) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }

  // Shipping calculation
  const meetsFreeShipping = subtotal >= region.freeShippingThreshold || (appliedCoupon && appliedCoupon.isFreeShipping);
  const shippingFee = items.length === 0 ? 0 : meetsFreeShipping ? 0 : region.shippingCost;

  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping progress
  const remainingForFreeShipping = Math.max(0, region.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / region.freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        savedForLater,
        addToCart,
        updateQuantity,
        removeFromCart,
        saveForLaterItem,
        moveToCartFromSaved,
        removeSavedItem,
        clearCart,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        totalItemCount,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        meetsFreeShipping,
        remainingForFreeShipping,
        freeShippingProgress,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
