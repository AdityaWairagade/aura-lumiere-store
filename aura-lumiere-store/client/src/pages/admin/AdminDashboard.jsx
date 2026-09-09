import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import api from '../../utils/api';
import { formatPrice } from '../../utils/formatters';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white border border-gray-100 p-5 flex items-center gap-4">
    <div className={`p-3 rounded ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-sans uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-serif text-noir mt-0.5">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [products, orders, users] = await Promise.all([
          api.get('/products?limit=1'),
          api.get('/orders?limit=5'),
          api.get('/users?limit=1'),
        ]);
        const totalRevenue = orders.data.data.reduce((s, o) => s + o.totalPrice, 0);
        setStats({
          products: products.data.pagination.total,
          orders: orders.data.pagination.total,
          users: users.data.pagination.total,
          revenue: totalRevenue,
        });
        setRecentOrders(orders.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-noir mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <StatCard icon={FiPackage} label="Products" value={stats.products} color="bg-indigo-500" />
        <StatCard icon={FiShoppingBag} label="Orders" value={stats.orders} color="bg-amber-500" />
        <StatCard icon={FiUsers} label="Customers" value={stats.users} color="bg-emerald-500" />
        <StatCard icon={FiTrendingUp} label="Revenue" value={formatPrice(stats.revenue)} color="bg-gold-500" />
      </div>

      <div className="bg-white border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-noir">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs tracking-widest uppercase text-gold-600 hover:text-gold-700 font-sans">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="pb-3 pr-4">Order ID</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Total</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((o) => (
                <tr key={o._id}>
                  <td className="py-3 pr-4 text-gray-500">#{o._id.slice(-8).toUpperCase()}</td>
                  <td className="py-3 pr-4">{o.user?.name || '—'}</td>
                  <td className="py-3 pr-4">{formatPrice(o.totalPrice)}</td>
                  <td className="py-3 capitalize text-gold-600">{o.status}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-gray-300">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
