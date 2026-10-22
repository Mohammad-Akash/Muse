import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Search, Clock, Calendar } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { blogPosts } from '../../data/blogPosts.js';

export default function BlogListing() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Skincare', 'Makeup', 'Fragrances'];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedTag !== 'All' && post.category !== selectedTag) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      <Breadcrumbs items={[{ label: 'The Beauty Journal' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 text-[10px] uppercase tracking-wider font-bold text-[#5D3891] border border-[#E5D9EE] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#5D3891]" />
          <span>Maison Glowora Gazette & Editorial</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#221430] leading-tight">
          The Beauty Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#6E5D7E] leading-relaxed font-sans max-w-lg mx-auto">
          In-depth masterclasses exploring botanical actives, cellular longevity, haute pigment application, and classical Grasse perfumery.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E5D9EE] pb-4">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all ${
                selectedTag === cat
                  ? 'bg-[#5D3891] text-white shadow-xs'
                  : 'bg-white border border-[#E5D9EE] text-[#221430] hover:border-[#5D3891]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#6E5D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search journal entries..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5D9EE] rounded-full focus:outline-none focus:border-[#5D3891] font-sans shadow-2xs"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl border border-[#E5D9EE] overflow-hidden shadow-luxury-card hover:shadow-luxury-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <Link to={`/journal/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-[#FAF7FC] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#221430]/90 backdrop-blur-xs text-[#DECDEB] text-[9.5px] uppercase font-bold tracking-wider rounded-full">
                  {post.category}
                </span>
              </Link>

              <div className="p-6">
                <div className="text-[10.5px] uppercase tracking-wider text-[#6E5D7E] flex items-center gap-2 mb-2 font-mono">
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#221430] group-hover:text-[#5D3891] transition-colors leading-snug">
                  <Link to={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-[#6E5D7E] mt-2.5 line-clamp-3 leading-relaxed font-sans">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                to={`/journal/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5D3891] hover:text-[#4A2578] uppercase tracking-wider transition-colors pt-3 border-t border-[#F3ECF8] w-full"
              >
                <span>Read Masterclass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
