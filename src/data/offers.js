/**
 * MUJER Offers, Promo Codes & Seasonal Campaign Data
 */

export const promoCodes = [
  {
    code: "WELCOME15",
    discountPercent: 15,
    minOrderPKR: 4000,
    minOrderAED: 60,
    description: "Enjoy 15% off your maiden MUJER order across all beauty categories."
  },
  {
    code: "MUJERGOLD",
    discountPercent: 20,
    minOrderPKR: 10000,
    minOrderAED: 140,
    description: "VIP 20% savings on purchases of luxury elixirs, perfumes, and palettes."
  },
  {
    code: "GLOW10",
    discountPercent: 10,
    minOrderPKR: 3000,
    minOrderAED: 40,
    description: "10% off skincare essentials including serums and cleansers."
  },
  {
    code: "FREESHIP",
    isFreeShipping: true,
    minOrderPKR: 0,
    minOrderAED: 0,
    description: "Complimentary climate-controlled express shipping on your current order."
  }
];

export const bundles = [
  {
    id: "bundle-royal-glow",
    title: "The Royal Radiance Signature Duo",
    subtitle: "Lumière Elixir Serum + Crème Veloutée Night Repair",
    prices: { PKR: 21500, AED: 290 },
    originalPrices: { PKR: 25700, AED: 345 },
    savingsPercent: 16,
    badge: "Most Coveted",
    image: "/src/assets/images/product_serum_elixir_1792565254298.jpg",
    items: ["Lumière Radiance Botanical Elixir (30ml)", "Crème Veloutée Cellular Repair (50ml)"]
  },
  {
    id: "bundle-couture-evening",
    title: "The Parisian Soirée Ensemble",
    subtitle: "Haute Velvet Lipstick + Rose d'Ambre Eau de Parfum",
    prices: { PKR: 31000, AED: 410 },
    originalPrices: { PKR: 35300, AED: 475 },
    savingsPercent: 12,
    badge: "Limited Edition",
    image: "/src/assets/images/product_rose_perfume_1792565254757.jpg",
    items: ["Haute Velvet Matte Lipstick in Bordeaux 09", "Rose d'Ambre Eau de Parfum (50ml)"]
  },
  {
    id: "bundle-masterpiece-coffret",
    title: "Le Coffret Prestige Masterpiece Wardrobe",
    subtitle: "Complete 4-Piece Grand Ritual in Velvet Keepsake Box",
    prices: { PKR: 39500, AED: 520 },
    originalPrices: { PKR: 48000, AED: 640 },
    savingsPercent: 18,
    badge: "Grand Privilège",
    image: "/src/assets/images/luxury_gift_set_1792567974413.jpg",
    items: [
      "Lumière Radiance Botanical Elixir (30ml)",
      "Crème Veloutée Cellular Repair Night Moisturizer (50ml)",
      "Rose d'Ambre Haute Eau de Parfum (50ml)",
      "Haute Velvet Matte Lipstick in Bordeaux 09"
    ]
  }
];

export const offers = {
  hero: {
    title: "The Autumn Haute Cosmétique Privilège",
    subtitle: "Limited-tier celebratory privileges. Receive a complimentary Rose Quartz Gua Sha on all orders above PKR 15,000 / AED 200.",
    validUntil: "End of Season",
    code: "MUJERGOLD"
  },
  promoCodes,
  bundles
};
