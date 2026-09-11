import React, { useEffect, useState } from 'react';
import { getAllOrdersAdminApi, updateOrderStatusAdminApi } from '../../api/order.api';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrdersAdminApi();
      setOrders(res.data || []);
    } catch (error) {
      console.error('Failed to fetch admin orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatusAdminApi(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      alert('Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge variant="accent">PAID</Badge>;
      case 'delivered':
        return <Badge variant="cart">DELIVERED</Badge>;
      case 'cancelled':
      case 'failed':
        return <Badge variant="danger">{status.toUpperCase()}</Badge>;
      default:
        return <Badge variant="buy">PENDING</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-8 flex flex-col gap-6">
      <div>
        <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">Orders Management</h1>
        <p className="text-xs text-slate-500">Track customer purchases and update delivery statuses</p>
      </div>

      {loading ? (
        <Loader text="Fetching System Orders..." />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Order Details</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-400">
                      No customer orders placed yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o._id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4">
                        <span className="font-bold text-slate-800">#{o._id?.slice(-8)}</span>
                        <p className="text-[11px] text-slate-400">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">{o.user?.name || 'Customer'}</p>
                        <p className="text-[11px] text-slate-400">{o.user?.email}</p>
                      </td>
                      <td className="p-4 font-extrabold text-slate-900">
                        ₹{o.totalAmount?.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4">{getStatusBadge(o.status)}</td>
                      <td className="p-4 text-right">
                        <select
                          disabled={updatingId === o._id}
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                          className="bg-slate-100 border border-slate-300 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-buy"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};