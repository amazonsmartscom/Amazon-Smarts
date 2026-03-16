// // src/app/orders/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function MyOrdersPage() {
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Protect route: Redirect to login if not authenticated
//     if (!authLoading && !user) {
//       router.push('/login');
//       return;
//     }

//     if (user) {
//       const fetchOrders = async () => {
//         try {
//           const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user?._id || user?.user?._id}`);
//           setOrders(data);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching orders:", error);
//           setLoading(false);
//         }
//       };
//       fetchOrders();
//     }
//   }, [user, authLoading, router]);

//   if (authLoading || loading) {
//     return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Loading Your Orders...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
//       {/* Navbar */}
//       <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
//         <Link href="/">
//           <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
//             GADGET<span className="text-white">STORE</span>
//           </h1>
//         </Link>
//         <Link href="/">
//           <button className="font-bold text-sm hover:underline">← Back to Store</button>
//         </Link>
//       </nav>

//       <div className="max-w-[1000px] mx-auto p-4 md:p-6 mt-6">
//         <h1 className="text-3xl font-black mb-8 text-slate-900">Your Orders</h1>

//         {orders.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
//             <h2 className="text-xl font-bold mb-2">You haven't placed any orders yet.</h2>
//             <p className="text-gray-500 mb-6">Looks like you need some new gadgets!</p>
//             <Link href="/">
//               <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition">
//                 Start Shopping
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
//                 {/* Order Header */}
//                 <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 text-sm">
//                   <div className="flex gap-8">
//                     <div>
//                       <p className="text-gray-500 font-medium uppercase text-xs">Order Placed</p>
//                       <p className="font-bold text-gray-800">
//                         {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 font-medium uppercase text-xs">Total</p>
//                       <p className="font-bold text-gray-800">₹{order.totalPrice.toLocaleString('en-IN')}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-gray-500 font-medium uppercase text-xs">Order ID</p>
//                     <p className="font-mono text-gray-800 font-bold">#{order._id.slice(-8).toUpperCase()}</p>
//                   </div>
//                 </div>

//                 {/* Order Status & Items */}
//                 <div className="p-6">
//                   <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
//                     Status: 
//                     <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
//                       order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
//                       order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
//                       'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {order.status || 'Processing'}
//                     </span>
//                   </h3>

