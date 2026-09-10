import axiosInstance from './axiosInstance';

export const checkoutOrderApi = async (shippingAddress) => {
  const response = await axiosInstance.post('/orders/checkout', { shippingAddress });
  return response.data;
};

export const verifyPaymentApi = async (paymentData) => {
  const response = await axiosInstance.post('/orders/verify', paymentData);
  return response.data;
};

export const getUserOrdersApi = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

// User Cancel API
export const cancelOrderApi = async (orderId) => {
  const response = await axiosInstance.patch(`/orders/cancel/${orderId}`);
  return response.data;
};

// Admin Endpoints
export const getAllOrdersAdminApi = async () => {
  const response = await axiosInstance.get('/orders/admin/all');
  return response.data;
};

export const updateOrderStatusAdminApi = async (orderId, status) => {
  const response = await axiosInstance.patch(`/orders/admin/${orderId}/status`, { status });
  return response.data;
};