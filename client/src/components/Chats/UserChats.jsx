import { cn } from "@/lib/utils";
import { SERVER_URL } from "@/utils/Constant";
import { MessageCircle, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import UserAvatar from "../UserAvatar";
import axios from "axios";
import UserBox from "./UserBox";
import Chats from "./ChatsLayout";

const UserChats = ({ className }) => {
  const [users, setUsers] = useState([]); 77
  const [filteredUsers, setFilteredUsers] = useState([]); 7
  const [searchValue, setSearchValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/user/get/all`, {
        withCredentials: true,
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sticky flex-none space-y-9 h-screen bg-accent px-1 sm:px-5 py-1 sm:py-5 shadow-sm lg:w-96">
      <div className="sm:flex hidden justify-between items-center">
        <h1 className="font-bold text-2xl text-primary">Chats</h1>
        <MessageCircle className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="relative">
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <Input
            className="pr-12 border bg-card placeholder:text-muted-foreground py-5 rounded-md"
            value={searchValue}
            placeholder="Search users..."
            onChange={handleSearch}
          />
          <SearchIcon className="absolute right-4 top-1/2 w-5 h-5 transform -translate-y-1/2 text-muted-foreground" />
        </form>
      </div>
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
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
