import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Menubar from "../Menubar";
import UserChats from "../Chats/UserChats";
import EmptyChat from "../Chats/EmptyChat";
import ChatsLaoyout from "../Chats/ChatsLayout";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  return (
    <div className="flex min-h-screen flex-col max-w-[100vw]">
      {isLoggedIn ? (
        <>
          <div className="mx-auto flex w-full max-w-[100vw] ">
            <Menubar className="sticky hidden flex-none space-y-5 h-screen bg-card px-2 py-5 shadow-sm sm:flex flex-col justify-between" />
            <UserChats />
            {selectedUser ? <ChatsLaoyout /> : <EmptyChat />}
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
