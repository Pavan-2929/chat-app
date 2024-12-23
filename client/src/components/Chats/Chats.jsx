import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useFetchMessages from "@/hooks/useFetchMessages";
import useSendMessage from "@/hooks/useSendMessages";
import useGetSocketMessage from "@/context/useGetSocketMessage";

const Chats = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const { loading } = useFetchMessages(selectedUser?._id);
  const messages = useSelector((state) => state.chat.messages);
  useGetSocketMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);

  const renderMessageContent = (message) => {
    switch (message.type) {
      case "text":
        return <p className="text-[15px]">{message.content}</p>;
      case "image":
        return (
          <img
            src={message.content}
            alt="Uploaded"
            className="max-w-full h-auto"
          />
        );
      case "video":
        return (
          <video controls className="max-w-full h-auto">
            <source src={message.content} />
          </video>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-card overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin w-6 h-6 border-4 border-t-4 border-primary rounded-full"></div>
        </div>
      ) : messages && messages.length > 0 ? (
        messages.map((message) => (
          <div
            ref={lastMessageRef}
            key={message._id}
            className={`flex ${
              message.senderId === selectedUser._id
                ? "justify-start"
                : "justify-end"
            } mb-4`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.senderId === selectedUser._id
                  ? "bg-muted text-foreground"
                  : "bg-primary text-card"
              }`}
            >
              {renderMessageContent(message)}
              <p className="text-xs text-foreground/60 text-end mt-1">
                {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-center mt-4">
          No messages to display. Start a conversation!
        </p>
      )}
    </div>
  );
};

export default Chats;
