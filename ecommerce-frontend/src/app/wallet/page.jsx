// // src/app/wallet/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function WalletDashboard() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [walletData, setWalletData] = useState({ wallet: null, transactions: [] });
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [upiId, setUpiId] = useState('');

//   useEffect(() => {
//     // Redirect if not logged in
//     if (!user) {
//       router.push('/login');
//       return;
//     }

//     const fetchWallet = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${user.user.id}`);
//         setWalletData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching wallet:", error);
//         setLoading(false);
//       }
//     };

//     fetchWallet();
//   }, [user, router]);

//   if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading Wallet...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      
//       {/* Simple Navbar */}
//       <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
//         <Link href="/">
//           <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
//             GADGET<span className="text-white">STORE</span>
//           </h1>
//         </Link>
//         <span className="font-bold">My RC Wallet 💳</span>
//       </nav>

//       <div className="max-w-[1000px] mx-auto p-4 md:p-6 mt-6">
        
//         {/* Top Section: Balances */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
//           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-md">
//             <h3 className="text-green-100 text-sm font-bold uppercase tracking-wider mb-1">Available Balance</h3>
//             <p className="text-4xl font-extrabold">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN') || 0}</p>
//             <button 
//   onClick={() => setShowModal(true)}
//   className="mt-4 bg-white text-green-700 font-bold px-4 py-2 rounded shadow hover:bg-gray-100 transition"
// >
//   Withdraw Funds
// </button>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
//             <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Earnings</h3>
//             <p className="text-3xl font-bold text-gray-900">₹{walletData.wallet?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
//             <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">My Referral Code</h3>
//             <div className="flex items-center justify-between mt-1">
//               <p className="text-2xl font-bold text-orange-500 tracking-widest">{user?.user?.myReferralCode}</p>
//               <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 font-semibold">Copy</button>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Section: Transaction History */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-100">
//             <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
//           </div>
          
//           {walletData.transactions.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">No transactions yet. Start referring friends to earn!</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
//                     <th className="p-4 font-semibold">Date</th>
//                     <th className="p-4 font-semibold">Description</th>
//                     <th className="p-4 font-semibold">Status</th>
//                     <th className="p-4 font-semibold text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {walletData.transactions.map((tx) => (
//                     <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="p-4 text-sm text-gray-600">
//                         {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//                       </td>
//                       <td className="p-4">
//                         <p className="font-semibold text-gray-900">
//                           {tx.source === 'referral_commission' ? 'Affiliate Commission' : 'Withdrawal'}
//                         </p>
//                         <p className="text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
//                           Ref: {tx.relatedOrderId || tx._id}
//                         </p>
//                       </td>
//                       <td className="p-4">
//                         <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                           {tx.status}
//                         </span>
//                       </td>
//                       <td className={`p-4 text-right font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
//                         {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>
//       {showModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//     <div className="bg-white rounded-xl p-6 w-full max-w-md">
//       <h2 className="text-xl font-bold mb-4">Withdraw to UPI</h2>
//       <p className="text-sm text-gray-500 mb-4 text-center">Available: ₹{walletData.wallet?.availableBalance}</p>
      
//       <div className="space-y-4">
//         <input 
//           type="number" placeholder="Enter Amount (Min ₹500)" 
//           className="w-full p-3 border rounded-lg"
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <input 
//           type="text" placeholder="Enter UPI ID (e.g. rahul@okaxis)" 
//           className="w-full p-3 border rounded-lg"
//           onChange={(e) => setUpiId(e.target.value)}
//         />
        
//         <div className="flex gap-3">
//           <button 
//             onClick={async () => {
//               try {
//                 await axios.post('${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request', {
//                   userId: user.user.id,
//                   amount: Number(amount),
//                   method: 'UPI',
//                   details: { upiId }
//                 });
//                 alert("Request Sent!");
//                 setShowModal(false);
//                 window.location.reload(); // Refresh to show updated balance
//               } catch (err) {
//                 alert(err.response?.data?.message || "Error");
//               }
//             }}
//             className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg"
//           >
//             Submit Request
//           </button>
//           <button onClick={() => setShowModal(false)} className="px-4 py-3 text-gray-500 font-bold">Cancel</button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// }



// // src/app/wallet/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function WalletDashboard() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [walletData, setWalletData] = useState({ wallet: null, transactions: [] });
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [upiId, setUpiId] = useState('');
//   const [copied, setCopied] = useState(false); // 🚀 State for the copy button

//   useEffect(() => {
//     if (!user) { router.push('/login'); return; }

//     const fetchWallet = async () => {
//       try {
//         // const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${user.id}`);
//         // const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/user/${user?._id || user?.user?._id}`);
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${user?._id || user?.user?._id}`);
//         setWalletData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching wallet:", error);
//         setLoading(false);
//       }
//     };
//     fetchWallet();
//   }, [user, router]);

//   // 🚀 COPY LOGIC
//   const handleCopyCode = () => {
//     // Check both possible locations for the code
//     const code = user?.myReferralCode || user?.user?.myReferralCode;
//     if (code) {
//       navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); 
//     }
//   };

//   // 🚀 UPDATED SHARE LOGIC
//   const handleShare = async () => {
//     const referralCode = user?.myReferralCode || user?.user?.myReferralCode;
//     if (!referralCode) return alert("Referral code not found. Please log in again.");

//     const shareMessage = `Hey! I'm buying awesome gadgets from GadgetStore. Use my referral code *${referralCode}* when you sign up to get special deals! Check it out: http://localhost:3000/signup?ref=${referralCode}`;

//     if (navigator.share) {
//       try {
//         await navigator.share({ title: 'GadgetStore Referral', text: shareMessage });
//       } catch (error) { console.log('Error sharing', error); }
//     } else {
//       const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
//       window.open(whatsappUrl, '_blank');
//     }
//   };

//   if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading Secure Wallet...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      
//       {/* Navbar */}
//       <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
//         <Link href="/">
//           <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
//             GADGET<span className="text-white">STORE</span>
//           </h1>
//         </Link>
//         <span className="font-bold bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">My RC Wallet 💳</span>
//       </nav>

//       <div className="max-w-[1200px] mx-auto p-4 md:p-6 mt-6">
        
