import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import api from '../../utils/api';
import { formatDate } from '../../utils/formatters';
import { PageSpinner } from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);

  const fetchUsers = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/users?limit=15&page=${p}`);
      setUsers(data.data);
      setPages(data.pagination.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted');
      // Reload current page; step back if it becomes empty
      fetchUsers(page);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#F5F0E8' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-serif text-3xl font-light" style={{ color: '#7B1E3A' }}>
          Users
        </h1>
        <p className="font-sans text-sm" style={{ color: '#1A1A1A' }}>
          Manage customer and admin accounts
        </p>
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
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 whitespace-nowrap">Joined Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-center font-serif text-xl font-light"
                      style={{ color: '#7B1E3A' }}
                    >
                      No users yet
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{ color: '#1A1A1A' }}
                    >
                      {/* Name + avatar initial */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center
                                       text-xs font-semibold shrink-0 border"
                            style={{
                              backgroundColor: '#F5F0E8',
                              color: '#7B1E3A',
                              borderColor: '#D4AF37',
                            }}
                            aria-hidden="true"
                          >
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-gray-500">{user.email}</td>

                      {/* Role badge */}
                      <td className="px-4 py-3">
                        {user.role === 'admin' ? (
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            style={{ backgroundColor: '#7B1E3A', color: '#F5F0E8' }}
                          >
                            Admin
                          </span>
                        ) : (
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            style={{ backgroundColor: '#B8C4B0', color: '#1A1A1A' }}
                          >
                            Customer
                          </span>
                        )}
                      </td>

                      {/* Joined date */}
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <button
                            aria-label={`Edit ${user.name}`}
                            onClick={() =>
                              toast('User editing coming soon', { icon: '✏️' })
                            }
                            className="transition-opacity hover:opacity-70"
                            style={{ color: '#D4AF37' }}
                          >
                            <FiEdit2 size={15} />
                          </button>

                          <button
                            aria-label={`Delete ${user.name}`}
                            onClick={() => handleDelete(user._id, user.name)}
                            className="transition-opacity hover:opacity-70"
                            style={{ color: '#7B1E3A' }}
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
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

export default AdminUsers;
