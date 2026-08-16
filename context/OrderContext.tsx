'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  MenuItem,
  StoreBranch,
  Order,
  OrderStatus,
  CustomerInfo,
  CustomizationOption,
} from '../types';
import { BRANCHES } from '../data/mockData';

interface OrderContextType {
  cart: CartItem[];
  selectedBranch: StoreBranch;
  setSelectedBranch: (branch: StoreBranch) => void;
  hasSelectedBranch: boolean;
  setHasSelectedBranch: (selected: boolean) => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  activeOrders: Order[];
  posOrders: Order[];
  
  // Cart Actions
  addToCart: (
    item: MenuItem,
    quantity: number,
    selectedSize?: CustomizationOption,
    selectedMilk?: CustomizationOption,
    selectedSweetness?: CustomizationOption,
    selectedAddons?: CustomizationOption[],
    specialNotes?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Checkout & Order Placement
  placeOrder: (pickupTime: string) => Order;
  updateOrderStatusInPOS: (orderId: string, status: OrderStatus) => void;
  
  // UI Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isBranchesOpen: boolean;
  setIsBranchesOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isPOSTerminalOpen: boolean;
  setIsPOSTerminalOpen: (open: boolean) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  
  // Customization Modal
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState<StoreBranch>(BRANCHES[0]);
  const [hasSelectedBranch, setHasSelectedBranch] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: 'Jassim Al-Malki',
    phone: '+974 5512 3456',
    email: 'jassim@example.qa',
    pickupNotes: '',
  });

  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [posOrders, setPosOrders] = useState<Order[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isPOSTerminalOpen, setIsPOSTerminalOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Load sample order for live POS demonstration
  useEffect(() => {
    const sampleOrder: Order = {
      id: 'ord-sample-1',
      orderNumber: 'NOORA-8492',
      createdAt: new Date(Date.now() - 4 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerInfo: {
        name: 'Fatima Al-Kuwari',
        phone: '+974 6644 1122',
        email: 'fatima@example.qa',
        pickupNotes: 'Extra hot, please',
      },
      branch: BRANCHES[0],
      pickupTime: 'Ready in 10-15 min',
      items: [
        {
          cartItemId: 'item-sample-1',
          item: {
            id: 'noora-spanish-latte',
            title: 'Noora Signature Spanish Latte',
            description: '',
            price: 28,
            category: 'coffee',
            image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
          },
          quantity: 2,
          selectedSize: { id: 'lrg', name: 'Large (16 oz)', price: 4 },
          selectedMilk: { id: 'oat', name: 'Oat Milk', price: 4 },
          selectedSweetness: { id: 'half', name: 'Half Sweet (50%)', price: 0 },
          selectedAddons: [{ id: 'shot', name: 'Extra Espresso Shot', price: 5 }],
          itemTotalPrice: 82,
        },
        {
          cartItemId: 'item-sample-2',
          item: {
            id: 'pistachio-croissant',
            title: 'Artisanal Pistachio Croissant',
            description: '',
            price: 26,
            category: 'pastries',
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
          },
          quantity: 1,
          selectedAddons: [],
          itemTotalPrice: 26,
        },
      ],
      subtotal: 108,
      tax: 0,
      total: 108,
      status: 'Preparing',
      estimatedMinutes: 12,
      paymentMethod: 'Pay at Store Counter',
    };

    setPosOrders([sampleOrder]);
    setActiveOrders([sampleOrder]);
    setActiveTrackingOrderId(sampleOrder.id);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (
    item: MenuItem,
    quantity: number,
    selectedSize?: CustomizationOption,
    selectedMilk?: CustomizationOption,
    selectedSweetness?: CustomizationOption,
    selectedAddons: CustomizationOption[] = [],
    specialNotes: string = ''
  ) => {
    let unitPrice = item.price;
    if (selectedSize) unitPrice += selectedSize.price;
    if (selectedMilk) unitPrice += selectedMilk.price;
    if (selectedSweetness) unitPrice += selectedSweetness.price;
    selectedAddons.forEach((addon) => {
      unitPrice += addon.price;
    });

    const itemTotalPrice = unitPrice * quantity;
    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newItem: CartItem = {
      cartItemId,
      item,
      quantity,
      selectedSize,
      selectedMilk,
      selectedSweetness,
      selectedAddons,
      specialNotes,
      itemTotalPrice,
    };

    setCart((prev) => [...prev, newItem]);
    setCustomizingItem(null);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((cartItem) => {
        if (cartItem.cartItemId === cartItemId) {
          const unitPrice = cartItem.itemTotalPrice / cartItem.quantity;
          return {
            ...cartItem,
            quantity: newQty,
            itemTotalPrice: unitPrice * newQty,
          };
        }
        return cartItem;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (pickupTime: string): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `NOORA-${randomNum}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerInfo,
      branch: selectedBranch,
      pickupTime: pickupTime || 'As soon as possible (15-20 min)',
      items: [...cart],
      subtotal: cartTotal,
      tax: 0,
      total: cartTotal,
      status: 'Received',
      estimatedMinutes: 15,
      paymentMethod: 'Pay at Store Counter',
    };

    setActiveOrders((prev) => [newOrder, ...prev]);
    setPosOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrder.id);
    
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);

    return newOrder;
  };

  const updateOrderStatusInPOS = (orderId: string, status: OrderStatus) => {
    setPosOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    setActiveOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        selectedBranch,
        setSelectedBranch,
        hasSelectedBranch,
        setHasSelectedBranch,
        customerInfo,
        setCustomerInfo,
        activeOrders,
        posOrders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        placeOrder,
        updateOrderStatusInPOS,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBranchesOpen,
        setIsBranchesOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        isPOSTerminalOpen,
        setIsPOSTerminalOpen,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        customizingItem,
        setCustomizingItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
