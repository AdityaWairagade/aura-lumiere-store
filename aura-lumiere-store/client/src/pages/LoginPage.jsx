import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {}
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6 bg-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-light text-noir mb-1">Welcome Back</h1>
          <p className="text-sm text-gray-400 font-sans">Sign in to your Aura Lumière account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="input-field"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 font-sans mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-gold-600 hover:text-gold-700 transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
