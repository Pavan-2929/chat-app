import { cn } from "@/lib/utils";
import { SERVER_URL } from "@/utils/Constant";
import { MessageCircle, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import UserAvatar from "./UserAvatar";
import axios from "axios";
import UserBox from "./UserBox";

const UserChats = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/user/get/all`, {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchSubmit = (e) => {};

  return (
    <div className={cn("", className)}>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-primary">Chats</h1>
        <MessageCircle className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <Input
            className="pr-12 border bg-card placeholder:text-muted-foreground py-3 rounded-md"
            value={searchValue}
            placeholder="Search users..."
            onChange={handleSearch}
          />
          <SearchIcon className="absolute right-4 top-1/2 w-5 h-5 transform -translate-y-1/2 text-muted-foreground" />
        </form>
      </div>
      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <UserBox
              key={user._id}
              user={user}
              selectedUser={selectedUser}
              handleSelectUser={handleSelectUser}
            />
          ))
        ) : (
          <p className="text-muted-foreground">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserChats;
