// // src/app/product/[id]/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useCart } from '../../../context/CartContext';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';
// import Link from 'next/link';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const { addToCart, cartCount } = useCart();
//   const { user } = useAuth();
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState('');
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [timeLeft, setTimeLeft] = useState('');

//   // 🚀 REVIEW FORM STATES
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
//         setProduct(data);
//         if (data.images && data.images.length > 0) setMainImage(data.images[0]);
//         if (data.seoTitle) document.title = data.seoTitle;

//         if (data.variants && data.variants.length > 0) {
//           const initialSelections = {};
//           data.variants.forEach(v => {
//             if (v.options && v.options.length > 0) initialSelections[v.name] = v.options[0].name; 
//           });
//           setSelectedVariants(initialSelections);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const now = new Date();
//       let cutoff = new Date();
//       cutoff.setHours(17, 0, 0, 0); 
//       if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1); 
      
//       const diff = cutoff - now;
//       const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       setTimeLeft(`${hrs} hrs ${mins} mins`);
//     };
//     calculateTimeLeft();
//     const timer = setInterval(calculateTimeLeft, 60000); 
//     return () => clearInterval(timer);
//   }, []);

//   if (loading) return <div className="min-h-screen flex items-center justify-center font-bold bg-gray-50">Loading Premium Gadget...</div>;
//   if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-gray-50">Product not found.</div>;

//   const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

//   const renderStars = (ratingValue) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.round(ratingValue) ? "text-orange-400" : "text-gray-300"}>★</span>
//     ));
//   };

//   let extraPrice = 0;
//   if (product.variants) {
//     product.variants.forEach(v => {
//       const selectedOptName = selectedVariants[v.name];
//       const optObj = v.options.find(o => o.name === selectedOptName);
//       if (optObj && optObj.priceModifier) extraPrice += optObj.priceModifier;
//     });
//   }

//   const finalPrice = product.price + extraPrice;
//   const finalDiscountPrice = product.discountPrice ? product.discountPrice + extraPrice : null;
//   const currentActivePrice = finalDiscountPrice || finalPrice;
//   const discountPercentage = finalDiscountPrice ? Math.round(((finalPrice - finalDiscountPrice) / finalPrice) * 100) : 0;

//   const handleVariantSelect = (variantName, optionName) => setSelectedVariants(prev => ({ ...prev, [variantName]: optionName }));
//   const handleAddToCart = () => { addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants }); alert(`${product.name} added to cart!`); };

//   // 🚀 SUBMIT REVIEW HANDLER
//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("You must be logged in to leave a review.");
//     setReviewSubmitLoading(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
//         rating,
//         comment,
//         userId: user.user.id,
//         userName: user.user.name
//       });
//       alert("Thank you! Your review has been submitted and is pending admin approval.");
//       setComment('');
//       setRating(5);
//     } catch (error) {
//       alert("Error submitting review. You might have already reviewed this.");
//     } finally {
//       setReviewSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      
//       <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md sticky top-0 z-50">
//         <Link href="/"><h1 className="text-2xl font-extrabold text-orange-400 tracking-wider">GADGET<span className="text-white">STORE</span></h1></Link>
//         <Link href="/cart"><button className="font-bold flex items-center gap-2 text-lg bg-slate-800 border border-slate-700 px-5 py-2 rounded-lg transition hover:bg-slate-700">🛒 <span className="text-orange-400">Cart ({cartCount})</span></button></Link>
//       </nav>

//       <div className="max-w-[1400px] mx-auto px-4 py-3 text-xs text-gray-500 font-medium">
//         <Link href="/" className="hover:underline">Home</Link> › <span className="capitalize ml-1 hover:underline cursor-pointer">{product.category}</span> › <span className="capitalize ml-1 hover:underline cursor-pointer">{product.brand || 'Gadget'}</span> › <span className="ml-1 text-gray-800">{product.name}</span>
//       </div>

//       <div className="max-w-[1400px] mx-auto p-4 flex flex-col lg:flex-row gap-10 mt-2 relative">
//         <div className="w-full lg:w-5/12 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-fit">
//           {product.images && product.images.length > 1 && (
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] py-1 px-1 custom-scrollbar">
//               {product.images.map((img, index) => (
//                 <button key={index} onMouseEnter={() => setMainImage(img)} onClick={() => setMainImage(img)} className={`h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-orange-500 shadow-md ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300'}`}>
//                   <img src={img} alt="Thumbnail" className="w-full h-full object-contain bg-white" />
//                 </button>
//               ))}
//             </div>
//           )}
//           <div className="bg-white border border-gray-200 rounded-2xl h-[400px] md:h-[500px] flex-1 flex items-center justify-center p-8 shadow-sm relative group cursor-crosshair">
//             <img src={mainImage || 'https://placehold.co/500x500?text=No+Image'} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110" />
//           </div>
//         </div>

//         <div className="w-full lg:w-4/12 flex flex-col">
//           <p className="text-sm font-bold text-blue-600 uppercase mb-1">{product.brand || 'Brand Name'}</p>
//           <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2 leading-snug">{product.name}</h1>

