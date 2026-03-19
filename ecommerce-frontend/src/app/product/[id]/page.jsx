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

//   // 🚀 HELPER FUNCTION TO GET CORRECT IMAGE URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/500x500?text=No+Image';
//     if (imagePath.startsWith('http')) return imagePath;
    
//     // Remove /api from the URL to get the base Render URL
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
//     return `${baseUrl}/${imagePath}`;
//   };

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

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("You must be logged in to leave a review.");
    
//     // 🚀 THE FIX: Safely extract the ID and Name no matter how the object is structured
//     const actualUserId = user?._id || user?.user?._id || user?.userId || user?.id;
//     const actualUserName = user?.name || user?.user?.name || 'Customer';

//     if (!actualUserId) {
//       console.error("User Object:", user);
//       return alert("Authentication error: Could not find your User ID. Try logging out and back in.");
//     }

//     setReviewSubmitLoading(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
//         rating, 
//         comment, 
//         userId: actualUserId, 
//         userName: actualUserName
//       });
      
//       alert("Thank you! Your review has been submitted and is pending admin approval.");
//       setComment(''); 
//       setRating(5);
//     } catch (error) {
//       // 🚀 BETTER ERROR LOGGING: This will tell us EXACTLY what the backend didn't like!
//       console.error("Review Error Details:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Error submitting review.");
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
//                   {/* 🚀 FIXED THUMBNAIL URL */}
//                   <img src={getImageUrl(img)} alt="Thumbnail" className="w-full h-full object-contain bg-white" />
//                 </button>
//               ))}
//             </div>
//           )}
//           <div className="bg-white border border-gray-200 rounded-2xl h-[400px] md:h-[500px] flex-1 flex items-center justify-center p-8 shadow-sm relative group cursor-crosshair">
//             {/* 🚀 FIXED MAIN IMAGE URL */}
//             <img src={getImageUrl(mainImage)} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110" />
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
//                 <div className="text-4xl font-medium text-gray-900 mb-1"><span className="text-xl relative -top-2">₹</span>{finalPrice.toLocaleString('en-IN')}</div>
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
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🔄</div><span className="text-[11px] font-medium text-blue-600">{product.returnPolicy || '7 Days Replacement'}</span></div>
//             <div className="flex flex-col items-center text-center max-w-[80px]"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm text-xl">🛡️</div><span className="text-[11px] font-medium text-blue-600">{product.warrantyPolicy || '1 Year Warranty'}</span></div>
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
//                 {user ? `Delivering to ${user.name || 'User'}'s saved address` : "Select delivery location"}
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
//                 /* 🚀 FIXED BANNER IMAGE URL */
//                 <img key={index} src={getImageUrl(banner)} alt="Promo Banner" className="w-full rounded-xl shadow-sm border border-gray-100 object-cover" />
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




























// // src/app/product/[id]/page.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useCart } from '../../../context/CartContext';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';
// import Link from 'next/link';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
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

//   // 🚀 HELPER FUNCTION TO GET CORRECT IMAGE URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/500x500?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

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

//   if (loading) return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 space-y-4">
//       <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-orange-500"></div>
//       <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Premium Gadget...</p>
//     </div>
//   );
  
//   if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-[#F8FAFC] text-2xl text-slate-800">Product not found.</div>;

//   const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

//   const renderStars = (ratingValue) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.round(ratingValue) ? "text-orange-400" : "text-slate-200"}>★</span>
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
  
//   const handleAddToCart = () => { 
//     addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants }); 
//     alert(`${product.name} added to cart!`); 
//   };

//   const handleBuyNow = () => {
//     addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants });
//     router.push('/checkout');
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("You must be logged in to leave a review.");
    
//     const actualUserId = user?._id || user?.user?._id || user?.userId || user?.id;
//     const actualUserName = user?.name || user?.user?.name || 'Customer';

//     if (!actualUserId) {
//       console.error("User Object:", user);
//       return alert("Authentication error: Could not find your User ID. Try logging out and back in.");
//     }

//     setReviewSubmitLoading(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
//         rating, comment, userId: actualUserId, userName: actualUserName
//       });
//       alert("Thank you! Your review has been submitted and is pending admin approval.");
//       setComment(''); setRating(5);
//     } catch (error) {
//       console.error("Review Error Details:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Error submitting review.");
//     } finally {
//       setReviewSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 selection:bg-orange-200">
      
//       {/* PREMIUM NAVBAR */}
      

//       {/* BREADCRUMBS */}
//       <div className="max-w-[1600px] mx-auto px-6 py-5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
//         <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link> 
//         <span className="mx-2">›</span> 
//         <span className="hover:text-orange-500 transition-colors cursor-pointer">{product.category}</span> 
//         <span className="mx-2">›</span> 
//         <span className="hover:text-orange-500 transition-colors cursor-pointer">{product.brand || 'Gadget'}</span> 
//         <span className="mx-2">›</span> 
//         <span className="text-slate-800">{product.name}</span>
//       </div>

//       {/* MAIN PRODUCT SECTION */}
//       <div className="max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
//         {/* LEFT: Image Gallery */}
//         <div className="w-full lg:w-5/12 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-32 h-fit">
//           {product.images && product.images.length > 1 && (
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] p-1 custom-scrollbar">
//               {product.images.map((img, index) => (
//                 <button 
//                   key={index} 
//                   onMouseEnter={() => setMainImage(img)} 
//                   onClick={() => setMainImage(img)} 
//                   className={`h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${mainImage === img ? 'border-orange-500 shadow-md ring-2 ring-orange-500/20' : 'border-slate-200 hover:border-orange-300 opacity-70 hover:opacity-100'}`}
//                 >
//                   <img src={getImageUrl(img)} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply p-1" />
//                 </button>
//               ))}
//             </div>
//           )}
//           <div className="bg-white border border-slate-100 rounded-3xl h-[400px] md:h-[550px] flex-1 flex items-center justify-center p-8 shadow-sm relative group cursor-crosshair overflow-hidden">
//             {product.discountPrice && (
//               <span className="absolute top-6 left-6 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md z-10">
//                 {discountPercentage}% OFF
//               </span>
//             )}
//             <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <img src={getImageUrl(mainImage)} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-2xl relative z-0" />
//           </div>
//         </div>

//         {/* CENTER: Product Details */}
//         <div className="w-full lg:w-4/12 flex flex-col pt-2">
//           <p className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-2">{product.brand || 'Brand Name'}</p>
//           <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">{product.name}</h1>

//           <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-6">
//             <div className="flex text-lg drop-shadow-sm">{renderStars(product.ratings)}</div>
//             <span className="text-slate-500 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-orange-500 transition-colors">
//               {product.numOfReviews?.toLocaleString() || 0} Reviews
//             </span>
//           </div>

//           <div className="mb-8">
//             {finalDiscountPrice ? (
//               <div className="flex items-end gap-4 mb-1">
//                 <span className="text-5xl font-black text-slate-900 tracking-tighter"><span className="text-2xl font-bold text-slate-500 relative -top-3 mr-1">₹</span>{finalDiscountPrice.toLocaleString('en-IN')}</span>
//                 <span className="text-lg line-through text-slate-400 font-bold mb-1">₹{finalPrice.toLocaleString('en-IN')}</span>
//               </div>
//             ) : (
//                 <div className="text-5xl font-black text-slate-900 tracking-tighter mb-1"><span className="text-2xl font-bold text-slate-500 relative -top-3 mr-1">₹</span>{finalPrice.toLocaleString('en-IN')}</div>
//             )}
//             <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Inclusive of all taxes</p>
//           </div>

//           {/* Variants */}
//           {product.variants && product.variants.length > 0 && (
//             <div className="mb-8 space-y-6">
//               {product.variants.map((variant, idx) => (
//                 <div key={idx}>
//                   <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">
//                     {variant.name}: <span className="text-orange-500">{selectedVariants[variant.name]}</span>
//                   </p>
//                   <div className="flex flex-wrap gap-3">
//                     {variant.options.map((option, optIdx) => {
//                       const isSelected = selectedVariants[variant.name] === option.name;
//                       return (
//                         <button 
//                           key={optIdx} 
//                           onClick={() => handleVariantSelect(variant.name, option.name)} 
//                           className={`px-5 py-3 text-sm font-bold rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-orange-500 bg-orange-50/50 text-orange-700 shadow-sm ring-2 ring-orange-500/20' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'}`}
//                         >
//                           {option.name} 
//                           {option.priceModifier > 0 && <span className="block text-[10px] text-slate-400 mt-0.5 font-black uppercase tracking-widest">+₹{option.priceModifier.toLocaleString()}</span>}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Quick Features */}
//           <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-200 pt-8">
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg">🚚</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">Free Delivery</span></div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-lg">🔄</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">{product.returnPolicy || '7 Days Return'}</span></div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-lg">🛡️</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">{product.warrantyPolicy || '1 Year Warranty'}</span></div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-lg">🔒</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">Secure Pay</span></div>
//           </div>
//         </div>

//         {/* RIGHT: Floating Buy Box */}
//         <div className="w-full lg:w-3/12 relative">
//           <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50 sticky top-32">
//             <div className="flex justify-between items-center mb-6">
//               <span className="text-3xl font-black text-slate-900 tracking-tight">₹{currentActivePrice.toLocaleString('en-IN')}</span>
//             </div>
            
//             <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
//               <p className="text-xs font-bold text-orange-800 leading-relaxed">
//                 <span className="font-black text-orange-600 uppercase tracking-widest text-[10px] block mb-1">Delivery Estimate</span>
//                 Order within <span className="font-black">{timeLeft}</span> to get it by <span className="font-black text-slate-900">{deliveryDate}</span>.
//               </p>
//             </div>

//             <div className="flex items-center gap-3 mb-6 text-sm font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
//               <span className="text-xl">📍</span>
//               <span className="truncate">
//                 {user ? `Deliver to ${user.name?.split(' ')[0] || 'User'}` : "Select delivery location"}
//               </span>
//             </div>

//             <h3 className={`text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
//               <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></span>
//               {product.stock > 0 ? 'In stock & ready to ship' : 'Out of Stock'}
//             </h3>
            
//             <div className="space-y-3 mb-6">
//               <button 
//                 onClick={handleAddToCart} 
//                 disabled={product.stock === 0} 
//                 className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 ${product.stock > 0 ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
//               >
//                 Add to Cart
//               </button>
              
//               <button 
//                 onClick={handleBuyNow} 
//                 disabled={product.stock === 0} 
//                 className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg transition-all duration-300 ${product.stock > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-orange-500/30 hover:-translate-y-1' : 'hidden'}`}
//               >
//                 Buy it Now
//               </button>
//             </div>

//             <div className="space-y-2 border-t border-slate-100 pt-4">
//               <div className="flex items-center justify-between text-xs text-slate-500 font-medium"><span>Ships from</span><span className="text-slate-900 font-bold">GadgetStore Central</span></div>
//               <div className="flex items-center justify-between text-xs text-slate-500 font-medium"><span>Sold by</span><span className="text-orange-500 font-bold hover:underline cursor-pointer">{product.brand || 'Retail Partner'}</span></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr className="my-16 border-slate-200 max-w-[1600px] mx-auto" />
      
//       {/* LOWER SECTION: Details & Reviews */}
//       <div className="max-w-[1200px] mx-auto px-6 space-y-16">
        
