import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Check, 
  ArrowRight, 
  Lock
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useRegion } from '../context/RegionContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { apiClient } from '../services/apiClient.js';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, discountAmount, shippingFee, totalAmount, appliedCoupon, clearCart } = useCart();
  const { formatAmount, regionCode, region } = useRegion();
  const { user, addresses, addOrder } = useAuth();
  const { addToast } = useToast();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-normal text-[#221430]">Your shopping bag is empty</h2>
        <p className="text-xs text-[#6E5D7E]">Please add formulations to your shopping bag before proceeding to checkout.</p>
        <Link to="/shop" className="inline-block px-8 py-3 bg-[#5D3891] hover:bg-[#4A2578] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md transition-all">
          Return to Boutique
        </Link>
      </div>
    );
  }

  // Pre-fill from user or default address
  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];

  const [formData, setFormData] = useState({
    fullName: user?.name || defaultAddress?.fullName || 'Ayesha Malik',
    email: user?.email || 'ayesha.malik@example.com',
    phone: user?.phone || defaultAddress?.phone || (regionCode === 'PKR' ? '+92 300 8472910' : '+971 50 123 4567'),
    street: defaultAddress?.street || (regionCode === 'PKR' ? 'House 42-B, Street 14, Phase 5, DHA' : 'Villa 12, Al Wasl Road, Jumeirah 2'),
    city: defaultAddress?.city || (regionCode === 'PKR' ? 'Lahore' : 'Dubai'),
    country: defaultAddress?.country || (regionCode === 'PKR' ? 'Pakistan' : 'United Arab Emirates'),
    postalCode: defaultAddress?.postalCode || (regionCode === 'PKR' ? '54792' : '00000'),
    billingSameAsShipping: true,
    deliveryMethod: 'standard',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    agreedToTerms: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const err = {};
    if (!formData.fullName.trim()) err.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) err.email = 'Valid Email is required';
    if (!formData.phone.trim()) err.phone = 'Contact Phone number is required';
    if (!formData.street.trim()) err.street = 'Street address is required';
    if (!formData.city.trim()) err.city = 'City is required';
    if (!formData.country.trim()) err.country = 'Country is required';
    if (!formData.agreedToTerms) err.agreedToTerms = 'You must accept the terms & conditions';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) err.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) err.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvc.trim()) err.cardCvc = 'CVC is required';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        items,
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: totalAmount,
        currency: regionCode,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode
        },
        paymentMethod: 
          formData.paymentMethod === 'cod' 
            ? 'Cash on Delivery' 
            : formData.paymentMethod === 'card' 
            ? 'Credit Card (Simulated)' 
            : 'Apple Pay (Simulated)',
        paymentStatus: formData.paymentMethod === 'cod' ? 'Payable upon Delivery' : 'Paid Online (Demo)',
        carrier: regionCode === 'PKR' ? 'Glowora Express Pakistan' : 'Emirates Luxury Post'
      };

      const res = await apiClient.createOrder(orderPayload);
      if (res.success) {
        addOrder(res.order);
        clearCart();
        addToast(`Order placed successfully! Order #${res.order.id}`);
        navigate('/order-success', { state: { order: res.order } });
      }
    } catch (err) {
      addToast('An error occurred while creating order.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Shopping Bag', to: '/cart' },
          { label: 'Secure Checkout' }
        ]}
      />

      <div className="border-b border-[#E5D9EE] pb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-[#5D3891] block mb-1">
          Boutique Finalization
        </span>
        <h1 className="font-serif text-3xl font-normal text-[#221430] flex items-center gap-2">
          <Lock className="w-6 h-6 text-[#5D3891]" />
          <span>Encrypted Checkout</span>
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form: Contact, Shipping, Payment (Col 7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Contact Information */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3ECF8] pb-3">
              <h3 className="font-serif text-base font-bold text-[#221430]">
                1. Customer Contact Details
              </h3>
              <span className="text-xs text-[#6E5D7E]">Order updates sent via SMS & Email</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full text-xs border rounded-xl p-3 focus:outline-none bg-[#FAF7FC] ${errors.fullName ? 'border-rose-500' : 'border-[#E5D9EE] focus:border-[#5D3891]'}`}
                  placeholder="e.g. Ayesha Malik"
                />
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full text-xs border rounded-xl p-3 focus:outline-none bg-[#FAF7FC] ${errors.email ? 'border-rose-500' : 'border-[#E5D9EE] focus:border-[#5D3891]'}`}
                  placeholder="ayesha@example.com"
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">Mobile Phone (for courier coordination) *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full text-xs border rounded-xl p-3 focus:outline-none bg-[#FAF7FC] ${errors.phone ? 'border-rose-500' : 'border-[#E5D9EE] focus:border-[#5D3891]'}`}
                  placeholder="+92 300 1234567 or +971 50 1234567"
                />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* 2. Delivery Address */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-4">
            <h3 className="font-serif text-base font-bold text-[#221430] border-b border-[#F3ECF8] pb-3">
              2. Shipping Destination ({region.name})
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">Street Address, Villa or Apartment *</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className={`w-full text-xs border rounded-xl p-3 focus:outline-none bg-[#FAF7FC] ${errors.street ? 'border-rose-500' : 'border-[#E5D9EE] focus:border-[#5D3891]'}`}
                  placeholder="House / Flat / Street / Area"
                />
                {errors.street && <p className="text-[11px] text-rose-500 mt-1">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full text-xs border rounded-xl p-3 focus:outline-none bg-[#FAF7FC] ${errors.city ? 'border-rose-500' : 'border-[#E5D9EE] focus:border-[#5D3891]'}`}
                    placeholder="e.g. Lahore / Dubai"
                  />
                  {errors.city && <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">Country *</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className={`w-full text-xs border rounded-xl p-3 focus:outline-none bg-[#FAF7FC] ${errors.country ? 'border-rose-500' : 'border-[#E5D9EE] focus:border-[#5D3891]'}`}
                  />
                  {errors.country && <p className="text-[11px] text-rose-500 mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#221430] block mb-1 font-sans">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full text-xs border border-[#E5D9EE] rounded-xl p-3 focus:outline-none focus:border-[#5D3891] bg-[#FAF7FC]"
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#221430]">
                  <input
                    type="checkbox"
                    checked={formData.billingSameAsShipping}
                    onChange={(e) => setFormData({ ...formData, billingSameAsShipping: e.target.checked })}
                    className="rounded border-[#E5D9EE] text-[#5D3891] focus:ring-[#5D3891]"
                  />
                  <span>Billing address is identical to shipping address</span>
                </label>
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-4">
            <h3 className="font-serif text-base font-bold text-[#221430] border-b border-[#F3ECF8] pb-3">
              3. Delivery Protocol
            </h3>

            <div className="space-y-3 text-xs">
              <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${formData.deliveryMethod === 'standard' ? 'border-[#5D3891] bg-[#F3ECF8]' : 'border-[#E5D9EE] bg-white'}`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={formData.deliveryMethod === 'standard'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                    className="text-[#5D3891] focus:ring-[#5D3891]"
                  />
                  <div>
                    <p className="font-bold text-[#221430]">Complimentary Climate-Insured Courier</p>
                    <p className="text-[#6E5D7E] text-[11px] mt-0.5">Estimated 2–3 business days with refrigerated packing</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#221430]">
                  {shippingFee === 0 ? 'Free' : formatAmount(shippingFee)}
                </span>
              </label>
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E5D9EE] shadow-luxury-card space-y-4">
            <h3 className="font-serif text-base font-bold text-[#221430] border-b border-[#F3ECF8] pb-3">
              4. Payment Method
            </h3>

            <div className="space-y-3 text-xs">
              {/* Cash on Delivery */}
              <label className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-[#5D3891] bg-[#F3ECF8]' : 'border-[#E5D9EE] bg-white'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="mt-0.5 text-[#5D3891] focus:ring-[#5D3891]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#221430] flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#5D3891]" />
                      <span>Cash on Delivery (COD)</span>
                    </span>
                    <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Most Popular
                    </span>
                  </div>
                  <p className="text-[#6E5D7E] text-[11px] mt-1">
                    Pay securely in exact cash or mobile terminal to the courier upon doorstep receipt.
                  </p>
                </div>
              </label>

              {/* Online Card (Simulated) */}
              <label className={`p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-[#5D3891] bg-[#F3ECF8]' : 'border-[#E5D9EE] bg-white'}`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="mt-0.5 text-[#5D3891] focus:ring-[#5D3891]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#221430] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#5D3891]" />
                        <span>Credit / Debit Card (Visa, Mastercard, Amex)</span>
                      </span>
                    </div>
                    <p className="text-[#6E5D7E] text-[11px] mt-1">
                      Simulated 256-bit SSL encrypted checkout. No real money charged.
                    </p>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="mt-2 pt-3 border-t border-[#E5D9EE] space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <label className="text-[11px] font-semibold text-[#221430] block mb-1">Card Number *</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full text-xs border border-[#E5D9EE] rounded-xl p-2.5 bg-white"
                      />
                      {errors.cardNumber && <p className="text-[11px] text-rose-500 mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#221430] block mb-1">MM/YY *</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full text-xs border border-[#E5D9EE] rounded-xl p-2.5 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#221430] block mb-1">CVC / CVV *</label>
                        <input
                          type="text"
                          placeholder="888"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full text-xs border border-[#E5D9EE] rounded-xl p-2.5 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </label>

              {/* Apple Pay (Simulated) */}
              <label className={`p-4 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors ${formData.paymentMethod === 'applepay' ? 'border-[#5D3891] bg-[#F3ECF8]' : 'border-[#E5D9EE] bg-white'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'applepay'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                  className="text-[#5D3891] focus:ring-[#5D3891]"
                />
                <div>
                  <span className="font-bold text-[#221430]">Apple Pay (Simulated Express Checkout)</span>
                  <p className="text-[#6E5D7E] text-[11px]">Instant biometric authorization</p>
                </div>
              </label>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5D9EE]">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#221430]">
              <input
                type="checkbox"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="mt-0.5 rounded border-[#E5D9EE] text-[#5D3891] focus:ring-[#5D3891]"
              />
              <span>
                I have read and agree to the Glowora <Link to="/terms" className="underline hover:text-[#5D3891] font-semibold">Terms & Conditions</Link> and <Link to="/privacy-policy" className="underline hover:text-[#5D3891] font-semibold">Privacy Policy</Link>.
              </span>
            </label>
            {errors.agreedToTerms && <p className="text-[11px] text-rose-500 mt-1">{errors.agreedToTerms}</p>}
          </div>

        </div>

        {/* Right Order Summary Column (Col 5) */}
        <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-[#E5D9EE] shadow-luxury-md space-y-6 lg:sticky lg:top-28">
          <h3 className="font-serif text-xl font-medium text-[#221430] border-b border-[#F3ECF8] pb-3">
            Bag Review ({items.length} Formulations)
          </h3>

          {/* Miniature Items List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-[#F3ECF8] space-y-3">
            {items.map((item) => {
              const unitPrice = item.prices ? (item.prices[regionCode] ?? item.prices.PKR) : 0;
              return (
                <div key={`${item.id}-${item.variant}`} className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-xl bg-[#FAF7FC] border border-[#E5D9EE] p-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-serif font-bold text-[#221430] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#6E5D7E]">{item.variant} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#221430] shrink-0">
                    {formatAmount(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-[#F3ECF8] space-y-2 text-xs text-[#6E5D7E]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-[#221430] font-medium">{formatAmount(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#5D3891] font-semibold">
                <span>Applied Discount</span>
                <span className="font-mono">-{formatAmount(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-mono text-[#221430] font-medium">{shippingFee === 0 ? 'Complimentary' : formatAmount(shippingFee)}</span>
            </div>
            <div className="pt-3 border-t border-[#F3ECF8] flex justify-between text-base font-semibold text-[#221430]">
              <span>Total Payable</span>
              <span className="font-mono text-2xl text-[#5D3891] font-bold">
                {formatAmount(totalAmount)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#5D3891] hover:bg-[#4A2578] disabled:opacity-50 text-white text-xs uppercase tracking-wider font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <span>Authorizing Formulation Dispatch...</span>
            ) : (
              <>
                <span>Place Order ({formatAmount(totalAmount)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center text-[11px] text-[#6E5D7E]">
            <span>By placing this order you will receive an immediate SMS tracking confirmation.</span>
          </div>
        </div>

      </form>
    </div>
  );
}
