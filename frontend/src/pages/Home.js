import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Headphones, Gamepad2, Laptop, Watch } from 'lucide-react';
import { getAllProductsApi } from '../api/product.api';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/common/Button';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsApi();
        setProducts(res.data || []);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Gaming', icon: Gamepad2, bg: 'bg-indigo-50 border-indigo-100 text-indigo-600' },
    { name: 'Audio', icon: Headphones, bg: 'bg-orange-50 border-orange-100 text-orange-600' },
    { name: 'Laptops', icon: Laptop, bg: 'bg-blue-50 border-blue-100 text-blue-600' },
    { name: 'Wearables', icon: Watch, bg: 'bg-emerald-50 border-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="flex flex-col gap-8 sm:gap-12 pb-12 sm:pb-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Hero Banner Section */}
      <section className="bg-brand-header text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-xl border border-slate-800 mt-4 sm:mt-6">
        <div className="max-w-2xl relative z-10 flex flex-col gap-3 sm:gap-5">
          <div className="inline-flex items-center gap-1.5 bg-brand-buy/20 border border-brand-buy/40 text-brand-buy px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide w-fit">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" /> NEXT-GEN TECH ARRIVALS
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            High-Performance <span className="text-brand-buy">Gaming Gear</span> & Accessories.
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Upgrade your setup with ultra-responsive mechanical keyboards, high-precision mice, and lossless wireless headphones.
          </p>
          <div className="flex items-center gap-4 pt-1 sm:pt-2">
            <Link to="/shop">
              <Button variant="buy" size="md" className="sm:text-base sm:px-6 sm:py-3" icon={ArrowRight}>
                Explore Shop
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-cart/20 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Category Grid Section */}
      <section className="w-full">
        <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-800 mb-4 sm:mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.name}`}
                className={`p-4 sm:p-6 rounded-2xl border ${cat.bg} flex flex-col items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] transition duration-200 cursor-pointer shadow-sm`}
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="font-heading font-bold text-xs sm:text-sm text-slate-800">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full">
        <div className="flex justify-between items-end mb-4 sm:mb-6">
          <div>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-800">Trending Products</h2>
            <p className="text-[11px] sm:text-xs text-slate-500">Handpicked items with active discount pricing</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-brand-cart hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={products.slice(0, 8)} loading={loading} />
      </section>
    </div>
  );
};