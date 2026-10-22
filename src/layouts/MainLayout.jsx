import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import BottomNav from '../components/layout/BottomNav.jsx';
import MobileMenuDrawer from '../components/layout/MobileMenuDrawer.jsx';
import CartDrawer from '../components/cart/CartDrawer.jsx';
import QuickViewModal from '../components/common/QuickViewModal.jsx';

export default function MainLayout() {
  const { pathname } = useLocation();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC] text-[#221430] pb-20 md:pb-0 overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-1">
        <Outlet context={{ openQuickView: (prod) => setQuickViewProduct(prod) }} />
      </main>

      <Footer />
      <BottomNav />
      <MobileMenuDrawer />
      <CartDrawer />

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
