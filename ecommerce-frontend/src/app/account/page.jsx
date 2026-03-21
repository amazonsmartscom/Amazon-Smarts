// // src/app/account/page.jsx
// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import axios from 'axios';

// // =========================================================================
// // 1. MAIN CONTENT COMPONENT (Contains all hooks and logic)
// // =========================================================================
// function AccountContent() {
//   const { user, loading: authLoading, logout } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const currentTab = searchParams.get('tab') || 'dashboard';

//   const [isHydrated, setIsHydrated] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifs, setLoadingNotifs] = useState(false);

//   // Profile Settings States
//   const [profileData, setProfileData] = useState({
//     name: '',
//     phone: '',
//     addresses: [], // Array for multiple addresses
//     bankDetails: { upiId: '', accountName: '', accountNumber: '', bankName: '', ifsc: '' }
//   });
//   const [savingProfile, setSavingProfile] = useState(false);

//   // States for adding a new address
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [newAddress, setNewAddress] = useState({ street: '', city: '', pincode: '' });

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   // 🚀 FIXED: Scroll to Top on Load or Tab Switch
//   useEffect(() => {
//     if (!authLoading && typeof window !== 'undefined') {
//       window.scrollTo({ top: 0, behavior: 'instant' });
//     }
//   }, [authLoading, currentTab]);

//   // 🚀 BULLETPROOF AUTH CHECK
//   useEffect(() => {
//     if (authLoading) return;

//     if (!user) {
//       const redirectTimer = setTimeout(() => {
//         router.push('/login');
//       }, 1500);

//       return () => clearTimeout(redirectTimer);
//     }
//   }, [user, authLoading, router]);

//   // Fetch Notifications & Profile Data
//   useEffect(() => {
//     const userId = user?.user?._id || user?._id;
//     if (!userId) return;

//     if (currentTab === 'notifications') {
//       const fetchNotifs = async () => {
//         setLoadingNotifs(true);
//         try {
//           const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`);
//           setNotifications(data);
//         } catch (error) {
//           console.error("Error fetching notifications");
//         } finally {
//           setLoadingNotifs(false);
//         }
//       };
//       fetchNotifs();
//     }

//     if (currentTab === 'profile') {
//       const fetchProfile = async () => {
//         try {
//           const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
          
//           // Fallback compatibility for old single-address schema
//           let fetchedAddresses = data.addresses || [];
//           if (fetchedAddresses.length === 0 && data.address && data.address.street) {
//             fetchedAddresses = [data.address];
//           }

//           setProfileData({
//             name: data.name || '',
//             phone: data.phone || '',
//             addresses: fetchedAddresses,
//             bankDetails: data.bankDetails || { upiId: '', accountName: '', accountNumber: '', bankName: '', ifsc: '' }
//           });
//         } catch (error) {
//           console.error("Error fetching profile");
//         }
//       };
//       fetchProfile();
//     }
//   }, [currentTab, user]);

//   const handleMarkAsRead = async (notifId) => {
//     try {
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}/read`);
//       setNotifications(notifications.map(n => n._id === notifId ? { ...n, isRead: true } : n));
//     } catch (err) {}
//   };

//   const handleDeleteNotif = async (notifId) => {
//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}`);
//       setNotifications(notifications.filter(n => n._id !== notifId));
//     } catch (err) {}
//   };

//   // Add & Remove Address Handlers
//   const handleAddNewAddress = () => {
//     if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
//       return alert("Please fill out all address fields.");
//     }
//     setProfileData({
//       ...profileData,
//       addresses: [...profileData.addresses, newAddress]
//     });
//     setNewAddress({ street: '', city: '', pincode: '' }); // Reset form
//     setShowAddressForm(false); // Hide form
//   };

//   const handleRemoveAddress = (indexToRemove) => {
//     setProfileData({
//       ...profileData,
//       addresses: profileData.addresses.filter((_, index) => index !== indexToRemove)
//     });
//   };

