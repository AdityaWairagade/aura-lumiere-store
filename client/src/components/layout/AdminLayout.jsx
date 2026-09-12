import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiLogOut,
  FiChevronRight,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/products', label: 'Products', icon: FiPackage },
  { to: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { to: '/admin/users', label: 'Users', icon: FiUsers },
];

const AdminLayout = () => {
  const { logout, userInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-noir text-champagne/80 flex flex-col shrink-0">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="font-serif text-lg tracking-luxury text-champagne">
            Aura Lumière
          </p>
          <p className="text-[10px] tracking-widest text-gold-400 uppercase mt-0.5">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors ${
                      isActive
                        ? 'bg-gold-500/20 text-gold-400'
                        : 'hover:bg-white/5 hover:text-champagne'
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-6 border-t border-white/10">
          <p className="text-xs text-champagne/40 px-4 mb-3">{userInfo?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm hover:bg-white/5 rounded transition-colors"
          >
            <FiLogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
