'use client';

import React from 'react';
import { X, MapPin, Phone, Clock, CheckCircle2, Navigation } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { BRANCHES } from '../data/mockData';

export const BranchesModal: React.FC = () => {
  const { isBranchesOpen, setIsBranchesOpen, selectedBranch, setSelectedBranch } = useOrder();

  if (!isBranchesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      
      <div className="absolute inset-0" onClick={() => setIsBranchesOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-slide-up">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0A0D1A] text-white flex items-center justify-between border-b border-[#1E2540]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">STORE LOCATIONS</span>
            <h2 className="text-xl font-bold">Select Pickup Store Branch</h2>
          </div>
          <button
            onClick={() => setIsBranchesOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Branches Grid List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {BRANCHES.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;
            return (
              <div
                key={branch.id}
                onClick={() => {
                  setSelectedBranch(branch);
                  setIsBranchesOpen(false);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#0A0D1A] bg-[#FAF6EE] shadow-md'
                    : 'border-slate-200 bg-white hover:border-[#C5A059]/60 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#0A0D1A] text-base">{branch.name}</h3>
                    {branch.isPopular && (
                      <span className="bg-[#0A0D1A] text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  {branch.nameAr && (
                    <p className="text-xs text-slate-400 font-serif">{branch.nameAr}</p>
                  )}
                  <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span>{branch.address}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{branch.hours}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{branch.phone}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBranch(branch);
                      setIsBranchesOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-[#0A0D1A] text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? 'Selected Branch' : 'Select Branch'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
