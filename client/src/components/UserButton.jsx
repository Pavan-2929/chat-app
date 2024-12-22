"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import { LogOut, UserIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "@/utils/Constant";
import { useToast } from "@/hooks/use-toast";
import { logout, setUser } from "@/redux/auth/authSlice";

const UserButton = (className) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(logout());
        dispatch(setUser(null));

        toast({
          description: "Logout Seccussful",
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Error while logout",
        variant: "descrutive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("rounded-full", className)}>
          <UserAvatar avatarUrl={currentUser.avatarUrl} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Logged In as @{currentUser.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NavLink to={`/user/${currentUser.username}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </NavLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
