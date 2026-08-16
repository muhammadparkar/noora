'use client';

import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    selectedBranch,
    setIsBranchesOpen,
    setIsCheckoutOpen,
  } = useOrder();

  // Prevent background body scrolling while cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in touch-none">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Main Cart Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-up sm:animate-none pointer-events-auto">
        
        {/* Cart Header */}
        <div className="p-4 sm:p-6 bg-[#00022C] text-white flex items-center justify-between border-b border-[#141A45]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h2 className="text-lg font-bold tracking-tight">Your Pickup Cart</h2>
            <span className="bg-[#11174D] text-[#C5A059] text-xs font-bold px-2 py-0.5 rounded-full font-mono">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Store Branch Bar */}
        <div className="bg-[#F2ECE1] p-3 px-4 border-b border-[#E0D8C8] flex items-center justify-between text-xs text-[#00022C]">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="truncate">Pickup at: <strong className="font-semibold">{selectedBranch.name}</strong></span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsBranchesOpen(true);
            }}
            className="text-[11px] font-bold text-[#00022C] hover:underline underline-offset-2 shrink-0"
          >
            Change
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <ShoppingBag className="w-16 h-16 text-slate-200" />
              <h3 className="text-base font-bold text-slate-700">Your Cart is Empty</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Browse our gourmet coffee and freshly baked pastries to start your order.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 bg-[#00022C] text-white text-xs px-5 py-2.5 rounded-full font-semibold"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex gap-3 relative group"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-[#00022C] text-sm leading-snug">
                          {cartItem.item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(cartItem.cartItemId)}
                          className="text-slate-400 hover:text-red-500 transition p-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Details Pills */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cartItem.selectedSize && (
                          <span className="bg-white border border-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                            {cartItem.selectedSize.name}
                          </span>
                        )}
                        {cartItem.selectedMilk && (
                          <span className="bg-white border border-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                            {cartItem.selectedMilk.name}
                          </span>
                        )}
                        {cartItem.selectedSweetness && (
                          <span className="bg-white border border-slate-200 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                            {cartItem.selectedSweetness.name}
                          </span>
                        )}
                        {cartItem.selectedAddons.map((addon) => (
                          <span
                            key={addon.id}
                            className="bg-amber-50 border border-amber-200 text-amber-900 text-[10px] px-1.5 py-0.5 rounded"
                          >
                            +{addon.name}
                          </span>
                        ))}
                      </div>

                      {cartItem.specialNotes && (
                        <p className="text-[11px] italic text-slate-500 mt-1">
                          Note: &quot;{cartItem.specialNotes}&quot;
                        </p>
                      )}
                    </div>

                    {/* Quantity controls & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center bg-white border border-slate-300 rounded-full px-1 py-0.5">
                        <button
                          onClick={() =>
                            updateCartQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-[#00022C] font-mono text-sm">
                        QAR {cartItem.itemTotalPrice}
                      </span>
                    </div>

                  </div>
                </div>
              ))}

              <div className="pt-2 text-right">
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-red-600 underline font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 pb-8 sm:pb-6 bg-white border-t border-slate-200 space-y-4 shrink-0 shadow-lg">
            
            {/* Pay at Counter Guarantee Pill */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>No online payment needed.</strong> Pay at store counter during pickup.</span>
            </div>

            {/* Subtotal & Total */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-mono font-semibold">QAR {cartTotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pickup Fee</span>
                <span className="font-mono text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#00022C] pt-2 border-t border-slate-100">
                <span>Total Amount</span>
                <span className="font-mono text-[#00022C]">QAR {cartTotal}</span>
              </div>
            </div>

            {/* Proceed Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-between bg-[#00022C] hover:bg-[#11174D] text-white font-semibold text-sm py-3.5 px-5 rounded-full shadow-lg transition active:scale-95 group"
            >
              <span>Proceed to Pickup Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
