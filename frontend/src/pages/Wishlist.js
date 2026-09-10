import React from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { ProductCard } from '../components/product/ProductCard';
import { Loader } from '../components/common/Loader';
import { Heart } from 'lucide-react';

export const Wishlist = () => {
  const { wishlist, loading } = useWishlist();

  if (loading) return <Loader fullScreen text="Loading your wishlist..." />;

  const products = wishlist?.products || [];

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center">
          <Heart className="w-12 h-12 text-slate-300 mb-3" />
          <h2 className="font-heading font-bold text-lg text-slate-800 mb-1">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-500">Save items you like to view or purchase them later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-heading font-extrabold text-2xl text-slate-800 mb-6">Your Saved Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id || product} product={product} />
        ))}
      </div>
    </div>
  );
};