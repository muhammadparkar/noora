'use client';

import React from 'react';
import { Phone, Mail, MessageCircle, Globe, Share2 } from 'lucide-react';
import { BRANCHES } from '../data/mockData';
import { useOrder } from '../context/OrderContext';

export const Footer: React.FC = () => {
  const { setSelectedBranch, setIsBranchesOpen, setHasSelectedBranch } = useOrder();

  return (
    <footer className="bg-[#060914] text-white border-t border-[#18203B] pt-12 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Logo Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-[0.25em] text-white">
                  NOORA
                </span>
                <span className="w-12 h-[2px] bg-white inline-block relative -top-0.5">
                  <span className="absolute -right-1 -top-[3px] w-2 h-2 bg-white rotate-45" />
                </span>
              </div>
              <span className="text-[10px] tracking-[0.45em] text-slate-400 font-light uppercase pl-0.5 mt-0.5">
                C A F E
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              Dedicated to bringing you the finest selection of freshly baked pastries and gourmet coffee across Qatar.
            </p>
          </div>

          {/* Branches Column */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-sm font-extrabold tracking-widest text-[#C5A059] uppercase">
              Branches
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-light">
              {BRANCHES.map((b) => (
                <li key={b.id}>
                  <button
                    onClick={() => {
                      setSelectedBranch(b);
                      setHasSelectedBranch(true);
                    }}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1 text-left"
                  >
                    <span className="text-[#C5A059]">•</span>
                    <span>{b.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sitemap & Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold tracking-widest text-[#C5A059] uppercase">
                Sitemap
              </h3>
              <ul className="space-y-1 text-xs text-slate-300 font-light">
                <li><a href="#" className="hover:text-amber-300 transition">Home</a></li>
                <li><a href="#menu" className="hover:text-amber-300 transition">Menu</a></li>
                <li><button onClick={() => setIsBranchesOpen(true)} className="hover:text-amber-300 transition">Branches</button></li>
              </ul>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 font-light pt-2 border-t border-[#18203B]">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Phone: +974 3068 2006 / +974 4000 1333</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Email: info@nooracafe.com</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-[#141B33] hover:bg-[#C5A059] hover:text-black transition flex items-center justify-center text-slate-300" title="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#141B33] hover:bg-[#C5A059] hover:text-black transition flex items-center justify-center text-slate-300" title="Social">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#141B33] hover:bg-[#C5A059] hover:text-black transition flex items-center justify-center text-slate-300" title="Contact">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#18203B] text-center text-[11px] text-slate-500">
          <p>Copyright © 2025 Noora Cafe. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};
