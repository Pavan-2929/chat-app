import React from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Chats from "./Chats";
import { useSearchParams } from "react-router-dom";

const ChatsLayout = () => {

  return (
    <div className="w-full h-screen bg-card flex flex-col">
      <div className="flex-none">
        <ChatHeader />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Chats />
      </div>
      <div className="flex-none">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatsLayout;
