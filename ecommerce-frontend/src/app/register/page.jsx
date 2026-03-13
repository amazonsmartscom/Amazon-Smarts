// // // src/app/register/page.jsx
// // 'use client';
// // import { useState } from 'react';
// // import axios from 'axios';

// // export default function RegisterPage() {
// //   const [step, setStep] = useState(1); // 1 = Register, 2 = OTP
// //   const [formData, setFormData] = useState({
// //     name: '', email: '', countryCode: '+91', mobileNumber: '', password: '', referralCode: ''
// //   });
// //   const [otp, setOtp] = useState('');
// //   const [message, setMessage] = useState('');

// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/auth/register', formData);
// //       setMessage(`Success! Use this OTP to verify: ${res.data.testOtp}`);
// //       setStep(2);
// //     } catch (error) {
// //       setMessage(error.response?.data?.message || 'Registration failed');
// //     }
// //   };

// //   const handleVerify = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp', { email: formData.email, otp });
// //       setMessage('Account verified! You can now log in.');
// //       setStep(3);
// //     } catch (error) {
// //       setMessage(error.response?.data?.message || 'Verification failed');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //       <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
// //           {step === 1 ? 'Create an Account' : step === 2 ? 'Verify OTP' : 'Success!'}
// //         </h2>
        
// //         {message && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded text-sm">{message}</div>}

// //         {step === 1 && (
// //           <form onSubmit={handleRegister} className="space-y-4">
// //             <input type="text" placeholder="Full Name" required className="w-full p-2 border rounded text-black" 
// //               onChange={e => setFormData({...formData, name: e.target.value})} />
            
// //             <input type="email" placeholder="Email" required className="w-full p-2 border rounded text-black" 
// //               onChange={e => setFormData({...formData, email: e.target.value})} />
            
// //             <div className="flex gap-2">
// //               <input type="text" placeholder="+91" className="w-1/4 p-2 border rounded text-black" 
// //                 onChange={e => setFormData({...formData, countryCode: e.target.value})} value={formData.countryCode} />
// //               <input type="text" placeholder="Mobile Number" required className="w-3/4 p-2 border rounded text-black" 
// //                 onChange={e => setFormData({...formData, mobileNumber: e.target.value})} />
// //             </div>

// //             <input type="password" placeholder="Password" required className="w-full p-2 border rounded text-black" 
// //               onChange={e => setFormData({...formData, password: e.target.value})} />
            
// //             <input type="text" placeholder="Referral Code (Optional)" className="w-full p-2 border rounded text-black" 
// //               onChange={e => setFormData({...formData, referralCode: e.target.value})} />

// //             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
// //               Sign Up
// //             </button>
// //           </form>
// //         )}

// //         {step === 2 && (
// //           <form onSubmit={handleVerify} className="space-y-4">
// //             <input type="text" placeholder="Enter 6-digit OTP" required className="w-full p-2 border rounded text-black text-center tracking-widest" 
// //               onChange={e => setOtp(e.target.value)} />
// //             <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
// //               Verify Account
// //             </button>
// //           </form>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';
// import Link from 'next/link';

// export default function SignupPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', referralCode: '' });
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1); // Step 1: Form, Step 2: OTP
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const { login } = useAuth(); // We use login to save the user data after OTP success
//   const router = useRouter();

//   // STEP 1: Submit Details & Request OTP
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Create unverified account and send OTP email
//       await axios.post('${process.env.NEXT_PUBLIC_API_URL}/auth/register', formData);
//       setStep(2); // Move to OTP Screen
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2: Verify OTP
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const { data } = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp', {
//         email: formData.email,
//         otp: otp
//       });
      
//       // Save user to context/localStorage and redirect
//       login({ user: data, token: data.token });
//       router.push('/'); 
//     } catch (err) {
//       setError(err.response?.data?.message || 'Invalid OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputStyles = "w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-900";

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold text-orange-500 tracking-wider mb-2">GADGET<span className="text-slate-900">STORE</span></h1>
//           <p className="text-gray-500 font-medium">
//             {step === 1 ? 'Create your account' : 'Verify your email'}
//           </p>
//         </div>

//         {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-bold text-center border border-red-100">{error}</div>}

//         {step === 1 && (
//           <form onSubmit={handleSignupSubmit} className="space-y-5">
//             <div>
//               <input type="text" placeholder="Full Name" required className={inputStyles} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//             </div>
//             <div>
//               <input type="email" placeholder="Email Address" required className={inputStyles} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
//             </div>
//             <div>
//               <input type="password" placeholder="Password" required className={inputStyles} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
//             </div>
//             <div>
//               <input type="text" placeholder="Referral Code (Optional)" className={`${inputStyles} bg-orange-50 border-orange-200 placeholder-orange-300`} value={formData.referralCode} onChange={(e) => setFormData({...formData, referralCode: e.target.value})} />
//             </div>
            
