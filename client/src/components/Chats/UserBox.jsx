import React, { useEffect } from "react";
import UserAvatar from "../UserAvatar";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/auth/chatSlice";

const UserBox = ({ user, selectedUser, handleSelectUser }) => {
  const dispatch = useDispatch();

  const isSelected = selectedUser && selectedUser._id === user._id;

  useEffect(() => {
    if (selectedUser) {
      dispatch(setSelectedUser(selectedUser));
    }
  }, [dispatch, selectedUser]);

  return (
    <>
      <div
        onClick={() => handleSelectUser(user)}
        className={`flex items-center gap-4 rounded-md p-2 hover:bg-card/90 cursor-pointer transition ${
          isSelected ? "bg-card/90" : ""
        }`}
      >
        <UserAvatar avatarUrl={user.avatarUrl} />
        <div className="flex flex-col flex-grow">
          <span className="font-medium text-lg">{user.username}</span>
          <span className="text-sm text-muted-foreground">
            {user.status === "online"
              ? "Online"
              : user.lastSeen
              ? `Last seen: ${new Date(user.lastSeen).toLocaleString()}`
              : `About: ${user.about}`}
          </span>
        </div>
      </div>
      <div className="w-full border-b border-card-foreground/50 mt-2"></div>
    </>
  );
};

export default UserBox;