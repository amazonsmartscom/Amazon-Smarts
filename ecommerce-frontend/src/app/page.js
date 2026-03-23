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


// // src/app/page.jsx
// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';
// import { useSearchParams, useRouter } from 'next/navigation';

// // --- 🎨 AUTHENTIC AMAZON PRODUCT CARD ---
// const ProductCard = ({ product, onAddToCart, onBuyNow, getImageUrl }) => (
//   <div className="bg-white flex flex-col relative z-10 p-4 h-full border border-[#ddd] rounded-[4px] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow">
//     {/* Best Seller Badge */}
//     {product.isBestSeller && (
//       <div className="absolute top-0 left-0 bg-[#e77600] text-white text-[11px] px-2 py-1 font-bold z-20 rounded-tl-[3px] rounded-br-[3px]">
//         Best Seller
//       </div>
//     )}

//     {/* Image Container */}
//     <Link href={`/product/${product._id}`} className="block relative h-52 w-full mb-4 z-10 p-2">
//       <img 
//         src={getImageUrl(product.images?.[0])} 
//         alt={product.name} 
//         className="w-full h-full object-contain mix-blend-multiply" 
//       />
//     </Link>

//     {/* Content */}
//     <div className="flex flex-col flex-1">
//       <Link href={`/product/${product._id}`}>
//         <h2 className="text-[14px] leading-snug font-medium text-[#007185] hover:text-[#C45500] hover:underline line-clamp-4 mb-1">
//           {product.brand && <span className="font-bold mr-1 text-[#111]">{product.brand}</span>}
//           {product.name}
//         </h2>
//       </Link>
      
//       {/* Ratings */}
//       <div className="flex items-center gap-1 mb-2">
//         <span className="text-[#FFA41C] text-[15px]">
//           {'★'.repeat(Math.floor(product.ratings || 5))}{'☆'.repeat(5 - Math.floor(product.ratings || 5))}
//         </span>
//         <span className="text-[#007185] text-[13px] hover:text-[#C45500] hover:underline cursor-pointer ml-1">
//           {product.numOfReviews || 0}
//         </span>
//       </div>

//       {/* Price */}
//       <div className="mt-auto">
//         <div className="flex items-baseline gap-1">
//           <span className="text-[24px] font-normal text-[#111]">
//             <span className="text-[13px] align-top relative top-1.5 mr-0.5">₹</span>
//             {product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price?.toLocaleString('en-IN')}
//           </span>
//         </div>
//         {product.discountPrice && (
//           <div className="text-[12px] text-[#565959] mb-4">
//             M.R.P: <span className="line-through">₹{product.price?.toLocaleString('en-IN')}</span> 
//             <span className="ml-1">({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off)</span>
//           </div>
//         )}
        
//         <div className="flex flex-col gap-2">
//           <button 
//             onClick={(e) => { e.preventDefault(); onAddToCart(product); }} 
//             className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[6px] text-[13px] text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
//           >
//             Add to cart
//           </button>
//           <button 
//             onClick={(e) => { e.preventDefault(); onBuyNow(product); }} 
//             className="w-full bg-[#FFA41C] hover:bg-[#FF9900] border border-[#FF8F00] rounded-full py-[6px] text-[13px] text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- SKELETON LOADER ---
// const SkeletonCard = () => (
//   <div className="animate-pulse flex flex-col bg-white border border-[#ddd] p-4 h-[420px] rounded-[4px]">
//     <div className="bg-gray-200 h-52 w-full mb-4"></div>
//     <div className="bg-gray-200 h-3 w-full mb-2"></div>
//     <div className="bg-gray-200 h-3 w-2/3 mb-4"></div>
//     <div className="bg-gray-200 h-8 w-1/3 mt-auto mb-4"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full mb-2"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full"></div>
//   </div>
// );

// function StoreContent() {
//   const [products, setProducts] = useState([]);
//   const [dynamicBanners, setDynamicBanners] = useState([]);
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
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
//       try {
//         const prodRes = await axios.get(`${apiUrl}/products`);
//         setProducts(prodRes.data);
//       } catch (err) { setProducts([]); }

//       try {
//         const bannerRes = await axios.get(`${apiUrl}/banners`);
//         setDynamicBanners(bannerRes.data);
//       } catch (err) { setDynamicBanners([]); } finally { setLoading(false); }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (dynamicBanners.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev === dynamicBanners.length - 1 ? 0 : prev + 1));
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [dynamicBanners.length]);

//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const matchPrice = (product.discountPrice || product.price) <= maxPrice;
//     const matchSearch = urlSearchQuery === '' || product.name.toLowerCase().includes(urlSearchQuery) || (product.brand && product.brand.toLowerCase().includes(urlSearchQuery));
//     return matchCategory && matchBrand && matchPrice && matchSearch;
//   });

//   const handleAddToCart = (product) => addToCart(product);
//   const handleBuyNow = (product) => { addToCart(product); router.push('/cart'); };
//   const clearSearch = () => { router.push('/'); };

//   return (
//     <div className="min-h-screen bg-[#F0F2F2] font-sans text-[#111]">
      
//       {/* 🚀 SOLID HERO BANNER (No gradient fade) */}
//       {!urlSearchQuery && dynamicBanners.length > 0 && (
//         <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] overflow-hidden bg-white border-b border-[#ddd]">
//           {dynamicBanners.map((slide, index) => (
//             <div 
//               key={slide._id || index} 
//               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//             >
//               {slide.link && slide.link !== '/' ? (
//                 <Link href={slide.link} className="block w-full h-full">
//                   <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover" />
//                 </Link>
//               ) : (
//                 <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover" />
//               )}
//             </div>
//           ))}
          
//           {/* Controls */}
//           {dynamicBanners.length > 1 && (
//             <div className="absolute inset-0 w-full flex justify-between items-center px-4 z-20 pointer-events-none">
//               <button onClick={() => setCurrentSlide(prev => prev === 0 ? dynamicBanners.length - 1 : prev - 1)} className="pointer-events-auto bg-white/20 hover:bg-white/40 p-4 rounded text-white transition-all">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
//               </button>
//               <button onClick={() => setCurrentSlide(prev => prev === dynamicBanners.length - 1 ? 0 : prev + 1)} className="pointer-events-auto bg-white/20 hover:bg-white/40 p-4 rounded text-white transition-all">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* SEARCH RESULTS HEADER */}
//       {urlSearchQuery && (
//         <div className="bg-white border-b border-[#ddd] py-3 px-6 mb-4 shadow-sm">
//           <div className="max-w-[1500px] mx-auto text-[14px]">
//             <span className="text-[#565959]">1-{filteredProducts.length} of over {filteredProducts.length} results for </span> 
//             <span className="text-[#c45500] font-bold">"{searchParams.get('search')}"</span>
//             <button onClick={clearSearch} className="ml-4 text-[#007185] hover:text-[#c45500] hover:underline border-l border-gray-300 pl-4 font-medium">Clear all</button>
//           </div>
//         </div>
//       )}

//       {/* MAIN CONTENT */}
//       <div className="flex flex-col lg:flex-row max-w-[1500px] mx-auto px-4 sm:px-6 gap-6 py-6">
        
//         {/* Left Sidebar */}
//         <aside className="w-full lg:w-[240px] shrink-0">
//           <div className="space-y-6">
//             <div>
//               <h3 className="font-bold text-[14px] mb-2">Category</h3>
//               <ul className="space-y-1.5">
//                 {uniqueCategories.map(cat => (
//                   <li key={cat}>
//                     <button 
//                       onClick={() => setSelectedCategory(cat)} 
//                       className={`text-[13px] text-left w-full hover:text-[#c45500] ${selectedCategory === cat ? 'font-bold' : 'text-[#111]'}`}
//                     >
//                       {cat}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="pt-4 border-t border-[#ddd]">
//               <h3 className="font-bold text-[14px] mb-2">Brand</h3>
//               <ul className="space-y-2">
//                 {uniqueBrands.map(brand => (
//                   <li key={brand} className="flex items-center gap-2">
//                     <input 
//                       type="checkbox" 
//                       id={brand}
//                       checked={selectedBrand === brand}
//                       onChange={() => setSelectedBrand(selectedBrand === brand ? 'All' : brand)}
//                       className="w-4 h-4 accent-[#007185] cursor-pointer"
//                     />
//                     <label htmlFor={brand} className="text-[13px] cursor-pointer hover:text-[#c45500]">{brand}</label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="pt-4 border-t border-[#ddd]">
//               <h3 className="font-bold text-[14px] mb-2">Price</h3>
//               <div className="flex flex-col">
//                 <input 
//                   type="range" min="1000" max="200000" step="1000" value={maxPrice} 
//                   onChange={(e) => setMaxPrice(Number(e.target.value))} 
//                   className="w-full h-1 bg-[#D5D9D9] rounded-lg appearance-none cursor-pointer accent-[#007185] mb-2" 
//                 />
//                 <span className="text-[13px]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Grid */}
//         <main className="flex-1">
//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
//             </div>
//           ) : (
//             <>
//               <h1 className="text-[20px] font-bold mb-4">{urlSearchQuery ? 'Results' : 'Recommended for you'}</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {filteredProducts.map(product => (
//                   <ProductCard 
//                     key={product._id} 
//                     product={product} 
//                     onAddToCart={handleAddToCart} 
//                     onBuyNow={handleBuyNow} 
//                     getImageUrl={getImageUrl} 
//                   />
//                 ))}
//               </div>
//               {filteredProducts.length === 0 && (
//                 <div className="bg-white p-10 text-center border border-[#ddd] rounded">
//                    <p className="text-lg font-bold">No results found.</p>
//                    <p className="text-sm text-[#565959]">Try adjusting your filters or search terms.</p>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default function AdvancedStoreDashboard() {
//   return (
//     <Suspense fallback={null}>
//       <StoreContent />
//     </Suspense>
//   );
// }



// src/app/page.jsx
// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';
// import { useSearchParams, useRouter } from 'next/navigation';

// // --- 🎨 AUTHENTIC AMAZON PRODUCT CARD ---
// const ProductCard = ({ product, onAddToCart, onBuyNow, getImageUrl }) => (
//   <div className="bg-white flex flex-col relative z-10 p-4 h-full border border-[#ddd] rounded-[4px] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow">
//     {/* Best Seller Badge */}
//     {product.isBestSeller && (
//       <div className="absolute top-0 left-0 bg-[#e77600] text-white text-[11px] px-2 py-1 font-bold z-20 rounded-tl-[3px] rounded-br-[3px]">
//         Best Seller
//       </div>
//     )}

//     {/* Image Container */}
//     <Link href={`/product/${product._id}`} className="block relative h-52 w-full mb-4 z-10 p-2">
//       <img 
//         src={getImageUrl(product.images?.[0])} 
//         alt={product.name} 
//         className="w-full h-full object-contain mix-blend-multiply" 
//       />
//     </Link>

//     {/* Content */}
//     <div className="flex flex-col flex-1">
//       <Link href={`/product/${product._id}`}>
//         <h2 className="text-[14px] leading-snug font-medium text-[#007185] hover:text-[#C45500] hover:underline line-clamp-4 mb-1">
//           {product.brand && <span className="font-bold mr-1 text-[#111]">{product.brand}</span>}
//           {product.name}
//         </h2>
//       </Link>
      
//       {/* Ratings */}
//       <div className="flex items-center gap-1 mb-2">
//         <span className="text-[#FFA41C] text-[15px]">
//           {'★'.repeat(Math.floor(product.ratings || 5))}{'☆'.repeat(5 - Math.floor(product.ratings || 5))}
//         </span>
//         <span className="text-[#007185] text-[13px] hover:text-[#C45500] hover:underline cursor-pointer ml-1">
//           {product.numOfReviews || 0}
//         </span>
//       </div>

//       {/* Price */}
//       <div className="mt-auto">
//         <div className="flex items-baseline gap-1">
//           <span className="text-[24px] font-normal text-[#111]">
//             <span className="text-[13px] align-top relative top-1.5 mr-0.5">₹</span>
//             {product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price?.toLocaleString('en-IN')}
//           </span>
//         </div>
//         {product.discountPrice && (
//           <div className="text-[12px] text-[#565959] mb-4">
//             M.R.P: <span className="line-through">₹{product.price?.toLocaleString('en-IN')}</span> 
//             <span className="ml-1">({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off)</span>
//           </div>
//         )}
        
//         <div className="flex flex-col gap-2 mt-4">
//           <button 
//             onClick={(e) => { e.preventDefault(); onAddToCart(product); }} 
//             className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[6px] text-[13px] text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
//           >
//             Add to cart
//           </button>
//           <button 
//             onClick={(e) => { e.preventDefault(); onBuyNow(product); }} 
//             className="w-full bg-[#FFA41C] hover:bg-[#FF9900] border border-[#FF8F00] rounded-full py-[6px] text-[13px] text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- SKELETON LOADER ---
// const SkeletonCard = () => (
//   <div className="animate-pulse flex flex-col bg-white border border-[#ddd] p-4 h-[420px] rounded-[4px]">
//     <div className="bg-gray-200 h-52 w-full mb-4"></div>
//     <div className="bg-gray-200 h-3 w-full mb-2"></div>
//     <div className="bg-gray-200 h-3 w-2/3 mb-4"></div>
//     <div className="bg-gray-200 h-8 w-1/3 mt-auto mb-4"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full mb-2"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full"></div>
//   </div>
// );

// function StoreContent() {
//   const [products, setProducts] = useState([]);
//   const [dynamicBanners, setDynamicBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart } = useCart();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const urlSearchQuery = searchParams.get('search')?.toLowerCase() || '';

//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // 🚀 NEW MOBILE & SORT STATES
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState('featured');

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
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
//       try {
//         const prodRes = await axios.get(`${apiUrl}/products`);
//         setProducts(prodRes.data);
//       } catch (err) { setProducts([]); }

//       try {
//         const bannerRes = await axios.get(`${apiUrl}/banners`);
//         setDynamicBanners(bannerRes.data);
//       } catch (err) { setDynamicBanners([]); } finally { setLoading(false); }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (dynamicBanners.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev === dynamicBanners.length - 1 ? 0 : prev + 1));
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [dynamicBanners.length]);

//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   // 🚀 1. Apply Filters
//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const matchPrice = (product.discountPrice || product.price) <= maxPrice;
//     const matchSearch = urlSearchQuery === '' || product.name.toLowerCase().includes(urlSearchQuery) || (product.brand && product.brand.toLowerCase().includes(urlSearchQuery));
//     return matchCategory && matchBrand && matchPrice && matchSearch;
//   });

//   // 🚀 2. Apply Sorting
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     const priceA = a.discountPrice || a.price;
//     const priceB = b.discountPrice || b.price;
//     if (sortBy === 'price_low') return priceA - priceB;
//     if (sortBy === 'price_high') return priceB - priceA;
//     if (sortBy === 'rating') return (b.ratings || 0) - (a.ratings || 0);
//     return 0; // featured
//   });

//   const handleAddToCart = (product) => addToCart(product);
//   const handleBuyNow = (product) => { addToCart(product); router.push('/cart'); };
  
//   const clearSearchAndFilters = () => { 
//     setSelectedCategory('All');
//     setSelectedBrand('All');
//     setMaxPrice(200000);
//     setSortBy('featured');
//     if(urlSearchQuery) router.push('/'); 
//   };

