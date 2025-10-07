import { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Auto refresh token every 10 minutes
  useEffect(() => {
    const interval = setInterval(refreshToken, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    setAccessToken(res.data.accessToken);
    setUser({ username, role: res.data.role });
  };

  const register = async (username, password, role = 'user') => {
    await api.post('/auth/register', { username, password, role });
  };

  const refreshToken = async () => {
    try {
      const res = await api.get('/auth/refresh');
      setAccessToken(res.data.accessToken);
    } catch (err) {
      console.log('Token refresh failed');
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
