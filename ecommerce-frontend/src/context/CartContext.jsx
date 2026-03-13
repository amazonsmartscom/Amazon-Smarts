// src/context/CartContext.jsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('gadgetStoreCart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart:", error);
      }
    }
  }, []);

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('gadgetStoreCart', JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product with SAME options already exists
      const existingItemIndex = prevCart.findIndex(item => 
        item._id === product._id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(product.selectedOptions)
      );

      if (existingItemIndex >= 0) {
        // Increment quantity if it exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      
      // Add new item
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (productId, selectedOptions) => {
    setCart((prevCart) => prevCart.filter(item => 
      !(item._id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
    ));
  };

  // UPDATE QUANTITY
  const updateQuantity = (productId, selectedOptions, newQuantity) => {
    if (newQuantity < 1) return; // Prevent 0 or negative
    setCart((prevCart) => prevCart.map(item => {
      if (item._id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // CLEAR CART (Used after successful order)
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};