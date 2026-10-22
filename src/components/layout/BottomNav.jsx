import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useMobileMenu } from '../../context/MobileMenuContext.jsx';

export default function BottomNav() {
  const { pathname } = useLocation();
  const { wishlistCount } = useWishlist();
  const { totalItemCount, setIsCartDrawerOpen } = useCart();
  const { isMobileMenuOpen, openMobileMenu } = useMobileMenu();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5D9EE] px-2 py-2 shadow-[0_-4px_20px_rgba(58,27,100,0.08)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative py-1 px-2.5 ${
              isActive && !isMobileMenuOpen ? 'text-[#5D3891]' : 'text-[#6E5D7E] hover:text-[#221430]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Home className={`w-5 h-5 ${isActive && !isMobileMenuOpen ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] ${isActive && !isMobileMenuOpen ? 'font-bold text-[#5D3891]' : 'font-medium'}`}>
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* Categories / Shop */}
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative py-1 px-2.5 ${
              isActive && !isMobileMenuOpen ? 'text-[#5D3891]' : 'text-[#6E5D7E] hover:text-[#221430]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutGrid className={`w-5 h-5 ${isActive && !isMobileMenuOpen ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] ${isActive && !isMobileMenuOpen ? 'font-bold text-[#5D3891]' : 'font-medium'}`}>
                Shop
              </span>
            </>
          )}
        </NavLink>

        {/* Shopping Bag Button (Triggers CartDrawer) */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center gap-1 transition-colors relative py-1 px-2.5 text-[#6E5D7E] hover:text-[#221430]"
          aria-label="Open Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#5D3891] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans shadow-xs">
                {totalItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">
            Bag
          </span>
        </button>

        {/* Wishlist */}
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative py-1 px-2.5 ${
              isActive && !isMobileMenuOpen ? 'text-[#5D3891]' : 'text-[#6E5D7E] hover:text-[#221430]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <Heart className={`w-5 h-5 ${isActive && !isMobileMenuOpen ? 'stroke-[2.5] fill-[#5D3891]/20' : 'stroke-2'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#5D3891] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive && !isMobileMenuOpen ? 'font-bold text-[#5D3891]' : 'font-medium'}`}>
                Wishlist
              </span>
            </>
          )}
        </NavLink>

        {/* Full Mobile Navigation Menu Trigger */}
        <button
          onClick={openMobileMenu}
          className={`flex flex-col items-center gap-1 transition-colors relative py-1 px-2.5 ${
            isMobileMenuOpen ? 'text-[#5D3891]' : 'text-[#6E5D7E] hover:text-[#221430]'
          }`}
          aria-label="Open complete menu"
        >
          <div className={`p-0.5 rounded-md ${isMobileMenuOpen ? 'bg-[#F3ECF8]' : ''}`}>
            <Menu className={`w-5 h-5 ${isMobileMenuOpen ? 'stroke-[2.5] text-[#5D3891]' : 'stroke-2'}`} />
          </div>
          <span className={`text-[10px] ${isMobileMenuOpen ? 'font-bold text-[#5D3891]' : 'font-medium'}`}>
            Menu
          </span>
        </button>

      </div>
    </nav>
  );
}
