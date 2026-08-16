'use client';

import React from 'react';
import { X, CheckCircle2, Clock, MapPin, Phone, Coffee, QrCode, ShieldCheck } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { OrderStatus } from '../types';

export const OrderTrackerModal: React.FC = () => {
  const {
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    activeOrders,
    activeTrackingOrderId,
    setIsPOSTerminalOpen,
  } = useOrder();

  if (!isOrderTrackerOpen) return null;

  const currentOrder =
    activeOrders.find((o) => o.id === activeTrackingOrderId) || activeOrders[0];

  if (!currentOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
        <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4">
          <Coffee className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold">No Active Order Found</h3>
          <p className="text-xs text-slate-500">Place an order to track your pickup status live.</p>
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="w-full bg-[#0A0D1A] text-white text-xs py-2.5 rounded-full font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const steps: { label: OrderStatus; desc: string }[] = [
    { label: 'Received', desc: 'Order sent to café POS' },
    { label: 'Preparing', desc: 'Barista crafting your items' },
    { label: 'Ready for Pickup', desc: 'Ready at counter!' },
    { label: 'Completed', desc: 'Picked up' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Received':
        return 0;
      case 'Preparing':
        return 1;
      case 'Ready for Pickup':
        return 2;
      case 'Completed':
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      
      <div className="absolute inset-0" onClick={() => setIsOrderTrackerOpen(false)} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 animate-slide-up">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0A0D1A] text-white flex items-center justify-between border-b border-[#1E2540]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              LIVE PICKUP TRACKER
            </span>
            <h2 className="text-xl font-extrabold font-mono text-[#C5A059] mt-0.5">
              Order #{currentOrder.orderNumber}
            </h2>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracker Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Animated Status Alert Box */}
          <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-2xl p-4 text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#0A0D1A] text-amber-200 px-3.5 py-1 rounded-full text-xs font-bold font-mono">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>ESTIMATED: {currentOrder.pickupTime}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0A0D1A]">
              {currentOrder.status === 'Ready for Pickup'
                ? '🎉 Your Order is Ready at the Counter!'
                : currentOrder.status === 'Preparing'
                ? '☕ Barista is Preparing Your Order'
                : currentOrder.status === 'Completed'
                ? '✅ Order Picked Up'
                : '📥 Order Received by Café POS'}
            </h3>
            <p className="text-xs text-slate-500">
              Please present your order number at <strong className="text-[#0A0D1A]">{currentOrder.branch.name}</strong>.
            </p>
          </div>

          {/* Stepper Visualizer */}
          <div className="py-2">
            <div className="relative flex items-center justify-between">
              {/* Connecting Bar */}
              <div className="absolute left-0 right-0 top-4 h-1 bg-slate-200 -z-0" />
              <div
                className="absolute left-0 top-4 h-1 bg-[#0A0D1A] transition-all duration-500 -z-0"
                style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((st, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={st.label} className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#C5A059] text-black ring-4 ring-amber-100 scale-110 shadow-md'
                          : isPassed
                          ? 'bg-[#0A0D1A] text-white'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2 max-w-[70px] leading-tight ${
                        isCurrent ? 'text-[#0A0D1A]' : 'text-slate-500'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulated QR Code ticket for pickup counter */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white p-2 border border-slate-300 rounded-xl flex items-center justify-center shrink-0">
                <QrCode className="w-12 h-12 text-[#0A0D1A]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">STORE COUNTER TICKET</span>
                <span className="font-mono font-bold text-base text-[#0A0D1A]">{currentOrder.orderNumber}</span>
                <p className="text-[11px] text-slate-500">Show this code or order number to barista</p>
              </div>
            </div>

            <div className="text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4 w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">TOTAL TO PAY AT STORE</span>
              <span className="font-mono font-extrabold text-lg text-[#0A0D1A]">QAR {currentOrder.total}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">Pay Cash / Card / Apple Pay</span>
            </div>
          </div>

          {/* Branch Details */}
          <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-2xl p-4 space-y-2 text-xs text-slate-700">
            <div className="font-bold text-[#0A0D1A] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Pickup Location</span>
            </div>
            <p className="font-semibold text-slate-800">{currentOrder.branch.name}</p>
            <p className="text-slate-500">{currentOrder.branch.address}</p>
            <div className="flex items-center gap-1.5 text-slate-600 pt-1">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{currentOrder.branch.phone}</span>
            </div>
          </div>

          {/* Items Summary list */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold text-[#0A0D1A] tracking-wider">Ordered Items</h4>
            <div className="space-y-2">
              {currentOrder.items.map((cartItem) => (
                <div key={cartItem.cartItemId} className="flex justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                  <div>
                    <span className="font-bold text-[#0A0D1A]">{cartItem.quantity}x {cartItem.item.title}</span>
                    {cartItem.selectedMilk && (
                      <span className="text-slate-500 block text-[11px]">{cartItem.selectedMilk.name}</span>
                    )}
                  </div>
                  <span className="font-mono font-semibold">QAR {cartItem.itemTotalPrice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link to view POS view */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setIsOrderTrackerOpen(false);
                setIsPOSTerminalOpen(true);
              }}
              className="text-xs text-[#0A0D1A] hover:underline font-semibold"
            >
              ⚡ View Barista Live POS Screen (Staff Mode Demo)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