//           <div className="flex items-center gap-2 mb-4 border-b pb-4">
//             <div className="flex text-lg">{renderStars(product.ratings)}</div>
//             <span className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">{product.numOfReviews?.toLocaleString()} ratings</span>
//           </div>

//           <div className="mb-6 mt-2">
//             {finalDiscountPrice ? (
//               <div className="flex items-center gap-3 text-red-600 mb-1">
//                 <span className="text-3xl font-light">-{discountPercentage}%</span>
//                 <span className="text-4xl font-medium text-gray-900"><span className="text-xl relative -top-2">₹</span>{finalDiscountPrice.toLocaleString('en-IN')}</span>
//               </div>
//             ) : (
//                <div className="text-4xl font-medium text-gray-900 mb-1"><span className="text-xl relative -top-2">₹</span>{finalPrice.toLocaleString('en-IN')}</div>
//             )}
//             {finalDiscountPrice && <div className="text-sm text-gray-500 font-medium">M.R.P.: <span className="line-through">₹{finalPrice.toLocaleString('en-IN')}</span></div>}
//             <p className="text-sm font-bold text-gray-900 mt-2">Inclusive of all taxes</p>
//           </div>

//           {product.variants && product.variants.length > 0 && (
//             <div className="mb-6 space-y-5 border-y border-gray-200 py-6">
//               {product.variants.map((variant, idx) => (
//                 <div key={idx}>
//                   <p className="text-sm font-bold text-gray-900 mb-3">{variant.name}: <span className="text-orange-600 font-medium ml-1">{selectedVariants[variant.name]}</span></p>
//                   <div className="flex flex-wrap gap-3">
//                     {variant.options.map((option, optIdx) => {
//                       const isSelected = selectedVariants[variant.name] === option.name;
//                       return (
//                         <button key={optIdx} onClick={() => handleVariantSelect(variant.name, option.name)} className={`px-4 py-2 text-sm font-bold rounded border-2 transition-all ${isSelected ? 'border-orange-500 bg-orange-50 text-orange-800' : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`}>
//                           {option.name} {option.priceModifier > 0 && <span className="text-xs text-gray-400 ml-1 font-normal">(+₹{option.priceModifier})</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex justify-between items-start gap-2 mb-6 border-b border-gray-200 pb-6">
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🚚</div><span className="text-[11px] font-medium text-blue-600">Free Delivery</span></div>
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🔄</div><span className="text-[11px] font-medium text-blue-600">{product.returnPolicy}</span></div>
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🛡️</div><span className="text-[11px] font-medium text-blue-600">{product.warrantyPolicy}</span></div>
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🔒</div><span className="text-[11px] font-medium text-blue-600">Secure Transaction</span></div>
//           </div>
//         </div>

//         <div className="w-full lg:w-3/12">
//           <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md sticky top-24">
//             <span className="text-3xl font-medium text-gray-900 block mb-4"><span className="text-lg relative -top-1">₹</span>{currentActivePrice.toLocaleString('en-IN')}</span>
            
//             <div className="text-sm mb-4 leading-relaxed">
//               <span className="text-blue-600 font-bold">FREE delivery</span> 
//               <span className="font-bold text-gray-900"> {deliveryDate}.</span> Order within <span className="text-green-600">{timeLeft}.</span>
//             </div>

//             <div className="flex items-center gap-2 mb-6">
//               <span className="text-xl">📍</span>
//               <span className="text-xs text-blue-600 hover:underline cursor-pointer">
//                 {user ? `Delivering to ${user.user.name}'s saved address` : "Select delivery location"}
//               </span>
//             </div>

//             <h3 className={`text-xl font-medium mb-6 ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>{product.stock > 0 ? 'In stock' : 'Out of Stock'}</h3>
            
//             <div className="space-y-3 mb-6">
//               <button onClick={handleAddToCart} disabled={product.stock === 0} className={`w-full py-3 rounded-full font-medium text-sm shadow-sm transition-all ${product.stock > 0 ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Add to Cart</button>
//               <Link href="/checkout"><button disabled={product.stock === 0} onClick={handleAddToCart} className={`w-full py-3 rounded-full font-medium text-sm shadow-sm transition-all ${product.stock > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'hidden'}`}>Buy Now</button></Link>
//             </div>
//             <div className="flex items-center gap-3 text-sm text-gray-500 mb-2"><span className="w-24">Ships from</span><span className="text-gray-900 font-medium">GadgetStore</span></div>
//             <div className="flex items-center gap-3 text-sm text-gray-500"><span className="w-24">Sold by</span><span className="text-blue-600 font-medium hover:underline cursor-pointer">{product.brand || 'GadgetStore Retail'}</span></div>
//           </div>
//         </div>
//       </div>

//       <hr className="my-10 border-gray-200 max-w-[1400px] mx-auto" />
      
//       <div className="max-w-[1200px] mx-auto p-4 space-y-12">

