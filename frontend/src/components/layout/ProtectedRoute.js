import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  // 1. Initial Auth Sync Complete Hone Tak Wait Karein
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="w-10 h-10 border-4 border-brand-buy border-t-transparent rounded-full animate-spin mb-2"></div>
        <span className="text-xs text-slate-400 font-semibold">Verifying Credentials...</span>
      </div>
    );
  }

  // 2. Unauthenticated User Redirection
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Robust Role Comparison
  const currentRole = user?.role ? String(user.role).toLowerCase().trim() : '';

  if (adminOnly && currentRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};