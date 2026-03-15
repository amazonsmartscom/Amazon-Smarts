// // src/app/checkout/page.jsx
// 'use client';
// import { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function CheckoutPage() {
//   // Removed cartTotal from here to prevent the error
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.user?.name || '',
//     phone: '',
//     address: '',
//     city: '',
//     pincode: ''
//   });

//   const [isProcessing, setIsProcessing] = useState(false);

//   // 🚀 BULLETPROOF TOTAL CALCULATOR
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const itemPrice = item.discountPrice || item.price;
//       const itemQty = item.quantity || 1;
//       return total + (itemPrice * itemQty);
//     }, 0);
//   };

//   // If cart is empty, send them back to store
//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Your cart is empty!</h2>
//         <Link href="/">
//           <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-orange-600 transition">
//             Go Shopping
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       // 1. Create the Order in the database WITH shipping info
//       const orderPayload = {
//         userId: user.user.id,
//         orderItems: cart.map(item => ({
//           name: item.name,
//           quantity: item.quantity || 1,
//           image: item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100',
//           price: item.discountPrice || item.price,
//           product: item._id
//         })),
//         totalPrice: calculateTotal(), // 🚀 USING LOCAL CALCULATOR
//         shippingAddress: shippingInfo
//       };

//       const { data } = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/orders', orderPayload);

