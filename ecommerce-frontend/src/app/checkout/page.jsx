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

// src/app/checkout/page.jsx
'use client';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); 
  const { user } = useAuth();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || user?.user?.name || '', // 🚀 Fixed
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discountPrice || item.price;
      const itemQty = item.quantity || 1;
      return total + (itemPrice * itemQty);
    }, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your cart is empty!</h2>
        <Link href="/">
          <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-orange-600 transition">
            Go Shopping
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
        // 🚀 CRITICAL FIX: Safe ID
        userId: user?._id || user?.user?._id,
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          image: item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100',
          price: item.discountPrice || item.price,
          product: item._id,
          selectedOptions: item.selectedOptions || {} 
        })),
        totalPrice: calculateTotal(),
        shippingAddress: shippingInfo
      };

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);

      // Simulate Payment
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.order._id}/pay`);

      alert("🎉 Order Placed Successfully!");
      if(clearCart) clearCart(); 
      router.push('/orders'); 

    } catch (error) {
      console.error("Order Error:", error);
      alert("Error placing order. Please try again.");
      setIsProcessing(false);
    }
  };

  const inputStyles = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none";

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <nav className="bg-slate-900 p-4 text-white shadow-md text-center">
        <h1 className="text-2xl font-black tracking-widest text-orange-500">SECURE <span className="text-white">CHECKOUT</span></h1>
      </nav>

      <div className="max-w-[1000px] mx-auto p-4 md:p-8 mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT: Shipping Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Shipping Details</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                <input type="tel" required className={inputStyles} value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Complete Address (House No, Building, Street)</label>
              <textarea required className={`${inputStyles} h-24`} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})}></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                <input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Pincode</label>
                <input type="text" required className={inputStyles} value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full mt-8 py-4 rounded-xl font-bold text-lg shadow-md transition ${isProcessing ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
            >
              {isProcessing ? 'Processing Payment...' : 'Place Order & Pay'}
            </button>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item, idx) => (
              <div key={idx} className="flex flex-col border-b border-gray-50 pb-3 last:border-0 text-sm">
                <div className="flex justify-between font-bold text-gray-900">
                  <span className="line-clamp-1 pr-4">{item.quantity || 1}x {item.name}</span>
                  <span>₹{((item.discountPrice || item.price) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                </div>
                
                {/* 🚀 CUSTOMER SEES THEIR VARIANTS IN CHECKOUT */}
                {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                  <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">
                    {Object.entries(item.selectedOptions).map(([key, val]) => (
                      <span key={key} className="mr-2 bg-gray-100 px-1 py-0.5 rounded">{key}: {val}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center text-xl font-black text-gray-900">
            <span>Total:</span>
            <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
          </div>
          <p className="text-xs text-center text-green-600 font-bold mt-4">Free Delivery Included</p>
        </div>

      </div>
    </div>
  );
}