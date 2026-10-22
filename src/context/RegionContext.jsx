import React, { createContext, useContext, useState, useEffect } from 'react';

const RegionContext = createContext(null);

export const REGIONS = {
  PKR: {
    code: 'PKR',
    name: 'Pakistan',
    currencySymbol: 'Rs.',
    currencyLabel: 'PKR',
    flag: '🇵🇰',
    freeShippingThreshold: 5000,
    shippingCost: 350
  },
  AED: {
    code: 'AED',
    name: 'Gulf (UAE)',
    currencySymbol: 'AED',
    currencyLabel: 'AED',
    flag: '🇦🇪',
    freeShippingThreshold: 150,
    shippingCost: 25
  }
};

export function RegionProvider({ children }) {
  const [regionCode, setRegionCode] = useState(() => {
    try {
      const saved = localStorage.getItem('mujer_region');
      return saved && REGIONS[saved] ? saved : 'PKR';
    } catch {
      return 'PKR';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mujer_region', regionCode);
    } catch {
      // storage unavailable
    }
  }, [regionCode]);

  const currentRegion = REGIONS[regionCode] || REGIONS.PKR;

  const setRegion = (code) => {
    if (REGIONS[code]) {
      setRegionCode(code);
    }
  };

  /**
   * Format numeric price according to selected regional currency
   */
  const formatAmount = (num) => {
    if (num === undefined || num === null) return '';
    const formatted = Math.round(num).toLocaleString('en-US');
    return `${currentRegion.currencySymbol} ${formatted}`;
  };

  /**
   * Get formatted price from product price object { PKR: 11500, AED: 155 }
   */
  const getProductPrice = (product) => {
    if (!product || !product.prices) return 0;
    return product.prices[regionCode] ?? product.prices.PKR;
  };

  const getProductOriginalPrice = (product) => {
    if (!product || !product.originalPrices) return null;
    return product.originalPrices[regionCode] ?? product.originalPrices.PKR;
  };

  return (
    <RegionContext.Provider
      value={{
        regionCode,
        region: currentRegion,
        setRegion,
        allRegions: Object.values(REGIONS),
        formatAmount,
        getProductPrice,
        getProductOriginalPrice
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
