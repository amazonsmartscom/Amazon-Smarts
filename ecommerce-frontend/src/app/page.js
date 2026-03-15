// // src/app/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';

// export default function AdvancedStoreDashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart, cartCount } = useCart();
//   const { user, logout } = useAuth();

//   // 🚀 NEW FILTER STATES
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000); // Default max price slider

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get('${process.env.NEXT_PUBLIC_API_URL}/products');
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // --- DYNAMIC INVENTORY LISTS ---
//   // Automatically extract unique categories and brands from your actual database
//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   // --- 🚀 THE FILTERING ENGINE ---
//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const currentPrice = product.discountPrice || product.price;
//     const matchPrice = currentPrice <= maxPrice;
    
//     return matchCategory && matchBrand && matchPrice;
//   });

//   // Top Deals & Best Sellers (Using the already filtered list so they update too!)
//   const discountedProducts = filteredProducts.filter(p => p.discountPrice && p.discountPrice < p.price);
//   const bestSellers = filteredProducts.filter(p => p.isBestSeller);

//   // --- REUSABLE PRODUCT CARD COMPONENT ---
//   const ProductCard = ({ product }) => (
//     <div className="min-w-[260px] max-w-[300px] w-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 flex flex-col relative group flex-shrink-0">
//       <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
//         {product.isBestSeller && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">#1 Best Seller</span>}
//         {product.discountPrice && (
//           <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
//             {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
//           </span>
//         )}
//       </div>

//       <Link href={`/product/${product._id}`}>
//         <div className="h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center cursor-pointer p-2">
//           <img src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/400x400'} alt={product.name} className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500" />
//         </div>
//       </Link>

//       <div className="flex-1 flex flex-col">
//         <Link href={`/product/${product._id}`}>
//           <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors cursor-pointer">{product.name}</h3>
//         </Link>
//         <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{product.brand || 'Generic'}</p>
        
//         <div className="flex items-center gap-1 mb-2 mt-auto">
//           <span className="text-yellow-400 text-xs">★★★★★</span>
//           <span className="text-blue-500 text-[10px] hover:underline cursor-pointer">{product.ratings || '4.5'}</span>
//         </div>

//         <div className="pt-3 border-t border-gray-50">
//           <div className="flex items-baseline gap-2 mb-3">
//             <span className="text-xl font-black text-gray-900">₹{product.discountPrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}</span>
//             {product.discountPrice && <span className="text-xs line-through text-gray-400 font-medium">₹{product.price.toLocaleString('en-IN')}</span>}
//           </div>
          
//           <button onClick={() => { addToCart(product); alert('Added to cart!'); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg shadow-sm transition-colors text-sm flex justify-center items-center gap-2">
//             🛒 Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
//       {/* 1. MAIN NAVBAR */}
//       <nav className="bg-slate-900 p-4 text-white flex flex-col md:flex-row justify-between items-center shadow-md gap-4 sticky top-0 z-50">
//         <div className="flex items-center gap-4 w-full md:w-auto">
//           <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer">GADGET<span className="text-white">STORE</span></h1>
//         </div>
//         <div className="w-full md:w-1/2 flex shadow-sm">
//           <input type="text" placeholder="Search for iPhone, MacBooks, audio..." className="w-full p-2.5 rounded-l-md text-black focus:outline-none font-medium" />
//           <button className="bg-orange-500 px-8 font-bold text-white rounded-r-md hover:bg-orange-600 transition">Search</button>
//         </div>
//         <div className="flex space-x-6 items-center w-full md:w-auto justify-end">
//           {user ? (
//             <div className="text-sm flex flex-col items-start">
//               <p className="text-gray-300 font-medium">Hello, <span className="font-bold text-white">{user.user.name}</span></p>
//               <div className="flex gap-3 mt-0.5">
//                 {/* 🚀 ADDED THE ORDERS LINK HERE: */}
//                 <Link href="/orders" className="font-bold text-blue-400 hover:text-blue-300 text-xs tracking-wide">📦 ORDERS</Link>
                
//                 <Link href="/wallet" className="font-bold text-green-400 hover:text-green-300 text-xs tracking-wide">💳 WALLET</Link>
//                 <button onClick={logout} className="font-bold text-red-400 hover:text-red-300 text-xs">LOGOUT</button>
//               </div>
//             </div>
//           ) : (
//             <Link href="/login" className="text-sm cursor-pointer hover:opacity-80 transition"><p className="text-gray-300 text-xs">Hello, Sign in</p><p className="font-bold">Account & Lists</p></Link>
//           )}
//           <Link href="/cart">
//             <button className="font-bold flex items-center gap-1.5 text-lg hover:text-orange-400 transition-colors">
//               🛒 <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* 2. MAIN LAYOUT WITH 🚀 WORKING FILTER SIDEBAR */}
//       <div className="flex max-w-[1600px] mx-auto p-4 gap-6 mt-4">
        
//         {/* SIDEBAR */}
//         <aside className="hidden lg:block w-72 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
//           <h2 className="text-xl font-black border-b pb-4 mb-6">Filter Gadgets</h2>
          
//           {/* Category Filter */}
//           <div className="mb-8">
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Categories</h3>
//             <ul className="space-y-2">
//               {uniqueCategories.map(cat => (
//                 <li 
//                   key={cat} 
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`cursor-pointer text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
//                 >
//                   {cat}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Brand Filter */}
//           <div className="mb-8">
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Brands</h3>
//             <ul className="space-y-2">
//               {uniqueBrands.map(brand => (
//                 <li 
//                   key={brand} 
//                   onClick={() => setSelectedBrand(brand)}
//                   className={`cursor-pointer text-sm font-medium transition-colors ${selectedBrand === brand ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
//                 >
//                   {brand}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Price Range Filter */}
//           <div>
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h3>
//             <input 
//               type="range" 
//               min="1000" 
//               max="200000" 
//               step="1000"
//               value={maxPrice} 
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="w-full accent-orange-500 cursor-pointer" 
//             />
//             <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
//               <span>₹1,000</span>
//               <span>₹2,00,000</span>
//             </div>
//           </div>
          
//           {/* Reset Filters Button */}
//           <button 
//             onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }}
//             className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded transition-colors text-sm"
//           >
//             Clear All Filters
//           </button>
//         </aside>

//         {/* 3. PRODUCT GRID */}
//         <main className="flex-1 w-full overflow-hidden">
          
//           {/* Hero Banner (Only show if no filters are applied to save space) */}
//           {selectedCategory === 'All' && selectedBrand === 'All' && maxPrice === 200000 && (
//             <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-white flex flex-col justify-center shadow-lg relative overflow-hidden h-[250px] md:h-[300px] mb-10">
//               <div className="relative z-10">
//                 <span className="bg-orange-500 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Mega Sale</span>
//                 <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Next-Gen Power.<br/>Unbeatable Prices.</h2>
//               </div>
//               <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div></div>
//           ) : filteredProducts.length === 0 ? (
//              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
//                <h3 className="text-2xl font-bold text-gray-800 mb-2">No gadgets found</h3>
//                <p className="text-gray-500">Try adjusting your filters or price range.</p>
//              </div>
//           ) : (
//             <div className="space-y-12">
              
//               {/* Top Deals */}
//               {discountedProducts.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">🔥 Top Deals Today</h2>
//                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
//                     {discountedProducts.map(product => <ProductCard key={product._id} product={product} />)}
//                   </div>
//                 </section>
//               )}

//               {/* Best Sellers */}
//               {bestSellers.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">⭐ Best Sellers</h2>
//                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
//                     {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
//                   </div>
//                 </section>
//               )}

//               {/* All Filtered Products Grid */}
//               <section>
//                 <div className="flex justify-between items-center mb-6 border-b pb-2">
//                   <h2 className="text-2xl font-black text-slate-900">
//                     {selectedCategory === 'All' ? '📱 Explore All' : `📱 ${selectedCategory}`}
//                   </h2>
//                   <span className="text-sm font-bold text-gray-500 bg-white px-3 py-1 rounded border shadow-sm">
//                     {filteredProducts.length} Results
//                   </span>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {filteredProducts.map(product => <ProductCard key={`grid-${product._id}`} product={product} />)}
//                 </div>
//               </section>

//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


// // src/app/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';

// export default function AdvancedStoreDashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart, cartCount } = useCart();
//   const { user, logout } = useAuth();

//   // 🚀 NEW FILTER STATES
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000); // Default max price slider

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // --- DYNAMIC INVENTORY LISTS ---
//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   // --- 🚀 THE FILTERING ENGINE ---
//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const currentPrice = product.discountPrice || product.price;
//     const matchPrice = currentPrice <= maxPrice;
    