//         {product.banners && product.banners.length > 0 && (
//           <div className="w-full space-y-6">
//             <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">From the Manufacturer</h2>
//             <div className="flex flex-col gap-6">
//               {product.banners.map((banner, index) => (
//                 <img key={index} src={banner} alt="Product Promo Banner" className="w-full rounded-xl shadow-sm border border-gray-100 object-cover" />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-16">
//           <div className="w-full lg:w-2/3 space-y-10">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Product Description</h2>
//               <div className="prose max-w-none text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
//                 {product.description}
//               </div>
//             </div>

//             {product.features && product.features.length > 0 && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Key Features</h2>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
//                       <span className="text-orange-500 text-lg">✦</span> 
//                       <span className="text-gray-800 text-sm font-medium">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
            
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Warranty & Support</h2>
//               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
//                 <p className="text-sm text-gray-800 leading-relaxed">
//                   <span className="font-bold text-blue-900">Warranty Details:</span> {product.warrantyPolicy || '1 Year Manufacturer Warranty'} from the date of purchase. <br/><br/>
//                   For claims or support, please contact the {product.brand || 'manufacturer'} authorized service center nearest to you. Keep your GadgetStore Invoice handy as proof of purchase.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {product.specs && product.specs.length > 0 && (
//             <div className="w-full lg:w-1/3">
//               <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Technical Details</h2>
//               <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//                 <table className="w-full text-left text-sm">
//                   <tbody className="divide-y divide-gray-200">
//                     <tr className="bg-gray-50">
//                       <th className="py-4 px-4 font-bold text-gray-700 w-1/2 border-r border-gray-200">Brand</th>
//                       <td className="py-4 px-4 text-gray-800">{product.brand || 'Generic'}</td>
//                     </tr>
//                     {product.specs.map((spec, index) => (
//                       <tr key={index} className={index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'}>
//                         <th className="py-4 px-4 font-bold text-gray-700 w-1/2 border-r border-gray-200">{spec.name}</th>
//                         <td className="py-4 px-4 text-gray-800">{spec.value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* 🚀 CUSTOMER REVIEWS SECTION */}
//         <div className="w-full mt-16 border-t border-gray-200 pt-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          
//           <div className="flex flex-col md:flex-row gap-12">
            
//             {/* Left: Review List */}
//             <div className="w-full md:w-2/3 space-y-6">
//               {product.reviews && product.reviews.filter(r => r.isApproved).length > 0 ? (
//                 product.reviews.filter(r => r.isApproved).map((review, idx) => (
//                   <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
//                     <div className="flex items-center gap-3 mb-2">
//                       <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
//                         {review.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <p className="font-bold text-gray-900">{review.name}</p>
//                         <div className="text-orange-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
//                       </div>
//                     </div>
//                     <p className="text-gray-700 text-sm leading-relaxed mt-3">"{review.comment}"</p>
//                     <p className="text-xs text-gray-400 mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic bg-gray-50 p-8 rounded-xl border border-gray-100 text-center">No reviews yet. Be the first to review this product!</p>
//               )}
//             </div>

//             {/* Right: Write a Review Form */}
//             <div className="w-full md:w-1/3">
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
//                 {user ? (
//                   <form onSubmit={submitReview} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
//                       <select 
//                         value={rating} 
//                         onChange={(e) => setRating(Number(e.target.value))}
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
//                       >
//                         <option value="5">5 - Excellent</option>
//                         <option value="4">4 - Very Good</option>
//                         <option value="3">3 - Average</option>
//                         <option value="2">2 - Poor</option>
//                         <option value="1">1 - Terrible</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
//                       <textarea 
//                         required 
//                         value={comment} 
//                         onChange={(e) => setComment(e.target.value)} 
//                         className="w-full p-3 border border-gray-300 rounded-lg h-24 outline-none focus:ring-2 focus:ring-orange-500" 
//                         placeholder="What did you like or dislike?"
//                       ></textarea>
//                     </div>
//                     <button 
//                       type="submit" 
//                       disabled={reviewSubmitLoading}
//                       className={`w-full py-3 rounded-lg font-bold text-white transition ${reviewSubmitLoading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-slate-800'}`}
//                     >
//                       {reviewSubmitLoading ? 'Submitting...' : 'Submit Review'}
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-100">
//                     <p className="text-sm text-orange-800 font-medium mb-3">Please log in to write a review.</p>
//                     <Link href="/login"><button className="bg-orange-500 text-white px-6 py-2 rounded font-bold shadow hover:bg-orange-600">Login</button></Link>
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// // src/app/product/[id]/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useCart } from '../../../context/CartContext';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';
// import Link from 'next/link';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const { addToCart, cartCount } = useCart();
//   const { user } = useAuth();
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState('');
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [timeLeft, setTimeLeft] = useState('');

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
//         setProduct(data);
//         if (data.images && data.images.length > 0) setMainImage(data.images[0]);
//         if (data.seoTitle) document.title = data.seoTitle;

//         if (data.variants && data.variants.length > 0) {
//           const initialSelections = {};
//           data.variants.forEach(v => {
//             if (v.options && v.options.length > 0) initialSelections[v.name] = v.options[0].name; 
//           });
//           setSelectedVariants(initialSelections);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const now = new Date();
//       let cutoff = new Date();
//       cutoff.setHours(17, 0, 0, 0); 
//       if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1); 
      