//         {/* ================= TOP SECTION ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
//           <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
//             <h3 className="text-green-100 text-sm font-bold uppercase tracking-wider mb-1 relative z-10">Available Balance</h3>
//             <p className="text-4xl font-black mb-6 relative z-10">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN') || 0}</p>
//             <button onClick={() => setShowModal(true)} className="w-full bg-white text-green-800 font-extrabold px-4 py-3 rounded-lg shadow-sm hover:bg-green-50 transition relative z-10">
//               Withdraw to Bank
//             </button>
//             {/* Decorative background element */}
//             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center text-center">
//             <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">💰</div>
//             <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Lifetime Earnings</h3>
//             <p className="text-3xl font-black text-blue-900">₹{walletData.wallet?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
//           </div>

//           {/* 🚀 UPGRADED REFERRAL BOX */}
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
//             <div>
//               <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
//                 🔗 My Referral Code
//               </h3>
//               <div className="flex items-center justify-between bg-orange-50 border border-orange-100 p-3 rounded-lg">
//                 <p className="text-2xl font-black text-orange-600 tracking-widest">{user?.myReferralCode}</p>
//                 <button 
//                   onClick={handleCopyCode} 
//                   className={`text-sm px-4 py-1.5 rounded font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   {copied ? 'Copied! ✓' : 'Copy'}
//                 </button>
//               </div>
//             </div>
            
//             <button 
//               onClick={handleShare}
//               className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition flex items-center justify-center gap-2"
//             >
//               Share Code 🚀
//             </button>
//           </div>

//         </div>

//         {/* ================= TRANSACTION HISTORY ================= */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="p-6 border-b border-gray-100 bg-gray-50">
//             <h2 className="text-lg font-bold text-gray-900">Ledger & History</h2>
//           </div>
          
//           {walletData.transactions.length === 0 ? (
//             <div className="p-12 text-center text-gray-500 bg-white">
//               <p className="text-4xl mb-3">📭</p>
//               <p className="font-medium">No transactions yet. Start referring friends to earn real cash!</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto bg-white">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider bg-white">
//                     <th className="p-5 font-bold">Date</th>
//                     <th className="p-5 font-bold">Transaction Type</th>
//                     <th className="p-5 font-bold">Status</th>
//                     <th className="p-5 font-bold text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {walletData.transactions.map((tx) => (
//                     <tr key={tx._id} className="hover:bg-blue-50 transition-colors">
//                       <td className="p-5 text-sm text-gray-600 font-medium">
//                         {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
//                       </td>
//                       <td className="p-5">
//                         <p className="font-bold text-gray-900">
//                           {tx.source === 'referral_commission' ? 'Affiliate Commission' : 'Bank Payout Request'}
//                         </p>
//                         <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1">
//                           REF: {tx.relatedOrderId ? tx.relatedOrderId.slice(-8).toUpperCase() : tx._id.slice(-8).toUpperCase()}
//                         </p>
//                       </td>
//                       <td className="p-5">
//                         {/* 🚀 DYNAMIC STATUS COLORS */}
//                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
//                           tx.status === 'completed' ? 'bg-green-100 text-green-800 border border-green-200' : 
//                           tx.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
//                           tx.status === 'approved' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
//                           'bg-yellow-100 text-yellow-800 border border-yellow-200'
//                         }`}>
//                           {tx.status}
//                         </span>
//                       </td>
//                       <td className={`p-5 text-right font-black text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
//                         {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>

//       {/* ================= WITHDRAWAL MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
//             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold text-xl">✕</button>
//             <h2 className="text-2xl font-black text-gray-900 mb-2">Withdraw to Bank</h2>
//             <p className="text-sm text-gray-500 mb-6 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
//               Available for withdrawal: <span className="font-bold text-green-600">₹{walletData.wallet?.availableBalance}</span>
//             </p>
            
//             <div className="space-y-5">
//               <div>
//                 <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Amount (Min ₹500)</label>
//                 <input 
//                   type="number" placeholder="₹" 
//                   className="w-full p-4 border border-gray-300 rounded-xl font-bold text-lg outline-none focus:ring-2 focus:ring-green-500"
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Your UPI ID</label>
//                 <input 
//                   type="text" placeholder="e.g. rahul@okhdfc" 
//                   className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
//                   onChange={(e) => setUpiId(e.target.value)}
//                 />
//               </div>
              
//               <button 
//                 onClick={async () => {
//                   if (amount < 500) return alert("Minimum withdrawal is ₹500");
//                   if (amount > walletData.wallet?.availableBalance) return alert("Insufficient balance!");
                  
//                   try {
//                     await axios.post('${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request', {
//                       userId: user.id, amount: Number(amount), method: 'UPI', details: { upiId }
//                     });
//                     alert("Request Sent! Admin will review it shortly.");
//                     setShowModal(false);
//                     window.location.reload(); 
//                   } catch (err) { alert(err.response?.data?.message || "Error"); }
//                 }}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl text-lg shadow-lg transition-all mt-4"
//               >
//                 Confirm Transfer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// // src/app/wallet/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function WalletDashboard() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [walletData, setWalletData] = useState({ wallet: null, transactions: [] });
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [upiId, setUpiId] = useState('');
//   const [copied, setCopied] = useState(false); 

//   useEffect(() => {
//     if (!user) { router.push('/login'); return; }

//     const fetchWallet = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${user?._id || user?.user?._id}`);
//         setWalletData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching wallet:", error);
//         setLoading(false);
//       }
//     };
//     fetchWallet();
//   }, [user, router]);

//   // 🚀 COPY LOGIC
//   const handleCopyCode = () => {
//     const code = user?.myReferralCode || user?.user?.myReferralCode;
//     if (code) {
//       navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); 
//     }
//   };

//   // 🚀 SHARE LOGIC
//   const handleShare = async () => {
//     const referralCode = user?.myReferralCode || user?.user?.myReferralCode;
//     if (!referralCode) return alert("Referral code not found. Please log in again.");

//     const shareMessage = `Hey! I'm buying awesome gadgets from GadgetStore. Use my referral code *${referralCode}* when you sign up to get special deals! Check it out: http://localhost:3000/signup?ref=${referralCode}`;

