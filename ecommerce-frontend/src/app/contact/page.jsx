// src/app/contact/page.jsx
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ContactPage() {
  // 🚀 PASTE YOUR SHEETDB API URL HERE
  const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/aw8ddv99hnq34';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Add a date timestamp to the data
    const submissionData = {
      ...formData,
      date: new Date().toLocaleString('en-IN')
    };

    try {
      // SheetDB expects the payload to be wrapped in a "data" array or object
      await axios.post(SHEETDB_API_URL, {
        data: [submissionData]
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('SheetDB Error:', error);
      setStatus('error');
    }
  };

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium shadow-sm";
  const labelStyles = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-orange-200 py-12 md:py-20 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 font-black uppercase tracking-widest text-xs mb-3 block">Get in touch</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">How can we help you today?</h1>
          <p className="text-slate-500 font-medium text-lg">
            Whether you have a question about our products, need shipping updates, or want to explore partnership opportunities, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* LEFT: Contact Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🎧</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Customer Support</h3>
              <p className="text-slate-500 text-sm mb-4">Having trouble with an order or a device? Our support team is available 24/7.</p>
              <p className="font-bold text-slate-900"> info@amazonsmarts.com</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🤝</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Partnerships</h3>
              <p className="text-slate-500 text-sm mb-4">Want to sell your products on our platform or join our affiliate program?</p>
              <p className="font-bold text-slate-900"> info@amazonsmarts.com</p>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-7xl opacity-10">📍</div>
              <h3 className="text-lg font-black tracking-widest uppercase mb-4 text-orange-500">Headquarters</h3>
              <p className="font-medium text-slate-300 leading-relaxed mb-4">
                AMAZON SMARTS Tech Tower<br/>
                Sector 62, Mohali<br/>
                Punjab, India - 160062
              </p>
              <p className="text-sm font-bold text-slate-400">Hours: Mon-Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* RIGHT: Contact Form (SheetDB) */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative">
              <h2 className="text-2xl font-black text-slate-900 mb-8">Send us a message</h2>

              {status === 'success' && (
                <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center animate-fade-in-down">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl mx-auto mb-3 shadow-md">✓</div>
                  <h3 className="text-emerald-800 font-black text-lg mb-1">Message Sent Successfully!</h3>
                  <p className="text-emerald-600 text-sm font-medium">We've received your request and will get back to you within 24 hours.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center">
                  ⚠️ Oops! Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${status === 'success' ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyles}>Your Name</label>
                    <input 
                      type="text" required placeholder="John Doe" className={inputStyles} 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Email Address</label>
                    <input 
                      type="email" required placeholder="john@example.com" className={inputStyles} 
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelStyles}>Subject</label>
                  <select 
                    required className={`${inputStyles} cursor-pointer`}
                    value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="" disabled>Select a topic...</option>
                    <option value="Order Tracking">Track my order</option>
                    <option value="Product Inquiry">Product inquiry</option>
                    <option value="Returns & Refunds">Returns & Refunds</option>
                    <option value="Affiliate Program">Affiliate Program</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelStyles}>How can we help?</label>
                  <textarea 
                    required placeholder="Please describe your issue in detail..." className={`${inputStyles} h-40 resize-none`}
                    value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" disabled={status === 'loading'}
                  className={`w-full font-black py-4 rounded-xl uppercase tracking-widest transition-all duration-300 shadow-lg flex justify-center items-center gap-2 ${
                    status === 'loading' 
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' 
                      : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1'
                  }`}
                >
                  {status === 'loading' ? (
                    <><span className="animate-spin text-xl">⏳</span> Sending...</>
                  ) : (
                    'Send Message 🚀'
                  )}
                </button>
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                  Protected by standard 256-bit encryption
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}