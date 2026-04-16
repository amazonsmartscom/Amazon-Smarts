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
  
//   // Page Flow States
//   const [checkoutStep, setCheckoutStep] = useState('editing'); // 'editing', 'otp', 'success'
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '',
//     address: '',
//     city: '',
//     pincode: ''
//   });
  
//   // 🚀 NEW: State to track if we successfully loaded a saved address
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
    
//     // 🚀 FIXED: Fetch User Profile and pick the FIRST address from the array
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
          
//           // Check if the addresses array exists and has at least one entry
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; // Pick the first saved address
//             setShippingInfo(prev => ({
//               ...prev,
//               phone: phone || prev.phone,
//               address: defaultAddr.street || '',
//               city: defaultAddr.city || '',
//               pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         })
//         .catch(err => console.error("Could not fetch saved address", err));
//     }
//   }, [user]);

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

//   // AMAZON-SPECIFIC TAILWIND STYLES
//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer"; // Added for the change link

//   if (!isHydrated) return null;

//   // --- 1. EMPTY CART STATE ---
//   if (cart.length === 0 && checkoutStep === 'editing') {
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

//   // --- 2. TRIGGER OTP (Before Order) ---
//   const handleRequestOTP = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address for OTP verification.");
    
//     setIsProcessing(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//       setCheckoutStep('otp');
//     } catch (error) {
//       console.error("OTP Send Error:", error);
//       alert(error.response?.data?.message || "Error sending OTP. Check backend configuration.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // --- 3. VERIFY OTP & PLACE ORDER ---
//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { 
//         email: shippingInfo.email, 
//         otp 
//       });

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
      
//       // Simulate Payment step
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.order._id}/pay`);

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');

//     } catch (error) {
//       console.error("Verification/Order Error:", error);
//       alert(error.response?.data?.message || "Invalid OTP or Error placing order.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // --- RENDER SUCCESS SCREEN ---
//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4">
//                 <span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}
//               </div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2">
//                 <span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
            
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">
//               Review or edit your recent orders
//             </Link>
//           </div>
          
//           <div className="mt-8 text-center">
//             <Link href="/">
//               <button className={`${amzButton} w-auto px-8 py-2`}>Continue Shopping</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
        
//         {/* LEFT: Forms */}
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleRequestOTP} className="space-y-4">
            
//             {/* Step 1: Shipping Address */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
//                 <h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2>
//               </div>
//               <div className="p-5">
                
//                 {/* Saved Address Alert */}
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}

//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div>
//                     <label className={labelStyles}>Full name (First and Last name)</label>
//                     <input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Email Address (For order confirmation)</label>
//                     <input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Mobile number</label>
//                     <input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Flat, House no., Building, Company, Apartment</label>
//                     <input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className={labelStyles}>Town/City</label>
//                       <input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                     </div>
//                     <div>
//                       <label className={labelStyles}>Pincode</label>
//                       <input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} />
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

//         {/* RIGHT: Order Summary */}
//         <div className="w-full lg:w-[300px] shrink-0">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
//             <button 
//               type="submit" 
//               form="checkoutForm"
//               disabled={isProcessing || checkoutStep !== 'editing'}
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
//           </div>
//         </div>
//       </div>

//       {/* ======================================= */}
//       {/* 🚀 UPDATED OTP MODAL WITH "BACK" OPTION */}
//       {/* ======================================= */}
//       {checkoutStep === 'otp' && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-[8px] max-w-[400px] w-full p-6 shadow-xl border border-[#ddd]">
            
//             <div className="flex justify-between items-start mb-3">
//               <h2 className="text-[22px] font-normal">Verify email address</h2>
//               {/* X Close Button */}
//               <button 
//                 type="button"
//                 onClick={() => { setCheckoutStep('editing'); setOtp(''); }} 
//                 className="text-[#565959] hover:text-[#111] text-2xl leading-none"
//               >
//                 ✕
//               </button>
//             </div>

//             <p className="text-[13px] text-[#111] mb-5 leading-snug">
//               To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span> 
//               <button 
//                 type="button" 
//                 onClick={() => { setCheckoutStep('editing'); setOtp(''); }} 
//                 className={`${amzLink} ml-2 text-[12px] font-bold`}
//               >
//                 (Change)
//               </button>
//             </p>

//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-5">
//               <div>
//                 <label className={labelStyles}>Enter OTP</label>
//                 <input 
//                   type="text" 
//                   maxLength="6" 
//                   required 
//                   className={`${inputStyles} tracking-widest text-center text-lg py-3`} 
//                   value={otp} 
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
//                 />
//               </div>
//               <button type="submit" disabled={isProcessing || otp.length < 6} className={amzButton}>
//                 {isProcessing ? 'Verifying...' : 'Verify & Place Order'}
//               </button>
              
//               {/* Optional Resend / Go Back helper text */}
//               <div className="text-center pt-2">
//                 <button 
//                   type="button" 
//                   onClick={() => { setCheckoutStep('editing'); setOtp(''); }} 
//                   className={amzLink + " text-[12px]"}
//                 >
//                   Return to shipping details
//                 </button>
//               </div>
//             </form>
            
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


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
  
//   // Page Flow States
//   const [checkoutStep, setCheckoutStep] = useState('editing'); // 'editing', 'otp', 'success'
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '',
//     address: '',
//     city: '',
//     pincode: ''
//   });
  
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
    
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
          
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; 
//             setShippingInfo(prev => ({
//               ...prev,
//               phone: phone || prev.phone,
//               address: defaultAddr.street || '',
//               city: defaultAddr.city || '',
//               pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         })
//         .catch(err => console.error("Could not fetch saved address", err));
//     }
//   }, [user]);

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

//   // AMAZON STYLES
//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer"; 

//   // AUTH SCREEN STYLES (Used for OTP)
//   const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-sm text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

//   if (!isHydrated) return null;

//   if (cart.length === 0 && checkoutStep === 'editing') {
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

//   const handleRequestOTP = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address for OTP verification.");
    
//     setIsProcessing(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//       setCheckoutStep('otp');
//     } catch (error) {
//       console.error("OTP Send Error:", error);
//       alert(error.response?.data?.message || "Error sending OTP. Check backend configuration.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { 
//         email: shippingInfo.email, 
//         otp 
//       });

//       const userId = user?._id || user?.user?._id;

//       const orderPayload = {
//         userId: userId || undefined, 
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

//       // 🚀 AUTO-SAVE ADDRESS LOGIC
//       if (userId && !hasSavedAddress) {
//         try {
//           await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
//             street: shippingInfo.address,
//             city: shippingInfo.city,
//             pincode: shippingInfo.pincode,
//             state: "State", 
//             country: "India",
//             phone: shippingInfo.phone
//           });
//         } catch (addrErr) {
//           console.error("Silent fail: Could not auto-save address", addrErr);
//         }
//       }

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');

//     } catch (error) {
//       console.error("Verification/Order Error:", error);
//       alert(error.response?.data?.message || "Invalid OTP or Error placing order.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // ========================================================
//   // 🚀 SCREEN 1: OTP VERIFICATION (FULL PAGE AUTH STYLE)
//   // ========================================================
//   if (checkoutStep === 'otp') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
//         {/* Amazon Style Logo */}
//         <div className="mb-4 mt-2">
//           <Link href="/">
//             <h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">
//               amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span>
//             </h1>
//           </Link>
//         </div>

//         {/* Verification Card */}
//         <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1">
//           <div className="border border-[#ddd] rounded-[4px] p-[22px]">
//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
//               <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
              
//               <p className="text-[13px] text-[#111] leading-snug">
//                 To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span> 
//               </p>

//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
//                   <button 
//                     type="button" 
//                     onClick={() => { setCheckoutStep('editing'); setOtp(''); }} 
//                     className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer"
//                   >
//                     Change email
//                   </button>
//                 </div>
//                 <input 
//                   type="text" 
//                   maxLength="6" 
//                   required 
//                   className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} 
//                   value={otp} 
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
//                 />
//               </div>

//               <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>
//                 {isProcessing ? 'Verifying...' : 'Verify & Place Order'}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="w-full mt-10 border-t border-[#ddd] bg-[#fbfbfb] pt-6 pb-10 flex flex-col items-center shadow-[0_-2px_4px_rgba(0,0,0,0.02)] flex-grow">
//           <div className="flex flex-wrap justify-center gap-6 text-[11px] text-[#0066c0] mb-2">
//             <Link href="/conditions" className="hover:underline">Conditions of Use</Link>
//             <Link href="/privacy" className="hover:underline">Privacy Notice</Link>
//             <Link href="/help" className="hover:underline">Help</Link>
//           </div>
//           <p className="text-[11px] text-[#555]">
//             © {new Date().getFullYear()}, AmazonSmarts.com, Inc. or its affiliates
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ========================================================
//   // 🚀 SCREEN 2: SUCCESS SCREEN
//   // ========================================================
//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4">
//                 <span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}
//               </div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2">
//                 <span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
            
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">
//               Review or edit your recent orders
//             </Link>
//           </div>
          
//           <div className="mt-8 text-center">
//             <Link href="/">
//               <button className={`${amzButton} w-auto px-8 py-2`}>Continue Shopping</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ========================================================
//   // 🚀 SCREEN 3: STANDARD CHECKOUT CART VIEW (editing)
//   // ========================================================
//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
        
//         {/* LEFT: Forms */}
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleRequestOTP} className="space-y-4">
            
//             {/* Step 1: Shipping Address */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
//                 <h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2>
//               </div>
//               <div className="p-5">
                
//                 {/* Saved Address Alert */}
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}

//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div>
//                     <label className={labelStyles}>Full name (First and Last name)</label>
//                     <input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Email Address (For order confirmation)</label>
//                     <input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Mobile number</label>
//                     <input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div>
//                     <label className={labelStyles}>Flat, House no., Building, Company, Apartment</label>
//                     <input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className={labelStyles}>Town/City</label>
//                       <input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} />
//                     </div>
//                     <div>
//                       <label className={labelStyles}>Pincode</label>
//                       <input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} />
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

//         {/* RIGHT: Order Summary */}
//         <div className="w-full lg:w-[300px] shrink-0">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
//             <button 
//               type="submit" 
//               form="checkoutForm"
//               disabled={isProcessing || checkoutStep !== 'editing'}
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
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  
//   // Page Flow States
//   const [checkoutStep, setCheckoutStep] = useState('editing'); // 'editing', 'otp', 'success'
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '',
//     address: '',
//     city: '',
//     pincode: ''
//   });
  
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);

//   // 🚀 COUPON STATES
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState(null); 
//   const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
    
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
          
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; 
//             setShippingInfo(prev => ({
//               ...prev,
//               phone: phone || prev.phone,
//               address: defaultAddr.street || '',
//               city: defaultAddr.city || '',
//               pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         })
//         .catch(err => console.error("Could not fetch saved address", err));
//     }
//   }, [user]);

//   // 🚀 CALCULATIONS
//   const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
//   const shippingPrice = itemsPrice > 50000 ? 0 : 499; 
//   // Ensure total doesn't drop below 0 if discount is huge
//   const grandTotal = Math.max(0, itemsPrice + (cart.length > 0 ? shippingPrice : 0) - appliedDiscount);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/400x400?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

//   // ==========================================
//   // 🚀 COUPON LOGIC (PRODUCT-SPECIFIC CAPABLE)
//   // ==========================================
//   const handleApplyCoupon = async (e) => {
//     e.preventDefault();
//     if (!couponCode.trim()) return;
    
//     setIsApplyingCoupon(true);
//     setCouponMessage(null);

//     try {
//       // 🚀 Format cart items to send exactly what the backend needs for product-specific checks
//       const cartItemsPayload = cart.map(item => ({
//         product: item._id, // Send the Product ID
//         price: item.discountPrice || item.price,
//         quantity: item.quantity || 1
//       }));

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, {
//         code: couponCode.toUpperCase(),
//         cartItems: cartItemsPayload 
//       });
      
//       setAppliedDiscount(data.discountAmount);
//       setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${data.discountAmount.toLocaleString('en-IN')}` });
//     } catch (error) {
//       setAppliedDiscount(0);
//       setCouponMessage({ type: 'error', text: error.response?.data?.message || 'Invalid coupon code or not applicable to these items.' });
//     } finally {
//       setIsApplyingCoupon(false);
//     }
//   };

//   // 🚀 FIXED: Restored the missing handleRemoveCoupon function
//   const handleRemoveCoupon = () => {
//     setCouponCode('');
//     setAppliedDiscount(0);
//     setCouponMessage(null);
//   };

//   // ==========================================

//   // AMAZON STYLES
//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center disabled:opacity-50";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer"; 

//   const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[14px] text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

//   if (!isHydrated) return null;

//   if (cart.length === 0 && checkoutStep === 'editing') {
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

//   const handleRequestOTP = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address for OTP verification.");
    
//     setIsProcessing(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//       setCheckoutStep('otp');
//     } catch (error) {
//       console.error("OTP Send Error:", error);
//       alert(error.response?.data?.message || "Error sending OTP. Check backend configuration.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { 
//         email: shippingInfo.email, 
//         otp 
//       });

//       const userId = user?._id || user?.user?._id;

