import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getCartApi, addToCartApi, removeFromCartApi } from '../api/cart.api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalPrice: 0 });
      return;
    }
    try {
      setLoading(true);
      const res = await getCartApi();
      setCart(res.data || { items: [], totalPrice: 0 });
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await addToCartApi(productId, quantity);
    setCart(res.data);
    return res;
  };

  const removeFromCart = async (productId) => {
    const res = await removeFromCartApi(productId);
    setCart(res.data);
    return res;
  };

  const totalItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, fetchCart, totalItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};