//         {/* Promo Banners */}
//         {product.banners && product.banners.length > 0 && (
//           <div className="w-full space-y-6">
//             <h2 className="text-2xl font-black text-slate-900">From the Manufacturer</h2>
//             <div className="flex flex-col gap-6">
//               {product.banners.map((banner, index) => (
//                 <img key={index} src={getImageUrl(banner)} alt="Promo Banner" className="w-full rounded-3xl shadow-md border border-slate-100 object-cover" />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-16">
//           <div className="w-full lg:w-2/3 space-y-12">
            
//             {/* Description */}
//             <div>
//               <h2 className="text-2xl font-black text-slate-900 mb-6">Product Overview</h2>
//               <div className="prose max-w-none text-slate-600 font-medium text-base leading-relaxed whitespace-pre-wrap">{product.description}</div>
//             </div>

//             {/* Key Features List */}
//             {product.features && product.features.length > 0 && (
//               <div>
//                 <h2 className="text-2xl font-black text-slate-900 mb-6">Key Features</h2>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
//                       <span className="text-orange-500 bg-orange-50 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">✓</span> 
//                       <span className="text-slate-700 text-sm font-bold leading-snug">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Tech Specs Table */}
//           {product.specs && product.specs.length > 0 && (
//             <div className="w-full lg:w-1/3">
//               <h2 className="text-2xl font-black text-slate-900 mb-6">Technical Specs</h2>
//               <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
//                 <table className="w-full text-left text-sm">
//                   <tbody className="divide-y divide-slate-100">
//                     <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
//                       <th className="py-4 px-5 font-black text-slate-500 uppercase tracking-widest text-[10px] w-1/3 border-r border-slate-100">Brand</th>
//                       <td className="py-4 px-5 text-slate-900 font-bold">{product.brand || 'Generic'}</td>
//                     </tr>
//                     {product.specs.map((spec, index) => (
//                       <tr key={index} className="hover:bg-slate-50 transition-colors">
//                         <th className="py-4 px-5 font-black text-slate-500 uppercase tracking-widest text-[10px] w-1/3 border-r border-slate-100">{spec.name}</th>
//                         <td className="py-4 px-5 text-slate-900 font-medium">{spec.value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* REVIEWS SECTION */}
//         <div className="w-full pt-16 border-t border-slate-200">
//           <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Customer Reviews</h2>
          
//           <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            
//             {/* Reviews List */}
//             <div className="w-full md:w-2/3 space-y-6">
//               {product.reviews && product.reviews.filter(r => r.isApproved).length > 0 ? (
//                 product.reviews.filter(r => r.isApproved).map((review, idx) => (
//                   <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-inner">
//                         {review.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-900">{review.name}</p>
//                         <div className="text-yellow-400 text-sm drop-shadow-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
//                       </div>
//                     </div>
//                     <span className="absolute top-8 right-8 text-5xl text-slate-100 leading-none font-serif">"</span>
//                     <p className="text-slate-600 font-medium text-sm leading-relaxed relative z-10">{review.comment}</p>
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6 pt-4 border-t border-slate-50">
//                       Posted on {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="bg-slate-50 p-12 rounded-3xl border border-slate-100 text-center">
//                   <span className="text-4xl mb-4 block opacity-50">⭐</span>
//                   <p className="text-slate-900 font-black text-lg mb-2">No reviews yet</p>
//                   <p className="text-slate-500 font-medium text-sm">Be the first to share your thoughts on this product!</p>
//                 </div>
//               )}
//             </div>

//             {/* Write Review Form */}
//             <div className="w-full md:w-1/3">
//               <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-32">
//                 <h3 className="text-xl font-black text-slate-900 mb-6">Write a Review</h3>
//                 {user ? (
//                   <form onSubmit={submitReview} className="space-y-5">
//                     <div>
//                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Overall Rating</label>
//                       <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 font-bold text-slate-700 cursor-pointer shadow-sm">
//                         <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
//                         <option value="4">⭐⭐⭐⭐ - Very Good</option>
//                         <option value="3">⭐⭐⭐ - Average</option>
//                         <option value="2">⭐⭐ - Poor</option>
//                         <option value="1">⭐ - Terrible</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Your Experience</label>
//                       <textarea required value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-32 resize-none outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 font-medium text-slate-900 placeholder-slate-400 shadow-sm" placeholder="What did you love or hate about it?"></textarea>
//                     </div>
//                     <button type="submit" disabled={reviewSubmitLoading} className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-md ${reviewSubmitLoading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 hover:bg-orange-500 text-white hover:shadow-orange-500/30 hover:-translate-y-1'}`}>
//                       {reviewSubmitLoading ? 'Submitting...' : 'Submit Review'}
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="text-center p-8 bg-orange-50 rounded-2xl border border-orange-100">
//                     <p className="text-sm text-orange-900 font-bold mb-4 leading-relaxed">Join the community to share your experience with this gadget.</p>
//                     <Link href="/login">
//                       <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-md transition-colors">
//                         Sign in to review
//                       </button>
//                     </Link>
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
// import { useParams, useRouter } from 'next/navigation';
// import { useCart } from '../../../context/CartContext';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';
// import Link from 'next/link';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
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

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/500x500?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

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

//   if (loading) return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 space-y-4">
//       <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-orange-500"></div>
//       <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Premium Gadget...</p>
//     </div>
//   );
  
//   if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-[#F8FAFC] text-2xl text-slate-800">Product not found.</div>;

//   const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

//   const renderStars = (ratingValue) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.round(ratingValue) ? "text-orange-400" : "text-slate-200"}>★</span>
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

//   // 🚀 ADVANCED VARIANT SELECTOR WITH IMAGE SWAPPING LOGIC
//   const handleVariantSelect = (variantName, optionName) => {
//     setSelectedVariants(prev => ({ ...prev, [variantName]: optionName }));

//     // If the variant being changed relates to Color/Colour, update the main image!
//     const isColorVariant = variantName.toLowerCase().includes('color') || variantName.toLowerCase().includes('colour');
    
//     if (isColorVariant) {
//       const variant = product.variants.find(v => v.name === variantName);
//       if (variant) {
//         // Find the index of the clicked color (e.g., 2nd color in the list)
//         const optionIndex = variant.options.findIndex(o => o.name === optionName);
        
//         // If an image exists at this exact index in the gallery, switch to it!
//         if (optionIndex !== -1 && product.images[optionIndex]) {
//           setMainImage(product.images[optionIndex]);
//         }
//       }
//     }
//   };
  
//   const handleAddToCart = () => { 
//     addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants }); 
//     alert(`${product.name} added to cart!`); 
//   };

//   const handleBuyNow = () => {
//     addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants });
//     router.push('/checkout');
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("You must be logged in to leave a review.");
    
//     const actualUserId = user?._id || user?.user?._id || user?.userId || user?.id;
//     const actualUserName = user?.name || user?.user?.name || 'Customer';

//     if (!actualUserId) {
//       console.error("User Object:", user);
//       return alert("Authentication error: Could not find your User ID. Try logging out and back in.");
//     }

//     setReviewSubmitLoading(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
//         rating, comment, userId: actualUserId, userName: actualUserName
//       });
//       alert("Thank you! Your review has been submitted and is pending admin approval.");
//       setComment(''); setRating(5);
//     } catch (error) {
//       console.error("Review Error Details:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Error submitting review.");
//     } finally {
//       setReviewSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 selection:bg-orange-200">
      
//       <div className="max-w-[1600px] mx-auto px-6 py-5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
//         <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link> 
//         <span className="mx-2">›</span> 
//         <span className="hover:text-orange-500 transition-colors cursor-pointer">{product.category}</span> 
//         <span className="mx-2">›</span> 
//         <span className="hover:text-orange-500 transition-colors cursor-pointer">{product.brand || 'Gadget'}</span> 
//         <span className="mx-2">›</span> 
//         <span className="text-slate-800">{product.name}</span>
//       </div>

//       <div className="max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
//         {/* LEFT: Image Gallery */}
//         <div className="w-full lg:w-5/12 flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-32 h-fit">
//           {product.images && product.images.length > 1 && (
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] p-1 custom-scrollbar">
//               {product.images.map((img, index) => (
//                 <button 
//                   key={index} 
//                   onMouseEnter={() => setMainImage(img)} 
//                   onClick={() => setMainImage(img)} 
//                   className={`h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${mainImage === img ? 'border-orange-500 shadow-md ring-2 ring-orange-500/20' : 'border-slate-200 hover:border-orange-300 opacity-70 hover:opacity-100'}`}
//                 >
//                   <img src={getImageUrl(img)} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply p-1" />
//                 </button>
//               ))}
//             </div>
//           )}
//           <div className="bg-white border border-slate-100 rounded-3xl h-[400px] md:h-[550px] flex-1 flex items-center justify-center p-8 shadow-sm relative group cursor-crosshair overflow-hidden">
//             {product.discountPrice && (
//               <span className="absolute top-6 left-6 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-md z-10">
//                 {discountPercentage}% OFF
//               </span>
//             )}
//             <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <img src={getImageUrl(mainImage)} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-2xl relative z-0" />
//           </div>
//         </div>

//         {/* CENTER: Product Details */}
//         <div className="w-full lg:w-4/12 flex flex-col pt-2">
//           <p className="text-[11px] font-black text-orange-500 uppercase tracking-widest mb-2">{product.brand || 'Brand Name'}</p>
//           <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">{product.name}</h1>

//           <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-6">
//             <div className="flex text-lg drop-shadow-sm">{renderStars(product.ratings)}</div>
//             <span className="text-slate-500 text-xs font-black uppercase tracking-wider cursor-pointer hover:text-orange-500 transition-colors">
//               {product.numOfReviews?.toLocaleString() || 0} Reviews
//             </span>
//           </div>

//           <div className="mb-8">
//             {finalDiscountPrice ? (
//               <div className="flex items-end gap-4 mb-1">
//                 <span className="text-5xl font-black text-slate-900 tracking-tighter"><span className="text-2xl font-bold text-slate-500 relative -top-3 mr-1">₹</span>{finalDiscountPrice.toLocaleString('en-IN')}</span>
//                 <span className="text-lg line-through text-slate-400 font-bold mb-1">₹{finalPrice.toLocaleString('en-IN')}</span>
//               </div>
//             ) : (
//                 <div className="text-5xl font-black text-slate-900 tracking-tighter mb-1"><span className="text-2xl font-bold text-slate-500 relative -top-3 mr-1">₹</span>{finalPrice.toLocaleString('en-IN')}</div>
//             )}
//             <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Inclusive of all taxes</p>
//           </div>

//           {/* Variants */}
//           {product.variants && product.variants.length > 0 && (
//             <div className="mb-8 space-y-6">
//               {product.variants.map((variant, idx) => {
//                 const isColorVariant = variant.name.toLowerCase().includes('color') || variant.name.toLowerCase().includes('colour');
                
//                 return (
//                   <div key={idx}>
//                     <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">
//                       {variant.name}: <span className="text-orange-500">{selectedVariants[variant.name]}</span>
//                     </p>
//                     <div className="flex flex-wrap gap-3">
//                       {variant.options.map((option, optIdx) => {
//                         const isSelected = selectedVariants[variant.name] === option.name;
                        