//       const orderPayload = {
//         userId: userId || undefined, 
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
//         discountAmount: appliedDiscount, // Send discount
//         couponCode: appliedDiscount > 0 ? couponCode : null, // Send code
//         totalPrice: grandTotal,
//         shippingAddress: shippingInfo,
//         paymentMethod: 'COD' 
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
      
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.order._id}/pay`);

//       if (userId && !hasSavedAddress) {
//         try {
//           await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
//             street: shippingInfo.address,
//             city: shippingInfo.city,
//             pincode: shippingInfo.pincode,
//             state: "State", 
//             country: "India",
//             phone: shippingInfo.phone
//           });
//         } catch (addrErr) {
//           console.error("Silent fail: Could not auto-save address", addrErr);
//         }
//       }

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');

//     } catch (error) {
//       console.error("Verification/Order Error:", error);
//       alert(error.response?.data?.message || "Invalid OTP or Error placing order.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (checkoutStep === 'otp') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
//         <div className="mb-4 mt-2">
//           <Link href="/">
//             <h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">
//               amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span>
//             </h1>
//           </Link>
//         </div>

//         <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1">
//           <div className="border border-[#ddd] rounded-[4px] p-[22px]">
//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
//               <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
//               <p className="text-[13px] text-[#111] leading-snug">
//                 To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span> 
//               </p>
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
//                   <button 
//                     type="button" 
//                     onClick={() => { setCheckoutStep('editing'); setOtp(''); }} 
//                     className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer"
//                   >
//                     Change email
//                   </button>
//                 </div>
//                 <input 
//                   type="text" 
//                   maxLength="6" 
//                   required 
//                   className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} 
//                   value={otp} 
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
//                 />
//               </div>
//               <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>
//                 {isProcessing ? 'Verifying...' : 'Verify & Place Order'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4">
//                 <span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}
//               </div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2">
//                 <span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">
//               Review or edit your recent orders
//             </Link>
//           </div>
//           <div className="mt-8 text-center">
//             <Link href="/">
//               <button className={`${amzButton} w-auto px-8 py-2 font-normal`}>Continue Shopping</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
        
//         {/* LEFT: Forms */}
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleRequestOTP} className="space-y-4">
            
//             {/* Step 1: Shipping Address */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
//                 <h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2>
//               </div>
//               <div className="p-5">
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}
//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div><label className={labelStyles}>Full name (First and Last name)</label><input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Email Address (For order confirmation)</label><input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Mobile number</label><input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Flat, House no., Building, Company, Apartment</label><input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div><label className={labelStyles}>Town/City</label><input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                     <div><label className={labelStyles}>Pincode</label><input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
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
//                         <div className="text-[13px] text-[#111]"><span className="font-bold">Qty:</span> {item.quantity || 1}</div>
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

//         {/* RIGHT: Order Summary */}
//         <div className="w-full lg:w-[300px] shrink-0 space-y-4">
          
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
//             <button 
//               type="submit" 
//               form="checkoutForm"
//               disabled={isProcessing || checkoutStep !== 'editing'}
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
//               {/* 🚀 DISCOUNT ROW */}
//               {appliedDiscount > 0 && (
//                 <div className="flex justify-between text-[#007600]">
//                   <span>Discount ({couponCode}):</span>
//                   <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
//                 </div>
//               )}
//             </div>
            
//             <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4">
//               <span>Order Total:</span>
//               <span>₹{grandTotal.toLocaleString('en-IN')}</span>
//             </div>

//             {/* 🚀 COUPON INPUT SECTION */}
//             <div className="pt-4 border-t border-[#ddd]">
//               <label className={labelStyles}>Gift cards & promotional codes</label>
//               <div className="flex gap-2 mt-1">
//                 <input 
//                   type="text" 
//                   placeholder="Enter Code" 
//                   className={`${inputStyles} uppercase font-mono text-[12px] flex-1 py-1.5`}
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                   disabled={appliedDiscount > 0 || isApplyingCoupon}
//                 />
//                 {appliedDiscount > 0 ? (
//                   <button type="button" onClick={handleRemoveCoupon} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm font-bold text-[#B12704]">
//                     Remove
//                   </button>
//                 ) : (
//                   <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm disabled:opacity-50">
//                     Apply
//                   </button>
//                 )}
//               </div>
//               {couponMessage && (
//                 <p className={`text-[12px] font-bold mt-2 leading-tight ${couponMessage.type === 'success' ? 'text-[#007600]' : 'text-[#B12704]'}`}>
//                   {couponMessage.type === 'success' ? '✓ ' : '! '}{couponMessage.text}
//                 </p>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/app/checkout/page.jsx
// // src/app/checkout/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [isHydrated, setIsHydrated] = useState(false);
  
//   const [checkoutStep, setCheckoutStep] = useState('editing'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentGatewayStatus, setPaymentGatewayStatus] = useState(null); 
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '', address: '', city: '', pincode: ''
//   });
  
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('ONLINE'); 

//   const [couponCode, setCouponCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState(null); 
//   const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; 
//             setShippingInfo(prev => ({
//               ...prev, phone: phone || prev.phone, address: defaultAddr.street || '', city: defaultAddr.city || '', pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         }).catch(err => console.error(err));
//     }
//   }, [user]);

//   const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
//   const shippingPrice = itemsPrice > 50000 ? 0 : 0; 
//   const grandTotal = Math.max(0, itemsPrice + (cart.length > 0 ? shippingPrice : 0) - appliedDiscount);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '#';
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
//   };

//   const handleApplyCoupon = async (e) => {
//     e.preventDefault();
//     if (!couponCode.trim()) return;
//     setIsApplyingCoupon(true); setCouponMessage(null);
//     try {
//       const cartItemsPayload = cart.map(item => ({ product: item._id, price: item.discountPrice || item.price, quantity: item.quantity || 1 }));
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, { code: couponCode.toUpperCase(), cartItems: cartItemsPayload });
//       setAppliedDiscount(data.discountAmount);
//       setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${data.discountAmount.toLocaleString('en-IN')}` });
//     } catch (error) {
//       setAppliedDiscount(0);
//       setCouponMessage({ type: 'error', text: error.response?.data?.message || 'Invalid coupon code.' });
//     } finally { setIsApplyingCoupon(false); }
//   };

//   const handleRemoveCoupon = () => { setCouponCode(''); setAppliedDiscount(0); setCouponMessage(null); };

//   const placeOrderToDatabase = async (methodString, razorpayPaymentId = null) => {
//     try {
//       const userId = user?._id || user?.user?._id;
//       const orderPayload = {
//         userId: userId || undefined, 
//         orderItems: cart.map(item => ({
//           name: item.name, quantity: item.quantity || 1, image: item.images && item.images.length > 0 ? item.images[0] : '',
//           price: item.discountPrice || item.price, product: item._id, selectedOptions: item.selectedOptions || {} 
//         })),
//         itemsPrice, shippingPrice, discountAmount: appliedDiscount, couponCode: appliedDiscount > 0 ? couponCode : null,
//         totalPrice: grandTotal, shippingAddress: shippingInfo,
//         paymentMethod: methodString,
//         isPaid: methodString !== 'COD',
//         paidAt: methodString !== 'COD' ? new Date() : null,
//         paymentResult: razorpayPaymentId ? { id: razorpayPaymentId, status: 'Completed' } : null
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
      
//       if (userId && !hasSavedAddress) {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
//           street: shippingInfo.address, city: shippingInfo.city, pincode: shippingInfo.pincode, state: "State", country: "India", phone: shippingInfo.phone
//         }).catch(e => console.log("Silent fail address save", e));
//       }

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');
//     } catch (error) {
//       alert("Error saving order to database. Please contact support.");
//     } finally {
//       setIsProcessing(false);
//       setPaymentGatewayStatus(null);
//     }
//   };

//   // 🚀 REUSABLE FUNCTION: Handles Razorpay OR COD
//   const executeOrderPlacement = async () => {
//     setIsProcessing(true);
//     try {
//       if (paymentMethod === 'ONLINE') {
//         setPaymentGatewayStatus('redirecting');
        
//         const res = await loadRazorpayScript();
        
//         if (res && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
//           let rzpOrder;
//           try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/create`, { amount: grandTotal });
//             rzpOrder = response.data;
//           } catch (backendError) {
//             console.error("Razorpay Backend Error:", backendError);
//             alert(`Backend Error: ${backendError.response?.data?.message || "Could not reach Razorpay."}`);
//             setIsProcessing(false); setPaymentGatewayStatus(null);
//             return; 
//           }

//           const options = {
//             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//             amount: rzpOrder.amount,
//             currency: rzpOrder.currency,
//             name: "Amazon Smarts",
//             description: "Order Checkout",
//             order_id: rzpOrder.id,
//             handler: async function (response) {
//               try {
//                 setPaymentGatewayStatus('verifying');
//                 await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/verify`, {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature
//                 });
//                 await placeOrderToDatabase('Razorpay', response.razorpay_payment_id);
//               } catch (err) {
//                 alert("Payment verification failed! Please contact support.");
//                 setIsProcessing(false); setPaymentGatewayStatus(null);
//               }
//             },
//             prefill: { name: shippingInfo.fullName, email: shippingInfo.email, contact: shippingInfo.phone },
//             theme: { color: "#232F3E" },
//             // 🚀 SECURE FIX: If user closes the popup, stop processing. Do not simulate!
//             modal: { 
//               ondismiss: function() { 
//                 setIsProcessing(false); 
//                 setPaymentGatewayStatus(null); 
//               } 
//             }
//           };

//           const paymentObject = new window.Razorpay(options);
//           paymentObject.open();

//         } else {
//           // 🚀 SECURE FIX: If Razorpay fails to load or keys are missing, stop immediately.
//           alert("Error: Payment gateway could not be loaded. Please ensure your Razorpay keys are set.");
//           setIsProcessing(false); 
//           setPaymentGatewayStatus(null);
//         }

//       } else {
//         await placeOrderToDatabase('COD', null);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//       setIsProcessing(false); setPaymentGatewayStatus(null);
//     }
//   };

//   // 🚀 MAIN CHECKOUT BUTTON CLICK
//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address.");
    
//     if (user) {
//       // ✅ USER LOGGED IN: Skip OTP, place order directly
//       await executeOrderPlacement();
//     } else {
//       // ❌ GUEST USER: Send OTP and show verification step
//       setIsProcessing(true);
//       try {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//         setCheckoutStep('otp');
//       } catch (error) { 
//         alert(error.response?.data?.message || "Error sending OTP."); 
//       } finally { 
//         setIsProcessing(false); 
//       }
//     }
//   };

//   // 🚀 OTP VERIFICATION (GUESTS ONLY)
//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       // 1. Verify OTP
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { email: shippingInfo.email, otp });
      
//       // 2. If valid, proceed to place order
//       await executeOrderPlacement();

//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Invalid OTP Code. Please try again.");
//       setIsProcessing(false); 
//     }
//   };

//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center disabled:opacity-50";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[14px] text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

//   if (!isHydrated) return null;

//   if (cart.length === 0 && checkoutStep === 'editing') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-20">
//         <h2 className="text-[24px] font-bold text-[#111] mb-4">Your Amazon Smarts Cart is empty.</h2>
//         <Link href="/"><button className={amzButton + " px-6 py-2 w-auto rounded-[3px]"}>Continue Shopping</button></Link>
//       </div>
//     );
//   }

//   if (checkoutStep === 'otp') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
//         <div className="mb-4 mt-2"><Link href="/"><h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span></h1></Link></div>
//         <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1 relative">
          
//           {paymentGatewayStatus && (
//             <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center border border-[#ddd] rounded-[4px]">
//               {paymentGatewayStatus === 'redirecting' ? (
//                 <div className="flex flex-col items-center animate-pulse">
//                   <div className="w-8 h-8 border-4 border-t-[#007185] border-[#e7e7e7] rounded-full animate-spin mb-4"></div>
//                   <p className="text-[14px] font-bold text-[#111]">Secure Payment Gateway</p>
//                   <p className="text-[12px] text-[#565959]">Initializing Razorpay...</p>
//                 </div>
//               ) : paymentGatewayStatus === 'verifying' ? (
//                 <div className="flex flex-col items-center animate-pulse">
//                   <div className="w-8 h-8 border-4 border-t-[#007185] border-[#e7e7e7] rounded-full animate-spin mb-4"></div>
//                   <p className="text-[14px] font-bold text-[#111]">Verifying Payment</p>
//                   <p className="text-[12px] text-[#565959]">Do not close this window...</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <span className="text-[#007600] text-5xl mb-2">✓</span>
//                   <p className="text-[14px] font-bold text-[#007600]">Payment Successful!</p>
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="border border-[#ddd] rounded-[4px] p-[22px]">
//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
//               <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
//               <p className="text-[13px] text-[#111] leading-snug">To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span></p>
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
//                   <button type="button" onClick={() => { setCheckoutStep('editing'); setOtp(''); }} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer">Change email</button>
//                 </div>
//                 <input type="text" maxLength="6" required className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
//               </div>
//               <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>{isProcessing ? 'Processing Order...' : 'Verify & Place Order'}</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4"><span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}</div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2"><span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}</div>
//             </div>
//           </div>
//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-1"><span className="font-bold">Payment Method:</span> {placedOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">Review or edit your recent orders</Link>
//           </div>
//           <div className="mt-8 text-center"><Link href="/"><button className={`${amzButton} w-auto px-8 py-2 font-normal`}>Continue Shopping</button></Link></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2></div>
//               <div className="p-5">
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}
//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div><label className={labelStyles}>Full name (First and Last name)</label><input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Email Address (For order confirmation)</label><input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Mobile number</label><input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Flat, House no., Building, Company, Apartment</label><input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div><label className={labelStyles}>Town/City</label><input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                     <div><label className={labelStyles}>Pincode</label><input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>2. Select a payment method</h2></div>
//               <div className="p-5">
//                 <div className="space-y-3">
//                   <label className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-colors ${paymentMethod === 'ONLINE' ? 'border-[#e77600] bg-[#fef8f2]' : 'border-[#ddd] bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="ONLINE" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div>
//                       <p className="font-bold text-[14px]">Credit/Debit Card, UPI, Net Banking</p>
//                       <div className="flex gap-2 mt-1">
//                         <span className="bg-white text-[10px] px-2 py-0.5 rounded font-bold border border-[#ddd] text-[#007185]">UPI</span>
//                         <span className="bg-white text-[10px] px-2 py-0.5 rounded font-bold border border-[#ddd] text-[#007185]">VISA</span>
//                         <span className="bg-white text-[10px] px-2 py-0.5 rounded font-bold border border-[#ddd] text-[#007185]">MasterCard</span>
//                       </div>
//                       <p className="text-[12px] text-[#007185] mt-1">Secure payment powered by Razorpay.</p>
//                     </div>
//                   </label>
//                   <label className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-[#e77600] bg-[#fef8f2]' : 'border-[#ddd] bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div>
//                       <p className="font-bold text-[14px]">Cash on Delivery / Pay on Delivery</p>
//                       <p className="text-[13px] text-[#565959] mt-1">Pay digitally with SMS link or pay cash at the time of delivery.</p>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>3. Review items and shipping</h2></div>
//               <div className="p-5">
//                 <div className="space-y-4">
//                   {cart.map((item, idx) => (
//                     <div key={idx} className="flex gap-4">
//                       <div className="w-[100px] shrink-0"><img src={getImageUrl(item.images[0])} alt={item.name} className="w-full object-contain mix-blend-multiply" /></div>
//                       <div className="flex-1">
//                         <h4 className="font-bold text-[#007185] text-[14px] leading-tight mb-1">{item.name}</h4>
//                         <div className="text-[14px] font-bold text-[#B12704] mb-1">₹{((item.discountPrice || item.price)).toLocaleString('en-IN')}</div>
//                         <div className="text-[13px] text-[#111]"><span className="font-bold">Qty:</span> {item.quantity || 1}</div>
//                         {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                           <div className="text-[12px] text-[#565959] mt-1">
//                             {Object.entries(item.selectedOptions).map(([key, val]) => <span key={key} className="mr-2">{key}: <span className="text-[#111]">{val}</span></span>)}
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

//         {/* 🚀 STICKY SUMMARY BOX */}
//         <div className="w-full lg:w-[300px] shrink-0 space-y-4">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
            
//             {/* OVERLAY LOADER FOR LOGGED IN USERS SO THEY KNOW IT'S WORKING */}
//             {isProcessing && paymentGatewayStatus === 'redirecting' && (
//               <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-[8px]">
//                 <div className="w-6 h-6 border-2 border-t-[#007185] border-[#e7e7e7] rounded-full animate-spin mb-2"></div>
//                 <p className="text-[12px] font-bold">Securely connecting...</p>
//               </div>
//             )}