//     return matchCategory && matchBrand && matchPrice;
//   });

//   // Top Deals & Best Sellers 
//   const discountedProducts = filteredProducts.filter(p => p.discountPrice && p.discountPrice < p.price);
//   const bestSellers = filteredProducts.filter(p => p.isBestSeller);

//   // --- REUSABLE PRODUCT CARD COMPONENT ---
//   const ProductCard = ({ product }) => (
//     <div className="min-w-[260px] max-w-[300px] w-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 flex flex-col relative group flex-shrink-0">
//       <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
//         {product.isBestSeller && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">#1 Best Seller</span>}
//         {product.discountPrice && (
//           <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
//             {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
//           </span>
//         )}
//       </div>

//       <Link href={`/product/${product._id}`}>
//         <div className="h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center cursor-pointer p-2">
//           <img src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/400x400'} alt={product.name} className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500" />
//         </div>
//       </Link>

//       <div className="flex-1 flex flex-col">
//         <Link href={`/product/${product._id}`}>
//           <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors cursor-pointer">{product.name}</h3>
//         </Link>
//         <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{product.brand || 'Generic'}</p>
        
//         <div className="flex items-center gap-1 mb-2 mt-auto">
//           <span className="text-yellow-400 text-xs">★★★★★</span>
//           <span className="text-blue-500 text-[10px] hover:underline cursor-pointer">{product.ratings || '4.5'}</span>
//         </div>

//         <div className="pt-3 border-t border-gray-50">
//           <div className="flex items-baseline gap-2 mb-3">
//             <span className="text-xl font-black text-gray-900">₹{product.discountPrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}</span>
//             {product.discountPrice && <span className="text-xs line-through text-gray-400 font-medium">₹{product.price.toLocaleString('en-IN')}</span>}
//           </div>
          
//           <button onClick={() => { addToCart(product); alert('Added to cart!'); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg shadow-sm transition-colors text-sm flex justify-center items-center gap-2">
//             🛒 Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
//       {/* 1. MAIN NAVBAR */}
//       <nav className="bg-slate-900 p-4 text-white flex flex-col md:flex-row justify-between items-center shadow-md gap-4 sticky top-0 z-50">
//         <div className="flex items-center gap-4 w-full md:w-auto">
//           <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer">GADGET<span className="text-white">STORE</span></h1>
//         </div>
//         <div className="w-full md:w-1/2 flex shadow-sm">
//           <input type="text" placeholder="Search for iPhone, MacBooks, audio..." className="w-full p-2.5 rounded-l-md text-black focus:outline-none font-medium" />
//           <button className="bg-orange-500 px-8 font-bold text-white rounded-r-md hover:bg-orange-600 transition">Search</button>
//         </div>
        
//         <div className="flex space-x-6 items-center w-full md:w-auto justify-end">
//           {user ? (
//             <div className="text-sm flex flex-col items-start">
              
//               {/* 🚀 CRASH FIX: Safe user name rendering */}
//               <p className="text-gray-300 font-medium">
//                 Hello, <span className="font-bold text-white">{user?.user?.name || user?.name || 'User'}</span>
//               </p>
              
//               <div className="flex gap-3 mt-0.5">
//                 <Link href="/orders" className="font-bold text-blue-400 hover:text-blue-300 text-xs tracking-wide">📦 ORDERS</Link>
//                 <Link href="/wallet" className="font-bold text-green-400 hover:text-green-300 text-xs tracking-wide">💳 WALLET</Link>
                
//                 {/* 🚀 NEW: Shows Admin link ONLY if the user is an admin */}
//                 {(user?.user?.role === 'admin' || user?.role === 'admin') && (
//                   <Link href="/admin" className="font-bold text-orange-400 hover:text-orange-300 text-xs tracking-wide">⚙️ ADMIN</Link>
//                 )}

//                 <button onClick={logout} className="font-bold text-red-400 hover:text-red-300 text-xs">LOGOUT</button>
//               </div>
//             </div>
//           ) : (
//             <Link href="/login" className="text-sm cursor-pointer hover:opacity-80 transition">
//               <p className="text-gray-300 text-xs">Hello, Sign in</p>
//               <p className="font-bold">Account & Lists</p>
//             </Link>
//           )}
          
//           <Link href="/cart">
//             <button className="font-bold flex items-center gap-1.5 text-lg hover:text-orange-400 transition-colors">
//               🛒 <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* 2. MAIN LAYOUT WITH FILTER SIDEBAR */}
//       <div className="flex max-w-[1600px] mx-auto p-4 gap-6 mt-4">
        
//         <aside className="hidden lg:block w-72 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
//           <h2 className="text-xl font-black border-b pb-4 mb-6">Filter Gadgets</h2>
          
