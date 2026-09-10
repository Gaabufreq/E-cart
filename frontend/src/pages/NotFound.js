// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading font-extrabold text-6xl text-brand-buy mb-2">404</h1>
      <h2 className="font-heading font-bold text-xl text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-xs text-slate-500 mb-6">The page you are looking for does not exist or has been moved.</p>
      <Link to="/">
        <Button variant="buy">Return to Home</Button>
      </Link>
    </div>
  );
};