//             <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-md transition ${loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-slate-800'}`}>
//               {loading ? 'Creating Account...' : 'Continue'}
//             </button>
//             <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <Link href="/login" className="text-orange-500 font-bold hover:underline">Log in</Link></p>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleOtpSubmit} className="space-y-6 text-center">
//             <div className="text-5xl mb-4">✉️</div>
//             <h3 className="text-xl font-bold text-gray-900">Enter Verification Code</h3>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               We've sent a 6-digit OTP to <br/><b className="text-gray-900">{formData.email}</b>
//             </p>
            
//             <div>
//               <input 
//                 type="text" 
//                 maxLength="6"
//                 placeholder="• • • • • •" 
//                 required 
//                 className="w-full text-center text-3xl tracking-[1em] p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-black text-gray-900"
//                 value={otp} 
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow numbers
//               />
//             </div>
            
//             <button type="submit" disabled={loading || otp.length < 6} className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-md transition ${loading || otp.length < 6 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}>
//               {loading ? 'Verifying...' : 'Verify & Login'}
//             </button>
            
//             <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-gray-400 hover:text-gray-700 underline mt-4">
//               Wrong email? Go back
//             </button>
//           </form>
//         )}

//       </div>
//     </div>
//   );
// }


// // src/app/signup/page.jsx
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function SignupPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', referralCode: '' });
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1); // Step 1: Form, Step 2: OTP, Step 3: Success Screen
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const router = useRouter();

//   // STEP 1: Submit Details & Request OTP
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Create unverified account and send OTP email
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);
//       setStep(2); // Move to OTP Screen
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2: Verify OTP
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
//         email: formData.email,
//         otp: otp
//       });
      
//       // 🚀 SUCCESS! Move to Step 3 instead of auto-logging in
//       setStep(3); 
//     } catch (err) {
//       setError(err.response?.data?.message || 'Invalid OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputStyles = "w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-900";

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans pb-20">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 relative overflow-hidden">
        
//         {/* Only show header on Step 1 and 2 */}
//         {step !== 3 && (
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-extrabold text-orange-500 tracking-wider mb-2">GADGET<span className="text-slate-900">STORE</span></h1>
//             <p className="text-gray-500 font-medium">
//               {step === 1 ? 'Create your account' : 'Verify your email'}
//             </p>
//           </div>
//         )}

//         {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-bold text-center border border-red-100">{error}</div>}

//         {/* STEP 1: Registration Form */}
//         {step === 1 && (
//           <form onSubmit={handleSignupSubmit} className="space-y-5">
//             <div>
//               <input type="text" placeholder="Full Name" required className={inputStyles} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//             </div>
//             <div>
//               <input type="email" placeholder="Email Address" required className={inputStyles} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
//             </div>
//             <div>
//               <input type="password" placeholder="Password" required className={inputStyles} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
//             </div>
//             <div>
//               <input type="text" placeholder="Referral Code (Optional)" className={`${inputStyles} bg-orange-50 border-orange-200 placeholder-orange-300`} value={formData.referralCode} onChange={(e) => setFormData({...formData, referralCode: e.target.value})} />
//             </div>
            
//             <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-md transition ${loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-slate-800'}`}>
//               {loading ? 'Creating Account...' : 'Continue'}
//             </button>
//             <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <Link href="/login" className="text-orange-500 font-bold hover:underline">Log in</Link></p>
//           </form>
//         )}

//         {/* STEP 2: OTP Verification */}
//         {step === 2 && (
//           <form onSubmit={handleOtpSubmit} className="space-y-6 text-center">
//             <div className="text-5xl mb-4">✉️</div>
//             <h3 className="text-xl font-bold text-gray-900">Enter Verification Code</h3>
//             <p className="text-sm text-gray-500 leading-relaxed">
//               We've sent a 6-digit OTP to <br/><b className="text-gray-900">{formData.email}</b>
//             </p>
            
//             <div>
//               <input 
//                 type="text" 
//                 maxLength="6"
//                 placeholder="• • • • • •" 
//                 required 
//                 className="w-full text-center text-3xl tracking-[1em] p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 font-black text-gray-900"
//                 value={otp} 
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow numbers
//               />
//             </div>
            
//             <button type="submit" disabled={loading || otp.length < 6} className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-md transition ${loading || otp.length < 6 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}>
//               {loading ? 'Verifying...' : 'Verify Account'}
//             </button>
            
//             <button type="button" onClick={() => setStep(1)} className="text-sm font-bold text-gray-400 hover:text-gray-700 underline mt-4">
//               Wrong email? Go back
//             </button>
//           </form>
//         )}

//         {/* 🚀 STEP 3: SUCCESS SCREEN */}
//         {step === 3 && (
//           <div className="text-center space-y-6 py-6">
//             <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto text-5xl mb-4 shadow-sm border-4 border-green-50">
//               ✓
//             </div>
//             <h3 className="text-2xl font-extrabold text-gray-900">Verification Complete!</h3>
//             <p className="text-gray-500 font-medium px-4">
//               Your email has been successfully verified. Welcome to the GadgetStore family!
//             </p>
//             <div className="pt-6">
//               <Link href="/login">
//                 <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg flex items-center justify-center gap-2">
//                   Go to Login <span>→</span>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


