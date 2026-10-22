import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useRegion } from '../../context/RegionContext.jsx';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { region } = useRegion();

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Maison Privileges Announcement"
      className="bg-[#472873] text-[#FAF7FC] text-[11px] font-normal py-2 px-4 relative border-b border-[#58338C] tracking-wide select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center overflow-hidden">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#D8C2EC]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8C2EC]" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Glowora Privilege</span>
            <span aria-hidden="true" className="text-white/30">·</span>
          </span>
          <p className="truncate text-[#EADCF5]">
            Complimentary delivery on orders over{' '}
            <strong className="text-white font-bold tracking-normal">
              {region.currencySymbol} {region.freeShippingThreshold.toLocaleString()}
            </strong>
            <span className="hidden md:inline text-[#D8C2EC]"> · Complimentary luxury botanical pouch included</span>
            <span className="hidden lg:inline text-[#D8C2EC]"> · Use code <span className="text-white font-mono tracking-wider font-bold bg-[#5D3891] px-1.5 py-0.5 rounded">GLOW15</span> for 15% off</span>
          </p>
          <Link
            to="/offers"
            className="text-white hover:text-[#D8C2EC] uppercase tracking-[0.16em] text-[10px] ml-2 shrink-0 font-bold transition-colors border-b border-white/50 hover:border-white"
          >
            Explore
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#D8C2EC] hover:text-white p-1 rounded-full transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
