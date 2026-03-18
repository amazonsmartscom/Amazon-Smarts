// // src/components/Header.jsx
// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';

// export default function Header() {
//   const { cartCount } = useCart();
//   const { user, logout } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <header className="bg-slate-900/95 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
//       <div className="max-w-[1600px] mx-auto p-4 flex justify-between items-center gap-4">
        
//         {/* Left: Logo & Mobile Toggle */}
//         <div className="flex items-center gap-4">
//           <button 
//             className="md:hidden text-2xl text-slate-300 hover:text-white"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             ☰
//           </button>
//           <Link href="/">
//             <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer drop-shadow-md hover:scale-105 transition-transform">
//               AMAZON<span className="text-white">SMARTS</span>
//             </h1>
//           </Link>
//         </div>
        
//         {/* Center: Global Search Bar (Hidden on Mobile, shown in drawer) */}
//         <div className="hidden md:flex w-full max-w-2xl shadow-inner rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-all duration-300 mx-8">
//           <input 
//             type="text" 
//             placeholder="Search for iPhone, MacBooks, audio..." 
//             className="w-full p-2.5 px-4 text-gray-900 focus:outline-none font-medium bg-white" 
//           />
//           <button className="bg-orange-500 px-8 font-bold text-white hover:bg-orange-600 transition-colors">Search</button>
//         </div>
        
//         {/* Right: User Menu & Cart */}
//         <div className="flex items-center gap-4 md:gap-6">
//           {user ? (
//             <div className="hidden md:flex flex-col items-start border-r border-slate-700 pr-6">
//               <p className="text-gray-400 font-medium text-xs mb-0.5">
//                 Welcome, <span className="font-bold text-white tracking-wide">{user?.user?.name || user?.name?.split(' ')[0]}</span>
//               </p>
//               <div className="flex gap-4">
//                 <Link href="/orders" className="font-bold text-slate-300 hover:text-white text-[10px] tracking-widest transition-colors">ORDERS</Link>
//                 <Link href="/wallet" className="font-bold text-slate-300 hover:text-white text-[10px] tracking-widest transition-colors">WALLET</Link>
//                 {(user?.user?.role === 'admin' || user?.role === 'admin') && (
//                   <Link href="/admin" className="font-bold text-orange-400 hover:text-orange-300 text-[10px] tracking-widest transition-colors">ADMIN</Link>
//                 )}
//                 <button onClick={logout} className="font-bold text-red-400 hover:text-red-300 text-[10px] tracking-widest transition-colors">LOGOUT</button>
//               </div>
//             </div>
//           ) : (
//             <Link href="/login" className="hidden md:block text-sm cursor-pointer group border-r border-slate-700 pr-6">
//               <p className="text-gray-400 text-xs group-hover:text-white transition-colors">Hello, Sign in</p>
//               <p className="font-bold tracking-wide group-hover:text-orange-400 transition-colors">Account & Lists</p>
//             </Link>
//           )}
          
//           <Link href="/cart">
//             <button className="relative font-bold flex items-center justify-center p-2 hover:bg-slate-800 rounded-full transition-colors group">
//               <span className="text-2xl group-hover:scale-110 transition-transform">🛒</span>
//               <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-black border-2 border-slate-900 shadow-sm">
//                 {cartCount}
//               </span>
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* MOBILE MENU DRAWER */}
//       <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] border-b border-white/10' : 'max-h-0 border-transparent'}`}>
//         <div className="p-4 space-y-4">
//           <div className="flex shadow-inner rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//             <input type="text" placeholder="Search gadgets..." className="w-full p-3 text-gray-900 focus:outline-none font-medium bg-white text-sm" />
//             <button className="bg-orange-500 px-4 font-bold text-white">🔍</button>
//           </div>
          
//           <div className="grid grid-cols-2 gap-2 text-sm font-bold uppercase tracking-widest">
//             <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Store</Link>
//             <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Orders</Link>
//             <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Wallet</Link>
            
