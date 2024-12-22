import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Menubar from "../Menubar";
import UserChats from "../UserChats";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="flex min-h-screen flex-col">
      {isLoggedIn ? (
        <>
          <div className="mx-auto flex w-full  ">
            <Menubar className="sticky hidden flex-none space-y-5 h-screen bg-card px-2 py-5 shadow-sm sm:flex flex-col justify-between" />
            <UserChats className="sticky hidden flex-none space-y-7 h-screen bg-accent px-5 py-5 shadow-sm sm:block lg:w-96 "/>
            <Outlet />
          </div>
          <Menubar className="sticky bottom-0 flex w-full justify-center border-t bg-card p-2 sm:hidden" />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