//   // 🚀 EXTRACTED FILTER CONTENT TO REUSE IN DESKTOP AND MOBILE
//   const FilterOptions = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="font-bold text-[14px] mb-2 text-[#111]">Category</h3>
//         <ul className="space-y-1.5">
//           {uniqueCategories.map(cat => (
//             <li key={cat}>
//               <button 
//                 onClick={() => setSelectedCategory(cat)} 
//                 className={`text-[13px] text-left w-full hover:text-[#c45500] ${selectedCategory === cat ? 'font-bold text-[#e77600]' : 'text-[#111]'}`}
//               >
//                 {cat}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="pt-4 border-t border-[#ddd]">
//         <h3 className="font-bold text-[14px] mb-2 text-[#111]">Brand</h3>
//         <ul className="space-y-2">
//           {uniqueBrands.map(brand => (
//             <li key={brand} className="flex items-center gap-2">
//               <input 
//                 type="checkbox" 
//                 id={`brand-${brand}`}
//                 checked={selectedBrand === brand}
//                 onChange={() => setSelectedBrand(selectedBrand === brand ? 'All' : brand)}
//                 className="w-4 h-4 accent-[#007185] cursor-pointer"
//               />
//               <label htmlFor={`brand-${brand}`} className="text-[13px] cursor-pointer hover:text-[#c45500] text-[#111]">{brand}</label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="pt-4 border-t border-[#ddd]">
//         <h3 className="font-bold text-[14px] mb-2 text-[#111]">Price</h3>
//         <div className="flex flex-col">
//           <input 
//             type="range" min="1000" max="200000" step="1000" value={maxPrice} 
//             onChange={(e) => setMaxPrice(Number(e.target.value))} 
//             className="w-full h-1 bg-[#D5D9D9] rounded-lg appearance-none cursor-pointer accent-[#007185] mb-2" 
//           />
//           <span className="text-[13px] text-[#111]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F0F2F2] font-sans text-[#111]">
      
//       {/* HERO BANNER */}
//       {!urlSearchQuery && dynamicBanners.length > 0 && (
//         <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] overflow-hidden bg-white border-b border-[#ddd]">
//           {dynamicBanners.map((slide, index) => (
//             <div 
//               key={slide._id || index} 
//               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//             >
//               {slide.link && slide.link !== '/' ? (
//                 <Link href={slide.link} className="block w-full h-full">
//                   <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover" />
//                 </Link>
//               ) : (
//                 <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover" />
//               )}
//             </div>
//           ))}
//           {/* Controls */}
//           {dynamicBanners.length > 1 && (
//             <div className="absolute inset-0 w-full flex justify-between items-center px-4 z-20 pointer-events-none">
//               <button onClick={() => setCurrentSlide(prev => prev === 0 ? dynamicBanners.length - 1 : prev - 1)} className="pointer-events-auto bg-white/20 hover:bg-white/40 p-4 rounded text-white transition-all">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
//               </button>
//               <button onClick={() => setCurrentSlide(prev => prev === dynamicBanners.length - 1 ? 0 : prev + 1)} className="pointer-events-auto bg-white/20 hover:bg-white/40 p-4 rounded text-white transition-all">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* DESKTOP SEARCH RESULTS HEADER */}
//       {urlSearchQuery && (
//         <div className="hidden lg:block bg-white border-b border-[#ddd] py-3 px-6 mb-4 shadow-sm">
//           <div className="max-w-[1500px] mx-auto text-[14px]">
//             <span className="text-[#565959]">1-{sortedProducts.length} of over {filteredProducts.length} results for </span> 
//             <span className="text-[#c45500] font-bold">"{searchParams.get('search')}"</span>
//             <button onClick={clearSearchAndFilters} className="ml-4 text-[#007185] hover:text-[#c45500] hover:underline border-l border-gray-300 pl-4 font-medium">Clear all</button>
//           </div>
//         </div>
//       )}

//       {/* MAIN CONTENT GRID */}
//       <div className="flex flex-col lg:flex-row max-w-[1500px] mx-auto px-4 sm:px-6 gap-6 py-4 lg:py-6">
        
//         {/* 🚀 MOBILE FILTER & SORT BAR (Visible only on small screens) */}
//         <div className="lg:hidden flex gap-2 w-full sticky top-0 z-30 bg-[#F0F2F2] py-2">
//           <button 
//             onClick={() => setIsMobileFilterOpen(true)}
//             className="flex-1 bg-white border border-[#D5D9D9] py-2 rounded-[8px] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] text-[14px] font-bold text-[#0F1111] flex justify-center items-center gap-2"
//           >
//             Filters {(selectedCategory !== 'All' || selectedBrand !== 'All') && <span className="bg-[#007185] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">1</span>}
//           </button>
//           <select 
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="flex-1 bg-white border border-[#D5D9D9] py-2 px-3 rounded-[8px] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] text-[14px] font-bold text-[#0F1111] outline-none"
//           >
//             <option value="featured">Sort: Featured</option>
//             <option value="price_low">Price: Low to High</option>
//             <option value="price_high">Price: High to Low</option>
//             <option value="rating">Avg. Customer Review</option>
//           </select>
//         </div>

//         {/* 🚀 DESKTOP LEFT SIDEBAR */}
//         <aside className="hidden lg:block w-[240px] shrink-0">
//           <FilterOptions />
//         </aside>

//         {/* 🚀 MOBILE FILTER MODAL / SLIDE OVER */}
//         {isMobileFilterOpen && (
//           <div className="fixed inset-0 z-[200] flex lg:hidden">
//             {/* Backdrop */}
//             <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={() => setIsMobileFilterOpen(false)}></div>
            
//             {/* Sliding Panel */}
//             <div className="relative w-[85%] max-w-[350px] bg-white h-full shadow-2xl flex flex-col ml-auto animate-in slide-in-from-right duration-300">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd] flex justify-between items-center">
//                 <h2 className="font-bold text-[18px]">Filters</h2>
//                 <button onClick={() => setIsMobileFilterOpen(false)} className="text-2xl text-[#111] leading-none">✕</button>
//               </div>
              
//               <div className="flex-1 overflow-y-auto p-5">
//                 <FilterOptions />
//               </div>

