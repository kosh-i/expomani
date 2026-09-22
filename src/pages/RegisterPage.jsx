import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'traveler' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginSuccess } = useAppStore();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      loginSuccess(res.data.token, res.data.user);
      
      if (res.data.user.role === 'admin') navigate('/admin');
      else if (res.data.user.role === 'agency') navigate('/agency');
      else navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Register</h2>
      {error && <div className="p-3 mb-4 text-sm text-rose-700 bg-rose-100 rounded-lg">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={onChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
          >
            <option value="traveler">Traveler</option>
            <option value="agency">Agency</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition">
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Login</Link>
      </p>
    </div>
  );
}