//       const diff = cutoff - now;
//       const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       setTimeLeft(`${hrs} hrs ${mins} mins`);
//     };
//     calculateTimeLeft();
//     const timer = setInterval(calculateTimeLeft, 60000); 
//     return () => clearInterval(timer);
//   }, []);

//   if (loading) return <div className="min-h-screen flex items-center justify-center font-bold bg-gray-50">Loading Premium Gadget...</div>;
//   if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-gray-50">Product not found.</div>;

//   // 🚀 DYNAMIC DELIVERY DATE (3 Days from now)
//   const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

//   // 🚀 DYNAMIC STARS
//   const renderStars = (ratingValue) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.round(ratingValue) ? "text-orange-400" : "text-gray-300"}>★</span>
//     ));
//   };

//   let extraPrice = 0;
//   if (product.variants) {
//     product.variants.forEach(v => {
//       const selectedOptName = selectedVariants[v.name];
//       const optObj = v.options.find(o => o.name === selectedOptName);
//       if (optObj && optObj.priceModifier) extraPrice += optObj.priceModifier;
//     });
//   }

//   const finalPrice = product.price + extraPrice;
//   const finalDiscountPrice = product.discountPrice ? product.discountPrice + extraPrice : null;
//   const currentActivePrice = finalDiscountPrice || finalPrice;
//   const discountPercentage = finalDiscountPrice ? Math.round(((finalPrice - finalDiscountPrice) / finalPrice) * 100) : 0;

//   const handleVariantSelect = (variantName, optionName) => setSelectedVariants(prev => ({ ...prev, [variantName]: optionName }));
//   const handleAddToCart = () => { addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants }); alert(`${product.name} added to cart!`); };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("You must be logged in to leave a review.");
//     setReviewSubmitLoading(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
//         rating, comment, userId: user.id, userName: user.name
//       });
//       alert("Thank you! Your review has been submitted and is pending admin approval.");
//       setComment(''); setRating(5);
//     } catch (error) {
//       alert("Error submitting review.");
//     } finally {
//       setReviewSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
//       <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md sticky top-0 z-50">
//         <Link href="/"><h1 className="text-2xl font-extrabold text-orange-400 tracking-wider">GADGET<span className="text-white">STORE</span></h1></Link>
//         <Link href="/cart"><button className="font-bold flex items-center gap-2 text-lg bg-slate-800 border border-slate-700 px-5 py-2 rounded-lg transition hover:bg-slate-700">🛒 <span className="text-orange-400">Cart ({cartCount})</span></button></Link>
//       </nav>

//       <div className="max-w-[1400px] mx-auto px-4 py-3 text-xs text-gray-500 font-medium">
//         <Link href="/" className="hover:underline">Home</Link> › <span className="capitalize ml-1 hover:underline cursor-pointer">{product.category}</span> › <span className="capitalize ml-1 hover:underline cursor-pointer">{product.brand || 'Gadget'}</span> › <span className="ml-1 text-gray-800">{product.name}</span>
//       </div>

//       <div className="max-w-[1400px] mx-auto p-4 flex flex-col lg:flex-row gap-10 mt-2 relative">
//         <div className="w-full lg:w-5/12 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-fit">
//           {product.images && product.images.length > 1 && (
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] py-1 px-1 custom-scrollbar">
//               {product.images.map((img, index) => (
//                 <button key={index} onMouseEnter={() => setMainImage(img)} onClick={() => setMainImage(img)} className={`h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-orange-500 shadow-md ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300'}`}>
//                   <img src={img} alt="Thumbnail" className="w-full h-full object-contain bg-white" />
//                 </button>
//               ))}
//             </div>
//           )}
//           <div className="bg-white border border-gray-200 rounded-2xl h-[400px] md:h-[500px] flex-1 flex items-center justify-center p-8 shadow-sm relative group cursor-crosshair">
//             <img src={mainImage || 'https://placehold.co/500x500?text=No+Image'} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110" />
//           </div>
//         </div>

//         <div className="w-full lg:w-4/12 flex flex-col">
//           <p className="text-sm font-bold text-blue-600 uppercase mb-1">{product.brand || 'Brand Name'}</p>
//           <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2 leading-snug">{product.name}</h1>

//           {/* 🚀 DYNAMIC REVIEWS (No longer hardcoded!) */}
//           <div className="flex items-center gap-2 mb-4 border-b pb-4">
//             <div className="flex text-lg">{renderStars(product.ratings)}</div>
//             <span className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">{product.numOfReviews?.toLocaleString()} ratings</span>
//           </div>