//   // Save Profile Handler
//   const handleSaveProfile = async (e) => {
//     e.preventDefault();
//     setSavingProfile(true);
//     try {
//       const userId = user?.user?._id || user?._id;
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, profileData);
//       alert("✅ Profile updated successfully!");
//     } catch (error) {
//       alert("Error saving profile. Please try again.");
//     } finally {
//       setSavingProfile(false);
//     }
//   };

//   // 🚀 Keep showing the spinner as long as `user` is missing OR `authLoading` is true
//   if (!isHydrated || authLoading || !user) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   // AMAZON UI STYLES
//   const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer";
//   const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
//   const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
//   const amzButton = "bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] px-6 text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center";
//   const amzSecondaryButton = "bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[6px] px-6 rounded-[8px] text-[13px] text-[#0F1111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center";

//   // ================= NOTIFICATIONS VIEW =================
//   if (currentTab === 'notifications') {
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20">
//         <div className="max-w-[1000px] mx-auto px-4 py-6">
//           <div className="text-[12px] text-[#565959] mb-4 flex items-center gap-1">
//             <Link href="/account" className={amzLink}>Your Account</Link> <span>&gt;</span> <span className="text-[#c45500]">Message Center</span>
//           </div>
//           <h1 className="text-[28px] font-normal leading-tight mb-6">Your Messages & Notifications</h1>

//           <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//             <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className="font-bold text-[16px] text-[#0F1111]">Inbox</h2></div>
//             {loadingNotifs ? (
//               <div className="p-8 text-center text-[#565959]">Loading messages...</div>
//             ) : notifications.length === 0 ? (
//               <div className="p-8 text-center text-[#565959]">You have no messages.</div>
//             ) : (
//               <div className="divide-y divide-[#ddd]">
//                 {notifications.map((notif) => (
//                   <div key={notif._id} className={`p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-colors ${!notif.isRead ? 'bg-[#fdfdfd] border-l-4 border-l-[#e77600]' : 'bg-white'}`}>
//                     <div className="flex gap-4 items-start">
//                       <div className="text-3xl mt-1 opacity-80">{notif.type === 'invoice' ? '📄' : notif.type === 'cancel' ? '❌' : notif.type === 'success' ? '✅' : '🔔'}</div>
//                       <div>
//                         <h3 className={`text-[16px] text-[#007185] ${!notif.isRead ? 'font-bold' : 'font-normal'}`}>{notif.title}</h3>
//                         <p className="text-[13px] text-[#0F1111] mt-1">{notif.message}</p>
//                         <p className="text-[12px] text-[#565959] mt-1">
//                           {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-4 text-[13px] mt-2 md:mt-0 pl-12 md:pl-0">
//                       {!notif.isRead && <button onClick={() => handleMarkAsRead(notif._id)} className={amzLink}>Mark as read</button>}
//                       <span className="text-[#ddd] hidden md:block">|</span>
//                       <button onClick={() => handleDeleteNotif(notif._id)} className={amzLink}>Delete</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ================= PROFILE & SETTINGS VIEW =================
//   if (currentTab === 'profile') {
//     return (
//       <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20">
//         <div className="max-w-[800px] mx-auto px-4 py-6">
//           <div className="text-[12px] text-[#565959] mb-4 flex items-center gap-1">
//             <Link href="/account" className={amzLink}>Your Account</Link> <span>&gt;</span> <span className="text-[#c45500]">Login, Address & Bank Settings</span>
//           </div>
//           <h1 className="text-[28px] font-normal leading-tight mb-6">Account Settings</h1>

//           <form onSubmit={handleSaveProfile} className="space-y-6">
            
//             {/* 1. Personal Details */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className="font-bold text-[16px] text-[#0F1111]">1. Personal Information</h2></div>
//               <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div><label className={labelStyles}>Full Name</label><input type="text" className={inputStyles} value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} required /></div>
//                 <div><label className={labelStyles}>Mobile Number</label><input type="tel" className={inputStyles} value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} /></div>
//               </div>
//             </div>