//     if (navigator.share) {
//       try {
//         await navigator.share({ title: 'GadgetStore Referral', text: shareMessage });
//       } catch (error) { console.log('Error sharing', error); }
//     } else {
//       const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
//       window.open(whatsappUrl, '_blank');
//     }
//   };

//   if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading Secure Wallet...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      
//       {/* Navbar */}
//       <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
//         <Link href="/">
//           <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
//             GADGET<span className="text-white">STORE</span>
//           </h1>
//         </Link>
//         <span className="font-bold bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">My RC Wallet 💳</span>
//       </nav>

//       <div className="max-w-[1200px] mx-auto p-4 md:p-6 mt-6">
        
//         {/* ================= TOP SECTION ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
//           <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
//             <h3 className="text-green-100 text-sm font-bold uppercase tracking-wider mb-1 relative z-10">Available Balance</h3>
//             <p className="text-4xl font-black mb-6 relative z-10">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN') || 0}</p>
//             <button onClick={() => setShowModal(true)} className="w-full bg-white text-green-800 font-extrabold px-4 py-3 rounded-lg shadow-sm hover:bg-green-50 transition relative z-10">
//               Withdraw to Bank
//             </button>
//             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center text-center">
//             <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">💰</div>
//             <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Lifetime Earnings</h3>
//             <p className="text-3xl font-black text-blue-900">₹{walletData.wallet?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
//           </div>

//           {/* 🚀 UPGRADED REFERRAL BOX */}
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
//             <div>
//               <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
//                 🔗 My Referral Code
//               </h3>
//               <div className="flex items-center justify-between bg-orange-50 border border-orange-100 p-3 rounded-lg">
//                 <p className="text-2xl font-black text-orange-600 tracking-widest">{user?.myReferralCode || user?.user?.myReferralCode}</p>
//                 <button 
//                   onClick={handleCopyCode} 
//                   className={`text-sm px-4 py-1.5 rounded font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   {copied ? 'Copied! ✓' : 'Copy'}
//                 </button>
//               </div>
//             </div>
            
//             <button 
//               onClick={handleShare}
//               className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition flex items-center justify-center gap-2"
//             >
//               Share Code 🚀
//             </button>
//           </div>

//         </div>

//         {/* ================= TRANSACTION HISTORY ================= */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="p-6 border-b border-gray-100 bg-gray-50">
//             <h2 className="text-lg font-bold text-gray-900">Ledger & History</h2>
//           </div>
          
//           {walletData.transactions.length === 0 ? (
//             <div className="p-12 text-center text-gray-500 bg-white">
//               <p className="text-4xl mb-3">📭</p>
//               <p className="font-medium">No transactions yet. Start referring friends to earn real cash!</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto bg-white">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider bg-white">
//                     <th className="p-5 font-bold">Date</th>
//                     <th className="p-5 font-bold">Transaction Type</th>
//                     <th className="p-5 font-bold">Status</th>
//                     <th className="p-5 font-bold text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {walletData.transactions.map((tx) => (
//                     <tr key={tx._id} className="hover:bg-blue-50 transition-colors">
//                       <td className="p-5 text-sm text-gray-600 font-medium">
//                         {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
//                       </td>
//                       <td className="p-5">
//                         <p className="font-bold text-gray-900">
//                           {tx.source === 'referral_commission' ? 'Affiliate Commission' : 'Bank Payout Request'}
//                         </p>
//                         <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1">
//                           REF: {tx.relatedOrderId ? tx.relatedOrderId.slice(-8).toUpperCase() : tx._id.slice(-8).toUpperCase()}
//                         </p>
//                       </td>
//                       <td className="p-5">
//                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
//                           tx.status === 'completed' ? 'bg-green-100 text-green-800 border border-green-200' : 
//                           tx.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
//                           tx.status === 'approved' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
//                           'bg-yellow-100 text-yellow-800 border border-yellow-200'
//                         }`}>
//                           {tx.status}
//                         </span>
//                       </td>
//                       <td className={`p-5 text-right font-black text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
//                         {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>

//       {/* ================= WITHDRAWAL MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
//             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold text-xl">✕</button>
//             <h2 className="text-2xl font-black text-gray-900 mb-2">Withdraw to Bank</h2>
//             <p className="text-sm text-gray-500 mb-6 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
//               Available for withdrawal: <span className="font-bold text-green-600">₹{walletData.wallet?.availableBalance}</span>
//             </p>
            
//             <div className="space-y-5">
//               <div>
//                 <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Amount (Min ₹500)</label>
//                 <input 
//                   type="number" placeholder="₹" 
//                   className="w-full p-4 border border-gray-300 rounded-xl font-bold text-lg outline-none focus:ring-2 focus:ring-green-500"
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Your UPI ID</label>
//                 <input 
//                   type="text" placeholder="e.g. rahul@okhdfc" 
//                   className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
//                   onChange={(e) => setUpiId(e.target.value)}
//                 />
//               </div>
              
//               <button 
//                 onClick={async () => {
//                   if (amount < 500) return alert("Minimum withdrawal is ₹500");
//                   if (amount > walletData.wallet?.availableBalance) return alert("Insufficient balance!");
                  
//                   try {
//                     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request`, {
//                       // 🚀 FIXED: Safe ID used here!
//                       userId: user?._id || user?.user?._id, 
//                       amount: Number(amount), 
//                       method: 'UPI', 
//                       details: { upiId }
//                     });
//                     alert("Request Sent! Admin will review it shortly.");
//                     setShowModal(false);
//                     window.location.reload(); 
//                   } catch (err) { alert(err.response?.data?.message || "Error"); }
//                 }}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl text-lg shadow-lg transition-all mt-4"
//               >
//                 Confirm Transfer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // src/app/wallet/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function WalletDashboard() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [walletData, setWalletData] = useState({ wallet: null, transactions: [] });
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [upiId, setUpiId] = useState('');
//   const [copied, setCopied] = useState(false); 

//   useEffect(() => {
//     if (!user) { router.push('/login'); return; }

//     const fetchWallet = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${user?._id || user?.user?._id}`);
//         setWalletData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching wallet:", error);
//         setLoading(false);
//       }
//     };
//     fetchWallet();
//   }, [user, router]);

//   // 🚀 COPY LOGIC
//   const handleCopyCode = () => {
//     const code = user?.myReferralCode || user?.user?.myReferralCode;
//     if (code) {
//       navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); 
//     }
//   };

