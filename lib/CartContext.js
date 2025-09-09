'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getCart } from './cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const cartData = getCart();
      setCart(cartData);
      // Calculate total items count
      const totalItems = cartData.reduce((acc, item) => {
        return acc + (item.qty || item.quantity || 1);
      }, 0);
      setCartCount(totalItems);
    };

    loadCart();

    // Listen for storage changes (when cart is updated from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'cart_v1') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update cart count whenever cart changes
  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => {
      return acc + (item.qty || item.quantity || 1);
    }, 0);
    setCartCount(totalItems);
  }, [cart]);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
