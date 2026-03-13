// src/components/Footer.jsx
'use client'; // Required for state
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // 🚀 PASTE YOUR NEWSLETTER SHEETDB API URL HERE
  const NEWSLETTER_DB_URL = 'https://sheetdb.io/api/v1/2adqyzy93eips';

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await axios.post(NEWSLETTER_DB_URL, {
        data: [{
          email: email,
          date: new Date().toLocaleString('en-IN')
        }]
      });
      setStatus('success');
      setEmail('');
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Newsletter Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 mt-auto font-sans">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/">
            <h1 className="text-3xl font-black tracking-widest text-orange-500 inline-block">
              AMAZON<span className="text-white">SMARTS</span>
            </h1>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Your premium destination for the latest smartphones, cutting-edge laptops, and high-fidelity audio gear. Next-gen power at unbeatable prices.
          </p>
          <div className="flex gap-4 text-xl pt-2">
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white cursor-pointer transition-all">📱</span>
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white cursor-pointer transition-all">🐦</span>
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white cursor-pointer transition-all">📸</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-black text-white mb-6 uppercase tracking-widest text-sm">Shop Gadgets</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">All Products</Link></li>
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Smartphones</Link></li>
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Laptops & MacBooks</Link></li>
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Audio & Wearables</Link></li>
            <li><Link href="/cart" className="hover:text-orange-400 transition-colors flex items-center gap-2">View Cart <span className="bg-slate-800 text-xs px-2 py-0.5 rounded-full">New</span></Link></li>
          </ul>
        </div>

        {/* Support & Account Column */}
        <div>
          <h3 className="font-black text-white mb-6 uppercase tracking-widest text-sm">My Account</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/login" className="hover:text-orange-400 transition-colors">Sign In / Register</Link></li>
            <li><Link href="/orders" className="hover:text-orange-400 transition-colors">Track My Order</Link></li>
            <li><Link href="/wallet" className="hover:text-orange-400 transition-colors">Affiliate Wallet</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400 transition-colors cursor-pointer">Contact Support</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3 className="font-black text-white mb-6 uppercase tracking-widest text-sm">Join the VIP List</h3>
          <p className="text-sm mb-4 leading-relaxed">Subscribe to get special offers, free giveaways, and early access to mega sales.</p>
          
          <form onSubmit={handleSubscribe} className="relative">
            <div className="flex bg-slate-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-all">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === 'success' ? "Thank you! 🎉" : "Enter your email"} 
                className="bg-transparent w-full p-3 px-4 focus:outline-none text-white text-sm placeholder-slate-500" 
                disabled={status === 'loading' || status === 'success'}
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`px-6 text-sm font-black uppercase tracking-widest transition-colors ${
                  status === 'success' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Join'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-[10px] text-red-400 font-bold mt-2 absolute">Something went wrong. Try again.</p>
            )}
          </form>
          
          <p className="text-[10px] text-slate-500 mt-6 font-bold uppercase tracking-widest">Safe & Secure 256-bit SSL Checkout</p>
        </div>

      </div>
      
      {/* Policy Links */}
      <div className="max-w-[1600px] mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-widest">
        <p>© {new Date().getFullYear()} AMAZONSMARTS. All rights reserved.</p>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
          <li><Link href="/return-policy" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Return Policy</Link></li>
          <li><Link href="/shipping-policy" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Shipping Policy</Link></li>
          <li><Link href="/cancellation-policy" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Cancellation Policy</Link></li>
          <li><Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link></li>
          <li><Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
        </ul>
      </div>
    </footer>
  );
}