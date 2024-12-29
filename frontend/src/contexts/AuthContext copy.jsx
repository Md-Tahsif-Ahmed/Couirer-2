// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { decodeJwt } from 'jose';
// import { jsx } from 'react/jsx-runtime';


// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object
  const [token, setToken] = useState(null); // JWT token
  const [loading, setLoading] = useState(true); // Loading state

  // Function to set user from token
  const setUserFromToken = (token) => {
    try {
      const decoded = decodeJwt(token);
      console.log('Decoded JWT:', decoded); // Debugging: Check decoded token

      // Adjust the field names based on your JWT payload
      setUser({
        username: decoded.username || decoded.name, // Use 'username' or fallback to 'name'
        email: decoded.email,
        number: decoded.number,
        address: decoded.address,
        bname: decoded.bname,
        role: decoded.role,
        marchantId: decoded.userId,
      });
      setToken(token); // Store token in state
    } catch (error) {
      console.error('Invalid token:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token'); // Remove invalid token
    }
  };

  // Load user and token from localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserFromToken(token);
    }
    setLoading(false);
  }, []);

  // Function to handle login
  const login = (token) => {
    localStorage.setItem('token', token);
    setUserFromToken(token);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