//   // 🚀 SHARE LOGIC (Dynamically grabs current website URL)
//   const handleShare = async () => {
//     const referralCode = user?.myReferralCode || user?.user?.myReferralCode;
//     if (!referralCode) return alert("Referral code not found. Please log in again.");

//     const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://yourstore.com';
//     const shareMessage = `Hey! I'm buying awesome gadgets from AMAZON SMARTS. Use my VIP invite code *${referralCode}* when you sign up to get special deals! Check it out: ${origin}/register?ref=${referralCode}`;

//     if (navigator.share) {
//       try {
//         await navigator.share({ title: 'AMAZON SMARTS VIP Invite', text: shareMessage });
//       } catch (error) { console.log('Error sharing', error); }
//     } else {
//       const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
//       window.open(whatsappUrl, '_blank');
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 space-y-4">
//       <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-emerald-500"></div>
//       <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">Accessing Secure Vault...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 selection:bg-emerald-200">
      
//       {/* PREMIUM NAVBAR */}
      

//       <div className="max-w-[1200px] mx-auto p-4 md:p-8 mt-4">
        
//         <div className="mb-10">
//           <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Affiliate Wallet</h1>
//           <p className="text-slate-500 font-medium mt-2">Manage your earnings, track referrals, and withdraw to your bank.</p>
//         </div>

//         {/* ================= TOP SECTION ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          
//           {/* Available Balance Vault */}
//           <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-3xl p-8 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
//             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full"></div>
            
//             <div className="relative z-10 mb-8">
//               <h3 className="text-emerald-100 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
//                 <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span> Available Balance
//               </h3>
//               <p className="text-5xl font-black tracking-tighter">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN') || 0}</p>
//             </div>
            
//             <button onClick={() => setShowModal(true)} className="w-full bg-white text-emerald-800 font-black uppercase tracking-widest px-4 py-4 rounded-xl shadow-sm hover:bg-emerald-50 hover:shadow-md transition-all relative z-10 flex items-center justify-center gap-2">
//               Withdraw Funds <span>→</span>
//             </button>
//           </div>

//           {/* Lifetime Earnings */}
//           <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
//             <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
//             <div className="relative z-10 text-center">
//               <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-slate-700 shadow-inner">
//                 💰
//               </div>
//               <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Total Lifetime Earnings</h3>
//               <p className="text-4xl font-black text-white tracking-tighter">₹{walletData.wallet?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
//             </div>
//           </div>

//           {/* VIP Referral Box */}
//           <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-dashed border-orange-200 flex flex-col justify-between relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
//             <div>
//               <h3 className="text-slate-800 text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
//                 <span className="text-orange-500 text-xl">🎁</span> VIP Invite Code
//               </h3>
//               <div className="flex items-center justify-between bg-orange-50/50 border border-orange-100 p-4 rounded-xl mb-2">
//                 <p className="text-2xl font-black text-orange-600 tracking-widest select-all">{user?.myReferralCode || user?.user?.myReferralCode}</p>
//                 <button 
//                   onClick={handleCopyCode} 
//                   className={`text-xs px-4 py-2 rounded-lg font-black uppercase tracking-wider transition-all shadow-sm ${copied ? 'bg-emerald-500 text-white' : 'bg-white border border-orange-200 text-orange-600 hover:bg-orange-100'}`}
//                 >
//                   {copied ? 'Copied!' : 'Copy'}
//                 </button>
//               </div>
//               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2 ml-1">Give discounts, earn cash.</p>
//             </div>
            
//             <button 
//               onClick={handleShare}
//               className="w-full mt-6 bg-slate-900 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg hover:bg-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
//             >
//               Share Link 🚀
//             </button>
//           </div>

//         </div>

//         {/* ================= TRANSACTION HISTORY ================= */}
//         <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
//           <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center">
//             <h2 className="text-xl font-black text-slate-900 tracking-tight">Ledger & History</h2>
//             <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{walletData.transactions.length} Records</span>
//           </div>
          
//           {walletData.transactions.length === 0 ? (
//             <div className="p-16 text-center flex flex-col items-center">
//               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">📭</div>
//               <h3 className="text-xl font-black text-slate-900 mb-2">No transactions yet</h3>
//               <p className="text-slate-500 font-medium max-w-md">Start referring friends to build your balance and earn real cash directly to your bank account.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left whitespace-nowrap">
//                 <thead className="bg-slate-50 border-b border-slate-100">
//                   <tr>
//                     <th className="p-4 md:px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
//                     <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Description</th>
//                     <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
//                     <th className="p-4 md:px-8 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {walletData.transactions.map((tx) => (
//                     <tr key={tx._id} className="hover:bg-slate-50/50 transition-colors">
//                       <td className="p-4 md:px-8 text-sm text-slate-600 font-bold">
//                         {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
//                       </td>
//                       <td className="p-4">
//                         <p className="font-bold text-slate-900 flex items-center gap-2">
//                           {tx.type === 'credit' ? <span className="text-emerald-500">↓</span> : <span className="text-orange-500">↑</span>}
//                           {tx.source === 'referral_commission' ? 'Affiliate Commission' : 'Bank Payout Request'}
//                         </p>
//                         <p className="text-[10px] text-slate-400 font-mono font-bold tracking-widest mt-1 ml-5">
//                           REF: {tx.relatedOrderId ? tx.relatedOrderId.slice(-8).toUpperCase() : tx._id.slice(-8).toUpperCase()}
//                         </p>
//                       </td>
//                       <td className="p-4">
//                         <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
//                           tx.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 
//                           tx.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                           tx.status === 'approved' ? 'bg-blue-100 text-blue-800' :
//                           'bg-amber-100 text-amber-800'
//                         }`}>
//                           {tx.status}
//                         </span>
//                       </td>
//                       <td className={`p-4 md:px-8 text-right font-black text-lg tracking-tight ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
//                         {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>

//       {/* ================= PREMIUM WITHDRAWAL MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl relative border border-slate-200 my-auto">
            
