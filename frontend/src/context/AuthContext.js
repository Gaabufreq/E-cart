import React, { createContext, useState, useEffect } from 'react';
import { loginUserApi, registerUserApi, getUserProfileApi } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await getUserProfileApi();
          // Backend response envelope unwrapping:
          // API returns { success, source, data: { _id, name, email, role } }
          const profileData = res?.data?.data || res?.data || res;
          
          if (profileData && profileData.role) {
            setUser(profileData);
            localStorage.setItem('user', JSON.stringify(profileData));
          }
        } catch (error) {
          console.error('Auth sync failed:', error);
          logout();
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const res = await loginUserApi(credentials);
    
    // Unifying token & user extraction
    const authToken = res.data?.token || res.token;
    const userData = res.data?.user || res.user || res.data;

    if (authToken && userData) {
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await registerUserApi(userData);
    const authToken = res.data?.token || res.token;
    const registeredUser = res.data?.user || res.user || res.data;

    if (authToken && registeredUser) {
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      setToken(authToken);
      setUser(registeredUser);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};