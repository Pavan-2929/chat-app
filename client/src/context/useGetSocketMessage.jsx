import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { setSeletedMessages } from "@/redux/auth/chatSlice";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      dispatch(setSeletedMessages([...messages, newMessage]));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setSeletedMessages]);
  return <div></div>;
};

export default useGetSocketMessage;
