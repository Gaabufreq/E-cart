import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Heart, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { getProductByIdApi } from '../api/product.api';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { Badge } from '../components/common/Badge';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductByIdApi(id);
        setProduct(res.data);
        if (res.data?.images?.length > 0) {
          setSelectedImage(res.data.images[0]);
        }
      } catch (error) {
        console.error('Failed to load product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader fullScreen text="Loading product details..." />;
  if (!product) return <div className="text-center py-20 text-slate-500">Product not found.</div>;

  const isWishlisted = isInWishlist(product._id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) return navigate('/login');
    await addToCart(product._id, 1);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) return navigate('/login');
    await addToCart(product._id, 1);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
        
        {/* Left Image Gallery */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center p-4 sm:p-6">
            <img
              src={selectedImage || 'https://via.placeholder.com/400'}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-50 border p-1 shrink-0 ${
                    selectedImage === img ? 'border-brand-buy ring-2 ring-brand-buy/20' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Meta */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] sm:text-xs font-bold text-brand-buy uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-lg">
                {product.category}
              </span>
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`p-2 rounded-full border transition ${
                  isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-slate-200 text-slate-400'
                }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <h1 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-900 mb-2 sm:mb-3">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 sm:py-1 rounded-lg border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-800">{product.ratings || 4.5}</span>
              </div>
              <span className="text-xs text-slate-400">Verified Customer Ratings</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4 sm:mb-6">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 line-through">
                ₹{Math.round(product.price * 1.2)?.toLocaleString('en-IN')}
              </span>
              <Badge variant="accent">Save 20%</Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <span className="text-xs font-bold text-slate-500 block mb-1">Availability:</span>
              {product.stock > 0 ? (
                <Badge variant="accent">{product.stock} In Stock</Badge>
              ) : (
                <Badge variant="danger">Out of Stock</Badge>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="cart"
                size="lg"
                icon={ShoppingCart}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </Button>
              <Button
                variant="buy"
                size="lg"
                icon={Zap}
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
              >
                Buy Now
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 sm:pt-6 border-t border-slate-100 text-center text-[10px] sm:text-[11px] text-slate-500">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-buy" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cart" />
                <span>7 Days Return</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};