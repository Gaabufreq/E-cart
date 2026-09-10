import React from 'react';

export const Badge = ({
  children,
  variant = 'accent', // 'accent' | 'buy' | 'cart' | 'danger' | 'neutral'
  className = '',
}) => {
  const variants = {
    accent: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    buy: 'bg-orange-100 text-orange-800 border-orange-200',
    cart: 'bg-blue-100 text-blue-800 border-blue-200',
    danger: 'bg-rose-100 text-rose-800 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};