//                   <div className="space-y-4">
//                     {order.orderItems.map((item, index) => (
//                       <div key={index} className="flex gap-4 items-center">
//                         <div className="w-20 h-20 bg-gray-50 rounded border flex items-center justify-center p-2 flex-shrink-0">
//                           <img src={item.image || 'https://placehold.co/100'} alt={item.name} className="max-w-full max-h-full object-contain" />
//                         </div>
//                         <div className="flex-1">
//                           <Link href={`/product/${item.product}`}>
//                             <h4 className="font-bold text-gray-900 hover:text-orange-500 transition cursor-pointer line-clamp-2">{item.name}</h4>
//                           </Link>
//                           <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
//                         </div>
//                         <div className="hidden sm:block">
//                           <button className="border border-gray-300 px-4 py-2 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
//                             Track Package
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// // src/app/orders/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function MyOrdersPage() {
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // HELPER TO FIX BROKEN IMAGE URLS
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   useEffect(() => {
//     // Protect route: Redirect to login if not authenticated
//     if (!authLoading && !user) {
//       router.push('/login');
//       return;
//     }

//     if (user) {
//       const fetchOrders = async () => {
//         try {
//           const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user?._id || user?.user?._id}`);
//           setOrders(data);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching orders:", error);
//           setLoading(false);
//         }
//       };
//       fetchOrders();
//     }
//   }, [user, authLoading, router]);

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 space-y-4">
//         <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-orange-500"></div>
//         <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 selection:bg-orange-200">
      
//       {/* PREMIUM NAVBAR */}
//       <nav className="bg-slate-900 p-5 text-white shadow-md sticky top-0 z-50">
//         <div className="max-w-[1200px] mx-auto flex justify-between items-center">
//           <Link href="/">
//             <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer hover:scale-105 transition-transform">
//               GADGET<span className="text-white">STORE</span>
//             </h1>
//           </Link>
//           <Link href="/">
//             <button className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
//               <span>←</span> Back to Store
//             </button>
//           </Link>
//         </div>
//       </nav>

//       <div className="max-w-[1000px] mx-auto p-4 md:p-8 mt-4">
        
//         <div className="mb-10">
//           <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Order History</h1>
//           <p className="text-slate-500 font-medium mt-2">Track, return, or buy things again.</p>
//         </div>

//         {orders.length === 0 ? (
//           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center flex flex-col items-center">
//             <div className="text-6xl mb-6 opacity-50">📦</div>
//             <h2 className="text-2xl font-black text-slate-900 mb-2">No orders found</h2>
//             <p className="text-slate-500 font-medium mb-8">Looks like you haven't placed any orders yet.</p>
//             <Link href="/">
//               <button className="bg-slate-900 hover:bg-orange-500 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all">
//                 Start Shopping
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {orders.map((order) => (
//               <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                
//                 {/* Order Header */}
//                 <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6">
//                   <div className="flex flex-wrap gap-8 md:gap-12">
//                     <div>
//                       <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Order Placed</p>
//                       <p className="font-bold text-slate-900 text-sm">
//                         {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Total</p>
//                       <p className="font-black text-slate-900 text-sm">₹{order.totalPrice.toLocaleString('en-IN')}</p>
//                     </div>
//                     <div>
//                       <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Ship To</p>
//                       <p className="font-bold text-blue-600 text-sm cursor-pointer hover:underline">
//                         {order.shippingAddress?.fullName || user?.name || 'Customer'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-left md:text-right w-full md:w-auto">
//                     <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Order ID</p>
//                     <p className="font-mono text-slate-900 font-bold text-sm">#{order._id.toUpperCase()}</p>
//                   </div>
//                 </div>

//                 {/* Order Body */}
//                 <div className="p-6 md:p-8">
//                   <div className="flex items-center gap-3 mb-8">
//                     <h3 className="font-black text-lg text-slate-900">Status:</h3>
//                     <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
//                       order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
//                       order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
//                       'bg-orange-100 text-orange-700 border border-orange-200'
//                     }`}>
//                       {order.status === 'Delivered' ? '📦 Delivered' : order.status === 'Shipped' ? '🚚 Shipped' : '⏳ Processing'}
//                     </span>
//                   </div>

//                   <div className="space-y-6">
//                     {order.orderItems.map((item, index) => (
//                       <div key={index} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center py-6 border-t border-slate-50 first:border-0 first:pt-0">
                        
//                         <div className="w-24 h-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-2 flex-shrink-0 relative group">
//                           {/* 🚀 FIXED: Using getImageUrl for order history thumbnails */}
//                           <img src={getImageUrl(item.image)} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
//                         </div>
                        
//                         <div className="flex-1">
//                           <Link href={`/product/${item.product}`}>
//                             <h4 className="font-bold text-lg text-slate-900 hover:text-orange-500 transition cursor-pointer line-clamp-2 leading-snug mb-1">
//                               {item.name}
//                             </h4>
//                           </Link>
                          
//                           {/* Display Variants if they exist */}
//                           {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                             <div className="flex gap-2 mt-2 mb-2 flex-wrap">
//                               {Object.entries(item.selectedOptions).map(([key, val]) => (
//                                 <span key={key} className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded">
//                                   {key}: {val}
//                                 </span>
//                               ))}
//                             </div>
//                           )}
                          
//                           <p className="text-sm font-bold text-slate-500 mt-2">
//                             Qty: <span className="text-slate-900">{item.quantity}</span> <span className="mx-2 text-slate-300">|</span> ₹{item.price.toLocaleString('en-IN')}
//                           </p>
//                         </div>
                        
//                         <div className="w-full sm:w-auto flex flex-col gap-3 mt-4 sm:mt-0">
//                           {order.status === 'Delivered' ? (
//                             <>
//                               <Link href={`/product/${item.product}`}>
//                                 <button className="w-full sm:w-auto bg-slate-900 hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm">
//                                   Buy it again
//                                 </button>
//                               </Link>
//                               <Link href={`/product/${item.product}`}>
//                                 <button className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
//                                   Write a product review
//                                 </button>
//                               </Link>
//                             </>
//                           ) : (
//                             <button className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm">
//                               Track Package
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }


// // src/app/orders/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function MyOrdersPage() {
//   const { user, loading: authLoading } = useAuth();
//   const router = useRouter();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '#';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user?._id || user?.user?._id}`);
//       setOrders(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push('/login');
//       return;
//     }
//     if (user) {
//       fetchOrders();
//     }
//   }, [user, authLoading, router]);

//   const handleCancelItem = async (orderId, itemId) => {
//     if (!window.confirm("Are you sure you want to cancel this item?")) return;
//     try {
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/cancel`, { itemId: itemId });
//       alert("Item successfully cancelled. Any paid amount will be refunded to your original payment method.");
//       fetchOrders(); 
//     } catch (error) {
//       alert(error.response?.data?.message || "Cannot cancel this item. The cancellation window may have passed or this product is non-cancellable.");
//     }
//   };

//   // 🚀 AMAZON-SPECIFIC TAILWIND STYLES
//   const amzButtonYellow = "bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[5px] px-[14px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center w-full";
//   const amzButtonWhite = "bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[5px] px-[14px] rounded-full text-[13px] text-[#0F1111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center w-full";
//   const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer";

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 space-y-4">
//         <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20 selection:bg-orange-200">
//       <div className="max-w-[1000px] mx-auto px-4 pt-4 pb-2">
//         <div className="text-[12px] text-[#565959] mb-4 flex items-center gap-1">
//           <Link href="/" className={amzLink}>Your Account</Link> 
//           <span>›</span> 
//           <span className="text-[#c45500]">Your Orders</span>
//         </div>
//         <div className="flex justify-between items-baseline mb-4">
//           <h1 className="text-[28px] font-normal leading-tight">Your Orders</h1>
//           <div className="hidden sm:flex gap-4 text-[14px] text-[#007185]">
//             <span className="font-bold border-b-2 border-[#e77600] text-[#0F1111] pb-1 cursor-pointer">Orders</span>
//             <span className="hover:text-[#c45500] hover:underline cursor-pointer">Buy Again</span>
//             <span className="hover:text-[#c45500] hover:underline cursor-pointer">Not Yet Shipped</span>
//             <span className="hover:text-[#c45500] hover:underline cursor-pointer">Cancelled Orders</span>
//           </div>
//         </div>
//         <div className="sm:hidden border-b border-[#ddd] mb-4"></div>
//       </div>

//       <div className="max-w-[1000px] mx-auto px-4">
//         {orders.length === 0 ? (
//           <div className="border border-[#ddd] rounded-[8px] p-8 text-center flex flex-col items-center bg-[#f7fafa]">
//             <p className="text-[14px] text-[#0F1111] font-bold mb-4">Looks like you haven't placed any orders yet.</p>
//             <Link href="/">
//               <button className={amzButtonYellow + " w-auto px-8"}>Start Shopping</button>
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <p className="text-[14px] font-bold mb-4">{orders.length} orders placed</p>
            
//             {orders.map((order) => (
//               <div key={order._id} className="border border-[#d5d9d9] rounded-[8px] overflow-hidden mb-4">
                
//                 <div className="bg-[#f0f2f2] p-3.5 border-b border-[#d5d9d9] flex flex-wrap justify-between text-[12px] text-[#565959]">
//                   <div className="flex flex-wrap gap-8 md:gap-16">
//                     <div className="flex flex-col">
//                       <span className="uppercase">Order placed</span>
//                       <span className="text-[#0F1111]">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="uppercase">Total</span>
//                       <span className="text-[#0F1111]">₹{order.totalPrice.toLocaleString('en-IN')}</span>
//                     </div>
//                     <div className="flex flex-col relative group">
//                       <span className="uppercase">Ship to</span>
//                       <span className={`${amzLink} flex items-center gap-1`}>
//                         {order.shippingAddress?.fullName || user?.name?.split(' ')[0] || 'Customer'}
//                         <span className="text-[8px]">▼</span>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col text-left md:text-right w-full md:w-auto mt-2 md:mt-0">
//                     <span className="uppercase">Order # {order._id.toUpperCase()}</span>
//                     <div className="flex gap-2 justify-start md:justify-end mt-1">
//                       <span className={amzLink}>View order details</span>
//                       <span className="text-[#ddd]">|</span>
                      
//                       {/* 🚀 DYNAMIC INVOICE LINK */}
//                       {order.invoiceUrl ? (
//                         <a href={getImageUrl(order.invoiceUrl)} target="_blank" rel="noopener noreferrer" className={amzLink}>
//                           Invoice
//                         </a>
//                       ) : (
//                         <span className="text-[#a6a6a6] cursor-default" title="Invoice processing...">Invoice</span>
//                       )}

//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-white">
//                   <div className="mb-3">
//                     <h3 className={`font-bold text-[18px] ${order.status === 'Cancelled' ? 'text-[#c40000]' : 'text-[#0F1111]'}`}>
//                       {order.status === 'Delivered' ? 'Delivered' : 
//                        order.status === 'Shipped' ? 'Shipped' : 
//                        order.status === 'Cancelled' ? 'Cancelled' : 'Arriving soon'}
//                     </h3>
//                     <p className="text-[14px] text-[#565959]">
//                       {order.status === 'Delivered' ? 'Your package was delivered.' : 
//                        order.status === 'Cancelled' ? 'This order has been cancelled.' : 'We are preparing your order for shipment.'}
//                     </p>
//                   </div>

//                   <div className="space-y-4">
//                     {order.orderItems.map((item, index) => (
//                       <div key={index} className="flex flex-col md:flex-row gap-4 items-start py-2">
                        
//                         <div className="w-[90px] shrink-0">
//                           <Link href={`/product/${item.product}`}>
//                             <img src={getImageUrl(item.image)} alt={item.name} className={`w-full object-contain cursor-pointer mix-blend-multiply ${order.status === 'Cancelled' ? 'opacity-50 grayscale' : ''}`} />
//                           </Link>
//                         </div>
                        
//                         <div className="flex-1">
//                           <Link href={`/product/${item.product}`}>
//                             <h4 className={`${amzLink} text-[14px] font-medium leading-tight mb-1 line-clamp-2 ${order.status === 'Cancelled' ? 'text-[#565959] line-through' : ''}`}>
//                               {item.name}
//                             </h4>
//                           </Link>
                          
//                           {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                             <div className="text-[12px] text-[#565959] mb-1">
//                               {Object.entries(item.selectedOptions).map(([key, val]) => (
//                                 <span key={key} className="mr-3">{key}: <span className="text-[#0F1111]">{val}</span></span>
//                               ))}
//                             </div>
//                           )}
                          
//                           <div className="text-[12px] text-[#0F1111] mt-2">
//                             {order.status === 'Cancelled' ? (
//                               <span className="text-[#c40000] font-bold">Item Cancelled</span>
//                             ) : (
//                               <span className="text-[#565959]">Return window valid for 7 days after delivery</span>
//                             )}
//                           </div>

//                           <div className="mt-4 flex flex-wrap gap-2 md:hidden">
//                             <Link href={`/product/${item.product}`} className="flex-1">
//                               <button className={amzButtonYellow}>Buy it again</button>
//                             </Link>
                            
//                             {order.status !== 'Shipped' && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
//                               <button onClick={() => handleCancelItem(order._id, item._id)} className={amzButtonWhite + " flex-1"}>Cancel item</button>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div className="hidden md:flex w-[200px] flex-col gap-2 shrink-0 border-l border-[#eee] pl-4">
//                           <Link href={`/product/${item.product}`}>
//                             <button className={amzButtonYellow + " flex items-center justify-center gap-2"}>
//                               <span className="text-lg leading-none">↻</span> Buy it again
//                             </button>
//                           </Link>
                          
//                           {order.status !== 'Shipped' && order.status !== 'Delivered' && order.status !== 'Cancelled' ? (
//                             <button onClick={() => handleCancelItem(order._id, item._id)} className={amzButtonWhite}>
//                               Cancel item
//                             </button>
//                           ) : (
//                             <Link href={`/product/${item.product}`}>
//                               <button className={amzButtonWhite}>View your item</button>
//                             </Link>
//                           )}

//                           {order.status === 'Delivered' && (
//                             <Link href={`/product/${item.product}`}>
//                               <button className={amzButtonWhite}>Write a product review</button>
//                             </Link>
//                           )}
                          
//                           {order.status !== 'Cancelled' && (
//                             <button className={amzButtonWhite}>Track package</button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// src/app/orders/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'buy_again', 'not_shipped', 'cancelled'
  const [trackingOrder, setTrackingOrder] = useState(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '#';
    if (imagePath.startsWith('http')) {
        return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${imagePath}`;
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${user?._id || user?.user?._id}`);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      fetchOrders();
    }
  }, [user, authLoading, router]);

  const handleCancelItem = async (orderId, itemId) => {
    if (!window.confirm("Are you sure you want to cancel this item?")) return;
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/cancel`, { itemId: itemId });
      alert("Item successfully cancelled. Any paid amount will be refunded to your original payment method.");
      fetchOrders(); 
    } catch (error) {
      alert(error.response?.data?.message || "Cannot cancel this item. The cancellation window may have passed or this product is non-cancellable.");
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'not_shipped') return order.status === 'Processing';
    if (activeTab === 'cancelled') return order.status === 'Cancelled';
    return true; 
  });

  const buyAgainItems = [];
  if (activeTab === 'buy_again') {
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        // Safely extract product ID
        const prodId = item.product?._id || item.product;
        if (!buyAgainItems.some(existing => (existing.product?._id || existing.product) === prodId)) {
          buyAgainItems.push(item);
        }
      });
    });
  }

  // AMAZON-SPECIFIC TAILWIND STYLES
  const amzButtonYellow = "bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[5px] px-[14px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center w-full";
  const amzButtonWhite = "bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[5px] px-[14px] rounded-full text-[13px] text-[#0F1111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center w-full";
  const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer";
  const activeTabStyle = "font-bold border-b-2 border-[#e77600] text-[#0F1111] pb-1 cursor-pointer";
  const inactiveTabStyle = "text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer pb-1";

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 space-y-4">
        <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20 selection:bg-orange-200">
      
      <div className="max-w-[1000px] mx-auto px-4 pt-4 pb-2">
        <div className="text-[12px] text-[#565959] mb-4 flex items-center gap-1">
          <Link href="/account" className={amzLink}>Your Account</Link> 
          <span>›</span> 
          <span className="text-[#c45500]">Your Orders</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-4 gap-4">
          <h1 className="text-[28px] font-normal leading-tight">Your Orders</h1>
          
          <div className="flex flex-wrap gap-4 text-[14px] border-b sm:border-none border-[#ddd] pb-2 sm:pb-0 w-full sm:w-auto">
            <span onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? activeTabStyle : inactiveTabStyle}>Orders</span>
            <span onClick={() => setActiveTab('buy_again')} className={activeTab === 'buy_again' ? activeTabStyle : inactiveTabStyle}>Buy Again</span>
            <span onClick={() => setActiveTab('not_shipped')} className={activeTab === 'not_shipped' ? activeTabStyle : inactiveTabStyle}>Not Yet Shipped</span>
            <span onClick={() => setActiveTab('cancelled')} className={activeTab === 'cancelled' ? activeTabStyle : inactiveTabStyle}>Cancelled Orders</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4">
        
        {/* ================= BUY AGAIN TAB VIEW ================= */}
        {activeTab === 'buy_again' ? (
          buyAgainItems.length === 0 ? (
            <div className="border border-[#ddd] rounded-[8px] p-8 text-center bg-[#f7fafa]">
              <p className="text-[14px] text-[#0F1111] font-bold">No past purchases found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {buyAgainItems.map((item, idx) => {
                const prodId = item.product?._id || item.product;
                return (
                  <div key={idx} className="border border-[#ddd] rounded-[8px] p-4 flex flex-col items-center text-center">
                    <div className="w-32 h-32 mb-4">
                      <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <Link href={`/product/${prodId}`} className={`${amzLink} text-[13px] font-medium line-clamp-2 mb-2 h-10`}>
                      {item.name}
                    </Link>
                    <Link href={`/product/${prodId}`} className="w-full mt-auto">
                      <button className={amzButtonYellow}>View Item</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )

        // ================= STANDARD ORDERS LIST VIEW =================
        ) : filteredOrders.length === 0 ? (
          <div className="border border-[#ddd] rounded-[8px] p-8 text-center flex flex-col items-center bg-[#f7fafa]">
            <p className="text-[14px] text-[#0F1111] font-bold mb-4">
              {activeTab === 'not_shipped' ? "You don't have any pending shipments." : 
               activeTab === 'cancelled' ? "You don't have any cancelled orders." : 
               "Looks like you haven't placed any orders yet."}
            </p>
            <Link href="/">
              <button className={amzButtonYellow + " w-auto px-8"}>Start Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-[14px] font-bold mb-4">{filteredOrders.length} orders placed</p>
            
            {filteredOrders.map((order) => (
              <div key={order._id} className="border border-[#d5d9d9] rounded-[8px] overflow-hidden mb-4">
                
                <div className="bg-[#f0f2f2] p-3.5 border-b border-[#d5d9d9] flex flex-wrap justify-between text-[12px] text-[#565959]">
                  <div className="flex flex-wrap gap-8 md:gap-16">
                    <div className="flex flex-col">
                      <span className="uppercase">Order placed</span>
                      <span className="text-[#0F1111]">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="uppercase">Total</span>
                      <span className="text-[#0F1111]">₹{order.totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex flex-col relative group">
                      <span className="uppercase">Ship to</span>
                      <span className={`${amzLink} flex items-center gap-1`}>
                        {order.shippingAddress?.fullName || user?.name?.split(' ')[0] || 'Customer'}
                        <span className="text-[8px]">▼</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col text-left md:text-right w-full md:w-auto mt-2 md:mt-0">
                    <span className="uppercase">Order # {order._id.toUpperCase()}</span>
                    <div className="flex gap-2 justify-start md:justify-end mt-1">
                      <span className={amzLink}>View order details</span>
                      <span className="text-[#ddd]">|</span>
                      {order.invoiceUrl ? (
                        <a href={getImageUrl(order.invoiceUrl)} target="_blank" rel="noopener noreferrer" className={amzLink}>Invoice</a>
                      ) : (
                        <span className="text-[#a6a6a6] cursor-default" title="Invoice processing...">Invoice</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <div className="mb-3">
                    <h3 className={`font-bold text-[18px] ${order.status === 'Cancelled' ? 'text-[#c40000]' : 'text-[#0F1111]'}`}>
                      {order.status === 'Delivered' ? 'Delivered' : 
                       order.status === 'Shipped' ? 'Shipped' : 
                       order.status === 'Cancelled' ? 'Cancelled' : 'Arriving soon'}
                    </h3>
                    <p className="text-[14px] text-[#565959]">
                      {order.status === 'Delivered' ? 'Your package was delivered.' : 
                       order.status === 'Cancelled' ? 'This order has been cancelled.' : 'We are preparing your order for shipment.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => {
                      
                      // 🚀 NEW: Safely determine Cancellable Status and Product ID
                      const productId = item.product?._id || item.product;
                      const isItemCancellable = item.product?.isCancellable !== false; // False only if explicitly set to false
                      const isOrderActive = order.status !== 'Shipped' && order.status !== 'Delivered' && order.status !== 'Cancelled';
                      const showCancelBtn = isOrderActive && isItemCancellable;

                      return (
                        <div key={index} className="flex flex-col md:flex-row gap-4 items-start py-2">
                          
                          <div className="w-[90px] shrink-0">
                            <Link href={`/product/${productId}`}>
                              <img src={getImageUrl(item.image)} alt={item.name} className={`w-full object-contain cursor-pointer mix-blend-multiply ${order.status === 'Cancelled' ? 'opacity-50 grayscale' : ''}`} />
                            </Link>
                          </div>
                          
                          <div className="flex-1">
                            <Link href={`/product/${productId}`}>
                              <h4 className={`${amzLink} text-[14px] font-medium leading-tight mb-1 line-clamp-2 ${order.status === 'Cancelled' ? 'text-[#565959] line-through' : ''}`}>
                                {item.name}
                              </h4>
                            </Link>
                            
                            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                              <div className="text-[12px] text-[#565959] mb-1">
                                {Object.entries(item.selectedOptions).map(([key, val]) => (
                                  <span key={key} className="mr-3">{key}: <span className="text-[#0F1111] font-bold">{val}</span></span>
                                ))}
                              </div>
                            )}
                            
                            <div className="text-[12px] text-[#0F1111] mt-2">
                              {order.status === 'Cancelled' ? (
                                <span className="text-[#c40000] font-bold">Item Cancelled</span>
                              ) : (
                                <span className="text-[#565959]">Return window valid for 7 days after delivery</span>
                              )}
                            </div>

                            {/* MOBILE BUTTONS */}
                            <div className="mt-4 flex flex-wrap gap-2 md:hidden">
                              <Link href={`/product/${productId}`} className="flex-1">
                                <button className={amzButtonYellow}>Buy it again</button>
                              </Link>
                              {showCancelBtn ? (
                                <button onClick={() => handleCancelItem(order._id, item._id)} className={amzButtonWhite + " flex-1"}>Cancel item</button>
                              ) : isOrderActive ? (
                                <span className="text-[#B12704] text-[11px] font-bold py-1 w-full flex-1 mt-1">Non-cancellable item</span>
                              ) : null}
                            </div>
                          </div>
                          
                          {/* DESKTOP BUTTONS */}
                          <div className="hidden md:flex w-[200px] flex-col gap-2 shrink-0 border-l border-[#eee] pl-4">
                            <Link href={`/product/${productId}`}>
                              <button className={amzButtonYellow + " flex items-center justify-center gap-2"}>
                                <span className="text-lg leading-none">↻</span> Buy it again
                              </button>
                            </Link>
                            
                            {showCancelBtn ? (
                              <button onClick={() => handleCancelItem(order._id, item._id)} className={amzButtonWhite}>
                                Cancel item
                              </button>
                            ) : (
                              <>
                                <Link href={`/product/${productId}`}>
                                  <button className={amzButtonWhite}>View your item</button>
                                </Link>
                                {!isItemCancellable && isOrderActive && (
                                  <span className="text-[#B12704] text-[10px] text-center font-bold px-2">Non-cancellable item</span>
                                )}
                              </>
                            )}

                            {order.status === 'Delivered' && (
                              <Link href={`/product/${productId}`}>
                                <button className={amzButtonWhite}>Write a product review</button>
                              </Link>
                            )}
                            
                            {/* TRACKING BUTTON */}
                            {order.status !== 'Cancelled' && (
                              <button onClick={() => setTrackingOrder(order)} className={amzButtonWhite}>Track package</button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= 🚀 TRACKING MODAL ================= */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[8px] w-full max-w-[500px] shadow-[0_2px_10px_rgba(0,0,0,0.2)] overflow-hidden">
            <div className="bg-[#f3f3f3] border-b border-[#ddd] p-4 flex justify-between items-center">
              <h2 className="text-[16px] font-bold text-[#0F1111]">Track Package</h2>
              <button onClick={() => setTrackingOrder(null)} className="text-[#0F1111] hover:text-[#c40000] text-xl leading-none">✕</button>
            </div>
            
            <div className="p-6">
              <p className="font-bold text-[18px] text-[#111] mb-1">
                {trackingOrder.status === 'Delivered' ? 'Delivered successfully' : 
                 trackingOrder.status === 'Shipped' ? 'On the way' : 'Order received'}
              </p>
              <p className="text-[13px] text-[#565959] mb-6">
                Order ID: {trackingOrder._id.toUpperCase()}
              </p>

              {/* PROGRESS BAR */}
              <div className="relative mb-8 px-4 mt-8">
                {/* Background Line */}
                <div className="absolute top-1/2 left-[10%] right-[10%] h-1.5 bg-[#ddd] -translate-y-1/2 rounded-full z-0"></div>
                
                {/* Active Line */}
                <div className={`absolute top-1/2 left-[10%] h-1.5 bg-[#007600] -translate-y-1/2 rounded-full z-0 transition-all duration-500
                  ${trackingOrder.status === 'Processing' ? 'w-[10%]' : 
                    trackingOrder.status === 'Shipped' ? 'w-[50%]' : 
                    trackingOrder.status === 'Delivered' ? 'w-[80%]' : 'w-0'}`}
                ></div>

                <div className="flex justify-between relative z-10">
                  
                  {/* Step 1: Ordered */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 bg-[#007600] rounded-full border-4 border-white shadow-[0_0_0_1px_#007600]"></div>
                    <span className="text-[11px] font-bold text-[#111] mt-2">Ordered</span>
                  </div>
                  
                  {/* Step 2: Shipped */}
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full border-4 border-white shadow-[0_0_0_1px_#ddd] transition-colors
                      ${(trackingOrder.status === 'Shipped' || trackingOrder.status === 'Delivered') ? 'bg-[#007600] shadow-[0_0_0_1px_#007600]' : 'bg-[#f3f3f3]'}`}></div>
                    <span className={`text-[11px] font-bold mt-2 ${(trackingOrder.status === 'Shipped' || trackingOrder.status === 'Delivered') ? 'text-[#111]' : 'text-[#565959]'}`}>Shipped</span>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full border-4 border-white shadow-[0_0_0_1px_#ddd] transition-colors
                      ${trackingOrder.status === 'Delivered' ? 'bg-[#007600] shadow-[0_0_0_1px_#007600]' : 'bg-[#f3f3f3]'}`}></div>
                    <span className={`text-[11px] font-bold mt-2 ${trackingOrder.status === 'Delivered' ? 'text-[#111]' : 'text-[#565959]'}`}>Delivered</span>
                  </div>

                </div>
              </div>

              {/* TIMELINE LIST */}
              <div className="space-y-4 border-t border-[#eee] pt-4">
                {trackingOrder.status === 'Delivered' && (
                  <div className="flex gap-4">
                    <div className="text-[12px] font-bold w-16 text-[#565959] shrink-0 text-right mt-0.5">Updated</div>
                    <div className="text-[13px] text-[#111]">
                      <span className="font-bold text-[#007600]">Delivered</span><br/>
                      Package was handed directly to resident.
                    </div>
                  </div>
                )}
                {(trackingOrder.status === 'Shipped' || trackingOrder.status === 'Delivered') && (
                  <div className="flex gap-4">
                    <div className="text-[12px] font-bold w-16 text-[#565959] shrink-0 text-right mt-0.5">Updated</div>
                    <div className="text-[13px] text-[#111]">
                      <span className="font-bold text-[#e77600]">Shipped</span><br/>
                      Package has left the Amazon Smarts fulfillment center.
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="text-[12px] font-bold w-16 text-[#565959] shrink-0 text-right mt-0.5">
                    {new Date(trackingOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                  <div className="text-[13px] text-[#111]">
                    <span className="font-bold">Ordered</span><br/>
                    Order received and is currently being processed.
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}

    </div>
  );
}