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
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Loading Your Orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* Navbar */}
      <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md">
        <Link href="/">
          <h1 className="text-2xl font-extrabold tracking-wide text-orange-400 cursor-pointer">
            GADGET<span className="text-white">STORE</span>
          </h1>
        </Link>
        <Link href="/">
          <button className="font-bold text-sm hover:underline">← Back to Store</button>
        </Link>
      </nav>

      <div className="max-w-[1000px] mx-auto p-4 md:p-6 mt-6">
        <h1 className="text-3xl font-black mb-8 text-slate-900">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
            <h2 className="text-xl font-bold mb-2">You haven't placed any orders yet.</h2>
            <p className="text-gray-500 mb-6">Looks like you need some new gadgets!</p>
            <Link href="/">
              <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* Order Header */}
                <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 text-sm">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-gray-500 font-medium uppercase text-xs">Order Placed</p>
                      <p className="font-bold text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium uppercase text-xs">Total</p>
                      <p className="font-bold text-gray-800">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 font-medium uppercase text-xs">Order ID</p>
                    <p className="font-mono text-gray-800 font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                {/* Order Status & Items */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    Status: 
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status || 'Processing'}
                    </span>
                  </h3>

                  <div className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded border flex items-center justify-center p-2 flex-shrink-0">
                          <img src={item.image || 'https://placehold.co/100'} alt={item.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <Link href={`/product/${item.product}`}>
                            <h4 className="font-bold text-gray-900 hover:text-orange-500 transition cursor-pointer line-clamp-2">{item.name}</h4>
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="hidden sm:block">
                          <button className="border border-gray-300 px-4 py-2 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                            Track Package
                          </button>
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