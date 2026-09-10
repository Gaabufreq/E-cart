// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getAllOrdersAdminApi } from '../../api/order.api';
import { getAllProductsApi } from '../../api/product.api';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState({ totalSales: 0, ordersCount: 0, productsCount: 0 });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          getAllOrdersAdminApi(),
          getAllProductsApi(),
        ]);
        const orders = ordersRes.data || [];
        const sales = orders.reduce((acc, order) => acc + (order.status === 'paid' ? order.totalAmount : 0), 0);
        setStats({
          totalSales: sales,
          ordersCount: orders.length,
          productsCount: (productsRes.data || []).length,
        });
      } catch (error) {
        console.error('Failed to load admin metrics:', error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="font-heading font-extrabold text-2xl text-slate-900">Store Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Total Revenue</p>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">₹{stats.totalSales.toLocaleString('en-IN')}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><ShoppingCart className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Total Orders</p>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">{stats.ordersCount}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><Package className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Active Products</p>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">{stats.productsCount}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};