import React from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";


const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

export default NavigationProvider;
