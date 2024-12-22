import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Menubar from "../Menubar";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {isLoggedIn ? (
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <Menubar className="sticky top-[6rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block xl:w-64" />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
