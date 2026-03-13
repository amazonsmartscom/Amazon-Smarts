// src/app/shipping-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Shipping Policy',
  description: 'Fast and secure shipping information for AMAZON SMARTS.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-24 selection:bg-orange-200">
      <div className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Shipping Policy</h1>
          <p className="text-slate-400 font-medium text-lg">Premium logistics to get your tech safely to your doorstep.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 lg:p-16">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-10 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">1. Order Processing Time</h2>
              <p>At <strong>AMAZON SMARTS</strong>, we understand that waiting for a new gadget is the hardest part. All orders are processed and dispatched within <strong>1 to 2 business days</strong>. Orders are not shipped or delivered on Sundays or major public holidays.</p>
              <p className="mt-3">If we are experiencing an unusually high volume of orders during mega sales, shipments may be delayed by a few days. If there is a significant delay in the shipment of your order, we will contact you via email or telephone.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">2. Shipping Rates & Delivery Estimates</h2>
              <p className="mb-4">Shipping charges for your order will be calculated and displayed at checkout. We offer the following tiers:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-2xl mb-2">🚚</div>
                  <h3 className="font-black text-slate-900 mb-1">Standard Delivery</h3>
                  <p className="text-sm font-bold text-orange-600 mb-2">₹499 Flat Rate</p>
                  <p className="text-sm">For orders below ₹50,000. Delivery takes 3-5 business days depending on your location.</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="text-2xl mb-2">⚡</div>
                  <h3 className="font-black text-emerald-900 mb-1">Premium Delivery</h3>
                  <p className="text-sm font-black text-emerald-600 mb-2">FREE</p>
                  <p className="text-sm text-emerald-800">For all orders above ₹50,000. Priority handling and delivery within 2-4 business days.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">3. Shipment Confirmation & Order Tracking</h2>
              <p>You will receive a Shipment Confirmation email and SMS containing your tracking number(s) once your order has shipped. The tracking number will be active within 24 hours. You can track your package directly in the <Link href="/orders" className="text-orange-500 font-bold hover:underline">Orders section</Link> of your account.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">4. Damages and Lost Packages</h2>
              <p><strong>AMAZON SMARTS</strong> insures all packages during transit. If you receive a damaged package, please take a photo of the box before opening it and contact our support team immediately. If your package is lost in transit, we will initiate a full replacement at no extra cost to you.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}