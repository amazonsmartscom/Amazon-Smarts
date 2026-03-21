// src/app/terms/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Conditions of Use - Amazon Smarts',
  description: 'Legal terms and conditions for using AMAZON SMARTS.',
};

export default function TermsPage() {
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
          <span className="text-[#c45500]">Legal Policies</span>
        </div>

        {/* Main Document Card */}
        <div className="border border-[#DDD] rounded-[4px] p-6 md:p-10 shadow-sm">
          
          <h1 className="text-[28px] font-normal leading-tight mb-2">Conditions of Use</h1>
          <p className="text-[13px] text-[#565959] mb-8 border-b border-[#EEE] pb-4">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-[14px] leading-[1.5] text-[#0F1111]">
            
            <section>
              <p>Welcome to Amazon Smarts. Amazon Smarts and/or its provide website features and other products and services to you when you visit or shop at in.amazonsmarts.com. By using Amazon Smarts Services, you agree, on behalf of yourself and all members of your household and others who use any Service under your account, to the following conditions.</p>
              <p className="mt-4 font-bold italic">Please read these conditions carefully.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">1. Privacy</h2>
              <p>Please review our <Link href="/privacy-policy" className={amzLink}>Privacy Notice</Link>, which also governs your use of Amazon Smarts Services, to understand our practices.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">2. Your Account</h2>
              <p>You may need your own Amazon Smarts account to use certain Services, and you may be required to be logged in to the account and have a valid payment method associated with it. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account, and you agree to accept responsibility for all activities that occur under your account or password.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">3. Partner Program & Earnings Wallet</h2>
              <p>Amazon Smarts operates a proprietary Partner Program. Credits are issued to your Earnings Wallet upon successful, non-returned delivery of orders placed using your unique referral link or code. We strictly prohibit fraudulent promotion, self-referrals, or automated spamming. Amazon Smarts reserves the right to audit wallet activity and withhold payouts if these terms are breached.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">4. Product Descriptions & Pricing</h2>
              <p>Amazon Smarts attempts to be as accurate as possible. However, Amazon Smarts does not warrant that product descriptions or other content of any Service is accurate, complete, reliable, current, or error-free. If a product offered by Amazon Smarts itself is not as described, your sole remedy is to return it in unused condition.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">5. Sanctions and Export Policy</h2>
              <p>You may not use any Amazon Smarts Service if you are the subject of Indian sanctions or of sanctions consistent with Indian law imposed by the governments of the country where you are using Amazon Smarts Services.</p>
            </section>

            {/* Gray Legal Disclaimer Box */}
            <section className="bg-[#F3F3F3] p-6 rounded-[4px] border border-[#DDD]">
              <h2 className="text-[18px] font-bold mb-3">6. Disclaimer of Warranties and Limitation of Liability</h2>
              <p className="text-[13px] leading-relaxed">
                THE AMAZON SMARTS SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) AND OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICES ARE PROVIDED BY AMAZON SMARTS ON AN "AS IS" AND "AS AVAILABLE" BASIS, UNLESS OTHERWISE SPECIFIED IN WRITING. AMAZON SMARTS MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">7. Disputes & Governing Law</h2>
              <p>Any dispute or claim relating in any way to your use of any Amazon Smarts Service, or to any products or services sold or distributed by Amazon Smarts will be adjudicated in the courts of <strong>Punjab, India</strong>, and you consent to exclusive jurisdiction and venue in these courts.</p>
            </section>

          </div>
        </div>

        {/* Footer Area */}
        

      </div>
    </div>
  );
}