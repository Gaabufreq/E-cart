import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Button } from '../common/Button';

export const OrderSummary = ({ cart, onProceedToPayment, loading = false }) => {
  const subtotal = cart?.totalPrice || 0;
  const shippingFee = subtotal > 1499 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5 sticky top-24">
      <h3 className="font-heading font-bold text-base text-slate-800 border-b border-slate-100 pb-3">
        Order Summary
      </h3>

      {/* Cart Items Summary List */}
      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
        {cart?.items?.map((item) => (
          <div key={item._id || item.product._id} className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="font-bold text-slate-800 shrink-0">{item.quantity}x</span>
              <span className="text-slate-600 truncate">{item.product?.title || item.title}</span>
            </div>
            <span className="font-bold text-slate-800 shrink-0">
              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5 text-xs">
        <div className="flex justify-between text-slate-500">
          <span>Items Subtotal</span>
          <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-slate-500">
          <span>Express Delivery</span>
          <span className="font-semibold text-slate-800">
            {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shippingFee}`}
          </span>
        </div>

        <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
          <span className="font-heading font-bold text-sm text-slate-800">Total Amount</span>
          <span className="font-heading font-extrabold text-xl text-brand-buy">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <Button
        variant="buy"
        fullWidth
        size="lg"
        loading={loading}
        onClick={onProceedToPayment}
        icon={Lock}
      >
        Pay ₹{grandTotal.toLocaleString('en-IN')} via Razorpay
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>256-Bit Encrypted Secure Checkout</span>
      </div>
    </div>
  );
};