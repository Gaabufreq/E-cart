import React from 'react';

export const Button = ({
  children,
  variant = 'buy', // 'buy' | 'cart' | 'outline' | 'ghost' | 'danger'
  size = 'md',      // 'sm' | 'md' | 'lg'
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon: Icon,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    buy: 'bg-brand-buy hover:bg-orange-600 text-white shadow-md focus:ring-orange-500',
    cart: 'bg-brand-cart hover:bg-blue-600 text-white shadow-md focus:ring-blue-500',
    outline: 'border-2 border-slate-300 hover:border-slate-800 text-slate-800 bg-transparent focus:ring-slate-500',
    ghost: 'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-400',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-md focus:ring-rose-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};