//           <div className="mb-8">
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Categories</h3>
//             <ul className="space-y-2">
//               {uniqueCategories.map(cat => (
//                 <li 
//                   key={cat} 
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`cursor-pointer text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
//                 >
//                   {cat}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-8">
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Brands</h3>
//             <ul className="space-y-2">
//               {uniqueBrands.map(brand => (
//                 <li 
//                   key={brand} 
//                   onClick={() => setSelectedBrand(brand)}
//                   className={`cursor-pointer text-sm font-medium transition-colors ${selectedBrand === brand ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
//                 >
//                   {brand}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h3>
//             <input 
//               type="range" 
//               min="1000" 
//               max="200000" 
//               step="1000"
//               value={maxPrice} 
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="w-full accent-orange-500 cursor-pointer" 
//             />
//             <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
//               <span>₹1,000</span>
//               <span>₹2,00,000</span>
//             </div>
//           </div>
          
//           <button 
//             onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }}
//             className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded transition-colors text-sm"
//           >
//             Clear All Filters
//           </button>
//         </aside>

//         {/* 3. PRODUCT GRID */}
//         <main className="flex-1 w-full overflow-hidden">
          
//           {selectedCategory === 'All' && selectedBrand === 'All' && maxPrice === 200000 && (
//             <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-white flex flex-col justify-center shadow-lg relative overflow-hidden h-[250px] md:h-[300px] mb-10">
//               <div className="relative z-10">
//                 <span className="bg-orange-500 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Mega Sale</span>
//                 <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Next-Gen Power.<br/>Unbeatable Prices.</h2>
//               </div>
//               <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div></div>
//           ) : filteredProducts.length === 0 ? (
//              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
//                <h3 className="text-2xl font-bold text-gray-800 mb-2">No gadgets found</h3>
//                <p className="text-gray-500">Try adjusting your filters or price range.</p>
//              </div>
//           ) : (
//             <div className="space-y-12">
              
//               {discountedProducts.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">🔥 Top Deals Today</h2>
//                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
//                     {discountedProducts.map(product => <ProductCard key={product._id} product={product} />)}
//                   </div>
//                 </section>
//               )}

//               {bestSellers.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">⭐ Best Sellers</h2>
//                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
//                     {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
//                   </div>
//                 </section>
//               )}

//               <section>
//                 <div className="flex justify-between items-center mb-6 border-b pb-2">
//                   <h2 className="text-2xl font-black text-slate-900">
//                     {selectedCategory === 'All' ? '📱 Explore All' : `📱 ${selectedCategory}`}
//                   </h2>
//                   <span className="text-sm font-bold text-gray-500 bg-white px-3 py-1 rounded border shadow-sm">
//                     {filteredProducts.length} Results
//                   </span>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {filteredProducts.map(product => <ProductCard key={`grid-${product._id}`} product={product} />)}
//                 </div>
//               </section>

//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


// // src/app/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';

// export default function AdvancedStoreDashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart, cartCount } = useCart();
//   const { user, logout } = useAuth();

//   // 🚀 FILTER STATES
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000);

//   // 🚀 HELPER TO FIX BROKEN IMAGE URLS
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
    
//     // If it's already a full URL (like from Cloudinary or an old localhost link), handle it
//     if (imagePath.startsWith('http')) {
//         // Strip old localhost if it exists in the string to force it to use the new Render URL
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL.replace('/api', ''));
//     }
    
//     // Construct the full Render URL by removing /api from the end of the environment variable
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // --- DYNAMIC INVENTORY LISTS ---
//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   // --- 🚀 THE FILTERING ENGINE ---
//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const currentPrice = product.discountPrice || product.price;
//     const matchPrice = currentPrice <= maxPrice;
    
//     return matchCategory && matchBrand && matchPrice;
//   });

//   // Top Deals & Best Sellers 
//   const discountedProducts = filteredProducts.filter(p => p.discountPrice && p.discountPrice < p.price);
//   const bestSellers = filteredProducts.filter(p => p.isBestSeller);

//   // --- REUSABLE PRODUCT CARD COMPONENT ---
//   const ProductCard = ({ product }) => (
//     <div className="min-w-[260px] max-w-[300px] w-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 flex flex-col relative group flex-shrink-0">
//       <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
//         {product.isBestSeller && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">#1 Best Seller</span>}
//         {product.discountPrice && (
//           <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
//             {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
//           </span>
//         )}
//       </div>

//       <Link href={`/product/${product._id}`}>
//         <div className="h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center cursor-pointer p-2">
//           {/* 🚀 FIXED: Wrapped image src with getImageUrl helper */}
//           <img 
//             src={getImageUrl(product.images && product.images.length > 0 ? product.images[0] : null)} 
//             alt={product.name} 
//             className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500" 
//           />
//         </div>
//       </Link>

//       <div className="flex-1 flex flex-col">
//         <Link href={`/product/${product._id}`}>
//           <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors cursor-pointer">{product.name}</h3>
//         </Link>
//         <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{product.brand || 'Generic'}</p>
        
//         <div className="flex items-center gap-1 mb-2 mt-auto">
//           <span className="text-yellow-400 text-xs">★★★★★</span>
//           <span className="text-blue-500 text-[10px] hover:underline cursor-pointer">{product.ratings || '4.5'}</span>
//         </div>

//         <div className="pt-3 border-t border-gray-50">
//           <div className="flex items-baseline gap-2 mb-3">
//             <span className="text-xl font-black text-gray-900">₹{product.discountPrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}</span>
//             {product.discountPrice && <span className="text-xs line-through text-gray-400 font-medium">₹{product.price.toLocaleString('en-IN')}</span>}
//           </div>
          
//           <button onClick={() => { addToCart(product); alert(`${product.name} added to cart!`); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg shadow-sm transition-colors text-sm flex justify-center items-center gap-2">
//             🛒 Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
//       {/* 1. MAIN NAVBAR */}
//       <nav className="bg-slate-900 p-4 text-white flex flex-col md:flex-row justify-between items-center shadow-md gap-4 sticky top-0 z-50">
//         <div className="flex items-center gap-4 w-full md:w-auto">
//           <Link href="/">
//             <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer">GADGET<span className="text-white">STORE</span></h1>
//           </Link>
//         </div>
//         <div className="w-full md:w-1/2 flex shadow-sm">
//           <input type="text" placeholder="Search for iPhone, MacBooks, audio..." className="w-full p-2.5 rounded-l-md text-black focus:outline-none font-medium" />
//           <button className="bg-orange-500 px-8 font-bold text-white rounded-r-md hover:bg-orange-600 transition">Search</button>
//         </div>
        
//         <div className="flex space-x-6 items-center w-full md:w-auto justify-end">
//           {user ? (
//             <div className="text-sm flex flex-col items-start">
//               <p className="text-gray-300 font-medium">
//                 Hello, <span className="font-bold text-white">{user?.user?.name || user?.name || 'User'}</span>
//               </p>
              
//               <div className="flex gap-3 mt-0.5">
//                 <Link href="/orders" className="font-bold text-blue-400 hover:text-blue-300 text-xs tracking-wide">📦 ORDERS</Link>
//                 <Link href="/wallet" className="font-bold text-green-400 hover:text-green-300 text-xs tracking-wide">💳 WALLET</Link>
                
//                 {/* 🚀 ADMIN ROLE CHECK */}
//                 {(user?.user?.role === 'admin' || user?.role === 'admin') && (
//                   <Link href="/admin" className="font-bold text-orange-400 hover:text-orange-300 text-xs tracking-wide">⚙️ ADMIN</Link>
//                 )}

//                 <button onClick={logout} className="font-bold text-red-400 hover:text-red-300 text-xs uppercase">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <Link href="/login" className="text-sm cursor-pointer hover:opacity-80 transition">
//               <p className="text-gray-300 text-xs">Hello, Sign in</p>
//               <p className="font-bold">Account & Lists</p>
//             </Link>
//           )}
          
//           <Link href="/cart">
//             <button className="font-bold flex items-center gap-1.5 text-lg hover:text-orange-400 transition-colors">
//               🛒 <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-black">{cartCount}</span>
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* 2. MAIN LAYOUT WITH FILTER SIDEBAR */}
//       <div className="flex max-w-[1600px] mx-auto p-4 gap-6 mt-4">
        
//         <aside className="hidden lg:block w-72 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
//           <h2 className="text-xl font-black border-b pb-4 mb-6">Filter Gadgets</h2>
          
