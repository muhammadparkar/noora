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

  const branchShortName = selectedBranch.name.split(' - ')[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0D1A] text-white border-b border-[#1E2540] shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        
        {/* Left: Location Pill Button (Without (Change) text for ample breathing space) */}
        <button
          onClick={() => setHasSelectedBranch(false)}
          className="flex items-center gap-1.5 bg-[#1A223D] hover:bg-[#253054] text-slate-200 text-xs px-3 py-1.5 rounded-full border border-[#2B3861] transition shrink-0 active:scale-95"
          title="Click to change location"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="font-bold text-white max-w-[110px] sm:max-w-[160px] truncate">
            {branchShortName}
          </span>
        </button>

        {/* Center: Brand Logo with generous breathing space */}
        <a href="#" className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-white">
              NOORA
            </span>
            <span className="w-7 sm:w-10 h-[2px] bg-white inline-block relative -top-0.5">
              <span className="absolute -right-1 -top-[3px] w-2 h-2 bg-white rotate-45" />
            </span>
          </div>
          <span className="text-[9px] tracking-[0.45em] text-slate-400 uppercase font-light -mt-0.5">
            C A F E
          </span>
        </a>

        {/* Right: Cart Button with Top-Right Badge Popup for maximum breathing space */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C5A059] hover:bg-[#D4B06A] text-black flex items-center justify-center transition shadow-sm active:scale-95 shrink-0"
          title="View Cart"
        >
          <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-black" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-[#C5A059] text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono ring-2 ring-[#0A0D1A] animate-fade-in shadow-md">
              {cartItemCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
};