//                         return (
//                           <button 
//                             key={optIdx} 
//                             onClick={() => handleVariantSelect(variant.name, option.name)} 
//                             className={`px-5 py-3 text-sm font-bold rounded-xl border-2 transition-all duration-200 relative overflow-hidden ${isSelected ? 'border-orange-500 bg-orange-50/50 text-orange-700 shadow-sm ring-2 ring-orange-500/20' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'}`}
//                           >
//                             {/* If it's a color variant, show a tiny visual cue */}
//                             {isColorVariant && isSelected && (
//                               <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
//                             )}
//                             {option.name} 
//                             {option.priceModifier > 0 && <span className="block text-[10px] text-slate-400 mt-0.5 font-black uppercase tracking-widest">+₹{option.priceModifier.toLocaleString()}</span>}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Quick Features */}
//           <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-200 pt-8">
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg">🚚</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">Free Delivery</span></div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-lg">🔄</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">{product.returnPolicy || '7 Days Return'}</span></div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-lg">🛡️</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">{product.warrantyPolicy || '1 Year Warranty'}</span></div>
//             <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-lg">🔒</div><span className="text-[10px] font-black text-slate-700 uppercase tracking-wide leading-tight">Secure Pay</span></div>
//           </div>
//         </div>

//         {/* RIGHT: Floating Buy Box */}
//         <div className="w-full lg:w-3/12 relative">
//           <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50 sticky top-32">
//             <div className="flex justify-between items-center mb-6">
//               <span className="text-3xl font-black text-slate-900 tracking-tight">₹{currentActivePrice.toLocaleString('en-IN')}</span>
//             </div>
            
//             <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
//               <p className="text-xs font-bold text-orange-800 leading-relaxed">
//                 <span className="font-black text-orange-600 uppercase tracking-widest text-[10px] block mb-1">Delivery Estimate</span>
//                 Order within <span className="font-black">{timeLeft}</span> to get it by <span className="font-black text-slate-900">{deliveryDate}</span>.
//               </p>
//             </div>

//             <div className="flex items-center gap-3 mb-6 text-sm font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
//               <span className="text-xl">📍</span>
//               <span className="truncate">
//                 {user ? `Deliver to ${user.name?.split(' ')[0] || 'User'}` : "Select delivery location"}
//               </span>
//             </div>

//             <h3 className={`text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
//               <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></span>
//               {product.stock > 0 ? 'In stock & ready to ship' : 'Out of Stock'}
//             </h3>
            
//             <div className="space-y-3 mb-6">
//               <button 
//                 onClick={handleAddToCart} 
//                 disabled={product.stock === 0} 
//                 className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 ${product.stock > 0 ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
//               >
//                 Add to Cart
//               </button>
              
//               <button 
//                 onClick={handleBuyNow} 
//                 disabled={product.stock === 0} 
//                 className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg transition-all duration-300 ${product.stock > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-orange-500/30 hover:-translate-y-1' : 'hidden'}`}
//               >
//                 Buy it Now
//               </button>
//             </div>

//             <div className="space-y-2 border-t border-slate-100 pt-4">
//               <div className="flex items-center justify-between text-xs text-slate-500 font-medium"><span>Ships from</span><span className="text-slate-900 font-bold">Amazon Smarts</span></div>
//               <div className="flex items-center justify-between text-xs text-slate-500 font-medium"><span>Sold by</span><span className="text-orange-500 font-bold hover:underline cursor-pointer">{product.brand || 'Retail Partner'}</span></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr className="my-16 border-slate-200 max-w-[1600px] mx-auto" />
      
//       {/* LOWER SECTION: Details & Reviews */}
//       <div className="max-w-[1200px] mx-auto px-6 space-y-16">
        
//         {/* Promo Banners */}
//         {product.banners && product.banners.length > 0 && (
//           <div className="w-full space-y-6">
//             <h2 className="text-2xl font-black text-slate-900">From the Manufacturer</h2>
//             <div className="flex flex-col gap-6">
//               {product.banners.map((banner, index) => (
//                 <img key={index} src={getImageUrl(banner)} alt="Promo Banner" className="w-full rounded-3xl shadow-md border border-slate-100 object-cover" />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-16">
//           <div className="w-full lg:w-2/3 space-y-12">
            
//             {/* Description */}
//             <div>
//               <h2 className="text-2xl font-black text-slate-900 mb-6">Product Overview</h2>
//               <div className="prose max-w-none text-slate-600 font-medium text-base leading-relaxed whitespace-pre-wrap">{product.description}</div>
//             </div>

//             {/* Key Features List */}
//             {product.features && product.features.length > 0 && (
//               <div>
//                 <h2 className="text-2xl font-black text-slate-900 mb-6">Key Features</h2>
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
//                       <span className="text-orange-500 bg-orange-50 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">✓</span> 
//                       <span className="text-slate-700 text-sm font-bold leading-snug">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Tech Specs Table */}
//           {product.specs && product.specs.length > 0 && (
//             <div className="w-full lg:w-1/3">
//               <h2 className="text-2xl font-black text-slate-900 mb-6">Technical Specs</h2>
//               <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
//                 <table className="w-full text-left text-sm">
//                   <tbody className="divide-y divide-slate-100">
//                     <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
//                       <th className="py-4 px-5 font-black text-slate-500 uppercase tracking-widest text-[10px] w-1/3 border-r border-slate-100">Brand</th>
//                       <td className="py-4 px-5 text-slate-900 font-bold">{product.brand || 'Generic'}</td>
//                     </tr>
//                     {product.specs.map((spec, index) => (
//                       <tr key={index} className="hover:bg-slate-50 transition-colors">
//                         <th className="py-4 px-5 font-black text-slate-500 uppercase tracking-widest text-[10px] w-1/3 border-r border-slate-100">{spec.name}</th>
//                         <td className="py-4 px-5 text-slate-900 font-medium">{spec.value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* REVIEWS SECTION */}
//         <div className="w-full pt-16 border-t border-slate-200">
//           <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Customer Reviews</h2>
          
//           <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
            
//             {/* Reviews List */}
//             <div className="w-full md:w-2/3 space-y-6">
//               {product.reviews && product.reviews.filter(r => r.isApproved).length > 0 ? (
//                 product.reviews.filter(r => r.isApproved).map((review, idx) => (
//                   <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-inner">
//                         {review.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-900">{review.name}</p>
//                         <div className="text-yellow-400 text-sm drop-shadow-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
//                       </div>
//                     </div>
//                     <span className="absolute top-8 right-8 text-5xl text-slate-100 leading-none font-serif">"</span>
//                     <p className="text-slate-600 font-medium text-sm leading-relaxed relative z-10">{review.comment}</p>
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6 pt-4 border-t border-slate-50">
//                       Posted on {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="bg-slate-50 p-12 rounded-3xl border border-slate-100 text-center">
//                   <span className="text-4xl mb-4 block opacity-50">⭐</span>
//                   <p className="text-slate-900 font-black text-lg mb-2">No reviews yet</p>
//                   <p className="text-slate-500 font-medium text-sm">Be the first to share your thoughts on this product!</p>
//                 </div>
//               )}
//             </div>

//             {/* Write Review Form */}
//             <div className="w-full md:w-1/3">
//               <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-32">
//                 <h3 className="text-xl font-black text-slate-900 mb-6">Write a Review</h3>
//                 {user ? (
//                   <form onSubmit={submitReview} className="space-y-5">
//                     <div>
//                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Overall Rating</label>
//                       <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 font-bold text-slate-700 cursor-pointer shadow-sm">
//                         <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
//                         <option value="4">⭐⭐⭐⭐ - Very Good</option>
//                         <option value="3">⭐⭐⭐ - Average</option>
//                         <option value="2">⭐⭐ - Poor</option>
//                         <option value="1">⭐ - Terrible</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Your Experience</label>
//                       <textarea required value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-32 resize-none outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 font-medium text-slate-900 placeholder-slate-400 shadow-sm" placeholder="What did you love or hate about it?"></textarea>
//                     </div>
//                     <button type="submit" disabled={reviewSubmitLoading} className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-md ${reviewSubmitLoading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-900 hover:bg-orange-500 text-white hover:shadow-orange-500/30 hover:-translate-y-1'}`}>
//                       {reviewSubmitLoading ? 'Submitting...' : 'Submit Review'}
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="text-center p-8 bg-orange-50 rounded-2xl border border-orange-100">
//                     <p className="text-sm text-orange-900 font-bold mb-4 leading-relaxed">Join the community to share your experience with this gadget.</p>
//                     <Link href="/login">
//                       <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-md transition-colors">
//                         Sign in to review
//                       </button>
//                     </Link>
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
// import { useParams, useRouter } from 'next/navigation';
// import { useCart } from '../../../context/CartContext';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';
// import Link from 'next/link';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { user } = useAuth();
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState('');
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [timeLeft, setTimeLeft] = useState('');
  
//   // 🚀 NEW: State for quantity and feedback
//   const [quantity, setQuantity] = useState(1);
//   const [isAdded, setIsAdded] = useState(false);

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/500x500?text=No+Image';
//     if (imagePath.startsWith('http')) {
//         return imagePath.replace('http://localhost:5000', process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
//     }
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

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

//   if (loading) return (
//     <div className="min-h-screen bg-white flex items-center justify-center">
//       <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
//     </div>
//   );
  
//   if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-white text-2xl text-[#111]">Product not found.</div>;

//   const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });

//   const renderStars = (ratingValue) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.round(ratingValue) ? "text-[#FFA41C]" : "text-[#e77600]"}>★</span>
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

//   const handleVariantSelect = (variantName, optionName) => {
//     setSelectedVariants(prev => ({ ...prev, [variantName]: optionName }));
//     const isColorVariant = variantName.toLowerCase().includes('color') || variantName.toLowerCase().includes('colour');
//     if (isColorVariant) {
//       const variant = product.variants.find(v => v.name === variantName);
//       if (variant) {
//         const optionIndex = variant.options.findIndex(o => o.name === optionName);
//         if (optionIndex !== -1 && product.images[optionIndex]) {
//           setMainImage(product.images[optionIndex]);
//         }
//       }
//     }
//   };
  
//   // 🚀 FIXED: Added quantity support and success feedback
//   const handleAddToCart = () => { 
//     addToCart({ 
//       ...product, 
//       price: finalPrice, 
//       discountPrice: finalDiscountPrice, 
//       selectedOptions: selectedVariants,
//       quantity: quantity // Respect the dropdown selection
//     }); 
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 2000);
//   };

//   const handleBuyNow = () => {
//     addToCart({ 
//       ...product, 
//       price: finalPrice, 
//       discountPrice: finalDiscountPrice, 
//       selectedOptions: selectedVariants,
//       quantity: quantity 
//     });
//     router.push('/cart');
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("You must be logged in to leave a review.");
//     const actualUserId = user?._id || user?.user?._id || user?.userId || user?.id;
//     const actualUserName = user?.name || user?.user?.name || 'Customer';

//     setReviewSubmitLoading(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
//         rating, comment, userId: actualUserId, userName: actualUserName
//       });
//       alert("Thank you! Your review has been submitted and is pending admin approval.");
//       setComment(''); setRating(5);
//     } catch (error) {
//       alert(error.response?.data?.message || "Error submitting review.");
//     } finally {
//       setReviewSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111] relative">
      
//       {/* Added to Cart Feedback Toast */}
//       {isAdded && (
//         <div className="fixed top-24 right-4 z-[100] bg-[#e7f4e4] border border-[#007600] px-6 py-3 rounded-[4px] shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
//            <p className="text-[#007600] font-bold flex items-center gap-2">
//              <span className="text-xl">✓</span> Added to Cart
//            </p>
//         </div>
//       )}

//       {/* Breadcrumb */}
//       <div className="max-w-[1500px] mx-auto px-4 py-2 text-[12px] text-[#565959]">
//         <Link href="/" className="hover:text-[#c45500] hover:underline">Home</Link> 
//         <span className="mx-1">›</span> 
//         <span className="hover:text-[#c45500] hover:underline cursor-pointer">{product.category}</span> 
//         <span className="mx-1">›</span> 
//         <span className="hover:text-[#c45500] hover:underline cursor-pointer">{product.brand || 'Gadget'}</span> 
//       </div>

