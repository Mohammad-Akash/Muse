import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Search, 
  ChevronRight, 
  Globe, 
  Heart, 
  User, 
  ShoppingBag, 
  Sparkles, 
  Flower2, 
  Tag, 
  Truck, 
  HelpCircle, 
  BookOpen, 
  Smile, 
  Flame, 
  Feather, 
  Palette,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { useMobileMenu } from '../../context/MobileMenuContext.jsx';
import { useRegion } from '../../context/RegionContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function MobileMenuDrawer() {
  const { isMobileMenuOpen, closeMobileMenu } = useMobileMenu();
  const { regionCode, region, setRegion, allRegions, formatAmount } = useRegion();
  const { wishlistCount } = useWishlist();
  const { totalItemCount, setIsCartDrawerOpen } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'categories'

  if (!isMobileMenuOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      closeMobileMenu();
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Face & Skincare', slug: 'skincare', icon: Smile, count: 'Serums, Creams, Cleansers' },
    { name: 'Body Care', slug: 'body-care', icon: Flower2, count: 'Lotions, Scrubs, Butters' },
    { name: 'Hair Care', slug: 'haircare', icon: Feather, count: 'Oils, Shampoos, Masks' },
    { name: 'Makeup', slug: 'makeup', icon: Palette, count: 'Lip Elixirs, Tints, Glow' },
    { name: 'Fragrances', slug: 'fragrances', icon: Flame, count: 'Botanical Eau de Parfum' },
    { name: 'Accessories', slug: 'beauty-accessories', icon: ShoppingBag, count: 'Gua Sha, Silk Bands' }
  ];

  const primaryLinks = [
    { label: 'Home', to: '/', icon: Flower2 },
    { label: 'Shop All Formulations', to: '/shop', icon: ShoppingBag },
    { label: 'Special Privilege Offers', to: '/offers', icon: Tag, badge: '15% OFF' },
    { label: 'Beauty Journal & Rituals', to: '/journal', icon: BookOpen },
    { label: 'About Glowora', to: '/about', icon: Sparkles },
    { label: 'Contact & Concierge', to: '/contact', icon: PhoneCall },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" aria-modal="true" role="dialog">
      {/* Dimmed Backdrop */}
      <div 
        className="fixed inset-0 bg-[#190D25]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside 
        className="fixed inset-y-0 left-0 max-w-sm sm:max-w-md w-full bg-[#FAF7FC] shadow-2xl flex flex-col justify-between overflow-hidden border-r border-[#E5D9EE] animate-in slide-in-from-left duration-250 z-50"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-white border-b border-[#E5D9EE] flex items-center justify-between">
          <Link 
            to="/" 
            onClick={closeMobileMenu}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-full bg-[#F3ECF8] border border-[#DECDEB] flex items-center justify-center text-[#5D3891]">
              <Flower2 className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-medium tracking-tight text-[#221430] leading-none">
                Glowora
              </span>
              <span className="text-[9px] text-[#6E5D7E] font-medium tracking-wider mt-0.5">
                Natural Beauty, Real You
              </span>
            </div>
          </Link>

          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-full text-[#6E5D7E] hover:text-[#221430] hover:bg-[#F3ECF8] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-2" />
          </button>
        </div>

        {/* Search Bar inside Drawer */}
        <div className="px-5 py-3 bg-white/70 border-b border-[#E5D9EE]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#5D3891] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search botanical creams, serums, perfumes..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAF7FC] border border-[#DECDEB] rounded-xl text-xs text-[#221430] placeholder-[#8F7F9E] focus:outline-none focus:border-[#5D3891] focus:ring-1 focus:ring-[#5D3891]"
            />
          </form>
        </div>

        {/* Tab Switcher: Main Menu vs Categories */}
        <div className="flex border-b border-[#E5D9EE] bg-[#F3ECF8]/70 p-1">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center ${
              activeTab === 'menu'
                ? 'bg-white text-[#5D3891] shadow-2xs'
                : 'text-[#6E5D7E] hover:text-[#221430]'
            }`}
          >
            Menu & Navigation
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center ${
              activeTab === 'categories'
                ? 'bg-white text-[#5D3891] shadow-2xs'
                : 'text-[#6E5D7E] hover:text-[#221430]'
            }`}
          >
            Botanical Categories
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          
          {activeTab === 'menu' ? (
            <>
              {/* Primary Nav Links */}
              <nav className="space-y-1">
                {primaryLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#5D3891] text-white shadow-xs font-bold'
                            : 'text-[#221430] hover:bg-white hover:text-[#5D3891]'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#5D3891]'}`} />
                            <span>{link.label}</span>
                          </div>
                          {link.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7FC] text-[#5D3891]">
                              {link.badge}
                            </span>
                          )}
                          {!link.badge && (
                            <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white/80' : 'text-[#6E5D7E]'}`} />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Account, Wishlist & Cart Shortcuts */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#E5D9EE] space-y-2 shadow-2xs">
                <span className="text-[10px] font-bold text-[#6E5D7E] uppercase tracking-wider block px-1">
                  Personal Beauty Space
                </span>

                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-[#221430] hover:bg-[#FAF7FC] hover:text-[#5D3891]"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#5D3891]" />
                    <span>{isAuthenticated ? `My Account (${user?.name?.split(' ')[0]})` : 'Sign In / Register'}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#6E5D7E]" />
                </Link>

                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-[#221430] hover:bg-[#FAF7FC] hover:text-[#5D3891]"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-[#5D3891]" />
                    <span>Saved Wishlist</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#5D3891] bg-[#F3ECF8] px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    setIsCartDrawerOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium text-[#221430] hover:bg-[#FAF7FC] hover:text-[#5D3891]"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#5D3891]" />
                    <span>Shopping Bag</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#5D3891] bg-[#F3ECF8] px-2 py-0.5 rounded-full">
                    {totalItemCount} items
                  </span>
                </button>
              </div>

              {/* Delivery Policies & Assurance */}
              <div className="p-3 bg-[#F3ECF8]/60 rounded-2xl border border-[#DECDEB] text-xs text-[#221430] space-y-1.5">
                <div className="flex items-center gap-2 text-[#5D3891] font-bold text-[11px]">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Complimentary Shipping</span>
                </div>
                <p className="text-[11px] text-[#6E5D7E]">
                  Free shipping on orders over <strong className="text-[#221430]">{formatAmount(region.freeShippingThreshold)}</strong>.
                </p>
                <div className="pt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#5D3891] font-medium">
                  <Link to="/shipping-policy" onClick={closeMobileMenu} className="hover:underline">Shipping Policy</Link>
                  <Link to="/returns-policy" onClick={closeMobileMenu} className="hover:underline">30-Day Returns</Link>
                  <Link to="/faq" onClick={closeMobileMenu} className="hover:underline">FAQs</Link>
                </div>
              </div>
            </>
          ) : (
            /* Categories Tab */
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#6E5D7E] uppercase tracking-wider block px-1 mb-2">
                Curated Formulations
              </span>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#E5D9EE] hover:border-[#5D3891] hover:bg-[#FAF7FC] transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center">
                        <Icon className="w-4 h-4 stroke-2" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#221430]">{cat.name}</p>
                        <p className="text-[10px] text-[#6E5D7E]">{cat.count}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6E5D7E]" />
                  </Link>
                );
              })}

              <div className="pt-2">
                <Link
                  to="/shop"
                  onClick={closeMobileMenu}
                  className="w-full block py-2.5 px-4 text-center rounded-xl bg-[#5D3891] text-white text-xs font-bold hover:bg-[#4A2578] transition-colors"
                >
                  Explore Entire Catalogue
                </Link>
              </div>
            </div>
          )}

          {/* Region / Currency Switcher Section */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#E5D9EE] space-y-2 shadow-2xs">
            <button
              onClick={() => setShowRegionPicker(!showRegionPicker)}
              className="w-full flex items-center justify-between text-xs font-bold text-[#221430]"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#5D3891]" />
                <span>Delivery Country & Currency</span>
              </div>
              <span className="text-[#5D3891] font-mono text-[11px] flex items-center gap-1">
                {region.flag} {regionCode} ({region.currencyLabel})
              </span>
            </button>

            {showRegionPicker && (
              <div className="pt-2 border-t border-[#F3ECF8] space-y-1">
                {allRegions.map((reg) => (
                  <button
                    key={reg.code}
                    onClick={() => {
                      setRegion(reg.code);
                      setShowRegionPicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      regionCode === reg.code
                        ? 'bg-[#F3ECF8] text-[#5D3891] font-bold'
                        : 'text-[#221430] hover:bg-[#FAF7FC]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{reg.flag}</span>
                      <span>{reg.name}</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#6E5D7E]">{reg.currencyLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer with Customer Concierge */}
        <div className="p-4 bg-white border-t border-[#E5D9EE] space-y-2 text-center text-xs">
          <p className="text-[11px] font-medium text-[#6E5D7E]">
            Maison Concierge: <span className="text-[#221430] font-bold">+92 (042) 3578-GLOW</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-[#8F7F9E]">
            <span>100% Botanical Authenticity</span>
            <span>·</span>
            <span>Cruelty-Free</span>
            <span>·</span>
            <span>Clean Formulations</span>
          </div>
        </div>

      </aside>
    </div>
  );
}
