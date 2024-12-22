import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/Constant";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async ({ message, receiverId }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/message/send/${receiverId}`,
        { message },
        { withCredentials: true }
      );
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