//       <div className="max-w-[1500px] mx-auto px-4 flex flex-col lg:flex-row gap-8 pb-12">
        
//         {/* ================= LEFT: IMAGE GALLERY ================= */}
//         <div className="w-full lg:w-4/12 flex gap-4 md:sticky top-32 h-fit">
//           {product.images && product.images.length > 1 && (
//             <div className="flex flex-col gap-2 w-[40px] shrink-0">
//               {product.images.map((img, index) => (
//                 <div 
//                   key={index} 
//                   onMouseEnter={() => setMainImage(img)} 
//                   className={`h-12 w-10 border rounded-[2px] cursor-pointer overflow-hidden flex items-center justify-center p-0.5 ${mainImage === img ? 'border-[#e77600] shadow-[0_0_3px_rgba(228,121,17,0.5)]' : 'border-[#a6a6a6] hover:border-[#e77600] hover:shadow-[0_0_3px_rgba(228,121,17,0.5)]'}`}
//                 >
//                   <img src={getImageUrl(img)} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="flex-1 flex items-center justify-center min-h-[400px] p-4 relative group">
//             <img src={getImageUrl(mainImage)} alt={product.name} className="max-w-full max-h-full object-contain cursor-zoom-in" />
//           </div>
//         </div>

//         {/* ================= MIDDLE: PRODUCT DETAILS ================= */}
//         <div className="w-full lg:w-5/12 flex flex-col pt-2">
          
//           <h1 className="text-[24px] leading-[32px] font-medium text-[#0F1111]">{product.name}</h1>
//           <Link href={`/?search=${product.brand}`} className="text-[14px] text-[#007185] hover:text-[#C45500] hover:underline mt-1">
//             Visit the {product.brand || 'Brand'} Store
//           </Link>

//           <div className="flex items-center gap-4 mt-2 border-b border-[#ddd] pb-2">
//             <div className="flex items-center gap-1">
//               <span className="text-lg">{renderStars(product.ratings)}</span>
//               <span className="text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer text-[14px]">
//                 {product.numOfReviews?.toLocaleString() || 0} ratings
//               </span>
//             </div>
//           </div>

//           <div className="mt-3">
//             {finalDiscountPrice ? (
//               <>
//                 <div className="flex items-center gap-2">
//                   <span className="text-[28px] font-light text-[#CC0C39]">-{discountPercentage}%</span>
//                   <div className="flex items-baseline text-[28px] font-normal text-[#0F1111]">
//                     <span className="text-[14px] relative -top-2">₹</span>
//                     {finalDiscountPrice.toLocaleString('en-IN')}
//                   </div>
//                 </div>
//                 <div className="text-[12px] text-[#565959] mt-1">
//                   M.R.P.: <span className="line-through">₹{finalPrice.toLocaleString('en-IN')}</span>
//                 </div>
//               </>
//             ) : (
//                 <div className="flex items-baseline text-[28px] font-normal text-[#0F1111]">
//                   <span className="text-[14px] relative -top-2">₹</span>
//                   {finalPrice.toLocaleString('en-IN')}
//                 </div>
//             )}
//             <p className="text-[14px] font-bold text-[#0F1111] mt-1">Inclusive of all taxes</p>
//           </div>

