import axiosInstance from './axiosInstance';

export const getWishlistApi = async () => {
  const response = await axiosInstance.get('/wishlist');
  return response.data;
};

export const toggleWishlistApi = async (productId) => {
  const response = await axiosInstance.post('/wishlist/toggle', { productId });
  return response.data;
};