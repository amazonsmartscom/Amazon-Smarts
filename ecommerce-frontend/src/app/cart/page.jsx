// src/app/cart/page.jsx
'use client';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Script from 'next/script'; // <-- Added to load Razorpay
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
export default function CartPage() {
  const { cart, cartCount } = useCart();
const { user } = useAuth(); // <-- ADD THIS
  const subtotal = cart.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 499; 
  const grandTotal = subtotal + (cartCount > 0 ? shipping : 0);

  // 🚀 The Checkout Function
//   const handleCheckout = async () => {
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

//       // Dummy address since we haven't built an address form yet
//       const shippingAddress = { address: "123 Tech Lane", city: "Mumbai", postalCode: "400001", country: "India" };

//       // 2. Tell the backend to create an order
//       const { data } = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/orders', {
//         orderItems,
//         shippingAddress,
//         itemsPrice: subtotal,
//         shippingPrice: shipping,
//         totalPrice: grandTotal
//       });

//       // 3. Setup Razorpay Modal Options
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummykey", // Add this to frontend .env.local later
//         amount: data.amount,
//         currency: data.currency,
//         name: "RC Tech Store",
//         description: "Test Transaction",
//         order_id: data.razorpayOrderId,
//         handler: function (response) {
//           // This function runs when the payment is SUCCESSFUL
//           alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//           // Next step: Tell backend payment was successful and clear the cart!
//         },
//         prefill: {
//           name: "John Doe",
//           email: "john@example.com",
//           contact: "9999999999"
//         },
//         theme: {
//           color: "#f97316" // Orange to match your brand
//         }
//       };

//       // 4. Open the Modal
//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (error) {
//       console.error("Checkout Error:", error);
//       alert("Something went wrong during checkout. Is your backend running?");
//     }
//   };


const handleCheckout = async () => {
    try {
      if (cart.length === 0) return alert("Your cart is empty!");

      // 1. Format the cart items for the backend
      const orderItems = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.images[0] || '',
        price: item.discountPrice || item.price,
        product: item._id
      }));

      const shippingAddress = { address: "123 Tech Lane", city: "Mumbai", postalCode: "400001", country: "India" };

      // 2. Create the Order (This part still works!)
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        userId: user?.user?.id, // <-- ADD THIS LINE
        orderItems,
        shippingAddress,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        totalPrice: grandTotal
      });

      // 3. SIMULATE PAYMENT SUCCESS
      // Instead of opening Razorpay, we immediately hit our new backend route
      const paymentResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.orderId}/pay`);

      if (paymentResponse.status === 200) {
        alert("Testing: Payment Simulated Successfully! Order is Paid.");
        // We will clear the cart here in a future step
      }

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong during checkout.");
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      {/* Load Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
        <Link href="/">
          <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
            GADGET<span className="text-white">STORE</span>
          </h1>
        </Link>
        <span className="font-bold text-lg">Secure Checkout 🔒</span>
      </nav>

      <div className="max-w-[1200px] mx-auto p-4 md:p-6 mt-6 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Cart Items */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg mb-4">Your GadgetStore Cart is empty.</p>
              <Link href="/">
                <button className="bg-orange-500 text-slate-900 font-bold px-6 py-2 rounded hover:bg-orange-400">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100x100?text=No+Image'} alt={item.name} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-green-600 font-bold mt-1">In Stock</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <div className="bg-gray-100 px-3 py-1 rounded text-sm font-semibold">Qty: {item.quantity}</div>
                      <button className="text-sm text-red-500 hover:underline font-medium">Delete</button>
                    </div>
                  </div>
                  <div className="text-right sm:w-32">
                    <p className="text-xl font-bold text-gray-900">₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        {cart.length > 0 && (
          <div className="w-full lg:w-80 h-fit bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-sm text-gray-600 border-b pb-4 mb-4">
              <div className="flex justify-between"><span>Items ({cartCount}):</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Delivery:</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Order Total:</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* 🚀 UPDATE: ATTACH onClick EVENT */}
            {/* <button 
              onClick={handleCheckout}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow-sm transition-colors mb-3"
            >
              Proceed to Buy
            </button> */}
            <Link href="/checkout">
  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg mt-4">
    Proceed to Checkout
  </button>
</Link>
            
            <div className="text-xs text-gray-500 text-center">Safe and secure payments. Easy returns. 100% Authentic products.</div>
          </div>
        )}

      </div>
    </div>
  );
}