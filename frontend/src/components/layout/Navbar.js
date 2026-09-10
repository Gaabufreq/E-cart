import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProductsApi } from '../../api/product.api.js';
import { ShoppingBag, Heart, ShoppingCart, User, Search, X, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle outside click to close search suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time Debounced Live Search Suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length > 0) {
        try {
          setLoading(true);
          const res = await getAllProductsApi(searchTerm);
          setSuggestions(res.data || []);
          setIsOpen(true);
        } catch (err) {
          console.error('Search error:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelectProduct = (productId) => {
    setIsOpen(false);
    setSearchTerm('');
    navigate(`/product/${productId}`);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-heading font-extrabold text-xl tracking-tight shrink-0">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span>E-Cart</span>
        </Link>

        {/* Live Search Bar with Auto-Suggestions Dropdown */}
        <div ref={searchRef} className="relative flex-1 max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.trim().length > 0 && setIsOpen(true)}
              className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-slate-800 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dynamic Suggestions Dropdown */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-100">
              {loading ? (
                <div className="p-4 text-center text-xs text-slate-400">Searching products...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleSelectProduct(product._id)}
                    className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded-lg border border-slate-100 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center text-slate-400 text-[10px]">
                          No Img
                        </div>
                      )}
                      <div className="truncate">
                        <p className="font-medium text-xs text-slate-800 truncate">{product.title}</p>
                        <span className="text-[10px] text-slate-400 font-mono uppercase">{product.category}</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-slate-900 shrink-0">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">No matching products found</div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link
            to="/wishlist"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </Link>

          <Link
            to="/cart"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              {user.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-5 h-5" />
                </Link>
              )}

              <Link
                to="/orders"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                title="My Orders"
              >
                <ShoppingBag className="w-5 h-5" />
              </Link>

              {/* User Profile Avatar / Link */}
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-xl transition-colors"
                title="My Profile"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                )}
              </Link>

              <button
                onClick={logout}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};