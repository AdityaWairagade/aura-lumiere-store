import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch {}
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6 bg-cream">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-light text-noir mb-1">Create Account</h1>
          <p className="text-sm text-gray-400 font-sans">Join the Aura Lumière inner circle</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-sans px-4 py-2">
              {error}
            </div>
          )}

          {[
            { id: 'name', label: 'Full Name', type: 'text', key: 'name', placeholder: 'Jane Doe', auto: 'name' },
            { id: 'email', label: 'Email Address', type: 'email', key: 'email', placeholder: 'your@email.com', auto: 'email' },
            { id: 'password', label: 'Password', type: 'password', key: 'password', placeholder: '••••••••', auto: 'new-password' },
            { id: 'confirm', label: 'Confirm Password', type: 'password', key: 'confirm', placeholder: '••••••••', auto: 'new-password' },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                value={form[field.key]}
                onChange={set(field.key)}
                required
                autoComplete={field.auto}
                placeholder={field.placeholder}
                className="input-field"
              />
            </div>
          ))}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 font-sans mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-600 hover:text-gold-700 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
