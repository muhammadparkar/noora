'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, MessageSquare } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { CustomizationOption, MenuItem } from '../types';

const ItemDetailModalContent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const { setCustomizingItem, addToCart } = useOrder();

  const cust = item.customizations;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<CustomizationOption | undefined>(
    cust?.sizes && cust.sizes.length > 0 ? cust.sizes[0] : undefined
  );
  const [selectedMilk, setSelectedMilk] = useState<CustomizationOption | undefined>(
    cust?.milkOptions && cust.milkOptions.length > 0 ? cust.milkOptions[0] : undefined
  );
  const [selectedSweetness, setSelectedSweetness] = useState<CustomizationOption | undefined>(
    cust?.sweetnessOptions && cust.sweetnessOptions.length > 0 ? cust.sweetnessOptions[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<CustomizationOption[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');

  // Prevent background body scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Calculate live total price
  let unitPrice = item.price;
  if (selectedSize) unitPrice += selectedSize.price;
  if (selectedMilk) unitPrice += selectedMilk.price;
  if (selectedSweetness) unitPrice += selectedSweetness.price;
  selectedAddons.forEach((addon) => {
    unitPrice += addon.price;
  });

  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon: CustomizationOption) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleAddToCart = () => {
    addToCart(
      item,
      quantity,
      selectedSize,
      selectedMilk,
      selectedSweetness,
      selectedAddons,
      specialNotes
    );
  };

  return (
    <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in touch-none">
      
      {/* Click outside backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => setCustomizingItem(null)}
      />

      {/* Main Bottom Sheet / Modal Frame */}
      <div className="relative w-full max-w-xl bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[82dvh] sm:max-h-[90vh] z-10 animate-slide-up mb-0 sm:mb-auto pointer-events-auto">
        
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-full flex justify-center py-2 bg-white shrink-0">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="relative h-36 sm:h-52 overflow-hidden bg-slate-900 shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => setCustomizingItem(null)}
            className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Item Info Header */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-black/70 px-2 py-0.5 rounded">
              {item.category}
            </span>
            <h2 className="text-lg sm:text-2xl font-bold mt-1 text-white leading-tight">
              {item.title}
            </h2>
            {item.titleAr && (
              <p className="text-xs text-slate-300 font-arabic">{item.titleAr}</p>
            )}
          </div>
        </div>

        {/* Customization Options Scrollable Body - with overscroll-contain to stop scroll chaining */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-5 flex-1 pb-6">
          
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Size Options */}
          {cust?.sizes && cust.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold text-[#00022C] tracking-wider block">
                Select Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cust.sizes.map((size) => {
                  const isSelected = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition ${
                        isSelected
                          ? 'border-[#00022C] bg-[#00022C] text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{size.name}</span>
                      <span className={isSelected ? 'text-[#C5A059]' : 'text-slate-500'}>
                        {size.price > 0 ? `+QAR ${size.price}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Milk Options */}
          {cust?.milkOptions && cust.milkOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold text-[#00022C] tracking-wider block">
                Choice of Milk
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cust.milkOptions.map((milk) => {
                  const isSelected = selectedMilk?.id === milk.id;
                  return (
                    <button
                      key={milk.id}
                      onClick={() => setSelectedMilk(milk)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition ${
                        isSelected
                          ? 'border-[#00022C] bg-[#00022C] text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{milk.name}</span>
                      {milk.price > 0 && (
                        <span className={isSelected ? 'text-[#C5A059]' : 'text-slate-400'}>
                          +{milk.price}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sweetness Options */}
          {cust?.sweetnessOptions && cust.sweetnessOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold text-[#00022C] tracking-wider block">
                Sweetness Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cust.sweetnessOptions.map((sw) => {
                  const isSelected = selectedSweetness?.id === sw.id;
                  return (
                    <button
                      key={sw.id}
                      onClick={() => setSelectedSweetness(sw)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition ${
                        isSelected
                          ? 'border-[#00022C] bg-[#00022C] text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {sw.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Checklist */}
          {cust?.addOns && cust.addOns.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold text-[#00022C] tracking-wider block">
                Add-ons & Extra Flavors
              </label>
              <div className="space-y-2">
                {cust.addOns.map((addon) => {
                  const isSelected = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#FAF6EE] text-[#00022C]'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isSelected
                              ? 'bg-[#00022C] border-[#00022C] text-[#C5A059]'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-mono text-slate-600">+QAR {addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-extrabold text-[#00022C] tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Special Barista Instructions</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Extra hot, light foam, separate lid..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00022C]"
            />
          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="p-3.5 sm:p-5 pb-6 sm:pb-5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0 shadow-lg z-20">
          
          {/* Quantity Selector */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200 transition active:scale-95"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-xs sm:text-sm font-bold font-mono text-[#00022C]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200 transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Submit Action Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-between bg-[#00022C] hover:bg-[#11174D] text-white font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-4 sm:px-5 rounded-full shadow-lg transition active:scale-95"
          >
            <span>Add to Pickup Order</span>
            <span className="font-mono text-[#C5A059] font-extrabold text-xs sm:text-sm">
              QAR {totalPrice}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

export const ItemDetailModal: React.FC = () => {
  const { customizingItem } = useOrder();

  if (!customizingItem) return null;

  return <ItemDetailModalContent key={customizingItem.id} item={customizingItem} />;
};
