import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProductsApi } from '../api/product.api';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilter } from '../components/product/ProductFilter';

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(200000);

  const categories = ['Gaming', 'Audio', 'Accessories', 'Laptops', 'Wearables'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsApi();
        setProducts(res.data || []);
      } catch (error) {
        console.error('Failed to fetch shop products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (initialSearch) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(initialSearch.toLowerCase())
      );
    }

    if (selectedCategory) {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    updated = updated.filter((p) => p.price <= priceRange);

    setFilteredProducts(updated);
  }, [products, selectedCategory, priceRange, initialSearch]);

  const handleReset = () => {
    setSelectedCategory('');
    setPriceRange(200000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800">
          Shop All Products
        </h1>
        <p className="text-xs text-slate-500">
          Showing {filteredProducts.length} results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRange={priceRange}
            onChangePriceRange={setPriceRange}
            onResetFilters={handleReset}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </div>
    </div>
  );
};