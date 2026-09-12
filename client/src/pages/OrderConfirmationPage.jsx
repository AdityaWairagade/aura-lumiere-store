import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import api from '../utils/api';
import { formatPrice, formatDate } from '../utils/formatters';
import { PageSpinner } from '../components/common/Spinner';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <PageSpinner />;

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <FiCheckCircle size={56} className="text-green-500 mx-auto mb-6" />
        <h1 className="font-serif text-4xl font-light text-noir mb-2">Order Confirmed</h1>
        <p className="text-sm text-gray-400 font-sans mb-8">
          Thank you for your order. We'll send you a confirmation shortly.
        </p>

        {order && (
          <div className="bg-white border border-gray-100 p-6 text-left mb-8">
            <div className="flex justify-between items-center mb-4 text-sm font-sans">
              <span className="text-gray-400">Order #</span>
              <span className="font-medium text-noir">{order._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm font-sans">
              <span className="text-gray-400">Date</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm font-sans">
              <span className="text-gray-400">Status</span>
              <span className="capitalize text-gold-600">{order.status}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-sans border-t border-gray-100 pt-4">
              <span className="text-gray-400">Total</span>
              <span className="font-medium text-noir">{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Link to="/orders" className="btn-outline">View Orders</Link>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
