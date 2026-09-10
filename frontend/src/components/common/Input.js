import React from 'react';

export const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  icon: Icon,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-brand-cart focus:ring-brand-cart'
          } ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-2.5 focus:outline-none focus:ring-1 transition disabled:bg-slate-100 disabled:cursor-not-allowed`}
        />
      </div>
      {error && <span className="text-xs font-medium text-rose-500 mt-0.5">{error}</span>}
    </div>
  );
};