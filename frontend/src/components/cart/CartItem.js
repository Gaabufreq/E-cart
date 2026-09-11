import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const product = item.product;

  if (!product) return null;

  const productId = product._id || product;

  const handleIncrement = () => {
    updateQuantity(productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleRemove = () => {
    removeFromCart(productId);
  };

  const imageUrl = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://via.placeholder.com/80x80?text=Item';

  return (
    <div className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4 border-b border-slate-100 last:border-0">
      <img
        src={imageUrl}
        alt={product.title}
        className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 truncate mb-0.5 sm:mb-1">
          {product.title}
        </h4>
        <p className="text-xs font-extrabold text-slate-900">
          ₹{item.price?.toLocaleString('en-IN')}
        </p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={handleDecrement}
          className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition active:scale-95"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-xs font-bold text-slate-800 px-1">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="p-1 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition active:scale-95"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      <button
        onClick={handleRemove}
        className="p-1.5 sm:p-2 text-slate-400 hover:text-rose-500 transition"
        aria-label="Remove item"
      >
        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};