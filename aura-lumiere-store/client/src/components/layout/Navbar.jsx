import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingBag,
  FiUser,
  FiHeart,
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
  { label: 'New Arrivals', to: '/shop?newArrival=true' },
  { label: 'For Her', to: '/shop/for-her' },
  { label: 'For Him', to: '/shop/for-him' },
  { label: 'Unisex', to: '/shop/unisex' },
  { label: 'Limited Edition', to: '/shop/limited-edition' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { userInfo, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="bg-noir text-champagne text-xs tracking-widest text-center py-2 font-sans">
        FREE SHIPPING ON ORDERS OVER $150 &nbsp;·&nbsp; LUXURY FRAGRANCES
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start leading-none">
          <span className="font-serif text-2xl font-light tracking-luxury text-noir">
            Aura Lumière
          </span>
          <span className="text-[9px] tracking-widest uppercase text-gold-500 font-sans">
            Maison de Parfum
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="text-xs tracking-widest uppercase font-sans text-noir/80 hover:text-gold-600 transition-colors duration-200"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-noir/70 hover:text-gold-600 transition-colors"
            onClick={() => navigate('/shop')}
          >
            <FiSearch size={19} />
          </button>

          {isAuthenticated && (
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="text-noir/70 hover:text-gold-600 transition-colors"
            >
              <FiHeart size={19} />
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className="relative text-noir/70 hover:text-gold-600 transition-colors"
          >
            <FiShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-noir text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              aria-label="User account"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="text-noir/70 hover:text-gold-600 transition-colors"
            >
              <FiUser size={19} />
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
                      <p className="px-4 py-2 text-xs text-gray-400 tracking-wide border-b border-gray-100">
                        {userInfo.name}
                      </p>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-cream transition-colors"
                      >
                        <FiUser size={14} /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-cream transition-colors"
                      >
                        <FiPackage size={14} /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gold-600 hover:bg-cream transition-colors"
                        >
                          <FiSettings size={14} /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left hover:bg-cream transition-colors border-t border-gray-100 mt-1"
                      >
                        <FiLogOut size={14} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm hover:bg-cream transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm hover:bg-cream transition-colors"
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
            className="lg:hidden text-noir/70 hover:text-gold-600"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
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
            className="lg:hidden bg-cream border-t border-gray-100 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-widest uppercase font-sans text-noir/80 hover:text-gold-600"
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
