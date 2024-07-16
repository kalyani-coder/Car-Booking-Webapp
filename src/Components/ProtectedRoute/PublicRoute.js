import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, restrictedPath = "/home" }) => {
  const token = localStorage.getItem("token");
  return token ?  <Navigate to={restrictedPath} /> : element;
};

export default ProtectedRoute;