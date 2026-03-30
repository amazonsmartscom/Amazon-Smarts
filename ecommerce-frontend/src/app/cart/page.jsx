// // src/app/cart/page.jsx
// 'use client';
// import { useCart } from '../../context/CartContext';
// import Link from 'next/link';
// import Script from 'next/script'; // <-- Added to load Razorpay
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// export default function CartPage() {
//   const { cart, cartCount } = useCart();
// const { user } = useAuth(); // <-- ADD THIS
//   const subtotal = cart.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
//   const shipping = subtotal > 50000 ? 0 : 499; 
//   const grandTotal = subtotal + (cartCount > 0 ? shipping : 0);

//   // 🚀 The Checkout Function
// //   const handleCheckout = async () => {
// //     try {
// //       if (cart.length === 0) return alert("Your cart is empty!");

// //       // 1. Format the cart items for the backend
// //       const orderItems = cart.map(item => ({
// //         name: item.name,
// //         quantity: item.quantity,
// //         image: item.images[0] || '',
// //         price: item.discountPrice || item.price,
// //         product: item._id
// //       }));

// //       // Dummy address since we haven't built an address form yet
// //       const shippingAddress = { address: "123 Tech Lane", city: "Mumbai", postalCode: "400001", country: "India" };

// //       // 2. Tell the backend to create an order
// //       const { data } = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/orders', {
// //         orderItems,
// //         shippingAddress,
// //         itemsPrice: subtotal,
// //         shippingPrice: shipping,
// //         totalPrice: grandTotal
// //       });

// //       // 3. Setup Razorpay Modal Options
// //       const options = {
// //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummykey", // Add this to frontend .env.local later
// //         amount: data.amount,
// //         currency: data.currency,
// //         name: "RC Tech Store",
// //         description: "Test Transaction",
// //         order_id: data.razorpayOrderId,
// //         handler: function (response) {
// //           // This function runs when the payment is SUCCESSFUL
// //           alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
// //           // Next step: Tell backend payment was successful and clear the cart!
// //         },
// //         prefill: {
// //           name: "John Doe",
// //           email: "john@example.com",
// //           contact: "9999999999"
// //         },
// //         theme: {
// //           color: "#f97316" // Orange to match your brand
// //         }
// //       };

// //       // 4. Open the Modal
// //       const rzp = new window.Razorpay(options);
// //       rzp.open();

// //     } catch (error) {
// //       console.error("Checkout Error:", error);
// //       alert("Something went wrong during checkout. Is your backend running?");
// //     }
// //   };


// const handleCheckout = async () => {
//     try {
//       if (cart.length === 0) return alert("Your cart is empty!");

//       // 1. Format the cart items for the backend
//       const orderItems = cart.map(item => ({
//         name: item.name,
//         quantity: item.quantity,
//         image: item.images[0] || '',
//         price: item.discountPrice || item.price,
//         product: item._id
//       }));

//       const shippingAddress = { address: "123 Tech Lane", city: "Mumbai", postalCode: "400001", country: "India" };

//       // 2. Create the Order (This part still works!)
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
//         userId: user?.user?.id, // <-- ADD THIS LINE
//         orderItems,
//         shippingAddress,
//         itemsPrice: subtotal,
//         shippingPrice: shipping,
//         totalPrice: grandTotal
//       });

//       // 3. SIMULATE PAYMENT SUCCESS
//       // Instead of opening Razorpay, we immediately hit our new backend route
//       const paymentResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.orderId}/pay`);

//       if (paymentResponse.status === 200) {
//         alert("Testing: Payment Simulated Successfully! Order is Paid.");
//         // We will clear the cart here in a future step
//       }

//     } catch (error) {
//       console.error("Checkout Error:", error);
//       alert("Something went wrong during checkout.");
//     }
//   };



//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
//       {/* Load Razorpay Script */}
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

//       <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
//         <Link href="/">
//           <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
//             GADGET<span className="text-white">STORE</span>
//           </h1>
//         </Link>
//         <span className="font-bold text-lg">Secure Checkout 🔒</span>
//       </nav>

//       <div className="max-w-[1200px] mx-auto p-4 md:p-6 mt-6 flex flex-col lg:flex-row gap-6">
        
//         {/* LEFT COLUMN: Cart Items */}
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//           <h2 className="text-2xl font-bold mb-6 border-b pb-4">Shopping Cart</h2>