//             <button type="submit" form="checkoutForm" disabled={isProcessing || checkoutStep !== 'editing'} className={`${amzButton} mb-4 font-normal`}>
//               {isProcessing ? 'Processing...' : 'Place your order'}
//             </button>
//             <p className="text-[11px] text-[#565959] text-center border-b border-[#ddd] pb-4 mb-4 leading-tight">By placing your order, you agree to Amazon Smarts's <Link href="/privacy" className="text-[#007185] hover:underline">privacy notice</Link> and <Link href="/conditions" className="text-[#007185] hover:underline">conditions of use</Link>.</p>
//             <h3 className="font-bold text-[18px] text-[#111] mb-2">Order Summary</h3>
//             <div className="space-y-1.5 text-[13px] text-[#111] border-b border-[#ddd] pb-3 mb-3">
//               <div className="flex justify-between"><span>Items:</span><span>₹{itemsPrice.toLocaleString('en-IN')}</span></div>
//               <div className="flex justify-between"><span>Delivery:</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span></div>
//               {appliedDiscount > 0 && <div className="flex justify-between text-[#007600]"><span>Discount ({couponCode}):</span><span>-₹{appliedDiscount.toLocaleString('en-IN')}</span></div>}
//             </div>
//             <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4"><span>Order Total:</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
//             <div className="pt-4 border-t border-[#ddd]">
//               <label className={labelStyles}>Gift cards & promotional codes</label>
//               <div className="flex gap-2 mt-1">
//                 <input type="text" placeholder="Enter Code" className={`${inputStyles} uppercase font-mono text-[12px] flex-1 py-1.5`} value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} disabled={appliedDiscount > 0 || isApplyingCoupon} />
//                 {appliedDiscount > 0 ? (
//                   <button type="button" onClick={handleRemoveCoupon} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm font-bold text-[#B12704]">Remove</button>
//                 ) : (
//                   <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm disabled:opacity-50">Apply</button>
//                 )}
//               </div>
//               {couponMessage && <p className={`text-[12px] font-bold mt-2 leading-tight ${couponMessage.type === 'success' ? 'text-[#007600]' : 'text-[#B12704]'}`}>{couponMessage.type === 'success' ? '✓ ' : '! '}{couponMessage.text}</p>}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }




// src/app/checkout/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [isHydrated, setIsHydrated] = useState(false);
  
//   const [checkoutStep, setCheckoutStep] = useState('editing'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentGatewayStatus, setPaymentGatewayStatus] = useState(null); 
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '', address: '', city: '', pincode: ''
//   });
  
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);
  
//   // 🚀 CHANGED: Default and strictly set to COD for now
//   const [paymentMethod, setPaymentMethod] = useState('COD'); 

//   const [couponCode, setCouponCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState(null); 
//   const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; 
//             setShippingInfo(prev => ({
//               ...prev, phone: phone || prev.phone, address: defaultAddr.street || '', city: defaultAddr.city || '', pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         }).catch(err => console.error(err));
//     }
//   }, [user]);

//   const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
//   const shippingPrice = itemsPrice > 50000 ? 0 : 0; 
//   const grandTotal = Math.max(0, itemsPrice + (cart.length > 0 ? shippingPrice : 0) - appliedDiscount);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '#';
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
//   };

//   const handleApplyCoupon = async (e) => {
//     e.preventDefault();
//     if (!couponCode.trim()) return;
//     setIsApplyingCoupon(true); setCouponMessage(null);
//     try {
//       const cartItemsPayload = cart.map(item => ({ product: item._id, price: item.discountPrice || item.price, quantity: item.quantity || 1 }));
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, { code: couponCode.toUpperCase(), cartItems: cartItemsPayload });
//       setAppliedDiscount(data.discountAmount);
//       setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${data.discountAmount.toLocaleString('en-IN')}` });
//     } catch (error) {
//       setAppliedDiscount(0);
//       setCouponMessage({ type: 'error', text: error.response?.data?.message || 'Invalid coupon code.' });
//     } finally { setIsApplyingCoupon(false); }
//   };

//   const handleRemoveCoupon = () => { setCouponCode(''); setAppliedDiscount(0); setCouponMessage(null); };

//   const placeOrderToDatabase = async (methodString, razorpayPaymentId = null) => {
//     try {
//       const userId = user?._id || user?.user?._id;
//       const orderPayload = {
//         userId: userId || undefined, 
//         orderItems: cart.map(item => ({
//           name: item.name, quantity: item.quantity || 1, image: item.images && item.images.length > 0 ? item.images[0] : '',
//           price: item.discountPrice || item.price, product: item._id, selectedOptions: item.selectedOptions || {} 
//         })),
//         itemsPrice, shippingPrice, discountAmount: appliedDiscount, couponCode: appliedDiscount > 0 ? couponCode : null,
//         totalPrice: grandTotal, shippingAddress: shippingInfo,
//         paymentMethod: methodString,
//         isPaid: methodString !== 'COD',
//         paidAt: methodString !== 'COD' ? new Date() : null,
//         paymentResult: razorpayPaymentId ? { id: razorpayPaymentId, status: 'Completed' } : null
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
      
//       if (userId && !hasSavedAddress) {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
//           street: shippingInfo.address, city: shippingInfo.city, pincode: shippingInfo.pincode, state: "State", country: "India", phone: shippingInfo.phone
//         }).catch(e => console.log("Silent fail address save", e));
//       }

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');
//     } catch (error) {
//       alert("Error saving order to database. Please contact support.");
//     } finally {
//       setIsProcessing(false);
//       setPaymentGatewayStatus(null);
//     }
//   };

//   // 🚀 REUSABLE FUNCTION: Handles Razorpay OR COD
//   const executeOrderPlacement = async () => {
//     setIsProcessing(true);
//     try {
//       if (paymentMethod === 'ONLINE') {
//         setPaymentGatewayStatus('redirecting');
        
//         const res = await loadRazorpayScript();
        
//         if (res && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
//           let rzpOrder;
//           try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/create`, { amount: grandTotal });
//             rzpOrder = response.data;
//           } catch (backendError) {
//             console.error("Razorpay Backend Error:", backendError);
//             alert(`Backend Error: ${backendError.response?.data?.message || "Could not reach Razorpay."}`);
//             setIsProcessing(false); setPaymentGatewayStatus(null);
//             return; 
//           }

//           const options = {
//             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//             amount: rzpOrder.amount,
//             currency: rzpOrder.currency,
//             name: "Amazon Smarts",
//             description: "Order Checkout",
//             order_id: rzpOrder.id,
//             handler: async function (response) {
//               try {
//                 setPaymentGatewayStatus('verifying');
//                 await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/verify`, {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature
//                 });
//                 await placeOrderToDatabase('Razorpay', response.razorpay_payment_id);
//               } catch (err) {
//                 alert("Payment verification failed! Please contact support.");
//                 setIsProcessing(false); setPaymentGatewayStatus(null);
//               }
//             },
//             prefill: { name: shippingInfo.fullName, email: shippingInfo.email, contact: shippingInfo.phone },
//             theme: { color: "#232F3E" },
//             modal: { 
//               ondismiss: function() { 
//                 setIsProcessing(false); 
//                 setPaymentGatewayStatus(null); 
//               } 
//             }
//           };

//           const paymentObject = new window.Razorpay(options);
//           paymentObject.open();

//         } else {
//           alert("Error: Payment gateway could not be loaded. Please ensure your Razorpay keys are set.");
//           setIsProcessing(false); 
//           setPaymentGatewayStatus(null);
//         }

//       } else {
//         // Will trigger this block since paymentMethod is 'COD'
//         await placeOrderToDatabase('COD', null);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//       setIsProcessing(false); setPaymentGatewayStatus(null);
//     }
//   };

//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address.");
    
//     if (user) {
//       await executeOrderPlacement();
//     } else {
//       setIsProcessing(true);
//       try {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//         setCheckoutStep('otp');
//       } catch (error) { 
//         alert(error.response?.data?.message || "Error sending OTP."); 
//       } finally { 
//         setIsProcessing(false); 
//       }
//     }
//   };

//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { email: shippingInfo.email, otp });
//       await executeOrderPlacement();
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Invalid OTP Code. Please try again.");
//       setIsProcessing(false); 
//     }
//   };

//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center disabled:opacity-50";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[14px] text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

//   if (!isHydrated) return null;

//   if (cart.length === 0 && checkoutStep === 'editing') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-20">
//         <h2 className="text-[24px] font-bold text-[#111] mb-4">Your Amazon Smarts Cart is empty.</h2>
//         <Link href="/"><button className={amzButton + " px-6 py-2 w-auto rounded-[3px]"}>Continue Shopping</button></Link>
//       </div>
//     );
//   }

//   if (checkoutStep === 'otp') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
//         <div className="mb-4 mt-2"><Link href="/"><h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span></h1></Link></div>
//         <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1 relative">
//           <div className="border border-[#ddd] rounded-[4px] p-[22px]">
//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
//               <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
//               <p className="text-[13px] text-[#111] leading-snug">To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span></p>
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
//                   <button type="button" onClick={() => { setCheckoutStep('editing'); setOtp(''); }} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer">Change email</button>
//                 </div>
//                 <input type="text" maxLength="6" required className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
//               </div>
//               <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>{isProcessing ? 'Processing Order...' : 'Verify & Place Order'}</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4"><span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}</div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2"><span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}</div>
//             </div>
//           </div>
//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-1"><span className="font-bold">Payment Method:</span> {placedOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">Review or edit your recent orders</Link>
//           </div>
//           <div className="mt-8 text-center"><Link href="/"><button className={`${amzButton} w-auto px-8 py-2 font-normal`}>Continue Shopping</button></Link></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2></div>
//               <div className="p-5">
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}
//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div><label className={labelStyles}>Full name (First and Last name)</label><input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Email Address (For order confirmation)</label><input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Mobile number</label><input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Flat, House no., Building, Company, Apartment</label><input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div><label className={labelStyles}>Town/City</label><input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                     <div><label className={labelStyles}>Pincode</label><input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>2. Select a payment method</h2></div>
//               <div className="p-5">
//                 <div className="space-y-3">
                  
//                   {/* 🚀 CHANGED: Hidden Online Payment Options 
//                   <label className="..."> ... </label> 
//                   */}

//                   <label className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-colors border-[#e77600] bg-[#fef8f2]`}>
//                     <input type="radio" name="paymentMethod" value="COD" checked={true} readOnly className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div>
//                       <p className="font-bold text-[14px]">Cash on Delivery / Pay on Delivery</p>
//                       <p className="text-[13px] text-[#565959] mt-1">Pay digitally with SMS link or pay cash at the time of delivery.</p>
//                       {/* Added note so users know why it's the only option */}
//                       <p className="text-[12px] text-[#B12704] mt-1 font-bold">Note: Online payments are temporarily disabled.</p>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>3. Review items and shipping</h2></div>
//               <div className="p-5">
//                 <div className="space-y-4">
//                   {cart.map((item, idx) => (
//                     <div key={idx} className="flex gap-4">
//                       <div className="w-[100px] shrink-0"><img src={getImageUrl(item.images[0])} alt={item.name} className="w-full object-contain mix-blend-multiply" /></div>
//                       <div className="flex-1">
//                         <h4 className="font-bold text-[#007185] text-[14px] leading-tight mb-1">{item.name}</h4>
//                         <div className="text-[14px] font-bold text-[#B12704] mb-1">₹{((item.discountPrice || item.price)).toLocaleString('en-IN')}</div>
//                         <div className="text-[13px] text-[#111]"><span className="font-bold">Qty:</span> {item.quantity || 1}</div>
//                         {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                           <div className="text-[12px] text-[#565959] mt-1">
//                             {Object.entries(item.selectedOptions).map(([key, val]) => <span key={key} className="mr-2">{key}: <span className="text-[#111]">{val}</span></span>)}
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

//         {/* 🚀 STICKY SUMMARY BOX */}
//         <div className="w-full lg:w-[300px] shrink-0 space-y-4">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
            
//             <button type="submit" form="checkoutForm" disabled={isProcessing || checkoutStep !== 'editing'} className={`${amzButton} mb-4 font-normal`}>
//               {isProcessing ? 'Processing...' : 'Place your order'}
//             </button>
//             <p className="text-[11px] text-[#565959] text-center border-b border-[#ddd] pb-4 mb-4 leading-tight">By placing your order, you agree to Amazon Smarts's <Link href="/privacy" className="text-[#007185] hover:underline">privacy notice</Link> and <Link href="/conditions" className="text-[#007185] hover:underline">conditions of use</Link>.</p>
//             <h3 className="font-bold text-[18px] text-[#111] mb-2">Order Summary</h3>
//             <div className="space-y-1.5 text-[13px] text-[#111] border-b border-[#ddd] pb-3 mb-3">
//               <div className="flex justify-between"><span>Items:</span><span>₹{itemsPrice.toLocaleString('en-IN')}</span></div>
//               <div className="flex justify-between"><span>Delivery:</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span></div>
//               {appliedDiscount > 0 && <div className="flex justify-between text-[#007600]"><span>Discount ({couponCode}):</span><span>-₹{appliedDiscount.toLocaleString('en-IN')}</span></div>}
//             </div>
//             <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4"><span>Order Total:</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
//             <div className="pt-4 border-t border-[#ddd]">
//               <label className={labelStyles}>Gift cards & promotional codes</label>
//               <div className="flex gap-2 mt-1">
//                 <input type="text" placeholder="Enter Code" className={`${inputStyles} uppercase font-mono text-[12px] flex-1 py-1.5`} value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} disabled={appliedDiscount > 0 || isApplyingCoupon} />
//                 {appliedDiscount > 0 ? (
//                   <button type="button" onClick={handleRemoveCoupon} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm font-bold text-[#B12704]">Remove</button>
//                 ) : (
//                   <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm disabled:opacity-50">Apply</button>
//                 )}
//               </div>
//               {couponMessage && <p className={`text-[12px] font-bold mt-2 leading-tight ${couponMessage.type === 'success' ? 'text-[#007600]' : 'text-[#B12704]'}`}>{couponMessage.type === 'success' ? '✓ ' : '! '}{couponMessage.text}</p>}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // src/app/checkout/page.jsx
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (document.getElementById('razorpay-checkout-js')) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement('script');
//     script.id = 'razorpay-checkout-js';
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [isHydrated, setIsHydrated] = useState(false);
  
//   const [checkoutStep, setCheckoutStep] = useState('editing'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '', address: '', city: '', pincode: ''
//   });
  
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('ONLINE'); 

//   const [couponCode, setCouponCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState(null); 
//   const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; 
//             setShippingInfo(prev => ({
//               ...prev, phone: phone || prev.phone, address: defaultAddr.street || '', city: defaultAddr.city || '', pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         }).catch(err => console.error(err));
//     }
//     // Pre-load script for speed
//     loadRazorpayScript();
//   }, [user]);

//   const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
//   const shippingPrice = itemsPrice > 50000 ? 0 : 0; 
//   const grandTotal = Math.max(0, itemsPrice + (cart.length > 0 ? shippingPrice : 0) - appliedDiscount);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '#';
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
//   };