//             {/* 2. Multiple Addresses Book */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd] flex justify-between items-center">
//                 <h2 className="font-bold text-[16px] text-[#0F1111]">2. Your Addresses</h2>
//                 <span className="text-[12px] text-[#565959]">{profileData.addresses.length} saved</span>
//               </div>
//               <div className="p-5 space-y-4">
                
//                 {/* Saved Addresses Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {profileData.addresses.map((addr, idx) => (
//                     <div key={idx} className="border border-[#ddd] rounded-[8px] p-4 bg-[#fdfdfd] flex flex-col justify-between">
//                       <div>
//                         <p className="font-bold text-[13px] mb-1">{profileData.name}</p>
//                         <p className="text-[13px] text-[#111] leading-snug">{addr.street}</p>
//                         <p className="text-[13px] text-[#111] mb-2">{addr.city}, {addr.pincode}</p>
//                       </div>
//                       <div className="flex gap-2 text-[12px] mt-3 border-t border-[#eee] pt-3">
//                         <button type="button" onClick={() => handleRemoveAddress(idx)} className="text-[#007185] hover:text-[#c40000] hover:underline font-bold">Remove</button>
//                       </div>
//                     </div>
//                   ))}

//                   {/* Add New Address Placeholder Card */}
//                   {!showAddressForm && (
//                     <div onClick={() => setShowAddressForm(true)} className="border-2 border-dashed border-[#ddd] rounded-[8px] p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#f7fafa] hover:border-[#a6a6a6] transition-colors min-h-[140px]">
//                       <span className="text-4xl text-[#a6a6a6] mb-1">+</span>
//                       <span className="font-bold text-[14px] text-[#565959]">Add Address</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Add New Address Form Inline */}
//                 {showAddressForm && (
//                   <div className="bg-[#f7fafa] border border-[#ddd] rounded-[8px] p-5 mt-4">
//                     <h3 className="font-bold text-[14px] mb-3 text-[#111]">Add a new shipping address</h3>
//                     <div className="space-y-3">
//                       <div><label className={labelStyles}>Flat, House no., Building, Street</label><input type="text" className={inputStyles} value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} /></div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div><label className={labelStyles}>Town/City</label><input type="text" className={inputStyles} value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} /></div>
//                         <div><label className={labelStyles}>Pincode</label><input type="text" className={inputStyles} value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} /></div>
//                       </div>
//                       <div className="flex gap-3 pt-2">
//                         <button type="button" onClick={handleAddNewAddress} className={`${amzButton} w-auto px-6`}>Add Address</button>
//                         <button type="button" onClick={() => setShowAddressForm(false)} className={`${amzSecondaryButton} w-auto px-6`}>Cancel</button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* 3. Affiliate Payout / Bank Details */}
//             <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
//               <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
//                 <h2 className="font-bold text-[16px] text-[#0F1111]">3.  Payout Details</h2>
//                 <p className="text-[12px] text-[#565959] font-normal">Where should we send your earnings?</p>
//               </div>
//               <div className="p-5 space-y-4">
//                 <div>
//                   <label className={labelStyles}>Primary UPI ID</label>
//                   <input type="text" placeholder="e.g., yourname@okhdfc" className={inputStyles} value={profileData.bankDetails.upiId} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, upiId: e.target.value}})} />
//                 </div>
//                 <div className="border-t border-[#eee] my-2 pt-4">
//                   <label className="block text-[12px] font-bold text-[#565959] mb-3 text-center uppercase tracking-widest">--- OR Direct Bank Transfer ---</label>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div><label className={labelStyles}>Account Holder Name</label><input type="text" className={inputStyles} value={profileData.bankDetails.accountName} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, accountName: e.target.value}})} /></div>
//                   <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={profileData.bankDetails.bankName} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, bankName: e.target.value}})} /></div>
//                   <div><label className={labelStyles}>Account Number</label><input type="text" className={inputStyles} value={profileData.bankDetails.accountNumber} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, accountNumber: e.target.value}})} /></div>
//                   <div><label className={labelStyles}>IFSC Code</label><input type="text" className={inputStyles} value={profileData.bankDetails.ifsc} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, ifsc: e.target.value}})} /></div>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-2">
//               <button type="submit" disabled={savingProfile} className={amzButton}>
//                 {savingProfile ? 'Saving Changes...' : 'Save Changes'}
//               </button>
//             </div>
//           </form>

