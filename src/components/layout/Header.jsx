import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Bell,
  Sparkles,
  Flower2
} from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useMobileMenu } from '../../context/MobileMenuContext.jsx';
import { products } from '../../data/products.js';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { regionCode, region, setRegion, allRegions, formatAmount } = useRegion();
  const { totalItemCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const { openMobileMenu } = useMobileMenu();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const regionDropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on click outside & Escape key
  useEffect(() => {
    function handleClickOutside(e) {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(e.target)) {
        setIsRegionDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsRegionDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Filtered live search suggestions
  const searchSuggestions = searchQuery.trim()
    ? products
        .filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Categories', to: '/category/skincare' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5D9EE] transition-all">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        
        {/* Left: Mobile/Tablet Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Prominent & Highly Visible Menu Button on Mobile & Tablet (< 1024px) */}
          <button
            onClick={openMobileMenu}
            className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#F3ECF8] text-[#5D3891] border border-[#DECDEB] hover:bg-[#5D3891] hover:text-white transition-all shadow-2xs active:scale-95 shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4 stroke-[2.5]" />
            <span className="text-[11px] font-bold tracking-wide uppercase">Menu</span>
          </button>

          {/* Glowora Brand Wordmark with Lotus Emblem (Matching Reference Image) */}
          <Link 
            to="/" 
            className="group flex items-center gap-2 sm:gap-2.5 leading-none shrink-0"
            aria-label="Glowora Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3ECF8] border border-[#E5D9EE] flex items-center justify-center text-[#5D3891] group-hover:scale-105 transition-transform shrink-0">
              <Flower2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-[25px] tracking-tight font-medium text-[#221430] group-hover:text-[#5D3891] transition-colors leading-none">
                Glowora
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-wide text-[#6E5D7E] font-sans font-medium mt-0.5 truncate hidden sm:block">
                Natural Beauty, Real You
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Bar with Amethyst Active Underline (visible on lg screens 1024px+) */}
        <nav 
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-medium text-[#6E5D7E]"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap transition-colors relative py-1 hover:text-[#5D3891] ${
                  isActive 
                    ? 'text-[#221430] font-bold after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#5D3891] after:rounded-full' 
                    : 'text-[#6E5D7E] hover:after:content-[""] hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-[1.5px] hover:after:bg-[#5D3891]/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Region Selector, Search, Notifications, Wishlist & Always-Visible Shopping Bag */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Region / Currency Selector (visible on sm+) */}
          <div className="relative hidden sm:block shrink-0" ref={regionDropdownRef}>
            <button
              onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#221430] hover:text-[#5D3891] border border-[#E5D9EE] rounded-full hover:border-[#5D3891] transition-all bg-[#FAF7FC] shadow-2xs"
              aria-label="Select delivery region and currency"
              aria-expanded={isRegionDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#5D3891]" />
              <span className="font-sans text-[11px] font-bold text-[#221430]">{regionCode}</span>
              <ChevronDown className="w-3 h-3 text-[#6E5D7E]" />
            </button>

            {isRegionDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-luxury-md border border-[#E5D9EE] py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1"
                role="menu"
              >
                <div className="px-3.5 py-1 text-[10px] font-bold text-[#6E5D7E] uppercase tracking-wider border-b border-[#F3ECF8]">
                  Select Delivery Region
                </div>
                {allRegions.map((reg) => (
                  <button
                    key={reg.code}
                    onClick={() => {
                      setRegion(reg.code);
                      setIsRegionDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-[#FAF7FC] transition-colors ${
                      regionCode === reg.code ? 'font-bold text-[#5D3891] bg-[#F3ECF8]' : 'text-[#221430]'
                    }`}
                    role="menuitem"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{reg.flag}</span>
                      <span className="font-sans font-medium">{reg.name}</span>
                    </span>
                    <span className="text-[#6E5D7E] text-[11px] font-mono">{reg.currencyLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 sm:p-2 text-[#221430] hover:text-[#5D3891] transition-colors rounded-full hover:bg-[#F3ECF8] shrink-0"
            aria-label="Search cosmetics catalogue"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Notifications Popover - ALWAYS VISIBLE ON MOBILE, TABLET & DESKTOP */}
          <div className="relative shrink-0" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-1.5 sm:p-2 text-[#221430] hover:text-[#5D3891] transition-colors relative rounded-full hover:bg-[#F3ECF8]"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#5D3891] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-sans shadow-xs">
                3
              </span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 bg-white rounded-2xl shadow-luxury-md border border-[#E5D9EE] p-4 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3ECF8] mb-2">
                  <span className="text-[11px] font-bold text-[#221430] uppercase tracking-wider">Glowora Alerts</span>
                  <span className="text-[10px] text-[#5D3891] font-semibold">3 New</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FAF7FC] border border-[#E5D9EE]">
                    <p className="font-bold text-[#221430] text-[11px]">Privilege Code Active</p>
                    <p className="text-[#6E5D7E] text-[10.5px] mt-0.5">Use GLOW15 at checkout for 15% off your botanical order.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF7FC] border border-[#E5D9EE]">
                    <p className="font-bold text-[#221430] text-[11px]">Complimentary Lavender Pouch</p>
                    <p className="text-[#6E5D7E] text-[10.5px] mt-0.5">All orders over PKR 10,000 / AED 150 receive our velvet keepsake.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF7FC] border border-[#E5D9EE]">
                    <p className="font-bold text-[#221430] text-[11px]">Lavender Night Cream Restock</p>
                    <p className="text-[#6E5D7E] text-[10.5px] mt-0.5">Botanical Night Cream is now back in fresh seasonal allocation.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Link (visible on sm+) */}
          <Link
            to="/wishlist"
            className="p-1.5 sm:p-2 text-[#221430] hover:text-[#5D3891] transition-colors relative rounded-full hover:bg-[#F3ECF8] hidden sm:inline-flex shrink-0"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#5D3891] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-sans shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Account Profile Shortcut (visible on xl+) */}
          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="p-2 text-[#221430] hover:text-[#5D3891] transition-colors hidden xl:inline-flex rounded-full hover:bg-[#F3ECF8] shrink-0"
            aria-label={isAuthenticated ? `Account: ${user?.name}` : 'Login to account'}
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Shopping Bag Button (ALWAYS VISIBLE & PROMINENT ACROSS MOBILE, TABLET & DESKTOP) */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-[#5D3891] hover:bg-[#4A2578] text-white rounded-full transition-all shadow-xs shrink-0 active:scale-95"
            aria-label={`Shopping bag with ${totalItemCount} items`}
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            <span className="text-xs font-bold font-sans">
              Bag {totalItemCount > 0 ? `(${totalItemCount})` : ''}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Search Modal / Autocomplete Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#190D25]/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl shadow-luxury-lg border border-[#E5D9EE] overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-[#E5D9EE] flex items-center gap-3">
              <Search className="w-4 h-4 text-[#5D3891] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search botanical serums, velvet creams, lavender waters..."
                className="w-full text-sm text-[#221430] placeholder-[#6E5D7E] outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-[#6E5D7E] hover:text-[#221430] p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            {/* Suggestions list */}
            {searchSuggestions.length > 0 ? (
              <div className="p-2 max-h-80 overflow-y-auto divide-y divide-[#F3ECF8]">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#6E5D7E] uppercase tracking-wider">
                  Matching Formulations
                </div>
                {searchSuggestions.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/product/${prod.id}`);
                    }}
                    className="w-full text-left p-3 flex items-center gap-3.5 hover:bg-[#FAF7FC] transition-colors rounded-2xl"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-12 object-contain rounded-xl bg-[#FAF7FC] border border-[#E5D9EE] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-bold text-[#221430] truncate">{prod.name}</p>
                      <p className="text-[11px] text-[#6E5D7E] font-sans">{prod.brand} · {prod.category}</p>
                    </div>
                    <span className="font-sans text-xs font-bold text-[#5D3891] shrink-0">
                      {formatAmount(prod.prices[regionCode])}
                    </span>
                  </button>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="p-8 text-center text-xs text-[#6E5D7E]">
                No beauty formulations match "{searchQuery}". Press Enter to browse the complete catalogue.
              </div>
            ) : (
              <div className="p-5 text-xs text-[#6E5D7E] bg-[#FAF7FC]">
                <span className="font-bold text-[#221430] uppercase tracking-wider text-[10px] block mb-2.5">
                  Suggested Inquiries
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Hydrating Cream', 'Radiance Serum', 'Gentle Cleanser', 'Floral Perfume', 'Lavender Elixir', 'Body Lotion'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="px-3.5 py-1.5 bg-white border border-[#E5D9EE] rounded-full text-[11px] font-medium text-[#221430] hover:border-[#5D3891] hover:text-[#5D3891] transition-colors shadow-2xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
