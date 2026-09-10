import axiosInstance from './axiosInstance';

export const getAllProductsApi = async (search = '') => {
  const response = await axiosInstance.get(`/products?search=${encodeURIComponent(search)}`);
  return response.data;
};

export const getProductByIdApi = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

// Admin Endpoints (Multipart form data for image uploads)
export const createProductApi = async (formData) => {
  const response = await axiosInstance.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateProductApi = async (id, formData) => {
  const response = await axiosInstance.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};