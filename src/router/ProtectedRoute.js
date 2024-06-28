import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? children : navigate("/");
};

export default ProtectedRoute;
