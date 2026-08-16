'use client';

import React from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const Header: React.FC = () => {
  const {
    selectedBranch,
    setHasSelectedBranch,
    cartItemCount,
    setIsCartOpen,
  } = useOrder();

  const rawBranchName = selectedBranch.name.split(' - ')[0];

  return (
    <header className="sticky top-0 z-40 bg-[#00022C] text-white border-b border-[#141A45] shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 relative flex items-center justify-between min-h-[60px]">
        
        {/* Left Container */}
        <div className="w-10 sm:w-36 flex items-center justify-start z-10">
          <button
            onClick={() => setHasSelectedBranch(false)}
            className="flex items-center gap-1 bg-[#0D123D] hover:bg-[#181F54] text-slate-200 text-xs px-2 py-1.5 rounded-full border border-[#232B66] transition shrink-0 active:scale-95"
            title="Click to change location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="font-bold text-white max-w-[40px] sm:max-w-[130px] truncate block text-left">
              {rawBranchName}
            </span>
          </button>
        </div>

        {/* Center: Brand Logo Container
            💡 TIP TO ADJUST OFFSET YOURSELF:
            Add `ml-1`, `ml-2`, `ml-3`, or `pl-2` below to nudge the logo slightly right!
        */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-0 pointer-events-auto ml-3">
          <a href="#" className="flex flex-col items-center group">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-white group-hover:text-amber-200 transition">
                NOORA
              </span>
              <span className="w-6 sm:w-9 h-[2px] bg-white inline-block relative -top-0.5">
                <span className="absolute -right-1 -top-[3px] w-2 h-2 bg-white rotate-45" />
              </span>
            </div>
            <span className="text-[9px] tracking-[0.45em] text-slate-400 uppercase font-light -mt-0.5">
              C A F E
            </span>
          </a>
        </div>

        {/* Right Container */}
        <div className="w-10 sm:w-36 flex items-center justify-end z-10">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C5A059] hover:bg-[#D4B06A] text-black flex items-center justify-center transition shadow-sm active:scale-95 shrink-0"
            title="View Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-black" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00022C] text-[#C5A059] text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono ring-2 ring-[#00022C] animate-fade-in shadow-md">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
