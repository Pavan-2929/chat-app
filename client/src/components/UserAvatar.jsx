import React from "react";
import avatarImage from "../assets/avatar.png";
import { cn } from "@/lib/utils";

const UserAvatar = ({avatarUrl, className, size}) => {

  return (
    <img
      src={avatarUrl || avatarImage}
      alt="User Image"
      height={size ?? 48}
      width={size ?? 48}
      className={cn("rounded-full object-cover h-fit ", className)}
    />
  );
};

export default UserAvatar;
