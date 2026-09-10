import React, { useEffect, useState } from 'react';
import { getUserOrdersApi, cancelOrderApi } from '../api/order.api';
import { Loader } from '../components/common/Loader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ShoppingBag, XCircle } from 'lucide-react';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getUserOrdersApi();
      setOrders(res.data || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        setCancellingId(orderId);
        await cancelOrderApi(orderId);
        fetchOrders(); // Reload orders after DB update
      } catch (error) {
        alert(error.response?.data?.message || "Failed to cancel order");
      } finally {
        setCancellingId(null);
      }
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'paid':
        return 'accent';
      case 'delivered':
        return 'cart';
      case 'cancelled':
      case 'failed':
        return 'danger';
      default:
        return 'buy';
    }
  };

  if (loading) return <Loader fullScreen text="Loading your orders..." />;

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center">
          <ShoppingBag className="w-12 h-12 text-slate-300 mb-3" />
          <h2 className="font-heading font-bold text-lg text-slate-800 mb-1">No Orders Placed Yet</h2>
          <p className="text-xs text-slate-500">When you complete checkout, your active orders will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-heading font-extrabold text-2xl text-slate-800 mb-6">Your Order History</h1>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-400">Order ID: #{order._id?.slice(-8)}</span>
                <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <Badge variant={getStatusBadgeVariant(order.status)}>
                {order.status.toUpperCase()}
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{item.quantity}x {item.title || item.product?.title}</span>
                  <span className="font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 block">Total Amount</span>
                <span className="font-heading font-extrabold text-base text-brand-buy">
                  ₹{order.totalAmount?.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Cancel Button - Active only if not delivered/cancelled */}
              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                <Button
                  variant="danger"
                  size="sm"
                  icon={XCircle}
                  loading={cancellingId === order._id}
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};