//           <div className="mb-8">
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Categories</h3>
//             <ul className="space-y-2">
//               {uniqueCategories.map(cat => (
//                 <li 
//                   key={cat} 
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`cursor-pointer text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
//                 >
//                   {cat}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-8">
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Brands</h3>
//             <ul className="space-y-2">
//               {uniqueBrands.map(brand => (
//                 <li 
//                   key={brand} 
//                   onClick={() => setSelectedBrand(brand)}
//                   className={`cursor-pointer text-sm font-medium transition-colors ${selectedBrand === brand ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
//                 >
//                   {brand}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h3>
//             <input 
//               type="range" 
//               min="1000" 
//               max="200000" 
//               step="1000"
//               value={maxPrice} 
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="w-full accent-orange-500 cursor-pointer" 
//             />
//             <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
//               <span>₹1,000</span>
//               <span>₹2,00,000</span>
//             </div>
//           </div>
          
//           <button 
//             onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }}
//             className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded transition-colors text-sm"
//           >
//             Clear All Filters
//           </button>
//         </aside>

//         {/* 3. PRODUCT GRID */}
//         <main className="flex-1 w-full overflow-hidden">
          
//           {selectedCategory === 'All' && selectedBrand === 'All' && maxPrice === 200000 && (
//             <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-white flex flex-col justify-center shadow-lg relative overflow-hidden h-[250px] md:h-[300px] mb-10">
//               <div className="relative z-10">
//                 <span className="bg-orange-500 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Mega Sale</span>
//                 <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Next-Gen Power.<br/>Unbeatable Prices.</h2>
//               </div>
//               <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div></div>
//           ) : filteredProducts.length === 0 ? (
//              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
//                <h3 className="text-2xl font-bold text-gray-800 mb-2">No gadgets found</h3>
//                <p className="text-gray-500">Try adjusting your filters or price range.</p>
//              </div>
//           ) : (
//             <div className="space-y-12">
              
//               {discountedProducts.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">🔥 Top Deals Today</h2>
//                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
//                     {discountedProducts.map(product => <ProductCard key={product._id} product={product} />)}
//                   </div>
//                 </section>
//               )}

//               {bestSellers.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">⭐ Best Sellers</h2>
//                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
//                     {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
//                   </div>
//                 </section>
//               )}

//               <section>
//                 <div className="flex justify-between items-center mb-6 border-b pb-2">
//                   <h2 className="text-2xl font-black text-slate-900">
//                     {selectedCategory === 'All' ? '📱 Explore All' : `📱 ${selectedCategory}`}
//                   </h2>
//                   <span className="text-sm font-bold text-gray-500 bg-white px-3 py-1 rounded border shadow-sm">
//                     {filteredProducts.length} Results
//                   </span>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {filteredProducts.map(product => <ProductCard key={`grid-${product._id}`} product={product} />)}
//                 </div>
//               </section>

//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }



// // src/app/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';

// export default function AdvancedStoreDashboard() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart, cartCount } = useCart();
//   const { user, logout } = useAuth();

//   // FILTER STATES
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000);

//   // CAROUSEL STATE
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // HELPER TO FIX BROKEN IMAGE URLS
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL.replace('/api', ''));
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // --- 🚀 NEW: GRAPHIC BANNER CAROUSEL LOGIC ---
//   // Just swap these 'image' URLs with the links to your own custom promo graphics!
//   const heroSlides = [
//     {
//       id: 1,
//       image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop", 
//       alt: "Mega Sale - 50% Off",
//       link: "/" // Where they go when they click the banner
//     },
//     {
//       id: 2,
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop", 
//       alt: "Premium Audio Week",
//       link: "/"
//     },
//     {
//       id: 3,
//       image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop", 
//       alt: "New Laptops Arrival",
//       link: "/"
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//     }, 5000); // Auto-scroll every 5 seconds
//     return () => clearInterval(timer);
//   }, [heroSlides.length]);

//   // --- DYNAMIC INVENTORY LISTS ---
//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const currentPrice = product.discountPrice || product.price;
//     const matchPrice = currentPrice <= maxPrice;
//     return matchCategory && matchBrand && matchPrice;
//   });

//   const discountedProducts = filteredProducts.filter(p => p.discountPrice && p.discountPrice < p.price);
//   const bestSellers = filteredProducts.filter(p => p.isBestSeller);

//   // --- PREMIUM PRODUCT CARD COMPONENT ---
//   const ProductCard = ({ product }) => (
//     <div className="min-w-[280px] max-w-[320px] w-full bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(6,81,237,0.15)] transition-all duration-500 border border-gray-100/50 hover:border-orange-200 flex flex-col relative group flex-shrink-0 overflow-hidden">
//       <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
//         {product.isBestSeller && <span className="backdrop-blur-md bg-white/80 text-orange-600 border border-white/50 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">Best Seller</span>}
//         {product.discountPrice && <span className="backdrop-blur-md bg-red-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF</span>}
//       </div>

//       <Link href={`/product/${product._id}`}>
//         <div className="relative h-56 mb-2 overflow-hidden bg-gray-50/50 flex items-center justify-center p-6 cursor-pointer">
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
//           <img src={getImageUrl(product.images && product.images.length > 0 ? product.images[0] : null)} alt={product.name} className="object-contain h-full w-full group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-2xl transition-all duration-500 ease-out relative z-10" />
//         </div>
//       </Link>

//       <div className="flex-1 flex flex-col px-5 pb-5">
//         <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">{product.brand || 'Generic'}</p>
//         <Link href={`/product/${product._id}`}>
//           <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors cursor-pointer leading-snug">{product.name}</h3>
//         </Link>
        
//         <div className="flex items-center gap-1.5 mb-3 mt-auto">
//           <div className="flex text-yellow-400 text-xs">{'★'.repeat(Math.floor(product.ratings || 5))}{'☆'.repeat(5 - Math.floor(product.ratings || 5))}</div>
//           <span className="text-gray-400 text-[11px] font-medium hover:text-blue-500 cursor-pointer transition-colors">({product.numOfReviews || 0})</span>
//         </div>

//         <div className="pt-4 border-t border-gray-100/80">
//           <div className="flex items-end gap-2 mb-4">
//             <span className="text-2xl font-black text-gray-900 tracking-tight">₹{product.discountPrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}</span>
//             {product.discountPrice && <span className="text-xs line-through text-gray-400 font-medium mb-1">₹{product.price.toLocaleString('en-IN')}</span>}
//           </div>
//           <button onClick={() => { addToCart(product); alert(`${product.name} added to cart!`); }} className="w-full bg-slate-900 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 text-sm flex justify-center items-center gap-2 group/btn">
//             <span className="group-hover/btn:animate-bounce">🛒</span> Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 selection:bg-orange-200">
      
//       {/* 1. PREMIUM NAVBAR */}
      

//       {/* 🚀 NEW: GRAPHIC BANNER CAROUSEL */}
//       <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-slate-900 overflow-hidden group cursor-pointer">
//         {heroSlides.map((slide, index) => (
//           <Link href={slide.link} key={slide.id}>
//             <div 
//               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//             >
//               <img 
//                 src={slide.image} 
//                 alt={slide.alt} 
//                 className="w-full h-full object-cover object-center"
//               />
//               {/* Subtle dark overlay that lifts on hover so users know it's clickable */}
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
//             </div>
//           </Link>
//         ))}
        
//         {/* Navigation Arrows (Shows on hover) */}
//         <button 
//           onClick={() => setCurrentSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
//           className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/90 text-slate-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm shadow-lg"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
//         </button>
//         <button 
//           onClick={() => setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
//           className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/90 text-slate-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm shadow-lg"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
//         </button>

