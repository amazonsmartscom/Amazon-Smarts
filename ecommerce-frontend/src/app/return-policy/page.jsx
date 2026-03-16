// src/app/return-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Amazon Smarts Returns Policy',
  description: 'Learn about the return and refund policies at AMAZON SMARTS.',
};

export default function ReturnPolicyPage() {
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
          <span className="text-[#c45500]">Returns & Refunds</span>
        </div>

        {/* Main Document Card */}
        <div className="border border-[#DDD] rounded-[4px] p-6 md:p-10 shadow-sm">
          
          <h1 className="text-[28px] font-normal leading-tight mb-2">Returns & Refunds Policy</h1>
          <p className="text-[13px] text-[#565959] mb-8 border-b border-[#EEE] pb-4">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-[14px] leading-[1.5] text-[#0F1111]">
            
            <section>
              <h2 className="text-[18px] font-bold mb-3">1. The Amazon Smarts Guarantee</h2>
              <p>We want you to be completely satisfied with your tech purchases. If you receive a product that is defective, damaged in transit, or significantly different from what was described, we offer a comprehensive 7-Day Return and Replacement Policy.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">2. Conditions for Return</h2>
              <p className="mb-3">To be eligible for a return or replacement, the following conditions must be met:</p>
              <ul className="list-disc pl-8 space-y-3">
                <li>Return requests must be initiated within <strong>7 days</strong> of the delivery date.</li>
                <li>Items must be unused, in their original pristine condition, and in the exact original packaging.</li>
                <li>All original tags, user manuals, warranty cards, and accessories must be included.</li>
                <li>A valid proof of purchase or order ID from Amazon Smarts must be provided.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">3. Non-Returnable Items</h2>
              <p className="mb-3">For hygiene and security reasons, the following items cannot be returned once the seal is broken:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>In-ear headphones, earbuds, and wearable tech (if unsealed).</li>
                <li>Downloadable software products and digital gift cards.</li>
                <li>Products damaged due to customer mishandling or unauthorized tampering.</li>
              </ul>
            </section>

            {/* Refund Table in Amazon Style Box */}
            <section className="bg-[#F3F3F3] p-6 rounded-[4px] border border-[#DDD]">
              <h2 className="text-[18px] font-bold mb-3">4. Refund Process & Timelines</h2>
              <p className="mb-4">Once your return is inspected and approved, your refund will be processed automatically to your original payment method.</p>
              
              <div className="bg-white border border-[#DDD] rounded-[4px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F7F7F7] border-b border-[#DDD] text-[12px] font-bold text-[#565959]">
                    <tr>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3">Refund Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEE]">
                    <tr className="text-[13px]">
                      <td className="p-3">Credit / Debit Cards</td>
                      <td className="p-3">5 - 7 Business Days</td>
                    </tr>
                    <tr className="text-[13px]">
                      <td className="p-3">UPI / Net Banking</td>
                      <td className="p-3">2 - 4 Business Days</td>
                    </tr>
                    <tr className="text-[13px]">
                      <td className="p-3">Amazon Smarts Wallet</td>
                      <td className="p-3 font-bold text-[#007600]">Instant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">5. How to Initiate a Return</h2>
              <p>
                To start a return, please navigate to your <Link href="/orders" className={amzLink}>Order History</Link>, select the item you wish to return, and click "Request Return." 
                Our customer support team is also available at <strong>support@amazonsmarts.com</strong> to assist you.
              </p>
            </section>

          </div>
        </div>

        {/* Footer Links */}
        

      </div>
    </div>
  );
}