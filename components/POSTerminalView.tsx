'use client';

import React, { useState } from 'react';
import { X, MonitorCheck, Clock, CheckCircle2, ChevronRight, Printer, Bell, Filter, Coffee } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { OrderStatus } from '../types';
import { BRANCHES } from '../data/mockData';

export const POSTerminalView: React.FC = () => {
  const {
    isPOSTerminalOpen,
    setIsPOSTerminalOpen,
    posOrders,
    updateOrderStatusInPOS,
  } = useOrder();

  const [posFilterBranch, setPosFilterBranch] = useState<string>('all');

  if (!isPOSTerminalOpen) return null;

  const filteredOrders = posOrders.filter((ord) => {
    if (posFilterBranch === 'all') return true;
    return ord.branch.id === posFilterBranch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Received':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">1. Received</span>;
      case 'Preparing':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold animate-pulse">2. Preparing</span>;
      case 'Ready for Pickup':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">3. Ready at Counter</span>;
      case 'Completed':
        return <span className="bg-slate-700 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-medium">4. Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-5xl bg-[#0F1426] text-slate-100 rounded-3xl shadow-2xl border border-[#2B355E] flex flex-col h-[90vh] overflow-hidden">
        
        {/* Terminal Top Bar */}
        <div className="p-4 sm:p-5 bg-[#070A14] border-b border-[#222C52] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C5A059] text-black flex items-center justify-center font-bold">
              <MonitorCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-wider text-white">NOORA CAFÉ POS TERMINAL</h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE KDS ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">Incoming online store pickup orders stream</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter by Branch */}
            <div className="hidden sm:flex items-center gap-2 bg-[#171E38] border border-[#2D3966] rounded-xl px-3 py-1.5 text-xs text-slate-200">
              <Filter className="w-3.5 h-3.5 text-[#C5A059]" />
              <select
                value={posFilterBranch}
                onChange={(e) => setPosFilterBranch(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-medium cursor-pointer"
              >
                <option value="all">All Branches ({posOrders.length})</option>
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id} className="bg-[#0F1426]">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsPOSTerminalOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* POS Kitchen Tickets Display Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0A0D1A]">
          {filteredOrders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
              <Coffee className="w-14 h-14 text-slate-600" />
              <h3 className="text-lg font-bold text-slate-300">No Orders in POS Queue</h3>
              <p className="text-xs max-w-sm">
                Place an order in the customer portal to see it arrive here in real-time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className={`rounded-2xl p-4 border transition-all flex flex-col justify-between space-y-4 ${
                    ord.status === 'Received'
                      ? 'bg-[#181F3B] border-amber-500/50 shadow-lg shadow-amber-500/10'
                      : ord.status === 'Preparing'
                      ? 'bg-[#131A33] border-blue-500/40'
                      : ord.status === 'Ready for Pickup'
                      ? 'bg-[#0E2021] border-emerald-500/40'
                      : 'bg-[#101529] border-[#222C52] opacity-70'
                  }`}
                >
                  {/* Ticket Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-extrabold text-amber-300 text-lg">
                        #{ord.orderNumber}
                      </span>
                      {getStatusBadge(ord.status)}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-[#252E52] pb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{ord.createdAt}</span>
                      </div>
                      <span className="font-medium text-slate-300">{ord.pickupTime}</span>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-[#070A14] p-2.5 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Customer:</span>
                        <strong className="text-white">{ord.customerInfo.name}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="font-mono text-slate-300">{ord.customerInfo.phone}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-amber-200">
                        <span>Pickup Store:</span>
                        <span className="truncate max-w-[140px]">{ord.branch.name.split(' - ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Items Ticket */}
                  <div className="space-y-2 text-xs flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      ORDER TICKET ({ord.items.length} items)
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {ord.items.map((cartItem) => (
                        <div
                          key={cartItem.cartItemId}
                          className="bg-[#171E38] p-2 rounded-lg border border-[#2D3966]"
                        >
                          <div className="flex justify-between font-bold text-white">
                            <span>
                              {cartItem.quantity}x {cartItem.item.title}
                            </span>
                            <span className="font-mono text-amber-300">QAR {cartItem.itemTotalPrice}</span>
                          </div>
                          {/* Options */}
                          <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-300">
                            {cartItem.selectedSize && <span>Size: {cartItem.selectedSize.name}</span>}
                            {cartItem.selectedMilk && <span>• Milk: {cartItem.selectedMilk.name}</span>}
                            {cartItem.selectedSweetness && <span>• Sweet: {cartItem.selectedSweetness.name}</span>}
                            {cartItem.selectedAddons.map((a) => (
                              <span key={a.id} className="text-amber-200">• +{a.name}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ticket Footer & Barista Status Controls */}
                  <div className="pt-3 border-t border-[#252E52] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Counter Total (Collect Payment):</span>
                      <span className="font-mono font-extrabold text-amber-300 text-base">
                        QAR {ord.total}
                      </span>
                    </div>

                    {/* Barista Advance Status Buttons */}
                    <div className="grid grid-cols-1 gap-1.5 pt-1">
                      {ord.status === 'Received' && (
                        <button
                          onClick={() => updateOrderStatusInPOS(ord.id, 'Preparing')}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                        >
                          <span>Start Preparing</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}

                      {ord.status === 'Preparing' && (
                        <button
                          onClick={() => updateOrderStatusInPOS(ord.id, 'Ready for Pickup')}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Ready for Pickup</span>
                        </button>
                      )}

                      {ord.status === 'Ready for Pickup' && (
                        <button
                          onClick={() => updateOrderStatusInPOS(ord.id, 'Completed')}
                          className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                        >
                          <span>Mark Picked Up & Paid</span>
                        </button>
                      )}

                      {ord.status === 'Completed' && (
                        <div className="text-center text-xs text-slate-500 font-medium py-1">
                          Completed & Delivered at Counter
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-3 bg-[#070A14] border-t border-[#222C52] text-xs text-slate-400 flex items-center justify-between">
          <span>Noora Cafe POS Terminal v2.4 | Synchronized with Customer Portal</span>
          <button
            onClick={() => setIsPOSTerminalOpen(false)}
            className="text-amber-300 hover:underline font-semibold"
          >
            Return to Customer View
          </button>
        </div>

      </div>
    </div>
  );
};
