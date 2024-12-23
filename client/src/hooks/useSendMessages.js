import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setSeletedMessages } from "@/redux/auth/chatSlice";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const sendMessage = async ({ type, content, receiverId }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/message/send/${receiverId}`,
        { type, content },
        { withCredentials: true }
      );
      dispatch(setSeletedMessages([...messages, response.data]));
      return response.data;
    } catch (err) {
      setError("Error sending message");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};

export default useSendMessage;
