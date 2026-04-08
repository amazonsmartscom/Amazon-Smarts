// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // 🚀 IMPORT NEXT.JS SCRIPT COMPONENT
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
    default: "AMAZON SMARTS | Premium Tech & Electronics",
    template: "%s | AMAZON SMARTS" 
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
      <head>
        {/* 🚀 META PIXEL SCRIPT */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1945241539454796');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-slate-900 selection:bg-orange-500 selection:text-white flex flex-col min-h-screen`}>
        
        {/* 🚀 META PIXEL NOSCRIPT FALLBACK */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1945241539454796&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>

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
