import React, { useState, useRef, useEffect } from "react";
import {
  Smile,
  SendIcon,
  Loader2,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessages";
import axios from "axios";
import { useTheme } from "../ThemeProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CLOUDINARY_URL } from "@/utils/Constant";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    type: null,
  });
  const emojiPickerRef = useRef(null);
  const imageInputRef = useRef(null); // Create ref for image input
  const videoInputRef = useRef(null); // Create ref for video input
  const { theme } = useTheme();
  const { sendMessage, loading: sendingMessage } = useSendMessage();
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const handleInputChange = (e) => setMessage(e.target.value);

  const handleSendMessage = async (content, type = "text") => {
    if (!content || !selectedUser) return;
    try {
      await sendMessage({
        type,
        content,
        receiverId: selectedUser._id,
      });
      if (type === "text") setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isEmojiPickerOpen) {
      handleSendMessage(message);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => setIsEmojiPickerOpen((prev) => !prev);

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidImage = type === "image" && file.type.startsWith("image/");
    const isValidVideo = type === "video" && file.type.startsWith("video/");

    if (!isValidImage && !isValidVideo) {
      alert(`Please upload a valid ${type} file.`);
      return;
    }

    uploadFile(file, type);
  };

  const uploadFile = async (file, type) => {
    if (!file || !["image", "video"].includes(type)) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");

    console.log("Uploading file:", file);
    console.log("File type:", file.type);

    setUploadStatus({ loading: true, type });
    try {
      let uploadUrl = `${CLOUDINARY_URL}`;

      if (type === "video") {
        uploadUrl = `${CLOUDINARY_URL.replace("/image", "/video")}`;
      }

      const response = await axios.post(uploadUrl, formData);
      console.log(response);

      const mediaUrl = response.data.secure_url;
      await handleSendMessage(mediaUrl, type);
    } catch (err) {
      console.error(`${type} Upload Failed:`, err);
    } finally {
      setUploadStatus({ loading: false, type: null });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-4 border-t border-muted-foreground relative">
      <label htmlFor="image-upload">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition flex items-center justify-center"
                onClick={() => imageInputRef.current.click()}
              >
                <ImageIcon className="size-5 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <input
          id="image-upload"
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden z-50"
          onChange={(e) => handleFileSelect(e, "image")}
        />
      </label>

      <label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition flex items-center justify-center"
                onClick={() => videoInputRef.current.click()} // Trigger file input on click
              >
                <VideoIcon className="size-5 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload Video</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFileSelect(e, "video")}
        />
      </label>

      <div className="relative" ref={emojiPickerRef}>
        <button
          type="button"
          className="p-2 rounded-full bg-muted hover:bg-muted/80 transition flex items-center justify-center"
          title="Stickers/Emojis"
          onClick={toggleEmojiPicker}
        >
          <Smile className="text-primary size-5" />
        </button>
        {isEmojiPickerOpen && (
          <div className="absolute bottom-full mb-2 left-0 bg-card border border-muted-foreground rounded-lg shadow-md z-10">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme={theme === "dark" ? "dark" : "light"}
            />
          </div>
        )}
      </div>

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
        onClick={() => handleSendMessage(message)}
        title="Send Message"
        disabled={sendingMessage || uploadStatus.loading}
      >
        {sendingMessage || uploadStatus.loading ? (
          <Loader2 className="animate-spin w-5 h-5 text-foreground" />
        ) : (
          <SendIcon className="w-5 h-5 text-foreground" />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
