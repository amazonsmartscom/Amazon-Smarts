// src/app/return-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Return & Refund Policy',
  description: 'Learn about the return and refund policies at AMAZON SMARTS.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-24 selection:bg-orange-200">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Return & Refund Policy</h1>
          <p className="text-slate-400 font-medium text-lg">Hassle-free returns because your satisfaction is our priority.</p>
        </div>
      </div>

      {/* Document Container */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 lg:p-16">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-10 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">1. The AMAZON SMARTS Guarantee</h2>
              <p>At <strong>AMAZON SMARTS</strong>, we want you to be completely satisfied with your premium tech purchases. If you receive a product that is defective, damaged in transit, or significantly different from what was described, we offer a comprehensive 7-Day Return and Replacement Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">2. Conditions for Return</h2>
              <p className="mb-3">To be eligible for a return or replacement, the following conditions must be met:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The return request must be initiated within <strong>7 days</strong> of the delivery date.</li>
                <li>The item must be unused, in its original pristine condition, and in the exact original packaging.</li>
                <li>All original tags, user manuals, warranty cards, and accessories must be included in the box.</li>
                <li>A valid proof of purchase or order receipt from AMAZON SMARTS must be provided.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">3. Non-Returnable Items</h2>
              <p className="mb-3">For hygiene and security reasons, the following items cannot be returned once the seal is broken:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>In-ear headphones, earbuds, and wearable tech (if unsealed).</li>
                <li>Downloadable software products and digital gift cards.</li>
                <li>Products damaged due to customer mishandling, power surges, or unauthorized tampering.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">4. Refund Process & Timelines</h2>
              <p className="mb-3">Once your return is received and inspected by our warehouse team, we will send you an email to notify you of the approval or rejection of your refund. If approved, your refund will be processed automatically.</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-4">
                <h4 className="font-bold text-slate-900 mb-2">Estimated processing times:</h4>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex justify-between"><span className="text-slate-500">Credit / Debit Cards</span> <span className="text-slate-900">5 - 7 Business Days</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">UPI / Net Banking</span> <span className="text-slate-900">2 - 4 Business Days</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">AMAZON SMARTS Wallet</span> <span className="text-emerald-600 font-bold">Instant</span></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">5. How to Initiate a Return</h2>
              <p>To start a return, please navigate to your <Link href="/orders" className="text-orange-500 font-bold hover:underline">Order History</Link>, select the item you wish to return, and click "Request Return." Alternatively, you can contact our 24/7 customer support team at <strong>support@amazonsmarts.com</strong> with your Order ID.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}