//           {cart.length === 0 ? (
//             <div className="text-center py-10">
//               <p className="text-gray-500 text-lg mb-4">Your GadgetStore Cart is empty.</p>
//               <Link href="/">
//                 <button className="bg-orange-500 text-slate-900 font-bold px-6 py-2 rounded hover:bg-orange-400">
//                   Continue Shopping
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {cart.map((item) => (
//                 <div key={item._id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
//                   <div className="w-full sm:w-32 h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
//                     <img src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100x100?text=No+Image'} alt={item.name} className="object-contain w-full h-full" />
//                   </div>
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
//                       <p className="text-sm text-green-600 font-bold mt-1">In Stock</p>
//                     </div>
//                     <div className="flex items-center gap-4 mt-4 sm:mt-0">
//                       <div className="bg-gray-100 px-3 py-1 rounded text-sm font-semibold">Qty: {item.quantity}</div>
//                       <button className="text-sm text-red-500 hover:underline font-medium">Delete</button>
//                     </div>
//                   </div>
//                   <div className="text-right sm:w-32">
//                     <p className="text-xl font-bold text-gray-900">₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN: Order Summary */}
//         {cart.length > 0 && (
//           <div className="w-full lg:w-80 h-fit bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//             <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            
//             <div className="space-y-3 text-sm text-gray-600 border-b pb-4 mb-4">
//               <div className="flex justify-between"><span>Items ({cartCount}):</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
//               <div className="flex justify-between"><span>Delivery:</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
//             </div>

//             <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
//               <span>Order Total:</span>
//               <span>₹{grandTotal.toLocaleString('en-IN')}</span>
//             </div>

//             {/* 🚀 UPDATE: ATTACH onClick EVENT */}
//             {/* <button 
//               onClick={handleCheckout}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow-sm transition-colors mb-3"
//             >
//               Proceed to Buy
//             </button> */}
//             <Link href="/checkout">
//   <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg mt-4">
//     Proceed to Checkout
//   </button>
// </Link>
            
//             <div className="text-xs text-gray-500 text-center">Safe and secure payments. Easy returns. 100% Authentic products.</div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }



// // src/app/cart/page.jsx
// 'use client';
// import { useCart } from '../../context/CartContext';
// import Link from 'next/link';
// import { useAuth } from '../../context/AuthContext';
// import { useEffect, useState } from 'react';

// export default function CartPage() {
//   const { cart, cartCount, removeFromCart, updateQuantity } = useCart();
//   const { user } = useAuth(); 
  
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   const subtotal = cart.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
  
//   // Free Shipping Threshold Logic
//   const freeShippingThreshold = 50000;
//   const shipping = subtotal > freeShippingThreshold ? 0 : 499; 
//   const grandTotal = subtotal + (cartCount > 0 ? shipping : 0);
//   const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
//   const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

//   // Helper to fix broken image URLs
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   // 🚀 FIXED: Safe quantity updater using the exact product configuration
//   const handleQuantityChange = (item, newQty) => {
//     if (newQty < 1) return;
//     updateQuantity(item._id, item.selectedOptions, newQty);
//   };

//   if (!isHydrated) return null; 

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 selection:bg-orange-200">

//       {/* PREMIUM NAVBAR */}
//       <nav className="bg-slate-900 p-5 text-white shadow-md sticky top-0 z-50">
//         <div className="max-w-[1400px] mx-auto flex justify-between items-center">
//           <Link href="/">
//             <h1 className="text-2xl font-black tracking-widest text-orange-500 cursor-pointer hover:scale-105 transition-transform">
//               GADGET<span className="text-white">STORE</span>
//             </h1>
//           </Link>
//           <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
//             <span className="text-orange-500">Cart</span>
//             <span>---------</span>
//             <span>Checkout</span>
//             <span>---------</span>
//             <span>Complete</span>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-[1400px] mx-auto p-4 md:p-8 mt-4 flex flex-col lg:flex-row gap-8">
        
//         {/* LEFT COLUMN: Cart Items */}
//         <div className="flex-1">
//           <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
//             Your Cart <span className="bg-slate-200 text-slate-700 text-sm py-1 px-3 rounded-full font-bold">{cartCount} Items</span>
//           </h2>

//           {cart.length === 0 ? (
//             <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
//               <div className="text-6xl mb-6 opacity-50">🛍️</div>
//               <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Your cart is feeling lonely</h3>
//               <p className="text-slate-500 font-medium mb-8">Add some premium gadgets to make it happy.</p>
//               <Link href="/">
//                 <button className="bg-orange-500 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-orange-600 hover:shadow-lg hover:-translate-y-1 transition-all">
//                   Continue Shopping
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              
//               {/* Dynamic Free Shipping Bar */}
//               <div className="bg-slate-50 p-6 border-b border-slate-100">
//                 <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
//                   <span className="text-xl">🚚</span> 
//                   {amountToFreeShipping > 0 ? (
//                     <>You are <span className="text-orange-600 font-black">₹{amountToFreeShipping.toLocaleString('en-IN')}</span> away from FREE Shipping!</>
//                   ) : (
//                     <span className="text-emerald-600 font-black">Congratulations! You get FREE Shipping! 🎉</span>
//                   )}
//                 </h3>
//                 <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
//                   <div 
//                     className={`h-full rounded-full transition-all duration-1000 ease-out ${amountToFreeShipping === 0 ? 'bg-emerald-500' : 'bg-orange-500'}`}
//                     style={{ width: `${progressPercentage}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="p-6 md:p-8 space-y-8">
//                 {cart.map((item) => (
//                   <div key={`${item._id}-${JSON.stringify(item.selectedOptions)}`} className="flex flex-col sm:flex-row gap-6 relative group pb-8 border-b border-slate-50 last:border-0 last:pb-0">
                    
//                     {/* Thumbnail */}
//                     <div className="w-full sm:w-36 h-36 bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100 flex-shrink-0 group-hover:border-orange-200 transition-colors">
//                       <Link href={`/product/${item._id}`}>
//                         <img src={getImageUrl(item.images && item.images.length > 0 ? item.images[0] : null)} alt={item.name} className="object-contain w-full h-full mix-blend-multiply hover:scale-105 transition-transform cursor-pointer" />
//                       </Link>
//                     </div>

//                     {/* Details */}
//                     <div className="flex-1 flex flex-col justify-between">
//                       <div>
//                         <div className="flex justify-between items-start gap-4">
//                           <Link href={`/product/${item._id}`}>
//                             <h3 className="text-lg md:text-xl font-bold text-slate-900 line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer leading-snug">{item.name}</h3>
//                           </Link>
//                           <p className="text-xl font-black text-slate-900 whitespace-nowrap">₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}</p>
//                         </div>
                        
//                         {/* Selected Variants Display */}
//                         {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                           <div className="flex gap-2 mt-2 flex-wrap">
//                             {Object.entries(item.selectedOptions).map(([key, val]) => (
//                               <span key={key} className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded">
//                                 {key}: {val}
//                               </span>
//                             ))}
//                           </div>
//                         )}
//                         <p className="text-xs text-emerald-600 font-bold mt-3 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span> In Stock & Ready to Ship</p>
//                       </div>

//                       {/* Actions */}
//                       <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                        
//                         {/* 🚀 FIXED: Connected Quantity Controls */}
//                         <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1 shadow-sm">
//                           <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded font-bold transition-colors">-</button>
//                           <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
//                           <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded font-bold transition-colors">+</button>
//                         </div>
                        
//                         {/* 🚀 FIXED: Connected Remove Button */}
//                         <button 
//                           onClick={() => removeFromCart(item._id, item.selectedOptions)} 
//                           className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
//                         >
//                           <span>🗑️</span> Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN: Order Summary */}
//         {cart.length > 0 && (
//           <div className="w-full lg:w-[400px]">
//             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
//               <h3 className="text-xl font-black text-slate-900 mb-6">Order Summary</h3>
              
//               <div className="space-y-4 text-sm text-slate-600 border-b border-slate-100 pb-6 mb-6">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Subtotal ({cartCount} items)</span>
//                   <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium flex items-center gap-1">Shipping <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 cursor-help" title="Free shipping on orders over ₹50,000">?</span></span>
//                   <span className={`font-black ${shipping === 0 ? 'text-emerald-500' : 'text-slate-900'}`}>
//                     {shipping === 0 ? 'FREE' : `₹${shipping}`}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-end mb-8">
//                 <div>
//                   <span className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total</span>
//                   <span className="text-[10px] text-slate-400">Inclusive of all taxes</span>
//                 </div>
//                 <span className="text-3xl font-black text-slate-900 tracking-tight">₹{grandTotal.toLocaleString('en-IN')}</span>
//               </div>

//               <Link href="/checkout">
//                 <button className="w-full bg-slate-900 hover:bg-orange-500 text-white font-black py-4 rounded-xl uppercase tracking-widest shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2 group">
//                   Proceed to Checkout <span className="group-hover:translate-x-1 transition-transform">→</span>
//                 </button>
//               </Link>
              
//               {/* 🚀 NEW: Emphasized COD Banner */}
//               <div className="mt-6 flex flex-col gap-3">
//                 <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
//                   <div className="text-2xl">💵</div>
//                   <div>
//                     <p className="text-sm font-black text-emerald-800 uppercase tracking-wide">Cash on Delivery</p>
//                     <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Available at checkout</p>
//                   </div>
//                 </div>
//                 <div className="text-xs font-bold text-slate-400 text-center mt-2">
//                   100% Authentic products • Easy returns
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


// src/app/cart/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, savedItems, removeFromCart, updateQuantity, saveForLater, moveToCart, removeFromSaved } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
  };

  // 🚀 SHARE FUNCTIONALITY
  const handleShare = async (productId) => {
    const url = `${window.location.origin}/product/${productId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this product on Amazon Smarts',
          url: url
        });
      } catch (err) {
        console.log("Share cancelled.");
      }
    } else {
      // Fallback for desktop browsers
      navigator.clipboard.writeText(url);
      alert("Product link copied to clipboard!");
    }
  };

  // 🚀 GIFT 'LEARN MORE' ALERT
  const handleLearnMoreGift = (e) => {
    e.preventDefault();
    alert("Gift Options:\n\nChoosing this option will hide prices on the packing slip. You will be able to add a free personalized gift message during the checkout process.");
  };

  if (!isHydrated) return <div className="min-h-screen bg-[#EAEDED]"></div>;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
  
  // Free delivery threshold logic (matching the screenshot)
  const freeDeliveryThreshold = 50000; 
  const amountNeeded = Math.max(0, freeDeliveryThreshold - totalPrice);
  const progressPercent = Math.min(100, (totalPrice / freeDeliveryThreshold) * 100);

  const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer text-[12px]";

  if (cart.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#EAEDED] py-8 font-sans">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="bg-white p-8 mb-6 text-center border border-[#DDD] shadow-sm">
            <h2 className="text-[24px] font-bold text-[#0F1111] mb-4">Your Amazon Cart is empty.</h2>
            <p className="text-[14px] text-[#565959] mb-6">Check your Saved for later items below or continue shopping.</p>
            <Link href="/">
              <button className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-2 px-8 text-[14px] text-[#0F1111] shadow-sm transition-colors">
                Continue shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEDED] py-6 font-sans text-[#0F1111]">
      <div className="max-w-[1500px] mx-auto px-4 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ================= LEFT COLUMN: MAIN CART & SAVED ITEMS ================= */}
        <div className="flex-1 w-full space-y-6">
          
          {/* ACTIVE CART */}
          {cart.length > 0 && (
            <div className="bg-white p-4 sm:p-6 border border-[#DDD] shadow-sm">
              <div className="flex justify-between items-end border-b border-[#DDD] pb-2 mb-4">
                <h1 className="text-[24px] sm:text-[28px] font-normal leading-none text-[#0F1111]">Shopping Cart</h1>
                <span className="text-[14px] text-[#565959] font-normal hidden sm:block">Price</span>
              </div>

              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-2 sm:gap-4 border-b border-[#EEE] pb-4 relative group">
                    {/* Checkbox (Visual only for Amazon look) */}
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-[#007185] cursor-pointer shrink-0" />
                    
                    {/* Image - Fixed width to prevent crushing */}
                    <div className="w-[80px] sm:w-[120px] shrink-0 cursor-pointer" onClick={() => router.push(`/product/${item._id}`)}>
                      <img src={getImageUrl(item.images?.[0])} alt={item.name} className="w-full h-auto object-contain mix-blend-multiply" />
                    </div>

                    {/* Details - min-w-0 prevents flexbox blowout */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-1 sm:gap-4">
                        <Link href={`/product/${item._id}`} className="text-[15px] sm:text-[18px] leading-tight font-medium text-[#007185] hover:text-[#C45500] hover:underline line-clamp-2 break-words">
                          {item.name}
                        </Link>
                        <span className="font-bold text-[18px] text-[#0F1111] shrink-0">₹{(item.discountPrice || item.price).toLocaleString('en-IN')}</span>
                      </div>

                      <p className="text-[12px] text-[#007600] mt-1 mb-1">In stock</p>
                      <p className="text-[12px] text-[#565959] mb-1">Eligible for FREE Shipping</p>

                      {/* Gift Checkbox & Learn More */}
                      <div className="flex items-center gap-1 mt-1 mb-3">
                        <input type="checkbox" className="w-3 h-3 accent-[#007185]" />
                        <span className="text-[12px] text-[#0F1111]">This will be a gift</span>
                        <button onClick={handleLearnMoreGift} className="text-[#007185] hover:text-[#C45500] hover:underline text-[12px] ml-1 focus:outline-none">Learn more</button>
                      </div>

                      {/* Variant Options */}
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="text-[12px] text-[#565959] mb-3 font-bold break-words">
                          {Object.entries(item.selectedOptions).map(([key, val]) => (
                            <span key={key} className="mr-3">{key}: <span className="font-normal">{val}</span></span>
                          ))}
                        </div>
                      )}

                      {/* Action Bar (Qty, Delete, Save, Share) */}
                      <div className="flex items-center flex-wrap gap-2 mt-2">
                        {/* Qty Dropdown */}
                        <div className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-[7px] shadow-sm hover:bg-[#E3E6E6] flex items-center px-2 py-0.5 shrink-0">
                          <select 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item._id, item.selectedOptions, Number(e.target.value))}
                            className="bg-transparent text-[13px] font-normal outline-none cursor-pointer"
                          >
                            {[...Array(10).keys()].map(n => <option key={n+1} value={n+1}>{n+1}</option>)}
                          </select>
                        </div>
                        
                        <span className="text-[#DDD] px-1 hidden sm:inline">|</span>
                        <button onClick={() => removeFromCart(item._id, item.selectedOptions)} className={amzLink}>Delete</button>
                        <span className="text-[#DDD] px-1">|</span>
                        
                        {/* 🚀 SAVE FOR LATER BUTTON */}
                        <button onClick={() => saveForLater(item)} className={amzLink}>Save for later</button>
                        <span className="text-[#DDD] px-1 hidden sm:inline">|</span>
                        
                        {/* 🚀 SHARE BUTTON */}
                        <button onClick={() => handleShare(item._id)} className={`${amzLink} hidden sm:inline`}>Share</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right pt-2">
                <span className="text-[18px] font-normal">Subtotal ({totalItems} items): </span>
                <span className="text-[18px] font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* 🚀 SAVED FOR LATER SECTION */}
          {savedItems.length > 0 && (
            <div className="bg-white p-4 sm:p-6 border border-[#DDD] shadow-sm">
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#0F1111] border-b border-[#DDD] pb-3 mb-4">
                Saved for later ({savedItems.length} item{savedItems.length > 1 ? 's' : ''})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <Link href={`/product/${item._id}`} className="block h-[150px] mb-2 flex items-center justify-center p-2 bg-[#F8F8F8] rounded-sm">
                      <img src={getImageUrl(item.images?.[0])} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </Link>
                    
                    <Link href={`/product/${item._id}`}>
                      <h3 className="text-[14px] text-[#007185] hover:text-[#C45500] hover:underline line-clamp-2 mb-1 leading-snug">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-[16px] font-bold text-[#B12704] mb-1">₹{(item.discountPrice || item.price).toLocaleString('en-IN')}</p>
                    <p className="text-[12px] text-[#007600] mb-2">In stock</p>
                    
                    {/* Move to Cart / Delete */}
                    <div className="mt-auto space-y-2 pt-2">
                      <button 
                        onClick={() => moveToCart(item)}
                        className="w-full text-[13px] py-1 border border-[#D5D9D9] rounded-[8px] bg-white hover:bg-[#F7FAFA] shadow-sm"
                      >
                        Move to cart
                      </button>
                      <button 
                        onClick={() => removeFromSaved(item._id, item.selectedOptions)}
                        className="w-full text-[12px] text-[#007185] hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: CHECKOUT BOX ================= */}
        {cart.length > 0 && (
          <div className="w-full lg:w-[300px] shrink-0 space-y-4">
            <div className="bg-white p-5 border border-[#DDD] shadow-sm">
              
              {/* Free Delivery Bar */}
              <div className="mb-4 text-[12px] text-[#111]">
                <div className="w-full bg-[#F0F2F2] h-2 rounded-full mb-2 overflow-hidden border border-[#DDD]">
                  <div className="bg-[#007600] h-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
                {amountNeeded > 0 ? (
                  <>Add <span className="text-[#B12704] font-bold">₹{amountNeeded.toLocaleString('en-IN')}</span> of eligible items to your order to qualify for FREE Delivery.</>
                ) : (
                  <span className="text-[#007600] font-bold">✓ Your order is eligible for FREE Delivery.</span>
                )}
              </div>

              <div className="text-[18px] mb-4">
                <span className="font-normal">Subtotal ({totalItems} items): </span>
                <span className="text-[18px] font-bold block sm:inline">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" className="w-4 h-4 accent-[#007185]" />
                <span className="text-[13px]">This order contains a gift</span>
              </div>

              <button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-[8px] text-[14px] text-[#0F1111] shadow-sm transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Filler Recommendations Box */}
            <div className="bg-white p-4 border border-[#DDD] shadow-sm">
              <h3 className="text-[14px] font-bold text-[#111] text-center leading-tight mb-2">Customers who bought items in your cart also bought</h3>
              <p className="text-[11px] text-[#565959] italic text-center">Sponsored Recommendations</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}