//           {/* Variants Selection */}
//           {product.variants && product.variants.length > 0 && (
//             <div className="mt-4 space-y-4">
//               {product.variants.map((variant, idx) => (
//                 <div key={idx}>
//                   <p className="text-[14px] text-[#0F1111] mb-2">
//                     <span className="font-bold">{variant.name}:</span> <span className="font-medium">{selectedVariants[variant.name]}</span>
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {variant.options.map((option, optIdx) => {
//                       const isSelected = selectedVariants[variant.name] === option.name;
//                       return (
//                         <button 
//                           key={optIdx} 
//                           onClick={() => handleVariantSelect(variant.name, option.name)} 
//                           className={`px-3 py-1.5 text-[14px] rounded-[2px] transition-all bg-white border ${isSelected ? 'border-[#e77600] bg-[#fdf8f3] font-bold shadow-[0_0_3px_rgba(228,121,17,0.5)]' : 'border-[#a6a6a6] text-[#111] hover:border-[#e77600] hover:bg-gray-50'}`}
//                         >
//                           {option.name} 
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Tech Specs */}
//           {product.specs && product.specs.length > 0 && (
//             <div className="mt-6 border-t border-[#ddd] pt-4">
//               <table className="text-[14px] w-full max-w-[300px]">
//                 <tbody>
//                   {product.specs.map((spec, index) => (
//                     <tr key={index}>
//                       <td className="py-1 font-bold text-[#0F1111] w-1/2 align-top">{spec.name}</td>
//                       <td className="py-1 text-[#0F1111] align-top">{spec.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* About This Item */}
//           {product.features && product.features.length > 0 && (
//             <div className="mt-6 border-t border-[#ddd] pt-4">
//               <h3 className="font-bold text-[16px] text-[#0F1111] mb-2">About this item</h3>
//               <ul className="list-disc pl-5 text-[14px] text-[#0F1111] space-y-1.5">
//                 {product.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//         </div>

//         {/* ================= RIGHT: BUY BOX ================= */}
//         <div className="w-full lg:w-3/12">
//           <div className="border border-[#ddd] rounded-[8px] p-[18px] sticky top-32">
            
//             <div className="flex items-baseline text-[28px] font-normal text-[#0F1111] mb-4">
//               <span className="text-[14px] relative -top-2">₹</span>
//               {currentActivePrice.toLocaleString('en-IN')}
//             </div>
            
//             <div className="text-[14px] text-[#0F1111] mb-4">
//               FREE delivery <span className="font-bold">{deliveryDate}.</span> <br/>
//               Order within <span className="text-[#007600]">{timeLeft}</span>. <Link href="#" className="text-[#007185] hover:text-[#C45500] hover:underline">Details</Link>
//             </div>

//             <h3 className={`text-[18px] mb-4 ${product.stock > 0 ? 'text-[#007600]' : 'text-[#B12704]'}`}>
//               {product.stock > 0 ? 'In stock' : 'Out of Stock'}
//             </h3>

//             {/* 🚀 NEW: QUANTITY SELECTOR */}
//             {product.stock > 0 && (
//               <div className="mb-4">
//                 <select 
//                   value={quantity} 
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                   className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-[7px] px-2 py-1 text-[13px] shadow-[0_2px_5px_rgba(213,217,217,0.5)] focus:border-[#e77600] outline-none cursor-pointer"
//                 >
//                   {[...Array(Math.min(10, product.stock)).keys()].map((n) => (
//                     <option key={n + 1} value={n + 1}>Qty: {n + 1}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
            
//             <div className="space-y-2 mb-4">
//               <button 
//                 onClick={handleAddToCart} 
//                 disabled={product.stock === 0} 
//                 className={`w-full py-1.5 rounded-full text-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors ${product.stock > 0 ? 'bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111]' : 'bg-[#e7e7e7] text-[#565959] cursor-not-allowed border-[#ddd]'}`}
//               >
//                 Add to Cart
//               </button>
              
//               <button 
//                 onClick={handleBuyNow} 
//                 disabled={product.stock === 0} 
//                 className={`w-full py-1.5 rounded-full text-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors ${product.stock > 0 ? 'bg-[#FFA41C] hover:bg-[#FF9900] border border-[#FF8F00] text-[#0F1111]' : 'hidden'}`}
//               >
//                 Buy Now
//               </button>
//             </div>

//             <div className="flex flex-col gap-1 text-[12px] pt-2 border-t border-[#ddd]">
//               <div className="flex justify-between">
//                 <span className="text-[#565959] w-24">Ships from</span>
//                 <span className="text-[#0F1111]">Amazon Smarts</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-[#565959] w-24">Sold by</span>
//                 <span className="text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer">{product.brand || 'Retail Partner'}</span>
//               </div>
//             </div>
            
//           </div>
//         </div>

//       </div>

//       {/* Promo Banners & Descriptions as before... */}
//       <div className="max-w-[1500px] mx-auto px-4 lg:px-8 space-y-12">
//         {product.banners && product.banners.length > 0 && (
//           <div className="w-full space-y-4 border-t border-[#ddd] pt-8">
//             <h2 className="text-[24px] font-bold text-[#CC6600]">From the manufacturer</h2>
//             <div className="flex flex-col gap-4">
//               {product.banners.map((banner, index) => (
//                 <img key={index} src={getImageUrl(banner)} alt="Promo Banner" className="w-full object-cover rounded-sm" />
//               ))}
//             </div>
//           </div>
//         )}
        
//         <div>
//           <h2 className="text-[24px] font-bold text-[#CC6600] mb-2">Product Description</h2>
//           <div className="prose max-w-[800px] text-[#0F1111] text-[14px] leading-relaxed whitespace-pre-wrap">
//             {product.description}
//           </div>
//         </div>

//         {/* REVIEWS SECTION */}
//         <div className="w-full border-t border-[#ddd] pt-8 flex flex-col md:flex-row gap-8">
          
//           {/* Left: Write Review */}
//           <div className="w-full md:w-1/3">
//             <h2 className="text-[20px] font-bold text-[#0F1111] mb-2">Review this product</h2>
//             <p className="text-[14px] text-[#565959] mb-4">Share your thoughts with other customers</p>
//             {user ? (
//               <form onSubmit={submitReview} className="space-y-4">
//                 <div>
//                   <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-2 border border-[#a6a6a6] rounded-[3px] text-[14px] outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] cursor-pointer">
//                     <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
//                     <option value="4">⭐⭐⭐⭐ - Good</option>
//                     <option value="3">⭐⭐⭐ - Average</option>
//                     <option value="2">⭐⭐ - Poor</option>
//                     <option value="1">⭐ - Terrible</option>
//                   </select>
//                 </div>
//                 <div>
//                   <textarea required value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 border border-[#a6a6a6] rounded-[3px] h-24 resize-none text-[14px] outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]" placeholder="Write your review here..."></textarea>
//                 </div>
//                 <button type="submit" disabled={reviewSubmitLoading} className={`w-full py-1.5 rounded-[8px] text-[13px] border transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.2)] ${reviewSubmitLoading ? 'bg-[#e7e7e7] text-[#565959] border-[#ddd]' : 'bg-white border-[#d5d9d9] hover:bg-[#f7fafa] text-[#0F1111]'}`}>
//                   {reviewSubmitLoading ? 'Submitting...' : 'Write a customer review'}
//                 </button>
//               </form>
//             ) : (
//               <Link href="/login">
//                 <button className="w-full bg-white border border-[#d5d9d9] hover:bg-[#f7fafa] py-1.5 rounded-[8px] text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-colors cursor-pointer">
//                   Sign in to write a review
//                 </button>
//               </Link>
//             )}
//           </div>

//           {/* Right: Reviews List */}
//           <div className="w-full md:w-2/3">
//             <h2 className="text-[20px] font-bold text-[#0F1111] mb-6">Customer reviews</h2>
            
//             <div className="space-y-6">
//               {product.reviews && product.reviews.filter(r => r.isApproved).length > 0 ? (
//                 product.reviews.filter(r => r.isApproved).map((review, idx) => (
//                   <div key={idx} className="mb-4 pb-4">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-8 h-8 bg-[#e7e7e7] rounded-full flex items-center justify-center text-[#565959]">
//                         👤
//                       </div>
//                       <span className="text-[13px] text-[#0F1111]">{review.name}</span>
//                     </div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="text-[#FFA41C] text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
//                       <span className="text-[13px] font-bold text-[#0F1111]">Verified Purchase</span>
//                     </div>
//                     <p className="text-[11px] text-[#565959] mb-2">
//                       Reviewed in India on {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
//                     </p>
//                     <p className="text-[14px] text-[#0F1111] leading-relaxed">{review.comment}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-[14px] text-[#565959]">
//                   No customer reviews yet.
//                 </div>
//               )}
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
// import { useParams, useRouter } from 'next/navigation';
// import { useCart } from '../../../context/CartContext';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';
// import Link from 'next/link';

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const { user } = useAuth();
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState('');
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [timeLeft, setTimeLeft] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [isAdded, setIsAdded] = useState(false);

//   // 🚀 Pincode & Delivery States
//   const [pincode, setPincode] = useState('');
//   const [pincodeStatus, setPincodeStatus] = useState(null); // null, 'loading', 'success', 'error'
//   const [deliveryLocation, setDeliveryLocation] = useState(''); 
//   const [dynamicDeliveryDate, setDynamicDeliveryDate] = useState(
//     new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })
//   );

//   // Review States
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);
//   const [showReviewSuccess, setShowReviewSuccess] = useState(false);
//   const [reviewSort, setReviewSort] = useState('top');

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return 'https://placehold.co/500x500?text=No+Image';
//     if (imagePath.startsWith('http')) return imagePath; 
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
//     return `${baseUrl}/${imagePath}`;
//   };

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

//   // 🚀 MATH FORMULA: Calculates distance between two map coordinates in Kilometers
//   const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Earth radius in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   // 🚀 DYNAMIC DELIVERY ESTIMATOR
//   const handlePincodeCheck = async () => {
//     if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
//       setPincodeStatus('error');
//       return;
//     }
    
//     setPincodeStatus('loading');
    
//     try {
//       // 1. Fetch exact City and Coordinates from Free API
//       const { data } = await axios.get(`https://api.zippopotam.us/in/${pincode}`);
//       const place = data.places[0];
//       const city = place['place name'];
//       const targetLat = parseFloat(place.latitude);
//       const targetLon = parseFloat(place.longitude);
      
//       setDeliveryLocation(city);
//       setPincodeStatus('success');

//       // 2. Define your Warehouse Location (Example: New Delhi)
//       const WAREHOUSE_LAT = 28.6139; 
//       const WAREHOUSE_LON = 77.2090;

//       // 3. Calculate distance from Warehouse to Customer
//       const distanceInKm = calculateDistanceKm(WAREHOUSE_LAT, WAREHOUSE_LON, targetLat, targetLon);

//       // 4. Set delivery days based on realistic shipping distances
//       let daysToDeliver = 4; // Default
//       if (distanceInKm < 100) daysToDeliver = 1;       // Same city or very close (Next Day)
//       else if (distanceInKm < 500) daysToDeliver = 3;  // Neighboring states
//       else if (distanceInKm < 1500) daysToDeliver = 5; // Across the country
//       else daysToDeliver = 7;                          // Very far regions (e.g., North East / Deep South)

//       // 5. Update the UI Date
//       setDynamicDeliveryDate(new Date(Date.now() + daysToDeliver * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }));
      
//     } catch (err) {
//       setPincodeStatus('error');
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-white flex items-center justify-center">
//       <div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div>
//     </div>
//   );
  
//   if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-white text-2xl text-[#111]">Product not found.</div>;

//   const renderStars = (ratingValue) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < Math.round(ratingValue) ? "text-[#FFA41C]" : "text-[#e77600]"}>★</span>
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

//   const handleVariantSelect = (variantName, optionName) => {
//     setSelectedVariants(prev => ({ ...prev, [variantName]: optionName }));
//     const isColorVariant = variantName.toLowerCase().includes('color') || variantName.toLowerCase().includes('colour');
//     if (isColorVariant) {
//       const variant = product.variants.find(v => v.name === variantName);
//       if (variant) {
//         const optionIndex = variant.options.findIndex(o => o.name === optionName);
//         if (optionIndex !== -1 && product.images[optionIndex]) {
//           setMainImage(product.images[optionIndex]);
//         }
//       }
//     }
//   };
  
//   const handleAddToCart = () => { 
//     addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants, quantity }); 
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 3000);
//   };

//   const handleBuyNow = () => {
//     addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants, quantity });
//     router.push('/cart');
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return; 
    
//     setReviewSubmitLoading(true);
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
//         rating, comment, userId: user?._id || user?.user?._id, userName: user?.name || user?.user?.name || 'Customer'
//       });
      
//       setShowReviewSuccess(true);
//       setComment(''); 
//       setRating(5);
//       setTimeout(() => setShowReviewSuccess(false), 5000);
//     } catch (error) { 
//       alert("Error submitting review. Please try again."); 
//     } finally { 
//       setReviewSubmitLoading(false); 
//     }
//   };

//   const sortedReviews = [...(product.reviews?.filter(r => r.isApproved) || [])].sort((a, b) => {
//     if (reviewSort === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
//     return b.rating - a.rating; 
//   });

//   const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer transition-colors";
//   const amzButtonYellow = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-2 text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer font-medium";
//   const amzButtonOrange = "w-full bg-[#FFA41C] hover:bg-[#FF9900] border border-[#FF8F00] rounded-full py-2 text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer font-medium";

//   const renderDeliveryWidget = () => (
//     <div className="mb-4">
//       <div className="flex items-start gap-2">
//         <span className="text-[16px] mt-0.5">📍</span>
//         <div className="flex flex-col">
//           {pincodeStatus === 'success' ? (
//             <div 
//               className="text-[12px] text-[#007185] font-bold cursor-pointer hover:text-[#C45500] hover:underline" 
//               onClick={() => setPincodeStatus(null)}
//             >
//               Delivering to {deliveryLocation} {pincode} - Update location
//             </div>
//           ) : (
//             <span className="text-[12px] text-[#007185] font-bold">Select delivery location</span>
//           )}
          
//           {pincodeStatus !== 'success' && (
//             <div className="flex mt-2 gap-2">
//               <input 
//                 type="text" 
//                 maxLength="6" 
//                 placeholder="Enter Pincode" 
//                 className="border border-[#888C8C] rounded-[4px] px-2 py-1 text-[13px] w-24 outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600]" 
//                 value={pincode} 
//                 onChange={e => setPincode(e.target.value.replace(/\D/g, ''))} 
//               />
//               <button 
//                 onClick={handlePincodeCheck} 
//                 disabled={pincodeStatus === 'loading'}
//                 className={`border border-[#D5D9D9] px-3 py-1 rounded-[4px] text-[12px] shadow-sm font-medium transition-colors ${pincodeStatus === 'loading' ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-[#F7FAFA]'}`}
//               >
//                 {pincodeStatus === 'loading' ? 'Checking...' : 'Apply'}
//               </button>
//             </div>
//           )}
//           {pincodeStatus === 'error' && <p className="text-[#B12704] text-[11px] mt-1 font-bold">Please enter a valid Indian pincode.</p>}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white font-sans text-[#0F1111] selection:bg-[#FEF8F2] pb-24 lg:pb-0 relative">
      
//       {isAdded && (
//         <div className="fixed top-20 right-4 z-[200] bg-[#e7f4e4] border border-[#007600] p-4 rounded shadow-lg animate-in slide-in-from-right duration-300">
//            <p className="text-[#007600] font-bold flex items-center gap-2">✓ Added to Cart</p>
//         </div>
//       )}

//       {/* Breadcrumb */}
//       <div className="max-w-[1500px] mx-auto px-4 py-3 text-[12px] text-[#565959] overflow-x-auto whitespace-nowrap">
//         <Link href="/" className={amzLink}>Home</Link> › <span className={amzLink}>{product.category}</span> › <span className={amzLink}>{product.brand}</span>
//       </div>

//       <div className="max-w-[1500px] mx-auto px-4 flex flex-col lg:flex-row gap-4 lg:gap-10 pb-10">
        
//         {/* ================= COLUMN 1: GALLERY ================= */}
//         <div className="w-full lg:w-[40%] flex flex-col-reverse lg:flex-row gap-4 h-fit lg:sticky lg:top-24">
          
//           {/* Desktop Thumbnail List */}
//           {product.images?.length > 1 && (
//             <div className="hidden lg:flex flex-col gap-2 w-auto">
//               {product.images.map((img, index) => (
//                 <div 
//                   key={index} 
//                   onMouseEnter={() => setMainImage(img)} 
//                   className={`h-12 w-12 border rounded-[3px] cursor-pointer flex-shrink-0 p-1 flex items-center justify-center ${mainImage === img ? 'border-[#e77600] shadow-[0_0_3px_#e77600]' : 'border-[#DDD] hover:border-[#e77600]'}`}
//                 >
//                   <img src={getImageUrl(img)} alt="thumb" className="max-h-full max-w-full object-contain mix-blend-multiply" />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Main Image View */}
//           <div className="flex-1 bg-white flex items-center justify-center min-h-[300px] lg:min-h-[500px] p-4 relative">
//             <img src={getImageUrl(mainImage)} alt={product.name} className="max-h-[350px] lg:max-h-[500px] w-full object-contain cursor-zoom-in" />
//           </div>

//           {/* Mobile Swipeable Gallery */}
//           {product.images?.length > 1 && (
//             <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-2 pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
//               {product.images.map((img, index) => (
//                 <div 
//                   key={index} 
//                   onClick={() => setMainImage(img)} 
//                   className={`snap-center shrink-0 w-[60px] h-[60px] border rounded-[3px] p-1 flex items-center justify-center ${mainImage === img ? 'border-[#e77600] shadow-[0_0_3px_#e77600]' : 'border-[#DDD]'}`}
//                 >
//                   <img src={getImageUrl(img)} alt="thumb" className="max-h-full max-w-full object-contain mix-blend-multiply" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ================= COLUMN 2: CENTER INFO ================= */}
//         <div className="w-full lg:w-[35%] flex flex-col border-b lg:border-none pb-6 lg:pb-0">
//           <h1 className="text-[20px] lg:text-[24px] leading-tight font-medium mb-1">{product.name}</h1>
//           <Link href={`/?search=${product.brand}`} className={`${amzLink} text-[14px]`}>Visit the {product.brand} Store</Link>

//           <div className="flex items-center gap-3 mt-2 border-b border-[#EEE] pb-2">
//             <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
//               <span className="text-[#FFA41C] text-[18px]">{renderStars(product.ratings)}</span>
//               <span className={`${amzLink} text-[14px] ml-2`}>{product.numOfReviews} ratings</span>
//             </div>
//           </div>

//           <div className="py-4 space-y-1">
//              {finalDiscountPrice ? (
//                <>
//                 <div className="flex items-center gap-2">
//                    <span className="text-[24px] lg:text-[28px] font-light text-[#CC0C39]">-{discountPercentage}%</span>
//                    <div className="flex items-start text-[24px] lg:text-[28px] font-medium">
//                       <span className="text-[14px] mt-1.5 mr-0.5">₹</span>
//                       {finalDiscountPrice.toLocaleString('en-IN')}
//                    </div>
//                 </div>
//                 <div className="text-[13px] text-[#565959]">M.R.P.: <span className="line-through">₹{finalPrice.toLocaleString('en-IN')}</span></div>
//                </>
//              ) : (
//                 <div className="flex items-start text-[24px] lg:text-[28px] font-medium">
//                   <span className="text-[14px] mt-1.5 mr-0.5">₹</span>
//                   {finalPrice.toLocaleString('en-IN')}
//                 </div>
//              )}
//              <p className="text-[14px] font-bold mt-2">Inclusive of all taxes</p>
//           </div>

//           {/* 🚀 Mobile Pincode Widget */}
//           <div className="block lg:hidden mt-2">
//             {renderDeliveryWidget()}
//           </div>

//           {/* Variants */}
//           {product.variants?.map((v, i) => (
//             <div key={i} className="mb-4">
//                <p className="text-[14px] mb-2 font-bold">{v.name}: <span className="font-normal">{selectedVariants[v.name]}</span></p>
//                <div className="flex flex-wrap gap-2">
//                   {v.options.map((opt, idx) => (
//                     <button 
//                       key={idx} 
//                       onClick={() => handleVariantSelect(v.name, opt.name)}
//                       className={`px-3 py-1.5 text-[13px] border rounded-[4px] transition-all whitespace-nowrap ${selectedVariants[v.name] === opt.name ? 'border-[#e77600] bg-[#FEF8F2] shadow-[0_0_0_1px_#e77600]' : 'border-[#D5D9D9] bg-white hover:bg-gray-50'}`}
//                     >
//                       {opt.name}
//                     </button>
//                   ))}
//                </div>
//             </div>
//           ))}

//           {/* Technical Specs Grid */}
//           {product.specs && product.specs.length > 0 && (
//             <div className="mt-4 pt-4 border-t border-[#EEE]">
//                <table className="w-full text-[14px] text-left">
//                   <tbody>
//                     {product.specs.map((spec, i) => (
//                       <tr key={i}>
//                         <td className="py-1 pr-4 font-bold text-[#111] w-1/3 align-top">{spec.name}</td>
//                         <td className="py-1 text-[#111] align-top">{spec.value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                </table>
//             </div>
//           )}

//           {/* About this item */}
//           <div className="mt-4 pt-4 border-t border-[#EEE]">
//              <h3 className="font-bold text-[16px] mb-2">About this item</h3>
//              <ul className="list-disc pl-5 space-y-1.5 text-[14px] leading-relaxed text-[#111]">
//                {product.features?.map((f, i) => <li key={i}>{f}</li>)}
//              </ul>
//           </div>
//         </div>

//         {/* ================= COLUMN 3: BUY BOX (Desktop) ================= */}
//         <div className="w-full lg:w-[20%] hidden lg:block">
//           <div className="border border-[#D5D9D9] rounded-[8px] p-5 lg:sticky lg:top-24 bg-white">
//              <div className="flex items-start text-[24px] font-normal mb-2">
//                 <span className="text-[13px] mt-1 mr-0.5">₹</span>
//                 {currentActivePrice.toLocaleString('en-IN')}
//              </div>
             
//              <div className="text-[14px] space-y-1 mb-4">
//                 <p className={amzLink}>FREE delivery <span className="font-bold">{dynamicDeliveryDate}</span></p>
//                 <p>Order within <span className="text-[#007600] font-medium">{timeLeft}</span></p>
//              </div>

//              {/* 🚀 Desktop Pincode Widget */}
//              {renderDeliveryWidget()}

//              <p className={`text-[18px] mb-4 ${product.stock > 0 ? 'text-[#007600]' : 'text-[#B12704]'}`}>
//                 {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
//              </p>

//              {product.stock > 0 && (
//                <div className="space-y-3">
//                   <select 
//                     value={quantity} 
//                     onChange={(e) => setQuantity(Number(e.target.value))}
//                     className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-[7px] text-[13px] px-2 py-1 shadow-sm focus:border-[#e77600] outline-none cursor-pointer w-full hover:bg-[#E3E6E6]"
//                   >
//                     {[...Array(Math.min(10, product.stock)).keys()].map(n => <option key={n+1} value={n+1}>Qty: {n+1}</option>)}
//                   </select>

//                   <button onClick={handleAddToCart} className={amzButtonYellow}>Add to Cart</button>
//                   <button onClick={handleBuyNow} className={amzButtonOrange}>Buy Now</button>
//                </div>
//              )}

//              <div className="mt-4 pt-4 border-t border-[#EEE] text-[12px] space-y-1">
//                 <div className="flex justify-between"><span className="text-[#565959]">Ships from</span><span>Amazon Smarts</span></div>
//                 <div className="flex justify-between"><span className="text-[#565959]">Sold by</span><span className={amzLink}>{product.brand}</span></div>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= LOWER SECTIONS ================= */}
//       <div className="max-w-[1500px] mx-auto px-4 border-t border-[#EEE] pt-10">
          
//           {/* A+ Content */}
//           {product.banners?.length > 0 && (
//             <div className="mb-12">
//                <h2 className="text-[22px] font-bold text-[#C60] mb-4">From the manufacturer</h2>
//                <div className="space-y-6">
//                   {product.banners.map((b, i) => (
//                     <div key={i} className="border-b border-[#EEE] pb-6 last:border-0">
//                         <img src={getImageUrl(b)} alt="Manufacturer Info" className="w-full h-auto rounded-[4px] shadow-sm" />
//                     </div>
//                   ))}
//                </div>
//             </div>
//           )}

//           <div className="mb-12">
//              <h2 className="text-[20px] lg:text-[22px] font-bold text-[#C60] mb-4">Product Description</h2>
//              <p className="text-[14px] leading-relaxed whitespace-pre-wrap max-w-4xl text-[#333]">{product.description}</p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 border-t border-[#EEE] pt-10 pb-20">
             
//              {/* Review Form */}
//              <div>
//                 <h2 className="text-[20px] font-bold mb-2">Customer reviews</h2>
//                 <div className="flex items-center gap-2 mb-4">
//                    <span className="text-[#FFA41C] text-lg">{renderStars(product.ratings)}</span>
//                    <span className="text-[16px] font-medium">{product.ratings} out of 5</span>
//                 </div>
                
//                 <div className="border border-[#D5D9D9] rounded-[8px] p-5 bg-[#F7Fafa]/50 shadow-sm">
//                    <h3 className="font-bold text-[14px] mb-1">Review this product</h3>
//                    <p className="text-[13px] mb-4 text-[#565959]">Share your thoughts with other customers</p>
                   
//                    {showReviewSuccess ? (
//                      <div className="bg-[#e7f4e4] border border-[#007600] rounded-[4px] p-4 text-center shadow-sm">
//                         <span className="text-[#007600] text-3xl mb-1 block">✓</span>
//                         <h4 className="font-bold text-[#007600] mb-1">Review Submitted!</h4>
//                         <p className="text-[13px] text-[#111] leading-snug">Thank you for your feedback. Your review has been sent to our moderation team and will be published shortly.</p>
//                      </div>
//                    ) : user ? (
//                      <form onSubmit={submitReview} className="space-y-3">
//                         <select className="w-full p-2 border border-[#888C8C] rounded-[3px] text-[13px] bg-white outline-none focus:border-[#e77600]" value={rating} onChange={(e) => setRating(e.target.value)}>
//                            <option value="5">5 Stars - Excellent</option>
//                            <option value="4">4 Stars - Good</option>
//                            <option value="3">3 Stars - Average</option>
//                            <option value="2">2 Stars - Poor</option>
//                            <option value="1">1 Star - Terrible</option>
//                         </select>
//                         <textarea className="w-full p-2 border border-[#888C8C] rounded-[3px] text-[13px] h-24 outline-none focus:border-[#e77600] resize-none" placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} required />
//                         <button type="submit" disabled={reviewSubmitLoading} className="w-full bg-white border border-[#D5D9D9] hover:bg-[#F7FAFA] py-1.5 rounded-[8px] text-[13px] shadow-sm font-medium transition-colors">
//                            {reviewSubmitLoading ? 'Submitting...' : 'Write a customer review'}
//                         </button>
//                      </form>
//                    ) : (
  
//   <Link href={`/login?redirect=/product/${id}`}>
//     <button className="w-full bg-white border border-[#D5D9D9] hover:bg-[#F7FAFA] py-2 rounded-[8px] text-[13px] shadow-sm font-bold text-[#111] transition-colors">
//       Sign in or Register to write a review
//     </button>
//   </Link>
// )}
//                 </div>
//              </div>
             
//              {/* Reviews List with Sorting */}
//              <div className="lg:col-span-2">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-[20px] font-bold">Top reviews from India</h2>
//                   <select 
//                     value={reviewSort} 
//                     onChange={(e) => setReviewSort(e.target.value)} 
//                     className="border border-[#D5D9D9] rounded-[8px] bg-[#F0F2F2] text-[13px] px-3 py-1.5 outline-none focus:border-[#e77600] shadow-sm cursor-pointer hover:bg-[#E3E6E6]"
//                   >
//                     <option value="top">Top reviews</option>
//                     <option value="recent">Most recent</option>
//                   </select>
//                 </div>
                
//                 <div className="space-y-8">
//                    {sortedReviews.length > 0 ? (
//                      sortedReviews.map((r, i) => (
//                         <div key={i} className="border-b border-[#EEE] pb-6 last:border-0">
//                            <div className="flex items-center gap-2 mb-1">
//                               <div className="w-8 h-8 bg-[#F0F2F2] rounded-full flex items-center justify-center text-gray-500 border border-[#D5D9D9]">👤</div>
//                               <span className="text-[13px] font-medium">{r.name}</span>
//                            </div>
//                            <div className="flex items-center gap-2 mt-1">
//                               <span className="text-[#FFA41C] text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
//                               <span className="text-[13px] font-bold text-[#C45500]">Verified Purchase</span>
//                            </div>
//                            <p className="text-[12px] text-[#565959] mt-1">Reviewed in India on {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
//                            <p className="text-[14px] mt-2 leading-relaxed text-[#111]">{r.comment}</p>
//                         </div>
//                       ))
//                    ) : (
//                      <p className="text-[14px] text-gray-500 italic">No reviews yet. Be the first to review!</p>
//                    )}
//                 </div>
//              </div>
//           </div>
//       </div>

//       {/* STICKY BOTTOM BAR FOR MOBILE */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D5D9D9] p-3 z-50 lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex gap-3">
//         <button onClick={handleAddToCart} className={amzButtonYellow + " flex-1 !py-3 !text-[14px]"}>Add to Cart</button>
//         <button onClick={handleBuyNow} className={amzButtonOrange + " flex-1 !py-3 !text-[14px]"}>Buy Now</button>
//       </div>

//     </div>
//   );
// }


// src/app/product/[id]/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [timeLeft, setTimeLeft] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // 🚀 Text Expand States
  const [isExpandedDesc, setIsExpandedDesc] = useState(false);
  const [isExpandedFeatures, setIsExpandedFeatures] = useState(false);

  // 🚀 Pincode & Delivery States
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(''); 
  const [dynamicDeliveryDate, setDynamicDeliveryDate] = useState(
    new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })
  );

  // 🚀 Review & Eligibility States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);
  const [reviewSort, setReviewSort] = useState('top');
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // Strict Review Checks
  const [eligibleToReview, setEligibleToReview] = useState(false);
  const [reviewEligibilityMsg, setReviewEligibilityMsg] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/500x500?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath; 
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${imagePath}`;
  };

  // 1. Fetch Product
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

  // 2. CHECK REVIEW ELIGIBILITY
  useEffect(() => {
    const checkReviewEligibility = async () => {
      if (!user || !product) return;
      const userId = user?._id || user?.user?._id;

      const alreadyReviewed = product.reviews?.some(r => r.userId === userId);
      if (alreadyReviewed) {
         setHasReviewed(true);
         setReviewEligibilityMsg("You have already submitted a review for this product.");
         return;
      }

      try {
         const { data: orders } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`);
         
         const hasDeliveredOrder = orders.some(order => 
           order.status === 'Delivered' && 
           order.orderItems.some(item => (item.product?._id || item.product) === id)
         );

         const hasPendingOrder = orders.some(order => 
           order.status !== 'Delivered' && order.status !== 'Cancelled' &&
           order.orderItems.some(item => (item.product?._id || item.product) === id)
         );

         if (hasDeliveredOrder) {
           setEligibleToReview(true);
         } else if (hasPendingOrder) {
           setEligibleToReview(false);
           setReviewEligibilityMsg("You can review this product after it has been delivered.");
         } else {
           setEligibleToReview(false);
           setReviewEligibilityMsg("You must purchase this product to write a review.");
         }
      } catch (err) {
         console.error("Error checking orders", err);
      }
    };

    checkReviewEligibility();
  }, [user, product, id]);

  // Delivery Timer
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

  const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 🚀 DUAL-API PINCODE CHECKER
  const handlePincodeCheck = async () => {
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPincodeStatus('error');
      return;
    }
    setPincodeStatus('loading');
    
    try {
      // 🚀 ATTEMPT 1: Try Zippopotam for exact coordinates
      try {
        const { data } = await axios.get(`https://api.zippopotam.us/in/${pincode}`);
        const place = data.places[0];
        const targetLat = parseFloat(place.latitude);
        const targetLon = parseFloat(place.longitude);
        
        setDeliveryLocation(place['place name']);
        setPincodeStatus('success');

        const WAREHOUSE_LAT = 30.704649; // Mohali
        const WAREHOUSE_LON = 76.717873;
        const distanceInKm = calculateDistanceKm(WAREHOUSE_LAT, WAREHOUSE_LON, targetLat, targetLon);

        let daysToDeliver = distanceInKm < 100 ? 1 : distanceInKm < 500 ? 3 : distanceInKm < 1500 ? 5 : 7; 
        setDynamicDeliveryDate(new Date(Date.now() + daysToDeliver * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }));
        return; // Success! Exit function.
      } catch (zipError) {
        console.log("Zippopotam failed, trying official Indian Post API...");
      }

      // 🚀 ATTEMPT 2: Fallback to Official Indian Postal API
      const { data } = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      
      if (data && data[0].Status === 'Success') {
        const postOffice = data[0].PostOffice[0];
        // Set location name using District or Block
        setDeliveryLocation(postOffice.District || postOffice.Block || postOffice.Name);
        setPincodeStatus('success');
        
        // Since we don't have GPS coordinates, we estimate based on the State
        const isLocal = postOffice.State === "Punjab" || postOffice.State === "Chandigarh" || postOffice.State === "Haryana" || postOffice.State === "Himachal Pradesh";
        const daysToDeliver = isLocal ? 2 : 5; // 2 days for local north, 5 days for rest of India
        
        setDynamicDeliveryDate(new Date(Date.now() + daysToDeliver * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }));
      } else {
        // If even the official API says it's fake, it's definitely a bad pincode.
        throw new Error("Invalid Pincode");
      }

    } catch (err) {
      setPincodeStatus('error');
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#e7e7e7] border-t-[#e77600] rounded-full animate-spin"></div></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center font-bold bg-white text-2xl text-[#111]">Product not found.</div>;

  const renderStars = (ratingValue) => Array.from({ length: 5 }, (_, i) => <span key={i} className={i < Math.round(ratingValue) ? "text-[#FFA41C]" : "text-[#e77600]"}>★</span>);

  let extraPrice = 0;
  if (product.variants) {
    product.variants.forEach(v => {
      const optObj = v.options.find(o => o.name === selectedVariants[v.name]);
      if (optObj && optObj.priceModifier) extraPrice += optObj.priceModifier;
    });
  }

  const finalPrice = product.price + extraPrice;
  const finalDiscountPrice = product.discountPrice ? product.discountPrice + extraPrice : null;
  const currentActivePrice = finalDiscountPrice || finalPrice;
  const discountPercentage = finalDiscountPrice ? Math.round(((finalPrice - finalDiscountPrice) / finalPrice) * 100) : 0;

  const handleVariantSelect = (variantName, optionName) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: optionName }));
    if (variantName.toLowerCase().includes('color') || variantName.toLowerCase().includes('colour')) {
      const variant = product.variants.find(v => v.name === variantName);
      if (variant) {
        const optionIndex = variant.options.findIndex(o => o.name === optionName);
        if (optionIndex !== -1 && product.images[optionIndex]) setMainImage(product.images[optionIndex]);
      }
    }
  };
  
  const handleAddToCart = () => { 
    addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants, quantity }); 
    setIsAdded(true); setTimeout(() => setIsAdded(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, price: finalPrice, discountPrice: finalDiscountPrice, selectedOptions: selectedVariants, quantity });
    router.push('/cart');
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return; 
    
    setReviewSubmitLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/reviews`, {
        rating, comment, userId: user?._id || user?.user?._id, userName: user?.name || user?.user?.name || 'Customer'
      });
      
      setShowReviewSuccess(true);
      setComment(''); 
      setRating(5);
      
      setHasReviewed(true);
      setReviewEligibilityMsg("You have already submitted a review for this product.");
      
      setTimeout(() => { setShowReviewSuccess(false); setShowReviewModal(false); }, 3500);
    } catch (error) { alert("Error submitting review. Please try again."); } finally { setReviewSubmitLoading(false); }
  };

  const sortedReviews = [...(product.reviews?.filter(r => r.isApproved) || [])].sort((a, b) => reviewSort === 'recent' ? new Date(b.createdAt) - new Date(a.createdAt) : b.rating - a.rating);

  const amzLink = "text-[#007185] hover:text-[#C45500] hover:underline cursor-pointer transition-colors";
  const amzButtonYellow = "w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-2 text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer font-medium";
  const amzButtonOrange = "w-full bg-[#FFA41C] hover:bg-[#FF9900] border border-[#FF8F00] rounded-full py-2 text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer font-medium";

  const renderDeliveryWidget = () => (
    <div className="mb-4">
      <div className="flex items-start gap-2">
        <span className="text-[16px] mt-0.5">📍</span>
        <div className="flex flex-col">
          {pincodeStatus === 'success' ? (
            <div className="text-[12px] text-[#007185] font-bold cursor-pointer hover:text-[#C45500] hover:underline" onClick={() => setPincodeStatus(null)}>
              Delivering to {deliveryLocation} {pincode} - Update location
            </div>
          ) : <span className="text-[12px] text-[#007185] font-bold">Select delivery location</span>}
          
          {pincodeStatus !== 'success' && (
            <div className="flex mt-2 gap-2">
              <input type="text" maxLength="6" placeholder="Enter Pincode" className="border border-[#888C8C] rounded-[4px] px-2 py-1 text-[13px] w-24 outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600]" value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, ''))} />
              <button onClick={handlePincodeCheck} disabled={pincodeStatus === 'loading'} className={`border border-[#D5D9D9] px-3 py-1 rounded-[4px] text-[12px] shadow-sm font-medium transition-colors ${pincodeStatus === 'loading' ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-[#F7FAFA]'}`}>
                {pincodeStatus === 'loading' ? 'Checking...' : 'Apply'}
              </button>
            </div>
          )}
          {pincodeStatus === 'error' && <p className="text-[#B12704] text-[11px] mt-1 font-bold">Please enter a valid Indian pincode.</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F1111] selection:bg-[#FEF8F2] pb-24 lg:pb-0 relative">
      
      {isAdded && (
        <div className="fixed top-20 right-4 z-[200] bg-[#e7f4e4] border border-[#007600] p-4 rounded shadow-lg animate-in slide-in-from-right duration-300">
           <p className="text-[#007600] font-bold flex items-center gap-2">✓ Added to Cart</p>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-[1500px] mx-auto px-4 py-3 text-[12px] text-[#565959] overflow-x-auto whitespace-nowrap">
        <Link href="/" className={amzLink}>Home</Link> › <span className={amzLink}>{product.category}</span> › <span className={amzLink}>{product.brand}</span>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 flex flex-col lg:flex-row gap-4 lg:gap-10 pb-10">
        
        {/* ================= COLUMN 1: GALLERY ================= */}
        <div className="w-full lg:w-[40%] flex flex-col-reverse lg:flex-row gap-4 h-fit lg:sticky lg:top-24">
          {product.images?.length > 1 && (
            <div className="hidden lg:flex flex-col gap-2 w-auto">
              {product.images.map((img, index) => (
                <div key={index} onMouseEnter={() => setMainImage(img)} className={`h-12 w-12 border rounded-[3px] cursor-pointer flex-shrink-0 p-1 flex items-center justify-center ${mainImage === img ? 'border-[#e77600] shadow-[0_0_3px_#e77600]' : 'border-[#DDD] hover:border-[#e77600]'}`}>
                  <img src={getImageUrl(img)} alt="thumb" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          )}
          <div className="flex-1 bg-white flex items-center justify-center min-h-[300px] lg:min-h-[500px] p-4 relative">
            <img src={getImageUrl(mainImage)} alt={product.name} className="max-h-[350px] lg:max-h-[500px] w-full object-contain cursor-zoom-in" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-2 pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {product.images.map((img, index) => (
                <div key={index} onClick={() => setMainImage(img)} className={`snap-center shrink-0 w-[60px] h-[60px] border rounded-[3px] p-1 flex items-center justify-center ${mainImage === img ? 'border-[#e77600] shadow-[0_0_3px_#e77600]' : 'border-[#DDD]'}`}>
                  <img src={getImageUrl(img)} alt="thumb" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= COLUMN 2: CENTER INFO ================= */}
        <div className="w-full lg:w-[35%] flex flex-col border-b lg:border-none pb-6 lg:pb-0">
          <h1 className="text-[20px] lg:text-[24px] leading-tight font-medium mb-1">{product.name}</h1>
          <Link href={`/?search=${product.brand}`} className={`${amzLink} text-[14px]`}>Visit the {product.brand} Store</Link>

          <div className="flex items-center gap-3 mt-2 border-b border-[#EEE] pb-2">
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
              <span className="text-[#FFA41C] text-[18px]">{renderStars(product.ratings)}</span>
              <span className={`${amzLink} text-[14px] ml-2`}>{product.numOfReviews} ratings</span>
            </div>
          </div>

          <div className="py-4 space-y-1">
             {finalDiscountPrice ? (
               <>
                <div className="flex items-center gap-2">
                   <span className="text-[24px] lg:text-[28px] font-light text-[#CC0C39]">-{discountPercentage}%</span>
                   <div className="flex items-start text-[24px] lg:text-[28px] font-medium">
                      <span className="text-[14px] mt-1.5 mr-0.5">₹</span>
                      {finalDiscountPrice.toLocaleString('en-IN')}
                   </div>
                </div>
                <div className="text-[13px] text-[#565959]">M.R.P.: <span className="line-through">₹{finalPrice.toLocaleString('en-IN')}</span></div>
               </>
             ) : (
                <div className="flex items-start text-[24px] lg:text-[28px] font-medium">
                  <span className="text-[14px] mt-1.5 mr-0.5">₹</span>
                  {finalPrice.toLocaleString('en-IN')}
                </div>
             )}
             <p className="text-[14px] font-bold mt-2">Inclusive of all taxes</p>
          </div>

          <div className="block lg:hidden mt-2">{renderDeliveryWidget()}</div>

          {/* Variants */}
          {product.variants?.map((v, i) => (
            <div key={i} className="mb-4">
               <p className="text-[14px] mb-2 font-bold">{v.name}: <span className="font-normal">{selectedVariants[v.name]}</span></p>
               <div className="flex flex-wrap gap-2">
                  {v.options.map((opt, idx) => (
                    <button 
                      key={idx} onClick={() => handleVariantSelect(v.name, opt.name)}
                      className={`px-3 py-1.5 text-[13px] border rounded-[4px] transition-all whitespace-nowrap ${selectedVariants[v.name] === opt.name ? 'border-[#e77600] bg-[#FEF8F2] shadow-[0_0_0_1px_#e77600]' : 'border-[#D5D9D9] bg-white hover:bg-gray-50'}`}
                    >
                      {opt.name}
                    </button>
                  ))}
               </div>
            </div>
          ))}

          {/* Technical Specs */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#EEE]">
               <table className="w-full text-[14px] text-left">
                 <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={i}>
                        <td className="py-1 pr-4 font-bold text-[#111] w-1/3 align-top">{spec.name}</td>
                        <td className="py-1 text-[#111] align-top">{spec.value}</td>
                      </tr>
                    ))}
                 </tbody>
               </table>
            </div>
          )}

          {/* Feature Highlights (About this item) with Read More */}
          {product.features && product.features.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#EEE]">
               <h3 className="font-bold text-[16px] mb-2">About this item</h3>
               <ul className="list-disc pl-5 space-y-1.5 text-[14px] leading-relaxed text-[#111]">
                 {(isExpandedFeatures ? product.features : product.features.slice(0, 3)).map((f, i) => (
                   <li key={i}>{f}</li>
                 ))}
               </ul>
               {product.features.length > 3 && (
                 <button
                   onClick={() => setIsExpandedFeatures(!isExpandedFeatures)}
                   className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px] font-bold mt-2 flex items-center gap-1 focus:outline-none"
                 >
                   {isExpandedFeatures ? (
                     <><span>Show less</span><span className="text-[10px]">▲</span></>
                   ) : (
                     <><span>Show more</span><span className="text-[10px]">▼</span></>
                   )}
                 </button>
               )}
            </div>
          )}
        </div>

        {/* ================= COLUMN 3: BUY BOX ================= */}
        <div className="w-full lg:w-[20%] hidden lg:block">
          <div className="border border-[#D5D9D9] rounded-[8px] p-5 lg:sticky lg:top-24 bg-white">
             <div className="flex items-start text-[24px] font-normal mb-2">
                <span className="text-[13px] mt-1 mr-0.5">₹</span>{currentActivePrice.toLocaleString('en-IN')}
             </div>
             
             <div className="text-[14px] space-y-1 mb-4">
                <p className={amzLink}>FREE delivery <span className="font-bold">{dynamicDeliveryDate}</span></p>
                <p>Order within <span className="text-[#007600] font-medium">{timeLeft}</span></p>
             </div>

             {renderDeliveryWidget()}

             <p className={`text-[18px] mb-4 ${product.stock > 0 ? 'text-[#007600]' : 'text-[#B12704]'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
             </p>

             {product.stock > 0 && (
               <div className="space-y-3">
                  <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-[7px] text-[13px] px-2 py-1 shadow-sm focus:border-[#e77600] outline-none cursor-pointer w-full hover:bg-[#E3E6E6]">
                    {[...Array(Math.min(10, product.stock)).keys()].map(n => <option key={n+1} value={n+1}>Qty: {n+1}</option>)}
                  </select>
                  <button onClick={handleAddToCart} className={amzButtonYellow}>Add to Cart</button>
                  <button onClick={handleBuyNow} className={amzButtonOrange}>Buy Now</button>
               </div>
             )}

             <div className="mt-4 pt-4 border-t border-[#EEE] text-[12px] space-y-1">
                <div className="flex justify-between"><span className="text-[#565959]">Ships from</span><span>Amazon Smarts</span></div>
                <div className="flex justify-between"><span className="text-[#565959]">Sold by</span><span className={amzLink}>{product.brand}</span></div>
             </div>
          </div>
        </div>
      </div>

      {/* ================= LOWER SECTIONS ================= */}
      <div className="max-w-[1500px] mx-auto px-4 border-t border-[#EEE] pt-10">
          
          {product.banners?.length > 0 && (
            <div className="mb-12">
               <h2 className="text-[22px] font-bold text-[#C60] mb-4">From the manufacturer</h2>
               <div className="space-y-6">
                  {product.banners.map((b, i) => (
                    <div key={i} className="border-b border-[#EEE] pb-6 last:border-0"><img src={getImageUrl(b)} alt="Manufacturer Info" className="w-full h-auto rounded-[4px] shadow-sm" /></div>
                  ))}
               </div>
            </div>
          )}

          {/* Product Description with Read More */}
          <div className="mb-12">
             <h2 className="text-[20px] lg:text-[22px] font-bold text-[#C60] mb-4">Product Description</h2>
             {(() => {
               if (!product.description) return null;
               const words = product.description.split(/\s+/);
               const limit = 50;

               if (words.length <= limit) return <p className="text-[14px] leading-relaxed whitespace-pre-wrap max-w-4xl text-[#333]">{product.description}</p>;

               const displayedText = isExpandedDesc ? product.description : words.slice(0, limit).join(' ') + '...';

               return (
                 <div>
                   <p className="text-[14px] leading-relaxed whitespace-pre-wrap max-w-4xl text-[#333]">{displayedText}</p>
                   <button onClick={() => setIsExpandedDesc(!isExpandedDesc)} className="text-[#007185] hover:text-[#C45500] hover:underline text-[14px] font-bold mt-2 flex items-center gap-1 focus:outline-none">
                     {isExpandedDesc ? <><span>Read less</span><span className="text-[10px]">▲</span></> : <><span>Read more</span><span className="text-[10px]">▼</span></>}
                   </button>
                 </div>
               );
             })()}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 border-t border-[#EEE] pt-10 pb-20">
             
             {/* Review Trigger Card with Restrictions */}
             <div>
                <h2 className="text-[20px] font-bold mb-2">Customer reviews</h2>
                <div className="flex items-center gap-2 mb-4">
                   <span className="text-[#FFA41C] text-lg">{renderStars(product.ratings)}</span>
                   <span className="text-[16px] font-medium">{product.ratings} out of 5</span>
                </div>
                
                <div className="border border-[#D5D9D9] rounded-[8px] p-5 bg-[#F7Fafa]/50 shadow-sm">
                   <h3 className="font-bold text-[14px] mb-1">Review this product</h3>
                   <p className="text-[13px] mb-4 text-[#565959]">Share your thoughts with other customers</p>
                   
                   {!user ? (
                     <button 
                       onClick={() => router.push(`/login?redirect=/product/${id}`)}
                       className="w-full bg-white border border-[#D5D9D9] hover:bg-[#F7FAFA] py-2 rounded-[8px] text-[13px] shadow-sm font-bold text-[#111] transition-colors"
                     >
                       Sign in to write a review
                     </button>
                   ) : hasReviewed || !eligibleToReview ? (
                     <div className="bg-white border border-[#ddd] p-3 rounded-[4px] flex gap-2 items-start shadow-sm">
                        <span className="text-[#007185] font-bold text-lg leading-none">ℹ</span>
                        <p className="text-[12px] text-[#565959]">{reviewEligibilityMsg}</p>
                     </div>
                   ) : (
                     <button 
                       onClick={() => setShowReviewModal(true)}
                       className="w-full bg-white border border-[#D5D9D9] hover:bg-[#F7FAFA] py-2 rounded-[8px] text-[13px] shadow-sm font-bold text-[#111] transition-colors"
                     >
                       Write a customer review
                     </button>
                   )}
                </div>
             </div>
             
             <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[20px] font-bold">Top reviews from India</h2>
                  <select 
                    value={reviewSort} onChange={(e) => setReviewSort(e.target.value)} 
                    className="border border-[#D5D9D9] rounded-[8px] bg-[#F0F2F2] text-[13px] px-3 py-1.5 outline-none focus:border-[#e77600] shadow-sm cursor-pointer hover:bg-[#E3E6E6]"
                  >
                    <option value="top">Top reviews</option>
                    <option value="recent">Most recent</option>
                  </select>
                </div>
                
                <div className="space-y-8">
                   {sortedReviews.length > 0 ? (
                     sortedReviews.map((r, i) => (
                        <div key={i} className="border-b border-[#EEE] pb-6 last:border-0">
                           <div className="flex items-center gap-2 mb-1">
                              <div className="w-8 h-8 bg-[#F0F2F2] rounded-full flex items-center justify-center text-gray-500 border border-[#D5D9D9]">👤</div>
                              <span className="text-[13px] font-medium">{r.name}</span>
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                              <span className="text-[#FFA41C] text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                              <span className="text-[13px] font-bold text-[#C45500]">Verified Purchase</span>
                           </div>
                           <p className="text-[12px] text-[#565959] mt-1">Reviewed in India on {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                           <p className="text-[14px] mt-2 leading-relaxed text-[#111]">{r.comment}</p>
                        </div>
                     ))
                   ) : (
                     <p className="text-[14px] text-gray-500 italic">No reviews yet. Be the first to review!</p>
                   )}
                </div>
             </div>
          </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D5D9D9] p-3 z-50 lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex gap-3">
        <button onClick={handleAddToCart} className={amzButtonYellow + " flex-1 !py-3 !text-[14px]"}>Add to Cart</button>
        <button onClick={handleBuyNow} className={amzButtonOrange + " flex-1 !py-3 !text-[14px]"}>Buy Now</button>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[300]">
          <div className="bg-white rounded-[8px] w-full max-w-[500px] shadow-xl border border-[#ddd] overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="bg-[#f3f3f3] border-b border-[#ddd] p-4 flex justify-between items-center">
              <h2 className="text-[18px] font-bold text-[#111]">Write a Review</h2>
              <button onClick={() => { setShowReviewModal(false); setShowReviewSuccess(false); }} className="text-[#555] hover:text-[#c40000] text-2xl leading-none">✕</button>
            </div>
            
            <div className="p-6">
              {showReviewSuccess ? (
                <div className="bg-[#e7f4e4] border border-[#007600] rounded-[4px] p-5 text-center shadow-sm">
                  <span className="text-[#007600] text-4xl mb-2 block">✓</span>
                  <h4 className="font-bold text-[#007600] text-[18px] mb-2">Review Submitted!</h4>
                  <p className="text-[14px] text-[#111] leading-snug">Thank you for your feedback. Your review has been sent to our moderation team and will be published shortly.</p>
                </div>
              ) : (
                <form onSubmit={submitReview} className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={getImageUrl(mainImage)} alt="product" className="w-12 h-12 object-contain mix-blend-multiply border border-[#ddd] rounded p-1" />
                    <p className="text-[14px] font-bold text-[#111] line-clamp-2 leading-tight">{product.name}</p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#111] mb-1">Overall rating</label>
                    <select className="w-full p-2.5 border border-[#888C8C] rounded-[4px] text-[14px] bg-white outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600] cursor-pointer" value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Poor</option>
                      <option value="1">1 Star - Terrible</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#111] mb-1">Add a written review</label>
                    <textarea className="w-full p-2.5 border border-[#888C8C] rounded-[4px] text-[14px] h-32 outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_#e77600] resize-none" placeholder="What did you like or dislike? What did you use this product for?" value={comment} onChange={(e) => setComment(e.target.value)} required />
                  </div>
                  
                  <button type="submit" disabled={reviewSubmitLoading} className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] py-2.5 rounded-[8px] text-[14px] shadow-sm font-bold text-[#111] transition-colors mt-2">
                    {reviewSubmitLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}