//             {user ? (
//                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="bg-red-500/10 text-red-400 p-4 rounded-xl text-center hover:bg-red-500/20 transition-colors">Logout</button>
//             ) : (
//                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-orange-500 text-white p-4 rounded-xl text-center hover:bg-orange-600 transition-colors">Login</Link>
//             )}
            
//             {(user?.user?.role === 'admin' || user?.role === 'admin') && (
//               <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 p-4 rounded-xl text-center hover:bg-orange-500/20 transition-colors">Admin Dashboard</Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


// // src/components/Header.jsx
// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // 🚀 Added router
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';

// export default function Header() {
//   const { cartCount } = useCart();
//   const { user, logout } = useAuth();
//   const router = useRouter();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(''); // 🚀 Added state

//   // 🚀 SEARCH HANDLER
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       // Redirect to homepage with the search query in the URL
//       router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
//       setIsMobileMenuOpen(false); // Close mobile menu if it was open
//     }
//   };

//   return (
//     <header className="bg-slate-900/95 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
//       <div className="max-w-[1600px] mx-auto p-4 flex justify-between items-center gap-4">
        
//         {/* Left: Logo & Mobile Toggle */}
//         <div className="flex items-center gap-4">
//           <button 
//             className="md:hidden text-2xl text-slate-300 hover:text-white"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             ☰
//           </button>
//           <Link href="/">
//             <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer drop-shadow-md hover:scale-105 transition-transform">
//               AMAZON<span className="text-white">SMARTS</span>
//             </h1>
//           </Link>
//         </div>
        
//         {/* Center: Global Search Bar (Wrapped in form for 'Enter' key support) */}
//         <form onSubmit={handleSearch} className="hidden md:flex w-full max-w-2xl shadow-inner rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-all duration-300 mx-8">
//           <input 
//             type="text" 
//             placeholder="Search for iPhone, MacBooks, audio..." 
//             className="w-full p-2.5 px-4 text-gray-900 focus:outline-none font-medium bg-white" 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="bg-orange-500 px-8 font-bold text-white hover:bg-orange-600 transition-colors">Search</button>
//         </form>
        
//         {/* Right: User Menu & Cart */}
//         <div className="flex items-center gap-4 md:gap-6">
//           {user ? (
//             <div className="hidden md:flex flex-col items-start border-r border-slate-700 pr-6">
//               <p className="text-gray-400 font-medium text-xs mb-0.5">
//                 Welcome, <span className="font-bold text-white tracking-wide">{user?.user?.name || user?.name?.split(' ')[0]}</span>
//               </p>
//               <div className="flex gap-4">
//                 <Link href="/orders" className="font-bold text-slate-300 hover:text-white text-[10px] tracking-widest transition-colors">ORDERS</Link>
//                 <Link href="/wallet" className="font-bold text-slate-300 hover:text-white text-[10px] tracking-widest transition-colors">WALLET</Link>
//                 {(user?.user?.role === 'admin' || user?.role === 'admin') && (
//                   <Link href="/admin" className="font-bold text-orange-400 hover:text-orange-300 text-[10px] tracking-widest transition-colors">ADMIN</Link>
//                 )}
//                 <button onClick={logout} className="font-bold text-red-400 hover:text-red-300 text-[10px] tracking-widest transition-colors">LOGOUT</button>
//               </div>
//             </div>
//           ) : (
//             <Link href="/login" className="hidden md:block text-sm cursor-pointer group border-r border-slate-700 pr-6">
//               <p className="text-gray-400 text-xs group-hover:text-white transition-colors">Hello, Sign in</p>
//               <p className="font-bold tracking-wide group-hover:text-orange-400 transition-colors">Account & Lists</p>
//             </Link>
//           )}
          
