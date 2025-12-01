import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token from cookie if available
api.interceptors.request.use((config) => {
  // Try to get token from cookie
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
  
  if (tokenCookie) {
    const token = tokenCookie.split('=')[1];
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
