import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { formatPrice, formatDate } from '../utils/formatters';
import { PageSpinner } from '../components/common/Spinner';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  if (loading) return <PageSpinner />;
  if (!order) return (
    <div className="pt-32 text-center">
      <p className="text-gray-400">Order not found</p>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/orders" className="text-xs text-gray-400 hover:text-gold-600 font-sans uppercase tracking-widest">
            ← Orders
          </Link>
        </div>
        <h1 className="font-serif text-3xl font-light text-noir mb-1">
          Order #{order._id.slice(-8).toUpperCase()}
        </h1>
        <p className="text-sm text-gray-400 font-sans mb-8">{formatDate(order.createdAt)}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {order.orderItems.map((item, i) => (
              <div key={i} className="flex gap-4 border-b border-gray-100 pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-50" />
                <div className="flex-1">
                  <p className="font-serif text-lg text-noir">{item.name}</p>
                  {item.size && <p className="text-xs text-gray-400 font-sans">{item.size}</p>}
                  <p className="text-xs text-gray-400 font-sans">× {item.quantity}</p>
                </div>
                <p className="font-sans text-sm text-noir">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-100 p-5">
              <h3 className="font-sans text-xs tracking-widest uppercase text-gray-400 mb-4">Summary</h3>
              {[
                ['Subtotal', formatPrice(order.itemsPrice)],
                ['Shipping', order.shippingPrice === 0 ? 'Free' : formatPrice(order.shippingPrice)],
                ['Tax', formatPrice(order.taxPrice)],
                ['Total', formatPrice(order.totalPrice)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm font-sans py-1.5 border-b border-gray-50 last:border-0 last:font-medium">
                  <span className="text-gray-500">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 p-5">
              <h3 className="font-sans text-xs tracking-widest uppercase text-gray-400 mb-3">Status</h3>
              <p className="text-sm font-sans capitalize text-gold-600 font-medium">{order.status}</p>
              {order.trackingNumber && (
                <p className="text-xs text-gray-400 font-sans mt-1">Tracking: {order.trackingNumber}</p>
              )}
            </div>

            <div className="bg-white border border-gray-100 p-5">
              <h3 className="font-sans text-xs tracking-widest uppercase text-gray-400 mb-3">Ship To</h3>
              <div className="text-sm text-gray-600 font-sans space-y-0.5">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