//         </div>
//       </div>
//     );
//   }

//   // ================= MAIN DASHBOARD VIEW =================
//   const accountCards = [
//     { title: "Your Orders", desc: "Track, return, or buy things again", icon: "📦", link: "/orders" },
//     { title: "Message Center", desc: "View invoices, alerts, and order updates", icon: "✉️", link: "/account?tab=notifications" },
//     { title: "Your Addresses", desc: "Edit addresses for orders and gifts", icon: "📍", link: "/account?tab=profile" },
//     { title: "Wallet Settings", desc: "Manage payout details & bank accounts", icon: "💳", link: "/account?tab=profile" },
//     { title: "Contact Us", desc: "Get help with your orders and products", icon: "🎧", link: "/contact" }
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20">
//       <div className="max-w-[1000px] mx-auto px-4 py-6">
//         <h1 className="text-[28px] font-normal leading-tight mb-6">Your Account</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {accountCards.map((card, index) => (
//             <Link key={index} href={card.link}>
//               <div className="border border-[#ddd] rounded-[8px] p-4 flex gap-4 items-start h-full hover:bg-[#eee] transition-colors cursor-pointer">
//                 <div className="text-4xl opacity-80 mt-1 grayscale">{card.icon}</div>
//                 <div>
//                   <h2 className="text-[17px] font-normal text-[#0F1111] leading-tight">{card.title}</h2>
//                   <p className="text-[13px] text-[#565959] mt-1 leading-snug">{card.desc}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="mt-8 border-t border-[#ddd] pt-6">
//           <div className="border border-[#ddd] rounded-[8px] p-4 flex justify-between items-center bg-[#f7fafa]">
//             <div>
//               <p className="text-[14px] font-bold text-[#0F1111]">Account Actions</p>
//               <p className="text-[13px] text-[#565959]">Sign out of your secure session.</p>
//             </div>
//             <button onClick={logout} className={amzSecondaryButton}>Sign Out</button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // =========================================================================
// // 2. EXPORT WRAPPED IN SUSPENSE (Fixes Vercel useSearchParams build error)
// // =========================================================================
// export default function AccountPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
//       </div>
//     }>
//       <AccountContent />
//     </Suspense>
//   );
// }


// src/app/account/page.jsx
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

