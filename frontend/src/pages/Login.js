import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ShoppingBag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const res = await login(credentials);
      const loggedInUser = res?.data?.user || res?.user || res?.data;
      const role = loggedInUser?.role ? String(loggedInUser.role).toLowerCase().trim() : '';

      if (role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-flex bg-brand-buy p-3 rounded-2xl text-white mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">Sign in to manage your orders and store</p>
        </div>

        {error && (
          <div className="mb-4 text-xs font-semibold text-rose-500 bg-rose-50 p-3 rounded-xl text-center border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="••••••••"
            required
          />
          <Button type="submit" variant="buy" fullWidth loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-brand-cart hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};