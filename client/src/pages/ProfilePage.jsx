import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { userInfo, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    currentPassword: '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) {
        payload.currentPassword = form.currentPassword;
        payload.password = form.password;
      }
      const { data } = await api.put('/users/profile', payload);
      updateUser(data.data);
      toast.success('Profile updated');
      setForm((f) => ({ ...f, currentPassword: '', password: '', confirm: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-cream">
      <div className="max-w-xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl font-light text-noir mb-2">My Profile</h1>
        <div className="gold-divider mb-10 mx-0" />

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 space-y-5">
          {[
            { id: 'name', label: 'Full Name', type: 'text', key: 'name' },
            { id: 'email', label: 'Email Address', type: 'email', key: 'email' },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                value={form[f.key]}
                onChange={set(f.key)}
                className="input-field"
              />
            </div>
          ))}

          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] tracking-widest uppercase font-sans text-gray-400 mb-4">
              Change Password (optional)
            </p>
            {[
              { id: 'currentPassword', label: 'Current Password', key: 'currentPassword' },
              { id: 'password', label: 'New Password', key: 'password' },
              { id: 'confirm', label: 'Confirm New Password', key: 'confirm' },
            ].map((f) => (
              <div key={f.id} className="mb-4">
                <label htmlFor={f.id} className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type="password"
                  value={form[f.key]}
                  onChange={set(f.key)}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
