import React from 'react';
import { ProductCard } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

export const ProductGrid = ({ products = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse flex flex-col gap-3"
          >
            <div className="w-full aspect-square bg-slate-200 rounded-xl"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-8 bg-slate-200 rounded-xl mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-slate-200 text-center px-4">
        <div className="bg-slate-100 p-4 rounded-full text-slate-400 mb-3">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-bold text-lg text-slate-800 mb-1">No Products Found</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Try clearing search filters or check back later for newly added items.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};