//             <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 w-8 h-8 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 rounded-full flex items-center justify-center font-black transition-colors pb-1">✕</button>
            
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-inner">🏦</div>
//               <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Withdraw Funds</h2>
//               <div className="inline-block bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
//                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Available to transfer</p>
//                 <p className="font-black text-emerald-600 text-xl tracking-tight">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN')}</p>
//               </div>
//             </div>
            
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest ml-1">Transfer Amount (Min ₹500)</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">₹</span>
//                   <input 
//                     type="number" 
//                     placeholder="0.00" 
//                     className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-black text-xl text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest ml-1">Destination UPI ID</label>
//                 <input 
//                   type="text" 
//                   placeholder="e.g. yourname@okhdfc" 
//                   className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm placeholder-slate-400"
//                   onChange={(e) => setUpiId(e.target.value)}
//                 />
//               </div>
              
//               <button 
//                 onClick={async () => {
//                   if (amount < 500) return alert("Minimum withdrawal is ₹500");
//                   if (amount > walletData.wallet?.availableBalance) return alert("Insufficient balance!");
//                   if (!upiId) return alert("Please enter a valid UPI ID");
                  
//                   try {
//                     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request`, {
//                       userId: user?._id || user?.user?._id, 
//                       amount: Number(amount), 
//                       method: 'UPI', 
//                       details: { upiId }
//                     });
//                     alert("Request Sent! Admin will review it shortly.");
//                     setShowModal(false);
//                     window.location.reload(); 
//                   } catch (err) { alert(err.response?.data?.message || "Error processing request."); }
//                 }}
//                 className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all mt-2"
//               >
//                 Confirm Transfer
//               </button>
              
//               <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
//                 Transfers may take up to 24 hours to reflect.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// // src/app/wallet/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function WalletDashboard() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [walletData, setWalletData] = useState({ wallet: null, transactions: [] });
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [copied, setCopied] = useState(false); 

//   // Withdrawal Form States
//   const [amount, setAmount] = useState('');
//   const [withdrawMethod, setWithdrawMethod] = useState('UPI'); // 'UPI' or 'BANK'
//   const [upiId, setUpiId] = useState('');
//   const [bankInfo, setBankInfo] = useState({ accountName: '', accountNumber: '', bankName: '', ifsc: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (!user) { router.push('/login'); return; }

//     const fetchWalletAndProfile = async () => {
//       try {
//         const userId = user?._id || user?.user?._id;
        
//         // Fetch both wallet and profile data simultaneously
//         const [walletRes, profileRes] = await Promise.all([
//           axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${userId}`),
//           axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         ]);
        
//         setWalletData(walletRes.data);
//         setUserProfile(profileRes.data);

//         // Auto-fill forms if data is saved in profile
//         const savedBank = profileRes.data?.bankDetails;
//         if (savedBank) {
//           if (savedBank.upiId) setUpiId(savedBank.upiId);
//           if (savedBank.accountNumber) {
//             setBankInfo({
//               accountName: savedBank.accountName || '',
//               accountNumber: savedBank.accountNumber || '',
//               bankName: savedBank.bankName || '',
//               ifsc: savedBank.ifsc || ''
//             });
//             // If they only have Bank saved (no UPI), default to BANK tab
//             if (!savedBank.upiId) setWithdrawMethod('BANK');
//           }
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };
//     fetchWalletAndProfile();
//   }, [user, router]);

//   const handleCopyCode = () => {
//     const code = user?.myReferralCode || user?.user?.myReferralCode;
//     if (code) {
//       navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); 
//     }
//   };

//   const handleShare = async () => {
//     const referralCode = user?.myReferralCode || user?.user?.myReferralCode;
//     if (!referralCode) return alert("Referral code not found. Please log in again.");

//     const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://amazon-smarts.vercel.app';
//     const shareMessage = `Hey! I'm buying awesome gadgets from Amazon Smarts. Use my VIP invite code *${referralCode}* when you sign up to get special deals! Check it out: ${origin}/signup?ref=${referralCode}`;

//     if (navigator.share) {
//       try { await navigator.share({ title: 'Amazon Smarts VIP Invite', text: shareMessage }); } 
//       catch (error) { console.log('Error sharing', error); }
//     } else {
//       const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
//       window.open(whatsappUrl, '_blank');
//     }
//   };

//   const handleWithdrawalSubmit = async () => {
//     const withdrawAmount = Number(amount);
//     if (!withdrawAmount || withdrawAmount < 500) return alert("Minimum withdrawal is ₹500");
//     if (withdrawAmount > walletData.wallet?.availableBalance) return alert("Insufficient balance!");

//     let details = {};
//     if (withdrawMethod === 'UPI') {
//       if (!upiId) return alert("Please enter a valid UPI ID");
//       details = { upiId };
//     } else {
//       if (!bankInfo.accountNumber || !bankInfo.ifsc || !bankInfo.accountName) return alert("Please fill all required bank details");
//       details = { ...bankInfo };
//     }

//     setIsSubmitting(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request`, {
//         userId: user?._id || user?.user?._id, 
//         amount: withdrawAmount, 
//         method: withdrawMethod, 
//         details: details
//       });
//       alert("Withdrawal requested successfully! Admin will review it shortly.");
//       setShowModal(false);
//       window.location.reload(); 
//     } catch (err) { 
//       alert(err.response?.data?.message || "Error processing request."); 
//       setIsSubmitting(false);
//     }
//   };

//   // 🚀 AMAZON-SPECIFIC TAILWIND STYLES
//   const boxStyle = "bg-white border border-[#ddd] rounded-[8px] p-5";
//   const amzInput = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const amzLabel = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[13px] text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center";
//   const amzSecondaryButton = "w-full bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[6px] rounded-[8px] text-[13px] text-[#111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center";

//   if (loading) return (
//     <div className="min-h-screen bg-[#EAEDED] flex flex-col items-center justify-center p-4">
//       <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin mb-4"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#EAEDED] font-sans text-[#0F1111] pb-20 selection:bg-orange-200">
      
//       <div className="max-w-[1000px] mx-auto px-4 py-6">
        
//         {/* Breadcrumb & Header */}
//         <div className="mb-6">
//           <div className="text-[14px] text-[#565959] mb-2 flex items-center gap-1">
//             <Link href="/account" className="text-[#007185] hover:text-[#c45500] hover:underline">Your Account</Link> 
//             <span>›</span> 
//             <span className="text-[#c45500]">Affiliate Wallet</span>
//           </div>
//           <h1 className="text-[28px] font-normal leading-tight">Your Affiliate Wallet</h1>
//         </div>

