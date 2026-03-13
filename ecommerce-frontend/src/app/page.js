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


// src/app/page.jsx
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function AdvancedStoreDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart, cartCount } = useCart();
  const { user, logout } = useAuth();

  // 🚀 FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200000);

  // 🚀 HELPER TO FIX BROKEN IMAGE URLS
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
    
    // If it's already a full URL (like from Cloudinary or an old localhost link), handle it
    if (imagePath.startsWith('http')) {
        // Strip old localhost if it exists in the string to force it to use the new Render URL
        return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL.replace('/api', ''));
    }
    
    // Construct the full Render URL by removing /api from the end of the environment variable
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${imagePath}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- DYNAMIC INVENTORY LISTS ---
  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
  const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

  // --- 🚀 THE FILTERING ENGINE ---
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
    const currentPrice = product.discountPrice || product.price;
    const matchPrice = currentPrice <= maxPrice;
    
    return matchCategory && matchBrand && matchPrice;
  });

  // Top Deals & Best Sellers 
  const discountedProducts = filteredProducts.filter(p => p.discountPrice && p.discountPrice < p.price);
  const bestSellers = filteredProducts.filter(p => p.isBestSeller);

  // --- REUSABLE PRODUCT CARD COMPONENT ---
  const ProductCard = ({ product }) => (
    <div className="min-w-[260px] max-w-[300px] w-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 flex flex-col relative group flex-shrink-0">
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isBestSeller && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">#1 Best Seller</span>}
        {product.discountPrice && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </span>
        )}
      </div>

      <Link href={`/product/${product._id}`}>
        <div className="h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center cursor-pointer p-2">
          {/* 🚀 FIXED: Wrapped image src with getImageUrl helper */}
          <img 
            src={getImageUrl(product.images && product.images.length > 0 ? product.images[0] : null)} 
            alt={product.name} 
            className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors cursor-pointer">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{product.brand || 'Generic'}</p>
        
        <div className="flex items-center gap-1 mb-2 mt-auto">
          <span className="text-yellow-400 text-xs">★★★★★</span>
          <span className="text-blue-500 text-[10px] hover:underline cursor-pointer">{product.ratings || '4.5'}</span>
        </div>

        <div className="pt-3 border-t border-gray-50">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-black text-gray-900">₹{product.discountPrice?.toLocaleString('en-IN') || product.price.toLocaleString('en-IN')}</span>
            {product.discountPrice && <span className="text-xs line-through text-gray-400 font-medium">₹{product.price.toLocaleString('en-IN')}</span>}
          </div>
          
          <button onClick={() => { addToCart(product); alert(`${product.name} added to cart!`); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg shadow-sm transition-colors text-sm flex justify-center items-center gap-2">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* 1. MAIN NAVBAR */}
      <nav className="bg-slate-900 p-4 text-white flex flex-col md:flex-row justify-between items-center shadow-md gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer">GADGET<span className="text-white">STORE</span></h1>
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex shadow-sm">
          <input type="text" placeholder="Search for iPhone, MacBooks, audio..." className="w-full p-2.5 rounded-l-md text-black focus:outline-none font-medium" />
          <button className="bg-orange-500 px-8 font-bold text-white rounded-r-md hover:bg-orange-600 transition">Search</button>
        </div>
        
        <div className="flex space-x-6 items-center w-full md:w-auto justify-end">
          {user ? (
            <div className="text-sm flex flex-col items-start">
              <p className="text-gray-300 font-medium">
                Hello, <span className="font-bold text-white">{user?.user?.name || user?.name || 'User'}</span>
              </p>
              
              <div className="flex gap-3 mt-0.5">
                <Link href="/orders" className="font-bold text-blue-400 hover:text-blue-300 text-xs tracking-wide">📦 ORDERS</Link>
                <Link href="/wallet" className="font-bold text-green-400 hover:text-green-300 text-xs tracking-wide">💳 WALLET</Link>
                
                {/* 🚀 ADMIN ROLE CHECK */}
                {(user?.user?.role === 'admin' || user?.role === 'admin') && (
                  <Link href="/admin" className="font-bold text-orange-400 hover:text-orange-300 text-xs tracking-wide">⚙️ ADMIN</Link>
                )}

                <button onClick={logout} className="font-bold text-red-400 hover:text-red-300 text-xs uppercase">Logout</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-sm cursor-pointer hover:opacity-80 transition">
              <p className="text-gray-300 text-xs">Hello, Sign in</p>
              <p className="font-bold">Account & Lists</p>
            </Link>
          )}
          
          <Link href="/cart">
            <button className="font-bold flex items-center gap-1.5 text-lg hover:text-orange-400 transition-colors">
              🛒 <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-black">{cartCount}</span>
            </button>
          </Link>
        </div>
      </nav>

      {/* 2. MAIN LAYOUT WITH FILTER SIDEBAR */}
      <div className="flex max-w-[1600px] mx-auto p-4 gap-6 mt-4">
        
        <aside className="hidden lg:block w-72 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
          <h2 className="text-xl font-black border-b pb-4 mb-6">Filter Gadgets</h2>
          
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Categories</h3>
            <ul className="space-y-2">
              {uniqueCategories.map(cat => (
                <li 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Brands</h3>
            <ul className="space-y-2">
              {uniqueBrands.map(brand => (
                <li 
                  key={brand} 
                  onClick={() => setSelectedBrand(brand)}
                  className={`cursor-pointer text-sm font-medium transition-colors ${selectedBrand === brand ? 'text-orange-500 font-bold' : 'text-gray-600 hover:text-orange-400'}`}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-sm">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</h3>
            <input 
              type="range" 
              min="1000" 
              max="200000" 
              step="1000"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer" 
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
              <span>₹1,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>
          
          <button 
            onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(200000); }}
            className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded transition-colors text-sm"
          >
            Clear All Filters
          </button>
        </aside>

        {/* 3. PRODUCT GRID */}
        <main className="flex-1 w-full overflow-hidden">
          
          {selectedCategory === 'All' && selectedBrand === 'All' && maxPrice === 200000 && (
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-white flex flex-col justify-center shadow-lg relative overflow-hidden h-[250px] md:h-[300px] mb-10">
              <div className="relative z-10">
                <span className="bg-orange-500 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Mega Sale</span>
                <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Next-Gen Power.<br/>Unbeatable Prices.</h2>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div></div>
          ) : filteredProducts.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-2xl font-bold text-gray-800 mb-2">No gadgets found</h3>
               <p className="text-gray-500">Try adjusting your filters or price range.</p>
             </div>
          ) : (
            <div className="space-y-12">
              
              {discountedProducts.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">🔥 Top Deals Today</h2>
                  <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
                    {discountedProducts.map(product => <ProductCard key={product._id} product={product} />)}
                  </div>
                </section>
              )}

              {bestSellers.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 border-b pb-2 flex items-center gap-2">⭐ Best Sellers</h2>
                  <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
                    {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
                  </div>
                </section>
              )}

              <section>
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                  <h2 className="text-2xl font-black text-slate-900">
                    {selectedCategory === 'All' ? '📱 Explore All' : `📱 ${selectedCategory}`}
                  </h2>
                  <span className="text-sm font-bold text-gray-500 bg-white px-3 py-1 rounded border shadow-sm">
                    {filteredProducts.length} Results
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => <ProductCard key={`grid-${product._id}`} product={product} />)}
                </div>
              </section>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}