//         {/* Carousel Indicators */}
//         <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
//           {heroSlides.map((_, index) => (
//             <button 
//               key={index} 
//               onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }} 
//               className={`h-2.5 rounded-full transition-all duration-300 shadow-md ${index === currentSlide ? 'w-10 bg-orange-500' : 'w-2.5 bg-white/60 hover:bg-white'}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* QUICK CATEGORIES & TRUST BADGES */}
//       <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
//           {[
//             { icon: "📱", name: "Smartphones", color: "bg-blue-50 text-blue-600" },
//             { icon: "💻", name: "Laptops", color: "bg-purple-50 text-purple-600" },
//             { icon: "🎧", name: "Audio", color: "bg-rose-50 text-rose-600" },
//             { icon: "⌚", name: "Wearables", color: "bg-emerald-50 text-emerald-600" }
//           ].map((cat, i) => (
//             <div key={i} onClick={() => {setSelectedCategory(cat.name); setSelectedBrand('All');}} className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow border border-slate-100 group">
//               <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>{cat.icon}</div>
//               <span className="font-bold text-slate-800">{cat.name}</span>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-2xl p-6 border border-slate-100 flex flex-wrap justify-between items-center gap-6 shadow-sm">
//           <div className="flex items-center gap-3"><span className="text-3xl">🚚</span><div><p className="font-black text-slate-900 text-sm">Free Shipping</p><p className="text-xs text-slate-500 font-medium">On orders over ₹10k</p></div></div>
//           <div className="hidden md:block w-px h-10 bg-slate-200"></div>
//           <div className="flex items-center gap-3"><span className="text-3xl">🛡️</span><div><p className="font-black text-slate-900 text-sm">Secure Payment</p><p className="text-xs text-slate-500 font-medium">100% encrypted checkout</p></div></div>
//           <div className="hidden md:block w-px h-10 bg-slate-200"></div>
//           <div className="flex items-center gap-3"><span className="text-3xl">🔄</span><div><p className="font-black text-slate-900 text-sm">Easy Returns</p><p className="text-xs text-slate-500 font-medium">7-day replacement policy</p></div></div>
//           <div className="hidden md:block w-px h-10 bg-slate-200"></div>
//           <div className="flex items-center gap-3"><span className="text-3xl">🎧</span><div><p className="font-black text-slate-900 text-sm">24/7 Support</p><p className="text-xs text-slate-500 font-medium">Dedicated gadget experts</p></div></div>
//         </div>
//       </div>

//       {/* MAIN LAYOUT WITH FILTER SIDEBAR */}
//       <div className="flex max-w-[1600px] mx-auto px-4 md:px-6 gap-8 pb-12">
        
//         <aside className="hidden lg:block w-72 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 h-fit sticky top-28">
//           <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
//             <h2 className="text-lg font-black tracking-wide text-slate-900">Filters</h2>
//             <button onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }} className="text-xs font-bold text-orange-500 hover:text-orange-600">Reset</button>
//           </div>
          
//           <div className="mb-8">
//             <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-widest text-[11px]">Categories</h3>
//             <ul className="space-y-1.5">
//               {uniqueCategories.map(cat => (
//                 <li key={cat} onClick={() => setSelectedCategory(cat)} className={`cursor-pointer text-sm font-medium px-3 py-2 rounded-lg transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>{cat}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-8">
//             <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-widest text-[11px]">Brands</h3>
//             <div className="flex flex-wrap gap-2">
//               {uniqueBrands.map(brand => (
//                 <span key={brand} onClick={() => setSelectedBrand(brand)} className={`cursor-pointer text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${selectedBrand === brand ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>{brand}</span>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-bold text-slate-400 mb-4 uppercase tracking-widest text-[11px]">Price Range</h3>
//             <p className="text-xl font-black text-slate-900 mb-4">Up to ₹{maxPrice.toLocaleString('en-IN')}</p>
//             <input type="range" min="1000" max="200000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-slate-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none" />
//             <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider"><span>₹1,000</span><span>₹2,00,000</span></div>
//           </div>
//         </aside>

//         <main className="flex-1 w-full overflow-hidden">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-32 space-y-4">
//               <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-orange-500"></div>
//               <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Inventory...</p>
//             </div>
//           ) : filteredProducts.length === 0 ? (
//              <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-slate-100">
//                <div className="text-6xl mb-6 opacity-50">🔍</div>
//                <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">No gadgets found</h3>
//                <p className="text-slate-500 font-medium">Try adjusting your filters or expanding your price range.</p>
//                <button onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }} className="mt-6 text-orange-500 font-bold hover:underline">Clear all filters</button>
//              </div>
//           ) : (
//             <div className="space-y-16">
              
//               {/* MID-PAGE PROMO BANNERS */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="relative z-10 w-2/3">
//                     <p className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2">Trade-in Offer</p>
//                     <h3 className="text-2xl font-black mb-4">Upgrade your Smartphone</h3>
//                     <button className="text-sm font-bold border-b-2 border-orange-500 pb-1 hover:text-orange-500 transition-colors">Learn More</button>
//                   </div>
//                   <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
//                   <span className="absolute right-4 bottom-4 text-7xl opacity-50 group-hover:scale-110 transition-transform duration-500">📱</span>
//                 </div>
//                 <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="relative z-10 w-2/3">
//                     <p className="text-blue-300 font-black text-xs uppercase tracking-widest mb-2">Student Discount</p>
//                     <h3 className="text-2xl font-black mb-4">Save 15% on all Laptops</h3>
//                     <button className="text-sm font-bold border-b-2 border-blue-400 pb-1 hover:text-blue-300 transition-colors">Get Verified</button>
//                   </div>
//                   <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
//                   <span className="absolute right-4 bottom-4 text-7xl opacity-50 group-hover:scale-110 transition-transform duration-500">💻</span>
//                 </div>
//               </div>

//               {discountedProducts.length > 0 && (
//                 <section>
//                   <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
//                       <span className="text-3xl animate-pulse">🔥</span> Top Deals
//                     </h2>
//                   </div>
//                   <div className="relative">
//                     <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide px-2">
//                       {discountedProducts.map(product => <ProductCard key={product._id} product={product} />)}
//                     </div>
//                   </div>
//                 </section>
//               )}

//               {bestSellers.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
//                     <span className="text-3xl">⭐</span> Best Sellers
//                   </h2>
//                   <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide px-2">
//                     {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
//                   </div>
//                 </section>
//               )}

//               <section>
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-200 pb-4 gap-4">
//                   <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
//                     {selectedCategory === 'All' ? 'All Gadgets' : selectedCategory}
//                   </h2>
//                   <span className="text-sm font-bold text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
//                     {filteredProducts.length} Products
//                   </span>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
//                   {filteredProducts.map(product => <ProductCard key={`grid-${product._id}`} product={product} />)}
//                 </div>
//               </section>

//             </div>
//           )}
//         </main>
//       </div>
      
//       {/* STANDARD E-COMMERCE FOOTER */}
      
//     </div>
//   );
// }


// // src/app/page.jsx
// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';
// import { useSearchParams, useRouter } from 'next/navigation'; // 🚀 Added for search

// // --- 🎨 PREMIUM PRODUCT CARD ---
// const ProductCard = ({ product, onAddToCart, getImageUrl }) => (
//   <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/60 hover:border-orange-500/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden relative min-w-[260px] h-full">
//     {/* Badges */}
//     <div className="absolute top-3 left-3 z-30 flex flex-col gap-2 pointer-events-none">
//       {product.isBestSeller && (
//         <span className="backdrop-blur-md bg-white/90 text-orange-600 border border-orange-100 text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
//           Best Seller
//         </span>
//       )}
//       {product.discountPrice && (
//         <span className="backdrop-blur-md bg-red-500/90 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
//           {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
//         </span>
//       )}
//     </div>

