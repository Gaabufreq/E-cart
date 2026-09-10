import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getWishlistApi, toggleWishlistApi } from '../api/wishlist.api';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist({ products: [] });
      return;
    }
    try {
      setLoading(true);
      const res = await getWishlistApi();
      setWishlist(res.data || { products: [] });
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggleWishlist = async (productId) => {
    const res = await toggleWishlistApi(productId);
    setWishlist(res.data);
    return res;
  };

  const isInWishlist = (productId) => {
    return wishlist?.products?.some((prod) => (prod._id || prod) === productId) || false;
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, toggleWishlist, isInWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};