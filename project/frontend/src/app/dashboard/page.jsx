'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance, { setAccessToken } from '../../utils/axiosInstance';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 🟡 OPTIONAL: If you saved token in localStorage/sessionStorage (during development only)
        const token = sessionStorage.getItem('accessToken');
        if (token) setAccessToken(token); // 🟢 Set token in memory for axiosInstance

        const res = await axiosInstance.get('/profile');
        setUser(res.data.user);
      } catch (err) {
        console.error('❌ Unauthorized or expired token:', err);
        router.push('/login');
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }

    setUser(null);
    router.push('/login');
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-600 p-4 transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 mt-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Welcome to Your Dashboard
        </h1>

        {user ? (
          <p className="mb-4 text-lg text-center text-gray-700">Logged in as: {user.email}</p>
        ) : (
          <p className="mb-4 text-gray-500 text-center">Loading user data...</p>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition transform duration-300 ease-in-out hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