//     {/* Image Container - Ensure z-10 so it stays behind badges */}
//     <Link href={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-slate-50 p-6 z-10">
//       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
//       <img 
//         src={getImageUrl(product.images?.[0])} 
//         alt={product.name} 
//         className="w-full h-full object-contain relative z-20 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out drop-shadow-sm group-hover:drop-shadow-xl" 
//       />
//     </Link>

//     {/* Content */}
//     <div className="flex flex-col flex-1 p-5">
//       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
//         {product.brand || 'Generic'}
//       </p>
//       <Link href={`/product/${product._id}`}>
//         <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors leading-snug">
//           {product.name}
//         </h3>
//       </Link>
      
//       <div className="flex items-center gap-1.5 mb-4 mt-auto">
//         <div className="flex text-amber-400 text-xs">
//           {'★'.repeat(Math.floor(product.ratings || 5))}{'☆'.repeat(5 - Math.floor(product.ratings || 5))}
//         </div>
//         <span className="text-slate-400 text-[11px] font-medium hover:text-slate-700 cursor-pointer transition-colors">
//           ({product.numOfReviews || 0} reviews)
//         </span>
//       </div>

//       <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
//         <div className="flex items-baseline gap-2">
//           <span className="text-xl font-black text-slate-900 tracking-tight">
//             ₹{product.discountPrice?.toLocaleString('en-IN') || product.price?.toLocaleString('en-IN')}
//           </span>
//           {product.discountPrice && (
//             <span className="text-xs line-through text-slate-400 font-medium">
//               ₹{product.price?.toLocaleString('en-IN')}
//             </span>
//           )}
//         </div>
//         <button 
//           onClick={() => onAddToCart(product)} 
//           className="w-full bg-slate-900 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl shadow-md hover:shadow-orange-500/25 transition-all duration-300 text-sm flex justify-center items-center gap-2 group/btn active:scale-95"
//         >
//           <span className="group-hover/btn:-rotate-12 transition-transform duration-300">🛒</span> Add to Cart
//         </button>
//       </div>
//     </div>
//   </div>
// );


//   // CAROUSEL STATE
//   const SkeletonCard = () => (
//   <div className="animate-pulse flex flex-col bg-white rounded-2xl border border-slate-100 p-5 h-[380px]">
//     <div className="bg-slate-200 h-48 rounded-xl mb-4"></div>
//     <div className="bg-slate-200 h-3 w-1/3 rounded-full mb-3"></div>
//     <div className="bg-slate-200 h-4 w-full rounded-full mb-2"></div>
//     <div className="bg-slate-200 h-10 w-full rounded-xl mt-auto"></div>
//   </div>
// );

// function StoreContent() {
//   const [products, setProducts] = useState([]);
//   const [dynamicBanners, setDynamicBanners] = useState([]); // 🚀 NEW: State for uploaded banners
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart } = useCart();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const urlSearchQuery = searchParams.get('search')?.toLowerCase() || '';

//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [prodRes, bannerRes] = await Promise.all([
//           axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`),
//           axios.get(`${process.env.NEXT_PUBLIC_API_URL}/banners`) // 🚀 Fetching uploaded banners
//         ]);
//         setProducts(prodRes.data);
//         setDynamicBanners(bannerRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // 🚀 Auto-rotate carousel logic
//   useEffect(() => {
//     if (dynamicBanners.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev === dynamicBanners.length - 1 ? 0 : prev + 1));
//       }, 6000);
//       return () => clearInterval(timer);
//     }
//   }, [dynamicBanners.length]);

//   // --- DYNAMIC INVENTORY LISTS ---
//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   // 🚀 SEARCH & FILTER LOGIC
//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const currentPrice = product.discountPrice || product.price;
//     const matchPrice = currentPrice <= maxPrice;
    
//     const matchSearch = urlSearchQuery === '' || 
//       product.name.toLowerCase().includes(urlSearchQuery) || 
//       (product.brand && product.brand.toLowerCase().includes(urlSearchQuery));

//     return matchCategory && matchBrand && matchPrice && matchSearch;
//   });

//   const discountedProducts = filteredProducts.filter(p => p.discountPrice && p.discountPrice < p.price);

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     console.log(`${product.name} added to cart!`); 
//   };

//   const clearSearch = () => {
//     router.push('/');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 selection:bg-orange-200">
      
//       {/* ENGAGING GRAPHIC BANNER CAROUSEL (Hide if user is searching) */}
//       {/* 🚀 DYNAMIC BANNER CAROUSEL (Show only if not searching) */}
//       {/* 🚀 DYNAMIC BANNER CAROUSEL (Show only if not searching) */}
//       {!urlSearchQuery && dynamicBanners.length > 0 && (
//         <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] bg-slate-900 overflow-hidden group">
//           {dynamicBanners.map((slide, index) => {
//             // Check if this slide has text content
//             const hasText = slide.title || slide.subtitle;
            
//             // The core image component
//             const BannerImage = (
//               <img src={getImageUrl(slide.image)} alt={slide.title || 'Promo Banner'} className="w-full h-full object-cover object-center" />
//             );

//             return (
//               <div 
//                 key={slide._id} 
//                 className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
//               >
//                 {/* 🚀 FIXED: Make whole banner clickable if a link exists */}
//                 {slide.link && slide.link !== '/' ? (
//                   <Link href={slide.link} className="block w-full h-full cursor-pointer">
//                     {BannerImage}
//                   </Link>
//                 ) : (
//                   <div className="w-full h-full">{BannerImage}</div>
//                 )}

//                 {/* 🚀 FIXED: Only show gradient and text if text actually exists! */}
//                 {hasText && (
//                   <>
//                     <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent pointer-events-none"></div>
//                     <div className={`absolute left-8 md:left-20 top-1/2 -translate-y-1/2 max-w-xl transition-all duration-700 delay-300 pointer-events-none ${index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
//                       {slide.title && <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight">{slide.title}</h2>}
//                       {slide.subtitle && <p className="text-lg md:text-xl text-slate-200 font-medium mb-8">{slide.subtitle}</p>}
                      
//                       {/* Only show the Shop Now button if there is a specific link */}
//                       {slide.link && slide.link !== '/' && (
//                         <Link href={slide.link} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-all hover:-translate-y-1 inline-block pointer-events-auto">
//                           Shop Now
//                         </Link>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
          
//           {/* Controls - Only show if more than 1 banner */}
//           {dynamicBanners.length > 1 && (
//             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20 bg-slate-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
//               <button onClick={() => setCurrentSlide(prev => prev === 0 ? dynamicBanners.length - 1 : prev - 1)} className="text-white hover:text-orange-400">←</button>
//               <div className="flex gap-2">
//                 {dynamicBanners.map((_, index) => (
//                   <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white/40'}`} />
//                 ))}
//               </div>
//               <button onClick={() => setCurrentSlide(prev => prev === dynamicBanners.length - 1 ? 0 : prev + 1)} className="text-white hover:text-orange-400">→</button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Placeholder if no banners uploaded */}
//       {!urlSearchQuery && dynamicBanners.length === 0 && !loading && (
//         <div className="w-full h-[300px] bg-slate-200 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest">
//            No Banners Uploaded
//         </div>
//       )}

