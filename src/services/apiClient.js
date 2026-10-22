/**
 * MUJER API Client
 * Centralized service layer ready for future ASP.NET Core Web API integration.
 * Currently serves realistic mock data with simulated asynchronous latency.
 */

import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { offers } from '../data/offers.js';
import { blogPosts } from '../data/blogPosts.js';
import { initialOrders } from '../data/mockOrders.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.mujer-cosmetics.com/api/v1';

export const apiClient = {
  // Products
  async getProducts(params = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...products];

        if (params.category && params.category !== 'all') {
          const cat = params.category.toLowerCase();
          result = result.filter(
            p => p.category.toLowerCase() === cat || 
                 (p.subcategory && p.subcategory.toLowerCase() === cat)
          );
        }

        if (params.search) {
          const q = params.search.toLowerCase();
          result = result.filter(
            p => p.name.toLowerCase().includes(q) || 
                 p.brand.toLowerCase().includes(q) || 
                 p.category.toLowerCase().includes(q) ||
                 (p.description && p.description.toLowerCase().includes(q))
          );
        }

        if (params.skinType && params.skinType !== 'all') {
          result = result.filter(p => p.skinType === params.skinType || p.skinType === 'All Skin Types');
        }

        if (params.inStockOnly) {
          result = result.filter(p => p.inStock);
        }

        if (params.minPrice) {
          result = result.filter(p => p.prices.PKR >= Number(params.minPrice));
        }

        if (params.maxPrice) {
          result = result.filter(p => p.prices.PKR <= Number(params.maxPrice));
        }

        if (params.rating) {
          result = result.filter(p => p.rating >= Number(params.rating));
        }

        if (params.sortBy) {
          switch (params.sortBy) {
            case 'price-low':
              result.sort((a, b) => a.prices.PKR - b.prices.PKR);
              break;
            case 'price-high':
              result.sort((a, b) => b.prices.PKR - a.prices.PKR);
              break;
            case 'rating':
              result.sort((a, b) => b.rating - a.rating);
              break;
            case 'newest':
              result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
              break;
            case 'popularity':
            default:
              result.sort((a, b) => b.reviewCount - a.reviewCount);
              break;
          }
        }

        resolve({ data: result, total: result.length });
      }, 120);
    });
  },

  async getProductById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find(p => p.id === id);
        if (product) {
          resolve({ data: product });
        } else {
          reject(new Error('Product not found'));
        }
      }, 80);
    });
  },

  // Categories
  async getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: categories });
      }, 60);
    });
  },

  // Offers
  async getOffers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: offers });
      }, 60);
    });
  },

  // Blog
  async getBlogPosts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: blogPosts });
      }, 60);
    });
  },

  async getBlogPostBySlug(slug) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = blogPosts.find(p => p.slug === slug);
        if (post) resolve({ data: post });
        else reject(new Error('Article not found'));
      }, 60);
    });
  },

  // Order creation and tracking
  async createOrder(orderPayload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: `MJR-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toISOString(),
          status: 'Confirmed',
          trackingStatus: 'Processing',
          timeline: [
            { step: 'Order Placed', time: 'Just now', completed: true },
            { step: 'Confirmed', time: 'Just now', completed: true },
            { step: 'Processing', time: 'Estimated within 24h', completed: false },
            { step: 'Shipped', time: 'Pending fulfillment', completed: false },
            { step: 'Out for Delivery', time: 'Estimated 2-3 business days', completed: false },
            { step: 'Delivered', time: 'Pending delivery', completed: false }
          ],
          ...orderPayload
        };
        resolve({ success: true, order: newOrder });
      }, 250);
    });
  }
};
