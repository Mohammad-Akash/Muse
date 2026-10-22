import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegionProvider } from './context/RegionContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { MobileMenuProvider } from './context/MobileMenuContext.jsx';

import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Category from './pages/Category.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Offers from './pages/Offers.jsx';
import BlogListing from './pages/Blog/BlogListing.jsx';
import BlogPost from './pages/Blog/BlogPost.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import AccountDashboard from './pages/Account/AccountDashboard.jsx';

import Faq from './pages/Policies/Faq.jsx';
import ShippingPolicy from './pages/Policies/ShippingPolicy.jsx';
import ReturnsPolicy from './pages/Policies/ReturnsPolicy.jsx';
import PrivacyPolicy from './pages/Policies/PrivacyPolicy.jsx';
import TermsPolicy from './pages/Policies/TermsPolicy.jsx';
import AuthenticityPolicy from './pages/Policies/AuthenticityPolicy.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <RegionProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <MobileMenuProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<MainLayout />}>
                      <Route index element={<Home />} />
                      <Route path="shop" element={<Shop />} />
                      <Route path="category/:slug" element={<Category />} />
                      <Route path="product/:id" element={<ProductDetails />} />
                      <Route path="cart" element={<Cart />} />
                      <Route path="checkout" element={<Checkout />} />
                      <Route path="order-success" element={<OrderSuccess />} />
                      <Route path="wishlist" element={<Wishlist />} />
                      <Route path="offers" element={<Offers />} />
                      <Route path="journal" element={<BlogListing />} />
                      <Route path="journal/:slug" element={<BlogPost />} />
                      <Route path="about" element={<About />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register />} />
                      <Route path="forgot-password" element={<ForgotPassword />} />
                      <Route path="reset-password" element={<ResetPassword />} />
                      <Route path="account" element={<AccountDashboard />} />
                      <Route path="faq" element={<Faq />} />
                      <Route path="shipping-policy" element={<ShippingPolicy />} />
                      <Route path="returns-policy" element={<ReturnsPolicy />} />
                      <Route path="privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="terms" element={<TermsPolicy />} />
                      <Route path="authenticity" element={<AuthenticityPolicy />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </MobileMenuProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </RegionProvider>
  );
}
