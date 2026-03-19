// // src/context/CartContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Load from local storage on mount
//   useEffect(() => {
//     const storedCart = localStorage.getItem('gadgetStoreCart');
//     if (storedCart) {
//       try {
//         setCart(JSON.parse(storedCart));
//       } catch (error) {
//         console.error("Error parsing cart:", error);
//       }
//     }
//   }, []);

//   // Save to local storage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('gadgetStoreCart', JSON.stringify(cart));
//   }, [cart]);

//   // ADD TO CART
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       // Check if product with SAME options already exists
//       const existingItemIndex = prevCart.findIndex(item => 
//         item._id === product._id && 
//         JSON.stringify(item.selectedOptions) === JSON.stringify(product.selectedOptions)
//       );

//       if (existingItemIndex >= 0) {
//         // Increment quantity if it exists
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += 1;
//         return updatedCart;
//       }
      
//       // Add new item
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   // REMOVE FROM CART
//   const removeFromCart = (productId, selectedOptions) => {
//     setCart((prevCart) => prevCart.filter(item => 
//       !(item._id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
//     ));
//   };

//   // UPDATE QUANTITY
//   const updateQuantity = (productId, selectedOptions, newQuantity) => {
//     if (newQuantity < 1) return; // Prevent 0 or negative
//     setCart((prevCart) => prevCart.map(item => {
//       if (item._id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     }));
//   };

//   // CLEAR CART (Used after successful order)
//   const clearCart = () => setCart([]);

//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// // src/context/CartContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isInitialized, setIsInitialized] = useState(false);

//   // Load from local storage on mount
//   useEffect(() => {
//     const storedCart = localStorage.getItem('gadgetStoreCart');
//     if (storedCart) {
//       try {
//         setCart(JSON.parse(storedCart));
//       } catch (error) {
//         console.error("Error parsing cart:", error);
//       }
//     }
//     setIsInitialized(true);
//   }, []);

//   // Save to local storage whenever cart changes
//   useEffect(() => {
//     if (isInitialized) {
//       localStorage.setItem('gadgetStoreCart', JSON.stringify(cart));
//     }
//   }, [cart, isInitialized]);

//   // 🚀 HELPER: Safely compare options regardless of object key order
//   const serializeOptions = (opts) => {
//     if (!opts) return '';
//     return Object.keys(opts).sort().map(key => `${key}:${opts[key]}`).join('|');
//   };

//   // ADD TO CART
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const incomingOptionsStr = serializeOptions(product.selectedOptions);

//       // Check if product with SAME options already exists
//       const existingItemIndex = prevCart.findIndex(item => 
//         item._id === product._id && 
//         serializeOptions(item.selectedOptions) === incomingOptionsStr
//       );

//       // 🚀 FIXED: Respect the quantity passed from the Product Page (Default to 1)
//       const qtyToAdd = product.quantity ? parseInt(product.quantity, 10) : 1;

//       if (existingItemIndex >= 0) {
//         // Increment quantity if it exists
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += qtyToAdd;
//         return updatedCart;
//       }
      
//       // Add new item
//       return [...prevCart, { ...product, quantity: qtyToAdd }];
//     });
//   };

//   // REMOVE FROM CART
//   const removeFromCart = (productId, selectedOptions) => {
//     setCart((prevCart) => {
//       const targetOptionsStr = serializeOptions(selectedOptions);
//       return prevCart.filter(item => 
//         !(item._id === productId && serializeOptions(item.selectedOptions) === targetOptionsStr)
//       );
//     });
//   };

//   // UPDATE QUANTITY
//   const updateQuantity = (productId, selectedOptions, newQuantity) => {
//     if (newQuantity < 1) return; // Prevent 0 or negative
    
//     setCart((prevCart) => {
//       const targetOptionsStr = serializeOptions(selectedOptions);
//       return prevCart.map(item => {
//         if (item._id === productId && serializeOptions(item.selectedOptions) === targetOptionsStr) {
//           return { ...item, quantity: parseInt(newQuantity, 10) };
//         }
//         return item;
//       });
//     });
//   };

//   // CLEAR CART (Used after successful order)
//   const clearCart = () => setCart([]);