//         {/* ================= TOP SECTION ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
//           {/* Available Balance Box */}
//           <div className={boxStyle}>
//             <h3 className="text-[17px] font-normal text-[#0F1111] mb-1">Available Balance</h3>
//             <p className="text-[32px] font-normal text-[#B12704] mb-4">
//               ₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN') || 0}
//             </p>
//             <button onClick={() => setShowModal(true)} className={amzButton}>
//               Withdraw Funds
//             </button>
//           </div>

//           {/* Lifetime Earnings Box */}
//           <div className={boxStyle}>
//             <h3 className="text-[17px] font-normal text-[#0F1111] mb-1">Lifetime Earnings</h3>
//             <p className="text-[32px] font-normal text-[#0F1111] mb-4">
//               ₹{walletData.wallet?.totalEarnings?.toLocaleString('en-IN') || 0}
//             </p>
//             <p className="text-[13px] text-[#565959]">
//               Total money earned from your referrals since joining.
//             </p>
//           </div>

//           {/* VIP Referral Box */}
//           <div className={boxStyle}>
//             <h3 className="text-[17px] font-normal text-[#0F1111] mb-2">Share & Earn</h3>
//             <p className="text-[13px] text-[#565959] mb-3">
//               Give your friends a discount and earn commission on their first purchase.
//             </p>
            
//             <div className="bg-[#f3f3f3] border border-[#ddd] p-2 rounded-[4px] flex items-center justify-between mb-3">
//               <span className="font-mono text-[14px] font-bold text-[#0F1111] tracking-wider select-all">
//                 {user?.myReferralCode || user?.user?.myReferralCode}
//               </span>
//               <button 
//                 onClick={handleCopyCode} 
//                 className="text-[#007185] hover:text-[#c45500] hover:underline text-[13px]"
//               >
//                 {copied ? '✓ Copied' : 'Copy'}
//               </button>
//             </div>
            
//             <button onClick={handleShare} className={amzSecondaryButton}>
//               Share Referral Link
//             </button>
//           </div>

//         </div>

//         {/* ================= TRANSACTION HISTORY ================= */}
//         <div className="bg-white border border-[#ddd] rounded-[8px] overflow-hidden">
//           <div className="p-4 border-b border-[#ddd] bg-[#f3f3f3]">
//             <h2 className="text-[18px] font-normal text-[#0F1111]">Ledger & History</h2>
//           </div>
          
//           {walletData.transactions.length === 0 ? (
//             <div className="p-8 text-center">
//               <p className="text-[14px] text-[#565959]">You don't have any transactions yet.</p>
//               <p className="text-[14px] text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer mt-2" onClick={handleShare}>
//                 Start sharing your link to earn!
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-[#ddd] text-[13px] text-[#565959]">
//                     <th className="p-4 font-bold">Date</th>
//                     <th className="p-4 font-bold">Description</th>
//                     <th className="p-4 font-bold">Status</th>
//                     <th className="p-4 font-bold text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-[#eee]">
//                   {walletData.transactions.map((tx) => (
//                     <tr key={tx._id} className="text-[14px] text-[#0F1111]">
//                       <td className="p-4 whitespace-nowrap">
//                         {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//                       </td>
//                       <td className="p-4">
//                         <p className="font-medium">
//                           {tx.source === 'referral_commission' ? 'Affiliate Commission' : 'Bank Payout Request'}
//                         </p>
//                         <p className="text-[12px] text-[#565959] mt-0.5">
//                           Ref: {tx.relatedOrderId ? tx.relatedOrderId.slice(-8).toUpperCase() : tx._id.slice(-8).toUpperCase()}
//                         </p>
//                       </td>
//                       <td className="p-4">
//                         <span className={`text-[12px] font-bold ${
//                           tx.status === 'completed' ? 'text-[#007600]' : 
//                           tx.status === 'rejected' ? 'text-[#c40000]' :
//                           tx.status === 'approved' ? 'text-[#007185]' :
//                           'text-[#e77600]'
//                         }`}>
//                           {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
//                         </span>
//                       </td>
//                       <td className={`p-4 text-right whitespace-nowrap ${tx.type === 'credit' ? 'text-[#007600]' : 'text-[#B12704]'}`}>
//                         {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//       </div>

//       {/* ================= WITHDRAWAL MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-[8px] w-full max-w-[450px] shadow-[0_2px_10px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
            
//             <div className="bg-[#f3f3f3] border-b border-[#ddd] p-4 flex justify-between items-center shrink-0">
//               <h2 className="text-[16px] font-bold text-[#0F1111]">Withdraw Funds</h2>
//               <button onClick={() => setShowModal(false)} className="text-[#0F1111] hover:text-[#c40000] text-xl leading-none">✕</button>
//             </div>
            
//             <div className="p-5 overflow-y-auto custom-scrollbar">
//               <div className="bg-[#f0f2f2] border border-[#d5d9d9] p-3 rounded-[4px] mb-5">
//                 <p className="text-[13px] text-[#565959] mb-1">Available to transfer</p>
//                 <p className="text-[18px] font-bold text-[#B12704]">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN')}</p>
//               </div>
              
//               <div className="mb-5">
//                 <label className={amzLabel}>Amount to withdraw (Min ₹500)</label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565959]">₹</span>
//                   <input 
//                     type="number" 
//                     placeholder="0.00" 
//                     className={`${amzInput} pl-7`}
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Tabs for UPI vs Bank */}
//               <div className="flex gap-4 border-b border-[#ddd] mb-4">
//                 <button 
//                   className={`pb-2 text-[14px] font-bold ${withdrawMethod === 'UPI' ? 'border-b-2 border-[#e77600] text-[#0F1111]' : 'text-[#007185] hover:text-[#c45500]'}`}
//                   onClick={() => setWithdrawMethod('UPI')}
//                 >
//                   UPI Transfer
//                 </button>
//                 <button 
//                   className={`pb-2 text-[14px] font-bold ${withdrawMethod === 'BANK' ? 'border-b-2 border-[#e77600] text-[#0F1111]' : 'text-[#007185] hover:text-[#c45500]'}`}
//                   onClick={() => setWithdrawMethod('BANK')}
//                 >
//                   Bank Account
//                 </button>
//               </div>
              
