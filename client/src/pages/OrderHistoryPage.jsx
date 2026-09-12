import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { formatPrice, formatDate } from '../utils/formatters';
import { PageSpinner } from '../components/common/Spinner';

const statusColor = {
  pending: 'text-yellow-600',
  processing: 'text-blue-600',
  shipped: 'text-indigo-600',
  delivered: 'text-green-600',
  cancelled: 'text-red-600',
  refunded: 'text-gray-500',
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <PageSpinner />;

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-light text-noir mb-2">My Orders</h1>
        <div className="gold-divider mb-10 mx-0" />

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light text-gray-400 mb-4">No orders yet</p>
            <Link to="/shop" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block bg-white border border-gray-100 p-5 hover:border-gold-300 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 font-sans">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm font-sans text-noir mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-sans capitalize font-medium ${statusColor[order.status] || ''}`}>
                      {order.status}
                    </p>
                    <p className="text-sm font-sans font-medium text-noir mt-0.5">
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  {order.orderItems?.slice(0, 4).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-12 object-cover bg-gray-50"
                    />
                  ))}
                  {order.orderItems?.length > 4 && (
                    <div className="w-10 h-12 bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-sans">
                      +{order.orderItems.length - 4}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
