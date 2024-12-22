import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/Constant";

const useFetchMessages = (selectedUserId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/message/get/${selectedUserId}`,
        { withCredentials: true }
      );
      setMessages(response.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUserId]);

  return { messages, loading };
};

export default useFetchMessages;