//   const handleApplyCoupon = async (e) => {
//     e.preventDefault();
//     if (!couponCode.trim()) return;
//     setIsApplyingCoupon(true); setCouponMessage(null);
//     try {
//       const cartItemsPayload = cart.map(item => ({ product: item._id, price: item.discountPrice || item.price, quantity: item.quantity || 1 }));
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, { code: couponCode.toUpperCase(), cartItems: cartItemsPayload });
//       setAppliedDiscount(data.discountAmount);
//       setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${data.discountAmount.toLocaleString('en-IN')}` });
//     } catch (error) {
//       setAppliedDiscount(0);
//       setCouponMessage({ type: 'error', text: error.response?.data?.message || 'Invalid coupon code.' });
//     } finally { setIsApplyingCoupon(false); }
//   };

//   const handleRemoveCoupon = () => { setCouponCode(''); setAppliedDiscount(0); setCouponMessage(null); };

//   const placeOrderToDatabase = async (methodString, razorpayPaymentId = null) => {
//     try {
//       const userId = user?._id || user?.user?._id;
//       const orderPayload = {
//         userId: userId || undefined, 
//         orderItems: cart.map(item => ({
//           name: item.name, quantity: item.quantity || 1, image: item.images && item.images.length > 0 ? item.images[0] : '',
//           price: item.discountPrice || item.price, product: item._id, selectedOptions: item.selectedOptions || {} 
//         })),
//         itemsPrice, shippingPrice, discountAmount: appliedDiscount, couponCode: appliedDiscount > 0 ? couponCode : null,
//         totalPrice: grandTotal, shippingAddress: shippingInfo,
//         paymentMethod: methodString,
//         isPaid: methodString !== 'COD',
//         paidAt: methodString !== 'COD' ? new Date() : null,
//         paymentResult: razorpayPaymentId ? { id: razorpayPaymentId, status: 'Completed' } : null
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
      
//       if (userId && !hasSavedAddress) {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
//           street: shippingInfo.address, city: shippingInfo.city, pincode: shippingInfo.pincode, state: "State", country: "India", phone: shippingInfo.phone
//         }).catch(e => console.log("Silent fail address save", e));
//       }

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');
//     } catch (error) {
//       alert("Error saving order to database. Please contact support.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // 🚀 REUSABLE FUNCTION: Handles Razorpay OR COD
//   const executeOrderPlacement = async () => {
//     setIsProcessing(true);
//     try {
//       if (paymentMethod === 'ONLINE') {
//         const res = await loadRazorpayScript();
        
//         if (res && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
//           let rzpOrder;
//           try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/create`, { amount: grandTotal });
//             rzpOrder = response.data;
//           } catch (backendError) {
//             console.error("Razorpay Backend Error:", backendError);
//             alert(`Backend Error: ${backendError.response?.data?.message || "Could not reach Razorpay."}`);
//             setIsProcessing(false);
//             return; 
//           }
          
//           const options = {
//             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//             amount: rzpOrder.amount,
//             currency: rzpOrder.currency,
//             name: "Amazon Smarts",
//             description: "Secure Order Checkout",
//             order_id: rzpOrder.id,
//             handler: async function (response) {
//               try {
//                 // Keep showing processing overlay while verifying
//                 setIsProcessing(true);
//                 await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/verify`, {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature
//                 });
//                 await placeOrderToDatabase('Razorpay', response.razorpay_payment_id);
//               } catch (err) {
//                 alert("Payment verification failed! Please contact support.");
//                 setIsProcessing(false);
//               }
//             },
//             prefill: { name: shippingInfo.fullName, email: shippingInfo.email, contact: shippingInfo.phone },
//             theme: { color: "#232F3E" },
//             modal: {
//               ondismiss: function() {
//                 setIsProcessing(false); // Stop loading spinner if user closes popup
//               }
//             }
//           };

//           const paymentObject = new window.Razorpay(options);
          
//           paymentObject.on('payment.failed', function (response){
//               alert("Payment Failed: " + response.error.description);
//               setIsProcessing(false);
//           });

//           paymentObject.open();

//         } else {
//           alert("Error: Payment gateway could not be loaded. Please ensure your Razorpay keys are set.");
//           setIsProcessing(false); 
//         }

//       } else {
//         await placeOrderToDatabase('COD', null);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   // 🚀 MAIN CHECKOUT BUTTON CLICK
//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address.");
    
//     if (user) {
//       await executeOrderPlacement();
//     } else {
//       setIsProcessing(true);
//       try {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//         setCheckoutStep('otp');
//       } catch (error) { 
//         alert(error.response?.data?.message || "Error sending OTP."); 
//       } finally { 
//         setIsProcessing(false); 
//       }
//     }
//   };

//   // 🚀 OTP VERIFICATION (GUESTS ONLY)
//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { email: shippingInfo.email, otp });
//       await executeOrderPlacement();
//     } catch (error) {
//       alert(error.response?.data?.message || "Invalid OTP Code. Please try again.");
//       setIsProcessing(false); 
//     }
//   };

//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center disabled:opacity-50";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[14px] text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

//   if (!isHydrated) return null;

//   if (cart.length === 0 && checkoutStep === 'editing') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-20">
//         <h2 className="text-[24px] font-bold text-[#111] mb-4">Your Amazon Smarts Cart is empty.</h2>
//         <Link href="/"><button className={amzButton + " px-6 py-2 w-auto rounded-[3px]"}>Continue Shopping</button></Link>
//       </div>
//     );
//   }

//   if (checkoutStep === 'otp') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
//         <div className="mb-4 mt-2"><Link href="/"><h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span></h1></Link></div>
//         <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1 relative">
          
//           {/* OTP FORM */}
//           <div className="border border-[#ddd] rounded-[4px] p-[22px]">
//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
//               <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
//               <p className="text-[13px] text-[#111] leading-snug">To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span></p>
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
//                   <button type="button" onClick={() => { setCheckoutStep('editing'); setOtp(''); }} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer">Change email</button>
//                 </div>
//                 <input type="text" maxLength="6" required className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
//               </div>
//               <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>{isProcessing ? 'Connecting...' : 'Verify & Place Order'}</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4"><span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}</div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2"><span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}</div>
//             </div>
//           </div>
//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-1"><span className="font-bold">Payment Method:</span> {placedOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">Review or edit your recent orders</Link>
//           </div>
//           <div className="mt-8 text-center"><Link href="/"><button className={`${amzButton} w-auto px-8 py-2 font-normal`}>Continue Shopping</button></Link></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
            
//             {/* 1. ADDRESS */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2></div>
//               <div className="p-5">
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}
//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div><label className={labelStyles}>Full name (First and Last name)</label><input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Email Address (For order confirmation)</label><input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Mobile number</label><input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Flat, House no., Building, Company, Apartment</label><input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div><label className={labelStyles}>Town/City</label><input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                     <div><label className={labelStyles}>Pincode</label><input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 2. PAYMENT */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>2. Select a payment method</h2></div>
//               <div className="p-5">
//                 <div className="space-y-3">
//                   <label className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-colors ${paymentMethod === 'ONLINE' ? 'border-[#e77600] bg-[#fef8f2]' : 'border-[#ddd] bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="ONLINE" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px]">Credit/Debit Card, UPI, Net Banking</p>
//                       <div className="flex gap-2 mt-1">
//                         <span className="bg-white text-[10px] px-2 py-0.5 rounded font-bold border border-[#ddd] text-[#007185]">UPI</span>
//                         <span className="bg-white text-[10px] px-2 py-0.5 rounded font-bold border border-[#ddd] text-[#007185]">VISA</span>
//                         <span className="bg-white text-[10px] px-2 py-0.5 rounded font-bold border border-[#ddd] text-[#007185]">MasterCard</span>
//                       </div>
//                       <p className="text-[12px] text-[#007185] mt-1">100% Secure encrypted payment.</p>
//                     </div>
//                   </label>
                  
//                   <label className={`flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-[#e77600] bg-[#fef8f2]' : 'border-[#ddd] bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div>
//                       <p className="font-bold text-[14px]">Cash on Delivery / Pay on Delivery</p>
//                       <p className="text-[13px] text-[#565959] mt-1">Pay digitally with SMS link or pay cash at the time of delivery.</p>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* 3. REVIEW ITEMS */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>3. Review items and shipping</h2></div>
//               <div className="p-5">
//                 <div className="space-y-4">
//                   {cart.map((item, idx) => (
//                     <div key={idx} className="flex gap-4">
//                       <div className="w-[100px] shrink-0"><img src={getImageUrl(item.images[0])} alt={item.name} className="w-full object-contain mix-blend-multiply" /></div>
//                       <div className="flex-1">
//                         <h4 className="font-bold text-[#007185] text-[14px] leading-tight mb-1">{item.name}</h4>
//                         <div className="text-[14px] font-bold text-[#B12704] mb-1">₹{((item.discountPrice || item.price)).toLocaleString('en-IN')}</div>
//                         <div className="text-[13px] text-[#111]"><span className="font-bold">Qty:</span> {item.quantity || 1}</div>
//                         {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                           <div className="text-[12px] text-[#565959] mt-1">
//                             {Object.entries(item.selectedOptions).map(([key, val]) => <span key={key} className="mr-2">{key}: <span className="text-[#111]">{val}</span></span>)}
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

//         {/* 🚀 STICKY SUMMARY BOX */}
//         <div className="w-full lg:w-[300px] shrink-0 space-y-4">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
            
//             {/* OVERLAY LOADER */}
//             {isProcessing && (
//               <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-[8px]">
//                 <div className="w-6 h-6 border-2 border-t-[#007185] border-[#e7e7e7] rounded-full animate-spin mb-2"></div>
//                 <p className="text-[12px] font-bold">Securely connecting...</p>
//               </div>
//             )}

//             <button type="submit" form="checkoutForm" disabled={isProcessing || checkoutStep !== 'editing'} className={`${amzButton} mb-4 font-normal`}>
//               {isProcessing ? 'Processing...' : 'Place your order'}
//             </button>
            
//             <p className="text-[11px] text-[#565959] text-center border-b border-[#ddd] pb-4 mb-4 leading-tight">By placing your order, you agree to Amazon Smarts's <Link href="/privacy" className="text-[#007185] hover:underline">privacy notice</Link> and <Link href="/conditions" className="text-[#007185] hover:underline">conditions of use</Link>.</p>
//             <h3 className="font-bold text-[18px] text-[#111] mb-2">Order Summary</h3>
//             <div className="space-y-1.5 text-[13px] text-[#111] border-b border-[#ddd] pb-3 mb-3">
//               <div className="flex justify-between"><span>Items:</span><span>₹{itemsPrice.toLocaleString('en-IN')}</span></div>
//               <div className="flex justify-between"><span>Delivery:</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span></div>
//               {appliedDiscount > 0 && <div className="flex justify-between text-[#007600]"><span>Discount ({couponCode}):</span><span>-₹{appliedDiscount.toLocaleString('en-IN')}</span></div>}
//             </div>
//             <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4"><span>Order Total:</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
//             <div className="pt-4 border-t border-[#ddd]">
//               <label className={labelStyles}>Gift cards & promotional codes</label>
//               <div className="flex gap-2 mt-1">
//                 <input type="text" placeholder="Enter Code" className={`${inputStyles} uppercase font-mono text-[12px] flex-1 py-1.5`} value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} disabled={appliedDiscount > 0 || isApplyingCoupon} />
//                 {appliedDiscount > 0 ? (
//                   <button type="button" onClick={handleRemoveCoupon} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm font-bold text-[#B12704]">Remove</button>
//                 ) : (
//                   <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm disabled:opacity-50">Apply</button>
//                 )}
//               </div>
//               {couponMessage && <p className={`text-[12px] font-bold mt-2 leading-tight ${couponMessage.type === 'success' ? 'text-[#007600]' : 'text-[#B12704]'}`}>{couponMessage.type === 'success' ? '✓ ' : '! '}{couponMessage.text}</p>}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// src/app/checkout/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (document.getElementById('razorpay-checkout-js')) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement('script');
//     script.id = 'razorpay-checkout-js';
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [isHydrated, setIsHydrated] = useState(false);
  
//   const [checkoutStep, setCheckoutStep] = useState('editing'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '', address: '', city: '', pincode: ''
//   });
  
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);
  
//   // 🚀 SPECIFIC PAYMENT METHOD STATES
//   const [paymentMethod, setPaymentMethod] = useState('UPI'); 
//   const [upiId, setUpiId] = useState('');

//   const [couponCode, setCouponCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState(null); 
//   const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; 
//             setShippingInfo(prev => ({
//               ...prev, phone: phone || prev.phone, address: defaultAddr.street || '', city: defaultAddr.city || '', pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         }).catch(err => console.error(err));
//     }
//     // Pre-load Razorpay script for instant popup
//     loadRazorpayScript();
//   }, [user]);

//   const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
//   const shippingPrice = itemsPrice > 50000 ? 0 : 0; 
//   const grandTotal = Math.max(0, itemsPrice + (cart.length > 0 ? shippingPrice : 0) - appliedDiscount);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '#';
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
//   };

//   const handleApplyCoupon = async (e) => {
//     e.preventDefault();
//     if (!couponCode.trim()) return;
//     setIsApplyingCoupon(true); setCouponMessage(null);
//     try {
//       const cartItemsPayload = cart.map(item => ({ product: item._id, price: item.discountPrice || item.price, quantity: item.quantity || 1 }));
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, { code: couponCode.toUpperCase(), cartItems: cartItemsPayload });
//       setAppliedDiscount(data.discountAmount);
//       setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${data.discountAmount.toLocaleString('en-IN')}` });
//     } catch (error) {
//       setAppliedDiscount(0);
//       setCouponMessage({ type: 'error', text: error.response?.data?.message || 'Invalid coupon code.' });
//     } finally { setIsApplyingCoupon(false); }
//   };

//   const handleRemoveCoupon = () => { setCouponCode(''); setAppliedDiscount(0); setCouponMessage(null); };

//   const placeOrderToDatabase = async (methodString, razorpayPaymentId = null) => {
//     try {
//       const userId = user?._id || user?.user?._id;
//       const orderPayload = {
//         userId: userId || undefined, 
//         orderItems: cart.map(item => ({
//           name: item.name, quantity: item.quantity || 1, image: item.images && item.images.length > 0 ? item.images[0] : '',
//           price: item.discountPrice || item.price, product: item._id, selectedOptions: item.selectedOptions || {} 
//         })),
//         itemsPrice, shippingPrice, discountAmount: appliedDiscount, couponCode: appliedDiscount > 0 ? couponCode : null,
//         totalPrice: grandTotal, shippingAddress: shippingInfo,
//         paymentMethod: methodString,
//         isPaid: methodString !== 'COD',
//         paidAt: methodString !== 'COD' ? new Date() : null,
//         paymentResult: razorpayPaymentId ? { id: razorpayPaymentId, status: 'Completed' } : null
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
      
