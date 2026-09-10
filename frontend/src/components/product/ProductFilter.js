import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export const ProductFilter = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  priceRange,
  onChangePriceRange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-heading font-bold text-sm text-slate-800">
          <Filter className="w-4 h-4 text-brand-buy" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-slate-400 hover:text-brand-cart flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Categories Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Categories</h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory('')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === ''
                ? 'bg-brand-cart text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-brand-cart text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Filter */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Price</h4>
          <span className="text-xs font-bold text-slate-800">₹{priceRange?.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="500"
          max="200000"
          step="500"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="w-full accent-brand-buy cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹500</span>
          <span>₹2,00,000</span>
        </div>
      </div>
    </div>
  );
};