import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../utils/api';
import { formatPrice } from '../../utils/formatters';
import toast from 'react-hot-toast';
import { PageSpinner } from '../../components/common/Spinner';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products?limit=15&page=${p}`);
      setProducts(data.data);
      setPages(data.pagination.pages);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(page); }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts(page);
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light text-noir">Products</h1>
        <Link to="/admin/products/new" className="btn-gold flex items-center gap-2 text-xs">
          <FiPlus size={14} /> Add Product
        </Link>
      </div>

      {loading ? <PageSpinner /> : (
        <div className="bg-white border border-gray-100 overflow-hidden">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images?.[0]?.url}
                        alt={p.name}
                        className="w-10 h-12 object-cover bg-gray-100"
                      />
                      <div>
                        <p className="font-medium text-noir">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-500">{p.category?.replace(/-/g, ' ')}</td>
                  <td className="px-4 py-3">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">{p.rating} ({p.numReviews})</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link to={`/admin/products/${p._id}/edit`} className="text-indigo-500 hover:text-indigo-700 transition-colors">
                        <FiEdit2 size={15} />
                      </Link>
                      <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t border-gray-100">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 text-xs border ${page === p ? 'bg-noir text-champagne border-noir' : 'border-gray-200 hover:border-gold-400'}`}
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

export default AdminProducts;