//       // 2. Simulate Payment
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.order._id}/pay`);

//       alert("🎉 Order Placed Successfully!");
//       if(clearCart) clearCart(); // Empty the cart
//       router.push('/orders'); // Send them to My Orders page

//     } catch (error) {
//       console.error(error);
//       alert("Error placing order. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   const inputStyles = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none";

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 font-sans">
//       <nav className="bg-slate-900 p-4 text-white shadow-md text-center">
//         <h1 className="text-2xl font-black tracking-widest text-orange-500">SECURE <span className="text-white">CHECKOUT</span></h1>
//       </nav>

//       <div className="max-w-[1000px] mx-auto p-4 md:p-8 mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* LEFT: Shipping Form */}
//         <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Shipping Details</h2>
//           <form onSubmit={handlePlaceOrder} className="space-y-4">
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
//                 <input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
//                 <input type="tel" required className={inputStyles} value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-1">Complete Address (House No, Building, Street)</label>
//               <textarea required className={`${inputStyles} h-24`} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})}></textarea>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
//                 <input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">Pincode</label>
//                 <input type="text" required className={inputStyles} value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} />
//               </div>
//             </div>

//             <button 
//               type="submit" 
//               disabled={isProcessing}
//               className={`w-full mt-8 py-4 rounded-xl font-bold text-lg shadow-md transition ${isProcessing ? 'bg-gray-400 text-gray-200' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
//             >
//               {isProcessing ? 'Processing Payment...' : 'Place Order & Pay'}
//             </button>
//           </form>
//         </div>

//         {/* RIGHT: Order Summary */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
//           <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Order Summary</h2>
//           <div className="space-y-4 mb-6">
//             {cart.map((item, idx) => (
//               <div key={idx} className="flex justify-between text-sm">
//                 <span className="text-gray-600 line-clamp-1 pr-4">{item.quantity || 1}x {item.name}</span>
//                 <span className="font-bold text-gray-900">₹{((item.discountPrice || item.price) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
//               </div>
//             ))}
//           </div>
//           <div className="border-t pt-4 flex justify-between items-center text-xl font-black text-gray-900">
//             <span>Total:</span>
//             {/* 🚀 USING LOCAL CALCULATOR HERE */}
//             <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
//           </div>
//           <p className="text-xs text-center text-green-600 font-bold mt-4">Free Delivery Included</p>
//         </div>

//       </div>
//     </div>
//   );
// }

// // src/app/checkout/page.jsx
// 'use client';
// import { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', // 🚀 Fixed
//     phone: '',
//     address: '',
//     city: '',
//     pincode: ''
//   });

//   const [isProcessing, setIsProcessing] = useState(false);

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => {
//       const itemPrice = item.discountPrice || item.price;
//       const itemQty = item.quantity || 1;
//       return total + (itemPrice * itemQty);
//     }, 0);
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Your cart is empty!</h2>
//         <Link href="/">
//           <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-orange-600 transition">
//             Go Shopping
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       const orderPayload = {
//         // 🚀 CRITICAL FIX: Safe ID
//         userId: user?._id || user?.user?._id,
//         orderItems: cart.map(item => ({
//           name: item.name,
//           quantity: item.quantity || 1,
//           image: item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100',
//           price: item.discountPrice || item.price,
//           product: item._id,
//           selectedOptions: item.selectedOptions || {} 
//         })),
//         totalPrice: calculateTotal(),
//         shippingAddress: shippingInfo
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);

//       // Simulate Payment
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.order._id}/pay`);

//       alert("🎉 Order Placed Successfully!");
//       if(clearCart) clearCart(); 
//       router.push('/orders'); 

//     } catch (error) {
//       console.error("Order Error:", error);
//       alert("Error placing order. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   const inputStyles = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none";

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 font-sans">
//       <nav className="bg-slate-900 p-4 text-white shadow-md text-center">
//         <h1 className="text-2xl font-black tracking-widest text-orange-500">SECURE <span className="text-white">CHECKOUT</span></h1>
//       </nav>

//       <div className="max-w-[1000px] mx-auto p-4 md:p-8 mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* LEFT: Shipping Form */}
//         <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Shipping Details</h2>
//           <form onSubmit={handlePlaceOrder} className="space-y-4">
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
//                 <input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
//                 <input type="tel" required className={inputStyles} value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-1">Complete Address (House No, Building, Street)</label>
//               <textarea required className={`${inputStyles} h-24`} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})}></textarea>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
//                 <input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-1">Pincode</label>
//                 <input type="text" required className={inputStyles} value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} />
//               </div>
//             </div>

//             <button 
//               type="submit" 
//               disabled={isProcessing}
//               className={`w-full mt-8 py-4 rounded-xl font-bold text-lg shadow-md transition ${isProcessing ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
//             >
//               {isProcessing ? 'Processing Payment...' : 'Place Order & Pay'}
//             </button>
//           </form>
//         </div>

//         {/* RIGHT: Order Summary */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
//           <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Order Summary</h2>
//           <div className="space-y-4 mb-6">
//             {cart.map((item, idx) => (
//               <div key={idx} className="flex flex-col border-b border-gray-50 pb-3 last:border-0 text-sm">
//                 <div className="flex justify-between font-bold text-gray-900">
//                   <span className="line-clamp-1 pr-4">{item.quantity || 1}x {item.name}</span>
//                   <span>₹{((item.discountPrice || item.price) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
//                 </div>
                
//                 {/* 🚀 CUSTOMER SEES THEIR VARIANTS IN CHECKOUT */}
//                 {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                   <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">
//                     {Object.entries(item.selectedOptions).map(([key, val]) => (
//                       <span key={key} className="mr-2 bg-gray-100 px-1 py-0.5 rounded">{key}: {val}</span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="border-t pt-4 flex justify-between items-center text-xl font-black text-gray-900">
//             <span>Total:</span>
//             <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
//           </div>
//           <p className="text-xs text-center text-green-600 font-bold mt-4">Free Delivery Included</p>
//         </div>

//       </div>
//     </div>
//   );
// }


// src/app/checkout/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); 
  const { user } = useAuth();
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || user?.user?.name || '', 
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 🚀 CONSISTENT CALCULATION LOGIC (Matches Cart Page)
  const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
  const shippingPrice = itemsPrice > 50000 ? 0 : 499; 
  const grandTotal = itemsPrice + (cart.length > 0 ? shippingPrice : 0);

  // HELPER TO FIX BROKEN IMAGE URLS
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
    if (imagePath.startsWith('http')) {
        return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${imagePath}`;
  };

  if (!isHydrated) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-6 opacity-50">🛒</div>
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Your cart is empty</h2>
        <p className="text-slate-500 font-medium mb-8">You need to add items before you can checkout.</p>
        <Link href="/">
          <button className="bg-slate-900 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1">
            Return to Store
          </button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderPayload = {
        userId: user?._id || user?.user?._id || undefined, // undefined allows guest checkout if backend supports it
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          image: item.images && item.images.length > 0 ? item.images[0] : '',
          price: item.discountPrice || item.price,
          product: item._id,
          selectedOptions: item.selectedOptions || {} 
        })),
        itemsPrice,
        shippingPrice,
        totalPrice: grandTotal,
        shippingAddress: shippingInfo,
        paymentMethod: 'COD' // Explicitly defining COD
      };

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);

      // Simulate Payment step (or verify COD)
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.order._id}/pay`);

      alert("🎉 Order Placed Successfully!");
      if(clearCart) clearCart(); 
      router.push('/orders'); 

    } catch (error) {
      console.error("Order Error:", error);
      alert(error.response?.data?.message || "Error placing order. Please try again.");
      setIsProcessing(false);
    }
  };

  const inputStyles = "w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium shadow-sm";
  const labelStyles = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans selection:bg-orange-200">
      
      {/* PREMIUM NAVBAR */}
      <nav className="bg-slate-900 p-5 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer hover:scale-105 transition-transform">
              GADGET<span className="text-white">STORE</span>
            </h1>
          </Link>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
            <span>---------</span>
            <span className="text-orange-500">Checkout</span>
            <span>---------</span>
            <span>Complete</span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto p-4 md:p-8 mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Form Card */}
          <form id="checkoutForm" onSubmit={handlePlaceOrder} className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 border-b border-slate-100 pb-6">
              <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Shipping Details
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>Full Name</label>
                  <input type="text" required className={inputStyles} placeholder="John Doe" value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} />
                </div>
                <div>
                  <label className={labelStyles}>Phone Number</label>
                  <input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} />
                </div>
              </div>

              <div>
                <label className={labelStyles}>Complete Address</label>
                <textarea required className={`${inputStyles} h-28 resize-none`} placeholder="House No, Building, Street, Area" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})}></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>City / District</label>
                  <input type="text" required className={inputStyles} placeholder="e.g. Mumbai" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
                </div>
                <div>
                  <label className={labelStyles}>Pincode / Postal Code</label>
                  <input type="text" required className={inputStyles} placeholder="e.g. 400001" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} />
                </div>
              </div>
            </div>
          </form>

          {/* Payment Method Card */}
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-6">
              <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>

            <div className="border-2 border-orange-500 bg-orange-50 p-5 rounded-2xl flex items-start md:items-center gap-4 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-10">💵</div>
              <div className="w-6 h-6 rounded-full border-4 border-orange-500 flex items-center justify-center bg-white flex-shrink-0 mt-1 md:mt-0">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
              </div>
              <div className="relative z-10">
                <h3 className="font-black text-orange-900 text-lg">Cash on Delivery (COD)</h3>
                <p className="text-sm font-medium text-orange-800 mt-1">Pay securely with cash or UPI when your order arrives at your doorstep.</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT: Order Summary */}
        <div className="w-full">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
            <h3 className="text-xl font-black text-slate-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar border-b border-slate-100 pb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 p-1 flex-shrink-0">
                    <img src={getImageUrl(item.images[0])} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-tight">{item.name}</h4>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Qty: {item.quantity || 1}</span>
                      <span className="font-black text-slate-900 text-sm">₹{((item.discountPrice || item.price) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-slate-600 border-b border-slate-100 pb-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-slate-900">₹{itemsPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Shipping</span>
                <span className={`font-black ${shippingPrice === 0 ? 'text-emerald-500' : 'text-slate-900'}`}>
                  {shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">To Pay</span>
                <span className="text-[10px] text-slate-400">Inclusive of all taxes</span>
              </div>
              <span className="text-3xl font-black text-orange-600 tracking-tight">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button 
              type="submit" 
              form="checkoutForm"
              disabled={isProcessing}
              className={`w-full font-black py-4 rounded-xl uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-2 shadow-lg ${isProcessing ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-orange-500/30 hover:-translate-y-1'}`}
            >
              {isProcessing ? (
                <><span className="animate-spin text-xl">⏳</span> Processing...</>
              ) : (
                <>Confirm Order <span className="text-lg">→</span></>
              )}
            </button>
            
            <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="text-lg">🛡️</span> Your personal information is encrypted and securely processed.
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="text-lg">📦</span> 7-Day easy returns and replacements available.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


// // src/app/checkout/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [isHydrated, setIsHydrated] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     phone: '',
//     address: '',
//     city: '',
//     pincode: ''
//   });

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
//   const shippingPrice = itemsPrice > 50000 ? 0 : 499; 
//   const grandTotal = itemsPrice + (cart.length > 0 ? shippingPrice : 0);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   // 🚀 AMAZON-SPECIFIC TAILWIND STYLES
//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";

//   if (!isHydrated) return null;

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-20">
//         <h2 className="text-[24px] font-bold text-[#111] mb-4">Your Amazon Smarts Cart is empty.</h2>
//         <Link href="/">
//           <button className={amzButton + " px-6 py-2 w-auto rounded-[3px]"}>
//             Continue Shopping
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       const orderPayload = {
//         userId: user?._id || user?.user?._id || undefined, 
//         orderItems: cart.map(item => ({
//           name: item.name,
//           quantity: item.quantity || 1,
//           image: item.images && item.images.length > 0 ? item.images[0] : '',
//           price: item.discountPrice || item.price,
//           product: item._id,
//           selectedOptions: item.selectedOptions || {} 
//         })),
//         itemsPrice,
//         shippingPrice,
//         totalPrice: grandTotal,
//         shippingAddress: shippingInfo,
//         paymentMethod: 'COD' 
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.order._id}/pay`);

//       alert("Order Placed Successfully!");
//       if(clearCart) clearCart(); 
//       router.push('/orders'); 

//     } catch (error) {
//       console.error("Order Error:", error);
//       alert(error.response?.data?.message || "Error placing order. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
      
//       {/* 🚀 Distraction-Free Amazon Checkout Header */}
//       <header className="bg-[#F0F2F2] border-b border-[#ddd] py-3">
//         <div className="max-w-[1000px] mx-auto px-4 flex justify-between items-center">
//           <Link href="/">
//             <h1 className="text-2xl font-normal tracking-tighter text-[#111] cursor-pointer">
//               amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span>
//             </h1>
//           </Link>
//           <h2 className="text-[24px] font-normal text-[#111] hidden md:block">Checkout</h2>
//           <div className="text-[24px] text-[#565959]">🔒</div>
//         </div>
//       </header>

//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        
//         {/* LEFT: Forms */}
//         <div className="flex-1 w-full space-y-4">
          
//           <form id="checkoutForm" onSubmit={handlePlaceOrder} className="space-y-4">
            
//             {/* Step 1: Shipping Address */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
//                 <h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2>
//               </div>
//               <div className="p-5">
//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div>
//                     <label className={labelStyles}>Full name (First and Last name)</label>
//                     <input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Mobile number</label>
//                     <input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Flat, House no., Building, Company, Apartment</label>
//                     <input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} />
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className={labelStyles}>Town/City</label>
//                       <input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
//                     </div>
//                     <div>
//                       <label className={labelStyles}>Pincode</label>
//                       <input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Step 2: Payment Method */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
//                 <h2 className={sectionTitle + " mb-0"}>2. Select a payment method</h2>
//               </div>
//               <div className="p-5">
//                 <div className="flex items-start gap-3 p-3 border border-[#fbd8b4] bg-[#fef8f2] rounded-[4px]">
//                   <input type="radio" checked readOnly className="mt-1 accent-[#e77600]" />
//                   <div>
//                     <p className="font-bold text-[14px]">Pay on Delivery</p>
//                     <p className="text-[13px] text-[#565959] mt-1">Pay digitally with SMS link or pay cash. (We recommend paying digitally via UPI or Card).</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Step 3: Review Items */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
//                 <h2 className={sectionTitle + " mb-0"}>3. Review items and shipping</h2>
//               </div>
//               <div className="p-5">
//                 <div className="space-y-4">
//                   {cart.map((item, idx) => (
//                     <div key={idx} className="flex gap-4">
//                       <div className="w-[100px] shrink-0">
//                         <img src={getImageUrl(item.images[0])} alt={item.name} className="w-full object-contain mix-blend-multiply" />
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-bold text-[#007185] text-[14px] leading-tight mb-1">{item.name}</h4>
//                         <div className="text-[14px] font-bold text-[#B12704] mb-1">₹{((item.discountPrice || item.price)).toLocaleString('en-IN')}</div>
//                         <div className="text-[13px] text-[#111]">
//                           <span className="font-bold">Qty:</span> {item.quantity || 1}
//                         </div>
//                         {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                           <div className="text-[12px] text-[#565959] mt-1">
//                             {Object.entries(item.selectedOptions).map(([key, val]) => (
//                               <span key={key} className="mr-2">{key}: <span className="text-[#111]">{val}</span></span>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//           </form>
//         </div>

//         {/* RIGHT: Order Summary (Amazon Box) */}
//         <div className="w-full lg:w-[300px] shrink-0">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
            
//             <button 
//               type="submit" 
//               form="checkoutForm"
//               disabled={isProcessing}
//               className={`${amzButton} mb-4 font-normal`}
//             >
//               {isProcessing ? 'Processing...' : 'Place your order'}
//             </button>
            
//             <p className="text-[11px] text-[#565959] text-center border-b border-[#ddd] pb-4 mb-4 leading-tight">
//               By placing your order, you agree to Amazon Smarts's <Link href="/privacy" className="text-[#007185] hover:underline">privacy notice</Link> and <Link href="/conditions" className="text-[#007185] hover:underline">conditions of use</Link>.
//             </p>

//             <h3 className="font-bold text-[18px] text-[#111] mb-2">Order Summary</h3>
            
//             <div className="space-y-1.5 text-[13px] text-[#111] border-b border-[#ddd] pb-3 mb-3">
//               <div className="flex justify-between">
//                 <span>Items:</span>
//                 <span>₹{itemsPrice.toLocaleString('en-IN')}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery:</span>
//                 <span>{shippingPrice === 0 ? '₹0.00' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span>
//               </div>
//             </div>

//             <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4">
//               <span>Order Total:</span>
//               <span>₹{grandTotal.toLocaleString('en-IN')}</span>
//             </div>

//             <div className="bg-[#fef8f2] border border-[#fbd8b4] p-3 rounded-[4px] text-[12px] text-[#111]">
//               <span className="font-bold text-[#c45500]">Payment Method:</span> Pay on Delivery (Cash/UPI)
//             </div>
            
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
