import React, { createContext, useState, useEffect } from "react";
import { decodeJwt } from "jose";

export const AuthContext = createContext();

const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserFromToken = (token) => {
    try {
      const decoded = decodeJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        logout();
        return;
      }
      setUser({
        username: decoded.username || decoded.name,
        email: decoded.email,
        number: decoded.number,
        address: decoded.address,
        bname: decoded.bname,
        role: decoded.role,
        marchantId: decoded.userId,
      });
      setToken(token);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserFromToken(token);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUserFromToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    if (navigate) navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