//               <div className="p-4 border-t border-[#ddd] bg-white flex gap-3 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
//                 <button 
//                   onClick={clearSearchAndFilters} 
//                   className="w-1/3 bg-white border border-[#D5D9D9] py-2 rounded-[8px] text-[14px] font-medium"
//                 >
//                   Clear
//                 </button>
//                 <button 
//                   onClick={() => setIsMobileFilterOpen(false)} 
//                   className="flex-1 bg-[#FFD814] border border-[#FCD200] py-2 rounded-[8px] text-[14px] font-bold"
//                 >
//                   Show {sortedProducts.length} Results
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MAIN PRODUCT GRID */}
//         <main className="flex-1">
//           {/* Desktop Sort Header */}
//           <div className="hidden lg:flex justify-between items-center mb-4">
//             <h1 className="text-[20px] font-bold text-[#0F1111]">
//               {urlSearchQuery ? 'Results' : 'Recommended for you'}
//             </h1>
//             <div className="flex items-center gap-2">
//               <label className="text-[13px] text-[#565959]">Sort by:</label>
//               <select 
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="bg-[#F0F2F2] border border-[#D5D9D9] py-1 px-2 rounded-[8px] text-[13px] outline-none shadow-sm cursor-pointer hover:bg-[#E3E6E6]"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//                 <option value="rating">Avg. Customer Review</option>
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {sortedProducts.map(product => (
//                   <ProductCard 
//                     key={product._id} 
//                     product={product} 
//                     onAddToCart={handleAddToCart} 
//                     onBuyNow={handleBuyNow} 
//                     getImageUrl={getImageUrl} 
//                   />
//                 ))}
//               </div>
//               {sortedProducts.length === 0 && (
//                 <div className="bg-white p-10 text-center border border-[#ddd] rounded mt-4">
//                    <p className="text-lg font-bold text-[#111]">No results found.</p>
//                    <p className="text-sm text-[#565959] mt-1">Try adjusting your filters or search terms.</p>
//                    <button onClick={clearSearchAndFilters} className="mt-4 text-[#007185] hover:underline">Clear all filters</button>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default function AdvancedStoreDashboard() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
//       <StoreContent />
//     </Suspense>
//   );
// }



// // src/app/page.jsx
// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';
// import { useSearchParams, useRouter } from 'next/navigation';

// // --- 🎨 AUTHENTIC AMAZON PRODUCT CARD ---
// const ProductCard = ({ product, onAddToCart, onBuyNow, getImageUrl }) => (
//   <div className="bg-white flex flex-col relative z-10 p-4 h-full border border-[#ddd] rounded-[4px] hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow">
//     {/* Best Seller Badge */}
//     {product.isBestSeller && (
//       <div className="absolute top-0 left-0 bg-[#e77600] text-white text-[11px] px-2 py-1 font-bold z-20 rounded-tl-[3px] rounded-br-[3px]">
//         Best Seller
//       </div>
//     )}

//     {/* Image Container */}
//     <Link href={`/product/${product._id}`} className="block relative h-52 w-full mb-4 z-10 p-2">
//       <img 
//         src={getImageUrl(product.images?.[0])} 
//         alt={product.name} 
//         className="w-full h-full object-contain mix-blend-multiply" 
//       />
//     </Link>

//     {/* Content */}
//     <div className="flex flex-col flex-1">
//       <Link href={`/product/${product._id}`}>
//         <h2 className="text-[14px] leading-snug font-medium text-[#007185] hover:text-[#C45500] hover:underline line-clamp-4 mb-1">
//           {product.brand && <span className="font-bold mr-1 text-[#111]">{product.brand}</span>}
//           {product.name}
//         </h2>
//       </Link>
      
//       {/* Ratings */}
//       <div className="flex items-center gap-1 mb-2">
//         <span className="text-[#FFA41C] text-[15px]">
//           {'★'.repeat(Math.floor(product.ratings || 5))}{'☆'.repeat(5 - Math.floor(product.ratings || 5))}
//         </span>
//         <span className="text-[#007185] text-[13px] hover:text-[#C45500] hover:underline cursor-pointer ml-1">
//           {product.numOfReviews || 0}
//         </span>
//       </div>

//       {/* Price */}
//       <div className="mt-auto">
//         <div className="flex items-baseline gap-1">
//           <span className="text-[24px] font-normal text-[#111]">
//             <span className="text-[13px] align-top relative top-1.5 mr-0.5">₹</span>
//             {product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price?.toLocaleString('en-IN')}
//           </span>
//         </div>
//         {product.discountPrice && (
//           <div className="text-[12px] text-[#565959] mb-4">
//             M.R.P: <span className="line-through">₹{product.price?.toLocaleString('en-IN')}</span> 
//             <span className="ml-1">({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off)</span>
//           </div>
//         )}
        
//         <div className="flex flex-col gap-2 mt-4">
//           <button 
//             onClick={(e) => { e.preventDefault(); onAddToCart(product); }} 
//             className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[6px] text-[13px] text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
//           >
//             Add to cart
//           </button>
//           <button 
//             onClick={(e) => { e.preventDefault(); onBuyNow(product); }} 
//             className="w-full bg-[#FFA41C] hover:bg-[#FF9900] border border-[#FF8F00] rounded-full py-[6px] text-[13px] text-[#111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- SKELETON LOADER ---
// const SkeletonCard = () => (
//   <div className="animate-pulse flex flex-col bg-white border border-[#ddd] p-4 h-[420px] rounded-[4px]">
//     <div className="bg-gray-200 h-52 w-full mb-4"></div>
//     <div className="bg-gray-200 h-3 w-full mb-2"></div>
//     <div className="bg-gray-200 h-3 w-2/3 mb-4"></div>
//     <div className="bg-gray-200 h-8 w-1/3 mt-auto mb-4"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full mb-2"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full"></div>
//   </div>
// );

// function StoreContent() {
//   const [products, setProducts] = useState([]);
//   const [dynamicBanners, setDynamicBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart } = useCart();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const urlSearchQuery = searchParams.get('search')?.toLowerCase() || '';

//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // 🚀 NEW MOBILE & SORT STATES
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState('featured');

//   // 🚀 BULLETPROOF CLOUDINARY IMAGE FIX
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
    
//     // If it's already an HTTP link (like Cloudinary), return it directly without modifying it!
//     if (imagePath.startsWith('http')) {
//         return imagePath;
//     }
    
//     // Fallback for old local images
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
//       try {
//         const prodRes = await axios.get(`${apiUrl}/products`);
//         setProducts(prodRes.data);
//       } catch (err) { setProducts([]); }

//       try {
//         const bannerRes = await axios.get(`${apiUrl}/banners`);
//         setDynamicBanners(bannerRes.data);
//       } catch (err) { setDynamicBanners([]); } finally { setLoading(false); }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (dynamicBanners.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev === dynamicBanners.length - 1 ? 0 : prev + 1));
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [dynamicBanners.length]);

//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   // 🚀 1. Apply Filters
//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const matchPrice = (product.discountPrice || product.price) <= maxPrice;
//     const matchSearch = urlSearchQuery === '' || product.name.toLowerCase().includes(urlSearchQuery) || (product.brand && product.brand.toLowerCase().includes(urlSearchQuery));
//     return matchCategory && matchBrand && matchPrice && matchSearch;
//   });

//   // 🚀 2. Apply Sorting
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     const priceA = a.discountPrice || a.price;
//     const priceB = b.discountPrice || b.price;
//     if (sortBy === 'price_low') return priceA - priceB;
//     if (sortBy === 'price_high') return priceB - priceA;
//     if (sortBy === 'rating') return (b.ratings || 0) - (a.ratings || 0);
//     return 0; // featured
//   });

//   const handleAddToCart = (product) => addToCart(product);
//   const handleBuyNow = (product) => { addToCart(product); router.push('/cart'); };
  
//   const clearSearchAndFilters = () => { 
//     setSelectedCategory('All');
//     setSelectedBrand('All');
//     setMaxPrice(200000);
//     setSortBy('featured');
//     if(urlSearchQuery) router.push('/'); 
//   };

//   // 🚀 EXTRACTED FILTER CONTENT TO REUSE IN DESKTOP AND MOBILE
//   const FilterOptions = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="font-bold text-[14px] mb-2 text-[#111]">Category</h3>
//         <ul className="space-y-1.5">
//           {uniqueCategories.map(cat => (
//             <li key={cat}>
//               <button 
//                 onClick={() => setSelectedCategory(cat)} 
//                 className={`text-[13px] text-left w-full hover:text-[#c45500] ${selectedCategory === cat ? 'font-bold text-[#e77600]' : 'text-[#111]'}`}
//               >
//                 {cat}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="pt-4 border-t border-[#ddd]">
//         <h3 className="font-bold text-[14px] mb-2 text-[#111]">Brand</h3>
//         <ul className="space-y-2">
//           {uniqueBrands.map(brand => (
//             <li key={brand} className="flex items-center gap-2">
//               <input 
//                 type="checkbox" 
//                 id={`brand-${brand}`}
//                 checked={selectedBrand === brand}
//                 onChange={() => setSelectedBrand(selectedBrand === brand ? 'All' : brand)}
//                 className="w-4 h-4 accent-[#007185] cursor-pointer"
//               />
//               <label htmlFor={`brand-${brand}`} className="text-[13px] cursor-pointer hover:text-[#c45500] text-[#111]">{brand}</label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="pt-4 border-t border-[#ddd]">
//         <h3 className="font-bold text-[14px] mb-2 text-[#111]">Price</h3>
//         <div className="flex flex-col">
//           <input 
//             type="range" min="1000" max="200000" step="1000" value={maxPrice} 
//             onChange={(e) => setMaxPrice(Number(e.target.value))} 
//             className="w-full h-1 bg-[#D5D9D9] rounded-lg appearance-none cursor-pointer accent-[#007185] mb-2" 
//           />
//           <span className="text-[13px] text-[#111]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F0F2F2] font-sans text-[#111]">
      
//       {/* HERO BANNER */}
//       {!urlSearchQuery && dynamicBanners.length > 0 && (
//         <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] overflow-hidden bg-white border-b border-[#ddd]">
//           {dynamicBanners.map((slide, index) => (
//             <div 
//               key={slide._id || index} 
//               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//             >
//               {slide.link && slide.link !== '/' ? (
//                 <Link href={slide.link} className="block w-full h-full">
//                   <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover" />
//                 </Link>
//               ) : (
//                 <img src={getImageUrl(slide.image)} alt="Banner" className="w-full h-full object-cover" />
//               )}
//             </div>
//           ))}
//           {/* Controls */}
//           {dynamicBanners.length > 1 && (
//             <div className="absolute inset-0 w-full flex justify-between items-center px-4 z-20 pointer-events-none">
//               <button onClick={() => setCurrentSlide(prev => prev === 0 ? dynamicBanners.length - 1 : prev - 1)} className="pointer-events-auto bg-white/20 hover:bg-white/40 p-4 rounded text-white transition-all">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
//               </button>
//               <button onClick={() => setCurrentSlide(prev => prev === dynamicBanners.length - 1 ? 0 : prev + 1)} className="pointer-events-auto bg-white/20 hover:bg-white/40 p-4 rounded text-white transition-all">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* DESKTOP SEARCH RESULTS HEADER */}
//       {urlSearchQuery && (
//         <div className="hidden lg:block bg-white border-b border-[#ddd] py-3 px-6 mb-4 shadow-sm">
//           <div className="max-w-[1500px] mx-auto text-[14px]">
//             <span className="text-[#565959]">1-{sortedProducts.length} of over {filteredProducts.length} results for </span> 
//             <span className="text-[#c45500] font-bold">"{searchParams.get('search')}"</span>
//             <button onClick={clearSearchAndFilters} className="ml-4 text-[#007185] hover:text-[#c45500] hover:underline border-l border-gray-300 pl-4 font-medium">Clear all</button>
//           </div>
//         </div>
//       )}

//       {/* MAIN CONTENT GRID */}
//       <div className="flex flex-col lg:flex-row max-w-[1500px] mx-auto px-4 sm:px-6 gap-6 py-4 lg:py-6">
        
//         {/* 🚀 MOBILE FILTER & SORT BAR (Visible only on small screens) */}
//         <div className="lg:hidden flex gap-2 w-full sticky top-0 z-30 bg-[#F0F2F2] py-2">
//           <button 
//             onClick={() => setIsMobileFilterOpen(true)}
//             className="flex-1 bg-white border border-[#D5D9D9] py-2 rounded-[8px] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] text-[14px] font-bold text-[#0F1111] flex justify-center items-center gap-2"
//           >
//             Filters {(selectedCategory !== 'All' || selectedBrand !== 'All') && <span className="bg-[#007185] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">1</span>}
//           </button>
//           <select 
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="flex-1 bg-white border border-[#D5D9D9] py-2 px-3 rounded-[8px] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] text-[14px] font-bold text-[#0F1111] outline-none"
//           >
//             <option value="featured">Sort: Featured</option>
//             <option value="price_low">Price: Low to High</option>
//             <option value="price_high">Price: High to Low</option>
//             <option value="rating">Avg. Customer Review</option>
//           </select>
//         </div>

//         {/* 🚀 DESKTOP LEFT SIDEBAR */}
//         <aside className="hidden lg:block w-[240px] shrink-0">
//           <FilterOptions />
//         </aside>

//         {/* 🚀 MOBILE FILTER MODAL / SLIDE OVER */}
//         {isMobileFilterOpen && (
//           <div className="fixed inset-0 z-[200] flex lg:hidden">
//             {/* Backdrop */}
//             <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={() => setIsMobileFilterOpen(false)}></div>
            
//             {/* Sliding Panel */}
//             <div className="relative w-[85%] max-w-[350px] bg-white h-full shadow-2xl flex flex-col ml-auto animate-in slide-in-from-right duration-300">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd] flex justify-between items-center">
//                 <h2 className="font-bold text-[18px]">Filters</h2>
//                 <button onClick={() => setIsMobileFilterOpen(false)} className="text-2xl text-[#111] leading-none">✕</button>
//               </div>
              
//               <div className="flex-1 overflow-y-auto p-5">
//                 <FilterOptions />
//               </div>

//               <div className="p-4 border-t border-[#ddd] bg-white flex gap-3 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
//                 <button 
//                   onClick={clearSearchAndFilters} 
//                   className="w-1/3 bg-white border border-[#D5D9D9] py-2 rounded-[8px] text-[14px] font-medium"
//                 >
//                   Clear
//                 </button>
//                 <button 
//                   onClick={() => setIsMobileFilterOpen(false)} 
//                   className="flex-1 bg-[#FFD814] border border-[#FCD200] py-2 rounded-[8px] text-[14px] font-bold"
//                 >
//                   Show {sortedProducts.length} Results
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MAIN PRODUCT GRID */}
//         <main className="flex-1">
//           {/* Desktop Sort Header */}
//           <div className="hidden lg:flex justify-between items-center mb-4">
//             <h1 className="text-[20px] font-bold text-[#0F1111]">
//               {urlSearchQuery ? 'Results' : 'Recommended for you'}
//             </h1>
//             <div className="flex items-center gap-2">
//               <label className="text-[13px] text-[#565959]">Sort by:</label>
//               <select 
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="bg-[#F0F2F2] border border-[#D5D9D9] py-1 px-2 rounded-[8px] text-[13px] outline-none shadow-sm cursor-pointer hover:bg-[#E3E6E6]"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//                 <option value="rating">Avg. Customer Review</option>
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {sortedProducts.map(product => (
//                   <ProductCard 
//                     key={product._id} 
//                     product={product} 
//                     onAddToCart={handleAddToCart} 
//                     onBuyNow={handleBuyNow} 
//                     getImageUrl={getImageUrl} 
//                   />
//                 ))}
//               </div>
//               {sortedProducts.length === 0 && (
//                 <div className="bg-white p-10 text-center border border-[#ddd] rounded mt-4">
//                    <p className="text-lg font-bold text-[#111]">No results found.</p>
//                    <p className="text-sm text-[#565959] mt-1">Try adjusting your filters or search terms.</p>
//                    <button onClick={clearSearchAndFilters} className="mt-4 text-[#007185] hover:underline">Clear all filters</button>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default function AdvancedStoreDashboard() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
//       <StoreContent />
//     </Suspense>
//   );
// }



// src/app/page.jsx
// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import Link from 'next/link';
// import { useSearchParams, useRouter } from 'next/navigation';

// // --- 🎨 AUTHENTIC AMAZON PRODUCT CARD ---
// const ProductCard = ({ product, onAddToCart, onBuyNow, getImageUrl }) => (
//   <div className="bg-white flex flex-col relative z-10 p-4 h-full rounded-[4px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[0_2px_5px_0_rgba(0,0,0,0.15)] border border-[#E7E7E7] hover:border-[#D5D9D9] transition-all">
//     {/* Best Seller Badge */}
//     {product.isBestSeller && (
//       <div className="absolute top-0 left-0 bg-[#e77600] text-white text-[11px] px-2 py-1 font-bold z-20 rounded-tl-[3px] rounded-br-[3px] shadow-sm">
//         Best seller
//       </div>
//     )}

//     {/* Image Container */}
//     <Link href={`/product/${product._id}`} className="block relative h-[180px] sm:h-[200px] w-full mb-4 z-10 flex items-center justify-center overflow-hidden bg-[#F8F8F8] rounded-sm p-2">
//       <img 
//         src={getImageUrl(product.images?.[0])} 
//         alt={product.name} 
//         className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105" 
//       />
//     </Link>

//     {/* Content */}
//     <div className="flex flex-col flex-1">
//       <Link href={`/product/${product._id}`}>
//         <h2 className="text-[15px] sm:text-[16px] leading-snug font-medium text-[#0F1111] hover:text-[#C45500] hover:underline line-clamp-2 mb-1">
//           {product.brand && <span className="font-bold mr-1 text-[#0F1111]">{product.brand}</span>}
//           {product.name}
//         </h2>
//       </Link>
      
//       {/* Ratings */}
//       <div className="flex items-center gap-1 mb-1">
//         <span className="text-[#DE7921] text-[16px] sm:text-[18px] leading-none">
//           {'★'.repeat(Math.floor(product.ratings || 5))}{'☆'.repeat(5 - Math.floor(product.ratings || 5))}
//         </span>
//         <span className="text-[#007185] text-[12px] sm:text-[13px] hover:text-[#C45500] hover:underline cursor-pointer ml-1">
//           {product.numOfReviews || 0}
//         </span>
//       </div>

//       {/* Price */}
//       <div className="mt-auto pt-2">
//         <div className="flex items-baseline gap-1">
//           <span className="text-[24px] sm:text-[28px] font-medium text-[#0F1111] tracking-[-0.5px] leading-none">
//             <span className="text-[12px] sm:text-[13px] font-normal align-top relative top-[-6px] sm:top-[-8px] mr-0.5">₹</span>
//             {product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price?.toLocaleString('en-IN')}
//           </span>
//         </div>
//         {product.discountPrice && (
//           <div className="text-[11px] sm:text-[12px] text-[#565959] mt-1 mb-2">
//             M.R.P: <span className="line-through">₹{product.price?.toLocaleString('en-IN')}</span> 
//             <span className="ml-1 text-[#111]">({Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off)</span>
//           </div>
//         )}

//         <div className="text-[11px] sm:text-[12px] text-[#0F1111] mt-1 mb-4">
//           FREE Delivery by <span className="font-bold">Amazon Smarts</span>
//         </div>
        
//         {/* 🚀 RESTORED: Add to Cart & Buy Now Buttons */}
//         <div className="flex flex-col gap-2 mt-2">
//           <button 
//             onClick={(e) => { e.preventDefault(); onAddToCart(product); }} 
//             className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[7px] text-[13px] font-medium text-[#0F1111] shadow-sm transition-colors cursor-pointer"
//           >
//             Add to cart
//           </button>
//           <button 
//             onClick={(e) => { e.preventDefault(); onBuyNow(product); }} 
//             className="w-full bg-[#FFA41C] hover:bg-[#FF9900] border border-[#FF8F00] rounded-full py-[7px] text-[13px] font-medium text-[#0F1111] shadow-sm transition-colors cursor-pointer"
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const SkeletonCard = () => (
//   <div className="animate-pulse flex flex-col bg-white border border-[#E7E7E7] p-4 h-[450px] rounded-[4px] shadow-sm">
//     <div className="bg-gray-200 h-[200px] w-full mb-4 rounded-sm"></div>
//     <div className="bg-gray-200 h-4 w-full mb-2"></div>
//     <div className="bg-gray-200 h-4 w-2/3 mb-4"></div>
//     <div className="bg-gray-200 h-8 w-1/3 mt-auto mb-4"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full mb-2"></div>
//     <div className="bg-gray-200 h-8 w-full rounded-full"></div>
//   </div>
// );

// function StoreContent() {
//   const [products, setProducts] = useState([]);
//   const [dynamicBanners, setDynamicBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const { addToCart } = useCart();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const urlSearchQuery = searchParams.get('search')?.toLowerCase() || '';

//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedBrand, setSelectedBrand] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(200000);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState('featured');

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400/e2e8f0/64748b?text=No+Image';
//     if (imagePath.startsWith('http')) return imagePath;
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//       try {
//         const prodRes = await axios.get(`${apiUrl}/products`);
//         setProducts(prodRes.data);
//       } catch (err) { setProducts([]); }

//       try {
//         const bannerRes = await axios.get(`${apiUrl}/banners`);
//         setDynamicBanners(bannerRes.data);
//       } catch (err) { setDynamicBanners([]); } finally { setLoading(false); }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (dynamicBanners.length > 1) {
//       const timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev === dynamicBanners.length - 1 ? 0 : prev + 1));
//       }, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [dynamicBanners.length]);

//   const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
//   const uniqueBrands = ['All', ...new Set(products.map(p => p.brand || 'Generic'))];

//   const filteredProducts = products.filter(product => {
//     const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchBrand = selectedBrand === 'All' || (product.brand || 'Generic') === selectedBrand;
//     const matchPrice = (product.discountPrice || product.price) <= maxPrice;
//     const matchSearch = urlSearchQuery === '' || product.name.toLowerCase().includes(urlSearchQuery) || (product.brand && product.brand.toLowerCase().includes(urlSearchQuery));
//     return matchCategory && matchBrand && matchPrice && matchSearch;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     const priceA = a.discountPrice || a.price;
//     const priceB = b.discountPrice || b.price;
//     if (sortBy === 'price_low') return priceA - priceB;
//     if (sortBy === 'price_high') return priceB - priceA;
//     if (sortBy === 'rating') return (b.ratings || 0) - (a.ratings || 0);
//     return 0;
//   });

//   // 🚀 Added Buy Now Handler
//   const handleAddToCart = (product) => addToCart(product);
//   const handleBuyNow = (product) => { addToCart(product); router.push('/cart'); };
  
//   const clearSearchAndFilters = () => { 
//     setSelectedCategory('All');
//     setSelectedBrand('All');
//     setMaxPrice(200000);
//     setSortBy('featured');
//     if(urlSearchQuery) router.push('/'); 
//   };

//   // 🚀 Best Sellers Logic
//   const bestSellers = products.filter(p => p.isBestSeller);

//   const FilterOptions = () => (
//     <div className="space-y-6 pr-2">
//       <div>
//         <h3 className="font-bold text-[14px] mb-2 text-[#0F1111]">Department</h3>
//         <ul className="space-y-1.5 ml-1">
//           {uniqueCategories.map(cat => (
//             <li key={cat}>
//               <button 
//                 onClick={() => setSelectedCategory(cat)} 
//                 className={`text-[14px] text-left w-full hover:text-[#C45500] ${selectedCategory === cat ? 'font-bold text-[#0F1111]' : 'text-[#0F1111]'}`}
//               >
//                 {selectedCategory === cat && <span className="text-[#C45500] mr-1 text-xs">❮</span>}
//                 {cat}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h3 className="font-bold text-[14px] mb-3 text-[#0F1111]">Brands</h3>
//         <ul className="space-y-2">
//           {uniqueBrands.filter(b => b !== 'All').map(brand => (
//             <li key={brand} className="flex items-center gap-2 group">
//               <input 
//                 type="checkbox" 
//                 id={`brand-${brand}`}
//                 checked={selectedBrand === brand}
//                 onChange={() => setSelectedBrand(selectedBrand === brand ? 'All' : brand)}
//                 className="w-4 h-4 accent-[#007185] cursor-pointer rounded-[3px] border-[#888c8c] group-hover:border-[#007185] transition-colors"
//               />
//               <label htmlFor={`brand-${brand}`} className="text-[14px] cursor-pointer hover:text-[#C45500] text-[#0F1111]">{brand}</label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h3 className="font-bold text-[14px] mb-3 text-[#0F1111]">Price</h3>
//         <div className="flex flex-col">
//           <input 
//             type="range" min="1000" max="200000" step="1000" value={maxPrice} 
//             onChange={(e) => setMaxPrice(Number(e.target.value))} 
//             className="w-full h-1 bg-[#D5D9D9] rounded-lg appearance-none cursor-pointer accent-[#007185] mb-3" 
//           />
//           <span className="text-[14px] text-[#0F1111]">Under ₹{maxPrice.toLocaleString('en-IN')}</span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#EAEDED] font-sans text-[#0F1111]">
      
//       {/* 🚀 SUPER-WIDE AMAZON HERO BANNER */}
//       {!urlSearchQuery && dynamicBanners.length > 0 && (
//         <div className="relative w-full h-[250px] sm:h-[450px] lg:h-[600px] overflow-hidden bg-[#EAEDED]">
//           {dynamicBanners.map((slide, index) => (
//             <div 
//               key={slide._id || index} 
//               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//             >
//               {slide.link && slide.link !== '/' ? (
//                 <Link href={slide.link} className="block w-full h-full">
//                   <img 
//                     src={getImageUrl(slide.image)} 
//                     alt="Banner" 
//                     className="w-full h-full object-cover object-top" 
//                     style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }} 
//                   />
//                 </Link>
//               ) : (
//                 <img 
//                   src={getImageUrl(slide.image)} 
//                   alt="Banner" 
//                   className="w-full h-full object-cover object-top" 
//                   style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }} 
//                 />
//               )}
//             </div>
//           ))}

//           {/* Controls */}
//           {dynamicBanners.length > 1 && (
//             <div className="absolute top-[30%] lg:top-[30%] w-full flex justify-between items-center px-2 sm:px-10 z-30 pointer-events-none">
//               <button onClick={() => setCurrentSlide(prev => prev === 0 ? dynamicBanners.length - 1 : prev - 1)} className="pointer-events-auto focus:outline-none focus:ring-4 focus:ring-[#007185] rounded-md transition-all">
//                 <svg className="w-8 sm:w-10 h-12 sm:h-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-[#0F1111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
//               </button>
//               <button onClick={() => setCurrentSlide(prev => prev === dynamicBanners.length - 1 ? 0 : prev + 1)} className="pointer-events-auto focus:outline-none focus:ring-4 focus:ring-[#007185] rounded-md transition-all">
//                 <svg className="w-8 sm:w-10 h-12 sm:h-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-[#0F1111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* SEARCH RESULTS HEADER */}
//       {urlSearchQuery && (
//         <div className="bg-white border-b border-[#D5D9D9] py-2 px-4 shadow-sm mb-4">
//           <div className="max-w-[1600px] mx-auto text-[14px] px-2">
//             <span className="text-[#0F1111] font-bold">1-{sortedProducts.length} of over {filteredProducts.length} results for </span> 
//             <span className="text-[#C45500] font-bold">"{searchParams.get('search')}"</span>
//             <button onClick={clearSearchAndFilters} className="ml-4 text-[#007185] hover:text-[#C45500] hover:underline border-l border-[#D5D9D9] pl-4 font-medium">Clear all filters</button>
//           </div>
//         </div>
//       )}

//       {/* 🚀 MAIN CONTENT GRID - Responsive alignment fixed */}
//       <div className={`flex flex-col lg:flex-row max-w-[1600px] mx-auto px-4 sm:px-6 gap-6 pb-12 relative z-30 ${!urlSearchQuery && dynamicBanners.length > 0 ? '-mt-[50px] sm:-mt-[150px] lg:-mt-[250px] xl:-mt-[300px]' : 'pt-4'}`}>
        
//         {/* MOBILE FILTER & SORT BAR */}
//         <div className="lg:hidden flex gap-2 w-full sticky top-[60px] z-40 bg-[#EAEDED] py-2">
//           <button 
//             onClick={() => setIsMobileFilterOpen(true)}
//             className="flex-1 bg-white border border-[#D5D9D9] py-2.5 rounded-[8px] shadow-sm text-[14px] font-medium text-[#0F1111] flex justify-center items-center gap-2"
//           >
//             Filters {(selectedCategory !== 'All' || selectedBrand !== 'All') && <span className="text-[#007185] font-bold">1</span>}
//           </button>
//           <select 
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="flex-1 bg-white border border-[#D5D9D9] py-2.5 px-3 rounded-[8px] shadow-sm text-[14px] font-medium text-[#0F1111] outline-none"
//           >
//             <option value="featured">Sort by: Featured</option>
//             <option value="price_low">Price: Low to High</option>
//             <option value="price_high">Price: High to Low</option>
//             <option value="rating">Avg. Review</option>
//           </select>
//         </div>

//         {/* 🚀 DESKTOP LEFT SIDEBAR */}
//         <aside className="hidden lg:block w-[240px] shrink-0">
//           <div className="sticky top-[80px] z-10 self-start">
//             {urlSearchQuery || selectedCategory !== 'All' || selectedBrand !== 'All' ? (
//               <div className="bg-white p-5 rounded-[4px] shadow-sm border border-[#D5D9D9]">
//                 <FilterOptions />
//               </div>
//             ) : (
//               <div className="bg-white p-5 rounded-[4px] shadow-sm border border-[#D5D9D9]">
//                 <h3 className="font-bold text-[16px] mb-4 text-[#0F1111]">Refine Your Search</h3>
//                 <FilterOptions />
//               </div>
//             )}
//           </div>
//         </aside>

//         {/* MOBILE FILTER MODAL */}
//         {isMobileFilterOpen && (
//           <div className="fixed inset-0 z-[200] flex lg:hidden">
//             <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={() => setIsMobileFilterOpen(false)}></div>
//             <div className="relative w-[85%] max-w-[350px] bg-white h-full shadow-2xl flex flex-col ml-auto animate-in slide-in-from-right duration-300">
//               <div className="bg-[#F0F2F2] p-4 border-b border-[#D5D9D9] flex justify-between items-center">
//                 <h2 className="font-bold text-[18px]">Filters</h2>
//                 <button onClick={() => setIsMobileFilterOpen(false)} className="text-2xl text-[#0F1111] leading-none">✕</button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-5"><FilterOptions /></div>
//               <div className="p-4 border-t border-[#D5D9D9] bg-white flex gap-3 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
//                 <button onClick={clearSearchAndFilters} className="w-1/3 bg-white border border-[#D5D9D9] py-2 rounded-full text-[14px] font-medium shadow-sm">Clear</button>
//                 <button onClick={() => setIsMobileFilterOpen(false)} className="flex-1 bg-[#FFD814] border border-[#FCD200] py-2 rounded-full text-[14px] font-normal shadow-sm">Show {sortedProducts.length} Results</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MAIN PRODUCT GRID & BEST SELLERS */}
//         <main className="flex-1 min-w-0">
          
//           {/* 🚀 BEST SELLERS SECTION (Only shows on homepage without active filters) */}
//           {!urlSearchQuery && selectedCategory === 'All' && selectedBrand === 'All' && bestSellers.length > 0 && (
//             <div className="bg-white p-4 sm:p-5 rounded-[4px] shadow-sm border border-[#D5D9D9] mb-6">
//               <h2 className="text-[20px] font-bold text-[#0F1111] mb-4">Best Sellers in Tech & Gadgets</h2>
//               <div className="flex gap-4 overflow-x-auto pb-4 snap-x custom-scrollbar">
//                 {bestSellers.map(product => (
//                   <div key={`bs-${product._id}`} className="snap-start shrink-0 w-[200px] sm:w-[240px]">
//                     <ProductCard product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} getImageUrl={getImageUrl} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Desktop Sort Header */}
//           <div className="hidden lg:flex justify-end items-start mb-4 h-[34px]">
//             <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-white shadow-sm border border-[#D5D9D9] hover:bg-[#F7F8F8] transition-colors cursor-pointer">
//               <label className="text-[13px] text-[#0F1111] font-normal cursor-pointer">Sort by:</label>
//               <select 
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="bg-transparent text-[13px] font-bold outline-none cursor-pointer text-[#0F1111] focus:ring-0"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price_low">Price: Low to High</option>
//                 <option value="price_high">Price: High to Low</option>
//                 <option value="rating">Avg. Customer Review</option>
//               </select>
//             </div>
//           </div>

//           {/* 🚀 RESPONSIVE GRID: 1 col on small phones, 2 on phablets, 3 on large screens, 4 on XL */}
//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
//                 {sortedProducts.map(product => (
//                   <ProductCard 
//                     key={product._id} 
//                     product={product} 
//                     onAddToCart={handleAddToCart} 
//                     onBuyNow={handleBuyNow}
//                     getImageUrl={getImageUrl} 
//                   />
//                 ))}
//               </div>
//               {sortedProducts.length === 0 && (
//                 <div className="bg-white p-10 text-center border border-[#D5D9D9] rounded-[4px] mt-4 shadow-sm">
//                    <p className="text-lg font-bold text-[#0F1111]">No results found.</p>
//                    <p className="text-sm text-[#565959] mt-1">Try adjusting your filters or search terms.</p>
//                    <button onClick={clearSearchAndFilters} className="mt-4 text-[#007185] hover:underline font-medium">Clear all filters</button>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default function AdvancedStoreDashboard() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-[#EAEDED]"></div>}>
//       <StoreContent />
//     </Suspense>
//   );
// }


// src/app/admin/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  const adminRole = user?.user?.role || user?.role;
  const adminId = user?.user?._id || user?._id || user?.id;

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [loading, setLoading] = useState(true);

  // 🚀 Core Data States
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [allBanners, setAllBanners] = useState([]);
  const [stats, setStats] = useState(null);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  // 🚀 Order & Inventory Filters
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState('All Orders');
  const [orderSort, setOrderSort] = useState('latest');
  const [inventorySearchQuery, setInventorySearchQuery] = useState('');
  
  // 🚀 Promo & Bonus States
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discountType: 'percentage', discountValue: '', minPurchaseAmount: '', expiresAt: '', applicableProducts: [] });
  const [isCreatingCoupon, setIsCreatingCoupon] = useState(false);
  const [signupBonus, setSignupBonus] = useState(0); 
  const [newUserBonus, setNewUserBonus] = useState(0); 

  // 🚀 Product Form States
  const [name, setName] = useState('');
  const [brand, setBrand] = useState(''); 
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('Smartphones');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [isBestSeller, setIsBestSeller] = useState(false); 
  const [images, setImages] = useState([]);
  const [productBanners, setProductBanners] = useState([]); 
  const [features, setFeatures] = useState(['']); 
  const [specs, setSpecs] = useState([{ name: '', value: '' }]); 
  const [variants, setVariants] = useState([{ name: '', options: '' }]); 
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [returnPolicy, setReturnPolicy] = useState('7 Days Replacement');
  const [warrantyPolicy, setWarrantyPolicy] = useState('1 Year Warranty');
  const [isCancellable, setIsCancellable] = useState(true);
  const [cancellationWindowHours, setCancellationWindowHours] = useState(24);
  const [affiliateCommission, setAffiliateCommission] = useState(''); 
  const [reviewCommission, setReviewCommission] = useState(''); 

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // 🚀 Banner Form States
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerLink, setBannerLink] = useState('/');
  const [bannerImage, setBannerImage] = useState(null);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    if (isHydrated && user && adminRole === 'admin') fetchDashboardData();
  }, [isHydrated, user, adminRole]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const config = { params: { adminId } };

    try {
      const results = await Promise.allSettled([
        axios.get(`${apiUrl}/products`),
        axios.get(`${apiUrl}/orders/admin/all`, config),
        axios.get(`${apiUrl}/withdrawals/admin/all`, config),
        axios.get(`${apiUrl}/banners`),
        axios.get(`${apiUrl}/products/admin/pending-reviews`, config),
        axios.get(`${apiUrl}/admin/stats`, config),
        axios.get(`${apiUrl}/auth/settings`),
        axios.get(`${apiUrl}/coupons`, config)
      ]);

      const fetchedProducts = results[0].status === 'fulfilled' ? results[0].value.data : [];
      fetchedProducts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      const fetchedOrders = results[1].status === 'fulfilled' ? results[1].value.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
      const fetchedWithdrawals = results[2].status === 'fulfilled' ? results[2].value.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

      setProducts(fetchedProducts); setOrders(fetchedOrders); setWithdrawals(fetchedWithdrawals);
      if (results[3].status === 'fulfilled') setAllBanners(results[3].value.data);
      if (results[4].status === 'fulfilled') setPendingReviews(results[4].value.data);
      
      if (results[5].status === 'fulfilled') {
        setStats(results[5].value.data);
      } else {
        setStats({ revenue: fetchedOrders.reduce((acc, o) => acc + (o.totalPrice || 0), 0), orderCount: fetchedOrders.length, productCount: fetchedProducts.length, userCount: [...new Set(fetchedOrders.map(o => o.user?._id))].length });
      }

      if (results[6].status === 'fulfilled' && results[6].value.data) {
        setSignupBonus(results[6].value.data.signupBonus || 0); setNewUserBonus(results[6].value.data.newUserBonus || 0);
      }

      if (results[7].status === 'fulfilled') setCoupons(results[7].value.data);

      if (fetchedOrders.length > 0) {
        const grouped = fetchedOrders.reduce((acc, o) => {
          const d = new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
          acc[d] = (acc[d] || 0) + o.totalPrice; return acc;
        }, {});
        setChartData(Object.keys(grouped).map(k => ({ date: k, revenue: grouped[k] })).reverse().slice(-14));
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault(); setIsLoggingIn(true); setLoginError('');
    const result = await login(adminEmail, adminPassword);
    if (!result.success) setLoginError(result.message);
    setIsLoggingIn(false);
  };

  // 🚀 ACTIONS
  const handleManualFulfill = async (orderId, e) => {
    e.preventDefault();
    const carrier = e.target.carrier.value;
    const tracking = e.target.tracking.value;
    if(!tracking) return;
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/admin/${orderId}/fulfill/manual?adminId=${adminId}`, { carrierName: carrier, trackingId: tracking });
      alert("Order manually fulfilled! Email sent to customer.");
      fetchDashboardData();
    } catch(err) { alert("Error fulfilling order manually."); }
  };

  const handleShiprocketFulfill = async (orderId) => {
    if(!window.confirm("Automate AWB via Shiprocket?")) return;
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/admin/${orderId}/fulfill/shiprocket?adminId=${adminId}`);
      alert("Shiprocket AWB Generated! Email sent to customer.");
      fetchDashboardData();
    } catch(err) { 
      const errorDetails = err.response?.data?.details;
      const errorMessage = typeof errorDetails === 'object' ? JSON.stringify(errorDetails, null, 2) : errorDetails || err.message;
      alert(`Shiprocket Error:\n\n${errorMessage}`); 
      console.error("Detailed Error:", err.response?.data); 
    }
  };

  const handleProductCheckbox = (productId) => {
    setNewCoupon(prev => {
      const current = [...prev.applicableProducts];
      if (current.includes(productId)) return { ...prev, applicableProducts: current.filter(id => id !== productId) };
      return { ...prev, applicableProducts: [...current, productId] };
    });
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault(); setIsCreatingCoupon(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons?adminId=${adminId}`, newCoupon);
      alert("✅ Promo Code Created!");
      setNewCoupon({ code: '', discountType: 'percentage', discountValue: '', minPurchaseAmount: '', expiresAt: '', applicableProducts: [] });
      fetchDashboardData();
    } catch (error) { alert(error.response?.data?.message || "Error creating coupon"); } finally { setIsCreatingCoupon(false); }
  };

  const handleToggleCoupon = async (id) => {
    try { await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/coupons/${id}/toggle?adminId=${adminId}`); fetchDashboardData(); } catch (error) { alert("Error updating status"); }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm("Permanently delete this promo code?")) return;
    try { await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/coupons/${id}?adminId=${adminId}`); fetchDashboardData(); } catch (error) { alert("Error deleting coupon"); }
  };

  const handleSaveGlobalSettings = async () => {
    try { await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/settings`, { signupBonus, newUserBonus }); alert("✅ Global Bonus Settings Updated!"); } catch (error) { alert("Failed to update global settings."); }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/admin/${id}/status?adminId=${adminId}`, { status });
    alert(`Order Updated to ${status}`); fetchDashboardData();
  };

  const handleUploadInvoice = async (orderId, e) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('invoice', file);
    try { await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/admin/${orderId}/invoice?adminId=${adminId}`, formData); alert("✅ Invoice uploaded!"); e.target.value = null; fetchDashboardData(); } catch (err) { alert("Failed to upload invoice."); }
  };

  const handlePayoutAction = async (id, status) => {
    try { await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/admin/${id}?adminId=${adminId}`, { status, adminComment: "Processed" }); alert(`Withdrawal ${status}`); fetchDashboardData(); } catch (error) { alert("Error updating payout status"); }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product permanently?")) { await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}?adminId=${adminId}`); fetchDashboardData(); }
  };

  const handleReviewAction = async (productId, reviewId, status) => {
    try { await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/admin/reviews/status?adminId=${adminId}`, { productId, reviewId, status }); alert(`Review ${status}!`); fetchDashboardData(); } catch (error) { alert("Error processing review"); }
  };

  const handleUploadBanner = async (e) => {
    e.preventDefault(); if (!bannerImage) return alert("Select image");
    setIsBannerUploading(true);
    const formData = new FormData(); formData.append('image', bannerImage); formData.append('title', bannerTitle); formData.append('subtitle', bannerSubtitle); formData.append('link', bannerLink); formData.append('adminId', adminId);
    try { await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/banners`, formData); alert("✅ Slide Published!"); setBannerTitle(''); setBannerSubtitle(''); setBannerLink('/'); setBannerImage(null); fetchDashboardData(); } catch (err) { alert("Upload failed."); } finally { setIsBannerUploading(false); }
  };

  const handleDeleteBanner = async (id) => {
    if (window.confirm("Remove this slide?")) { try { await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/banners/${id}?adminId=${adminId}`); fetchDashboardData(); } catch (err) { alert("Delete failed"); } }
  };

  // 🚀 PRODUCT FORMATTING
  const parseVariantsForDB = (variantArray) => {
    return variantArray.map(v => {
      const parsedOptions = typeof v.options === 'string' ? v.options.split(',').map(opt => {
        let optName = opt.trim(); let priceModifier = 0; const match = optName.match(/\(([\+\-]?\d+)\)/); 
        if (match) { priceModifier = parseInt(match[1], 10); optName = optName.replace(match[0], '').trim(); }
        return { name: optName, priceModifier };
      }).filter(o => o.name !== '') : [];
      return { name: v.name, options: parsedOptions };
    }).filter(v => v.name.trim() !== '' && v.options.length > 0);
  };

  const formatVariantsForEdit = (dbVariants) => {
    if (!dbVariants || dbVariants.length === 0) return [{ name: '', options: '' }];
    return dbVariants.map(v => ({ name: v.name, options: v.options.map(o => o.priceModifier ? `${o.name}(+${o.priceModifier})` : o.name).join(', ') }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name); formData.append('brand', brand); formData.append('price', price); formData.append('discountPrice', discountPrice);
    formData.append('category', category); formData.append('stock', stock); formData.append('description', description); formData.append('isBestSeller', isBestSeller);
    formData.append('returnPolicy', returnPolicy); formData.append('warrantyPolicy', warrantyPolicy);
    formData.append('seoTitle', seoTitle); formData.append('seoDescription', seoDescription); formData.append('seoKeywords', seoKeywords);
    formData.append('isCancellable', isCancellable); formData.append('cancellationWindowHours', cancellationWindowHours);
    formData.append('affiliateCommission', affiliateCommission || 0); formData.append('reviewCommission', reviewCommission || 0); 
    formData.append('features', JSON.stringify(features.filter(f => f.trim() !== ''))); formData.append('specs', JSON.stringify(specs.filter(s => s.name.trim() !== '')));
    formData.append('variants', JSON.stringify(parseVariantsForDB(variants))); 
    for (let i = 0; i < images.length; i++) formData.append('images', images[i]);
    for (let i = 0; i < productBanners.length; i++) formData.append('banners', productBanners[i]);
    
    try { await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products?adminId=${adminId}`, formData); alert("✅ Product Published!"); setName(''); setBrand(''); setPrice(''); setDiscountPrice(''); setStock(''); setDescription(''); setImages([]); setProductBanners([]); setFeatures(['']); setSpecs([{ name: '', value: '' }]); setVariants([{ name: '', options: '' }]); setSeoTitle(''); setSeoDescription(''); setSeoKeywords(''); setIsCancellable(true); setCancellationWindowHours(24); setAffiliateCommission(''); setReviewCommission(''); setActiveTab('inventory'); fetchDashboardData(); } catch(err) { alert("Publish failed"); }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({ 
      ...product, existingImages: product.images || [], newImagesFiles: [], existingBanners: product.banners || [], newBannersFiles: [],
      variants: formatVariantsForEdit(product.variants), features: product.features && product.features.length > 0 ? product.features : [''],
      specs: product.specs && product.specs.length > 0 ? product.specs : [{ name: '', value: '' }],
      returnPolicy: product.returnPolicy || '7 Days Replacement', warrantyPolicy: product.warrantyPolicy || '1 Year Warranty', 
      seoTitle: product.seoTitle || '', seoDescription: product.seoDescription || '', seoKeywords: product.seoKeywords || '',
      isCancellable: product.isCancellable !== undefined ? product.isCancellable : true, cancellationWindowHours: product.cancellationWindowHours !== undefined ? product.cancellationWindowHours : 24,
      affiliateCommission: product.affiliateCommission || 0, reviewCommission: product.reviewCommission || 0 
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editForm).forEach(key => {
        const excludedFields = ['existingImages', 'newImagesFiles', 'existingBanners', 'newBannersFiles', 'features', 'specs', 'variants', 'reviews', 'ratings', 'numOfReviews'];
        if (!excludedFields.includes(key)) formData.append(key, editForm[key]);
      });
      formData.append('existingImages', JSON.stringify(editForm.existingImages)); formData.append('existingBanners', JSON.stringify(editForm.existingBanners)); formData.append('features', JSON.stringify(editForm.features.filter(f => f.trim() !== ''))); formData.append('specs', JSON.stringify(editForm.specs.filter(s => s.name.trim() !== ''))); formData.append('variants', JSON.stringify(parseVariantsForDB(editForm.variants))); 
      if (editForm.newImagesFiles) for (let i = 0; i < editForm.newImagesFiles.length; i++) formData.append('images', editForm.newImagesFiles[i]);
      if (editForm.newBannersFiles) for (let i = 0; i < editForm.newBannersFiles.length; i++) formData.append('banners', editForm.newBannersFiles[i]);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${editingProduct._id}?adminId=${adminId}`, formData);
      alert("✅ Product Updated Successfully!"); setEditingProduct(null); fetchDashboardData(); 
    } catch (err) { alert("Update failed."); }
  };

  // 🚀 CSV EXPORT HANDLER
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Items', 'Total (INR)', 'Payment', 'Status'];
    const rows = filteredOrders.map(o => [
      `"${o._id}"`,
      `"${new Date(o.createdAt).toLocaleString('en-IN')}"`,
      `"${o.shippingAddress?.fullName || 'N/A'}"`,
      `"${o.shippingAddress?.phone || 'N/A'}"`,
      `"${o.orderItems?.map(i => `${i.quantity || i.qty}x ${i.name}`).join(' | ')}"`,
      o.totalPrice,
      `"${o.paymentMethod === 'COD' || o.paymentMethod === 'Cash on Delivery' ? 'COD' : 'PREPAID'}"`,
      `"${o.status}"`
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Orders_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const amzYellowBtn = "bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-1.5 px-6 rounded-[8px] text-[13px] font-medium shadow-sm transition-all disabled:opacity-50";
  const amzWhiteBtn = "bg-white border border-[#D5D9D9] hover:bg-[#F7FAFA] py-1.5 px-4 rounded-[8px] text-[13px] shadow-sm disabled:opacity-50";
  const amzInput = "w-full border border-[#888C8C] rounded-[3px] p-2 text-[13px] focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600] outline-none";
  const amzLabel = "block text-[13px] font-bold text-[#111] mb-1";
  const amzSection = "bg-white border border-[#DDD] rounded-[4px] p-6 mb-6 shadow-sm";

  if (isHydrated && (!user || adminRole !== 'admin')) {
    return (
      <div className="min-h-screen bg-[#131921] flex items-center justify-center p-4">
        <div className="bg-white rounded-[8px] p-10 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8"><h1 className="text-2xl font-normal tracking-tighter">smartbizs<span className="font-bold text-[#febd69]">seller central</span></h1><p className="text-[12px] font-bold mt-1 uppercase text-[#565959]">Secure Login</p></div>
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded text-[13px] mb-6 border border-red-100">{loginError}</div>}
          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div><label className={amzLabel}>Admin Email</label><input type="email" required className={amzInput} value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} /></div>
            <div><label className={amzLabel}>Password</label><input type="password" required className={amzInput} value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} /></div>
            <button type="submit" disabled={isLoggingIn} className={amzYellowBtn + " w-full py-3 mt-4"}>{isLoggingIn ? 'Authenticating...' : 'Sign In'}</button>
          </form>
        </div>
      </div>
    );
  }

  if (!isHydrated) return null;

  // 🚀 COMPUTE FILTERED INVENTORY
  const filteredInventory = products.filter(p => {
    if (!inventorySearchQuery) return true;
    const s = inventorySearchQuery.toLowerCase();
    return p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) || p.category.toLowerCase().includes(s);
  });

  // 🚀 COMPUTE FILTERED & SORTED ORDERS WITH AMAZON-STYLE TABS
  const filteredOrders = orders.filter(o => {
    // 1. Search Query Logic
    const searchStr = orderSearchQuery.toLowerCase();
    const matchesSearch = 
      o._id.toLowerCase().includes(searchStr) || 
      o.shippingAddress?.fullName?.toLowerCase().includes(searchStr) ||
      o.shippingAddress?.phone?.includes(searchStr) ||
      (o.shippingDetails?.trackingId && o.shippingDetails.trackingId.toLowerCase().includes(searchStr));

    if (!matchesSearch) return false;

    // 2. Authentic Amazon Tab Filter Logic
    if (orderFilter === 'All Orders') return true;
    if (orderFilter === 'Pending') return o.status === 'Processing' && !o.shippingDetails?.trackingId;
    if (orderFilter === 'Accepted') return o.status === 'Processing' && !!o.shippingDetails?.trackingId;
    if (orderFilter === 'Shipped') return o.status === 'Shipped';
    if (orderFilter === 'Pickup Ready') return o.status === 'Pickup Ready'; 
    if (orderFilter === 'Fulfilled') return o.status === 'Delivered';
    if (orderFilter === 'Cancelled') return o.status === 'Cancelled';
    if (orderFilter === 'Rejected') return o.status === 'Rejected';
    return true;
  }).sort((a, b) => {
    // 3. Sorting Logic
    if (orderSort === 'latest') return new Date(b.createdAt) - new Date(a.createdAt);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // Quick Stats for the Order Tabs
  const getCount = (status) => orders.filter(o => {
    if (status === 'Pending') return o.status === 'Processing' && !o.shippingDetails?.trackingId;
    if (status === 'Accepted') return o.status === 'Processing' && !!o.shippingDetails?.trackingId;
    if (status === 'Fulfilled') return o.status === 'Delivered';
    return o.status === status;
  }).length;

  return (
    <div className="min-h-screen bg-[#EAEDED] flex flex-col font-sans text-[#0F1111] selection:bg-[#FEF8F2]">
      
      <header className="bg-[#131921] text-white px-6 py-2.5 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-8">
          <Link href="/"><h1 className="text-xl font-normal tracking-tighter">smartbizs<span className="text-[#febd69] font-bold">seller central</span></h1></Link>
          <div className="hidden lg:flex gap-6 text-[13px] font-bold">
            <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-[#febd69]' : 'hover:text-[#febd69]'}>Home</button>
            <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'text-[#febd69]' : 'hover:text-[#febd69]'}>Inventory</button>
            <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'text-[#febd69]' : 'hover:text-[#febd69]'}>Orders</button>
            <button onClick={() => setActiveTab('coupons')} className={activeTab === 'coupons' ? 'text-[#febd69]' : 'hover:text-[#febd69]'}>Promos</button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[12px]"><span className="opacity-70">Store: smartbizs</span><button onClick={logout} className="hover:underline text-[#febd69] font-bold">Sign Out</button></div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        <aside className="w-[240px] bg-white border-r border-[#DDD] hidden lg:flex flex-col shrink-0 pt-6 z-10">
          <nav className="px-4 space-y-1 flex-1">
            <SidebarItem icon="📊" label="Dashboard Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <SidebarItem icon="📦" label="Manage Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
            <SidebarItem icon="📝" label="Manage Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
            <SidebarItem icon="🎟️" label="Promo Codes" active={activeTab === 'coupons'} onClick={() => setActiveTab('coupons')} />
            <SidebarItem icon="💳" label="Affiliate Payouts" active={activeTab === 'payouts'} onClick={() => setActiveTab('payouts')} />
            <SidebarItem icon="🖼️" label="Banners & Ads" active={activeTab === 'marketing'} onClick={() => setActiveTab('marketing')} />
            <SidebarItem icon="⭐" label="Customer Reviews" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
            <div className="mt-8 border-t border-[#EEE] pt-4"><SidebarItem icon="➕" label="Add a Product" active={activeTab === 'add-product'} onClick={() => setActiveTab('add-product')} /></div>
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="max-w-[1600px] mx-auto space-y-8">
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard label="Total Revenue" val={`₹${stats.revenue.toLocaleString('en-IN')}`} sub="Life-to-date" color="text-[#B12704]" />
                  <StatCard label="Total Orders" val={stats.orderCount} sub="Units Sold" />
                  <StatCard label="Customers" val={stats.userCount} sub="Unique Users" />
                  <StatCard label="Inventory" val={stats.productCount} sub="Active Listings" />
                </div>
              )}
              {chartData.length > 0 && (
                <div className="bg-white border border-[#DDD] rounded-[4px] p-6 shadow-sm">
                  <h2 className="text-[14px] font-bold text-[#111] mb-6 uppercase tracking-wider">📈 Revenue Performance</h2>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEE" />
                        <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                        <Tooltip contentStyle={{borderRadius: '4px', border: '1px solid #DDD', fontSize: '12px'}} />
                        <Bar dataKey="revenue" fill="#febd69" radius={[2, 2, 0, 0]} maxBarSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* INVENTORY TAB WITH SEARCH & LOW STOCK */}
          {activeTab === 'inventory' && (
            <div className="max-w-[1600px] mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                 <h2 className="text-[22px] font-bold">Inventory Management</h2>
                 <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-[300px]">
                      <span className="absolute left-3 top-2.5 text-gray-500 leading-none">⌕</span>
                      <input
                        type="text"
                        placeholder="Search inventory..."
                        value={inventorySearchQuery}
                        onChange={(e) => setInventorySearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-[#888C8C] rounded-[4px] text-[13px] focus:outline-none focus:border-[#e77600] shadow-sm"
                      />
                    </div>
                    <button onClick={() => setActiveTab('add-product')} className={amzYellowBtn + " whitespace-nowrap"}>+ Add New</button>
                 </div>
               </div>
               <div className="bg-white border border-[#DDD] rounded-[4px] overflow-hidden shadow-sm">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#F0F2F2] border-b border-[#DDD] font-bold text-[#565959]">
                      <tr>
                        <th className="p-3 border-r border-[#DDD]">Status</th><th className="p-3 border-r border-[#DDD]">Image</th><th className="p-3 border-r border-[#DDD]">Product Name</th><th className="p-3 border-r border-[#DDD]">Price</th><th className="p-3 border-r border-[#DDD]">Stock</th><th className="p-3 border-r border-[#DDD]">Dates</th><th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEE]">
                      {filteredInventory.map(p => (
                        <tr key={p._id} className={`hover:bg-[#F9F9F9] align-top ${p.stock < 5 ? 'bg-red-50/30' : ''}`}>
                          <td className="p-3 border-r border-[#DDD]"><span className="text-green-700 font-bold uppercase text-[10px]">Active</span></td>
                          <td className="p-3 border-r border-[#DDD] w-16"><img src={getImageUrl(p.images[0])} className="w-12 h-12 object-contain mix-blend-multiply" alt="thumb" /></td>
                          <td className="p-3 border-r border-[#DDD]">
                            <p className="font-bold text-[#007185] hover:underline cursor-pointer">{p.name}</p><p className="text-[11px] text-[#565959]">{p.brand} | {p.category}</p>
                            {p.isBestSeller && <span className="bg-[#e77600] text-white text-[9px] px-1 font-bold rounded mt-1 inline-block">BEST SELLER</span>}
                          </td>
                          <td className="p-3 border-r border-[#DDD] font-bold text-[#B12704]">₹{p.discountPrice || p.price}</td>
                          <td className="p-3 border-r border-[#DDD]">
                            <span className={p.stock < 5 ? 'text-[#B12704] font-bold' : ''}>{p.stock} Units</span>
                            {p.stock < 5 && <div className="text-[9px] text-white bg-[#B12704] rounded px-1 mt-1 uppercase font-bold animate-pulse inline-block">Low Stock</div>}
                          </td>
                          <td className="p-3 border-r border-[#DDD] whitespace-nowrap"><div className="text-[11px] text-[#565959] mb-1"><span className="font-bold text-[#111]">Added:</span> {formatDateTime(p.createdAt)}</div><div className="text-[11px] text-[#565959]"><span className="font-bold text-[#111]">Updated:</span> {formatDateTime(p.updatedAt)}</div></td>
                          <td className="p-3 text-right space-x-3"><button className="text-[#007185] hover:underline font-bold" onClick={() => handleEditClick(p)}>Edit</button><button className="text-[#B12704] hover:underline" onClick={() => handleDeleteProduct(p._id)}>Delete</button></td>
                        </tr>
                      ))}
                      {filteredInventory.length === 0 && <tr><td colSpan="7" className="p-10 text-center text-gray-500">No products found.</td></tr>}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* COUPONS TAB */}
          {activeTab === 'coupons' && (
            <div className="max-w-[1600px] mx-auto">
               <h2 className="text-[22px] font-bold mb-6">Promotional Codes</h2>
               <div className="bg-white border border-[#DDD] rounded-[4px] p-6 mb-8 shadow-sm">
                  <h3 className="text-[16px] font-bold text-[#111] mb-4">Create New Promo Code</h3>
                  <form onSubmit={handleCreateCoupon} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div><label className={amzLabel}>Coupon Code</label><input type="text" placeholder="e.g. SUMMER50" className={`${amzInput} uppercase`} value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value})} required /></div>
                      <div>
                        <label className={amzLabel}>Discount Type</label>
                        <select className={amzInput} value={newCoupon.discountType} onChange={e => setNewCoupon({...newCoupon, discountType: e.target.value})}><option value="percentage">Percentage (%)</option><option value="fixed">Flat Amount (₹)</option></select>
                      </div>
                      <div><label className={amzLabel}>Discount Value</label><input type="number" placeholder="e.g. 20" className={amzInput} value={newCoupon.discountValue} onChange={e => setNewCoupon({...newCoupon, discountValue: e.target.value})} required /></div>
                      <div><label className={amzLabel}>Min. Purchase (₹)</label><input type="number" placeholder="e.g. 999" className={amzInput} value={newCoupon.minPurchaseAmount} onChange={e => setNewCoupon({...newCoupon, minPurchaseAmount: e.target.value})} /></div>
                    </div>
                    <div>
                      <label className={amzLabel}>Applicable Products <span className="font-normal text-gray-500">(Leave unchecked to apply to entire store)</span></label>
                      <div className="border border-[#D5D9D9] rounded-[4px] p-3 max-h-40 overflow-y-auto bg-[#F9F9F9] space-y-2">
                        {products.map(p => (
                          <label key={p._id} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="accent-[#e77600] w-4 h-4" checked={newCoupon.applicableProducts.includes(p._id)} onChange={() => handleProductCheckbox(p._id)} />
                            <span className="text-[13px] text-[#111]">{p.name} <span className="text-gray-500 font-bold ml-2">₹{p.discountPrice || p.price}</span></span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end border-t border-[#eee] pt-4"><button type="submit" disabled={isCreatingCoupon} className={`${amzYellowBtn} px-10`}>{isCreatingCoupon ? 'Creating...' : 'Create Promo Code'}</button></div>
                  </form>
               </div>
               <div className="bg-white border border-[#DDD] rounded-[4px] overflow-hidden shadow-sm">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#F0F2F2] border-b border-[#DDD] font-bold text-[#565959]">
                      <tr><th className="p-3 border-r border-[#DDD]">Code</th><th className="p-3 border-r border-[#DDD]">Discount Details</th><th className="p-3 border-r border-[#DDD]">Rules & Restrictions</th><th className="p-3 border-r border-[#DDD]">Status</th><th className="p-3 text-right">Action</th></tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEE]">
                      {coupons.map(coupon => {
                        const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
                        const appliesToAll = !coupon.applicableProducts || coupon.applicableProducts.length === 0;
                        return (
                          <tr key={coupon._id} className={`hover:bg-[#F9F9F9] align-top ${!coupon.isActive || isExpired ? 'opacity-60' : ''}`}>
                            <td className="p-3 border-r border-[#DDD]"><p className="font-mono font-bold text-[#111] text-[15px] bg-[#f0f2f2] px-2 py-0.5 inline-block border border-[#ddd] rounded">{coupon.code}</p><p className="text-[10px] text-[#565959] mt-1">Added: {new Date(coupon.createdAt).toLocaleDateString()}</p></td>
                            <td className="p-3 border-r border-[#DDD] font-bold text-[#007185]">{coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}</td>
                            <td className="p-3 border-r border-[#DDD]"><p className="text-[#111]"><span className="font-bold">Min Purchase:</span> {coupon.minPurchaseAmount > 0 ? `₹${coupon.minPurchaseAmount}` : 'No Minimum'}</p><p className="text-[11px] text-[#565959] mt-1"><span className="font-bold text-[#111]">Applies to:</span> {appliesToAll ? 'Entire Store' : `${coupon.applicableProducts.length} specific product(s)`}</p></td>
                            <td className="p-3 border-r border-[#DDD]"><button onClick={() => handleToggleCoupon(coupon._id)} className={`text-[10px] font-bold uppercase px-2 py-1 rounded-[3px] border ${coupon.isActive && !isExpired ? 'bg-[#e7f4e4] text-[#007600] border-[#007600]' : 'bg-[#fce8e6] text-[#B12704] border-[#B12704]'}`}>{isExpired ? 'Expired' : coupon.isActive ? 'Active' : 'Paused'}</button></td>
                            <td className="p-3 text-right"><button className="text-[#B12704] hover:underline font-bold" onClick={() => handleDeleteCoupon(coupon._id)}>Delete</button></td>
                          </tr>
                        )
                      })}
                      {coupons.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-[#565959]">No promotional codes generated yet.</td></tr>}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* 🚀 EXACT AMAZON-STYLE ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="max-w-[1600px] mx-auto">
              <h2 className="text-[26px] font-bold mb-1 text-[#111]">Orders</h2>
              <p className="text-[13px] text-[#565959] mb-6">Effortlessly track and manage your orders. Need assistance? <span className="text-[#007185] hover:underline cursor-pointer">Learn More</span></p>
              
              {/* 🚀 TAB FILTERS (All, Pending, Accepted, etc) */}
              <div className="flex gap-6 border-b border-[#DDD] mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {['All Orders', 'Pending', 'Accepted', 'Shipped', 'Pickup Ready', 'Fulfilled', 'Cancelled', 'Rejected'].map(f => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={`pb-3 text-[14px] font-bold transition-all border-b-[3px] ${
                      orderFilter === f 
                        ? 'border-[#007185] text-[#007185]' 
                        : 'border-transparent text-[#565959] hover:text-[#111] hover:border-gray-300'
                    }`}
                  >
                    {f} {f !== 'All Orders' && <span className="text-xs text-gray-400 font-normal ml-1">({getCount(f)})</span>}
                  </button>
                ))}
              </div>

              {/* 🚀 SEARCH BAR & FUNCTIONAL BUTTONS */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full md:w-[400px]">
                  <span className="absolute left-3 top-1 text-gray-500 text-lg leading-none">⌕</span>
                  <input
                    type="text"
                    placeholder="Search for Order ID, SKU &..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 border border-[#888C8C] rounded-[4px] text-[13px] focus:outline-none focus:border-[#e77600] transition-shadow shadow-sm"
                  />
                </div>
                
                <div className="hidden lg:flex gap-2 text-[13px]">
                   <button onClick={handleExportCSV} title="Download as CSV" className="border border-[#007185] text-[#007185] px-3 py-1.5 rounded flex items-center gap-2 font-bold hover:bg-[#F0F8FF] transition-colors">
                     ⬇
                   </button>
                   <button onClick={() => alert("Column management module coming soon.")} className="border border-[#007185] text-[#007185] px-3 py-1.5 rounded flex items-center gap-2 font-bold hover:bg-[#F0F8FF] transition-colors">
                     Columns ◫
                   </button>
                   <button onClick={() => alert("Advanced Date filters coming soon. Use the tabs above for now!")} className="border border-[#007185] text-[#007185] px-3 py-1.5 rounded flex items-center gap-2 font-bold hover:bg-[#F0F8FF] transition-colors">
                     Filter 🎚
                   </button>
                   <button onClick={() => setOrderSort(prev => prev === 'latest' ? 'oldest' : 'latest')} className="border border-[#007185] text-[#007185] px-3 py-1.5 rounded flex items-center justify-center gap-2 font-bold hover:bg-[#F0F8FF] transition-colors w-[180px]">
                     Sort by: {orderSort === 'latest' ? 'Latest Order' : 'Oldest Order'} ⇅
                   </button>
                </div>
              </div>

              {/* TABLE */}
              <div className="bg-white border-t border-[#DDD] overflow-hidden shadow-sm">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#F0F2F2] border-b border-[#DDD] font-bold text-[#565959]">
                    <tr>
                      <th className="p-3 border-r border-[#DDD]">Order</th>
                      <th className="p-3 border-r border-[#DDD]">Product</th>
                      <th className="p-3 border-r border-[#DDD]">Payment</th>
                      <th className="p-3 border-r border-[#DDD]">Customer</th>
                      <th className="p-3">Status & Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEE]">
                    {filteredOrders.map(o => (
                      <tr key={o._id} className={`hover:bg-[#F9F9F9] align-top ${o.status === 'Cancelled' ? 'opacity-70 bg-gray-50' : ''}`}>
                        
                        {/* Order Col */}
                        <td className="p-3 border-r border-[#DDD]">
                          <div className="mb-2">
                             {/* 🚀 DYNAMIC FULFILLMENT TYPE BADGE */}
                             {o.shippingDetails?.provider === 'Shiprocket' ? (
                                <span className="bg-blue-100 text-blue-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-blue-200">🚀 Shiprocket</span>
                              ) : o.shippingDetails?.provider === 'Manual' ? (
                                <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-purple-200">🏠 Internal</span>
                              ) : (
                                <span className="bg-[#FFF3E0] text-[#e77600] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#FBD8B4]">Pending</span>
                              )}
                          </div>
                          <p className="font-bold text-[#007185] text-[14px]">#{o._id.slice(-10).toUpperCase()}</p>
                          <p className="text-[11px] text-[#565959] mt-1 mb-1">{formatDateTime(o.createdAt)}</p>
                        </td>

                        {/* Product Col */}
                        <td className="p-4 border-r border-[#DDD]">
                          <div className="space-y-3">
                            {o.orderItems?.map((i, idx) => (
                              <div key={idx} className="text-[11px] flex gap-3">
                                <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                                  <span className="text-xl">📦</span>
                                </div>
                                <div>
                                  <span className="font-bold text-[#111] leading-snug">{i.name}</span>
                                  {i.selectedOptions && Object.keys(i.selectedOptions).length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {Object.entries(i.selectedOptions).map(([key, val]) => (
                                        <span key={key} className="bg-[#F0F2F2] border border-[#DDD] text-[#565959] px-1.5 py-0.5 rounded-[3px] text-[10px]">{key}: <span className="font-bold text-[#111]">{val}</span></span>
                                      ))}
                                    </div>
                                  )}
                                  <p className="text-gray-500 mt-1">Qty: <span className="font-bold text-black">{i.quantity || i.qty}</span> × ₹{(i.price || 0).toLocaleString()}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Payment Col */}
                        <td className="p-3 border-r border-[#DDD]">
                          <p className="text-[12px] text-[#565959]">Mode: <span className="font-bold text-[#111]">{o.paymentMethod === 'COD' || o.paymentMethod === 'Cash on Delivery' ? 'COD' : 'PREPAID'}</span></p>
                          <p className="text-[12px] text-[#565959] mt-1">Total: <span className="font-bold text-[#111]">₹{o.totalPrice?.toLocaleString('en-IN')}</span></p>
                        </td>
                        
                        {/* 🚀 CUSTOMER COL (WITH MOVED ADDRESS) */}
                        <td className="p-3 border-r border-[#DDD]">
                          <p className="font-bold text-[#111] text-[13px]">{o.shippingAddress?.fullName} <span className="bg-[#F0F2F2] border border-[#DDD] text-[9px] px-1 text-gray-600 rounded ml-1">New</span></p>
                          {o.shippingAddress && (
                            <div className="text-[12px] text-[#565959] mt-1 space-y-1">
                              <p className="text-[#007185] hover:underline cursor-pointer">{o.user?.email || 'N/A'}</p>
                              <p className="text-green-700 font-bold flex items-center gap-1"><span className="text-sm">💬</span> +91 {o.shippingAddress.phone}</p>
                              
                              <div className="pt-2 mt-2 border-t border-[#EEE]">
                                <p className="font-bold text-[#111] mb-0.5 text-[11px] uppercase tracking-wide">Shipping Address</p>
                                <p className="text-[12px] leading-snug whitespace-normal break-words pr-2 text-[#111]">
                                  {o.shippingAddress.address}<br/>
                                  {o.shippingAddress.city}, {o.shippingAddress.pincode}
                                </p>
                              </div>
                            </div>
                          )}
                        </td>

                        {/* 🚀 STATUS & ACTIONS COL */}
                        <td className="p-3">
                          <div>
                            <select 
                              value={o.status} 
                              onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)} 
                              disabled={o.shippingDetails?.provider === 'Shiprocket' || o.status === 'Cancelled'}
                              className={`w-full p-1.5 rounded-[4px] text-[11px] font-bold uppercase tracking-tight border-2 outline-none mb-3 cursor-pointer 
                                ${o.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-500 cursor-not-allowed' :
                                  o.shippingDetails?.provider === 'Shiprocket' ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' : 
                                  o.status === 'Delivered' ? 'bg-[#F7FCF7] border-[#007600] text-[#007600]' : 'bg-[#FFF8F2] border-[#e77600] text-[#e77600]'}`}
                            >
                              <option value="Processing">Processing (Pending)</option>
                              <option value="Pickup Ready">Pickup Ready</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered (Fulfilled)</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {o.shippingDetails?.trackingId ? (
                              <div className="text-[11px] text-[#007600] bg-[#f9f9f9] border border-[#ddd] p-2 rounded">
                                <div className="flex justify-between items-center mb-1">
                                   <span className="font-bold text-[#111] uppercase tracking-wider text-[10px]">✓ {o.shippingDetails.provider}</span>
                                </div>
                                <span className="text-gray-500">AWB:</span> <span className="font-mono text-[#111] font-bold">{o.shippingDetails.trackingId}</span>
                                
                                {o.shippingDetails.provider === 'Shiprocket' && (
                                  <div className="mt-2 space-y-1">
                                    <button onClick={async () => {
                                        try {
                                          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${o._id}/tracking`);
                                          if(data.shiprocketInvoiceUrl) window.open(data.shiprocketInvoiceUrl, '_blank');
                                          else alert("Label is being generated. Please wait 2-3 minutes.");
                                        } catch(e) { alert("Error fetching label."); }
                                      }} className="w-full bg-white border border-[#007185] text-[#007185] text-[10px] font-bold py-1 rounded hover:bg-[#F0F8FF] transition-colors shadow-sm">Print Label</button>
                                    {o.status !== 'Delivered' && o.status !== 'Cancelled' && (
                                      <button onClick={async () => {
                                          try {
                                            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${o._id}/tracking`);
                                            alert("Synced!"); fetchDashboardData(); 
                                          } catch(e) { alert("Sync failed."); }
                                        }} className="w-full bg-white border border-gray-400 text-gray-700 text-[10px] font-bold py-1 rounded hover:bg-gray-100 shadow-sm">↻ Sync Status</button>
                                    )}
                                  </div>
                                )}
                              </div>
                            ) : o.status !== 'Cancelled' ? (
                              <div className="space-y-2">
                                <form onSubmit={(e) => handleManualFulfill(o._id, e)} className="bg-white p-1.5 border border-gray-200 rounded shadow-sm">
                                  <input name="carrier" type="text" placeholder="Courier Name" className="w-full border border-gray-300 p-1 text-[10px] mb-1 rounded-[2px] outline-none" />
                                  <input name="tracking" type="text" placeholder="Tracking ID" className="w-full border border-gray-300 p-1 text-[10px] mb-1 rounded-[2px] outline-none" required />
                                  <button type="submit" className="w-full bg-[#F0F2F2] border border-[#DDD] text-[#111] text-[9px] font-bold py-1 hover:bg-[#E3E6E6] rounded-[3px] uppercase">Submit Manual</button>
                                </form>
                                <button onClick={() => handleShiprocketFulfill(o._id)} className="w-full bg-[#131921] text-white font-bold text-[10px] py-1.5 rounded-[3px] hover:bg-[#232f3e] transition-colors shadow-sm">🚀 Automate Shiprocket</button>
                                <button onClick={async () => {
                                    if(window.confirm("Cancel this order?")){
                                       try {
                                         await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${o._id}/cancel?adminId=${adminId}`);
                                         fetchDashboardData();
                                       } catch(e) { alert("Error cancelling"); }
                                    }
                                  }} className="w-full text-red-600 font-bold text-[10px] py-1 text-center hover:underline">🚫 Cancel Order</button>
                              </div>
                            ) : null}
                          </div>
                        </td>

                      </tr>
                    ))}
                    {filteredOrders.length === 0 && <tr><td colSpan="5" className="p-10 text-center text-gray-500">No orders found matching your criteria.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAYOUTS TAB */}
          {activeTab === 'payouts' && (
            <div className="max-w-[1200px] mx-auto">
               <h2 className="text-[22px] font-bold mb-6"> Payouts & Settings</h2>
               <div className="bg-white border border-[#DDD] rounded-[4px] p-6 mb-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h3 className="text-[16px] font-bold text-[#111]">Referrer Reward (₹)</h3><p className="text-[12px] text-[#565959] mb-3">Amount given to the person who shared their link.</p>
                    <div className="flex items-center gap-3"><input type="number" className={amzInput + " w-24 text-lg font-bold !py-1.5 text-center"} value={signupBonus} onChange={e => setSignupBonus(e.target.value)} /></div>
                 </div>
                 <div>
                    <h3 className="text-[16px] font-bold text-[#111]">New User Welcome Bonus (₹)</h3><p className="text-[12px] text-[#565959] mb-3">Amount given to a new user when they verify their account.</p>
                    <div className="flex items-center gap-3"><input type="number" className={amzInput + " w-24 text-lg font-bold !py-1.5 text-center"} value={newUserBonus} onChange={e => setNewUserBonus(e.target.value)} /></div>
                 </div>
                 <div className="md:col-span-2 border-t border-[#EEE] pt-4 mt-2 text-right"><button onClick={handleSaveGlobalSettings} className={amzYellowBtn + " px-8 py-2"}>Save All Settings</button></div>
               </div>
               <div className="bg-white border border-[#DDD] rounded-[4px] shadow-sm overflow-hidden">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#F0F2F2] border-b border-[#DDD] font-bold text-[#565959]">
                      <tr><th className="p-4 border-r border-[#DDD]">Influencer</th><th className="p-4 border-r border-[#DDD]">Amount</th><th className="p-4 border-r border-[#DDD]">Settlement Details</th><th className="p-4 text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEE]">
                      {withdrawals.map((req) => (
                        <tr key={req._id} className="hover:bg-[#F9F9F9]">
                          <td className="p-4 border-r border-[#DDD] font-bold text-[#111]">{req.userId?.name}<div className="text-[10px] text-[#565959] font-normal mt-1">{formatDateTime(req.createdAt)}</div></td>
                          <td className="p-4 border-r border-[#DDD] font-bold text-[#007600]">₹{req.amount?.toLocaleString()}</td>
                          <td className="p-4 border-r border-[#DDD]">{req.details?.upiId ? <div className="text-[11px] font-mono bg-gray-50 p-2 border border-[#DDD] rounded inline-block">UPI: {req.details.upiId}</div> : <div className="text-[11px] space-y-0.5"><p className="font-bold">Bank: {req.details?.bankName}</p><p className="text-gray-500">A/C: {req.details?.accountNumber}</p><p className="text-gray-500">IFSC: {req.details?.ifsc}</p></div>}</td>
                          <td className="p-4 text-right space-x-2">
                            {req.status === 'pending' ? (
                              <><button onClick={() => handlePayoutAction(req._id, 'approved')} className="bg-[#007600] text-white px-3 py-1 rounded-[4px] text-[11px] font-bold">APPROVE</button><button onClick={() => handlePayoutAction(req._id, 'rejected')} className="bg-[#B12704] text-white px-3 py-1 rounded-[4px] text-[11px] font-bold">REJECT</button></>
                            ) : (<span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{req.status}</span>)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* MARKETING TAB */}
          {activeTab === 'marketing' && (
            <div className="max-w-[1200px] mx-auto">
               <h2 className="text-[22px] font-bold mb-6">Storefront Content</h2>
               <div className="bg-white border border-[#DDD] rounded-[4px] shadow-sm overflow-hidden">
                  <div className="bg-[#F0F2F2] px-6 py-3 border-b border-[#DDD] flex justify-between items-center"><h2 className="text-[14px] font-bold text-[#111]">Homepage Marketing Banners</h2></div>
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <form onSubmit={handleUploadBanner} className="lg:col-span-1 space-y-4 bg-[#F7FAFA] border border-[#D5D9D9] p-5 rounded-[4px]">
                        <h3 className="text-[13px] font-bold border-b border-[#D5D9D9] pb-2 mb-4 uppercase">Create New Slide</h3>
                        <div><label className={amzLabel}>Main Heading</label><input type="text" className={amzInput} value={bannerTitle} onChange={e => setBannerTitle(e.target.value)} /></div>
                        <div><label className={amzLabel}>Sub-heading</label><input type="text" className={amzInput} value={bannerSubtitle} onChange={e => setBannerSubtitle(e.target.value)} /></div>
                        <div><label className={amzLabel}>Redirect Link</label><input type="text" className={amzInput} placeholder="/product/ID" value={bannerLink} onChange={e => setBannerLink(e.target.value)} /></div>
                        <div>
                          <label className={amzLabel}>Slide Image (1920x800)</label>
                          <div className="border-2 border-dashed border-[#D5D9D9] rounded-[4px] p-4 text-center bg-white cursor-pointer relative hover:bg-gray-50">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={e => setBannerImage(e.target.files[0])} required />
                            <p className="text-xl mb-1">📸</p><p className="text-[11px] text-[#565959]">{bannerImage ? bannerImage.name : 'Select JPG/PNG'}</p>
                          </div>
                        </div>
                        <button type="submit" disabled={isBannerUploading} className={amzYellowBtn + " w-full"}>{isBannerUploading ? 'Uploading...' : 'Publish Slide'}</button>
                     </form>
                     <div className="lg:col-span-2">
                        <h3 className="text-[13px] font-bold mb-4 uppercase text-[#565959]">Active Slides ({allBanners.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {allBanners.map((banner) => (
                            <div key={banner._id} className="border border-[#DDD] rounded-[4px] overflow-hidden group relative">
                              <img src={getImageUrl(banner.image)} className="w-full h-32 object-cover" alt="slide" />
                              <div className="p-3 bg-white flex flex-col border-t border-[#DDD]">
                                <div className="flex justify-between items-center mb-1">
                                  <div className="truncate"><p className="font-bold text-[12px] truncate">{banner.title || 'No Title'}</p></div>
                                  <button onClick={() => handleDeleteBanner(banner._id)} className="text-[#B12704] hover:bg-red-50 p-1 rounded text-xs font-bold transition-colors">REMOVE</button>
                                </div>
                                <p className="text-[10px] text-[#565959]">Added: {formatDateTime(banner.createdAt)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="max-w-[1200px] mx-auto">
               <h2 className="text-[22px] font-bold mb-6">Customer Feedback Moderation</h2>
               <div className="bg-white border border-[#DDD] rounded-[4px] shadow-sm overflow-hidden">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#F0F2F2] border-b border-[#DDD] font-bold text-[#565959]">
                      <tr><th className="p-4 border-r border-[#DDD]">Product & Customer</th><th className="p-4 border-r border-[#DDD] w-1/2">Review Detail</th><th className="p-4 text-right">Moderation</th></tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEE]">
                      {pendingReviews.map((item) => (
                        <tr key={item.review._id} className="hover:bg-[#F9F9F9] align-top">
                          <td className="p-4 border-r border-[#DDD]">
                            <span className="font-bold text-[#111]">{item.productName}</span><p className="text-[11px] text-[#007185] mt-1 hover:underline cursor-pointer">by {item.review.name}</p><p className="text-[10px] text-[#565959] mt-0.5">{formatDateTime(item.review.createdAt || item.review.updatedAt || new Date())}</p>
                          </td>
                          <td className="p-4 border-r border-[#DDD] italic"><div className="text-[#e77600] text-sm mb-1">{'★'.repeat(item.review.rating)}{'☆'.repeat(5 - item.review.rating)}</div>"{item.review.comment}"</td>
                          <td className="p-4 text-right space-x-3"><button onClick={() => handleReviewAction(item.productId, item.review._id, 'approved')} className="text-green-700 font-bold text-[11px] hover:underline">APPROVE</button><button onClick={() => handleReviewAction(item.productId, item.review._id, 'rejected')} className="text-[#B12704] font-bold text-[11px] hover:underline">BLOCK</button></td>
                        </tr>
                      ))}
                      {pendingReviews.length === 0 && <tr><td colSpan="3" className="p-10 text-center text-[#565959]">No pending reviews.</td></tr>}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* ADD PRODUCT TAB */}
          {activeTab === 'add-product' && (
            <div className="max-w-[1000px] mx-auto pb-20">
               <div className="flex items-center justify-between mb-6 border-b border-[#DDD] pb-4">
                 <div><h2 className="text-[22px] font-bold text-[#111]">Add a Product</h2><p className="text-[13px] text-[#565959]">Vital Info &gt; Offer &gt; Images &gt; Description</p></div>
                 <div className="flex gap-2"><button onClick={() => setActiveTab('inventory')} className={amzWhiteBtn}>Cancel</button><button type="submit" form="addProductForm" className={amzYellowBtn}>Save and finish</button></div>
               </div>
               <form id="addProductForm" onSubmit={handleAddProduct} className="space-y-6">
                 {/* Basic Info */}
                 <div className={amzSection}>
                   <div className="flex items-center gap-2 border-b border-[#EEE] pb-4 mb-6"><span className="text-xl">ℹ️</span><h3 className="text-[18px] font-bold text-[#111]">Product Identity</h3></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="md:col-span-2"><label className={amzLabel}>Product Name (Title)</label><input type="text" className={amzInput} value={name} onChange={e => setName(e.target.value)} required /><p className="text-[10px] text-[#565959] mt-1">Recommended length: 60-150 characters.</p></div>
                     <div><label className={amzLabel}>Brand Name</label><input type="text" className={amzInput} value={brand} onChange={e => setBrand(e.target.value)} required /></div>
                     <div><label className={amzLabel}>Category</label><select className={amzInput} value={category} onChange={e => setCategory(e.target.value)}><option value="Smartphones">Smartphones</option><option value="Laptops">Laptops</option><option value="Audio">Audio</option><option value="Wearables">Wearables</option><option value="Accessories">Accessories</option></select></div>
                     <div className="md:col-span-2"><label className={amzLabel}>Product Description</label><textarea className={amzInput + " h-32 resize-none"} value={description} onChange={e => setDescription(e.target.value)} required /></div>
                     <div className="bg-[#F7FAFA] border border-[#D5D9D9] p-4 rounded-[4px] md:col-span-2"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#e77600]" checked={isBestSeller} onChange={e => setIsBestSeller(e.target.checked)} /><div><span className="text-[13px] font-bold text-[#111]">Apply "Best Seller" Badge</span><p className="text-[11px] text-[#565959]">This adds an orange ribbon to the product on the storefront.</p></div></label></div>
                   </div>
                 </div>

                 {/* Pricing & Commission */}
                 <div className={amzSection}>
                   <div className="flex items-center gap-2 border-b border-[#EEE] pb-4 mb-6"><span className="text-xl">💰</span><h3 className="text-[18px] font-bold text-[#111]">Pricing, Inventory & Commissions</h3></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                     <div><label className={amzLabel}>List Price</label><div className="relative"><span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[13px]">₹</span><input type="number" className={amzInput + " pl-6"} value={price} onChange={e => setPrice(e.target.value)} required /></div></div>
                     <div><label className={amzLabel}>Discount Price</label><div className="relative"><span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[13px]">₹</span><input type="number" className={amzInput + " pl-6"} value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} /></div></div>
                     <div><label className={amzLabel}>Stock</label><input type="number" className={amzInput} value={stock} onChange={e => setStock(e.target.value)} required /></div>
                     <div><label className={amzLabel}> Comm. (%)</label><input type="number" className={amzInput} value={affiliateCommission} onChange={e => setAffiliateCommission(e.target.value)} placeholder="e.g. 10" /></div>
                     <div><label className={amzLabel}>Review Reward (₹)</label><input type="number" className={amzInput} value={reviewCommission} onChange={e => setReviewCommission(e.target.value)} placeholder="e.g. 50" /></div>
                   </div>
                 </div>

                 {/* Specs & Features */}
                 <div className={amzSection}>
                   <div className="flex items-center gap-2 border-b border-[#EEE] pb-4 mb-6"><span className="text-xl">🛠️</span><h3 className="text-[18px] font-bold text-[#111]">Technical Details & Highlights</h3></div>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div className="space-y-4">
                       <div className="flex justify-between items-center"><div><label className={amzLabel}>Technical Specifications</label><p className="text-[11px] text-[#565959] -mt-1">Appear in the "Details" table</p></div><button type="button" onClick={() => setSpecs([...specs, { name: '', value: '' }])} className={amzWhiteBtn + " !py-1 flex items-center gap-1"}><span className="text-lg">+</span> Add</button></div>
                       <div className="bg-[#F9F9F9] border border-[#EEE] rounded-[4px] p-4 space-y-3">
                         {specs.map((spec, index) => (
                           <div key={index} className="flex gap-2 relative group items-start"><input type="text" placeholder="Attribute (e.g. RAM)" className={amzInput + " w-1/3 bg-white"} value={spec.name} onChange={e => {const newSpecs=[...specs]; newSpecs[index].name=e.target.value; setSpecs(newSpecs)}} /><input type="text" placeholder="Value (e.g. 16GB)" className={amzInput + " flex-1 bg-white"} value={spec.value} onChange={e => {const newSpecs=[...specs]; newSpecs[index].value=e.target.value; setSpecs(newSpecs)}} />{specs.length > 1 && <button type="button" onClick={() => setSpecs(specs.filter((_, i) => i !== index))} className="p-2 text-[#565959] hover:text-[#B12704] transition-colors">✕</button>}</div>
                         ))}
                       </div>
                     </div>
                     <div className="space-y-4">
                       <div className="flex justify-between items-center"><div><label className={amzLabel}>Key Features</label><p className="text-[11px] text-[#565959] -mt-1">Appear as bullet points</p></div><button type="button" onClick={() => setFeatures([...features, ''])} className={amzWhiteBtn + " !py-1 flex items-center gap-1"}><span className="text-lg">+</span> Add</button></div>
                       <div className="space-y-3">
                         {features.map((f, index) => (
                           <div key={index} className="flex gap-2 group items-center"><div className="h-2 w-2 rounded-full bg-[#e77600] shrink-0"></div><input type="text" placeholder="Enter a key selling point..." className={amzInput} value={f} onChange={e => {const newFeatures=[...features]; newFeatures[index]=e.target.value; setFeatures(newFeatures)}} />{features.length > 1 && <button type="button" onClick={() => setFeatures(features.filter((_, i) => i !== index))} className="p-2 text-[#565959] hover:text-[#B12704] opacity-0 group-hover:opacity-100 transition-all">✕</button>}</div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Variants */}
                 <div className={amzSection}>
                   <div className="flex items-center justify-between border-b border-[#EEE] pb-4 mb-6"><div className="flex items-center gap-2"><span className="text-xl">🎭</span><h3 className="text-[18px] font-bold text-[#111]">Variants & Pricing Modifiers</h3></div><button type="button" onClick={() => setVariants([...variants, { name: '', options: '' }])} className={amzWhiteBtn + " flex items-center gap-1"}><span className="text-lg">+</span> Add Group</button></div>
                   <div className="bg-[#F0F7FF] border border-[#007185] rounded-[4px] p-3 mb-6 flex gap-3"><span className="text-[#007185] font-bold mt-0.5">ℹ️</span><div><p className="text-[12px] text-[#007185] font-bold uppercase tracking-tight">How to set dynamic pricing:</p><p className="text-[12px] text-[#111]">List options separated by commas. Use <code className="bg-white px-1 border rounded text-[#e77600] font-bold">(+Value)</code> to increase price.<br /><span className="text-[#565959] italic">Example: Black, Titanium(+5000), Gold(+2500)</span></p></div></div>
                   <div className="space-y-4">
                     {variants.map((variant, index) => (
                       <div key={index} className="flex flex-col md:flex-row gap-4 bg-[#F9F9F9] p-5 rounded-[4px] border border-[#EEE] relative group">
                         {variants.length > 1 && <button type="button" onClick={() => setVariants(variants.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 bg-white border border-[#DDD] text-[#565959] hover:text-[#B12704] hover:border-[#B12704] w-7 h-7 rounded-full flex items-center justify-center shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-all">✕</button>}
                         <div className="w-full md:w-1/4"><label className="block text-[11px] font-bold text-[#565959] uppercase mb-1.5 ml-1">Attribute Name</label><input type="text" placeholder="e.g. Storage" className={amzInput + " bg-white font-bold"} value={variant.name} onChange={e => { const newVars = [...variants]; newVars[index].name = e.target.value; setVariants(newVars); }} /></div>
                         <div className="w-full md:flex-1"><label className="block text-[11px] font-bold text-[#565959] uppercase mb-1.5 ml-1">Options & Price Adjustments</label><input type="text" placeholder="e.g. 128GB, 256GB(+5000)" className={amzInput + " bg-white font-mono"} value={variant.options} onChange={e => { const newVars = [...variants]; newVars[index].options = e.target.value; setVariants(newVars); }} /></div>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* SEO */}
                 <div className={amzSection}>
                   <div className="flex items-center gap-2 border-b border-[#EEE] pb-4 mb-6"><span className="text-xl">🔍</span><h3 className="text-[18px] font-bold text-[#111]">Search Engine Optimization (SEO)</h3></div>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                     <div className="space-y-5">
                       <div><label className={amzLabel}>Meta Title</label><input type="text" className={amzInput} value={seoTitle} onChange={e => setSeoTitle(e.target.value)} /><div className="flex justify-between mt-1"><p className="text-[10px] text-[#565959]">Appears as clickable link.</p><p className={`text-[10px] font-bold ${seoTitle.length > 60 ? 'text-[#B12704]' : 'text-green-700'}`}>{seoTitle.length}/60</p></div></div>
                       <div><label className={amzLabel}>Focus Keywords</label><input type="text" className={amzInput} value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} /></div>
                       <div className="md:col-span-2"><label className={amzLabel}>Meta Description</label><textarea className={amzInput + " h-24 resize-none"} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} /><div className="flex justify-between mt-1"><p className="text-[10px] text-[#565959]">Brief summary.</p><p className={`text-[10px] font-bold ${seoDescription.length > 160 ? 'text-[#B12704]' : 'text-green-700'}`}>{seoDescription.length}/160</p></div></div>
                     </div>
                     <div className="bg-[#F9F9F9] border border-[#EEE] rounded-[4px] p-6 flex flex-col justify-center">
                       <p className="text-[12px] font-bold text-[#565959] uppercase tracking-wider mb-4 flex items-center gap-2"><span>🌐</span> Google Search Preview</p>
                       <div className="bg-white p-5 border border-[#DDD] rounded shadow-sm max-w-[500px]"><p className="text-[12px] text-[#202124] mb-1 truncate">https://smartbizs.in › products › <span className="text-[#5f6368]">{name ? name.toLowerCase().replace(/ /g, '-') : 'url'}</span></p><h4 className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight mb-1 truncate">{seoTitle || (name ? `${name} | smartbizs` : 'Page Title Goes Here')}</h4><p className="text-[13px] text-[#4d5156] line-clamp-2 leading-relaxed">{seoDescription || 'Provide a meta description to see how your product will appear in search engine results.'}</p></div>
                     </div>
                   </div>
                 </div>

                 {/* Compliance & Cancellation */}
                 <div className={amzSection}>
                   <div className="flex items-center gap-2 border-b border-[#EEE] pb-4 mb-6"><span className="text-xl">🛡️</span><h3 className="text-[18px] font-bold text-[#111]">Compliance & Policies</h3></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                       <div><label className={amzLabel}>Return Policy</label><input type="text" className={amzInput} value={returnPolicy} onChange={e => setReturnPolicy(e.target.value)} required /></div>
                       <div><label className={amzLabel}>Warranty Details</label><input type="text" className={amzInput} value={warrantyPolicy} onChange={e => setWarrantyPolicy(e.target.value)} required /></div>
                     </div>
                     <div className="bg-[#F7FAFA] border border-[#D5D9D9] p-5 rounded-[4px]">
                       <div className="flex items-center justify-between mb-4"><div><h4 className="text-[13px] font-bold text-[#111]">Cancellation Control</h4><p className="text-[11px] text-[#565959]">Allow users to cancel</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked={isCancellable} onChange={e => setIsCancellable(e.target.checked)} /><div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a8e1]"></div></label></div>
                       <div className={`transition-all duration-300 ${isCancellable ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}><label className={amzLabel}>Cancellation Window (Hours)</label><div className="flex items-center gap-3"><input type="number" className={amzInput + " w-24 bg-white"} value={cancellationWindowHours} onChange={e => setCancellationWindowHours(e.target.value)} /><span className="text-[12px] text-[#565959]">hours after order</span></div></div>
                     </div>
                   </div>
                 </div>

                 {/* Media */}
                 <div className={amzSection}>
                   <div className="flex items-center gap-2 border-b border-[#EEE] pb-4 mb-6"><span className="text-xl">📸</span><h3 className="text-[18px] font-bold text-[#111]">Product Media & A+ Content</h3></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                       <label className={amzLabel}>Gallery Images (Main Display)</label>
                       <div className="border-2 border-dashed border-[#D5D9D9] rounded-[4px] p-8 text-center hover:bg-[#F7FAFA] transition-colors relative cursor-pointer group">
                         <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setImages(e.target.files)} required />
                         <div className="text-[#565959] group-hover:text-[#111]"><p className="text-2xl mb-1">📤</p><p className="text-[13px] font-medium">Click to upload photos</p><p className="text-[11px] mt-1">{images.length > 0 ? `✅ ${images.length} files selected` : 'Minimum 1 image required'}</p></div>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <label className={amzLabel}>Promo Banners (Description Area)</label>
                       <div className="border-2 border-dashed border-[#D5D9D9] rounded-[4px] p-8 text-center hover:bg-[#F7FAFA] transition-colors relative cursor-pointer group">
                         <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setProductBanners(e.target.files)} />
                         <div className="text-[#565959] group-hover:text-[#111]"><p className="text-2xl mb-1">🖼️</p><p className="text-[13px] font-medium">Add manufacturer info banners</p><p className="text-[11px] mt-1">{productBanners.length > 0 ? `✅ ${productBanners.length} banners selected` : 'A+ Content is optional'}</p></div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DDD] p-4 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] lg:left-[240px]">
                   <div className="max-w-[1000px] mx-auto flex justify-end gap-4 items-center">
                     <div className="hidden md:block text-right pr-4 border-r border-[#EEE]"><p className="text-[11px] text-[#565959] uppercase font-bold">Current Status</p><p className="text-[13px] text-green-700 font-bold">Ready to Publish</p></div>
                     <button type="button" onClick={() => setActiveTab('inventory')} className={amzWhiteBtn}>Discard</button>
                     <button type="submit" className={amzYellowBtn + " px-12"}>Publish Product Listing</button>
                   </div>
                 </div>
               </form>
            </div>
          )}

        </main>
      </div>

      {/* ========================================== */}
      {/* 🚀 THE EDIT MODAL */}
      {/* ========================================== */}
      {editingProduct && editForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200]">
          <div className="bg-[#EAEDED] rounded-[4px] w-full max-w-5xl shadow-2xl flex flex-col h-[90vh]">
            <div className="bg-[#131921] text-white px-6 py-4 flex justify-between items-center rounded-t-[4px]"><div><h2 className="text-[18px] font-bold">Edit Listing</h2><p className="text-[12px] text-gray-400 mt-1">Editing: {editingProduct.name}</p></div><button onClick={() => setEditingProduct(null)} className="text-2xl hover:text-[#febd69] transition-colors">✕</button></div>
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="editForm" onSubmit={handleUpdateProduct} className="space-y-6 max-w-[800px] mx-auto">
                <div className={amzSection}>
                  <h3 className="font-bold text-[14px] border-b border-[#EEE] pb-2 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2"><label className={amzLabel}>Product Name</label><input type="text" className={amzInput} value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} required /></div>
                    <div><label className={amzLabel}>Brand</label><input type="text" className={amzInput} value={editForm.brand} onChange={e => setEditForm({...editForm, brand: e.target.value})} required /></div>
                    <div><label className={amzLabel}>Category</label><select className={amzInput} value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}><option value="Smartphones">Smartphones</option><option value="Laptops">Laptops</option><option value="Audio">Audio</option><option value="Wearables">Wearables</option><option value="Accessories">Accessories</option></select></div>
                    <div className="md:col-span-2"><label className={amzLabel}>Description</label><textarea className={amzInput + " h-24 resize-none"} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} required /></div>
                    <div className="md:col-span-2 flex items-center gap-2"><input type="checkbox" checked={editForm.isBestSeller} onChange={e => setEditForm({...editForm, isBestSeller: e.target.checked})} /><span className="text-[13px] font-bold">Mark as Best Seller</span></div>
                  </div>
                </div>

                <div className={amzSection}>
                  <h3 className="font-bold text-[14px] border-b border-[#EEE] pb-2 mb-4">Pricing, Inventory & Commissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div><label className={amzLabel}>MRP</label><input type="number" className={amzInput} value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} required /></div>
                    <div><label className={amzLabel}>Offer Price</label><input type="number" className={amzInput} value={editForm.discountPrice || ''} onChange={e => setEditForm({...editForm, discountPrice: e.target.value})} /></div>
                    <div><label className={amzLabel}>Stock</label><input type="number" className={amzInput} value={editForm.stock} onChange={e => setEditForm({...editForm, stock: e.target.value})} required /></div>
                    <div><label className={amzLabel}> Comm. (%)</label><input type="number" className={amzInput} value={editForm.affiliateCommission || 0} onChange={e => setEditForm({...editForm, affiliateCommission: e.target.value})} /></div>
                    <div><label className={amzLabel}>Review Reward (₹)</label><input type="number" className={amzInput} value={editForm.reviewCommission || 0} onChange={e => setEditForm({...editForm, reviewCommission: e.target.value})} /></div>
                  </div>
                </div>

                <div className={amzSection}>
                  <h3 className="font-bold text-[14px] border-b border-[#EEE] pb-2 mb-4">Specs & Features</h3>
                  <div className="space-y-6">
                    <div><div className="flex justify-between items-center mb-2"><label className={amzLabel}>Tech Specs</label><button type="button" onClick={() => setEditForm({...editForm, specs: [...editForm.specs, { name: '', value: '' }]})} className="text-[#007185] text-[11px] font-bold">+ Add Row</button></div>{editForm.specs.map((spec, index) => (<div key={index} className="flex gap-2 mb-2"><input type="text" placeholder="Name" className={amzInput + " w-1/3"} value={spec.name} onChange={e => {const n=[...editForm.specs]; n[index].name=e.target.value; setEditForm({...editForm, specs: n})}} /><input type="text" placeholder="Value" className={amzInput + " flex-1"} value={spec.value} onChange={e => {const n=[...editForm.specs]; n[index].value=e.target.value; setEditForm({...editForm, specs: n})}} />{editForm.specs.length > 1 && <button type="button" onClick={() => {const n=editForm.specs.filter((_, i) => i !== index); setEditForm({...editForm, specs: n})}} className="text-red-500 font-bold px-2">✕</button>}</div>))}</div>
                    <div><div className="flex justify-between items-center mb-2"><label className={amzLabel}>Key Features (Bullets)</label><button type="button" onClick={() => setEditForm({...editForm, features: [...editForm.features, '']})} className="text-[#007185] text-[11px] font-bold">+ Add Bullet</button></div>{editForm.features.map((f, index) => (<div key={index} className="flex gap-2 mb-2"><input type="text" className={amzInput} value={f} onChange={e => {const n=[...editForm.features]; n[index]=e.target.value; setEditForm({...editForm, features: n})}} />{editForm.features.length > 1 && <button type="button" onClick={() => {const n=editForm.features.filter((_, i) => i !== index); setEditForm({...editForm, features: n})}} className="text-red-500 font-bold px-2">✕</button>}</div>))}</div>
                  </div>
                </div>

                <div className={amzSection}>
                  <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[14px]">Variants & Modifiers</h3><button type="button" onClick={() => setEditForm({...editForm, variants: [...editForm.variants, { name: '', options: '' }]})} className="text-[#007185] text-[11px] font-bold">+ Add Variant</button></div>
                  <div className="space-y-4">{editForm.variants.map((variant, index) => (<div key={index} className="flex gap-4 bg-[#F9F9F9] p-4 border rounded"><div className="w-1/3"><label className="text-[11px] font-bold text-gray-500">Name</label><input type="text" className={amzInput} value={variant.name} onChange={e => { const n = [...editForm.variants]; n[index].name = e.target.value; setEditForm({...editForm, variants: n}); }} /></div><div className="flex-1"><label className="text-[11px] font-bold text-gray-500">Options (e.g. 128GB, 256GB(+5000))</label><input type="text" className={amzInput} value={variant.options} onChange={e => { const n = [...editForm.variants]; n[index].options = e.target.value; setEditForm({...editForm, variants: n}); }} /></div>{editForm.variants.length > 1 && <button type="button" onClick={() => { const n = editForm.variants.filter((_, i) => i !== index); setEditForm({...editForm, variants: n}); }} className="text-red-500 font-bold">✕</button>}</div>))}</div>
                </div>

                <div className={amzSection}>
                  <h3 className="font-bold text-[14px] border-b border-[#EEE] pb-2 mb-4">SEO & Policies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className={amzLabel}>SEO Title</label><input type="text" className={amzInput} value={editForm.seoTitle || ''} onChange={e => setEditForm({...editForm, seoTitle: e.target.value})} /></div>
                    <div><label className={amzLabel}>SEO Keywords</label><input type="text" className={amzInput} value={editForm.seoKeywords || ''} onChange={e => setEditForm({...editForm, seoKeywords: e.target.value})} /></div>
                    <div className="md:col-span-2"><label className={amzLabel}>SEO Description</label><textarea className={amzInput + " h-16 resize-none"} value={editForm.seoDescription || ''} onChange={e => setEditForm({...editForm, seoDescription: e.target.value})} /></div>
                    <div><label className={amzLabel}>Return Policy</label><input type="text" className={amzInput} value={editForm.returnPolicy} onChange={e => setEditForm({...editForm, returnPolicy: e.target.value})} required /></div>
                    <div><label className={amzLabel}>Warranty Policy</label><input type="text" className={amzInput} value={editForm.warrantyPolicy} onChange={e => setEditForm({...editForm, warrantyPolicy: e.target.value})} required /></div>
                    <div className="md:col-span-2 bg-[#F0F7FF] p-4 border border-[#007185] rounded flex gap-6 items-center">
                       <label className="flex items-center gap-2"><input type="checkbox" checked={editForm.isCancellable} onChange={e => setEditForm({...editForm, isCancellable: e.target.checked})} /><span className="text-[13px] font-bold">Allow Cancellations</span></label>
                       {editForm.isCancellable && ( <div className="flex items-center gap-2"><input type="number" className={amzInput + " w-20"} value={editForm.cancellationWindowHours} onChange={e => setEditForm({...editForm, cancellationWindowHours: e.target.value})} /><span className="text-[12px]">hours</span></div> )}
                    </div>
                  </div>
                </div>

                <div className={amzSection}>
                  <h3 className="font-bold text-[14px] border-b border-[#EEE] pb-2 mb-4">Add Media (Appends to existing)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className={amzLabel}>Add Gallery Images</label><input type="file" multiple accept="image/*" className={amzInput} onChange={e => setEditForm({...editForm, newImagesFiles: e.target.files})} /></div>
                    <div><label className={amzLabel}>Add Promo Banners</label><input type="file" multiple accept="image/*" className={amzInput} onChange={e => setEditForm({...editForm, newBannersFiles: e.target.files})} /></div>
                  </div>
                </div>

              </form>
            </div>
            <div className="bg-white border-t border-[#DDD] p-4 flex justify-end gap-3 rounded-b-[4px]"><button type="button" onClick={() => setEditingProduct(null)} className={amzWhiteBtn}>Cancel Edit</button><button type="submit" form="editForm" className={amzYellowBtn + " px-10"}>Save Changes</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

const SidebarItem = ({ icon, label, active, onClick }) => (<button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-all border-l-4 ${active ? 'bg-[#F0F2F2] border-[#e77600] font-bold' : 'border-transparent text-[#111] hover:bg-gray-50'}`}><span className="text-lg grayscale">{icon}</span> {label}</button>);
const StatCard = ({ label, val, sub, color = "text-[#111]" }) => (<div className="bg-white border border-[#DDD] rounded-[4px] p-5 shadow-sm hover:shadow-md transition-shadow"><p className="text-[11px] font-bold text-[#565959] uppercase tracking-wider">{label}</p><h3 className={`text-2xl font-medium mt-1 ${color}`}>{val}</h3><p className="text-[11px] text-[#007185] mt-2 font-bold">{sub}</p></div>);
