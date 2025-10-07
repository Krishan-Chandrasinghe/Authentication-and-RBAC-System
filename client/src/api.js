import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rbac-system-mern.vercel.app/',
  withCredentials: true, // enables cookie sending
});

export default api;
