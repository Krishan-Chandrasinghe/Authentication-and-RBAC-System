import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rbac-system-backend.vercel.app/api',
  withCredentials: true, // enables cookie sending
});

export default api;
