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
//         setError(result.message);
//         setLoading(false);
//       }
//     } catch (err) {
//       setError("Something went wrong. Try again.");
//       setLoading(false);
//     }
//   };

//   const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium shadow-sm";
//   const labelStyles = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1";

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] font-sans selection:bg-orange-200">
      
//       {/* LEFT PANEL: Brand Identity (Hidden on very small screens, visible on md and up) */}
//       <div className="hidden md:flex md:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-center items-center p-12 z-0">
//         {/* Decorative Glowing Orbs */}
//         <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        
//         <div className="relative z-10 text-center max-w-md">
//           <Link href="/">
//             <h1 className="text-4xl font-black tracking-widest text-orange-500 cursor-pointer drop-shadow-lg mb-6 hover:scale-105 transition-transform inline-block">
//               GADGET<span className="text-white">STORE</span>
//             </h1>
//           </Link>
//           <h2 className="text-3xl font-black text-white mb-4 leading-tight">
//             Welcome back to the future of tech.
//           </h2>
//           <p className="text-slate-400 font-medium text-lg leading-relaxed">
//             Sign in to unlock exclusive member deals, track your recent orders, and checkout faster than ever.
//           </p>
//         </div>

//         {/* Trust Badges */}
//         <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
//           <span className="flex items-center gap-2">🛡️ Secure</span>
//           <span className="flex items-center gap-2">⚡ Fast</span>
//           <span className="flex items-center gap-2">📦 Reliable</span>
//         </div>
//       </div>

//       {/* RIGHT PANEL: Login Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        
//         {/* Mobile Logo (Only shows on mobile) */}
//         <div className="md:hidden absolute top-8 left-0 right-0 flex justify-center">
//           <Link href="/">
//             <h1 className="text-2xl font-black tracking-widest text-orange-500">
//               GADGET<span className="text-slate-900">STORE</span>
//             </h1>
//           </Link>
//         </div>

//         <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mt-16 md:mt-0">
          
//           <div className="mb-8">
//             <Link href="/" className="text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1 mb-6 inline-block">
//               ← Back to Store
//             </Link>
//             <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Sign In</h2>
//             <p className="text-slate-500 font-medium text-sm">Enter your email and password to access your account.</p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 animate-bounce-short">
//               <span>⚠️</span> {error}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className={labelStyles}>Email Address</label>
//               <input 
//                 type="email" 
//                 required 
//                 placeholder="you@example.com"
//                 className={inputStyles} 
//                 onChange={e => setEmail(e.target.value)} 
//               />
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
//                 {/* Future feature: Forgot Password Link */}
//                 <span className="text-[10px] font-bold text-orange-500 hover:text-orange-600 cursor-pointer transition-colors uppercase tracking-wider">Forgot?</span>
//               </div>
//               <input 
//                 type="password" 
//                 required 
//                 placeholder="••••••••"
//                 className={inputStyles} 
//                 onChange={e => setPassword(e.target.value)} 
//               />
//             </div>

//             <button 
//               type="submit" 
//               disabled={loading}
//               className={`w-full font-black py-4 rounded-xl uppercase tracking-widest transition-all duration-300 shadow-lg flex justify-center items-center gap-2 mt-2 ${loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1'}`}
//             >
//               {loading ? (
//                 <><span className="animate-spin text-xl">⏳</span> Authenticating...</>
//               ) : (
//                 'Secure Login'
//               )}
//             </button>
//           </form>

//           <div className="mt-8 pt-8 border-t border-slate-100 text-center">
//             <p className="text-sm font-medium text-slate-500">
//               Don't have an account yet?{' '}
//               <Link href="/register" className="text-orange-500 hover:text-orange-600 font-black transition-colors underline decoration-2 underline-offset-4">
//                 Create one now
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





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




// // src/app/login/page.jsx
// 'use client';
// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import axios from 'axios';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); 
//   const [showPassword, setShowPassword] = useState(false); // 🚀 Password visibility state
  
