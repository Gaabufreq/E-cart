import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { CartItem } from './CartItem';
import { Button } from '../common/Button';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, totalItemsCount } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 bg-brand-header text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-buy" />
                  <h3 className="font-heading font-bold text-base">
                    Your Cart ({totalItemsCount})
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5">
                {!cart?.items || cart.items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mb-3" />
                    <p className="font-heading font-bold text-slate-700 text-sm mb-1">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-slate-400 mb-4">
                      Add items to get started with your order.
                    </p>
                    <Button variant="buy" size="sm" onClick={onClose}>
                      Explore Products
                    </Button>
                  </div>
                ) : (
                  cart.items.map((item) => (
                    <CartItem key={item._id || item.product._id} item={item} />
                  ))
                )}
              </div>

              {/* Footer / Summary */}
              {cart?.items?.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Subtotal</span>
                    <span className="font-heading font-extrabold text-lg text-slate-900">
                      ₹{cart.totalPrice?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Taxes and shipping calculated at checkout.
                  </p>
                  <Button
                    variant="buy"
                    fullWidth
                    icon={ArrowRight}
                    onClick={handleProceedToCheckout}
                  >
                    Checkout Now
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};