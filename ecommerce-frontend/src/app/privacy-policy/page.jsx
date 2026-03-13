// src/app/privacy-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how AMAZON SMARTS collects, uses, and protects your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-24 selection:bg-purple-200">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
        {/* Subtle purple/indigo orb for a "security/privacy" vibe */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-400 font-medium text-lg">Your data is your business. Protecting it is ours.</p>
        </div>
      </div>

      {/* Document Container */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 lg:p-16">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>

          <div className="space-y-10 text-slate-600 leading-relaxed text-sm md:text-base">
            
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">1. Introduction</h2>
              <p>At <strong>AMAZON SMARTS</strong>, we are fully committed to respecting your privacy and protecting the personal data you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile applications, or make a purchase from our store.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">2. Information We Collect</h2>
              <p className="mb-3">We collect information that you provide directly to us, as well as data gathered automatically when you interact with our platform:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal Identity Information:</strong> Name, email address, phone number, shipping and billing addresses provided during registration or checkout.</li>
                <li><strong>Financial Information:</strong> Payment details are processed securely via our encrypted payment gateways (e.g., Razorpay, Stripe). We do not store your full credit card numbers on our servers.</li>
                <li><strong>Affiliate Data:</strong> UPI IDs, bank details, and referral history used exclusively for processing your Affiliate Wallet payouts.</li>
                <li><strong>Device & Usage Data:</strong> IP addresses, browser types, device identifiers, and browsing behavior on our site collected via cookies and analytics tools.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">Your data is used strictly to provide and improve our services. Specifically, we use your information to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Process and fulfill your gadget orders, including sending order confirmations and shipping updates.</li>
                <li>Manage your AMAZON SMARTS Affiliate Wallet, calculate commissions, and process withdrawal requests.</li>
                <li>Provide customer support and respond to your inquiries.</li>
                <li>Detect, prevent, and mitigate fraudulent activities to keep our platform secure.</li>
                <li>Send promotional emails and exclusive offers (you may opt out at any time).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">4. Sharing Your Information</h2>
              <p>We <strong>do not sell or rent</strong> your personal information to third parties. We only share your data with trusted service providers who assist us in operating our store. This includes shipping/logistics partners (to deliver your products), secure payment processors, and hosting services. All third parties are legally bound to keep your information confidential and secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">5. Data Security</h2>
              <p>We use state-of-the-art 256-bit SSL encryption and secure server hosting to protect your personal information from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">6. Your Rights & Choices</h2>
              <p>You have the right to access, update, or delete the personal information we hold about you. You can manage your profile directly through your Account Dashboard. If you wish to permanently delete your account and all associated data, please contact our Privacy Team.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">7. Contact Us</h2>
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact our Data Protection Officer at:</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-4 inline-block">
                <p className="font-bold text-slate-900">Email: <a href="mailto:privacy@amazonsmarts.com" className="text-orange-500 hover:underline">privacy@amazonsmarts.com</a></p>
                <p className="font-bold text-slate-900 mt-1">Address: AMAZON SMARTS Tech Tower, Sector 62, Mohali, Punjab, India</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}