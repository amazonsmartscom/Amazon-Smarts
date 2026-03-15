// // src/app/admin-login/page.jsx
// 'use client';
// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';

// export default function AdminLoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleAdminLogin = async (e) => {
//     e.preventDefault();
//     const result = await login(email, password);
    
//     if (result.success && result.role === 'admin') {
//       router.push('/admin');
//     } else if (result.success && result.role !== 'admin') {
//       alert("Access Denied: You are not an Admin");
//     } else {
//       alert("Invalid Admin Credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900">
//       <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl">
//         <h1 className="text-2xl font-black text-center mb-6 text-slate-800 uppercase tracking-tighter">
//           Admin <span className="text-orange-500">Secure Access</span>
//         </h1>
//         <form onSubmit={handleAdminLogin} className="space-y-4">
//           <input 
//             type="email" placeholder="Admin Email" 
//             className="w-full p-3 border rounded-lg"
//             onChange={e => setEmail(e.target.value)}
//           />
//           <input 
//             type="password" placeholder="Password" 
//             className="w-full p-3 border rounded-lg"
//             onChange={e => setPassword(e.target.value)}
//           />
//           <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-all">
//             Unlock Dashboard
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// src/app/admin-login/page.jsx
'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      // Checking for admin role (Handling both possible user object structures)
      const isAdmin = result.role === 'admin' || result.user?.role === 'admin';

      if (result.success && isAdmin) {
        window.location.replace('/admin'); // Force refresh to load admin context
      } else if (result.success && !isAdmin) {
        setError("Access Denied: You do not have administrator privileges.");
        setLoading(false);
      } else {
        setError(result.message || "Invalid Admin Credentials.");
        setLoading(false);
      }
    } catch (err) {
      setError("An internal system error occurred. Try again.");
      setLoading(false);
    }
  };

  // 🚀 AMAZON-SPECIFIC TAILWIND STYLES
  const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
  const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
  const amzButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-sm text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200">
      
      {/* Amazon Style Logo */}
      <div className="mb-4 mt-2 text-center">
        <Link href="/">
          <h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">
            amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span>
          </h1>
        </Link>
        <p className="text-[13px] font-bold text-[#565959] mt-1 tracking-widest uppercase">Admin Central</p>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0">
        
        {/* Error Alert Box */}
        {error && (
          <div className="mb-4 p-4 border-l-4 border-l-[#c40000] border border-[#e3e3e3] rounded-[3px] flex gap-3 items-start shadow-sm">
            <span className="text-[#c40000] text-lg leading-none font-bold">!</span>
            <div>
              <h4 className="text-[#c40000] text-sm font-bold mb-0.5">There was a problem</h4>
              <p className="text-[13px] text-[#111]">{error}</p>
            </div>
          </div>
        )}

        <div className="border border-[#ddd] rounded-[4px] p-[22px]">
          
          <form onSubmit={handleAdminLogin} className="space-y-3.5">
            <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Sign in</h2>
            <div className="bg-[#f0f2f2] border border-[#d5d9d9] p-2 rounded-[3px] mb-4 text-center">
              <span className="text-[12px] font-bold text-[#0F1111]">Internal System Access Only</span>
            </div>
            
            <div>
              <label className={labelStyles}>Admin Email</label>
              <input 
                type="email" 
                required 
                className={inputStyles} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={labelStyles}>Master Password</label>
              </div>
              <input 
                type="password" 
                required 
                className={inputStyles} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            
            <div className="pt-2">
              <button type="submit" disabled={loading} className={amzButton}>
                {loading ? 'Authenticating...' : 'Sign in'}
              </button>
            </div>

            <div className="text-[12px] text-[#111] mt-4 mb-6 leading-relaxed">
              By logging into this portal, you agree to Amazon Smarts's{' '}
              <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Internal Policies</span>{' '}
              and strict data privacy regulations.
            </div>

          </form>
        </div>

      </div>

      {/* Amazon Style Footer Links */}
      <div className="w-full mt-10 border-t border-[#ddd] bg-white pt-6 pb-10 flex flex-col items-center shadow-[0_-2px_4px_rgba(0,0,0,0.02)] flex-grow">
        <div className="flex flex-wrap justify-center gap-6 text-[11px] text-[#0066c0] mb-2">
          <Link href="/" className="hover:underline">Back to Storefront</Link>
          <span className="text-[#555]">|</span>
          <span className="cursor-not-allowed">Authorized Personnel Only</span>
        </div>
        <p className="text-[11px] text-[#555]">
          © {new Date().getFullYear()}, AmazonSmarts.com, Inc. or its affiliates
        </p>
      </div>

    </div>
  );
}
