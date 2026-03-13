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
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [copied, setCopied] = useState(false); 

  useEffect(() => {
    if (!user) { router.push('/login'); return; }

    const fetchWallet = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/${user?._id || user?.user?._id}`);
        setWalletData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wallet:", error);
        setLoading(false);
      }
    };
    fetchWallet();
  }, [user, router]);

  // 🚀 COPY LOGIC
  const handleCopyCode = () => {
    const code = user?.myReferralCode || user?.user?.myReferralCode;
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }
  };

  // 🚀 SHARE LOGIC
  const handleShare = async () => {
    const referralCode = user?.myReferralCode || user?.user?.myReferralCode;
    if (!referralCode) return alert("Referral code not found. Please log in again.");

    const shareMessage = `Hey! I'm buying awesome gadgets from GadgetStore. Use my referral code *${referralCode}* when you sign up to get special deals! Check it out: http://localhost:3000/signup?ref=${referralCode}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'GadgetStore Referral', text: shareMessage });
      } catch (error) { console.log('Error sharing', error); }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading Secure Wallet...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      
      {/* Navbar */}
      <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
        <Link href="/">
          <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
            GADGET<span className="text-white">STORE</span>
          </h1>
        </Link>
        <span className="font-bold bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">My RC Wallet 💳</span>
      </nav>

      <div className="max-w-[1200px] mx-auto p-4 md:p-6 mt-6">
        
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <h3 className="text-green-100 text-sm font-bold uppercase tracking-wider mb-1 relative z-10">Available Balance</h3>
            <p className="text-4xl font-black mb-6 relative z-10">₹{walletData.wallet?.availableBalance?.toLocaleString('en-IN') || 0}</p>
            <button onClick={() => setShowModal(true)} className="w-full bg-white text-green-800 font-extrabold px-4 py-3 rounded-lg shadow-sm hover:bg-green-50 transition relative z-10">
              Withdraw to Bank
            </button>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center text-center">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">💰</div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Lifetime Earnings</h3>
            <p className="text-3xl font-black text-blue-900">₹{walletData.wallet?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
          </div>

          {/* 🚀 UPGRADED REFERRAL BOX */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                🔗 My Referral Code
              </h3>
              <div className="flex items-center justify-between bg-orange-50 border border-orange-100 p-3 rounded-lg">
                <p className="text-2xl font-black text-orange-600 tracking-widest">{user?.myReferralCode || user?.user?.myReferralCode}</p>
                <button 
                  onClick={handleCopyCode} 
                  className={`text-sm px-4 py-1.5 rounded font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  {copied ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleShare}
              className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              Share Code 🚀
            </button>
          </div>

        </div>

        {/* ================= TRANSACTION HISTORY ================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-900">Ledger & History</h2>
          </div>
          
          {walletData.transactions.length === 0 ? (
            <div className="p-12 text-center text-gray-500 bg-white">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">No transactions yet. Start referring friends to earn real cash!</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider bg-white">
                    <th className="p-5 font-bold">Date</th>
                    <th className="p-5 font-bold">Transaction Type</th>
                    <th className="p-5 font-bold">Status</th>
                    <th className="p-5 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {walletData.transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-blue-50 transition-colors">
                      <td className="p-5 text-sm text-gray-600 font-medium">
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-5">
                        <p className="font-bold text-gray-900">
                          {tx.source === 'referral_commission' ? 'Affiliate Commission' : 'Bank Payout Request'}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1">
                          REF: {tx.relatedOrderId ? tx.relatedOrderId.slice(-8).toUpperCase() : tx._id.slice(-8).toUpperCase()}
                        </p>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-800 border border-green-200' : 
                          tx.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                          tx.status === 'approved' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                          'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className={`p-5 text-right font-black text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ================= WITHDRAWAL MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold text-xl">✕</button>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Withdraw to Bank</h2>
            <p className="text-sm text-gray-500 mb-6 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
              Available for withdrawal: <span className="font-bold text-green-600">₹{walletData.wallet?.availableBalance}</span>
            </p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Amount (Min ₹500)</label>
                <input 
                  type="number" placeholder="₹" 
                  className="w-full p-4 border border-gray-300 rounded-xl font-bold text-lg outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Your UPI ID</label>
                <input 
                  type="text" placeholder="e.g. rahul@okhdfc" 
                  className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
              
              <button 
                onClick={async () => {
                  if (amount < 500) return alert("Minimum withdrawal is ₹500");
                  if (amount > walletData.wallet?.availableBalance) return alert("Insufficient balance!");
                  
                  try {
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/request`, {
                      // 🚀 FIXED: Safe ID used here!
                      userId: user?._id || user?.user?._id, 
                      amount: Number(amount), 
                      method: 'UPI', 
                      details: { upiId }
                    });
                    alert("Request Sent! Admin will review it shortly.");
                    setShowModal(false);
                    window.location.reload(); 
                  } catch (err) { alert(err.response?.data?.message || "Error"); }
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl text-lg shadow-lg transition-all mt-4"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}