//               {/* UPI Form */}
//               {withdrawMethod === 'UPI' && (
//                 <div className="mb-2">
//                   <label className={amzLabel}>Destination UPI ID</label>
//                   <input 
//                     type="text" 
//                     placeholder="e.g. yourname@okhdfc" 
//                     className={amzInput}
//                     value={upiId}
//                     onChange={(e) => setUpiId(e.target.value)}
//                   />
//                   {userProfile?.bankDetails?.upiId && (
//                     <p className="text-[11px] text-[#007600] mt-1 font-bold">✓ Pre-filled from saved settings</p>
//                   )}
//                 </div>
//               )}

//               {/* BANK Form */}
//               {withdrawMethod === 'BANK' && (
//                 <div className="space-y-3 mb-2">
//                   <div>
//                     <label className={amzLabel}>Account Holder Name</label>
//                     <input type="text" className={amzInput} value={bankInfo.accountName} onChange={e => setBankInfo({...bankInfo, accountName: e.target.value})} />
//                   </div>
//                   <div>
//                     <label className={amzLabel}>Account Number</label>
//                     <input type="text" className={amzInput} value={bankInfo.accountNumber} onChange={e => setBankInfo({...bankInfo, accountNumber: e.target.value})} />
//                   </div>
//                   <div className="flex gap-3">
//                     <div className="flex-1">
//                       <label className={amzLabel}>IFSC Code</label>
//                       <input type="text" className={amzInput} value={bankInfo.ifsc} onChange={e => setBankInfo({...bankInfo, ifsc: e.target.value})} />
//                     </div>
//                     <div className="flex-1">
//                       <label className={amzLabel}>Bank Name</label>
//                       <input type="text" className={amzInput} value={bankInfo.bankName} onChange={e => setBankInfo({...bankInfo, bankName: e.target.value})} />
//                     </div>
//                   </div>
//                   {userProfile?.bankDetails?.accountNumber && (
//                     <p className="text-[11px] text-[#007600] mt-1 font-bold">✓ Pre-filled from saved settings</p>
//                   )}
//                 </div>
//               )}

//               <div className="text-center mt-3 mb-5">
//                 <Link href="/account?tab=profile" className="text-[12px] text-[#007185] hover:text-[#c45500] hover:underline">
//                   Manage saved payout methods in Account Settings
//                 </Link>
//               </div>
              
