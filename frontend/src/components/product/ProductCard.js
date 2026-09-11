import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Zap, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { Badge } from '../common/Badge';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isWishlisted = isInWishlist(product._id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    await addToCart(product._id, 1);
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    await addToCart(product._id, 1);
    navigate('/checkout');
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    await toggleWishlist(product._id);
  };

  const primaryImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between group relative"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-3 sm:p-4">
          <img
            src={primaryImage}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
          />

          {/* Category Badge */}
          <span className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg backdrop-blur-md">
            {product.category}
          </span>

          {/* Wishlist Heart Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition shadow-md ${
              isWishlisted
                ? 'bg-rose-50 text-rose-500'
                : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Stock Overlay if out of stock */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <Badge variant="danger" className="text-[10px] sm:text-xs py-1 px-2.5">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-[11px] sm:text-xs font-bold text-slate-700">{product.ratings || 4.5}</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400">(128)</span>
          </div>

          <Link to={`/product/${product._id}`}>
            <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 hover:text-brand-cart transition leading-snug mb-1.5 sm:mb-2">
              {product.title}
            </h3>
          </Link>

          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 line-through">
              ₹{Math.round(product.price * 1.2)?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 sm:p-4 pt-0 grid grid-cols-2 gap-1.5 sm:gap-2">
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-brand-cart hover:text-white text-slate-800 font-semibold text-[11px] sm:text-xs py-2 px-2 sm:px-3 rounded-xl transition disabled:opacity-50"
        >
          <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Add
        </button>

        <button
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          className="flex items-center justify-center gap-1 bg-brand-buy hover:bg-orange-600 text-white font-semibold text-[11px] sm:text-xs py-2 px-2 sm:px-3 rounded-xl transition shadow-md disabled:opacity-50"
        >
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          Buy
        </button>
      </div>
    </motion.div>
  );
};