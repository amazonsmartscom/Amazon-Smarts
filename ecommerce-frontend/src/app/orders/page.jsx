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

  // HELPER TO FIX BROKEN IMAGE URLS
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
    if (imagePath.startsWith('http')) {
        return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${imagePath}`;
  };

  useEffect(() => {
    // Protect route: Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
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
      fetchOrders();
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 space-y-4">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-orange-500"></div>
        <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 selection:bg-orange-200">
      
      {/* PREMIUM NAVBAR */}
      <nav className="bg-slate-900 p-5 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer hover:scale-105 transition-transform">
              GADGET<span className="text-white">STORE</span>
            </h1>
          </Link>
          <Link href="/">
            <button className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
              <span>←</span> Back to Store
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-[1000px] mx-auto p-4 md:p-8 mt-4">
        
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Order History</h1>
          <p className="text-slate-500 font-medium mt-2">Track, return, or buy things again.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center flex flex-col items-center">
            <div className="text-6xl mb-6 opacity-50">📦</div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">No orders found</h2>
            <p className="text-slate-500 font-medium mb-8">Looks like you haven't placed any orders yet.</p>
            <Link href="/">
              <button className="bg-slate-900 hover:bg-orange-500 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                
                {/* Order Header */}
                <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6">
                  <div className="flex flex-wrap gap-8 md:gap-12">
                    <div>
                      <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Order Placed</p>
                      <p className="font-bold text-slate-900 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Total</p>
                      <p className="font-black text-slate-900 text-sm">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Ship To</p>
                      <p className="font-bold text-blue-600 text-sm cursor-pointer hover:underline">
                        {order.shippingAddress?.fullName || user?.name || 'Customer'}
                      </p>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto">
                    <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-1">Order ID</p>
                    <p className="font-mono text-slate-900 font-bold text-sm">#{order._id.toUpperCase()}</p>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <h3 className="font-black text-lg text-slate-900">Status:</h3>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
                      'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}>
                      {order.status === 'Delivered' ? '📦 Delivered' : order.status === 'Shipped' ? '🚚 Shipped' : '⏳ Processing'}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center py-6 border-t border-slate-50 first:border-0 first:pt-0">
                        
                        <div className="w-24 h-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-2 flex-shrink-0 relative group">
                          {/* 🚀 FIXED: Using getImageUrl for order history thumbnails */}
                          <img src={getImageUrl(item.image)} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                        </div>
                        
                        <div className="flex-1">
                          <Link href={`/product/${item.product}`}>
                            <h4 className="font-bold text-lg text-slate-900 hover:text-orange-500 transition cursor-pointer line-clamp-2 leading-snug mb-1">
                              {item.name}
                            </h4>
                          </Link>
                          
                          {/* Display Variants if they exist */}
                          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                            <div className="flex gap-2 mt-2 mb-2 flex-wrap">
                              {Object.entries(item.selectedOptions).map(([key, val]) => (
                                <span key={key} className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded">
                                  {key}: {val}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-sm font-bold text-slate-500 mt-2">
                            Qty: <span className="text-slate-900">{item.quantity}</span> <span className="mx-2 text-slate-300">|</span> ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        
                        <div className="w-full sm:w-auto flex flex-col gap-3 mt-4 sm:mt-0">
                          {order.status === 'Delivered' ? (
                            <>
                              <Link href={`/product/${item.product}`}>
                                <button className="w-full sm:w-auto bg-slate-900 hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm">
                                  Buy it again
                                </button>
                              </Link>
                              <Link href={`/product/${item.product}`}>
                                <button className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
                                  Write a product review
                                </button>
                              </Link>
                            </>
                          ) : (
                            <button className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm">
                              Track Package
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


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
//     if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   useEffect(() => {
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
      
//       {/* Breadcrumb Area */}
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
                
//                 {/* Order Header (Amazon's classic gray bar) */}
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
//                       <span className={amzLink}>Invoice</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Body */}
//                 <div className="p-4 bg-white">
//                   <div className="mb-3">
//                     <h3 className="font-bold text-[18px] text-[#0F1111]">
//                       {order.status === 'Delivered' ? 'Delivered' : order.status === 'Shipped' ? 'Shipped' : 'Arriving soon'}
//                     </h3>
//                     <p className="text-[14px] text-[#565959]">
//                       {order.status === 'Delivered' ? 'Your package was delivered.' : 'We are preparing your order for shipment.'}
//                     </p>
//                   </div>

//                   <div className="space-y-4">
//                     {order.orderItems.map((item, index) => (
//                       <div key={index} className="flex flex-col md:flex-row gap-4 items-start py-2">
                        
//                         {/* Image */}
//                         <div className="w-[90px] shrink-0">
//                           <Link href={`/product/${item.product}`}>
//                             <img src={getImageUrl(item.image)} alt={item.name} className="w-full object-contain cursor-pointer mix-blend-multiply" />
//                           </Link>
//                         </div>
                        
//                         {/* Details */}
//                         <div className="flex-1">
//                           <Link href={`/product/${item.product}`}>
//                             <h4 className={`${amzLink} text-[14px] font-medium leading-tight mb-1 line-clamp-2`}>
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
//                             <span className="text-[#565959]">Return window closed</span>
//                           </div>

//                           <div className="mt-4 flex gap-2 md:hidden">
//                             <Link href={`/product/${item.product}`} className="flex-1">
//                               <button className={amzButtonYellow}>Buy it again</button>
//                             </Link>
//                             <button className={amzButtonWhite + " flex-1"}>View item</button>
//                           </div>
//                         </div>
                        
//                         {/* Action Buttons (Desktop Right Side) */}
//                         <div className="hidden md:flex w-[200px] flex-col gap-2 shrink-0 border-l border-[#eee] pl-4">
//                           <Link href={`/product/${item.product}`}>
//                             <button className={amzButtonYellow + " flex items-center justify-center gap-2"}>
//                               <span className="text-lg leading-none">↻</span> Buy it again
//                             </button>
//                           </Link>
//                           <Link href={`/product/${item.product}`}>
//                             <button className={amzButtonWhite}>View your item</button>
//                           </Link>
//                           {order.status === 'Delivered' && (
//                             <Link href={`/product/${item.product}`}>
//                               <button className={amzButtonWhite}>Write a product review</button>
//                             </Link>
//                           )}
//                           <button className={amzButtonWhite}>Track package</button>
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