//               <div className="pt-2 shrink-0">
//                 <button 
//                   onClick={handleWithdrawalSubmit}
//                   disabled={isSubmitting}
//                   className={amzButton}
//                 >
//                   {isSubmitting ? 'Processing...' : 'Submit Request'}
//                 </button>
//                 <p className="text-[12px] text-[#565959] text-center mt-3">
//                   Transfers may take up to 24 hours to reflect in your account.
//                 </p>
//               </div>
              
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// src/app/wallet/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function WalletDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [walletData, setWalletData] = useState({ wallet: null, transactions: [] });
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false); 

  // Withdrawal Form States
  const [amount, setAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('UPI'); 
  const [upiId, setUpiId] = useState('');
  const [bankInfo, setBankInfo] = useState({ accountName: '', accountNumber: '', bankName: '', ifsc: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }

    const fetchWalletAndProfile = async () => {
      try {
        const userId = user?._id || user?.user?._id;
        const [walletRes, profileRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${userId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
        ]);
        setWalletData(walletRes.data);
        setUserProfile(profileRes.data);

        const savedBank = profileRes.data?.bankDetails;
        if (savedBank) {
          if (savedBank.upiId) setUpiId(savedBank.upiId);
          if (savedBank.accountNumber) {
            setBankInfo({
              accountName: savedBank.accountName || '',
              accountNumber: savedBank.accountNumber || '',
              bankName: savedBank.bankName || '',
              ifsc: savedBank.ifsc || ''
            });
            if (!savedBank.upiId) setWithdrawMethod('BANK');
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchWalletAndProfile();
  }, [user, router]);

  // 🚀 SOCIAL SHARE LOGIC
  const referralCode = user?.myReferralCode || user?.user?.myReferralCode;
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://amazon-smarts.vercel.app';
  const shareUrl = `${origin}/register?ref=${referralCode}`;
  const shareText = `Hey! Join Amazon Smarts using my code *${referralCode}* to get exclusive VIP deals on gadgets!`;

  // THE MAGIC "SHARE TO WHATEVER" BUTTON
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Amazon Smarts VIP Invite',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) { console.log("Native share failed", err); }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank');

  const handleWithdrawalSubmit = async () => {
    const withdrawAmount = Number(amount);
    if (!withdrawAmount || withdrawAmount < 500) return alert("Min withdrawal ₹500");
    if (withdrawAmount > walletData.wallet?.availableBalance) return alert("Insufficient balance!");

    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request`, {
        userId: user?._id || user?.user?._id, 
        amount: withdrawAmount, 
        method: withdrawMethod, 
        details: withdrawMethod === 'UPI' ? { upiId } : { ...bankInfo }
      });
      alert("Withdrawal requested!");
      setShowModal(false);
      window.location.reload(); 
    } catch (err) { alert("Error processing request."); setIsSubmitting(false); }
  };

  // Amazon.com UI Constants
  const amzButtonYellow = "bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] px-4 rounded-[8px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-colors cursor-pointer text-center";
  const amzButtonWhite = "bg-white border border-[#D5D9D9] hover:bg-[#F7FAFA] py-[6px] px-4 rounded-[8px] text-[13px] text-[#0F1111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center";
  const amzLabel = "block text-[13px] font-bold text-[#111] mb-1";
  const amzInput = "w-full px-3 py-1.5 border border-[#888C8C] rounded-[3px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] text-[#111]";

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-10 h-10 border-4 border-t-[#e77600] rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20">
      <div className="max-w-[1000px] mx-auto px-4 py-6">
        <div className="text-[14px] text-[#565959] mb-4 flex items-center gap-1">
          <Link href="/account" className="text-[#007185] hover:text-[#C45500] hover:underline">Your Account</Link> 
          <span className="text-[#565959] text-[10px]">›</span> 
          <span className="text-[#C45500]">Affiliate Wallet</span>
        </div>

        <h1 className="text-[28px] font-normal mb-6">Your Affiliate Wallet</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-[#D5D9D9] rounded-[8px] p-5 flex flex-col justify-between">
            <div>
                <h3 className="text-[17px] font-normal mb-1">Available Balance</h3>
                <p className="text-[32px] font-normal text-[#B12704]">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN') || 0}</p>
            </div>
            <button onClick={() => setShowModal(true)} className={`${amzButtonYellow} mt-4 font-normal`}>Withdraw Funds</button>
          </div>

          <div className="border border-[#D5D9D9] rounded-[8px] p-5">
            <h3 className="text-[17px] font-normal mb-1">Lifetime Earnings</h3>
            <p className="text-[32px] font-normal">₹{walletData.wallet?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
            <p className="text-[13px] text-[#565959] mt-2">Total commission earned from referrals.</p>
          </div>

          {/* 🚀 FIXED: SHARE CARD WITH NATIVE SHARE BUTTON */}
          <div className="border border-[#D5D9D9] rounded-[8px] p-5 flex flex-col gap-3">
            <h3 className="text-[17px] font-normal">Invite Friends</h3>
            
            <div className="bg-[#F0F2F2] border border-[#D5D9D9] p-2 rounded-[4px] flex items-center justify-between">
                <span className="font-mono text-[14px] font-bold">{referralCode}</span>
                <button onClick={handleCopyLink} className="text-[#007185] text-[12px] hover:underline uppercase font-bold">
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button onClick={shareToWhatsApp} className={amzButtonWhite + " flex items-center justify-center gap-2"}>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-4 h-4" alt="wa" /> WhatsApp
                </button>
                <button onClick={() => window.open(`https://t.me/share/url?url=${shareUrl}`, '_blank')} className={amzButtonWhite + " flex items-center justify-center gap-2"}>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-4 h-4" alt="tg" /> Telegram
                </button>
            </div>

            {/* THE "SHARE TO WHATEVER" BUTTON */}
            <button onClick={handleNativeShare} className={amzButtonWhite + " w-full flex items-center justify-center gap-2 font-bold"}>
               <span>📤</span> More Share Options
            </button>
          </div>
        </div>

        <div className="border border-[#D5D9D9] rounded-[8px] overflow-hidden">
          <div className="bg-[#F0F2F2] px-4 py-3 border-b border-[#D5D9D9]"><h2 className="text-[18px]">Account Activity</h2></div>
          <div className="overflow-x-auto">
            {walletData.transactions.length === 0 ? (
              <div className="p-10 text-center text-[#565959] text-[14px]">No transactions found.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[13px] text-[#565959] border-b border-[#D5D9D9]">
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Description</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEE]">
                  {walletData.transactions.map((tx) => (
                    <tr key={tx._id} className="text-[14px] hover:bg-[#F7F7F7]">
                      <td className="p-4 whitespace-nowrap text-[#565959]">{new Date(tx.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="p-4">
                        <p className="font-bold">{tx.source === 'referral_commission' ? 'Commission' : 'Withdrawal'}</p>
                        <p className="text-[12px] text-[#565959]">ID: {tx._id.slice(-10).toUpperCase()}</p>
                      </td>
                      <td className={`p-4 uppercase text-[12px] font-bold ${tx.status === 'completed' ? 'text-[#007600]' : tx.status === 'rejected' ? 'text-[#B12704]' : 'text-[#E77600]'}`}>
                        {tx.status}
                      </td>
                      <td className={`p-4 text-right font-bold ${tx.type === 'credit' ? 'text-[#007600]' : 'text-[#B12704]'}`}>
                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* WITHDRAW MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-[8px] w-full max-w-[420px] shadow-2xl overflow-hidden">
            <div className="bg-[#F0F2F2] border-b p-4 flex justify-between items-center">
              <h2 className="text-[16px] font-bold">Withdraw Funds</h2>
              <button onClick={() => setShowModal(false)} className="text-2xl leading-none">×</button>
            </div>
            <div className="p-6">
              <div className="bg-[#FDF8F3] border border-[#FBD8B4] p-3 rounded-[4px] mb-6">
                <p className="text-[13px]">Available: <span className="font-bold text-[#B12704]">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN')}</span></p>
              </div>
              <div className="space-y-4">
                <label className={amzLabel}>Amount to withdraw</label>
                <input type="number" placeholder="Min ₹500" className={amzInput} onChange={(e) => setAmount(e.target.value)} />
                <div className="flex gap-4 border-b border-[#D5D9D9] mb-2">
                   <button className={`pb-2 text-[13px] font-bold ${withdrawMethod === 'UPI' ? 'border-b-2 border-[#E77600]' : ''}`} onClick={() => setWithdrawMethod('UPI')}>UPI</button>
                   <button className={`pb-2 text-[13px] font-bold ${withdrawMethod === 'BANK' ? 'border-b-2 border-[#E77600]' : ''}`} onClick={() => setWithdrawMethod('BANK')}>Bank Account</button>
                </div>
                {withdrawMethod === 'UPI' ? (
                   <input type="text" placeholder="e.g. name@okhdfc" className={amzInput} value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                ) : (
                  <div className="space-y-3">
                    <input type="text" placeholder="Name on Account" className={amzInput} value={bankInfo.accountName} onChange={e => setBankInfo({...bankInfo, accountName: e.target.value})} />
                    <input type="text" placeholder="Account Number" className={amzInput} value={bankInfo.accountNumber} onChange={e => setBankInfo({...bankInfo, accountNumber: e.target.value})} />
                    <div className="flex gap-2">
                       <input type="text" placeholder="IFSC" className={amzInput} value={bankInfo.ifsc} onChange={e => setBankInfo({...bankInfo, ifsc: e.target.value})} />
                       <input type="text" placeholder="Bank Name" className={amzInput} value={bankInfo.bankName} onChange={e => setBankInfo({...bankInfo, bankName: e.target.value})} />
                    </div>
                  </div>
                )}
                <button onClick={handleWithdrawalSubmit} disabled={isSubmitting} className={amzButtonYellow + " w-full mt-4"}>
                    {isSubmitting ? 'Processing...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}