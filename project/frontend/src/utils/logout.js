// src/utils/logout.js

import axiosInstance from './axiosInstance';
import { useRouter } from 'next/router';

export const handleLogout = async (accessToken, setToken) => {
  try {
    await axiosInstance.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // ✅ Clear token from memory (React state or context)
    setToken(null);

    // ✅ Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  } catch (err) {
    console.error('Logout failed:', err.response?.data || err.message);
  }
};
