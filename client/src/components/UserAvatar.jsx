import React from "react";
import avatarImage from "../assets/avatar.png";
import { cn } from "@/lib/utils";

const UserAvatar = ({ avatarUrl, className, size, isOnline }) => {
  return (
    <div className="relative inline-block border rounded-full">
      <img
        src={avatarUrl || avatarImage}
        alt="User Image"
        height={size ?? 44}
        width={size ?? 44}
        className={cn("rounded-full min-h-full", className)}
      />
      {isOnline && (
        <span
          className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-primary border-2 border-background"
          title="Online"
        />
      )}
    </div>
  );
};

export default UserAvatar;