//       {/* QUICK CATEGORIES & TRUST BADGES (Hide if user is searching) */}
//       {!urlSearchQuery && (
//         <div className="max-w-[1600px] mx-auto px-4 md:px-6 -mt-8 relative z-30">
//           <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-wrap justify-center lg:justify-between items-center gap-6 md:gap-8">
//             {[
//               { icon: "🚚", title: "Free Shipping", sub: "On orders over ₹10k" },
//               { icon: "🛡️", title: "Secure Checkout", sub: "100% encrypted" },
//               { icon: "🔄", title: "Easy Returns", sub: "7-day policy" },
//               { icon: "🎧", title: "24/7 Support", sub: "Expert assistance" }
//             ].map((badge, i) => (
//               <div key={i} className="flex items-center gap-4 group">
//                 <span className="text-3xl group-hover:scale-110 transition-transform">{badge.icon}</span>
//                 <div>
//                   <p className="font-bold text-slate-900 text-sm">{badge.title}</p>
//                   <p className="text-xs text-slate-500">{badge.sub}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* SEARCH RESULTS BANNER */}
//       {urlSearchQuery && (
//         <div className="max-w-[1600px] mx-auto px-4 md:px-6 mt-8">
//           <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
//             <div>
//               <h2 className="text-2xl font-black mb-1">Search Results for "{searchParams.get('search')}"</h2>
//               <p className="text-slate-400 text-sm">Found {filteredProducts.length} items matching your query.</p>
//             </div>
//             <button onClick={clearSearch} className="mt-4 md:mt-0 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-2.5 rounded-full font-bold text-sm transition-colors">
//               Clear Search ✕
//             </button>
//           </div>
//         </div>
//       )}

//       {/* MAIN LAYOUT WITH FILTER SIDEBAR */}
//       <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto px-4 md:px-6 gap-8 py-12">
        
//         {/* Sleek Sticky Sidebar */}
//         <aside className="w-full lg:w-72 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit lg:sticky lg:top-28 shrink-0">
//           <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
//             <h2 className="text-lg font-black text-slate-900">Filters</h2>
//             <button onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }} className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors">Reset All</button>
//           </div>
          
//           <div className="mb-8">
//             <h3 className="font-bold text-slate-400 mb-3 uppercase tracking-wider text-xs">Categories</h3>
//             <div className="space-y-1">
//               {uniqueCategories.map(cat => (
//                 <button 
//                   key={cat} 
//                   onClick={() => setSelectedCategory(cat)} 
//                   className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mb-8">
//             <h3 className="font-bold text-slate-400 mb-3 uppercase tracking-wider text-xs">Brands</h3>
//             <div className="flex flex-wrap gap-2">
//               {uniqueBrands.map(brand => (
//                 <button 
//                   key={brand} 
//                   onClick={() => setSelectedBrand(brand)} 
//                   className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${selectedBrand === brand ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
//                 >
//                   {brand}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-bold text-slate-400 mb-3 uppercase tracking-wider text-xs">Max Price</h3>
//             <p className="text-xl font-black text-slate-900 mb-4">₹{maxPrice.toLocaleString('en-IN')}</p>
//             <input 
//               type="range" min="1000" max="200000" step="1000" value={maxPrice} 
//               onChange={(e) => setMaxPrice(Number(e.target.value))} 
//               className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500" 
//             />
//           </div>
//         </aside>

//         {/* Main Product Area */}
//         <main className="flex-1 min-w-0">
//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
//             </div>
//           ) : filteredProducts.length === 0 ? (
//              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 text-center px-4">
//                <span className="text-6xl mb-4 opacity-50">🔍</span>
//                <h3 className="text-2xl font-black text-slate-800 mb-2">No gadgets found</h3>
//                <p className="text-slate-500 mb-6">We couldn't find anything matching "{searchParams.get('search') || 'your filters'}".</p>
//                <button onClick={() => { clearSearch(); setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-500 transition-colors">
//                  Clear Filters & Search
//                </button>
//              </div>
//           ) : (
//             <div className="space-y-16">
              
//               {/* TOP DEALS SECTION (Only show if not searching) */}
//               {!urlSearchQuery && discountedProducts.length > 0 && (
//                 <section>
//                   <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
//                     <span className="text-orange-500">🔥</span> Top Deals
//                   </h2>
//                   <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory pr-6" style={{scrollbarWidth: 'none'}}>
//                     {discountedProducts.map(product => (
//                       <div key={`deal-${product._id}`} className="snap-start shrink-0 w-[280px]">
//                         <ProductCard product={product} onAddToCart={handleAddToCart} getImageUrl={getImageUrl} />
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* DYNAMIC GRID SECTION */}
//               <section>
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 border-b border-slate-200 pb-4 gap-4">
//                   <h2 className="text-2xl font-black text-slate-900">
//                     {urlSearchQuery ? 'Search Results' : selectedCategory === 'All' ? 'All Gadgets' : selectedCategory}
//                   </h2>
//                   <span className="text-sm font-bold text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
//                     {filteredProducts.length} Results
//                   </span>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {filteredProducts.map(product => (
//                     <ProductCard key={`grid-${product._id}`} product={product} onAddToCart={handleAddToCart} getImageUrl={getImageUrl} />
//                   ))}
//                 </div>
//               </section>

//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// // 🚀 DEFAULT EXPORT WITH SUSPENSE (Required by Next.js for useSearchParams)
// export default function AdvancedStoreDashboard() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 space-y-4">
//         <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-orange-500"></div>
//       </div>
//     }>
//       <StoreContent />
//     </Suspense>
//   );
// }


