import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { formatPrice, formatDate } from '../../utils/formatters';
import { PageSpinner } from '../../components/common/Spinner';

const STATUS_BADGE = {
  pending:    'bg-amber-100 text-amber-700',
  processing: 'bg-amber-100 text-amber-700',
  shipped:    'bg-sky-100 text-sky-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-600',
  refunded:   'bg-gray-100 text-gray-500',
};

const AdminOrders = () => {
  const [orders, setOrders]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [page, setPage]               = useState(1);
  const [pages, setPages]             = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async (p = 1, status = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 15, page: p });
      if (status) params.set('status', status);
      const { data } = await api.get(`/orders?${params}`);
      setOrders(data.data);
      setPages(data.pagination.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page, statusFilter);
  }, [page, statusFilter]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#F5F0E8' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-serif text-3xl font-light" style={{ color: '#7B1E3A' }}>
          Orders
        </h1>

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          aria-label="Filter by status"
          className="bg-white border border-gray-200 px-3 py-2 text-sm font-sans
                     focus:outline-none focus:border-amber-400"
          style={{ color: '#1A1A1A' }}
        >
          <option value="">All Statuses</option>
          {['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <PageSpinner />
      ) : (
        <div className="bg-white border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr
                  className="text-left text-xs uppercase tracking-widest border-b border-gray-100"
                  style={{ backgroundColor: '#F5F0E8', color: '#7B1E3A' }}
                >
                  <th className="px-4 py-3 whitespace-nowrap">Order ID</th>
                  <th className="px-4 py-3 whitespace-nowrap">Customer</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 whitespace-nowrap">Total</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-20 text-center font-serif text-xl font-light"
                      style={{ color: '#7B1E3A' }}
                    >
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{ color: '#1A1A1A' }}
                    >
                      {/* Order ID */}
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3">
                        <p className="font-medium">{order.user?.name || '—'}</p>
                        <p className="text-xs text-gray-400">{order.user?.email || ''}</p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3 font-medium whitespace-nowrap">
                        {formatPrice(order.totalPrice)}
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${STATUS_BADGE[order.status] ?? 'bg-gray-100 text-gray-500'}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* View Details */}
                      <td className="px-4 py-3">
                        <Link
                          to={`/orders/${order._id}`}
                          className="inline-block px-3 py-1.5 text-xs font-sans font-medium
                                     tracking-wide transition-opacity hover:opacity-75"
                          style={{ backgroundColor: '#7B1E3A', color: '#F5F0E8' }}
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t border-gray-100">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 text-xs border transition-colors"
                  style={
                    page === p
                      ? { backgroundColor: '#7B1E3A', color: '#F5F0E8', borderColor: '#7B1E3A' }
                      : { borderColor: '#e5e7eb', color: '#1A1A1A' }
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
