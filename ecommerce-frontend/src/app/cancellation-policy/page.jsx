// src/app/cancellation-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Cancellation Policy',
  description: 'Order cancellation details for AMAZON SMARTS.',
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-24 selection:bg-orange-200">
      <div className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Cancellation Policy</h1>
          <p className="text-slate-400 font-medium text-lg">Change of mind? We make cancellations easy.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 lg:p-16">
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-10 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">1. Cancellation by Customer</h2>
              <p>At <strong>AMAZON SMARTS</strong>, we understand that you might occasionally change your mind about a purchase. We have a simple cancellation process based on your order's fulfillment status.</p>
              
              <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Before Shipment (Processing Phase)</h3>
              <p>You can cancel your order at any time before it has been dispatched from our fulfillment center. No cancellation fees will be charged. If you prepaid for the order, the full amount will be refunded to your original payment method within 2-5 business days.</p>
              
              <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">After Shipment</h3>
              <p>Once an order has been marked as "Shipped" and handed over to our logistics partners, it cannot be directly cancelled from your dashboard. However, you may refuse to accept the delivery when the courier partner arrives. Once the package is returned to our facility, we will process a refund, deducting any forward and return shipping charges incurred by us.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">2. Cancellation by AMAZON SMARTS</h2>
              <p className="mb-3">We reserve the right to cancel any order for the following reasons:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The product is suddenly out of stock or discontinued.</li>
                <li>Inaccuracies or errors in product pricing or technical information.</li>
                <li>Problems identified by our credit and fraud avoidance department.</li>
                <li>The delivery address falls outside our serviceable areas.</li>
              </ul>
              <p className="mt-4">If your order is cancelled by us, you will be notified immediately, and 100% of your payment will be refunded.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4">3. How to Cancel</h2>
              <p>To cancel an active order, log in to your account, go to <Link href="/orders" className="text-orange-500 font-bold hover:underline">My Orders</Link>, select the relevant order, and click the "Cancel Order" button. If the button is not visible, it means the order has already been shipped.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}