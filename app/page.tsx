'use client';

import React from 'react';
import { Header } from '../components/Header';
import { MenuSection } from '../components/MenuSection';
import { Footer } from '../components/Footer';
import { ItemDetailModal } from '../components/ItemDetailModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { OrderTrackerModal } from '../components/OrderTrackerModal';
import { BranchesModal } from '../components/BranchesModal';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { CafeSelectionScreen } from '../components/CafeSelectionScreen';
import { useOrder } from '../context/OrderContext';

export default function Home() {
  const { hasSelectedBranch } = useOrder();

  // Initial Step: Cafe / Branch Location Selection Screen
  if (!hasSelectedBranch) {
    return <CafeSelectionScreen />;
  }

  // Once Cafe location is selected: Direct Online Ordering Menu Portal
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />
      <main className="flex-1 pb-16 sm:pb-0">
        <MenuSection />
      </main>
      <Footer />

      {/* Customer Modals & Drawers */}
      <ItemDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <BranchesModal />
      
      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