//           <div className="mb-6 mt-2">
//             {finalDiscountPrice ? (
//               <div className="flex items-center gap-3 text-red-600 mb-1">
//                 <span className="text-3xl font-light">-{discountPercentage}%</span>
//                 <span className="text-4xl font-medium text-gray-900"><span className="text-xl relative -top-2">₹</span>{finalDiscountPrice.toLocaleString('en-IN')}</span>
//               </div>
//             ) : (
//                <div className="text-4xl font-medium text-gray-900 mb-1"><span className="text-xl relative -top-2">₹</span>{finalPrice.toLocaleString('en-IN')}</div>
//             )}
//             {finalDiscountPrice && <div className="text-sm text-gray-500 font-medium">M.R.P.: <span className="line-through">₹{finalPrice.toLocaleString('en-IN')}</span></div>}
//             <p className="text-sm font-bold text-gray-900 mt-2">Inclusive of all taxes</p>
//           </div>

//           {product.variants && product.variants.length > 0 && (
//             <div className="mb-6 space-y-5 border-y border-gray-200 py-6">
//               {product.variants.map((variant, idx) => (
//                 <div key={idx}>
//                   <p className="text-sm font-bold text-gray-900 mb-3">{variant.name}: <span className="text-orange-600 font-medium ml-1">{selectedVariants[variant.name]}</span></p>
//                   <div className="flex flex-wrap gap-3">
//                     {variant.options.map((option, optIdx) => {
//                       const isSelected = selectedVariants[variant.name] === option.name;
//                       return (
//                         <button key={optIdx} onClick={() => handleVariantSelect(variant.name, option.name)} className={`px-4 py-2 text-sm font-bold rounded border-2 transition-all ${isSelected ? 'border-orange-500 bg-orange-50 text-orange-800' : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`}>
//                           {option.name} {option.priceModifier > 0 && <span className="text-xs text-gray-400 ml-1 font-normal">(+₹{option.priceModifier})</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* 🚀 DYNAMIC BADGES (No longer hardcoded!) */}
//           <div className="flex justify-between items-start gap-2 mb-6 border-b border-gray-200 pb-6">
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🚚</div><span className="text-[11px] font-medium text-blue-600">Free Delivery</span></div>
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🔄</div><span className="text-[11px] font-medium text-blue-600">{product.returnPolicy || '7 Days Replacement'}</span></div>
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🛡️</div><span className="text-[11px] font-medium text-blue-600">{product.warrantyPolicy || '1 Year Warranty'}</span></div>
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🔒</div><span className="text-[11px] font-medium text-blue-600">Secure Transaction</span></div>
//           </div>
//         </div>

//         <div className="w-full lg:w-3/12">
//           <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md sticky top-24">
//             <span className="text-3xl font-medium text-gray-900 block mb-4"><span className="text-lg relative -top-1">₹</span>{currentActivePrice.toLocaleString('en-IN')}</span>
            
//             {/* 🚀 DYNAMIC DELIVERY TEXT (No longer Mumbai!) */}
//             <div className="text-sm mb-4 leading-relaxed">
//               <span className="text-blue-600 font-bold">FREE delivery</span> 
//               <span className="font-bold text-gray-900"> {deliveryDate}.</span> Order within <span className="text-green-600">{timeLeft}.</span>
//             </div>

//             <div className="flex items-center gap-2 mb-6">
//               <span className="text-xl">📍</span>
//               <span className="text-xs text-blue-600 hover:underline cursor-pointer">
//                 {user ? `Delivering to ${user.name}'s saved address` : "Select delivery location"}
//               </span>
//             </div>

//             <h3 className={`text-xl font-medium mb-6 ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>{product.stock > 0 ? 'In stock' : 'Out of Stock'}</h3>
            
//             <div className="space-y-3 mb-6">
//               <button onClick={handleAddToCart} disabled={product.stock === 0} className={`w-full py-3 rounded-full font-medium text-sm shadow-sm transition-all ${product.stock > 0 ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Add to Cart</button>
//               <Link href="/checkout"><button disabled={product.stock === 0} onClick={handleAddToCart} className={`w-full py-3 rounded-full font-medium text-sm shadow-sm transition-all ${product.stock > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'hidden'}`}>Buy Now</button></Link>
//             </div>
//             <div className="flex items-center gap-3 text-sm text-gray-500 mb-2"><span className="w-24">Ships from</span><span className="text-gray-900 font-medium">GadgetStore</span></div>
//             <div className="flex items-center gap-3 text-sm text-gray-500"><span className="w-24">Sold by</span><span className="text-blue-600 font-medium hover:underline cursor-pointer">{product.brand || 'GadgetStore Retail'}</span></div>
//           </div>
//         </div>
//       </div>

//       <hr className="my-10 border-gray-200 max-w-[1400px] mx-auto" />
      
//       <div className="max-w-[1200px] mx-auto p-4 space-y-12">
//         {product.banners && product.banners.length > 0 && (
//           <div className="w-full space-y-6">
//             <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">From the Manufacturer</h2>
//             <div className="flex flex-col gap-6">
//               {product.banners.map((banner, index) => (
//                 <img key={index} src={banner} alt="Promo Banner" className="w-full rounded-xl shadow-sm border border-gray-100 object-cover" />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-16">
//           <div className="w-full lg:w-2/3 space-y-10">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Product Description</h2>
//               <div className="prose max-w-none text-gray-700 text-base leading-relaxed whitespace-pre-wrap">{product.description}</div>
//             </div>

