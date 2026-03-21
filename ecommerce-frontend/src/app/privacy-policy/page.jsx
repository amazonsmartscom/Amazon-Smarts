// src/app/privacy-policy/page.jsx
import Link from 'next/link';

export const metadata = {
  title: 'Amazon Smarts Privacy Notice',
  description: 'Learn how AMAZON SMARTS collects, uses, and protects your data.',
};

export default function PrivacyPolicyPage() {
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
          
          <h1 className="text-[28px] font-normal leading-tight mb-2">Amazon Smarts Privacy Notice</h1>
          <p className="text-[13px] text-[#565959] mb-8 border-b border-[#EEE] pb-4">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-[14px] leading-[1.5] text-[#0F1111]">
            
            <section>
              <p>We know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. This Privacy Notice describes how Amazon Smarts and its earnings collect and process your personal information through our website, devices, products, and services.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">What Personal Information About Customers Does Amazon Smarts Collect?</h2>
              <p className="mb-3">We collect your personal information in order to provide and continually improve our products and services. Here are the types of personal information we collect:</p>
              <ul className="list-disc pl-8 space-y-3">
                <li><strong>Information You Give Us:</strong> We receive and store any information you provide in relation to Amazon Smarts Services. You can choose not to provide certain information, but then you might not be able to take advantage of many of our services.</li>
                <li><strong>Automatic Information:</strong> We automatically collect and store certain types of information about your use of Amazon Smarts Services, including information about your interaction with content and services available through Amazon Smarts.</li>
                <li><strong>Information from Other Sources:</strong> We might receive information about you from other sources, such as updated delivery and address information from our carriers, which we use to correct our records and deliver your next purchase more easily.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">For What Purposes Does Amazon Smarts Use Your Personal Information?</h2>
              <p className="mb-3">We use your personal information to operate, provide, develop, and improve the products and services that we offer our customers. These purposes include:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Purchase and delivery of products and services.</li>
                <li>Provide, troubleshoot, and improve Amazon Smarts Services.</li>
                <li>Recommendations and personalization.</li>
                <li>Communicate with you via phone, email, or chat.</li>
                <li>Advertising and Fraud prevention.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">Does Amazon Smarts Share Your Personal Information?</h2>
              <p>Information about our customers is an important part of our business, and we are not in the business of selling our customers' personal information to others. We share customers' personal information only as described below and with subsidiaries that Amazon Smarts controls that either are subject to this Privacy Notice or follow practices at least as protective as those described in this Privacy Notice.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">How Secure Is Information About Me?</h2>
              <p>We design our systems with your security and privacy in mind. We work to protect the security of your personal information during transmission by using encryption protocols and software. We maintain physical, electronic, and procedural safeguards in connection with the collection, storage, and disclosure of customer personal information.</p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold mb-3">Are Children Allowed to Use Amazon Smarts Services?</h2>
              <p>Amazon Smarts does not sell products for purchase by children. We sell children's products for purchase by adults. If you are under 18, you may use Amazon Smarts Services only with the involvement of a parent or guardian.</p>
            </section>

            <section className="bg-[#F3F3F3] p-6 rounded-[4px] border border-[#DDD]">
              <h2 className="text-[18px] font-bold mb-3">Contacts, Notices, and Revisions</h2>
              <p className="mb-4">If you have any concern about privacy at Amazon Smarts, please contact us with a thorough description, and we will try to resolve it for you.</p>
              <p className="font-bold">Email: <a href="mailto:privacy@amazonsmarts.com" className={amzLink}>privacy@amazonsmarts.com</a></p>
              <p className="mt-1 font-normal text-[#565959]">Address: Amazon Smarts Legal Dept, Sector 62, Mohali, Punjab, India</p>
            </section>

          </div>
        </div>

        {/* Footer Links */}
        
      </div>
    </div>
  );
}