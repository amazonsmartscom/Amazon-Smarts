// src/app/shipping-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Amazon Smarts Shipping Policy',
  description: 'Fast and secure shipping information for AMAZON SMARTS.',
};

export default function ShippingPolicyPage() {
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
          <span className="text-[#c45500]">Shipping & Delivery</span>
        </div>

        {/* Main Document Card */}
        <div className="border border-[#DDD] rounded-[4px] p-6 md:p-10 shadow-sm">
          
          <h1 className="text-[28px] font-normal leading-tight mb-2">Shipping & Delivery Policy</h1>
          <p className="text-[13px] text-[#565959] mb-8 border-b border-[#EEE] pb-4">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-[14px] leading-[1.5] text-[#0F1111]">
            
            <section>
              <h2 className="text-[18px] font-bold mb-3">1. Order Processing Time</h2>
              <p>At <strong>Amazon Smarts</strong>, we prioritize getting your tech to you as quickly as possible. All orders are processed and dispatched within <strong>1 to 2 business days</strong>. Please note that orders are not processed, shipped, or delivered on Sundays or major public holidays.</p>
              <p className="mt-3 text-[#565959] italic">During peak seasonal events or mega-sales, processing may take an additional 1-2 days. If your shipment is significantly delayed, our team will reach out via email or SMS.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">2. Shipping Rates & Delivery Estimates</h2>
              <p className="mb-4">Shipping charges and delivery timelines are calculated based on your order value and location:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Standard Card */}
                <div className="border border-[#DDD] rounded-[4px] p-5 bg-[#F7FAFA]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🚚</span>
                    <h3 className="font-bold">Standard Delivery</h3>
                  </div>
                  <p className="text-[15px] font-bold text-[#B12704] mb-2">₹499 Flat Rate</p>
                  <p className="text-[13px] text-[#565959]">Applies to orders below ₹50,000. Delivery typically takes 3-5 business days.</p>
                </div>

                {/* Premium Card */}
                <div className="border border-[#007600] rounded-[4px] p-5 bg-[#F7FCF7]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚡</span>
                    <h3 className="font-bold text-[#007600]">Premium Delivery</h3>
                  </div>
                  <p className="text-[15px] font-bold text-[#007600] mb-2">FREE</p>
                  <p className="text-[13px] text-[#565959]">Automatically applied to orders above ₹50,000. Includes priority handling and 2-4 day delivery.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">3. Shipment Confirmation & Order Tracking</h2>
              <p>
                Once your order leaves our fulfillment center, you will receive a Shipment Confirmation email and SMS containing your tracking number(s). 
                The tracking information usually becomes active within 24 hours. You can track your package's real-time progress in the 
                <Link href="/orders" className={amzLink}> Your Orders</Link> section of your account.
              </p>
            </section>

            <section className="bg-[#F3F3F3] p-6 rounded-[4px] border border-[#DDD]">
              <h2 className="text-[18px] font-bold mb-3">4. Damages and Lost Packages</h2>
              <p className="mb-2"><strong>Amazon Smarts</strong> insures all premium tech packages during transit to ensure your investment is protected.</p>
              <ul className="list-disc pl-5 space-y-2 text-[#565959]">
                <li>If you receive a package that appears damaged or tampered with, please record a video or take photos before opening.</li>
                <li>Report any delivery issues to <strong>support@amazonsmarts.com</strong> within 24 hours of receipt.</li>
                <li>If a package is confirmed lost by our logistics partner, we will ship a replacement at no additional cost.</li>
              </ul>
            </section>

          </div>
        </div>

        {/* Footer Links */}
        

      </div>
    </div>
  );
}