//       if (userId && !hasSavedAddress) {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
//           street: shippingInfo.address, city: shippingInfo.city, pincode: shippingInfo.pincode, state: "State", country: "India", phone: shippingInfo.phone
//         }).catch(e => console.log("Silent fail address save", e));
//       }

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');
//     } catch (error) {
//       alert("Error saving order to database. Please contact support.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // 🚀 ONLINE PAYMENT EXECUTION
//   const executeOrderPlacement = async () => {
    
//     if (paymentMethod === 'UPI' && !upiId.trim()) {
//       alert("Please enter your UPI ID.");
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       if (paymentMethod !== 'COD') {
//         const res = await loadRazorpayScript();
        
//         if (res && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
//           let rzpOrder;
//           try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/create`, { amount: grandTotal });
//             rzpOrder = response.data;
//           } catch (backendError) {
//             alert(`Backend Error: ${backendError.response?.data?.message || "Could not reach Razorpay."}`);
//             setIsProcessing(false);
//             return; 
//           }
          
//           const options = {
//             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//             amount: rzpOrder.amount,
//             currency: rzpOrder.currency,
//             name: "Amazon Smarts",
//             description: `Secure ${paymentMethod} Payment`,
//             order_id: rzpOrder.id,
//             handler: async function (response) {
//               try {
//                 setIsProcessing(true);
//                 await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/verify`, {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature
//                 });
//                 await placeOrderToDatabase('Razorpay', response.razorpay_payment_id);
//               } catch (err) {
//                 alert("Payment verification failed! Please contact support.");
//                 setIsProcessing(false);
//               }
//             },
//             prefill: { 
//               name: shippingInfo.fullName, 
//               email: shippingInfo.email, 
//               contact: shippingInfo.phone,
//               // Auto-fill UPI ID if they typed it in your frontend
//               vpa: paymentMethod === 'UPI' ? upiId : undefined
//             },
//             theme: { color: "#232F3E" },
//             // 🚀 FORCE RAZORPAY TO DIRECTLY OPEN THE SELECTED METHOD
//             config: {
//               display: {
//                 blocks: {
//                   custom_block: {
//                     name: "Complete Payment",
//                     instruments: [
//                       paymentMethod === 'UPI' ? { method: "upi" } :
//                       paymentMethod === 'CARD' ? { method: "card" } :
//                       { method: "netbanking" }
//                     ]
//                   }
//                 },
//                 sequence: ["block.custom_block"],
//                 preferences: { show_default_blocks: false }
//               }
//             },
//             modal: {
//               ondismiss: function() {
//                 setIsProcessing(false); 
//               }
//             }
//           };

//           const paymentObject = new window.Razorpay(options);
          
//           paymentObject.on('payment.failed', function (response){
//               alert("Payment Failed: " + response.error.description);
//               setIsProcessing(false);
//           });

//           paymentObject.open();

//         } else {
//           alert("Error: Payment gateway could not be loaded. Please ensure your Razorpay keys are set.");
//           setIsProcessing(false); 
//         }

//       } else {
//         await placeOrderToDatabase('COD', null);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address.");
    
//     if (user) {
//       await executeOrderPlacement();
//     } else {
//       setIsProcessing(true);
//       try {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//         setCheckoutStep('otp');
//       } catch (error) { 
//         alert(error.response?.data?.message || "Error sending OTP."); 
//       } finally { 
//         setIsProcessing(false); 
//       }
//     }
//   };

//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { email: shippingInfo.email, otp });
//       await executeOrderPlacement();
//     } catch (error) {
//       alert(error.response?.data?.message || "Invalid OTP Code. Please try again.");
//       setIsProcessing(false); 
//     }
//   };

//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center disabled:opacity-50";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[14px] text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

//   if (!isHydrated) return null;

//   if (cart.length === 0 && checkoutStep === 'editing') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-20">
//         <h2 className="text-[24px] font-bold text-[#111] mb-4">Your Amazon Smarts Cart is empty.</h2>
//         <Link href="/"><button className={amzButton + " px-6 py-2 w-auto rounded-[3px]"}>Continue Shopping</button></Link>
//       </div>
//     );
//   }

//   if (checkoutStep === 'otp') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
//         <div className="mb-4 mt-2"><Link href="/"><h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span></h1></Link></div>
//         <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1 relative">
//           <div className="border border-[#ddd] rounded-[4px] p-[22px]">
//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
//               <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
//               <p className="text-[13px] text-[#111] leading-snug">To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span></p>
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
//                   <button type="button" onClick={() => { setCheckoutStep('editing'); setOtp(''); }} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer">Change email</button>
//                 </div>
//                 <input type="text" maxLength="6" required className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
//               </div>
//               <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>{isProcessing ? 'Connecting...' : 'Verify & Place Order'}</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4"><span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}</div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2"><span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}</div>
//             </div>
//           </div>
//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-1"><span className="font-bold">Payment Method:</span> {placedOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">Review or edit your recent orders</Link>
//           </div>
//           <div className="mt-8 text-center"><Link href="/"><button className={`${amzButton} w-auto px-8 py-2 font-normal`}>Continue Shopping</button></Link></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
            
//             {/* 1. ADDRESS */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2></div>
//               <div className="p-5">
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}
//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div><label className={labelStyles}>Full name (First and Last name)</label><input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Email Address (For order confirmation)</label><input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Mobile number</label><input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Flat, House no., Building, Company, Apartment</label><input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div><label className={labelStyles}>Town/City</label><input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                     <div><label className={labelStyles}>Pincode</label><input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 2. PAYMENT */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>2. Select a payment method</h2></div>
//               <div className="p-0">
//                 <div className="flex flex-col">
                  
//                   {/* 🚀 UPI OPTION WITH FRONTEND INPUT */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px] text-[#111]">Other UPI Apps</p>
//                       {paymentMethod === 'UPI' && (
//                         <div className="mt-3 bg-white border border-[#ddd] p-3 rounded-[4px] shadow-inner">
//                           <label className="block text-[12px] font-bold text-[#565959] mb-1">Please enter your UPI ID</label>
//                           <input 
//                             type="text" 
//                             placeholder="Ex: mobileNumber@upi" 
//                             className="w-full md:w-[250px] px-3 py-1.5 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600]" 
//                             value={upiId}
//                             onChange={(e) => setUpiId(e.target.value)}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </label>

//                   {/* 🚀 CREDIT/DEBIT CARD OPTION (SECURE ILLUSION) */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'CARD' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="CARD" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <div className="flex items-center gap-2">
//                         <p className="font-bold text-[14px] text-[#111]">Credit or debit card</p>
//                         <div className="flex gap-1">
//                           <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-blue-800">VISA</span>
//                           <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-red-600">MasterCard</span>
//                           <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-orange-600">RuPay</span>
//                         </div>
//                       </div>
//                       {paymentMethod === 'CARD' && (
//                         <div className="mt-3 bg-white border border-[#ddd] p-3 rounded-[4px] flex items-start gap-2 shadow-sm">
//                           <span className="text-[#007185] text-lg leading-none">🔒</span>
//                           <div>
//                             <p className="text-[13px] text-[#111] font-bold mb-1">100% PCI-DSS Secure Payment</p>
//                             <p className="text-[12px] text-[#565959]">To ensure bank-level encryption, your card details are processed directly by Razorpay. You will enter your card securely in the next step.</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </label>

//                   {/* 🚀 NET BANKING OPTION */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'NETBANKING' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="NETBANKING" checked={paymentMethod === 'NETBANKING'} onChange={() => setPaymentMethod('NETBANKING')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px] text-[#111]">Net Banking</p>
//                       {paymentMethod === 'NETBANKING' && (
//                         <div className="mt-2 text-[13px] text-[#565959]">
//                           <p>You will be securely redirected to select your bank in the next step.</p>
//                         </div>
//                       )}
//                     </div>
//                   </label>
                  
//                   {/* 🚀 COD OPTION */}
//                   <label className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div>
//                       <p className="font-bold text-[14px] text-[#111]">Cash on Delivery / Pay on Delivery</p>
//                       <p className="text-[13px] text-[#565959] mt-1">Pay digitally with SMS link or pay cash at the time of delivery.</p>
//                     </div>
//                   </label>

//                 </div>
//               </div>
//             </div>

//             {/* 3. REVIEW ITEMS */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>3. Review items and shipping</h2></div>
//               <div className="p-5">
//                 <div className="space-y-4">
//                   {cart.map((item, idx) => (
//                     <div key={idx} className="flex gap-4">
//                       <div className="w-[100px] shrink-0"><img src={getImageUrl(item.images[0])} alt={item.name} className="w-full object-contain mix-blend-multiply" /></div>
//                       <div className="flex-1">
//                         <h4 className="font-bold text-[#007185] text-[14px] leading-tight mb-1">{item.name}</h4>
//                         <div className="text-[14px] font-bold text-[#B12704] mb-1">₹{((item.discountPrice || item.price)).toLocaleString('en-IN')}</div>
//                         <div className="text-[13px] text-[#111]"><span className="font-bold">Qty:</span> {item.quantity || 1}</div>
//                         {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                           <div className="text-[12px] text-[#565959] mt-1">
//                             {Object.entries(item.selectedOptions).map(([key, val]) => <span key={key} className="mr-2">{key}: <span className="text-[#111]">{val}</span></span>)}
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

//         {/* 🚀 STICKY SUMMARY BOX */}
//         <div className="w-full lg:w-[300px] shrink-0 space-y-4">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
            
//             {/* OVERLAY LOADER */}
//             {isProcessing && (
//               <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-[8px]">
//                 <div className="w-6 h-6 border-2 border-t-[#007185] border-[#e7e7e7] rounded-full animate-spin mb-2"></div>
//                 <p className="text-[12px] font-bold">Securely connecting...</p>
//               </div>
//             )}

//             <button type="submit" form="checkoutForm" disabled={isProcessing || checkoutStep !== 'editing'} className={`${amzButton} mb-4 font-normal`}>
//               {isProcessing ? 'Processing...' : 'Place your order'}
//             </button>
            
//             <p className="text-[11px] text-[#565959] text-center border-b border-[#ddd] pb-4 mb-4 leading-tight">By placing your order, you agree to Amazon Smarts's <Link href="/privacy" className="text-[#007185] hover:underline">privacy notice</Link> and <Link href="/conditions" className="text-[#007185] hover:underline">conditions of use</Link>.</p>
//             <h3 className="font-bold text-[18px] text-[#111] mb-2">Order Summary</h3>
//             <div className="space-y-1.5 text-[13px] text-[#111] border-b border-[#ddd] pb-3 mb-3">
//               <div className="flex justify-between"><span>Items:</span><span>₹{itemsPrice.toLocaleString('en-IN')}</span></div>
//               <div className="flex justify-between"><span>Delivery:</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span></div>
//               {appliedDiscount > 0 && <div className="flex justify-between text-[#007600]"><span>Discount ({couponCode}):</span><span>-₹{appliedDiscount.toLocaleString('en-IN')}</span></div>}
//             </div>
//             <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4"><span>Order Total:</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
//             <div className="pt-4 border-t border-[#ddd]">
//               <label className={labelStyles}>Gift cards & promotional codes</label>
//               <div className="flex gap-2 mt-1">
//                 <input type="text" placeholder="Enter Code" className={`${inputStyles} uppercase font-mono text-[12px] flex-1 py-1.5`} value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} disabled={appliedDiscount > 0 || isApplyingCoupon} />
//                 {appliedDiscount > 0 ? (
//                   <button type="button" onClick={handleRemoveCoupon} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm font-bold text-[#B12704]">Remove</button>
//                 ) : (
//                   <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm disabled:opacity-50">Apply</button>
//                 )}
//               </div>
//               {couponMessage && <p className={`text-[12px] font-bold mt-2 leading-tight ${couponMessage.type === 'success' ? 'text-[#007600]' : 'text-[#B12704]'}`}>{couponMessage.type === 'success' ? '✓ ' : '! '}{couponMessage.text}</p>}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// // src/app/checkout/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (document.getElementById('razorpay-checkout-js')) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement('script');
//     script.id = 'razorpay-checkout-js';
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// export default function CheckoutPage() {
//   const { cart, clearCart } = useCart(); 
//   const { user } = useAuth();
//   const router = useRouter();

//   const [isHydrated, setIsHydrated] = useState(false);
  
//   const [checkoutStep, setCheckoutStep] = useState('editing'); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || user?.user?.name || '', 
//     email: user?.email || user?.user?.email || '', 
//     phone: '', address: '', city: '', pincode: ''
//   });
  
//   const [hasSavedAddress, setHasSavedAddress] = useState(false);
  
//   // 🚀 SPECIFIC PAYMENT METHOD STATES
//   const [paymentMethod, setPaymentMethod] = useState('UPI'); 
//   const [upiId, setUpiId] = useState('');

//   const [couponCode, setCouponCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState(null); 
//   const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//     if (user) {
//       const userId = user?.user?._id || user?._id;
//       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
//         .then(res => {
//           const { phone, addresses } = res.data;
//           if (addresses && addresses.length > 0) {
//             const defaultAddr = addresses[0]; 
//             setShippingInfo(prev => ({
//               ...prev, phone: phone || prev.phone, address: defaultAddr.street || '', city: defaultAddr.city || '', pincode: defaultAddr.pincode || ''
//             }));
//             setHasSavedAddress(true);
//           }
//         }).catch(err => console.error(err));
//     }
//     // Pre-load Razorpay script for instant popup
//     loadRazorpayScript();
//   }, [user]);

//   const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
//   const shippingPrice = itemsPrice > 50000 ? 0 : 0; 
//   const grandTotal = Math.max(0, itemsPrice + (cart.length > 0 ? shippingPrice : 0) - appliedDiscount);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return '#';
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
//   };

//   const handleApplyCoupon = async (e) => {
//     e.preventDefault();
//     if (!couponCode.trim()) return;
//     setIsApplyingCoupon(true); setCouponMessage(null);
//     try {
//       const cartItemsPayload = cart.map(item => ({ product: item._id, price: item.discountPrice || item.price, quantity: item.quantity || 1 }));
//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, { code: couponCode.toUpperCase(), cartItems: cartItemsPayload });
//       setAppliedDiscount(data.discountAmount);
//       setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${data.discountAmount.toLocaleString('en-IN')}` });
//     } catch (error) {
//       setAppliedDiscount(0);
//       setCouponMessage({ type: 'error', text: error.response?.data?.message || 'Invalid coupon code.' });
//     } finally { setIsApplyingCoupon(false); }
//   };

//   const handleRemoveCoupon = () => { setCouponCode(''); setAppliedDiscount(0); setCouponMessage(null); };

//   const placeOrderToDatabase = async (methodString, razorpayPaymentId = null) => {
//     try {
//       const userId = user?._id || user?.user?._id;
//       const orderPayload = {
//         userId: userId || undefined, 
//         orderItems: cart.map(item => ({
//           name: item.name, quantity: item.quantity || 1, image: item.images && item.images.length > 0 ? item.images[0] : '',
//           price: item.discountPrice || item.price, product: item._id, selectedOptions: item.selectedOptions || {} 
//         })),
//         itemsPrice, shippingPrice, discountAmount: appliedDiscount, couponCode: appliedDiscount > 0 ? couponCode : null,
//         totalPrice: grandTotal, shippingAddress: shippingInfo,
//         paymentMethod: methodString,
//         isPaid: methodString !== 'COD',
//         paidAt: methodString !== 'COD' ? new Date() : null,
//         paymentResult: razorpayPaymentId ? { id: razorpayPaymentId, status: 'Completed' } : null
//       };

