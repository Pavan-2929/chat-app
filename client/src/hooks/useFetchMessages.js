import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/Constant";
import { setSeletedMessages } from "@/redux/auth/chatSlice";
import { useDispatch } from "react-redux";

const useFetchMessages = (selectedUserId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchMessages = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/message/get/${selectedUserId}`,
        { withCredentials: true }
      );
      dispatch(setSeletedMessages(response.data || []));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUserId]);

  return { loading };
};

export default useFetchMessages;
