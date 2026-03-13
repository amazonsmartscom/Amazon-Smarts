// src/app/terms/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Legal terms and conditions for using AMAZON SMARTS.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-24 selection:bg-orange-200">
      <div className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-slate-800 to-transparent opacity-50"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-slate-400 font-medium text-lg">The rules and guidelines for using our platform.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 lg:p-16">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-10 text-slate-600 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">1. Introduction</h2>
              <p>Welcome to <strong>AMAZON SMARTS</strong>. These Terms and Conditions outline the rules and regulations for the use of the AMAZON SMARTS website, platform, and affiliate services. By accessing this website, we assume you accept these terms in full. Do not continue to use AMAZON SMARTS if you do not agree to all the terms stated on this page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">2. Account Registration and Security</h2>
              <p className="mb-3">To utilize certain features, including purchasing products or participating in our Affiliate Program, you must register for an account.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must provide accurate, current, and complete information during registration.</li>
                <li>You are solely responsible for maintaining the confidentiality of your password and account credentials.</li>
                <li>AMAZON SMARTS will not be liable for any loss or damage arising from your failure to protect your account.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">3. Affiliate Wallet and Referral Program</h2>
              <p>AMAZON SMARTS operates a proprietary Affiliate Program. Users are granted a unique referral code to share. Commissions are added to the user's "Affiliate Wallet" only when a successful, non-returned purchase is made using their code.</p>
              <p className="mt-3">We strictly prohibit self-referrals, spamming, or fraudulent promotion. AMAZON SMARTS reserves the right to freeze wallets, withhold payouts, and ban accounts if affiliate fraud is detected. Minimum withdrawal limits and standard banking processing times apply to all wallet cashouts.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">4. Pricing, Accuracy, and Availability</h2>
              <p>We strive to display accurate pricing and product specifications. However, errors may occasionally occur. AMAZON SMARTS reserves the right to change prices, descriptions, or availability of products without prior notice. If an item's correct price is higher than our stated price, we will, at our discretion, either contact you for instructions before shipping or cancel your order and notify you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">5. Intellectual Property</h2>
              <p>Unless otherwise stated, AMAZON SMARTS and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use, subject to restrictions set in these terms and conditions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">6. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of India. You irrevocably submit to the exclusive jurisdiction of the courts in Punjab, India, for the resolution of any disputes.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}