//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// src/context/CartContext.jsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]); // 🚀 NEW: State for Saved Items
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('gadgetStoreCart');
    const storedSaved = localStorage.getItem('gadgetStoreSaved'); // 🚀 Load saved items
    
    if (storedCart) {
      try { setCart(JSON.parse(storedCart)); } catch (error) { console.error("Error parsing cart:", error); }
    }
    if (storedSaved) {
      try { setSavedItems(JSON.parse(storedSaved)); } catch (error) { console.error("Error parsing saved items:", error); }
    }
    
    setIsInitialized(true);
  }, []);

  // Save to local storage whenever cart or savedItems change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('gadgetStoreCart', JSON.stringify(cart));
      localStorage.setItem('gadgetStoreSaved', JSON.stringify(savedItems)); // 🚀 Save to storage
    }
  }, [cart, savedItems, isInitialized]);

  // 🚀 HELPER: Safely compare options regardless of object key order
  const serializeOptions = (opts) => {
    if (!opts) return '';
    return Object.keys(opts).sort().map(key => `${key}:${opts[key]}`).join('|');
  };

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prevCart) => {
      const incomingOptionsStr = serializeOptions(product.selectedOptions);

      // Check if product with SAME options already exists
      const existingItemIndex = prevCart.findIndex(item => 
        item._id === product._id && 
        serializeOptions(item.selectedOptions) === incomingOptionsStr
      );

      // Respect the quantity passed from the Product Page (Default to 1)
      const qtyToAdd = product.quantity ? parseInt(product.quantity, 10) : 1;

      if (existingItemIndex >= 0) {
        // Increment quantity if it exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += qtyToAdd;
        return updatedCart;
      }
      
      // Add new item
      return [...prevCart, { ...product, quantity: qtyToAdd }];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (productId, selectedOptions) => {
    setCart((prevCart) => {
      const targetOptionsStr = serializeOptions(selectedOptions);
      return prevCart.filter(item => 
        !(item._id === productId && serializeOptions(item.selectedOptions) === targetOptionsStr)
      );
    });
  };

  // UPDATE QUANTITY
  const updateQuantity = (productId, selectedOptions, newQuantity) => {
    if (newQuantity < 1) return; // Prevent 0 or negative
    
    setCart((prevCart) => {
      const targetOptionsStr = serializeOptions(selectedOptions);
      return prevCart.map(item => {
        if (item._id === productId && serializeOptions(item.selectedOptions) === targetOptionsStr) {
          return { ...item, quantity: parseInt(newQuantity, 10) };
        }
        return item;
      });
    });
  };

  // CLEAR CART (Used after successful order)
  const clearCart = () => setCart([]);

  // ==========================================
  // 🚀 NEW: SAVE FOR LATER LOGIC
  // ==========================================

  // Save an item for later
  const saveForLater = (itemToSave) => {
    // 1. Add to saved items list (prevent duplicates)
    setSavedItems((prev) => {
      const incomingOptionsStr = serializeOptions(itemToSave.selectedOptions);
      const exists = prev.find(item => 
        item._id === itemToSave._id && 
        serializeOptions(item.selectedOptions) === incomingOptionsStr
      );
      if (exists) return prev; 
      
      // Reset quantity to 1 when saving for later, just like Amazon
      return [...prev, { ...itemToSave, quantity: 1 }];
    });

    // 2. Remove it from the active cart
    removeFromCart(itemToSave._id, itemToSave.selectedOptions);
  };

  // Move an item back to the active cart
  const moveToCart = (itemToMove) => {
    // 1. Add back to active cart
    addToCart({ ...itemToMove, quantity: 1 });
    
    // 2. Remove from saved items list
    removeFromSaved(itemToMove._id, itemToMove.selectedOptions);
  };

  // Permanently delete an item from the saved list
  const removeFromSaved = (productId, selectedOptions) => {
    setSavedItems((prev) => {
      const targetOptionsStr = serializeOptions(selectedOptions);
      return prev.filter(item => 
        !(item._id === productId && serializeOptions(item.selectedOptions) === targetOptionsStr)
      );
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, cartCount, savedItems, 
      addToCart, removeFromCart, updateQuantity, clearCart,
      saveForLater, moveToCart, removeFromSaved
    }}>
      {children}
    </CartContext.Provider>
  );
};