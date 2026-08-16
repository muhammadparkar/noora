import type { Metadata } from "next";
import "./globals.css";
import { OrderProvider } from "../context/OrderContext";

export const metadata: Metadata = {
  title: "Noora Café - Online Ordering & Store Pickup Portal",
  description: "Browse gourmet coffee and freshly baked pastries. Simple store pickup ordering with live barista POS integration.",
  keywords: ["Noora Cafe", "Qatar Coffee", "Online Ordering", "Store Pickup", "Bakery", "Pastries"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#0A0D1A]">
        <OrderProvider>
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
