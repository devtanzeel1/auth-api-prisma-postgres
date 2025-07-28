'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance, { setAccessToken } from '../../utils/axiosInstance'; // ✅ Import setAccessToken

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axiosInstance.post('/login', formData, {
        withCredentials: true,
      });

      console.log('✅ Login response:', res.data);

      if (res.status === 200) {
        setAccessToken(res.data.accessToken); // ✅ Store token in memory
        setMessage('✅ Login successful! Redirecting...');
        router.push('/dashboard');
      } else {
        setMessage(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('❌ Login Error:', err);
      setMessage('❌ Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
      <form
        onSubmit={handleSubmit}
        className={`bg-white shadow-md rounded-xl p-8 max-w-md w-full transition-opacity duration-1000 ease-in-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {message && (
          <p className="mb-4 text-sm text-center text-red-600">{message}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-95'
          } text-white font-semibold py-2 rounded-lg transition transform duration-300 ease-in-out`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
