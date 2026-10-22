import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, Share2, Sparkles, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { blogPosts } from '../../data/blogPosts.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const { addToast } = useToast();

  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      addToast('Article link copied to clipboard.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      <Breadcrumbs
        items={[
          { label: 'Beauty Journal', to: '/journal' },
          { label: post.title }
        ]}
      />

      <article className="space-y-8">
        
        {/* Header Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="uppercase tracking-wider font-bold text-[#5D3891] bg-[#F3ECF8] px-3 py-1 rounded-full border border-[#EAE0F2] text-[10px]">
              {post.category}
            </span>
            <span className="text-[#6E5D7E]">·</span>
            <span className="text-[#6E5D7E] font-mono text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#5D3891]" />
              {post.readTime}
            </span>
            <span className="text-[#6E5D7E]">·</span>
            <span className="text-[#6E5D7E] font-mono text-[11px]">{post.date}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#221430] leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-2 border-b border-[#E5D9EE] pb-4 text-xs text-[#6E5D7E] font-sans">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center font-serif text-base border border-[#EAE0F2]">
                M
              </div>
              <div>
                <p className="font-bold text-[#221430]">{post.author}</p>
                <p className="text-[11px] text-[#6E5D7E]">{post.authorRole}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E5D9EE] text-[#221430] hover:border-[#5D3891] hover:text-[#5D3891] transition-colors text-xs bg-white shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#5D3891]" />
              <span>Share Journal</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-[#E5D9EE] shadow-luxury-md">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-neutral max-w-none font-sans text-[#221430]/80 leading-relaxed text-sm sm:text-base space-y-6 pt-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Editorial Footnote / Author Box */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5D9EE] shadow-luxury-card mt-12 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F3ECF8] text-[#5D3891] flex items-center justify-center font-serif text-2xl shrink-0 border border-[#EAE0F2]">
            M
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-[#221430]">About the Author: {post.author}</h4>
            <p className="text-xs text-[#6E5D7E] font-sans leading-relaxed">
              Specialized researcher in phyto-botanical extraction and cosmetic dermatology at the House of Glowora.
            </p>
          </div>
        </div>

      </article>

      {/* Related Masterclasses */}
      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t border-[#E5D9EE] space-y-6">
          <h3 className="font-serif text-2xl font-normal text-[#221430]">
            Related Masterclasses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                to={`/journal/${rel.slug}`}
                className="group p-5 bg-white rounded-3xl border border-[#E5D9EE] shadow-luxury-card hover:shadow-luxury-card-hover hover:border-[#5D3891]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#5D3891]">{rel.category}</span>
                  <h4 className="font-serif text-lg font-bold text-[#221430] group-hover:text-[#5D3891] transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#6E5D7E] mt-2 line-clamp-2">{rel.excerpt}</p>
                </div>
                <span className="text-xs font-bold text-[#5D3891] mt-4 flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
