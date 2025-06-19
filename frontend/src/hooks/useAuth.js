import { useEffect, useState } from 'react';
import { getMe } from '../services/auth';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    getMe(token)
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('token'));
  }, []);

  return user;
}