//   const { login } = useAuth();
//   const router = useRouter();

//   // 🚀 Forgot Password States
//   const [showForgotModal, setShowForgotModal] = useState(false);
//   const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password
//   const [resetEmail, setResetEmail] = useState('');
//   const [resetOtp, setResetOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [resetLoading, setResetLoading] = useState(false);
//   const [resetError, setResetError] = useState('');
//   const [resetMessage, setResetMessage] = useState('');

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

//   // 🚀 Send OTP for Password Reset
//   const handleSendResetOtp = async (e) => {
//     e.preventDefault();
//     setResetError('');
//     setResetMessage('');
//     setResetLoading(true);

//     try {
//       // Calls your backend to send a reset OTP
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password-otp`, { email: resetEmail });
//       setResetMessage(data.message || "OTP sent to your email!");
//       setForgotStep(2);
//     } catch (err) {
//       setResetError(err.response?.data?.message || "Failed to send OTP. Check if email exists.");
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   // 🚀 Verify OTP & Set New Password
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setResetError('');
//     setResetLoading(true);

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, { 
//         email: resetEmail, 
//         otp: resetOtp, 
//         newPassword 
//       });
      
//       alert("Password reset successfully! You can now log in.");
//       setShowForgotModal(false);
//       setForgotStep(1);
//       setResetEmail('');
//       setResetOtp('');
//       setNewPassword('');
//     } catch (err) {
//       setResetError(err.response?.data?.message || "Invalid OTP or error resetting password.");
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   // 🚀 AMAZON-SPECIFIC TAILWIND STYLES
//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-sm text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";
//   const amzSecondaryButton = "w-full bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[6px] rounded-[8px] text-sm text-[#111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center font-normal mt-3";

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
      
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
//                 <button 
//                   type="button" 
//                   onClick={() => setShowForgotModal(true)} 
//                   className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer"
//                 >
//                   Forgot your password?
//                 </button>
//               </div>
              
//               {/* 🚀 PASSWORD INPUT WITH EYE ICON */}
//               <div className="relative">
//                 <input 
//                   type={showPassword ? "text" : "password"} 
//                   required 
//                   className={`${inputStyles} pr-10`} 
//                   value={password} 
//                   onChange={(e) => setPassword(e.target.value)} 
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
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
//         <Link href="/register" className="block w-full">
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

//       {/* 🚀 FORGOT PASSWORD MODAL */}
//       {showForgotModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-[8px] max-w-[400px] w-full p-6 shadow-xl border border-[#ddd]">
            
//             <div className="flex justify-between items-start mb-4 border-b border-[#ddd] pb-3">
//               <h2 className="text-[22px] font-normal leading-tight text-[#111]">Password assistance</h2>
//               <button onClick={() => { setShowForgotModal(false); setForgotStep(1); setResetError(''); }} className="text-[#555] hover:text-[#c40000] text-xl leading-none">✕</button>
//             </div>

//             {resetError && <p className="text-[13px] text-[#c40000] font-bold mb-3">! {resetError}</p>}
//             {resetMessage && <p className="text-[13px] text-[#007600] font-bold mb-3">✓ {resetMessage}</p>}

//             {/* STEP 1: Enter Email */}
//             {forgotStep === 1 && (
//               <form onSubmit={handleSendResetOtp} className="space-y-4">
//                 <p className="text-[13px] text-[#111] leading-relaxed">
//                   Enter the email address associated with your Amazon Smarts account.
//                 </p>
//                 <div>
//                   <label className={labelStyles}>Email address</label>
//                   <input type="email" required className={inputStyles} value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
//                 </div>
//                 <button type="submit" disabled={resetLoading} className={amzButton}>
//                   {resetLoading ? 'Sending...' : 'Continue'}
//                 </button>
//               </form>
//             )}

//             {/* STEP 2: Verify OTP & New Password */}
//             {forgotStep === 2 && (
//               <form onSubmit={handleResetPassword} className="space-y-4">
//                 <p className="text-[13px] text-[#111] leading-relaxed">
//                   We've sent an OTP to <span className="font-bold">{resetEmail}</span>. Enter it below along with your new password.
//                 </p>
                
//                 <div>
//                   <label className={labelStyles}>Enter OTP</label>
//                   <input type="text" required maxLength="6" className={`${inputStyles} tracking-widest text-center text-lg`} value={resetOtp} onChange={e => setResetOtp(e.target.value.replace(/\D/g, ''))} />
//                 </div>

//                 <div>
//                   <label className={labelStyles}>New Password</label>
//                   <div className="relative">
//                     <input type={showPassword ? "text" : "password"} required minLength="6" className={inputStyles} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors">
//                       {showPassword ? '👁️' : '👁️‍🗨️'}
//                     </button>
//                   </div>
//                   <p className="text-[11px] text-[#555] mt-1">Passwords must be at least 6 characters.</p>
//                 </div>

//                 <button type="submit" disabled={resetLoading} className={amzButton}>
//                   {resetLoading ? 'Saving...' : 'Save changes and sign in'}
//                 </button>
//               </form>
//             )}

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


// src/app/login/page.jsx
'use client';
import { useState, Suspense } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

// 🚀 Extract the main logic into a sub-component so we can safely use useSearchParams
function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🚀 Catch the redirect URL (defaults to '/' if none is provided)
  const redirectUrl = searchParams.get('redirect') || '/';

  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(email, password); 
      
      if (result.success) {
        // 🚀 FORCE REDIRECT to the exact page they came from (or homepage)
        window.location.replace(redirectUrl); 
      } else {
        setError(result.message || 'Invalid email or password.');
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  // Send OTP for Password Reset
  const handleSendResetOtp = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');
    setResetLoading(true);

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password-otp`, { email: resetEmail });
      setResetMessage(data.message || "OTP sent to your email!");
      setForgotStep(2);
    } catch (err) {
      setResetError(err.response?.data?.message || "Failed to send OTP. Check if email exists.");
    } finally {
      setResetLoading(false);
    }
  };

  // Verify OTP & Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, { 
        email: resetEmail, 
        otp: resetOtp, 
        newPassword 
      });
      
      alert("Password reset successfully! You can now log in.");
      setShowForgotModal(false);
      setForgotStep(1);
      setResetEmail('');
      setResetOtp('');
      setNewPassword('');
    } catch (err) {
      setResetError(err.response?.data?.message || "Invalid OTP or error resetting password.");
    } finally {
      setResetLoading(false);
    }
  };

  // AMAZON-SPECIFIC TAILWIND STYLES
  const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
  const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
  const amzButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-sm text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";
  const amzSecondaryButton = "w-full bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[6px] rounded-[8px] text-sm text-[#111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center font-normal mt-3";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
      
      {/* Amazon Style Logo */}
      <div className="mb-4 mt-2">
        <Link href="/">
          <h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">
            amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span>
          </h1>
        </Link>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1">
        
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
          
          <form onSubmit={handleLogin} className="space-y-3.5">
            <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Sign in</h2>
            
            <div>
              <label className={labelStyles}>Email or mobile phone number</label>
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
                <label className={labelStyles}>Password</label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotModal(true)} 
                  className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
              
              {/* PASSWORD INPUT WITH EYE ICON */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className={`${inputStyles} pr-10`} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <button type="submit" disabled={loading} className={amzButton}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-[12px] text-[#111] mt-4 mb-6 leading-relaxed">
              By continuing, you agree to Amazon Smarts's{' '}
              <Link href="/conditions" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Conditions of Use</Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Privacy Notice</Link>.
            </div>

            <div className="border-t border-[#e7e7e7] pt-4 mt-6">
              <p className="text-[13px] text-[#111] font-bold group flex items-center gap-1 cursor-pointer w-fit">
                <span className="text-[#555] text-[10px]">▶</span> 
                <span className="text-[#0066c0] group-hover:text-[#c45500] group-hover:underline transition-colors">Need help?</span>
              </p>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 mb-3 relative">
          <div className="w-full h-px bg-[#e7e7e7]"></div>
          <span className="absolute bg-white px-2 text-[12px] text-[#767676]">New to Amazon Smarts?</span>
        </div>

        {/* Create Account Button */}
        {/* 🚀 Pass the redirect URL to registration page as well, so if they create an account, they still go back to the product */}
        <Link href={redirectUrl === '/' ? "/register" : `/register?redirect=${redirectUrl}`} className="block w-full">
          <button type="button" className={amzSecondaryButton}>
            Create your Amazon account
          </button>
        </Link>
      </div>

      {/* Amazon Style Footer Links */}
      <div className="w-full mt-10 border-t border-[#ddd] bg-[#fbfbfb] pt-6 pb-10 flex flex-col items-center shadow-[0_-2px_4px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap justify-center gap-6 text-[11px] text-[#0066c0] mb-2">
          <Link href="/conditions" className="hover:underline">Conditions of Use</Link>
          <Link href="/privacy" className="hover:underline">Privacy Notice</Link>
          <Link href="/help" className="hover:underline">Help</Link>
        </div>
        <p className="text-[11px] text-[#555]">
          © {new Date().getFullYear()}, AmazonSmarts.com, Inc. or its affiliates
        </p>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[8px] max-w-[400px] w-full p-6 shadow-xl border border-[#ddd]">
            
            <div className="flex justify-between items-start mb-4 border-b border-[#ddd] pb-3">
              <h2 className="text-[22px] font-normal leading-tight text-[#111]">Password assistance</h2>
              <button onClick={() => { setShowForgotModal(false); setForgotStep(1); setResetError(''); }} className="text-[#555] hover:text-[#c40000] text-xl leading-none">✕</button>
            </div>

            {resetError && <p className="text-[13px] text-[#c40000] font-bold mb-3">! {resetError}</p>}
            {resetMessage && <p className="text-[13px] text-[#007600] font-bold mb-3">✓ {resetMessage}</p>}

            {/* STEP 1: Enter Email */}
            {forgotStep === 1 && (
              <form onSubmit={handleSendResetOtp} className="space-y-4">
                <p className="text-[13px] text-[#111] leading-relaxed">
                  Enter the email address associated with your Amazon Smarts account.
                </p>
                <div>
                  <label className={labelStyles}>Email address</label>
                  <input type="email" required className={inputStyles} value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
                </div>
                <button type="submit" disabled={resetLoading} className={amzButton}>
                  {resetLoading ? 'Sending...' : 'Continue'}
                </button>
              </form>
            )}

            {/* STEP 2: Verify OTP & New Password */}
            {forgotStep === 2 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-[13px] text-[#111] leading-relaxed">
                  We've sent an OTP to <span className="font-bold">{resetEmail}</span>. Enter it below along with your new password.
                </p>
                
                <div>
                  <label className={labelStyles}>Enter OTP</label>
                  <input type="text" required maxLength="6" className={`${inputStyles} tracking-widest text-center text-lg`} value={resetOtp} onChange={e => setResetOtp(e.target.value.replace(/\D/g, ''))} />
                </div>

                <div>
                  <label className={labelStyles}>New Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} required minLength="6" className={inputStyles} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors">
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#555] mt-1">Passwords must be at least 6 characters.</p>
                </div>

                <button type="submit" disabled={resetLoading} className={amzButton}>
                  {resetLoading ? 'Saving...' : 'Save changes and sign in'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// 🚀 DEFAULT EXPORT WRAPPED IN SUSPENSE FOR NEXT.JS BUILD FIX
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}