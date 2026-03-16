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
  
  // 🚀 Notification States
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const userId = user?.user?._id || user?._id;
  const isAdmin = user?.user?.role === 'admin' || user?.role === 'admin';

  // 🚀 FETCH NOTIFICATIONS
  useEffect(() => {
    if (userId) {
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

  // Handle clicking outside the notification dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
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
    if (link) {
      setIsNotifOpen(false);
      router.push(link);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-[#131921] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Top Row for Mobile / Left Side for Desktop */}
        <div className="flex justify-between items-center w-full md:w-auto gap-4">
          <div className="flex items-center gap-2">
            <button 
              className="md:hidden text-2xl text-white hover:text-gray-300 p-1 border border-transparent hover:border-white rounded-[3px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
            <Link href="/">
              <h1 className="text-2xl font-normal tracking-tighter text-white cursor-pointer px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors mt-1">
                amazon<span className="text-[#febd69] font-bold tracking-normal">smarts</span>
              </h1>
            </Link>
          </div>

          {/* Mobile Cart Icon */}
          <Link href="/cart" className="md:hidden">
            <button className="relative flex items-center p-2 border border-transparent hover:border-white rounded-[3px] transition-colors">
              <span className="text-3xl">🛒</span>
              <span className="absolute top-0 right-0 text-[#f08804] font-bold text-lg leading-none">
                {cartCount}
              </span>
            </button>
          </Link>
        </div>
        
        {/* Center: Global Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full md:max-w-3xl rounded-[4px] overflow-hidden focus-within:ring-2 focus-within:ring-[#f90] transition-all">
          <input 
            type="text" 
            placeholder="Search Amazon Smarts" 
            className="w-full p-2.5 px-4 text-[#111] focus:outline-none font-medium bg-white text-[15px]" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-6 text-[#111] transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
        
        {/* Right: User Menu & Cart (Desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              {/* Account Link */}
              <Link href="/account" className="px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors flex flex-col leading-tight">
                <p className="text-white text-[12px] m-0">
                  Hello, {user?.user?.name || user?.name?.split(' ')[0]}
                </p>
                <p className="font-bold text-[14px] m-0">Account & Lists</p>
              </Link>
              
              {/* Orders Link */}
              <Link href="/orders" className="px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors flex flex-col leading-tight">
                <span className="text-[12px] m-0">Returns</span>
                <span className="font-bold text-[14px] m-0">& Orders</span>
              </Link>

              {/* 🚀 RESTORED: Wallet Link */}
              <Link href="/wallet" className="px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors flex flex-col leading-tight">
                <span className="text-[12px] m-0">Affiliate</span>
                <span className="font-bold text-[14px] m-0">Wallet</span>
              </Link>
              
              {isAdmin && (
                <Link href="/admin" className="px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors flex flex-col leading-tight">
                  <span className="text-[12px] text-[#febd69] m-0">Store</span>
                  <span className="font-bold text-[#febd69] text-[14px] m-0">Admin</span>
                </Link>
              )}

              {/* Notification Bell */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)} 
                  className="relative flex items-center justify-center px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors h-full"
                >
                  <span className="text-2xl relative top-0.5">🔔</span>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-1 text-[#f08804] font-bold text-[15px] leading-none">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown UI */}
                {isNotifOpen && (
                  <div className="absolute right-0 top-[45px] w-[320px] bg-white border border-[#ddd] rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-50 text-[#0F1111]">
                    <div className="bg-[#f0f2f2] p-3 border-b border-[#ddd] flex justify-between items-center">
                      <span className="font-bold text-[14px]">Notifications</span>
                      <Link href="/account?tab=notifications" onClick={() => setIsNotifOpen(false)} className="text-[#007185] hover:text-[#c45500] hover:underline text-[12px]">View All</Link>
                    </div>
                    
                    <div className="max-h-[350px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-[13px] text-[#565959]">
                          You have no new notifications.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif._id} 
                            onClick={() => markAsRead(notif._id, notif.link)}
                            className={`p-3 border-b border-[#eee] cursor-pointer hover:bg-[#f7fafa] transition-colors flex gap-3 ${!notif.isRead ? 'bg-[#fdfdfd]' : ''}`}
                          >
                            <div className="text-xl shrink-0 mt-0.5">
                              {notif.type === 'invoice' ? '📄' : notif.type === 'cancel' ? '❌' : notif.type === 'success' ? '✅' : '🔔'}
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-[#0F1111] leading-tight mb-0.5">{notif.title}</p>
                              <p className="text-[12px] text-[#565959] leading-snug">{notif.message}</p>
                              <p className="text-[10px] text-[#a6a6a6] mt-1">{new Date(notif.createdAt).toLocaleDateString('en-IN')}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/login" className="flex flex-col items-start px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors leading-tight">
              <p className="text-white text-[12px] m-0">Hello, sign in</p>
              <p className="font-bold text-[14px] m-0">Account & Lists</p>
            </Link>
          )}
          
          <Link href="/cart">
            <button className="relative flex items-end px-2 py-1 border border-transparent hover:border-white rounded-[3px] transition-colors">
              <div className="relative flex items-center">
                <span className="text-4xl">🛒</span>
                <span className="absolute top-[-4px] left-[14px] text-[#f08804] font-bold text-lg leading-none">
                  {cartCount}
                </span>
              </div>
              <span className="font-bold text-[14px] mb-1 hidden lg:block">Cart</span>
            </button>
          </Link>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#232f3e] shadow-xl transition-all duration-300 overflow-hidden z-40 ${isMobileMenuOpen ? 'max-h-[600px] border-b border-white/10' : 'max-h-0 border-transparent'}`}>
        <div className="p-4 space-y-2">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Home / Store</Link>
          
          {user && (
            <>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Your Account Details</Link>
              <Link href="/account?tab=notifications" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10 flex justify-between">
                Notifications 
                {unreadCount > 0 && <span className="bg-[#f08804] text-[#111] px-2 py-0.5 rounded-full text-xs font-bold">{unreadCount} New</span>}
              </Link>
            </>
          )}

          <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Returns & Orders</Link>
          <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Affiliate Wallet</Link>
          
          {user ? (
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-[#febd69] font-medium p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Sign Out</button>
          ) : (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#febd69] font-bold p-3 hover:bg-white/10 rounded-md transition-colors border-b border-white/10">Sign In</Link>
          )}
          
          {isAdmin && (
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#febd69] font-bold p-3 hover:bg-white/10 rounded-md transition-colors">Admin Dashboard</Link>
          )}
        </div>
      </div>
    </header>
  );
}