//             {product.features && product.features.length > 0 && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Key Features</h2>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
//                       <span className="text-orange-500 text-lg">✦</span> <span className="text-gray-800 text-sm font-medium">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
            
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Warranty & Support</h2>
//               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
//                 <p className="text-sm text-gray-800 leading-relaxed">
//                   <span className="font-bold text-blue-900">Warranty Details:</span> {product.warrantyPolicy || '1 Year Manufacturer Warranty'} from the date of purchase. <br/><br/>
//                   For claims or support, please contact the {product.brand || 'manufacturer'} authorized service center nearest to you.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {product.specs && product.specs.length > 0 && (
//             <div className="w-full lg:w-1/3">
//               <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Technical Details</h2>
//               <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//                 <table className="w-full text-left text-sm">
//                   <tbody className="divide-y divide-gray-200">
//                     <tr className="bg-gray-50"><th className="py-4 px-4 font-bold text-gray-700 w-1/2 border-r border-gray-200">Brand</th><td className="py-4 px-4 text-gray-800">{product.brand || 'Generic'}</td></tr>
//                     {product.specs.map((spec, index) => (
//                       <tr key={index} className={index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'}>
//                         <th className="py-4 px-4 font-bold text-gray-700 w-1/2 border-r border-gray-200">{spec.name}</th><td className="py-4 px-4 text-gray-800">{spec.value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* REVIEWS SECTION */}
//         <div className="w-full mt-16 border-t border-gray-200 pt-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
//           <div className="flex flex-col md:flex-row gap-12">
//             <div className="w-full md:w-2/3 space-y-6">
//               {product.reviews && product.reviews.filter(r => r.isApproved).length > 0 ? (
//                 product.reviews.filter(r => r.isApproved).map((review, idx) => (
//                   <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
//                     <div className="flex items-center gap-3 mb-2">
//                       <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-lg">{review.name.charAt(0).toUpperCase()}</div>
//                       <div><p className="font-bold text-gray-900">{review.name}</p><div className="text-orange-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div></div>
//                     </div>
//                     <p className="text-gray-700 text-sm leading-relaxed mt-3">"{review.comment}"</p>
//                     <p className="text-xs text-gray-400 mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic bg-gray-50 p-8 rounded-xl border border-gray-100 text-center">No reviews yet. Be the first to review this product!</p>
//               )}
//             </div>

