// // src/app/login/page.jsx
// 'use client';
// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // 🚀 Add this line!
  
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   setError('');
//   setLoading(true);
  
//   try {
//     const result = await login(email, password); // Wait for the result
    
//     if (result.success) {
//       // 🚀 FORCE REDIRECT: Use window.location.replace for a clean state refresh
//       // or router.push('/') if your context updates instantly.
//       window.location.replace('/'); 
//     } else {
//       setError(result.message);
//       setLoading(false);
//     }
//   } catch (err) {
//     setError("Something went wrong. Try again.");
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md border border-gray-100">
        
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-500">Sign in to your GadgetStore account</p>
//         </div>

//         {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">{error}</div>}

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <input 
//               type="email" 
//               required 
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" 
//               onChange={e => setEmail(e.target.value)} 
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input 
//               type="password" 
//               required 
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" 
//               onChange={e => setPassword(e.target.value)} 
//             />
//           </div>

//           <button 
//   type="submit" 
//   disabled={loading}
//   className={`w-full font-bold py-3 rounded-lg transition-colors shadow-sm ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
// >
//   {loading ? 'Signing In...' : 'Sign In'}
// </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           New to GadgetStore?{' '}
//           <Link href="/register" className="text-orange-600 hover:underline font-semibold">
//             Create an account
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/app/login/page.jsx
'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(email, password); 
      
      if (result.success) {
        // FORCE REDIRECT: Clean state refresh to load user data globally
        window.location.replace('/'); 
      } else {
        setError(result.message);
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium shadow-sm";
  const labelStyles = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] font-sans selection:bg-orange-200">
      
      {/* LEFT PANEL: Brand Identity (Hidden on very small screens, visible on md and up) */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-center items-center p-12 z-0">
        {/* Decorative Glowing Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        
        <div className="relative z-10 text-center max-w-md">
          <Link href="/">
            <h1 className="text-4xl font-black tracking-widest text-orange-500 cursor-pointer drop-shadow-lg mb-6 hover:scale-105 transition-transform inline-block">
              GADGET<span className="text-white">STORE</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-black text-white mb-4 leading-tight">
            Welcome back to the future of tech.
          </h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Sign in to unlock exclusive member deals, track your recent orders, and checkout faster than ever.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2">🛡️ Secure</span>
          <span className="flex items-center gap-2">⚡ Fast</span>
          <span className="flex items-center gap-2">📦 Reliable</span>
        </div>
      </div>

      {/* RIGHT PANEL: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        
        {/* Mobile Logo (Only shows on mobile) */}
        <div className="md:hidden absolute top-8 left-0 right-0 flex justify-center">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-widest text-orange-500">
              GADGET<span className="text-slate-900">STORE</span>
            </h1>
          </Link>
        </div>

        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mt-16 md:mt-0">
          
          <div className="mb-8">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1 mb-6 inline-block">
              ← Back to Store
            </Link>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Sign In</h2>
            <p className="text-slate-500 font-medium text-sm">Enter your email and password to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 animate-bounce-short">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={labelStyles}>Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="you@example.com"
                className={inputStyles} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                {/* Future feature: Forgot Password Link */}
                <span className="text-[10px] font-bold text-orange-500 hover:text-orange-600 cursor-pointer transition-colors uppercase tracking-wider">Forgot?</span>
              </div>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className={inputStyles} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full font-black py-4 rounded-xl uppercase tracking-widest transition-all duration-300 shadow-lg flex justify-center items-center gap-2 mt-2 ${loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1'}`}
            >
              {loading ? (
                <><span className="animate-spin text-xl">⏳</span> Authenticating...</>
              ) : (
                'Secure Login'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm font-medium text-slate-500">
              Don't have an account yet?{' '}
              <Link href="/register" className="text-orange-500 hover:text-orange-600 font-black transition-colors underline decoration-2 underline-offset-4">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}





// // src/app/login/page.jsx
// 'use client';
// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); 
  
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
    
//     try {
//       const result = await login(email, password); 
      
//       if (result.success) {
//         // FORCE REDIRECT: Clean state refresh to load user data globally
//         window.location.replace('/'); 
//       } else {
//         setError(result.message || 'Invalid email or password.');
//         setLoading(false);
//       }
//     } catch (err) {
//       setError("Something went wrong. Try again.");
//       setLoading(false);
//     }
//   };

//   // 🚀 AMAZON-SPECIFIC TAILWIND STYLES
//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-sm text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2";
//   const amzSecondaryButton = "w-full bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[6px] rounded-[8px] text-sm text-[#111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center font-normal mt-3";

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200">
      
//       {/* Amazon Style Logo */}
//       <div className="mb-4 mt-2">
//         <Link href="/">
//           <h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">
//             amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span>
//           </h1>
//         </Link>
//       </div>

//       {/* Main Container Card */}
//       <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0">
        
//         {/* Error Alert Box */}
//         {error && (
//           <div className="mb-4 p-4 border-l-4 border-l-[#c40000] border border-[#e3e3e3] rounded-[3px] flex gap-3 items-start shadow-sm">
//             <span className="text-[#c40000] text-lg leading-none font-bold">!</span>
//             <div>
//               <h4 className="text-[#c40000] text-sm font-bold mb-0.5">There was a problem</h4>
//               <p className="text-[13px] text-[#111]">{error}</p>
//             </div>
//           </div>
//         )}

//         <div className="border border-[#ddd] rounded-[4px] p-[22px]">
          
//           <form onSubmit={handleLogin} className="space-y-3.5">
//             <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Sign in</h2>
            
//             <div>
//               <label className={labelStyles}>Email or mobile phone number</label>
//               <input 
//                 type="email" 
//                 required 
//                 className={inputStyles} 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//               />
//             </div>
            
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                 <label className={labelStyles}>Password</label>
//                 <Link href="#" className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline">
//                   Forgot your password?
//                 </Link>
//               </div>
//               <input 
//                 type="password" 
//                 required 
//                 className={inputStyles} 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//               />
//             </div>
            
//             <div className="pt-2">
//               <button type="submit" disabled={loading} className={amzButton}>
//                 {loading ? 'Signing in...' : 'Sign in'}
//               </button>
//             </div>

//             <div className="text-[12px] text-[#111] mt-4 mb-6 leading-relaxed">
//               By continuing, you agree to Amazon Smarts's{' '}
//               <Link href="/conditions" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</Link>{' '}
//               and{' '}
//               <Link href="/privacy" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</Link>.
//             </div>

//             <div className="border-t border-[#e7e7e7] pt-4 mt-6">
//               <p className="text-[13px] text-[#111] font-bold group flex items-center gap-1 cursor-pointer w-fit">
//                 <span className="text-[#555] text-[10px]">▶</span> 
//                 <span className="text-[#0066c0] group-hover:text-[#c45500] group-hover:underline transition-colors">Need help?</span>
//               </p>
//             </div>
//           </form>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center justify-center mt-6 mb-3 relative">
//           <div className="w-full h-px bg-[#e7e7e7]"></div>
//           <span className="absolute bg-white px-2 text-[12px] text-[#767676]">New to Amazon Smarts?</span>
//         </div>

//         {/* Create Account Button */}
//         <Link href="/signup" className="block w-full">
//           <button type="button" className={amzSecondaryButton}>
//             Create your Amazon account
//           </button>
//         </Link>
//       </div>

//       {/* Amazon Style Footer Links */}
//       <div className="w-full mt-10 border-t border-[#ddd] bg-white pt-6 pb-10 flex flex-col items-center shadow-[0_-2px_4px_rgba(0,0,0,0.02)] flex-grow">
//         <div className="flex flex-wrap justify-center gap-6 text-[11px] text-[#0066c0] mb-2">
//           <Link href="/conditions" className="hover:underline">Conditions of Use</Link>
//           <Link href="/privacy" className="hover:underline">Privacy Notice</Link>
//           <Link href="/help" className="hover:underline">Help</Link>
//         </div>
//         <p className="text-[11px] text-[#555]">
//           © {new Date().getFullYear()}, AmazonSmarts.com, Inc. or its affiliates
//         </p>
//       </div>

//     </div>
//   );
// }
