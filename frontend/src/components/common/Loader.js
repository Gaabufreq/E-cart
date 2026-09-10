import React from 'react';

export const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-brand-buy border-t-transparent rounded-full animate-spin"></div>
        <span className="text-white font-semibold text-sm tracking-wide">{text}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-8 h-8 border-3 border-brand-cart border-t-transparent rounded-full animate-spin"></div>
      <span className="text-slate-500 font-medium text-xs">{text}</span>
    </div>
  );
};