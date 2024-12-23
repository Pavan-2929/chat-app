import React from "react";
import UserAvatar from "../UserAvatar";
import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useSocketContext } from "@/context/SocketContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Sidebar from "../Sidebar";
import UserButton from "../UserButton";

const ChatHeader = () => {
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center justify-between py-3 px-5 border-b border-muted-foreground/50">
      <div className="flex items-center gap-4">
        <div className="sm:hidden inline">
          <Sidebar />
        </div>
        <div className="sm:block hidden">
          <UserAvatar
            avatarUrl={selectedUser.avatarUrl}
            size={52}
            isOnline={isOnline}
          />
        </div>
        <div className="sm:hidden block pt-1">
          <UserButton />
        </div>
        <div>
          <p className="text-lg font-semibold">{selectedUser.username}</p>
          <p className="text-sm text-muted-foreground line-clamp-1 sm:inline-block hidden">
            {isOnline ? "Online" : `${selectedUser.about}`}
          </p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-center p-2 rounded-full bg-muted cursor-pointer transition-transform hover:scale-110">
            <Eye className="w-5 h-5 text-primary" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-card p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-primary">
              {selectedUser.username}'s Profile
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Here's the profile information of {selectedUser.username}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="">
              <UserAvatar avatarUrl={selectedUser.avatarUrl} size={200} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                {selectedUser.username}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedUser.email}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedUser.about || "No additional information provided."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatHeader;