//           <Link href="/cart">
//             <button className="relative font-bold flex items-center justify-center p-2 hover:bg-slate-800 rounded-full transition-colors group">
//               <span className="text-2xl group-hover:scale-110 transition-transform">🛒</span>
//               <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-black border-2 border-slate-900 shadow-sm">
//                 {cartCount}
//               </span>
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* MOBILE MENU DRAWER */}
//       <div className={`md:hidden sticky top-full left-0 w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] border-b border-white/10' : 'max-h-0 border-transparent'}`}>
//         <div className="p-4 space-y-4">
//           <form onSubmit={handleSearch} className="flex shadow-inner rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
//             <input 
//               type="text" 
//               placeholder="Search gadgets..." 
//               className="w-full p-3 text-gray-900 focus:outline-none font-medium bg-white text-sm" 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className="bg-orange-500 px-4 font-bold text-white">🔍</button>
//           </form>
          
//           <div className="grid grid-cols-2 gap-2 text-sm font-bold uppercase tracking-widest">
//             <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Store</Link>
//             <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Orders</Link>
//             <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Wallet</Link>
            
//             {user ? (
//                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="bg-red-500/10 text-red-400 p-4 rounded-xl text-center hover:bg-red-500/20 transition-colors">Logout</button>
//             ) : (
//                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-orange-500 text-white p-4 rounded-xl text-center hover:bg-orange-600 transition-colors">Login</Link>
//             )}
            
//             {(user?.user?.role === 'admin' || user?.role === 'admin') && (
//               <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 p-4 rounded-xl text-center hover:bg-orange-500/20 transition-colors">Admin Dashboard</Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }




// // src/components/Header.jsx
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';

// export default function Header() {
//   const { cartCount } = useCart();
//   const { user, logout } = useAuth();
//   const router = useRouter();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // 🚀 NEW: Notification States
//   const [notifications, setNotifications] = useState([]);
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const notifRef = useRef(null);

//   const userId = user?.user?._id || user?._id;
//   const isAdmin = user?.user?.role === 'admin' || user?.role === 'admin';

//   // 🚀 FETCH NOTIFICATIONS
//   useEffect(() => {
//     if (userId) {
//       const fetchNotifications = async () => {
//         try {
//           // Fetches alerts from your backend (we will build this route next)
//           const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`);
//           setNotifications(data);
//         } catch (error) {
//           // Fails silently if backend route isn't set up yet
//           console.log("Notifications endpoint not ready yet.");
//         }
//       };
//       fetchNotifications();
//       // Optional: Poll every 30 seconds for new notifications
//       const interval = setInterval(fetchNotifications, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [userId]);

