import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { checkoutOrderApi, verifyPaymentApi } from '../api/order.api';
import { ShippingForm } from '../components/checkout/ShippingForm';
import { OrderSummary } from '../components/checkout/OrderSummary';

export const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = async () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      alert('Please fill in all shipping address fields.');
      return;
    }

    try {
      setLoading(true);

      const res = await checkoutOrderApi(shippingAddress);
      const { razorpayOrder } = res.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_dummy',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'VibrantTech Store',
        description: 'Order Payment Verification',
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            await verifyPaymentApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            await fetchCart();
            navigate('/orders');
          } catch (error) {
            alert('Payment Verification Failed: ' + (error.response?.data?.message || error.message));
          }
        },
        theme: {
          color: '#FF6B00',
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error) {
      alert(error.response?.data?.message || 'Checkout failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 mb-6 sm:mb-8">
        Checkout Process
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <ShippingForm formData={shippingAddress} onChange={handleInputChange} />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            cart={cart}
            onProceedToPayment={handleProceedToPayment}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};