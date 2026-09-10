import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-header text-slate-300 mt-20 border-t border-slate-800">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Truck className="w-8 h-8 text-brand-buy" />
            <div>
              <h4 className="text-sm font-semibold text-white">Fast Delivery</h4>
              <p className="text-xs text-slate-400">Shipped in 24-48 hours</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-accent" />
            <div>
              <h4 className="text-sm font-semibold text-white">100% Authentic</h4>
              <p className="text-xs text-slate-400">Genuine brand products</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <RotateCcw className="w-8 h-8 text-brand-cart" />
            <div>
              <h4 className="text-sm font-semibold text-white">Easy Returns</h4>
              <p className="text-xs text-slate-400">7 Days return policy</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Headphones className="w-8 h-8 text-brand-buy" />
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Support</h4>
              <p className="text-xs text-slate-400">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-2xl text-white mb-4">
            <div className="bg-brand-buy p-2 rounded-xl text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span>Vibrant<span className="text-brand-buy">Tech</span></span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            Your destination for high-performance tech accessories, gaming peripherals, and modern gadgets built for speed and reliability.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition">Shop Products</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">Track Orders</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/shop?category=Gaming" className="hover:text-white transition">Gaming Peripherals</Link></li>
            <li><Link to="/shop?category=Audio" className="hover:text-white transition">Wireless Audio</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-white transition">Tech Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Secure Payment</h4>
          <p className="text-xs text-slate-400 mb-3">Powered by Razorpay for 256-bit encrypted transactions.</p>
          <div className="inline-block bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-buy">
            Razorpay Verified
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} VibrantTech E-Commerce. All rights reserved.
      </div>
    </footer>
  );
};