import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Menubar from "../Menubar";
import UserChats from "../Chats/UserChats";
import EmptyChat from "../Chats/EmptyChat";
import ChatsLaoyout from "../Chats/ChatsLayout";
import Profile from "../Chats/Profile";
const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const [activeMenu, setActiveMenu] = useState("chats");

  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="flex min-h-screen flex-col max-w-[100vw]">
      {isLoggedIn ? (
        <>
          <div className="mx-auto flex w-full max-w-[100vw] ">
            <Menubar
              onMenuChange={handleMenuChange}
              className="sticky hidden flex-none space-y-5 h-screen bg-card px-2 py-5 shadow-sm sm:flex flex-col justify-between"
            />
            {activeMenu === "chats" ? <UserChats /> : <Profile />}
            {selectedUser ? <ChatsLaoyout /> : <EmptyChat />}
          </div>
          <Menubar
            onMenuChange={handleMenuChange}
            className="sticky bottom-0 flex w-full justify-center border-t bg-card p-2 sm:hidden"
          />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
