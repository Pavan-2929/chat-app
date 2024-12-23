import React, { useState } from "react";
import { Link2Icon, StickerIcon, SendIcon } from "lucide-react";
import { Input } from "../ui/input";
import useSendMessage from "../../hooks/useSendMessages";
import { useSelector } from "react-redux";
const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading, error } = useSendMessage();
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    try {
      await sendMessage({ message, receiverId: selectedUser._id });
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-5 border-t border-muted-foreground">
      <button
        type="button"
        className="p-2 rounded-full hover:bg-muted transition"
        title="Attach File"
      >
        <Link2Icon className="w-5 h-5 text-primary" />
      </button>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-muted transition"
        title="Stickers/Emojis"
      >
        <StickerIcon className="w-5 h-5 text-primary" />
      </button>
      <Input
        className="flex-1 py-2 px-4 rounded-lg bg-card border border-muted-foreground placeholder:text-muted-foreground text-primary"
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        type="button"
        className="p-2 rounded-full bg-primary hover:bg-primary/80 transition"
        onClick={handleSendMessage}
        title="Send Message"
      >
        {loading ? (
          <span className="text-white">Sending...</span>
        ) : (
          <SendIcon className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
