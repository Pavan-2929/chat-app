import React from "react";
import avatarImage from "../assets/avatar.png";
import { cn } from "@/lib/utils";

const UserAvatar = ({ avatarUrl, className, size, isOnline }) => {
  return (
    <div className="relative inline-block">
      <img
        src={avatarUrl || avatarImage}
        alt="User Image"
        height={size ?? 48}
        width={size ?? 48}
        className={cn("rounded-full object-cover h-fit", className)}
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