// =========================================================================
// 1. MAIN CONTENT COMPONENT (Contains all hooks and logic)
// =========================================================================
function AccountContent() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const [isHydrated, setIsHydrated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);

  // Profile Settings States
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    addresses: [], // Array for multiple addresses
    bankDetails: { upiId: '', accountName: '', accountNumber: '', bankName: '', ifsc: '' }
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // States for adding a new address
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', pincode: '' });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 🚀 FIXED: Scroll to Top on Load or Tab Switch
  useEffect(() => {
    if (!authLoading && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [authLoading, currentTab]);

  // 🚀 BULLETPROOF AUTH CHECK
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      const redirectTimer = setTimeout(() => {
        router.push('/login');
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [user, authLoading, router]);

  // Fetch Notifications & Profile Data
  useEffect(() => {
    const userId = user?.user?._id || user?._id;
    if (!userId) return;

    if (currentTab === 'notifications') {
      const fetchNotifs = async () => {
        setLoadingNotifs(true);
        try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`);
          setNotifications(data);
        } catch (error) {
          console.error("Error fetching notifications");
        } finally {
          setLoadingNotifs(false);
        }
      };
      fetchNotifs();
    }

    if (currentTab === 'profile') {
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
          
          // Fallback compatibility for old single-address schema
          let fetchedAddresses = data.addresses || [];
          if (fetchedAddresses.length === 0 && data.address && data.address.street) {
            fetchedAddresses = [data.address];
          }

          setProfileData({
            name: data.name || '',
            phone: data.phone || '',
            addresses: fetchedAddresses,
            bankDetails: data.bankDetails || { upiId: '', accountName: '', accountNumber: '', bankName: '', ifsc: '' }
          });
        } catch (error) {
          console.error("Error fetching profile");
        }
      };
      fetchProfile();
    }
  }, [currentTab, user]);

  const handleMarkAsRead = async (notifId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}/read`);
      setNotifications(notifications.map(n => n._id === notifId ? { ...n, isRead: true } : n));
    } catch (err) {}
  };

  const handleDeleteNotif = async (notifId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}`);
      setNotifications(notifications.filter(n => n._id !== notifId));
    } catch (err) {}
  };

  // Add & Remove Address Handlers
  const handleAddNewAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
      return alert("Please fill out all address fields.");
    }
    setProfileData({
      ...profileData,
      addresses: [...profileData.addresses, newAddress]
    });
    setNewAddress({ street: '', city: '', pincode: '' }); // Reset form
    setShowAddressForm(false); // Hide form
  };

  const handleRemoveAddress = (indexToRemove) => {
    setProfileData({
      ...profileData,
      addresses: profileData.addresses.filter((_, index) => index !== indexToRemove)
    });
  };

  // Save Profile Handler
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const userId = user?.user?._id || user?._id;
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, profileData);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      alert("Error saving profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  // 🚀 Keep showing the spinner as long as `user` is missing OR `authLoading` is true
  if (!isHydrated || authLoading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
      </div>
    );
  }

  // AMAZON UI STYLES
  const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer";
  const inputStyles = "w-full px-3 py-2 border border-[#a6a6a6] rounded-[3px] text-[13px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-shadow text-[#111]";
  const labelStyles = "block text-[13px] font-bold text-[#111] mb-1";
  const amzButton = "bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-[8px] py-[6px] px-6 text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer text-center";
  const amzSecondaryButton = "bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-[6px] px-6 rounded-[8px] text-[13px] text-[#0F1111] shadow-[0_2px_5px_0_rgba(213,217,217,.5)] transition-colors cursor-pointer text-center";

  // ================= NOTIFICATIONS VIEW =================
  if (currentTab === 'notifications') {
    return (
      <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20">
        <div className="max-w-[1000px] mx-auto px-4 py-6">
          <div className="text-[12px] text-[#565959] mb-4 flex items-center gap-1">
            <Link href="/account" className={amzLink}>Your Account</Link> <span>&gt;</span> <span className="text-[#c45500]">Message Center</span>
          </div>
          <h1 className="text-[28px] font-normal leading-tight mb-6">Your Messages & Notifications</h1>

          <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
            <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className="font-bold text-[16px] text-[#0F1111]">Inbox</h2></div>
            {loadingNotifs ? (
              <div className="p-8 text-center text-[#565959]">Loading messages...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-[#565959]">You have no messages.</div>
            ) : (
              <div className="divide-y divide-[#ddd]">
                {notifications.map((notif) => (
                  <div key={notif._id} className={`p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-colors ${!notif.isRead ? 'bg-[#fdfdfd] border-l-4 border-l-[#e77600]' : 'bg-white'}`}>
                    <div className="flex gap-4 items-start">
                      <div className="text-3xl mt-1 opacity-80">{notif.type === 'invoice' ? '📄' : notif.type === 'cancel' ? '❌' : notif.type === 'success' ? '✅' : '🔔'}</div>
                      <div>
                        <h3 className={`text-[16px] text-[#007185] ${!notif.isRead ? 'font-bold' : 'font-normal'}`}>{notif.title}</h3>
                        <p className="text-[13px] text-[#0F1111] mt-1">{notif.message}</p>
                        <p className="text-[12px] text-[#565959] mt-1">
                          {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-[13px] mt-2 md:mt-0 pl-12 md:pl-0">
                      {!notif.isRead && <button onClick={() => handleMarkAsRead(notif._id)} className={amzLink}>Mark as read</button>}
                      <span className="text-[#ddd] hidden md:block">|</span>
                      <button onClick={() => handleDeleteNotif(notif._id)} className={amzLink}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= PROFILE & SETTINGS VIEW =================
  if (currentTab === 'profile') {
    return (
      <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20">
        <div className="max-w-[800px] mx-auto px-4 py-6">
          <div className="text-[12px] text-[#565959] mb-4 flex items-center gap-1">
            <Link href="/account" className={amzLink}>Your Account</Link> <span>&gt;</span> <span className="text-[#c45500]">Login, Address & Bank Settings</span>
          </div>
          <h1 className="text-[28px] font-normal leading-tight mb-6">Account Settings</h1>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* 1. Personal Details */}
            <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
              <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]"><h2 className="font-bold text-[16px] text-[#0F1111]">1. Personal Information</h2></div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelStyles}>Full Name</label><input type="text" className={inputStyles} value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} required /></div>
                <div><label className={labelStyles}>Mobile Number</label><input type="tel" className={inputStyles} value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} /></div>
              </div>
            </div>

            {/* 2. Multiple Addresses Book */}
            <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
              <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd] flex justify-between items-center">
                <h2 className="font-bold text-[16px] text-[#0F1111]">2. Your Addresses</h2>
                <span className="text-[12px] text-[#565959]">{profileData.addresses.length} saved</span>
              </div>
              <div className="p-5 space-y-4">
                
                {/* Saved Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.addresses.map((addr, idx) => (
                    <div key={idx} className="border border-[#ddd] rounded-[8px] p-4 bg-[#fdfdfd] flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-[13px] mb-1">{profileData.name}</p>
                        <p className="text-[13px] text-[#111] leading-snug">{addr.street}</p>
                        <p className="text-[13px] text-[#111] mb-2">{addr.city}, {addr.pincode}</p>
                      </div>
                      <div className="flex gap-2 text-[12px] mt-3 border-t border-[#eee] pt-3">
                        <button type="button" onClick={() => handleRemoveAddress(idx)} className="text-[#007185] hover:text-[#c40000] hover:underline font-bold">Remove</button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Address Placeholder Card */}
                  {!showAddressForm && (
                    <div onClick={() => setShowAddressForm(true)} className="border-2 border-dashed border-[#ddd] rounded-[8px] p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#f7fafa] hover:border-[#a6a6a6] transition-colors min-h-[140px]">
                      <span className="text-4xl text-[#a6a6a6] mb-1">+</span>
                      <span className="font-bold text-[14px] text-[#565959]">Add Address</span>
                    </div>
                  )}
                </div>

                {/* Add New Address Form Inline */}
                {showAddressForm && (
                  <div className="bg-[#f7fafa] border border-[#ddd] rounded-[8px] p-5 mt-4">
                    <h3 className="font-bold text-[14px] mb-3 text-[#111]">Add a new shipping address</h3>
                    <div className="space-y-3">
                      <div><label className={labelStyles}>Flat, House no., Building, Street</label><input type="text" className={inputStyles} value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelStyles}>Town/City</label><input type="text" className={inputStyles} value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} /></div>
                        <div><label className={labelStyles}>Pincode</label><input type="text" className={inputStyles} value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} /></div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={handleAddNewAddress} className={`${amzButton} w-auto px-6`}>Add Address</button>
                        <button type="button" onClick={() => setShowAddressForm(false)} className={`${amzSecondaryButton} w-auto px-6`}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Affiliate Payout / Bank Details */}
            <div className="border border-[#ddd] rounded-[8px] overflow-hidden">
              <div className="bg-[#f0f2f2] p-4 border-b border-[#ddd]">
                <h2 className="font-bold text-[16px] text-[#0F1111]">3.  Payout Details</h2>
                <p className="text-[12px] text-[#565959] font-normal">Where should we send your earnings?</p>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className={labelStyles}>Primary UPI ID</label>
                  <input type="text" placeholder="e.g., yourname@okhdfc" className={inputStyles} value={profileData.bankDetails.upiId} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, upiId: e.target.value}})} />
                </div>
                <div className="border-t border-[#eee] my-2 pt-4">
                  <label className="block text-[12px] font-bold text-[#565959] mb-3 text-center uppercase tracking-widest">--- OR Direct Bank Transfer ---</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className={labelStyles}>Account Holder Name</label><input type="text" className={inputStyles} value={profileData.bankDetails.accountName} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, accountName: e.target.value}})} /></div>
                  <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={profileData.bankDetails.bankName} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, bankName: e.target.value}})} /></div>
                  <div><label className={labelStyles}>Account Number</label><input type="text" className={inputStyles} value={profileData.bankDetails.accountNumber} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, accountNumber: e.target.value}})} /></div>
                  <div><label className={labelStyles}>IFSC Code</label><input type="text" className={inputStyles} value={profileData.bankDetails.ifsc} onChange={e => setProfileData({...profileData, bankDetails: {...profileData.bankDetails, ifsc: e.target.value}})} /></div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={savingProfile} className={amzButton}>
                {savingProfile ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // ================= MAIN DASHBOARD VIEW =================
  const accountCards = [
    { title: "Your Orders", desc: "Track, return, or buy things again", icon: "📦", link: "/orders" },
    // 🚀 NEW HIGHLIGHTED WALLET TILE
    { title: "Wallet", desc: "View earnings, payouts, and referral stats", icon: "💰", link: "/wallet", highlighted: true },
    { title: "Message Center", desc: "View invoices, alerts, and order updates", icon: "✉️", link: "/account?tab=notifications" },
    { title: "Your Addresses", desc: "Edit addresses for orders and gifts", icon: "📍", link: "/account?tab=profile" },
    { title: "Profile & Bank Settings", desc: "Manage personal and payout details", icon: "⚙️", link: "/account?tab=profile" },
    { title: "Contact Us", desc: "Get help with your orders and products", icon: "🎧", link: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F1111] pb-20">
      <div className="max-w-[1000px] mx-auto px-4 py-6">
        <h1 className="text-[28px] font-normal leading-tight mb-6">Your Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accountCards.map((card, index) => (
            <Link key={index} href={card.link}>
              <div className={`border rounded-[8px] p-4 flex gap-4 items-start h-full transition-colors cursor-pointer ${
                card.highlighted 
                  ? 'border-[#e77600] bg-[#FEF8F2] hover:bg-[#fdf3e8] shadow-[0_0_5px_rgba(231,118,0,0.2)]' 
                  : 'border-[#ddd] hover:bg-[#eee]'
              }`}>
                <div className={`text-4xl mt-1 ${card.highlighted ? '' : 'opacity-80 grayscale'}`}>
                  {card.icon}
                </div>
                <div>
                  <h2 className="text-[17px] font-normal text-[#0F1111] leading-tight flex items-center gap-2">
                    {card.title}
                    {card.highlighted && (
                      <span className="bg-[#B12704] text-white text-[10px] px-1.5 py-0.5 rounded-[3px] uppercase tracking-wider font-bold">
                        Earn
                      </span>
                    )}
                  </h2>
                  <p className="text-[13px] text-[#565959] mt-1 leading-snug">{card.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 border-t border-[#ddd] pt-6">
          <div className="border border-[#ddd] rounded-[8px] p-4 flex justify-between items-center bg-[#f7fafa]">
            <div>
              <p className="text-[14px] font-bold text-[#0F1111]">Account Actions</p>
              <p className="text-[13px] text-[#565959]">Sign out of your secure session.</p>
            </div>
            <button onClick={logout} className={amzSecondaryButton}>Sign Out</button>
          </div>
        </div>

      </div>
    </div>
  );
}

// =========================================================================
// 2. EXPORT WRAPPED IN SUSPENSE (Fixes Vercel useSearchParams build error)
// =========================================================================
export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}