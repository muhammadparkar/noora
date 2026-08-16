'use client';

import React from 'react';
import { MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BRANCHES } from '../data/mockData';
import { useOrder } from '../context/OrderContext';
import { StoreBranch, OrderTrafficLevel } from '../types';

export const CafeSelectionScreen: React.FC = () => {
  const { setSelectedBranch, setHasSelectedBranch } = useOrder();

  const handleSelectBranch = (branch: StoreBranch) => {
    setSelectedBranch(branch);
    setHasSelectedBranch(true);
  };

  const getTrafficBadge = (level: OrderTrafficLevel) => {
    switch (level) {
      case 'Low':
        return (
          <div className="w-full bg-[#10B981] text-white font-bold text-[10px] sm:text-xs py-1 px-3 text-center rounded-b-xl shadow-sm tracking-wide">
            Traffic: Low
          </div>
        );
      case 'Medium':
        return (
          <div className="w-full bg-[#D97706] text-white font-bold text-[10px] sm:text-xs py-1 px-3 text-center rounded-b-xl shadow-sm tracking-wide">
            Traffic: Medium
          </div>
        );
      case 'High':
        return (
          <div className="w-full bg-[#DC2626] text-white font-bold text-[10px] sm:text-xs py-1 px-3 text-center rounded-b-xl shadow-sm tracking-wide">
            Traffic: High
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#00022C] flex flex-col font-sans">
      
      {/* Header - Brand Color #00022C */}
      <header className="bg-[#00022C] text-white py-5 px-6 border-b border-[#141A45] shadow-md flex items-center justify-center relative z-20">
        <a href="#" className="flex flex-col items-center group">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-white group-hover:text-amber-200 transition">
              NOORA
            </span>
            <span className="w-10 sm:w-12 h-[2px] bg-white inline-block relative -top-0.5">
              <span className="absolute -right-1 -top-[3px] w-2 h-2 bg-white rotate-45" />
            </span>
          </div>
          <span className="text-[10px] tracking-[0.45em] text-slate-400 uppercase font-light -mt-0.5">
            C A F E
          </span>
        </a>
      </header>

      {/* Main Selection Area */}
      <main className="flex-1 bg-[#FAF8F5] py-10 px-4 sm:px-6 flex flex-col items-center relative overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00022C]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Heading Section */}
        <div className="text-center max-w-lg mx-auto mb-8 space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#00022C] text-white text-xs px-3.5 py-1 rounded-full border border-[#1C2359]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-semibold text-amber-200 tracking-wide">STORE PICKUP PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00022C] font-serif tracking-tight">
            Select Your Pickup Location
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
            Choose your preferred Noora Café branch in Qatar to view our menu and order for store pickup.
          </p>
        </div>

        {/* Branch Cards Stack */}
        <div className="w-full max-w-2xl space-y-4 relative z-10 pb-16">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              onClick={() => handleSelectBranch(branch)}
              className="group bg-white rounded-2xl border border-[#E5DFD1] hover:border-[#C5A059] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col sm:flex-row items-stretch justify-between relative active:scale-99"
            >
              {/* Left Marker Pin Container */}
              <div className="bg-[#FAF8F5] p-4 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-[#EDE7DB] shrink-0">
                <div className="w-12 h-12 rounded-xl bg-[#00022C] text-[#C5A059] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              {/* Middle Info Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-[#00022C] text-base sm:text-lg group-hover:text-[#C5A059] transition-colors">
                        {branch.name}
                      </h3>
                      {branch.isPopular && (
                        <span className="bg-[#00022C] text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                  </div>

                  {branch.nameAr && (
                    <p className="text-xs font-semibold text-slate-400 font-arabic pt-0.5">
                      {branch.nameAr}
                    </p>
                  )}
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{branch.hours}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Order Traffic | معدل الزحمة
                  </div>
                </div>
              </div>

              {/* Right Storefront Image Thumbnail & Traffic Badge */}
              <div className="w-full sm:w-40 h-32 sm:h-auto relative shrink-0 bg-[#00022C] flex flex-col justify-between overflow-hidden">
                <img
                  src={branch.illustration || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop'}
                  alt={branch.name}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Traffic Status Pill Badge */}
                <div className="absolute bottom-0 left-0 right-0">
                  {getTrafficBadge(branch.orderTraffic)}
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* Footer Bar */}
      <footer className="bg-[#00022C] text-white py-4 px-6 text-center text-xs font-light border-t border-[#141A45]">
        <p className="text-slate-400">
          Copyright © 2025 Noora Cafe. All Rights Reserved. | Store Pickup Portal
        </p>
      </footer>

    </div>
  );
};
