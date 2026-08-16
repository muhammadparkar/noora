'use client';

import React from 'react';
import { ArrowRight, MapPin, Sparkles, Clock, ShieldCheck, Coffee } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const Hero: React.FC = () => {
  const { selectedBranch, setIsBranchesOpen } = useOrder();

  return (
    <section className="relative bg-[#FAF8F5] border-b border-[#E6E0D4] overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0A0D1A]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Store Pickup Active Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0A0D1A] text-white text-xs px-3.5 py-1.5 rounded-full border border-[#2B355E] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-semibold text-amber-200 tracking-wide">STORE PICKUP PORTAL</span>
              <span className="text-slate-400">| No Online Payment Required</span>
            </div>

            {/* Main Headline matching reference website image */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0A0D1A] tracking-tight leading-none font-serif">
                Taste.
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#1A223D] tracking-tight">
                Freshly Baked Pastries and Gourmet Coffee.
              </p>
            </div>

            {/* Paragraph matching exact reference text */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Noora Cafe is dedicated to bringing you the finest selection of freshly baked pastries and gourmet coffee.
              Our passion for quality and taste is evident in every bite and sip. Indulge in our delectable treats and energizing brews, carefully crafted to elevate your dining experience.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-[#0A0D1A] hover:bg-[#161B33] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group"
              >
                <span>View Menu & Order</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setIsBranchesOpen(true)}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0A0D1A] font-semibold text-sm px-5 py-3.5 rounded-full border border-[#D5CEBF] shadow-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Selected Branch: <strong className="text-[#0A0D1A]">{selectedBranch.name.split(' - ')[0]}</strong></span>
              </button>
            </div>

            {/* Pickup Highlights Strip */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E8E2D5] max-w-xl text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Ready in 10-15 mins</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Crafted Fresh</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Pay at Counter</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0A0D1A]">
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop"
                alt="Noora Gourmet Coffee & Pastries"
                className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1A] via-transparent to-transparent opacity-90" />
              
              {/* Floating Badge on Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0A0D1A]/90 backdrop-blur-md rounded-2xl border border-[#2B355E] text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">FEATURED SPECIALTY</span>
                    <h3 className="text-base font-bold text-white">Noora Signature Spanish Latte</h3>
                    <p className="text-xs text-slate-300">Double espresso, sweet condensed milk, cinnamon</p>
                  </div>
                  <span className="text-lg font-bold text-[#C5A059] font-mono">QAR 28</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
