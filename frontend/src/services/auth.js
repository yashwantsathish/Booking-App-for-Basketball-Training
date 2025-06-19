import axios from 'axios';

const API = 'http://localhost:3001/api/auth';

export const register = (data) => axios.post(`${API}/register`, data);
export const login = (data) => axios.post(`${API}/login`, data);
export const getMe = (token) =>
  axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
