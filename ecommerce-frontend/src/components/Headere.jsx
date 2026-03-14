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


// src/components/Header.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 🚀 Added router
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // 🚀 Added state

  // 🚀 SEARCH HANDLER
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to homepage with the search query in the URL
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); // Close mobile menu if it was open
    }
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-[1600px] mx-auto p-4 flex justify-between items-center gap-4">
        
        {/* Left: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-2xl text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
          <Link href="/">
            <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer drop-shadow-md hover:scale-105 transition-transform">
              AMAZON<span className="text-white">SMARTS</span>
            </h1>
          </Link>
        </div>
        
        {/* Center: Global Search Bar (Wrapped in form for 'Enter' key support) */}
        <form onSubmit={handleSearch} className="hidden md:flex w-full max-w-2xl shadow-inner rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-all duration-300 mx-8">
          <input 
            type="text" 
            placeholder="Search for iPhone, MacBooks, audio..." 
            className="w-full p-2.5 px-4 text-gray-900 focus:outline-none font-medium bg-white" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-orange-500 px-8 font-bold text-white hover:bg-orange-600 transition-colors">Search</button>
        </form>
        
        {/* Right: User Menu & Cart */}
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <div className="hidden md:flex flex-col items-start border-r border-slate-700 pr-6">
              <p className="text-gray-400 font-medium text-xs mb-0.5">
                Welcome, <span className="font-bold text-white tracking-wide">{user?.user?.name || user?.name?.split(' ')[0]}</span>
              </p>
              <div className="flex gap-4">
                <Link href="/orders" className="font-bold text-slate-300 hover:text-white text-[10px] tracking-widest transition-colors">ORDERS</Link>
                <Link href="/wallet" className="font-bold text-slate-300 hover:text-white text-[10px] tracking-widest transition-colors">WALLET</Link>
                {(user?.user?.role === 'admin' || user?.role === 'admin') && (
                  <Link href="/admin" className="font-bold text-orange-400 hover:text-orange-300 text-[10px] tracking-widest transition-colors">ADMIN</Link>
                )}
                <button onClick={logout} className="font-bold text-red-400 hover:text-red-300 text-[10px] tracking-widest transition-colors">LOGOUT</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block text-sm cursor-pointer group border-r border-slate-700 pr-6">
              <p className="text-gray-400 text-xs group-hover:text-white transition-colors">Hello, Sign in</p>
              <p className="font-bold tracking-wide group-hover:text-orange-400 transition-colors">Account & Lists</p>
            </Link>
          )}
          
          <Link href="/cart">
            <button className="relative font-bold flex items-center justify-center p-2 hover:bg-slate-800 rounded-full transition-colors group">
              <span className="text-2xl group-hover:scale-110 transition-transform">🛒</span>
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-black border-2 border-slate-900 shadow-sm">
                {cartCount}
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div className={`md:hidden sticky top-full left-0 w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] border-b border-white/10' : 'max-h-0 border-transparent'}`}>
        <div className="p-4 space-y-4">
          <form onSubmit={handleSearch} className="flex shadow-inner rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
            <input 
              type="text" 
              placeholder="Search gadgets..." 
              className="w-full p-3 text-gray-900 focus:outline-none font-medium bg-white text-sm" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-orange-500 px-4 font-bold text-white">🔍</button>
          </form>
          
          <div className="grid grid-cols-2 gap-2 text-sm font-bold uppercase tracking-widest">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Store</Link>
            <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Orders</Link>
            <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 p-4 rounded-xl text-center hover:bg-slate-700 transition-colors">Wallet</Link>
            
            {user ? (
               <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="bg-red-500/10 text-red-400 p-4 rounded-xl text-center hover:bg-red-500/20 transition-colors">Logout</button>
            ) : (
               <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-orange-500 text-white p-4 rounded-xl text-center hover:bg-orange-600 transition-colors">Login</Link>
            )}
            
            {(user?.user?.role === 'admin' || user?.role === 'admin') && (
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 p-4 rounded-xl text-center hover:bg-orange-500/20 transition-colors">Admin Dashboard</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}