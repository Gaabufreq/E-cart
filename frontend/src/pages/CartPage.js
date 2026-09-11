import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { Button } from '../components/common/Button';

export const CartPage = () => {
  const { cart, totalItemsCount } = useCart();
  const navigate = useNavigate();

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col items-center">
          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mb-4" />
          <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-800 mb-2">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-slate-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/shop">
            <Button variant="buy" size="md">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 mb-6">
        Shopping Cart ({totalItemsCount} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          {cart.items.map((item) => (
            <CartItem key={item._id || item.product._id} item={item} />
          ))}
        </div>

        {/* Order Breakdown */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-base border-b border-slate-100 pb-3">Order Summary</h3>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold text-slate-800">₹{cart.totalPrice?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500">Shipping</span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
              <span className="font-heading font-bold text-sm sm:text-base">Total</span>
              <span className="font-heading font-extrabold text-lg sm:text-xl text-brand-buy">
                ₹{cart.totalPrice?.toLocaleString('en-IN')}
              </span>
            </div>
            <Button
              variant="buy"
              fullWidth
              size="lg"
              icon={ArrowRight}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};