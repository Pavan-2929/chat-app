import React from "react";
import UserAvatar from "../UserAvatar";
import { Eye } from "lucide-react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const lastSeenTime = selectedUser.lastSeen
    ? new Date(selectedUser.lastSeen).toLocaleString()
    : null;

  return (
    <div className="flex items-center justify-between py-3 px-5 border-b border-muted-foreground/50">
      <div className="flex items-center gap-4">
        <UserAvatar avatarUrl={selectedUser.avatarUrl} size={52} />
        <div>
          <p className="text-lg font-semibold">{selectedUser.username}</p>
          <p className="text-sm text-muted-foreground">
            {selectedUser.status === "online"
              ? "Active now"
              : lastSeenTime
              ? `Last seen: ${lastSeenTime}`
              : `About: ${selectedUser.about}`}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-2 rounded-full bg-muted">
        <Eye className="w-5 h-5 text-primary" />
      </div>
    </div>
  );
};

export default ChatHeader;