//             <div className="w-full md:w-1/3">
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
//                 {user ? (
//                   <form onSubmit={submitReview} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
//                       <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500">
//                         <option value="5">5 - Excellent</option><option value="4">4 - Very Good</option><option value="3">3 - Average</option><option value="2">2 - Poor</option><option value="1">1 - Terrible</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
//                       <textarea required value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg h-24 outline-none focus:ring-2 focus:ring-orange-500" placeholder="What did you like or dislike?"></textarea>
//                     </div>
//                     <button type="submit" disabled={reviewSubmitLoading} className={`w-full py-3 rounded-lg font-bold text-white transition ${reviewSubmitLoading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-slate-800'}`}>
//                       {reviewSubmitLoading ? 'Submitting...' : 'Submit Review'}
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-100">
//                     <p className="text-sm text-orange-800 font-medium mb-3">Please log in to write a review.</p>
//                     <Link href="/login"><button className="bg-orange-500 text-white px-6 py-2 rounded font-bold shadow hover:bg-orange-600">Login</button></Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// src/app/product/[id]/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, cartCount } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [timeLeft, setTimeLeft] = useState('');

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

  // 🚀 HELPER FUNCTION TO GET CORRECT IMAGE URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/500x500?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    
    // Remove /api from the URL to get the base Render URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
    return `${baseUrl}/${imagePath}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        setProduct(data);
        if (data.images && data.images.length > 0) setMainImage(data.images[0]);
        if (data.seoTitle) document.title = data.seoTitle;

        if (data.variants && data.variants.length > 0) {
          const initialSelections = {};
          data.variants.forEach(v => {
            if (v.options && v.options.length > 0) initialSelections[v.name] = v.options[0].name; 
          });
          setSelectedVariants(initialSelections);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let cutoff = new Date();
      cutoff.setHours(17, 0, 0, 0); 
      if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1); 
      
      const diff = cutoff - now;
      const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hrs} hrs ${mins} mins`);
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); 
    return () => clearInterval(timer);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold bg-gray-50">Loading Premium Gadget...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-gray-50">Product not found.</div>;

  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const renderStars = (ratingValue) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(ratingValue) ? "text-orange-400" : "text-gray-300"}>★</span>
    ));
  };

  let extraPrice = 0;
  if (product.variants) {
    product.variants.forEach(v => {
      const selectedOptName = selectedVariants[v.name];
      const optObj = v.options.find(o => o.name === selectedOptName);
      if (optObj && optObj.priceModifier) extraPrice += optObj.priceModifier;
    });
  }

  const finalPrice = product.price + extraPrice;
  const finalDiscountPrice = product.discountPrice ? product.discountPrice + extraPrice : null;
  const currentActivePrice = finalDiscountPrice || finalPrice;
  const discountPercentage = finalDiscountPrice ? Math.round(((finalPrice - finalDiscountPrice) / finalPrice) * 100) : 0;

  const handleVariantSelect = (variantName, optionName) => setSelectedVariants(prev => ({ ...prev, [variantName]: optionName }));
  const handleAddToCart = () => { addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants }); alert(`${product.name} added to cart!`); };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to leave a review.");
    setReviewSubmitLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
        rating, comment, userId: user.id, userName: user.name
      });
      alert("Thank you! Your review has been submitted and is pending admin approval.");
      setComment(''); setRating(5);
    } catch (error) {
      alert("Error submitting review.");
    } finally {
      setReviewSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      <nav className="bg-slate-900 p-4 text-white flex justify-between items-center shadow-md sticky top-0 z-50">
        <Link href="/"><h1 className="text-2xl font-extrabold text-orange-400 tracking-wider">GADGET<span className="text-white">STORE</span></h1></Link>
        <Link href="/cart"><button className="font-bold flex items-center gap-2 text-lg bg-slate-800 border border-slate-700 px-5 py-2 rounded-lg transition hover:bg-slate-700">🛒 <span className="text-orange-400">Cart ({cartCount})</span></button></Link>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 py-3 text-xs text-gray-500 font-medium">
        <Link href="/" className="hover:underline">Home</Link> › <span className="capitalize ml-1 hover:underline cursor-pointer">{product.category}</span> › <span className="capitalize ml-1 hover:underline cursor-pointer">{product.brand || 'Gadget'}</span> › <span className="ml-1 text-gray-800">{product.name}</span>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 flex flex-col lg:flex-row gap-10 mt-2 relative">
        <div className="w-full lg:w-5/12 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-fit">
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] py-1 px-1 custom-scrollbar">
              {product.images.map((img, index) => (
                <button key={index} onMouseEnter={() => setMainImage(img)} onClick={() => setMainImage(img)} className={`h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-orange-500 shadow-md ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300'}`}>
                  {/* 🚀 FIXED THUMBNAIL URL */}
                  <img src={getImageUrl(img)} alt="Thumbnail" className="w-full h-full object-contain bg-white" />
                </button>
              ))}
            </div>
          )}
          <div className="bg-white border border-gray-200 rounded-2xl h-[400px] md:h-[500px] flex-1 flex items-center justify-center p-8 shadow-sm relative group cursor-crosshair">
            {/* 🚀 FIXED MAIN IMAGE URL */}
            <img src={getImageUrl(mainImage)} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        <div className="w-full lg:w-4/12 flex flex-col">
          <p className="text-sm font-bold text-blue-600 uppercase mb-1">{product.brand || 'Brand Name'}</p>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2 leading-snug">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4 border-b pb-4">
            <div className="flex text-lg">{renderStars(product.ratings)}</div>
            <span className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">{product.numOfReviews?.toLocaleString()} ratings</span>
          </div>

          <div className="mb-6 mt-2">
            {finalDiscountPrice ? (
              <div className="flex items-center gap-3 text-red-600 mb-1">
                <span className="text-3xl font-light">-{discountPercentage}%</span>
                <span className="text-4xl font-medium text-gray-900"><span className="text-xl relative -top-2">₹</span>{finalDiscountPrice.toLocaleString('en-IN')}</span>
              </div>
            ) : (
                <div className="text-4xl font-medium text-gray-900 mb-1"><span className="text-xl relative -top-2">₹</span>{finalPrice.toLocaleString('en-IN')}</div>
            )}
            {finalDiscountPrice && <div className="text-sm text-gray-500 font-medium">M.R.P.: <span className="line-through">₹{finalPrice.toLocaleString('en-IN')}</span></div>}
            <p className="text-sm font-bold text-gray-900 mt-2">Inclusive of all taxes</p>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-6 space-y-5 border-y border-gray-200 py-6">
              {product.variants.map((variant, idx) => (
                <div key={idx}>
                  <p className="text-sm font-bold text-gray-900 mb-3">{variant.name}: <span className="text-orange-600 font-medium ml-1">{selectedVariants[variant.name]}</span></p>
                  <div className="flex flex-wrap gap-3">
                    {variant.options.map((option, optIdx) => {
                      const isSelected = selectedVariants[variant.name] === option.name;
                      return (
                        <button key={optIdx} onClick={() => handleVariantSelect(variant.name, option.name)} className={`px-4 py-2 text-sm font-bold rounded border-2 transition-all ${isSelected ? 'border-orange-500 bg-orange-50 text-orange-800' : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`}>
                          {option.name} {option.priceModifier > 0 && <span className="text-xs text-gray-400 ml-1 font-normal">(+₹{option.priceModifier})</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-start gap-2 mb-6 border-b border-gray-200 pb-6">
            <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🚚</div><span className="text-[11px] font-medium text-blue-600">Free Delivery</span></div>
            <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🔄</div><span className="text-[11px] font-medium text-blue-600">{product.returnPolicy || '7 Days Replacement'}</span></div>
            <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🛡️</div><span className="text-[11px] font-medium text-blue-600">{product.warrantyPolicy || '1 Year Warranty'}</span></div>
            <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🔒</div><span className="text-[11px] font-medium text-blue-600">Secure Transaction</span></div>
          </div>
        </div>

        <div className="w-full lg:w-3/12">
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md sticky top-24">
            <span className="text-3xl font-medium text-gray-900 block mb-4"><span className="text-lg relative -top-1">₹</span>{currentActivePrice.toLocaleString('en-IN')}</span>
            
            <div className="text-sm mb-4 leading-relaxed">
              <span className="text-blue-600 font-bold">FREE delivery</span> 
              <span className="font-bold text-gray-900"> {deliveryDate}.</span> Order within <span className="text-green-600">{timeLeft}.</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">📍</span>
              <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                {user ? `Delivering to ${user.name || 'User'}'s saved address` : "Select delivery location"}
              </span>
            </div>

            <h3 className={`text-xl font-medium mb-6 ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>{product.stock > 0 ? 'In stock' : 'Out of Stock'}</h3>
            
            <div className="space-y-3 mb-6">
              <button onClick={handleAddToCart} disabled={product.stock === 0} className={`w-full py-3 rounded-full font-medium text-sm shadow-sm transition-all ${product.stock > 0 ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Add to Cart</button>
              <Link href="/checkout"><button disabled={product.stock === 0} onClick={handleAddToCart} className={`w-full py-3 rounded-full font-medium text-sm shadow-sm transition-all ${product.stock > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'hidden'}`}>Buy Now</button></Link>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2"><span className="w-24">Ships from</span><span className="text-gray-900 font-medium">GadgetStore</span></div>
            <div className="flex items-center gap-3 text-sm text-gray-500"><span className="w-24">Sold by</span><span className="text-blue-600 font-medium hover:underline cursor-pointer">{product.brand || 'GadgetStore Retail'}</span></div>
          </div>
        </div>
      </div>

      <hr className="my-10 border-gray-200 max-w-[1400px] mx-auto" />
      
      <div className="max-w-[1200px] mx-auto p-4 space-y-12">
        {product.banners && product.banners.length > 0 && (
          <div className="w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">From the Manufacturer</h2>
            <div className="flex flex-col gap-6">
              {product.banners.map((banner, index) => (
                /* 🚀 FIXED BANNER IMAGE URL */
                <img key={index} src={getImageUrl(banner)} alt="Promo Banner" className="w-full rounded-xl shadow-sm border border-gray-100 object-cover" />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-2/3 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Product Description</h2>
              <div className="prose max-w-none text-gray-700 text-base leading-relaxed whitespace-pre-wrap">{product.description}</div>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <span className="text-orange-500 text-lg">✦</span> <span className="text-gray-800 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Warranty & Support</h2>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-bold text-blue-900">Warranty Details:</span> {product.warrantyPolicy || '1 Year Manufacturer Warranty'} from the date of purchase. <br/><br/>
                  For claims or support, please contact the {product.brand || 'manufacturer'} authorized service center nearest to you.
                </p>
              </div>
            </div>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="w-full lg:w-1/3">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-6">Technical Details</h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50"><th className="py-4 px-4 font-bold text-gray-700 w-1/2 border-r border-gray-200">Brand</th><td className="py-4 px-4 text-gray-800">{product.brand || 'Generic'}</td></tr>
                    {product.specs.map((spec, index) => (
                      <tr key={index} className={index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'}>
                        <th className="py-4 px-4 font-bold text-gray-700 w-1/2 border-r border-gray-200">{spec.name}</th><td className="py-4 px-4 text-gray-800">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="w-full mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-2/3 space-y-6">
              {product.reviews && product.reviews.filter(r => r.isApproved).length > 0 ? (
                product.reviews.filter(r => r.isApproved).map((review, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-lg">{review.name.charAt(0).toUpperCase()}</div>
                      <div><p className="font-bold text-gray-900">{review.name}</p><div className="text-orange-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div></div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mt-3">"{review.comment}"</p>
                    <p className="text-xs text-gray-400 mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic bg-gray-50 p-8 rounded-xl border border-gray-100 text-center">No reviews yet. Be the first to review this product!</p>
              )}
            </div>

            <div className="w-full md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
                {user ? (
                  <form onSubmit={submitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="5">5 - Excellent</option><option value="4">4 - Very Good</option><option value="3">3 - Average</option><option value="2">2 - Poor</option><option value="1">1 - Terrible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Review</label>
                      <textarea required value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg h-24 outline-none focus:ring-2 focus:ring-orange-500" placeholder="What did you like or dislike?"></textarea>
                    </div>
                    <button type="submit" disabled={reviewSubmitLoading} className={`w-full py-3 rounded-lg font-bold text-white transition ${reviewSubmitLoading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-slate-800'}`}>
                      {reviewSubmitLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-100">
                    <p className="text-sm text-orange-800 font-medium mb-3">Please log in to write a review.</p>
                    <Link href="/login"><button className="bg-orange-500 text-white px-6 py-2 rounded font-bold shadow hover:bg-orange-600">Login</button></Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}