//   // Handle clicking outside the notification dropdown to close it
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (notifRef.current && !notifRef.current.contains(event.target)) {
//         setIsNotifOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
//       setIsMobileMenuOpen(false); 
//     }
//   };

//   const markAsRead = async (notifId, link) => {
//     try {
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}/read`);
//       setNotifications(prev => prev.filter(n => n._id !== notifId));
//     } catch (err) {}
//     if (link) {
//       setIsNotifOpen(false);
//       router.push(link);
//     }
//   };

//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   return (
//     <header className="bg-[#131921] text-white shadow-md sticky top-0 z-50">
//       <div className="max-w-[1600px] mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-4">
        
//         {/* Top Row for Mobile / Left Side for Desktop */}
//         <div className="flex justify-between items-center w-full md:w-auto gap-4">
//           <div className="flex items-center gap-2">
//             <button 
//               className="md:hidden text-2xl text-white hover:text-gray-300 p-1 border border-transparent hover:border-white rounded-[3px]"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               ☰
//             </button>
//             <Link href="/">
//               <h1 className="text-2xl font-normal tracking-tighter text-white cursor-pointer px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors mt-1">
//                 amazon<span className="text-[#febd69] font-bold tracking-normal">smarts</span>
//               </h1>
//             </Link>
//           </div>

//           {/* Mobile Cart Icon */}
//           <Link href="/cart" className="md:hidden">
//             <button className="relative flex items-center p-2 border border-transparent hover:border-white rounded-[3px] transition-colors">
//               <span className="text-3xl">🛒</span>
//               <span className="absolute top-0 right-0 text-[#f08804] font-bold text-lg leading-none">
//                 {cartCount}
//               </span>
//             </button>
//           </Link>
//         </div>
        
//         {/* Center: Global Search Bar */}
//         <form onSubmit={handleSearch} className="flex w-full md:max-w-3xl rounded-[4px] overflow-hidden focus-within:ring-2 focus-within:ring-[#f90] transition-all">
//           <input 
//             type="text" 
//             placeholder="Search Amazon Smarts" 
//             className="w-full p-2.5 px-4 text-[#111] focus:outline-none font-medium bg-white text-[15px]" 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-6 text-[#111] transition-colors flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </button>
//         </form>
        
//         {/* Right: User Menu & Cart (Desktop) */}
//         <div className="hidden md:flex items-center gap-1">
//           {user ? (
//             <>
//               {/* 🚀 FIXED: Links to Customer Dashboard */}
//               <Link href="/account" className="px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors flex flex-col leading-tight">
//                 <p className="text-white text-[12px] m-0">
//                   Hello, {user?.user?.name || user?.name?.split(' ')[0]}
//                 </p>
//                 <p className="font-bold text-[14px] m-0">Account & Lists</p>
//               </Link>
              
//               <Link href="/orders" className="px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors flex flex-col leading-tight">
//                 <span className="text-[12px] m-0">Returns</span>
//                 <span className="font-bold text-[14px] m-0">& Orders</span>
//               </Link>
              
//               {isAdmin && (
//                 <Link href="/admin" className="px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors flex flex-col leading-tight">
//                   <span className="text-[12px] text-[#febd69] m-0">Store</span>
//                   <span className="font-bold text-[#febd69] text-[14px] m-0">Admin</span>
//                 </Link>
//               )}

//               {/* 🚀 NEW: Notification Bell */}
//               <div className="relative" ref={notifRef}>
//                 <button 
//                   onClick={() => setIsNotifOpen(!isNotifOpen)} 
//                   className="relative flex items-center justify-center px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors h-full"
//                 >
//                   <span className="text-2xl relative top-0.5">🔔</span>
//                   {unreadCount > 0 && (
//                     <span className="absolute top-0 right-1 text-[#f08804] font-bold text-[15px] leading-none">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Dropdown UI */}
//                 {isNotifOpen && (
//                   <div className="absolute right-0 top-[45px] w-[320px] bg-white border border-[#ddd] rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-50 text-[#0F1111]">
//                     <div className="bg-[#f0f2f2] p-3 border-b border-[#ddd] flex justify-between items-center">
//                       <span className="font-bold text-[14px]">Notifications</span>
//                       <Link href="/account?tab=notifications" onClick={() => setIsNotifOpen(false)} className="text-[#007185] hover:text-[#c45500] hover:underline text-[12px]">View All</Link>
//                     </div>
                    
//                     <div className="max-h-[350px] overflow-y-auto">
//                       {notifications.length === 0 ? (
//                         <div className="p-6 text-center text-[13px] text-[#565959]">
//                           You have no new notifications.
//                         </div>
//                       ) : (
//                         notifications.map((notif) => (
//                           <div 
//                             key={notif._id} 
//                             onClick={() => markAsRead(notif._id, notif.link)}
//                             className={`p-3 border-b border-[#eee] cursor-pointer hover:bg-[#f7fafa] transition-colors flex gap-3 ${!notif.isRead ? 'bg-[#fdfdfd]' : ''}`}
//                           >
//                             <div className="text-xl shrink-0 mt-0.5">
//                               {notif.type === 'invoice' ? '📄' : notif.type === 'cancel' ? '❌' : notif.type === 'success' ? '✅' : '🔔'}
//                             </div>
//                             <div>
//                               <p className="text-[13px] font-bold text-[#0F1111] leading-tight mb-0.5">{notif.title}</p>
//                               <p className="text-[12px] text-[#565959] leading-snug">{notif.message}</p>
//                               <p className="text-[10px] text-[#a6a6a6] mt-1">{new Date(notif.createdAt).toLocaleDateString('en-IN')}</p>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <Link href="/login" className="flex flex-col items-start px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors leading-tight">
//               <p className="text-white text-[12px] m-0">Hello, sign in</p>
//               <p className="font-bold text-[14px] m-0">Account & Lists</p>
//             </Link>
//           )}
          
//           <Link href="/cart">
//             <button className="relative flex items-end px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors">
//               <div className="relative flex items-center">
//                 <span className="text-4xl">🛒</span>
//                 <span className="absolute top-[-4px] left-[14px] text-[#f08804] font-bold text-lg leading-none">
//                   {cartCount}
//                 </span>
//               </div>
//               <span className="font-bold text-[14px] mb-1 hidden lg:block">Cart</span>
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* MOBILE MENU DRAWER */}
//       <div className={`md:hidden absolute top-full left-0 w-full bg-[#232f3e] shadow-xl transition-all duration-300 overflow-hidden z-40 ${isMobileMenuOpen ? 'max-h-[600px] border-b border-white/10' : 'max-h-0 border-transparent'}`}>
//         <div className="p-4 space-y-2">
//           <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Home / Store</Link>
          
