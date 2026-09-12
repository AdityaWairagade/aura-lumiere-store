import { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const saveUser = (data) => {
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      saveUser(data.data);
      toast.success(`Welcome back, ${data.data.name}`);
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      saveUser(data.data);
      toast.success(`Welcome to Aura Lumière, ${data.data.name}`);
      return data.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    toast.success('You have been signed out');
  }, []);

  const updateUser = useCallback((updated) => {
    const merged = { ...userInfo, ...updated };
    saveUser(merged);
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isAuthenticated: !!userInfo,
        isAdmin: userInfo?.role === 'admin',
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
