import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();
  const product = item.product;

  if (!product) return null;

  const handleIncrement = () => {
    addToCart(product._id || product, 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      // Re-add with negative logic or handle via remove/add API
      addToCart(product._id || product, -1);
    } else {
      removeFromCart(product._id || product);
    }
  };

  const handleRemove = () => {
    removeFromCart(product._id || product);
  };

  const imageUrl = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://via.placeholder.com/80x80?text=Item';

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={product.title}
        className="w-16 h-16 object-contain rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 truncate mb-1">
          {product.title}
        </h4>
        <p className="text-xs font-extrabold text-slate-900">
          ₹{item.price?.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={handleDecrement}
          className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-xs font-bold text-slate-800 px-1">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Delete Icon */}
      <button
        onClick={handleRemove}
        className="p-2 text-slate-400 hover:text-rose-500 transition"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};