// src/app/signup/page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', referralCode: '' });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: OTP, Step 3: Success Screen
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  // STEP 1: Submit Details & Request OTP
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);
      setStep(2); // Move to OTP Screen
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        email: formData.email,
        otp: otp
      });
      setStep(3); 
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium shadow-sm";
  const labelStyles = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] font-sans selection:bg-orange-200">
      
      {/* LEFT PANEL: Brand Identity */}
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
            Join the future of tech today.
          </h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
            Create an account to unlock member-only deals, earn affiliate rewards, and experience seamless checkout.
          </p>

          <div className="flex flex-col gap-4 text-left bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xl">🔥</div>
              <p className="text-slate-300 font-medium text-sm">Access to exclusive flash sales</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl">💳</div>
              <p className="text-slate-300 font-medium text-sm">Manage your affiliate wallet</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">📦</div>
              <p className="text-slate-300 font-medium text-sm">Track orders in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Form Area */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        
        {/* Mobile Logo */}
        <div className="md:hidden absolute top-8 left-0 right-0 flex justify-center">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-widest text-orange-500">
              GADGET<span className="text-slate-900">STORE</span>
            </h1>
          </Link>
        </div>

        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mt-16 md:mt-0 relative overflow-hidden">
          
          {/* Header (Hidden on Success Step) */}
          {step !== 3 && (
            <div className="mb-8">
              <Link href="/" className="text-xs font-bold text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1 mb-6 inline-block">
                ← Back to Store
              </Link>
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                {step === 1 ? 'Create Account' : 'Verify Email'}
              </h2>
              <p className="text-slate-500 font-medium text-sm">
                {step === 1 ? 'Fill in your details to get started.' : 'We need to make sure it’s really you.'}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* STEP 1: Registration Form */}
          {step === 1 && (
            <form onSubmit={handleSignupSubmit} className="space-y-5">
              <div>
                <label className={labelStyles}>Full Name</label>
                <input type="text" placeholder="John Doe" required className={inputStyles} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div>
                <label className={labelStyles}>Email Address</label>
                <input type="email" placeholder="you@example.com" required className={inputStyles} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              
              <div>
                <label className={labelStyles}>Password</label>
                <input type="password" placeholder="••••••••" required className={inputStyles} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
              
              <div>
                <label className={labelStyles}>Referral Code (Optional)</label>
                <input type="text" placeholder="e.g. GADGET50" className={`${inputStyles} bg-orange-50/50 border-orange-100 focus:bg-white placeholder-orange-300`} value={formData.referralCode} onChange={(e) => setFormData({...formData, referralCode: e.target.value})} />
              </div>
              
              <button type="submit" disabled={loading} className={`w-full font-black py-4 rounded-xl uppercase tracking-widest transition-all duration-300 shadow-lg flex justify-center items-center gap-2 mt-4 ${loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1'}`}>
                {loading ? <><span className="animate-spin text-xl">⏳</span> Creating...</> : 'Create Account'}
              </button>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm font-medium text-slate-500">
                  Already have an account?{' '}
                  <Link href="/login" className="text-orange-500 hover:text-orange-600 font-black transition-colors underline decoration-2 underline-offset-4">
                    Log in here
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-8 text-center mt-4">
              <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-blue-100 mb-6">
                ✉️
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <p className="text-sm text-slate-500 font-medium">OTP sent to:</p>
                <p className="font-bold text-slate-900">{formData.email}</p>
              </div>
              
              <div>
                <input 
                  type="text" 
                  maxLength="6"
                  placeholder="••••••" 
                  required 
                  className="w-full text-center text-4xl tracking-[0.5em] p-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 font-black text-slate-900 transition-all placeholder-slate-300"
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
                />
              </div>
              
              <button type="submit" disabled={loading || otp.length < 6} className={`w-full font-black py-4 rounded-xl uppercase tracking-widest transition-all duration-300 shadow-lg flex justify-center items-center gap-2 ${loading || otp.length < 6 ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-500/30 hover:-translate-y-1'}`}>
                {loading ? 'Verifying...' : 'Verify Account'}
              </button>
              
              <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest mt-2 transition-colors">
                ← Wrong email? Go back
              </button>
            </form>
          )}

          {/* STEP 3: SUCCESS SCREEN */}
          {step === 3 && (
            <div className="text-center space-y-6 py-8">
              <div className="w-28 h-28 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-5xl mb-6 shadow-lg shadow-emerald-500/20 border-4 border-white relative">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-20"></div>
                ✓
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Account Verified!</h3>
              <p className="text-slate-500 font-medium px-4 leading-relaxed">
                Your email has been successfully verified. Welcome to the GadgetStore family. You're ready to start shopping!
              </p>
              <div className="pt-8">
                <Link href="/login">
                  <button className="w-full bg-slate-900 hover:bg-orange-500 text-white font-black py-4 rounded-xl shadow-lg transition-all duration-300 text-lg uppercase tracking-widest hover:-translate-y-1 hover:shadow-orange-500/30">
                    Continue to Login →
                  </button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}