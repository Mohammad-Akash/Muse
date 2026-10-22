import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ArrowRight,
  Flower2,
  Headphones
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to the Glowora newsletter. Your 15% privilege code has been sent.');
    setEmail('');
  };

  return (
    <footer className="relative bg-[#513778] text-[#FAF7FC] pt-16 pb-12 overflow-hidden">
      {/* Subtle organic top wave curve matching reference */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-[#FAF7FC] rounded-b-[2rem] pointer-events-none" />

      {/* Brand Values Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/15">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          <div className="flex items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#EADCF5]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">100% Natural Actives</h4>
              <p className="text-xs text-[#DACFE6] mt-1 leading-relaxed">
                Pure formulas developed under rigorous dermatological testing, free from parabens and sulfates.
              </p>
            </div>
          </div>

          <div className="flex items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#EADCF5]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">Fast Delivery</h4>
              <p className="text-xs text-[#DACFE6] mt-1 leading-relaxed">
                Climate-controlled luxury packaging with insured 48h door-to-door tracking.
              </p>
            </div>
          </div>

          <div className="flex items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#EADCF5]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">Secure Checkout</h4>
              <p className="text-xs text-[#DACFE6] mt-1 leading-relaxed">
                256-bit SSL encrypted transactions and flexible Cash on Delivery service.
              </p>
            </div>
          </div>

          <div className="flex items-center md:items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#EADCF5]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-white tracking-wide">Customer Concierge 7/7</h4>
              <p className="text-xs text-[#DACFE6] mt-1 leading-relaxed">
                Certified beauty consultants ready to assist you with tailored skincare consultations.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white">
                <Flower2 className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl tracking-tight font-normal text-white block">
                  Glowora
                </span>
                <span className="text-[10px] tracking-wide text-[#DACFE6] font-sans font-medium">
                  Natural Beauty, Real You
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-[#DACFE6] leading-relaxed max-w-sm">
              Glowora crafts high-performance botanical beauty. Pure actives and exquisite textures formulated to reveal and preserve your natural royal glow every single day.
            </p>

            {/* Newsletter Subscription matching reference with white pill input and round purple arrow */}
            <div className="pt-2 max-w-sm">
              <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                Subscribe to Our Newsletter
              </h5>
              <form onSubmit={handleNewsletterSubmit} className="mt-3 relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white text-[#221430] placeholder-[#8F7F9E] text-xs px-5 py-3 rounded-full w-full pr-12 focus:outline-none focus:ring-2 focus:ring-[#8F7F9E] shadow-sm font-sans"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 w-9 h-9 bg-[#5D3891] hover:bg-[#4A2578] text-white rounded-full flex items-center justify-center transition-colors shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-[12px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs text-[#DACFE6]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/category/skincare" className="hover:text-white transition-colors">Skincare</Link></li>
              <li><Link to="/category/body-care" className="hover:text-white transition-colors">Body Care</Link></li>
              <li><Link to="/category/haircare" className="hover:text-white transition-colors">Haircare</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 className="text-[12px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-xs text-[#DACFE6]">
              <li><Link to="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns-policy" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Special Offers</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h5 className="text-[12px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Follow Us
            </h5>
            <div className="flex gap-3 text-white">
              <a href="#instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-[#DACFE6] mt-4 leading-relaxed font-sans">
              Join our community on social media for exclusive skincare rituals and seasonal masterclasses.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DACFE6]">
        <div>
          © {new Date().getFullYear()} Glowora. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span className="text-white/30">·</span>
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
