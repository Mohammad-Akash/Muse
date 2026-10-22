/**
 * MUJER Mock Orders for Customer Account Dashboard & Order Tracking
 */

export const initialOrders = [
  {
    id: "MJR-892104",
    date: "2026-10-18T10:30:00Z",
    formattedDate: "Oct 18, 2026",
    status: "Shipped",
    trackingStatus: "Out for Delivery",
    carrier: "MUJER Express Logistics",
    trackingNumber: "TRK-98302149",
    estimatedDelivery: "Oct 22, 2026",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending on Arrival",
    currency: "PKR",
    items: [
      {
        id: "lumiere-elixir-serum",
        name: "Lumière Radiance Botanical Elixir",
        variant: "30ml / 1.0 fl oz",
        price: 11500,
        quantity: 1,
        image: "/src/assets/images/product_serum_elixir_1792565254298.jpg"
      },
      {
        id: "velvet-matte-lipstick-bordeaux",
        name: "Haute Velvet Matte Lipstick in Bordeaux 09",
        variant: "Bordeaux 09 (Deep Wine)",
        price: 6800,
        quantity: 1,
        image: "/src/assets/images/product_burgundy_lipstick_1792565254455.jpg"
      }
    ],
    subtotal: 18300,
    discount: 1830,
    shipping: 0,
    total: 16470,
    shippingAddress: {
      fullName: "Ayesha Malik",
      phone: "+92 300 8472910",
      street: "House 42-B, Street 14, Phase 5, DHA",
      city: "Lahore",
      country: "Pakistan",
      postalCode: "54792"
    },
    timeline: [
      { step: "Order Placed", time: "Oct 18, 10:30 AM", completed: true },
      { step: "Confirmed", time: "Oct 18, 11:15 AM", completed: true },
      { step: "Processing", time: "Oct 19, 09:00 AM", completed: true },
      { step: "Shipped", time: "Oct 20, 02:45 PM", completed: true },
      { step: "Out for Delivery", time: "Oct 21, 08:30 AM", completed: true },
      { step: "Delivered", time: "Expected by 5:00 PM", completed: false }
    ]
  },
  {
    id: "MJR-741902",
    date: "2026-09-25T14:20:00Z",
    formattedDate: "Sep 25, 2026",
    status: "Delivered",
    trackingStatus: "Delivered",
    carrier: "Emirates Luxury Post",
    trackingNumber: "TRK-55209112",
    estimatedDelivery: "Delivered on Sep 27, 2026",
    paymentMethod: "Credit Card (Simulated)",
    paymentStatus: "Paid",
    currency: "AED",
    items: [
      {
        id: "rose-damber-eau-de-parfum",
        name: "Rose d'Ambre Haute Eau de Parfum",
        variant: "100ml / 3.4 fl oz",
        price: 380,
        quantity: 1,
        image: "/src/assets/images/product_rose_perfume_1792565254757.jpg"
      }
    ],
    subtotal: 380,
    discount: 38,
    shipping: 0,
    total: 342,
    shippingAddress: {
      fullName: "Ayesha Malik",
      phone: "+971 50 123 4567",
      street: "Villa 12, Al Wasl Road, Jumeirah 2",
      city: "Dubai",
      country: "United Arab Emirates",
      postalCode: "00000"
    },
    timeline: [
      { step: "Order Placed", time: "Sep 25, 02:20 PM", completed: true },
      { step: "Confirmed", time: "Sep 25, 03:00 PM", completed: true },
      { step: "Processing", time: "Sep 25, 05:30 PM", completed: true },
      { step: "Shipped", time: "Sep 26, 09:15 AM", completed: true },
      { step: "Out for Delivery", time: "Sep 27, 10:00 AM", completed: true },
      { step: "Delivered", time: "Sep 27, 01:10 PM", completed: true }
    ]
  }
];
