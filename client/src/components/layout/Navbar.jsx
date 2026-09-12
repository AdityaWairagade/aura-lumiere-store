import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
  FiPackage,
  FiSettings,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home',        to: '/' },
  { label: 'Shop',        to: '/shop' },
  { label: 'Pour Homme',  to: '/shop/for-him' },
  { label: 'Pour Femme',  to: '/shop/for-her' },
  { label: 'Unisex',      to: '/shop/unisex' },
  { label: 'Gifting',     to: '/shop/gift-sets' },
];

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { userInfo, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b transition-shadow duration-300"
      style={{
        borderColor: '#f0ece4',
        boxShadow: scrolled ? '0 1px 12px rgba(42,42,42,0.08)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* Logo — AL monogram + wordmark */}
        <Link to="/" className="flex items-center gap-3 leading-none shrink-0">
          <div
            className="w-10 h-10 flex items-center justify-center font-serif text-lg font-semibold border"
            style={{ backgroundColor: '#7B1E3A', color: '#FAF7F2', borderColor: '#C9A961' }}
            aria-hidden="true"
          >
            AL
          </div>
          <div className="flex flex-col">
            <span
              className="font-serif text-xl font-semibold leading-tight"
              style={{ color: '#2A2A2A', letterSpacing: '0.12em' }}
            >
              AURA LUMIÈRE
            </span>
            <span
              className="text-[8px] uppercase font-sans"
              style={{ color: '#C9A961', letterSpacing: '0.25em' }}
            >
              Fine Fragrances
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-[11px] tracking-widest uppercase font-sans transition-colors duration-200 ${
                    isActive
                      ? 'font-semibold'
                      : 'hover:opacity-70'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? '#7B1E3A' : '#2A2A2A',
                  borderBottom: isActive ? '1px solid #C9A961' : 'none',
                  paddingBottom: '2px',
                })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            onClick={() => navigate('/shop')}
            className="transition-colors hover:text-burgundy"
            style={{ color: '#2A2A2A' }}
          >
            <FiSearch size={18} />
          </button>

          {/* Cart with badge */}
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className="relative transition-colors hover:text-burgundy"
            style={{ color: '#2A2A2A' }}
          >
            <FiShoppingBag size={18} />
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#7B1E3A', color: '#FAF7F2' }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* User dropdown */}
          <div className="relative">
            <button
              aria-label="User account"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="transition-colors hover:text-burgundy"
              style={{ color: '#2A2A2A' }}
            >
              <FiUser size={18} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 shadow-lg py-2 z-50"
                >
                  {isAuthenticated ? (
                    <>
                      <p className="px-4 py-2 text-xs tracking-wide border-b border-gray-100" style={{ color: '#8A8177' }}>
                        {userInfo.name}
                      </p>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-sand"
                        style={{ color: '#2A2A2A' }}
                      >
                        <FiUser size={14} /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-sand"
                        style={{ color: '#2A2A2A' }}
                      >
                        <FiPackage size={14} /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-sand"
                          style={{ color: '#C9A961' }}
                        >
                          <FiSettings size={14} /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-sand border-t border-gray-100 mt-1"
                        style={{ color: '#2A2A2A' }}
                      >
                        <FiLogOut size={14} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm transition-colors hover:bg-sand"
                        style={{ color: '#2A2A2A' }}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm transition-colors hover:bg-sand"
                        style={{ color: '#2A2A2A' }}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden transition-colors hover:text-burgundy"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            style={{ color: '#2A2A2A' }}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t overflow-hidden bg-white"
            style={{ borderColor: '#f0ece4' }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm uppercase font-sans transition-colors hover:text-burgundy"
                    style={{ color: '#2A2A2A', letterSpacing: '0.15em' }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