// src/app/page.jsx
'use client';
import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// --- 🎨 AMAZON STYLE PRODUCT CARD ---
const ProductCard = ({ product, onAddToCart, getImageUrl }) => (
  <div className="bg-white flex flex-col relative z-10 p-4 h-full border border-[#ddd] rounded-[4px] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow">
    {/* Best Seller Badge */}
    {product.isBestSeller && (
      <div className="absolute top-0 left-0 bg-[#e77600] text-white text-[11px] px-2 py-1 font-bold z-20 rounded-tl-[3px] rounded-br-[3px]">
        Best Seller
      </div>
    )}

    {/* Image */}
    <Link href={`/product/${product._id}`} className="block relative h-48 w-full mb-3 z-10">
      <img 
        src={getImageUrl(product.images?.[0])} 
        alt={product.name} 
        className="w-full h-full object-contain mix-blend-multiply" 
      />
    </Link>

    {/* Content */}
    <div className="flex flex-col flex-1">
      <Link href={`/product/${product._id}`}>
        <h2 className="text-[15px] font-medium text-[#007185] hover:text-[#C45500] hover:underline line-clamp-3 leading-snug mb-1">
          {product.brand && <span className="font-bold mr-1">{product.brand}</span>}
          {product.name}
        </h2>
      </Link>
      
      {/* Ratings */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#FFA41C] text-sm">
          {'★'.repeat(Math.floor(product.ratings || 5))}{'☆'.repeat(5 - Math.floor(product.ratings || 5))}
        </span>
        <span className="text-[#007185] text-xs hover:text-[#C45500] hover:underline cursor-pointer">
          {product.numOfReviews || 0}
        </span>
      </div>

      {/* Price */}
      <div className="mt-auto flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[21px] font-normal text-[#0F1111]">
            <span className="text-[11px] align-top relative top-1">₹</span>
            {product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price?.toLocaleString('en-IN')}
          </span>
        </div>
        {product.discountPrice && (
          <span className="text-[12px] text-[#565959]">
            M.R.P: <span className="line-through">₹{product.price?.toLocaleString('en-IN')}</span> 
            <span className="text-[#CC0C39] ml-2">({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off)</span>
          </span>
        )}
        
        {/* Amazon Yellow Button */}
        <button 
          onClick={() => onAddToCart(product)} 
          className="mt-4 w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

// --- 💀 AMAZON SKELETON LOADER ---
const SkeletonCard = () => (
  <div className="animate-pulse flex flex-col bg-white border border-[#ddd] p-4 h-[380px]">
    <div className="bg-gray-200 h-48 w-full mb-4"></div>
    <div className="bg-gray-200 h-3 w-full mb-2"></div>
    <div className="bg-gray-200 h-3 w-2/3 mb-4"></div>
    <div className="bg-gray-200 h-6 w-1/3 mt-auto mb-4"></div>
    <div className="bg-gray-200 h-8 w-full rounded-full"></div>
  </div>
);

function StoreContent() {
  const [products, setProducts] = useState([]);
  const [dynamicBanners, setDynamicBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200000);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
    if (imagePath.startsWith('http')) {
        return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '');
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${imagePath}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'MISSING_API_URL';
      console.log(`🌐 Frontend is attempting to fetch from: ${apiUrl}`);

      try {
        const prodRes = await axios.get(`${apiUrl}/products`);
        setProducts(prodRes.data);
      } catch (error) {
        console.error(`🚨 Failed to fetch products from ${apiUrl}/products`, error.message);
        setProducts([]); 
      }

      try {
        const bannerRes = await axios.get(`${apiUrl}/banners`);
        setDynamicBanners(bannerRes.data);
      } catch (error) {
        console.error(`🚨 Failed to fetch banners from ${apiUrl}/banners`, error.message);
        setDynamicBanners([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (dynamicBanners.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === dynamicBanners.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [dynamicBanners.length]);

  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
  const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
    const currentPrice = product.discountPrice || product.price;
    const matchPrice = currentPrice <= maxPrice;
    
    const matchSearch = urlSearchQuery === '' || 
      product.name.toLowerCase().includes(urlSearchQuery) || 
      (product.brand && product.brand.toLowerCase().includes(urlSearchQuery));

    return matchCategory && matchBrand && matchPrice && matchSearch;
  });

  const discountedProducts = filteredProducts.filter(p => p.discountPrice && p.discountPrice < p.price);
  const handleAddToCart = (product) => { addToCart(product); };
  const clearSearch = () => { router.push('/'); };

  return (
    <div className="min-h-screen bg-[#EAEDED] font-sans text-[#0F1111]">
      
      {/* 🚀 AMAZON HERO BANNER (Full width, fades at bottom, hidden on search) */}
      {!urlSearchQuery && dynamicBanners.length > 0 && (
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] max-w-[1500px] mx-auto overflow-hidden bg-[#EAEDED]">
          {dynamicBanners.map((slide, index) => (
            <div 
              key={slide._id || index} 
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {slide.link && slide.link !== '/' ? (
                <Link href={slide.link} className="block w-full h-full cursor-pointer">
                  <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover object-top" />
                </Link>
              ) : (
                <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover object-top" />
              )}
            </div>
          ))}
          
          {/* The signature Amazon bottom gradient that blends into the background */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(234,237,237,0) 60%, #EAEDED 100%)' }}></div>

          {/* Amazon Carousel Controls */}
          {dynamicBanners.length > 1 && (
            <div className="absolute top-1/3 w-full flex justify-between px-4 z-20">
              <button onClick={() => setCurrentSlide(prev => prev === 0 ? dynamicBanners.length - 1 : prev - 1)} className="bg-transparent hover:border-2 border-white text-transparent hover:text-[#0F1111] py-8 px-4 rounded transition-all focus:outline-none focus:border-2 focus:border-[#008296]">
                <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => setCurrentSlide(prev => prev === dynamicBanners.length - 1 ? 0 : prev + 1)} className="bg-transparent hover:border-2 border-white text-transparent hover:text-[#0F1111] py-8 px-4 rounded transition-all focus:outline-none focus:border-2 focus:border-[#008296]">
                <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* SEARCH RESULTS HEADER */}
      {urlSearchQuery && (
        <div className="bg-white border-b border-[#ddd] shadow-[0_1px_2px_rgba(0,0,0,0.1)] py-2 px-4 md:px-6 mb-4">
          <div className="flex items-center text-[14px]">
            <span className="font-bold mr-1">1-{filteredProducts.length} of over {filteredProducts.length} results for</span> 
            <span className="text-[#c45500] font-bold">"{searchParams.get('search')}"</span>
            <button onClick={clearSearch} className="ml-4 text-[#007185] hover:text-[#c45500] hover:underline text-sm border-l border-gray-300 pl-4">
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT GRID (Overlaps the banner negative margin) */}
      <div className={`flex flex-col lg:flex-row max-w-[1500px] mx-auto px-4 sm:px-6 gap-6 pb-12 relative z-20 ${!urlSearchQuery && dynamicBanners.length > 0 ? '-mt-[150px] lg:-mt-[280px]' : ''}`}>
        
        {/* Amazon Left Sidebar (Hidden on mobile by default) */}
        <aside className="w-full lg:w-[240px] shrink-0 bg-transparent">
          <div className="bg-white lg:bg-transparent p-4 lg:p-0 rounded border lg:border-none border-[#ddd] mb-4">
            
            <div className="mb-4">
              <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">Department</h3>
              <ul className="space-y-1">
                {uniqueCategories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSelectedCategory(cat)} 
                      className={`text-[14px] text-left w-full hover:text-[#c45500] hover:underline transition-colors ${selectedCategory === cat ? 'font-bold text-[#0F1111]' : 'text-[#0F1111]'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">Brands</h3>
              <ul className="space-y-1">
                {uniqueBrands.map(brand => (
                  <li key={brand} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id={brand}
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(selectedBrand === brand ? 'All' : brand)}
                      className="w-4 h-4 accent-[#007185] cursor-pointer"
                    />
                    <label htmlFor={brand} className="text-[14px] text-[#0F1111] cursor-pointer hover:text-[#c45500] hover:underline">
                      {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[14px] text-[#0F1111] mb-2">Price</h3>
              <div className="flex flex-col">
                <input 
                  type="range" min="1000" max="200000" step="1000" value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))} 
                  className="w-full h-1 bg-gray-300 rounded outline-none accent-[#007185] cursor-pointer mb-2" 
                />
                <span className="text-[14px] text-[#0F1111]">Under ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredProducts.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded border border-[#ddd]">
               <h3 className="text-xl font-bold text-[#0F1111] mb-2">No results for {searchParams.get('search') || 'your filters'}.</h3>
               <p className="text-[14px] text-[#565959] mb-4">Try checking your spelling or use more general terms</p>
               <button onClick={() => { clearSearch(); setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }} className="text-[#007185] hover:text-[#c45500] hover:underline text-sm">
                 Clear all filters
               </button>
             </div>
          ) : (
            <div className="space-y-6">
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map(product => (
                  <ProductCard key={`grid-${product._id}`} product={product} onAddToCart={handleAddToCart} getImageUrl={getImageUrl} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// 🚀 DEFAULT EXPORT
export default function AdvancedStoreDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
      </div>
    }>
      <StoreContent />
    </Suspense>
  );
}