//           {/* 🚀 Mobile Account & Notifications */}
//           {user && (
//             <>
//               <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Your Account Details</Link>
//               <Link href="/account?tab=notifications" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10 flex justify-between">
//                 Notifications 
//                 {unreadCount > 0 && <span className="bg-[#f08804] text-[#111] px-2 py-0.5 rounded-full text-xs font-bold">{unreadCount} New</span>}
//               </Link>
//             </>
//           )}

//           <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Returns & Orders</Link>
//           <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Affiliate Wallet</Link>
          
//           {user ? (
//             <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-[#febd69] font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Sign Out</button>
//           ) : (
//             <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#febd69] font-bold p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Sign In</Link>
//           )}
          
//           {isAdmin && (
//             <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#febd69] font-bold p-3 hover:bg-white/10 rounded-md transition-colors">Admin Dashboard</Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
// src/components/Header.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🚀 Location & Modal States
  const [location, setLocation] = useState({ city: 'Select address', pincode: '' });
  const [showLocModal, setShowLocModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [manualPincode, setManualPincode] = useState('');
  const [locLoading, setLocLoading] = useState(false);

  // 🚀 Notification States
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const userId = user?.user?._id || user?._id;
  const isAdmin = user?.user?.role === 'admin' || user?.role === 'admin';

  // 🚀 FETCH USER DATA (ADDRESSES & NOTIFICATIONS)
  useEffect(() => {
    if (userId) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
        .then(res => {
          if (res.data.addresses?.length > 0) {
            setSavedAddresses(res.data.addresses);
            const addr = res.data.addresses[0];
            setLocation({ city: addr.city, pincode: addr.pincode });
          }
        }).catch(err => console.log("User data fetch failed"));

      const fetchNotifications = async () => {
        try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`);
          setNotifications(data);
        } catch (error) {
          console.log("Notifications endpoint not ready yet.");
        }
      };
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  // 🚀 ACTION: Detect Current Location
  const detectLiveLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const { data } = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const city = data.address.city || data.address.town || data.address.village || "Unknown";
        setLocation({ city, pincode: data.address.postcode || "" });
        setShowLocModal(false);
      } catch (err) {
        alert("Could not determine city name.");
      } finally {
        setLocLoading(false);
      }
    }, () => {
      alert("Permission denied.");
      setLocLoading(false);
    });
  };

  // 🚀 ACTION: Apply Manual Pincode
  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    if (manualPincode.length !== 6) return;
    setLocLoading(true);
    try {
      const { data } = await axios.get(`https://api.zippopotam.us/in/${manualPincode}`);
      setLocation({ city: data.places[0]['place name'], pincode: manualPincode });
      setShowLocModal(false);
    } catch (err) {
      alert("Invalid Pincode");
    } finally {
      setLocLoading(false);
    }
  };

  // Outside click listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); 
    }
  };

  const markAsRead = async (notifId, link) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}/read`);
      setNotifications(prev => prev.filter(n => n._id !== notifId));
    } catch (err) {}
    if (link) { setIsNotifOpen(false); router.push(link); }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Modernized Nav Item Style (Google Shapes + Amazon Dark Mode)
  const navItemStyle = "px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex flex-col cursor-pointer leading-tight text-white";

  return (
    <header className="bg-[#131921] text-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-3 lg:gap-6">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="md:hidden text-2xl text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
          <Link href="/">
            <h1 className="text-2xl font-medium tracking-tight text-white cursor-pointer px-2 py-1 rounded-lg hover:bg-white/10 transition-colors">
              amazon<span className="text-[#febd69] font-bold tracking-normal">smarts</span>
            </h1>
          </Link>
        </div>

        {/* 🚀 LOCATION TAB */}
        <div className={`${navItemStyle} hidden md:flex min-w-[140px] max-w-[180px]`} onClick={() => setShowLocModal(true)}>
          <div className="flex items-center gap-2">
             <span className="text-[20px]">📍</span>
             <div className="flex flex-col">
               <span className="text-[#ccc] text-[11px] font-medium">Delivering to {location.city}</span>
               <span className="font-semibold text-[13px] text-white truncate">{location.pincode ? `Update location ${location.pincode}` : 'Select your address'}</span>
             </div>
          </div>
        </div>
        
        {/* CENTER: SEARCH (Google Pill shape + Amazon Colors) */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center bg-white rounded-full h-[46px] transition-all duration-200 border-[3px] border-transparent focus-within:border-[#f90] overflow-hidden">
          <input type="text" placeholder="Search Amazon Smarts" className="w-full px-5 bg-transparent text-[#111] focus:outline-none font-medium text-[15px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] h-full px-6 flex items-center justify-center text-[#111] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </form>
        
        {/* RIGHT SIDE LINKS */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          <Link href={user ? "/account" : "/login"} className={navItemStyle}>
            <span className="text-[11px] font-medium text-[#ccc]">Hello, {user ? (user?.user?.name || user?.name?.split(' ')[0]) : 'sign in'}</span>
            <span className="font-semibold text-[14px] text-white">Account & Lists</span>
          </Link>
          
          <Link href="/orders" className={navItemStyle}>
            <span className="text-[11px] font-medium text-[#ccc]">Returns</span>
            <span className="font-semibold text-[14px] text-white">& Orders</span>
          </Link>

          <Link href="/wallet" className={navItemStyle}>
            <span className="text-[11px] font-medium text-[#ccc]">Affiliate</span>
            <span className="font-semibold text-[14px] text-white">Wallet</span>
          </Link>
          
          {isAdmin && (
            <Link href="/admin" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex flex-col cursor-pointer leading-tight">
              <span className="text-[11px] font-medium text-[#febd69]">Store</span>
              <span className="font-semibold text-[#febd69] text-[14px]">Admin</span>
            </Link>
          )}

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors h-[42px] w-[42px] ml-1">
              <span className="text-[22px]">🔔</span>
              {unreadCount > 0 && <span className="absolute top-1 right-1 bg-[#f08804] text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full border-2 border-[#131921]">{unreadCount}</span>}
            </button>
            {isNotifOpen && (
              <div className="absolute right-0 top-[50px] w-[340px] bg-white border border-[#ddd] rounded-2xl shadow-xl z-50 text-[#0F1111] overflow-hidden">
                <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd] flex justify-between items-center">
                  <span className="font-semibold text-[15px]">Notifications</span>
                  <Link href="/account?tab=notifications" onClick={() => setIsNotifOpen(false)} className="text-[#007185] hover:underline text-[13px] font-medium">View All</Link>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.length === 0 ? (<div className="p-8 text-center text-[14px] text-[#565959]">No new notifications.</div>) : (
                    notifications.map(notif => (
                      <div key={notif._id} onClick={() => markAsRead(notif._id, notif.link)} className="p-4 border-b border-[#eee] cursor-pointer hover:bg-[#f7fafa] flex gap-4 transition-colors">
                        <div className="text-2xl shrink-0 mt-1">{notif.type === 'invoice' ? '📄' : notif.type === 'cancel' ? '❌' : '🔔'}</div>
                        <div>
                          <p className="text-[14px] font-semibold text-[#0F1111] leading-snug">{notif.title}</p>
                          <p className="text-[13px] text-[#565959] mt-1">{notif.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link href="/cart" className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ml-2 cursor-pointer">
             <div className="relative flex items-center">
               <span className="text-[28px]">🛒</span>
               <span className="absolute -top-2 left-[14px] text-[#f08804] font-bold text-[16px] leading-none">{cartCount}</span>
             </div>
             <span className="font-semibold text-[14px] text-white ml-2 self-end mb-1 hidden lg:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* 🚀 LOCATION MODAL */}
      {showLocModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[300] text-[#111]">
          <div className="bg-white rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f3f3f3] p-5 flex justify-between items-center border-b border-[#ddd]">
              <h2 className="text-[18px] font-semibold">Choose your location</h2>
              <button onClick={() => setShowLocModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e3e3e3] text-gray-600 transition-colors">✕</button>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-[13px] text-[#565959]">Delivery options and speeds may vary for different locations</p>
              
              {user && savedAddresses.length > 0 && (
                <div className="space-y-3">
                   <p className="text-[14px] font-semibold border-b pb-2">Your saved addresses</p>
                   <div className="max-h-[160px] overflow-y-auto space-y-2 pr-2">
                     {savedAddresses.map((addr, index) => (
                       <button key={index} onClick={() => { setLocation({ city: addr.city, pincode: addr.pincode }); setShowLocModal(false); }} className="w-full text-left p-3 border border-[#ddd] rounded-xl hover:bg-[#f3f3f3] transition-all">
                         <p className="text-[14px] font-semibold">{addr.street}</p>
                         <p className="text-[13px] text-[#565959] mt-1">{addr.city}, {addr.pincode}</p>
                       </button>
                     ))}
                   </div>
                </div>
              )}

              <div>
                <p className="text-[14px] font-semibold mb-3">Or enter an Indian pincode</p>
                <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                  <input type="text" maxLength="6" className="flex-1 bg-white border border-[#888C8C] rounded-xl px-4 py-2.5 text-[14px] outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] transition-all" placeholder="Enter Pincode" value={manualPincode} onChange={e => setManualPincode(e.target.value.replace(/\D/g, ''))} />
                  <button type="submit" className="bg-white border border-[#D5D9D9] text-[#111] font-medium px-5 py-2.5 rounded-xl text-[14px] shadow-sm hover:bg-[#F7FAFA] transition-colors">Apply</button>
                </form>
              </div>

              <div className="border-t pt-4">
                 <button onClick={detectLiveLocation} disabled={locLoading} className="w-full flex items-center justify-center gap-2 bg-transparent text-[#007185] font-medium text-[14px] py-2 rounded-xl hover:text-[#C45500] hover:bg-gray-50 transition-colors">
                   {locLoading ? 'Detecting...' : 'Use my current location'}
                 </button>
              </div>
            </div>
            {!user && (
              <div className="bg-[#f3f3f3] p-5 border-t border-[#ddd]">
                <Link href="/login" onClick={() => setShowLocModal(false)} className="block">
                  <button className="bg-[#FFD814] border border-[#FCD200] text-[#111] w-full py-2.5 rounded-xl text-[14px] font-semibold shadow-sm hover:bg-[#F7CA00] transition-colors">Sign in to see your addresses</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#232f3e] shadow-lg transition-all duration-300 overflow-hidden z-40 ${isMobileMenuOpen ? 'max-h-[600px] border-b border-white/10' : 'max-h-0'}`}>
        <div className="p-4 space-y-1">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 rounded-lg hover:bg-white/10">Home</Link>
          <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 rounded-lg hover:bg-white/10">Orders</Link>
          <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 rounded-lg hover:bg-white/10">Wallet</Link>
          {user ? (
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-[#febd69] p-3 rounded-lg hover:bg-white/10">Sign Out</button>
          ) : (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#febd69] font-medium p-3 rounded-lg hover:bg-white/10">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}