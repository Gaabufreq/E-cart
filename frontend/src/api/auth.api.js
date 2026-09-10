import axiosInstance from './axiosInstance';

export const registerUserApi = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const loginUserApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const getUserProfileApi = async () => {
  const response = await axiosInstance.get('/auth/profile');
  return response.data;
};