//       const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
      
//       if (userId && !hasSavedAddress) {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
//           street: shippingInfo.address, city: shippingInfo.city, pincode: shippingInfo.pincode, state: "State", country: "India", phone: shippingInfo.phone
//         }).catch(e => console.log("Silent fail address save", e));
//       }

//       if(clearCart) clearCart(); 
//       setPlacedOrder(data.order);
//       setCheckoutStep('success');
//     } catch (error) {
//       alert("Error saving order to database. Please contact support.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // 🚀 ONLINE PAYMENT EXECUTION
//   const executeOrderPlacement = async () => {
    
//     if (paymentMethod === 'UPI' && !upiId.trim()) {
//       alert("Please enter your UPI ID.");
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       if (paymentMethod !== 'COD') {
//         const res = await loadRazorpayScript();
        
//         if (res && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
//           let rzpOrder;
//           try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/create`, { amount: grandTotal });
//             rzpOrder = response.data;
//           } catch (backendError) {
//             alert(`Backend Error: ${backendError.response?.data?.message || "Could not reach Razorpay."}`);
//             setIsProcessing(false);
//             return; 
//           }
          
//           const options = {
//             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//             amount: rzpOrder.amount,
//             currency: rzpOrder.currency,
//             name: "Amazon Smarts",
//             description: `Secure ${paymentMethod} Payment`,
//             order_id: rzpOrder.id,
//             handler: async function (response) {
//               try {
//                 setIsProcessing(true);
//                 await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/verify`, {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature
//                 });
//                 await placeOrderToDatabase('Razorpay', response.razorpay_payment_id);
//               } catch (err) {
//                 alert("Payment verification failed! Please contact support.");
//                 setIsProcessing(false);
//               }
//             },
//             prefill: { 
//               name: shippingInfo.fullName, 
//               email: shippingInfo.email, 
//               contact: shippingInfo.phone,
//               vpa: paymentMethod === 'UPI' ? upiId : undefined
//             },
//             theme: { color: "#232F3E" },
//             // 🚀 FORCE RAZORPAY TO DIRECTLY OPEN THE SELECTED METHOD
//             config: {
//               display: {
//                 blocks: {
//                   custom_block: {
//                     name: "Complete Payment",
//                     instruments: [
//                       paymentMethod === 'UPI' ? { method: "upi" } :
//                       paymentMethod === 'CARD' ? { method: "card" } :
//                       paymentMethod === 'NETBANKING' ? { method: "netbanking" } :
//                       paymentMethod === 'WALLET' ? { method: "wallet" } :
//                       paymentMethod === 'EMI' ? { method: "emi" } :
//                       paymentMethod === 'PAYLATER' ? { method: "paylater" } :
//                       { method: "card" } // fallback
//                     ]
//                   }
//                 },
//                 sequence: ["block.custom_block"],
//                 preferences: { show_default_blocks: false }
//               }
//             },
//             modal: {
//               ondismiss: function() {
//                 setIsProcessing(false); 
//               }
//             }
//           };

//           const paymentObject = new window.Razorpay(options);
          
//           paymentObject.on('payment.failed', function (response){
//               alert("Payment Failed: " + response.error.description);
//               setIsProcessing(false);
//           });

//           paymentObject.open();

//         } else {
//           alert("Error: Payment gateway could not be loaded. Please ensure your Razorpay keys are set.");
//           setIsProcessing(false); 
//         }

//       } else {
//         await placeOrderToDatabase('COD', null);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();
//     if (!shippingInfo.email) return alert("Please enter an email address.");
    
//     if (user) {
//       await executeOrderPlacement();
//     } else {
//       setIsProcessing(true);
//       try {
//         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
//         setCheckoutStep('otp');
//       } catch (error) { 
//         alert(error.response?.data?.message || "Error sending OTP."); 
//       } finally { 
//         setIsProcessing(false); 
//       }
//     }
//   };

//   const handleVerifyAndPlaceOrder = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { email: shippingInfo.email, otp });
//       await executeOrderPlacement();
//     } catch (error) {
//       alert(error.response?.data?.message || "Invalid OTP Code. Please try again.");
//       setIsProcessing(false); 
//     }
//   };

//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center disabled:opacity-50";
//   const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
//   const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[14px] text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

//   if (!isHydrated) return null;

//   if (cart.length === 0 && checkoutStep === 'editing') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-20">
//         <h2 className="text-[24px] font-bold text-[#111] mb-4">Your Amazon Smarts Cart is empty.</h2>
//         <Link href="/"><button className={amzButton + " px-6 py-2 w-auto rounded-[3px]"}>Continue Shopping</button></Link>
//       </div>
//     );
//   }

//   if (checkoutStep === 'otp') {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
//         <div className="mb-4 mt-2"><Link href="/"><h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span></h1></Link></div>
//         <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1 relative">
//           <div className="border border-[#ddd] rounded-[4px] p-[22px]">
//             <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
//               <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
//               <p className="text-[13px] text-[#111] leading-snug">To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span></p>
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
//                   <button type="button" onClick={() => { setCheckoutStep('editing'); setOtp(''); }} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer">Change email</button>
//                 </div>
//                 <input type="text" maxLength="6" required className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
//               </div>
//               <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>{isProcessing ? 'Connecting...' : 'Verify & Place Order'}</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (checkoutStep === 'success' && placedOrder) {
//     const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//         <div className="max-w-[800px] mx-auto px-4 py-8">
//           <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
//             <span className="text-[#007600] text-3xl leading-none">✓</span>
//             <div>
//               <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
//               <p className="text-[14px]">Confirmation will be sent to your email.</p>
//               <div className="text-[14px] mt-4"><span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}</div>
//               <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2"><span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}</div>
//             </div>
//           </div>
//           <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
//             <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
//             <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
//             <p className="text-[14px] mb-1"><span className="font-bold">Payment Method:</span> {placedOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
//             <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
//             <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">Review or edit your recent orders</Link>
//           </div>
//           <div className="mt-8 text-center"><Link href="/"><button className={`${amzButton} w-auto px-8 py-2 font-normal`}>Continue Shopping</button></Link></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111]">
//       <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
//         <div className="flex-1 w-full space-y-4">
//           <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
            
//             {/* 1. ADDRESS */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2></div>
//               <div className="p-5">
//                 {hasSavedAddress && (
//                   <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
//                     <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
//                     <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
//                   </div>
//                 )}
//                 <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
//                 <div className="space-y-3 max-w-[500px]">
//                   <div><label className={labelStyles}>Full name (First and Last name)</label><input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Email Address (For order confirmation)</label><input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Mobile number</label><input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div><label className={labelStyles}>Flat, House no., Building, Company, Apartment</label><input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div><label className={labelStyles}>Town/City</label><input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                     <div><label className={labelStyles}>Pincode</label><input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 2. PAYMENT */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>2. Select a payment method</h2></div>
//               <div className="p-0">
//                 <div className="flex flex-col">
                  
//                   {/* 🚀 UPI OPTION */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px] text-[#111]">Other UPI Apps</p>
//                       {paymentMethod === 'UPI' && (
//                         <div className="mt-3 bg-white border border-[#ddd] p-3 rounded-[4px] shadow-inner">
//                           <label className="block text-[12px] font-bold text-[#565959] mb-1">Please enter your UPI ID</label>
//                           <input 
//                             type="text" 
//                             placeholder="Ex: mobileNumber@upi" 
//                             className="w-full md:w-[250px] px-3 py-1.5 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600]" 
//                             value={upiId}
//                             onChange={(e) => setUpiId(e.target.value)}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   </label>

//                   {/* 🚀 CARDS OPTION */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'CARD' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="CARD" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <div className="flex items-center gap-2">
//                         <p className="font-bold text-[14px] text-[#111]">Credit or debit card</p>
//                         <div className="flex gap-1">
//                           <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-blue-800">VISA</span>
//                           <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-red-600">MasterCard</span>
//                           <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-orange-600">RuPay</span>
//                         </div>
//                       </div>
//                       {paymentMethod === 'CARD' && (
//                         <div className="mt-3 bg-white border border-[#ddd] p-3 rounded-[4px] flex items-start gap-2 shadow-sm">
//                           <span className="text-[#007185] text-lg leading-none">🔒</span>
//                           <div>
//                             <p className="text-[13px] text-[#111] font-bold mb-1">100% PCI-DSS Secure Payment</p>
//                             <p className="text-[12px] text-[#565959]">To ensure bank-level encryption, your card details are processed directly by Razorpay. You will enter your card securely in the next step.</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </label>

//                   {/* 🚀 NET BANKING OPTION */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'NETBANKING' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="NETBANKING" checked={paymentMethod === 'NETBANKING'} onChange={() => setPaymentMethod('NETBANKING')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px] text-[#111]">Net Banking</p>
//                       {paymentMethod === 'NETBANKING' && (
//                         <div className="mt-2 text-[13px] text-[#565959]">
//                           <p>You will be securely redirected to select your bank in the next step.</p>
//                         </div>
//                       )}
//                     </div>
//                   </label>

//                   {/* 🚀 WALLETS OPTION */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'WALLET' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="WALLET" checked={paymentMethod === 'WALLET'} onChange={() => setPaymentMethod('WALLET')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px] text-[#111]">Wallets</p>
//                       {paymentMethod === 'WALLET' && (
//                         <div className="mt-2 text-[13px] text-[#565959]">
//                           <p>Amazon Pay, Paytm, PhonePe, MobiKwik, Freecharge, and more available.</p>
//                         </div>
//                       )}
//                     </div>
//                   </label>

//                   {/* 🚀 EMI OPTION */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'EMI' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="EMI" checked={paymentMethod === 'EMI'} onChange={() => setPaymentMethod('EMI')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px] text-[#111]">EMI</p>
//                       {paymentMethod === 'EMI' && (
//                         <div className="mt-2 text-[13px] text-[#565959]">
//                           <p>Available on Credit Cards and select Debit Cards.</p>
//                         </div>
//                       )}
//                     </div>
//                   </label>

//                   {/* 🚀 PAY LATER OPTION */}
//                   <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'PAYLATER' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="PAYLATER" checked={paymentMethod === 'PAYLATER'} onChange={() => setPaymentMethod('PAYLATER')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div className="w-full">
//                       <p className="font-bold text-[14px] text-[#111]">Pay Later</p>
//                       {paymentMethod === 'PAYLATER' && (
//                         <div className="mt-2 text-[13px] text-[#565959]">
//                           <p>Buy now, pay later with Simpl, ICICI PayLater, and more.</p>
//                         </div>
//                       )}
//                     </div>
//                   </label>
                  
//                   {/* 🚀 COD OPTION */}
//                   <label className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
//                     <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mt-1 accent-[#e77600] w-4 h-4" />
//                     <div>
//                       <p className="font-bold text-[14px] text-[#111]">Cash on Delivery / Pay on Delivery</p>
//                       <p className="text-[13px] text-[#565959] mt-1">Scan & Pay at delivery or pay cash.</p>
//                     </div>
//                   </label>

//                 </div>
//               </div>
//             </div>

//             {/* 3. REVIEW ITEMS */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>3. Review items and shipping</h2></div>
//               <div className="p-5">
//                 <div className="space-y-4">
//                   {cart.map((item, idx) => (
//                     <div key={idx} className="flex gap-4">
//                       <div className="w-[100px] shrink-0"><img src={getImageUrl(item.images[0])} alt={item.name} className="w-full object-contain mix-blend-multiply" /></div>
//                       <div className="flex-1">
//                         <h4 className="font-bold text-[#007185] text-[14px] leading-tight mb-1">{item.name}</h4>
//                         <div className="text-[14px] font-bold text-[#B12704] mb-1">₹{((item.discountPrice || item.price)).toLocaleString('en-IN')}</div>
//                         <div className="text-[13px] text-[#111]"><span className="font-bold">Qty:</span> {item.quantity || 1}</div>
//                         {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
//                           <div className="text-[12px] text-[#565959] mt-1">
//                             {Object.entries(item.selectedOptions).map(([key, val]) => <span key={key} className="mr-2">{key}: <span className="text-[#111]">{val}</span></span>)}
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

//         {/* 🚀 STICKY SUMMARY BOX */}
//         <div className="w-full lg:w-[300px] shrink-0 space-y-4">
//           <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
            
//             {/* OVERLAY LOADER */}
//             {isProcessing && (
//               <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-[8px]">
//                 <div className="w-6 h-6 border-2 border-t-[#007185] border-[#e7e7e7] rounded-full animate-spin mb-2"></div>
//                 <p className="text-[12px] font-bold">Securely connecting...</p>
//               </div>
//             )}

//             <button type="submit" form="checkoutForm" disabled={isProcessing || checkoutStep !== 'editing'} className={`${amzButton} mb-4 font-normal`}>
//               {isProcessing ? 'Processing...' : 'Place your order'}
//             </button>
            
//             <p className="text-[11px] text-[#565959] text-center border-b border-[#ddd] pb-4 mb-4 leading-tight">By placing your order, you agree to Amazon Smarts's <Link href="/privacy" className="text-[#007185] hover:underline">privacy notice</Link> and <Link href="/conditions" className="text-[#007185] hover:underline">conditions of use</Link>.</p>
//             <h3 className="font-bold text-[18px] text-[#111] mb-2">Order Summary</h3>
//             <div className="space-y-1.5 text-[13px] text-[#111] border-b border-[#ddd] pb-3 mb-3">
//               <div className="flex justify-between"><span>Items:</span><span>₹{itemsPrice.toLocaleString('en-IN')}</span></div>
//               <div className="flex justify-between"><span>Delivery:</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span></div>
//               {appliedDiscount > 0 && <div className="flex justify-between text-[#007600]"><span>Discount ({couponCode}):</span><span>-₹{appliedDiscount.toLocaleString('en-IN')}</span></div>}
//             </div>
//             <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4"><span>Order Total:</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
//             <div className="pt-4 border-t border-[#ddd]">
//               <label className={labelStyles}>Gift cards & promotional codes</label>
//               <div className="flex gap-2 mt-1">
//                 <input type="text" placeholder="Enter Code" className={`${inputStyles} uppercase font-mono text-[12px] flex-1 py-1.5`} value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} disabled={appliedDiscount > 0 || isApplyingCoupon} />
//                 {appliedDiscount > 0 ? (
//                   <button type="button" onClick={handleRemoveCoupon} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm font-bold text-[#B12704]">Remove</button>
//                 ) : (
//                   <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm disabled:opacity-50">Apply</button>
//                 )}
//               </div>
//               {couponMessage && <p className={`text-[12px] font-bold mt-2 leading-tight ${couponMessage.type === 'success' ? 'text-[#007600]' : 'text-[#B12704]'}`}>{couponMessage.type === 'success' ? '✓ ' : '! '}{couponMessage.text}</p>}
//             </div>
//           </div>
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

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-checkout-js')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); 
  const { user } = useAuth();
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  
  const [checkoutStep, setCheckoutStep] = useState('editing'); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [otp, setOtp] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || user?.user?.name || '', 
    email: user?.email || user?.user?.email || '', 
    phone: '', address: '', city: '', pincode: ''
  });
  
  const [hasSavedAddress, setHasSavedAddress] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState('UPI'); 
  const [upiId, setUpiId] = useState('');

  // 🚀 EMI & KYC STATES
  const [dynamicEmiConfig, setDynamicEmiConfig] = useState({ minDownPaymentPercent: 10, allowedTenures: [3, 6, 9, 12] });
  const [emiDownPayment, setEmiDownPayment] = useState(10); 
  const [emiTenure, setEmiTenure] = useState(6); 
  const [emiCalcData, setEmiCalcData] = useState(null);
  const [kycFiles, setKycFiles] = useState({ selfie: null, panCard: null, idFront: null, idBack: null });
  const [showKycModal, setShowKycModal] = useState(false);
  const [extractedKycData, setExtractedKycData] = useState(null);

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null); 
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (user) {
      const userId = user?.user?._id || user?._id;
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
        .then(res => {
          const { phone, addresses } = res.data;
          if (addresses && addresses.length > 0) {
            const defaultAddr = addresses[0]; 
            setShippingInfo(prev => ({
              ...prev, phone: phone || prev.phone, address: defaultAddr.street || '', city: defaultAddr.city || '', pincode: defaultAddr.pincode || ''
            }));
            setHasSavedAddress(true);
          }
        }).catch(err => console.error(err));
    }
    loadRazorpayScript();
  }, [user]);

  const itemsPrice = cart.reduce((total, item) => total + ((item.discountPrice || item.price) * item.quantity), 0);
  const shippingPrice = itemsPrice > 50000 ? 0 : 0; 
  const grandTotal = Math.max(0, itemsPrice + (cart.length > 0 ? shippingPrice : 0) - appliedDiscount);

  // 🚀 1. FETCH DYNAMIC CART LIMITS ON LOAD
  useEffect(() => {
    if(cart.length > 0) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/emi/cart-config`, { cartItems: cart })
        .then(res => {
           setDynamicEmiConfig(res.data);
           setEmiDownPayment(res.data.minDownPaymentPercent); 
           setEmiTenure(res.data.allowedTenures[0] || 6);          
        }).catch(err => console.error(err));
    }
  }, [cart]);

  // 🚀 2. CALCULATE MATH WHEN SLIDER MOVES
  useEffect(() => {
    if (paymentMethod === 'EMI_LOAN' && grandTotal > 0) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/emi/calculate`, {
        cartItems: cart, downPaymentPercent: emiDownPayment, tenureMonths: emiTenure
      }).then(res => setEmiCalcData(res.data)).catch(err => console.error(err));
    }
  }, [paymentMethod, emiDownPayment, emiTenure, cart, grandTotal]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '#';
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`;
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true); setCouponMessage(null);
    try {
      const cartItemsPayload = cart.map(item => ({ product: item._id, price: item.discountPrice || item.price, quantity: item.quantity || 1 }));
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons/validate`, { code: couponCode.toUpperCase(), cartItems: cartItemsPayload });
      setAppliedDiscount(data.discountAmount);
      setCouponMessage({ type: 'success', text: `Coupon applied! You saved ₹${data.discountAmount.toLocaleString('en-IN')}` });
    } catch (error) {
      setAppliedDiscount(0);
      setCouponMessage({ type: 'error', text: error.response?.data?.message || 'Invalid coupon code.' });
    } finally { setIsApplyingCoupon(false); }
  };

  const handleRemoveCoupon = () => { setCouponCode(''); setAppliedDiscount(0); setCouponMessage(null); };

  const placeOrderToDatabase = async (methodString, razorpayPaymentId = null) => {
    try {
      const userId = user?._id || user?.user?._id;
      
      let schedule = [];
      if (methodString === 'EMI_LOAN' && emiCalcData) {
         for(let i=1; i<=emiTenure; i++) {
            let nextDate = new Date();
            nextDate.setMonth(nextDate.getMonth() + i);
            schedule.push({ installmentNumber: i, dueDate: nextDate, amountDue: emiCalcData.monthlyEmi, status: 'Pending' });
         }
      }

      const orderPayload = {
        userId: userId || undefined, 
        orderItems: cart.map(item => ({
          name: item.name, quantity: item.quantity || 1, image: item.images && item.images.length > 0 ? item.images[0] : '',
          price: item.discountPrice || item.price, product: item._id, selectedOptions: item.selectedOptions || {} 
        })),
        itemsPrice, shippingPrice, discountAmount: appliedDiscount, couponCode: appliedDiscount > 0 ? couponCode : null,
        totalPrice: grandTotal, shippingAddress: shippingInfo,
        paymentMethod: methodString,
        isPaid: methodString !== 'COD',
        paidAt: methodString !== 'COD' ? new Date() : null,
        paymentResult: razorpayPaymentId ? { id: razorpayPaymentId, status: 'Completed' } : null,
        
        isEmiOrder: methodString === 'EMI_LOAN',
        ...(methodString === 'EMI_LOAN' && emiCalcData ? {
          emiDetails: {
            downPaymentAmount: emiCalcData.downPaymentAmount,
            principalAmount: emiCalcData.principalAmount,
            interestRateMonthly: emiCalcData.interestRateMonthly,
            tenureMonths: emiTenure,
            monthlyEmiAmount: emiCalcData.monthlyEmi,
            kyc: { verificationStatus: 'Verified', extractedData: extractedKycData },
            schedule: schedule
          }
        } : {})
      };

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
      
      if (userId && !hasSavedAddress) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
          street: shippingInfo.address, city: shippingInfo.city, pincode: shippingInfo.pincode, state: "State", country: "India", phone: shippingInfo.phone
        }).catch(e => console.log("Silent fail address save", e));
      }

      if(clearCart) clearCart(); 
      setPlacedOrder(data.order);
      setCheckoutStep('success');
    } catch (error) {
      alert("Error saving order to database. Please contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  const executeOrderPlacement = async () => {
    if (paymentMethod === 'UPI' && !upiId.trim()) {
      alert("Please enter your UPI ID.");
      return;
    }

    if (paymentMethod === 'EMI_LOAN') {
       if(!kycFiles.selfie || !kycFiles.panCard || !kycFiles.idFront || !kycFiles.idBack) {
          alert("All KYC Documents are required for EMI Approval.");
          return;
       }
       const minSize = 1048576; // 1MB
       if (kycFiles.selfie.size < minSize || kycFiles.panCard.size < minSize) {
           alert("Files must be at least 1MB for AI clarity.");
           return;
       }

       setIsProcessing(true);
       try {
         const formData = new FormData();
         formData.append('selfie', kycFiles.selfie);
         formData.append('panCard', kycFiles.panCard);
         formData.append('idFront', kycFiles.idFront);
         formData.append('idBack', kycFiles.idBack);
         
         const kycRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/emi/kyc`, formData);
         setExtractedKycData(kycRes.data.extractedData);
         setIsProcessing(false);
         setShowKycModal(true); 
         return; 
       } catch (err) {
         setIsProcessing(false);
         alert(err.response?.data?.message || "AI Verification failed. Please ensure images are clear.");
         return;
       }
    }

    proceedToRazorpay();
  };

  // 🚀 3. RAZORPAY RECURRING E-MANDATE ENFORCEMENT
  const proceedToRazorpay = async () => {
    setShowKycModal(false);
    setIsProcessing(true);
    try {
      if (paymentMethod !== 'COD') {
        const res = await loadRazorpayScript();
        if (res && process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
          let rzpOrder;
          try {
            const amountToCharge = paymentMethod === 'EMI_LOAN' && emiCalcData ? emiCalcData.downPaymentAmount : grandTotal;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/create`, { amount: amountToCharge });
            rzpOrder = response.data;
          } catch (backendError) {
            alert(`Backend Error: ${backendError.response?.data?.message || "Could not reach Razorpay."}`);
            setIsProcessing(false);
            return; 
          }
          
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
            amount: rzpOrder.amount,
            currency: rzpOrder.currency,
            name: "Amazon Smarts",
            description: paymentMethod === 'EMI_LOAN' ? "Down Payment & E-Mandate Setup" : `Secure ${paymentMethod} Payment`,
            order_id: rzpOrder.id,
            handler: async function (response) {
              try {
                setIsProcessing(true);
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/razorpay/verify`, {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                });
                await placeOrderToDatabase(paymentMethod, response.razorpay_payment_id);
              } catch (err) {
                alert("Payment verification failed! Please contact support.");
                setIsProcessing(false);
              }
            },
            prefill: { name: shippingInfo.fullName, email: shippingInfo.email, contact: shippingInfo.phone, vpa: paymentMethod === 'UPI' ? upiId : undefined },
            theme: { color: "#232F3E" },
            config: {
              display: {
                blocks: {
                  custom_block: {
                    name: "Complete Payment",
                    instruments: [
                      paymentMethod === 'EMI_LOAN' ? { method: "emandate" } : 
                      paymentMethod === 'UPI' ? { method: "upi" } :
                      paymentMethod === 'CARD' ? { method: "card" } :
                      paymentMethod === 'NETBANKING' ? { method: "netbanking" } :
                      paymentMethod === 'WALLET' ? { method: "wallet" } :
                      paymentMethod === 'PAYLATER' ? { method: "paylater" } :
                      { method: "card" } 
                    ]
                  }
                },
                sequence: ["block.custom_block"],
                preferences: { show_default_blocks: false }
              }
            },
            modal: { ondismiss: function() { setIsProcessing(false); } }
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.on('payment.failed', function (response){
              alert("Payment Failed: " + response.error.description);
              setIsProcessing(false);
          });
          paymentObject.open();
        } else {
          alert("Error: Payment gateway could not be loaded.");
          setIsProcessing(false); 
        }
      } else {
        await placeOrderToDatabase('COD', null);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!shippingInfo.email) return alert("Please enter an email address.");
    if (user) { await executeOrderPlacement(); } else {
      setIsProcessing(true);
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, { email: shippingInfo.email });
        setCheckoutStep('otp');
      } catch (error) { alert(error.response?.data?.message || "Error sending OTP."); } finally { setIsProcessing(false); }
    }
  };

  const handleVerifyAndPlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, { email: shippingInfo.email, otp });
      await executeOrderPlacement();
    } catch (error) { alert(error.response?.data?.message || "Invalid OTP Code."); setIsProcessing(false); }
  };

  const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
  const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
  const amzButton = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center disabled:opacity-50";
  const sectionTitle = "text-[18px] font-bold text-[#c45500] mb-4";
  const authInputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
  const authButton = "w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-[6px] rounded-[8px] text-[14px] text-[#111] shadow-sm transition-colors cursor-pointer text-center font-normal mt-2 disabled:opacity-50";

  if (!isHydrated) return null;

  if (cart.length === 0 && checkoutStep === 'editing') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center pt-20">
        <h2 className="text-[24px] font-bold text-[#111] mb-4">Your Amazon Smarts Cart is empty.</h2>
        <Link href="/"><button className={amzButton + " px-6 py-2 w-auto rounded-[3px]"}>Continue Shopping</button></Link>
      </div>
    );
  }

  if (checkoutStep === 'otp') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center pt-4 font-sans selection:bg-orange-200 relative">
        <div className="mb-4 mt-2"><Link href="/"><h1 className="text-3xl font-normal tracking-tighter text-[#111] cursor-pointer">amazon<span className="text-[#e77600] font-bold tracking-normal">smarts</span></h1></Link></div>
        <div className="w-full max-w-[350px] mx-auto px-4 sm:px-0 flex-1 relative">
          <div className="border border-[#ddd] rounded-[4px] p-[22px]">
            <form onSubmit={handleVerifyAndPlaceOrder} className="space-y-4">
              <h2 className="text-[28px] font-normal text-[#111] mb-2 leading-[1.2]">Verify email address</h2>
              <p className="text-[13px] text-[#111] leading-snug">To verify your email, we've sent a One Time Password (OTP) to <span className="font-bold">{shippingInfo.email}</span></p>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[13px] font-bold text-[#111]">Enter OTP</label>
                  <button type="button" onClick={() => { setCheckoutStep('editing'); setOtp(''); }} className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline bg-transparent border-none cursor-pointer">Change email</button>
                </div>
                <input type="text" maxLength="6" required className={`${authInputStyles} text-lg tracking-widest text-center py-2.5`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} />
              </div>
              <button type="submit" disabled={isProcessing || otp.length < 6} className={authButton}>{isProcessing ? 'Connecting...' : 'Verify & Place Order'}</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'success' && placedOrder) {
    const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    return (
      <div className="min-h-screen bg-white font-sans text-[#0F1111]">
        <div className="max-w-[800px] mx-auto px-4 py-8">
          <div className="border-[2px] border-[#007600] rounded-[4px] p-6 mb-6 flex gap-4 items-start">
            <span className="text-[#007600] text-3xl leading-none">✓</span>
            <div>
              <h2 className="text-[#007600] font-bold text-[22px] mb-1">Order placed, thank you!</h2>
              <p className="text-[14px]">Confirmation will be sent to your email.</p>
              <div className="text-[14px] mt-4"><span className="font-bold">Shipping to:</span> {shippingInfo.fullName}, {shippingInfo.city}, {shippingInfo.pincode}</div>
              <div className="text-[14px] mt-1 border-t border-[#ddd] pt-2"><span className="font-bold">Estimated Delivery:</span> {estimatedDelivery}</div>
            </div>
          </div>
          <div className="bg-[#f3f3f3] border border-[#ddd] rounded-[4px] p-5">
            <h3 className="font-bold text-[18px] mb-3">Order Details</h3>
            <p className="text-[14px] mb-1"><span className="font-bold">Order Number:</span> {placedOrder._id.toUpperCase()}</p>
            <p className="text-[14px] mb-1"><span className="font-bold">Payment Method:</span> {placedOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : placedOrder.paymentMethod === 'EMI_LOAN' ? 'Financed EMI' : 'Online Payment'}</p>
            <p className="text-[14px] mb-4"><span className="font-bold">Order Total:</span> ₹{placedOrder.totalPrice.toLocaleString('en-IN')}</p>
            <Link href="/orders" className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px]">Review or edit your recent orders</Link>
          </div>
          <div className="mt-8 text-center"><Link href="/"><button className={`${amzButton} w-auto px-8 py-2 font-normal`}>Continue Shopping</button></Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F1111] relative">
      
      {/* 🚀 KYC CONFIRMATION MODAL */}
      {showKycModal && extractedKycData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[999] backdrop-blur-sm">
          <div className="bg-white rounded-[8px] w-full max-w-[500px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#f0f2f2] border-b border-[#ddd] p-4 flex justify-between items-center">
              <h2 className="text-[18px] font-bold text-[#111]">Verify KYC Details</h2>
              <button onClick={() => setShowKycModal(false)} className="text-2xl leading-none text-[#565959] hover:text-[#111] transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#e7f4e4] border border-[#007600] p-3 rounded flex gap-3 items-start">
                <span className="text-[#007600] text-lg leading-none mt-0.5">✓</span>
                <div>
                  <p className="text-[13px] text-[#111] font-bold">AI Extraction Successful</p>
                  <p className="text-[11px] text-[#565959]">Please verify the details pulled from your documents. You can edit them if the AI made a mistake.</p>
                </div>
              </div>

              <div>
                <label className={labelStyles}>Full Name (As per PAN)</label>
                <input type="text" className={inputStyles} value={extractedKycData.name} onChange={e => setExtractedKycData({...extractedKycData, name: e.target.value})} />
              </div>
              <div>
                <label className={labelStyles}>PAN Number</label>
                <input type="text" className={`${inputStyles} uppercase font-mono tracking-widest`} value={extractedKycData.panNumber} onChange={e => setExtractedKycData({...extractedKycData, panNumber: e.target.value.toUpperCase()})} />
              </div>
              <div>
                <label className={labelStyles}>Aadhaar / ID Number</label>
                <input type="text" className={inputStyles} value={extractedKycData.idNumber} onChange={e => setExtractedKycData({...extractedKycData, idNumber: e.target.value})} />
              </div>

              <div className="border-t border-[#ddd] pt-4 mt-4">
                <p className="text-[11px] text-[#565959] leading-tight">By clicking below, you consent to setting up an e-mandate via Razorpay for your monthly EMI deductions of <span className="font-bold text-[#111]">₹{emiCalcData?.monthlyEmi?.toLocaleString()}</span>.</p>
              </div>
            </div>
            <div className="bg-[#f3f3f3] p-4 border-t flex justify-end gap-3">
              <button onClick={() => setShowKycModal(false)} className="px-4 py-1.5 text-[13px] font-bold text-[#007185] hover:underline">Cancel</button>
              <button onClick={proceedToRazorpay} className={amzButton + " max-w-[200px]"}>Confirm & Sign Mandate</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1000px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
        <div className="flex-1 w-full space-y-4">
          <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
            
            {/* 1. ADDRESS */}
            <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
              <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>1. Enter a shipping address</h2></div>
              <div className="p-5">
                {hasSavedAddress && (
                  <div className="mb-4 p-3 bg-[#e7f4e4] border border-[#007600] rounded-[4px] flex items-center gap-3 shadow-sm">
                    <span className="text-[#007600] text-lg leading-none font-bold">✓</span>
                    <p className="text-[#111] text-[13px] font-bold">We've pre-filled your primary saved address. You can edit it below if needed.</p>
                  </div>
                )}
                <h3 className="text-[16px] font-bold text-[#111] mb-4">Add a new address</h3>
                <div className="space-y-3 max-w-[500px]">
                  <div><label className={labelStyles}>Full name (First and Last name)</label><input type="text" required className={inputStyles} value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
                  <div><label className={labelStyles}>Email Address (For order confirmation)</label><input type="email" required className={inputStyles} placeholder="your@email.com" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
                  <div><label className={labelStyles}>Mobile number</label><input type="tel" required className={inputStyles} placeholder="10-digit mobile number" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
                  <div><label className={labelStyles}>Flat, House no., Building, Company, Apartment</label><input type="text" required className={inputStyles} value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelStyles}>Town/City</label><input type="text" required className={inputStyles} value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
                    <div><label className={labelStyles}>Pincode</label><input type="text" required className={inputStyles} placeholder="6 digits" value={shippingInfo.pincode} onChange={e => setShippingInfo({...shippingInfo, pincode: e.target.value})} disabled={checkoutStep !== 'editing'} /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PAYMENT */}
            <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
              <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>2. Select a payment method</h2></div>
              <div className="p-0">
                <div className="flex flex-col">
                  
                  {/* UPI OPTION */}
                  <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
                    <input type="radio" name="paymentMethod" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="mt-1 accent-[#e77600] w-4 h-4" />
                    <div className="w-full">
                      <p className="font-bold text-[14px] text-[#111]">Other UPI Apps</p>
                      {paymentMethod === 'UPI' && (
                        <div className="mt-3 bg-white border border-[#ddd] p-3 rounded-[4px] shadow-inner">
                          <label className="block text-[12px] font-bold text-[#565959] mb-1">Please enter your UPI ID</label>
                          <input type="text" placeholder="Ex: mobileNumber@upi" className="w-full md:w-[250px] px-3 py-1.5 border border-[#a6a6a6] rounded-[3px] text-sm focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600]" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* CARDS OPTION */}
                  <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'CARD' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
                    <input type="radio" name="paymentMethod" value="CARD" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} className="mt-1 accent-[#e77600] w-4 h-4" />
                    <div className="w-full">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[14px] text-[#111]">Credit or debit card</p>
                        <div className="flex gap-1">
                          <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-blue-800">VISA</span>
                          <span className="bg-white text-[9px] px-1 py-0.5 rounded border border-[#ddd] font-bold text-red-600">MasterCard</span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* NET BANKING OPTION */}
                  <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'NETBANKING' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
                    <input type="radio" name="paymentMethod" value="NETBANKING" checked={paymentMethod === 'NETBANKING'} onChange={() => setPaymentMethod('NETBANKING')} className="mt-1 accent-[#e77600] w-4 h-4" />
                    <div className="w-full"><p className="font-bold text-[14px] text-[#111]">Net Banking</p></div>
                  </label>

                  {/* 🚀 FINTECH EMI OPTION */}
                  <label className={`flex items-start gap-3 p-4 border-b border-[#ddd] cursor-pointer transition-colors ${paymentMethod === 'EMI_LOAN' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
                    <input type="radio" name="paymentMethod" value="EMI_LOAN" checked={paymentMethod === 'EMI_LOAN'} onChange={() => setPaymentMethod('EMI_LOAN')} className="mt-1 accent-[#e77600] w-4 h-4" />
                    <div className="w-full">
                      <p className="font-bold text-[14px] text-[#111]">Flexible EMI (ID Verification Required)</p>
                      {paymentMethod === 'EMI_LOAN' && emiCalcData && (
                        <div className="mt-3 bg-white border border-[#ddd] p-4 rounded-[4px] shadow-inner space-y-5 cursor-default">
                          
                          {/* Slider Math */}
                          <div>
                            <label className="flex justify-between text-[12px] font-bold text-[#111] mb-2">
                              <span>Down Payment: {emiDownPayment}%</span>
                              <span className="text-[#B12704]">₹{emiCalcData?.downPaymentAmount?.toLocaleString()} Today</span>
                            </label>
                            <input type="range" min={dynamicEmiConfig.minDownPaymentPercent} max="50" step="1" value={emiDownPayment} onChange={e => setEmiDownPayment(Number(e.target.value))} className="w-full h-1.5 bg-[#ddd] rounded-lg appearance-none cursor-pointer accent-[#e77600]" />
                            <p className="text-[10px] text-gray-500 mt-1">Minimum required for your cart: {dynamicEmiConfig.minDownPaymentPercent}%</p>
                          </div>

                          {/* Tenure Select */}
                          <div>
                            <label className="block text-[12px] font-bold text-[#111] mb-1">Select Tenure:</label>
                            <div className="flex gap-2">
                               {dynamicEmiConfig.allowedTenures.map(m => (
                                 <button type="button" key={m} onClick={() => setEmiTenure(m)} className={`flex-1 py-1.5 text-[12px] font-bold rounded border ${emiTenure === m ? 'bg-[#e7f4e4] border-[#007600] text-[#007600]' : 'bg-white border-[#ddd] text-[#565959] hover:bg-gray-50'}`}>{m} Months</button>
                               ))}
                            </div>
                          </div>

                          {/* Final Math Box */}
                          <div className="bg-[#f0f2f2] p-3 rounded border border-[#ddd] text-[12px] space-y-1">
                            <div className="flex justify-between"><span>Principal Financed:</span> <span className="font-bold">₹{emiCalcData.principalAmount?.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span>Monthly Interest:</span> <span className="font-bold">{emiCalcData.interestRateMonthly * 100}%</span></div>
                            <div className="flex justify-between border-t border-[#ddd] pt-1 mt-1"><span>Monthly EMI:</span> <span className="font-bold text-[#B12704] text-[14px]">₹{emiCalcData.monthlyEmi?.toLocaleString()} /mo</span></div>
                          </div>

                          {/* KYC UPLOAD (Strict 1MB notice) */}
                          <div className="border-t border-[#ddd] pt-4">
                            <h4 className="text-[13px] font-bold text-[#111] mb-2 flex items-center gap-1"><span className="text-blue-600">🛡️</span> Identity Verification (KYC)</h4>
                            <p className="text-[10px] text-[#565959] mb-3 leading-tight">For AI verification, documents must be clear and <span className="font-bold text-[#B12704]">larger than 1MB</span>.</p>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div className="border border-[#ddd] p-2 rounded bg-gray-50 text-center relative overflow-hidden">
                                <input type="file" required={paymentMethod === 'EMI_LOAN'} className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setKycFiles({...kycFiles, selfie: e.target.files[0]})} />
                                <p className="text-[18px]">🤳</p><p className="text-[10px] font-bold mt-1 truncate">{kycFiles.selfie ? '✅ Uploaded' : 'Selfie'}</p>
                              </div>
                              <div className="border border-[#ddd] p-2 rounded bg-gray-50 text-center relative overflow-hidden">
                                <input type="file" required={paymentMethod === 'EMI_LOAN'} className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setKycFiles({...kycFiles, panCard: e.target.files[0]})} />
                                <p className="text-[18px]">💳</p><p className="text-[10px] font-bold mt-1 truncate">{kycFiles.panCard ? '✅ Uploaded' : 'PAN Card'}</p>
                              </div>
                              <div className="border border-[#ddd] p-2 rounded bg-gray-50 text-center relative overflow-hidden">
                                <input type="file" required={paymentMethod === 'EMI_LOAN'} className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setKycFiles({...kycFiles, idFront: e.target.files[0]})} />
                                <p className="text-[18px]">📄</p><p className="text-[10px] font-bold mt-1 truncate">{kycFiles.idFront ? '✅ Uploaded' : 'Aadhaar Front'}</p>
                              </div>
                              <div className="border border-[#ddd] p-2 rounded bg-gray-50 text-center relative overflow-hidden">
                                <input type="file" required={paymentMethod === 'EMI_LOAN'} className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setKycFiles({...kycFiles, idBack: e.target.files[0]})} />
                                <p className="text-[18px]">📄</p><p className="text-[10px] font-bold mt-1 truncate">{kycFiles.idBack ? '✅ Uploaded' : 'Aadhaar Back'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-[10px] text-gray-500 mt-2 leading-tight">By proceeding, you agree to sign an auto-debit e-mandate via Razorpay in the next step.</p>
                        </div>
                      )}
                    </div>
                  </label>
                  
                  {/* COD OPTION */}
                  <label className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'bg-[#fef8f2]' : 'bg-white hover:bg-[#f7fafa]'}`}>
                    <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mt-1 accent-[#e77600] w-4 h-4" />
                    <div>
                      <p className="font-bold text-[14px] text-[#111]">Cash on Delivery / Pay on Delivery</p>
                      <p className="text-[13px] text-[#565959] mt-1">Scan & Pay at delivery or pay cash.</p>
                    </div>
                  </label>

                </div>
              </div>
            </div>

            {/* 3. REVIEW ITEMS */}
            <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
              <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className={sectionTitle + " mb-0"}>3. Review items and shipping</h2></div>
              <div className="p-5">
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-[100px] shrink-0"><img src={getImageUrl(item.images[0])} alt={item.name} className="w-full object-contain mix-blend-multiply" /></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#007185] text-[14px] leading-tight mb-1">{item.name}</h4>
                        <div className="text-[14px] font-bold text-[#B12704] mb-1">₹{((item.discountPrice || item.price)).toLocaleString('en-IN')}</div>
                        <div className="text-[13px] text-[#111]"><span className="font-bold">Qty:</span> {item.quantity || 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* 🚀 STICKY SUMMARY BOX */}
        <div className="w-full lg:w-[300px] shrink-0 space-y-4">
          <div className="border border-[#ddd] bg-[#f3f3f3] rounded-[8px] p-4 sticky top-6">
            
            {/* OVERLAY LOADER */}
            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-[8px]">
                <div className="w-6 h-6 border-2 border-t-[#007185] border-[#e7e7e7] rounded-full animate-spin mb-2"></div>
                <p className="text-[12px] font-bold">{paymentMethod === 'EMI_LOAN' && !showKycModal ? 'AI Verifying Documents...' : 'Securely connecting...'}</p>
              </div>
            )}

            <button type="submit" form="checkoutForm" disabled={isProcessing || checkoutStep !== 'editing'} className={`${amzButton} mb-4 font-normal`}>
              {isProcessing ? 'Processing...' : 'Place your order'}
            </button>
            
            <p className="text-[11px] text-[#565959] text-center border-b border-[#ddd] pb-4 mb-4 leading-tight">By placing your order, you agree to Amazon Smarts's <Link href="/privacy" className="text-[#007185] hover:underline">privacy notice</Link> and <Link href="/conditions" className="text-[#007185] hover:underline">conditions of use</Link>.</p>
            <h3 className="font-bold text-[18px] text-[#111] mb-2">Order Summary</h3>
            <div className="space-y-1.5 text-[13px] text-[#111] border-b border-[#ddd] pb-3 mb-3">
              <div className="flex justify-between"><span>Items:</span><span>₹{itemsPrice.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Delivery:</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span></div>
              {appliedDiscount > 0 && <div className="flex justify-between text-[#007600]"><span>Discount ({couponCode}):</span><span>-₹{appliedDiscount.toLocaleString('en-IN')}</span></div>}
            </div>
            <div className="flex justify-between items-center text-[#B12704] font-bold text-[18px] mb-4">
               <span>{paymentMethod === 'EMI_LOAN' ? 'Down Payment:' : 'Order Total:'}</span>
               <span>₹{paymentMethod === 'EMI_LOAN' && emiCalcData ? emiCalcData.downPaymentAmount.toLocaleString('en-IN') : grandTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-4 border-t border-[#ddd]">
              <label className={labelStyles}>Gift cards & promotional codes</label>
              <div className="flex gap-2 mt-1">
                <input type="text" placeholder="Enter Code" className={`${inputStyles} uppercase font-mono text-[12px] flex-1 py-1.5`} value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} disabled={appliedDiscount > 0 || isApplyingCoupon} />
                {appliedDiscount > 0 ? (
                  <button type="button" onClick={handleRemoveCoupon} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm font-bold text-[#B12704]">Remove</button>
                ) : (
                  <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] px-3 py-1.5 rounded-[4px] text-[12px] shadow-sm disabled:opacity-50">Apply</button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}