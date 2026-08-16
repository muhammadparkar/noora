'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Coffee, Flame } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/mockData';
import { CategoryId, MenuItem } from '../types';
import { useOrder } from '../context/OrderContext';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const {
    setCustomizingItem,
    addToCart,
    cart,
    updateCartQuantity,
    removeFromCart,
  } = useOrder();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.titleAr && item.titleAr.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCategoryName = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.id === selectedCategory);
    return cat ? cat.name : 'All Items';
  }, [selectedCategory]);

  const getItemCartInfo = (itemId: string) => {
    const matchingCartItems = cart.filter((ci) => ci.item.id === itemId);
    const totalQty = matchingCartItems.reduce((sum, ci) => sum + ci.quantity, 0);
    const firstCartItemId = matchingCartItems[0]?.cartItemId;
    return { totalQty, firstCartItemId, matchingCartItems };
  };

  const handleDecrement = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    const { totalQty, firstCartItemId, matchingCartItems } = getItemCartInfo(item.id);
    if (totalQty <= 0 || !firstCartItemId) return;

    const firstItem = matchingCartItems[0];
    if (firstItem.quantity > 1) {
      updateCartQuantity(firstItem.cartItemId, firstItem.quantity - 1);
    } else {
      removeFromCart(firstItem.cartItemId);
    }
  };

  const handleIncrement = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (item.customizations) {
      setCustomizingItem(item);
    } else {
      addToCart(item, 1);
    }
  };

  return (
    <section id="menu" className="py-4 sm:py-6 bg-[#FAF8F5] pb-28 sm:pb-12 font-sans">
      <div className="max-w-3xl mx-auto px-4 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search coffee, pastries, sandwiches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#DCD5C6] rounded-full pl-11 pr-10 py-3 text-xs sm:text-sm text-[#0A0D1A] placeholder:text-slate-400 focus:outline-none focus:border-[#0A0D1A] shadow-sm transition font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 shrink-0 tracking-wide ${
                  isActive
                    ? 'bg-[#0A0D1A] text-white shadow-md font-extrabold ring-2 ring-[#C5A059]/40'
                    : 'bg-white text-slate-700 hover:bg-[#F2ECE1] border border-[#E0D8C8]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Category Header */}
        <div className="pt-2 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-[#0A0D1A] tracking-tight">
            {activeCategoryName}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {filteredItems.length} items available
          </span>
        </div>

        {/* Menu Items Cards */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E8E2D5] p-6 space-y-2">
            <Coffee className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-[#0A0D1A]">No Items Found</h3>
            <p className="text-xs text-slate-400">Try searching for a different item.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 bg-[#0A0D1A] text-white text-xs px-4 py-2 rounded-full font-semibold"
            >
              Show All Menu
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredItems.map((item) => {
              const { totalQty } = getItemCartInfo(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setCustomizingItem(item)}
                  className="group bg-white rounded-3xl border border-[#E8E2D5] hover:border-[#C5A059] p-3.5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-3.5 sm:gap-4 relative active:scale-99"
                >
                  {/* Food Image Container */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative shadow-inner">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    {/* Primary Tag Badge */}
                    {item.tags && item.tags.length > 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-[#0A0D1A]/90 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm tracking-wider uppercase">
                        {item.tags[0]}
                      </span>
                    )}

                    {/* Calories Tag */}
                    {item.calories && (
                      <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-slate-200 text-[9px] font-mono px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 text-amber-400" />
                        <span>{item.calories}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5 space-y-1.5">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-extrabold text-[#0A0D1A] text-sm sm:text-base group-hover:text-[#C5A059] transition-colors leading-snug truncate tracking-tight">
                          {item.title}
                        </h3>
                      </div>

                      {item.titleAr && (
                        <p className="text-[11px] font-bold text-[#C5A059] font-arabic mt-0.5">
                          {item.titleAr}
                        </p>
                      )}

                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed font-normal mt-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Consistent Fixed-Width Action Button Row */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">QAR</span>
                        <span className="font-extrabold text-[#0A0D1A] text-base sm:text-lg font-mono">
                          {item.price}
                        </span>
                      </div>

                      {/* Action Button Container - Fixed Width (96px) & Height (32px) for Consistent Sizing */}
                      <div className="w-[96px] h-8 flex justify-end shrink-0">
                        {totalQty > 0 ? (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="w-full h-full flex items-center justify-between bg-[#0A0D1A] text-white rounded-full p-1 border border-[#C5A059]/40 shadow-sm animate-fade-in"
                          >
                            <button
                              onClick={(e) => handleDecrement(e, item)}
                              className="w-6 h-6 rounded-full bg-[#1A223D] hover:bg-[#253054] text-[#C5A059] flex items-center justify-center transition active:scale-90 shrink-0"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            
                            <span className="text-xs font-mono font-extrabold text-amber-200 text-center flex-1">
                              {totalQty}
                            </span>

                            <button
                              onClick={(e) => handleIncrement(e, item)}
                              className="w-6 h-6 rounded-full bg-[#1A223D] hover:bg-[#253054] text-[#C5A059] flex items-center justify-center transition active:scale-90 shrink-0"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.customizations) {
                                setCustomizingItem(item);
                              } else {
                                addToCart(item, 1);
                              }
                            }}
                            className="w-full h-full flex items-center justify-center gap-1 bg-[#0A0D1A] group-hover:bg-[#19213D] text-white text-xs font-bold rounded-full shadow-sm transition active:scale-95 tracking-wide"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                            <span className="truncate">{item.customizations ? 'Option' : 'Add'}</span>
                          </button>
                        )}
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
