// src/app/cancellation-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Amazon Smarts Cancellation Policy',
  description: 'Order cancellation details for AMAZON SMARTS.',
};

export default function CancellationPolicyPage() {
  const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer";
  
  return (
    <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20 selection:bg-[#FEF8F2]">
      
      {/* Amazon Style Header Strip */}
      <div className="border-b border-[#DDD] py-4 bg-white">
        <div className="max-w-[1000px] mx-auto px-4">
          <Link href="/">
             <h1 className="text-2xl font-normal tracking-tighter text-[#111] cursor-pointer inline-block">
               amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span>
             </h1>
          </Link>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="text-[12px] text-[#565959] mb-6 flex items-center gap-1">
          <Link href="/help" className={amzLink}>Help & Customer Service</Link> 
          <span>›</span> 
          <span className="text-[#c45500]">Cancellations</span>
        </div>

        {/* Main Document Card */}
        <div className="border border-[#DDD] rounded-[4px] p-6 md:p-10 shadow-sm">
          
          <h1 className="text-[28px] font-normal leading-tight mb-2">Order Cancellation Policy</h1>
          <p className="text-[13px] text-[#565959] mb-8 border-b border-[#EEE] pb-4">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-[14px] leading-[1.5] text-[#0F1111]">
            
            <section>
              <h2 className="text-[18px] font-bold mb-3">1. Cancellation by Customer</h2>
              <p>At <strong>Amazon Smarts</strong>, we prioritize your convenience. We have established a simple cancellation process based on your order's current fulfillment status.</p>
              
              <div className="mt-6 space-y-4">
                <div className="bg-[#F7FAFA] border-l-4 border-[#007185] p-4">
                  <h3 className="font-bold text-[15px] mb-1">Before Shipment (Processing Phase)</h3>
                  <p className="text-[#333]">You can cancel your order at any time before it has been dispatched from our fulfillment center. No cancellation fees apply. If you have already paid, the full amount will be refunded to your original payment method within 2-5 business days.</p>
                </div>

                <div className="bg-[#FEF8F2] border-l-4 border-[#e77600] p-4">
                  <h3 className="font-bold text-[15px] mb-1">After Shipment</h3>
                  <p className="text-[#333]">Once an order is marked as "Shipped," it cannot be cancelled via the dashboard. However, you may refuse the delivery at your doorstep. Once the package returns to us, we will process a refund, deducting any applicable shipping charges.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">2. Cancellation by Amazon Smarts</h2>
              <p className="mb-3">We reserve the right to cancel any order for reasons including but not limited to:</p>
              <ul className="list-disc pl-8 space-y-2 text-[#333]">
                <li>Product stock unavailability or discontinuation.</li>
                <li>Inaccuracies in pricing or technical specifications.</li>
                <li>Identification of potential fraudulent activity by our security team.</li>
                <li>Delivery address residing outside our serviceable logistics network.</li>
              </ul>
              <p className="mt-4">If we cancel your order, you will be notified immediately via email/SMS, and a 100% refund will be issued.</p>
            </section>

            <section className="bg-[#F3F3F3] p-6 rounded-[4px] border border-[#DDD]">
              <h2 className="text-[18px] font-bold mb-3">3. How to Cancel</h2>
              <p className="mb-4">
                To cancel an active order, please navigate to the 
                <Link href="/orders" className={amzLink}> Your Orders</Link> section of your account. 
                Select the item you wish to cancel and click the <strong>"Cancel Order"</strong> button.
              </p>
              <p className="text-[13px] text-[#565959]">
                Note: If the "Cancel Order" button is not visible, your order is likely already in the shipping phase. 
                Please contact <strong>support@amazonsmarts.com</strong> for further assistance.
              </p>
            </section>

          </div>
        </div>

        {/* Footer Links */}
      

      </div>
    </div>
  );
}