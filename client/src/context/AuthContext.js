import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        // Optional: Check if token is expired
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          logout();
        } else {
          setUser(decoded.user);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Login failed');
      }
      setAuthToken(data.token);
      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);
      setUser(decoded.user);

      // Role-based redirection
      const userRoles = decoded.user.roles || [];
      if (userRoles.includes('Super Admin') || userRoles.includes('System Administrator')) {
        navigate('/admin/dashboard');
      } else if (userRoles.includes('Sales')) {
        navigate('/admin/sales-dashboard'); // A new route for sales
      } else {
        navigate('/'); // Default redirect for users with no specific role page
      }

    } catch (error) {
      throw error; // Re-throw error to be caught by the login form
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const value = {
    authToken,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
