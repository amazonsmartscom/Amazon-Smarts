// src/context/CartContext.jsx
'use client';
import { createContext, useContext, useState } from 'react';

// Create the Context
const CartContext = createContext();

// Create a custom hook to use the cart easily anywhere
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      if (existingItem) {
        // If it exists, increase the quantity by 1
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it's new, add it to the cart array with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    // Optional: You can add a little toast notification here later!
    alert(`${product.name} added to cart!`); 
  };

  // Calculate the total number of items in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};