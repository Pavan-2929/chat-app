import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
