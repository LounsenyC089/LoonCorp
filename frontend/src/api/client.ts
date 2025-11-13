import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('looncorp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
