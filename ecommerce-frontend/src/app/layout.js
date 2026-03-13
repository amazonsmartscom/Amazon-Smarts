// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext"; 
import { AuthProvider } from "../context/AuthContext"; 

// 🚀 IMPORT YOUR NEW GLOBAL COMPONENTS
import Header from "@/components/Headere";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "GADGETSTORE | Premium Tech & Electronics",
    template: "%s | GADGETSTORE" 
  },
  description: "Your premium destination for the latest smartphones, laptops, audio gear, and wearables.",
};

export const viewport = {
  themeColor: "#0f172a", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-slate-900 selection:bg-orange-500 selection:text-white flex flex-col min-h-screen`}>
        <AuthProvider>
          <CartProvider>
            
            {/* 🚀 GLOBAL HEADER */}
            <Header />

            {/* MAIN CONTENT AREA */}
            <main className="flex-grow">
              {children}
            </main>

            {/* 🚀 GLOBAL FOOTER */}
            <Footer />

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}