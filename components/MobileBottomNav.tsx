'use client';

import React from 'react';
import { Coffee, ShoppingBag, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const MobileBottomNav: React.FC = () => {
  const {
    cartItemCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    isBranchesOpen,
    setIsBranchesOpen,
    activeOrders,
  } = useOrder();

  const activeOrder = activeOrders[0];

  // Active tab calculations - tab only highlights when customer is actually viewing that page/modal
  const isCartActive = isCartOpen;
  const isTrackerActive = isOrderTrackerOpen;
  const isBranchesActive = isBranchesOpen;
  const isMenuActive = !isCartOpen && !isOrderTrackerOpen && !isBranchesOpen;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden block pointer-events-auto">
      
      {/* Floating Sticky Quick Cart Bar (Appears when cart has items on mobile) */}
      {cartItemCount > 0 && !isCartOpen && !isCheckoutOpenModal(isCartOpen) && (
        <div className="max-w-md mx-auto px-4 pb-2">
          <button
            onClick={() => {
              setIsOrderTrackerOpen(false);
              setIsBranchesOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full bg-[#0A0D1A] text-white p-3.5 rounded-2xl shadow-2xl border border-[#2B355E] flex items-center justify-between transition-all active:scale-98 animate-slide-up"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] text-black font-bold text-xs flex items-center justify-center font-mono">
                {cartItemCount}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">View Pickup Order</span>
                <span className="text-[10px] text-slate-300">Tap to review cart items</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-[#C5A059] text-sm">
                QAR {cartTotal}
              </span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      )}

      {/* Always Sticky Native App Bottom Navigation Bar for Mobile */}
      <div className="bg-[#0A0D1A] border-t border-[#1E2540] text-slate-400 py-2.5 px-3 shadow-2xl">
        <div className="flex items-center justify-around text-center max-w-md mx-auto">
          
          {/* Menu Tab - Only highlights when user is on the Menu page */}
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsOrderTrackerOpen(false);
              setIsBranchesOpen(false);
            }}
            className={`flex flex-col items-center gap-1 transition py-1 px-3.5 ${
              isMenuActive
                ? 'text-[#C5A059] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className={`w-5 h-5 ${isMenuActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
            <span className="text-[10px] font-semibold">Menu</span>
          </button>

          {/* Cart Tab - Only highlights when Cart drawer is open */}
          <button
            onClick={() => {
              setIsOrderTrackerOpen(false);
              setIsBranchesOpen(false);
              setIsCartOpen(true);
            }}
            className={`relative flex flex-col items-center gap-1 transition py-1 px-3.5 ${
              isCartActive
                ? 'text-[#C5A059] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${isCartActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
            <span className="text-[10px] font-semibold">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 right-2 bg-[#C5A059] text-black text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Active Order Tracker Tab - Only highlights when Tracker modal is open */}
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsBranchesOpen(false);
              setIsOrderTrackerOpen(true);
            }}
            className={`flex flex-col items-center gap-1 transition py-1 px-3.5 ${
              isTrackerActive
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className={`w-5 h-5 ${isTrackerActive ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
            <span className="text-[10px] font-semibold">
              {activeOrder ? activeOrder.status : 'Tracker'}
            </span>
          </button>

          {/* Branches Tab - Only highlights when Branches modal is open */}
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsOrderTrackerOpen(false);
              setIsBranchesOpen(true);
            }}
            className={`flex flex-col items-center gap-1 transition py-1 px-3.5 ${
              isBranchesActive
                ? 'text-[#C5A059] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className={`w-5 h-5 ${isBranchesActive ? 'text-[#C5A059]' : 'text-slate-400'}`} />
            <span className="text-[10px] font-semibold">Branches</span>
          </button>

        </div>
      </div>
    </div>
  );
};

// Helper for cart bar condition
function isCheckoutOpenModal(isCartOpen: boolean) {
  return isCartOpen;
}
