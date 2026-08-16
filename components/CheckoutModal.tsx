'use client';

import React, { useState } from 'react';
import { X, MapPin, Clock, User, Phone, Mail, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { BRANCHES } from '../data/mockData';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    selectedBranch,
    setSelectedBranch,
    customerInfo,
    setCustomerInfo,
    placeOrder,
    setIsBranchesOpen,
  } = useOrder();

  const [pickupTimeOption, setPickupTimeOption] = useState<'asap' | '15min' | '30min' | 'scheduled'>('asap');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const getPickupTimeText = () => {
    switch (pickupTimeOption) {
      case 'asap':
        return 'As Soon As Possible (Ready in 10-15 min)';
      case '15min':
        return 'In 15 Minutes';
      case '30min':
        return 'In 30 Minutes';
      case 'scheduled':
        return 'Scheduled for 1 Hour Later Today';
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder(getPickupTimeText());
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={() => setIsCheckoutOpen(false)} />

      {/* Main Checkout Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-slide-up">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0A0D1A] text-white flex items-center justify-between border-b border-[#1E2540]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">STORE PICKUP ONLY</span>
            <h2 className="text-xl font-bold">Checkout & Pickup Request</h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Step 1: Pickup Location Card */}
          <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#0A0D1A] tracking-wider">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>1. Select Pickup Store Location</span>
              </div>
              <button
                type="button"
                onClick={() => setIsBranchesOpen(true)}
                className="text-xs font-semibold text-[#0A0D1A] hover:underline"
              >
                Change Store
              </button>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#DCD5C6] flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#0A0D1A] text-sm">{selectedBranch.name}</h4>
                <p className="text-xs text-slate-500">{selectedBranch.address}</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Open Today: {selectedBranch.hours}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>
          </div>

          {/* Step 2: Estimated Pickup Time */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs uppercase font-bold text-[#0A0D1A] tracking-wider">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              <span>2. Estimated Pickup Time</span>
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPickupTimeOption('asap')}
                className={`p-3 rounded-xl border text-left text-xs transition ${
                  pickupTimeOption === 'asap'
                    ? 'border-[#0A0D1A] bg-[#0A0D1A] text-white font-semibold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">ASAP (Ready in 10-15m)</div>
                <div className={pickupTimeOption === 'asap' ? 'text-amber-200 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  Fastest preparation
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPickupTimeOption('15min')}
                className={`p-3 rounded-xl border text-left text-xs transition ${
                  pickupTimeOption === '15min'
                    ? 'border-[#0A0D1A] bg-[#0A0D1A] text-white font-semibold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">In 15 Minutes</div>
                <div className={pickupTimeOption === '15min' ? 'text-amber-200 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  Perfect for commute
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPickupTimeOption('30min')}
                className={`p-3 rounded-xl border text-left text-xs transition ${
                  pickupTimeOption === '30min'
                    ? 'border-[#0A0D1A] bg-[#0A0D1A] text-white font-semibold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">In 30 Minutes</div>
                <div className={pickupTimeOption === '30min' ? 'text-amber-200 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  Order ahead
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPickupTimeOption('scheduled')}
                className={`p-3 rounded-xl border text-left text-xs transition ${
                  pickupTimeOption === 'scheduled'
                    ? 'border-[#0A0D1A] bg-[#0A0D1A] text-white font-semibold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Later Today</div>
                <div className={pickupTimeOption === 'scheduled' ? 'text-amber-200 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  Scheduled pickup
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Customer Details */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs uppercase font-bold text-[#0A0D1A] tracking-wider">
              <User className="w-4 h-4 text-[#C5A059]" />
              <span>3. Customer Contact Details</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0A0D1A]"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Mobile Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0A0D1A]"
                    placeholder="+974 5512 3456"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: No Online Payment Method Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Payment Policy (Store Pickup)</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>No online payment required.</strong> Pay conveniently at the store counter when collecting your order (Cash, Debit, Credit Card, or Apple Pay accepted).
            </p>
          </div>

          {/* Order Summary Item Cards */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Order Items ({cart.length})</span>
              <span className="font-mono text-[#0A0D1A]">QAR {cartTotal}</span>
            </div>
            <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1">
              {cart.map((i) => (
                <div key={i.cartItemId} className="flex justify-between text-xs text-slate-500">
                  <span className="truncate">{i.quantity}x {i.item.title}</span>
                  <span className="font-mono">QAR {i.itemTotalPrice}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#0A0D1A] hover:bg-[#161B33] text-white font-bold text-sm py-4 px-6 rounded-full shadow-xl transition active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Sending Order to Barista POS...</span>
            ) : (
              <>
                <span>Place Order & Send to POS</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
