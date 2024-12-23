import React, { useState } from "react";
import {
  Bell,
  Bookmark,
  Home,
  Compass,
  User,
  User2Icon,
  ListFilter,
  MessageCircleCode,
  MessageCircleIcon,
  LogOut,
  Settings,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "@/utils/Constant";
import axios from "axios";
import { logout, setUser } from "@/redux/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import ThemeToggler from "./ThemeToggler";

const Menubar = ({ className, onMenuChange }) => {
  const [selectedButton, setSelectedButton] = useState("chats");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (onMenuChange) {
      onMenuChange(buttonName);
    }
  };

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
    <div className={cn(className)}>
      <div className="sm:space-y-7 flex sm:block px-4 gap-x-7 py-1">
        <NavLink
          to="/"
          className={`flex items-center justify-start gap-3 ${
            selectedButton === "chats"
              ? "text-primary"
              : "text-muted-foreground"
          } hover:text-primary/70 transition-all`}
          onClick={() => handleButtonClick("chats")}
        >
          <MessageCircleIcon size={25} />
        </NavLink>
        <NavLink
          className={`flex items-center justify-start gap-3 ${
            selectedButton === "profile"
              ? "text-primary"
              : "text-muted-foreground"
          } hover:text-primary/70 transition-all`}
          onClick={() => handleButtonClick("profile")}
        >
          <User2Icon size={25} />
        </NavLink>
        <p
          className={`flex items-center justify-start gap-3 ${
            selectedButton === "logout"
              ? "text-primary"
              : "text-muted-foreground"
          } hover:text-primary/70 transition-all`}
          onClick={handleLogout}
        >
          <LogOut size={25} />
        </p>
        <div className="sm:hidden">
          <ThemeToggler />
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col flex-row justify-between gap-x-5 items-center gap-y-7">
        <div>
          <ThemeToggler />
        </div>
        <div
          to="/profile"
          onClick={() => handleButtonClick("profile")}
          className="cursor-pointer"
        >
          <UserAvatar avatarUrl={currentUser.avatarUrl} size={30} />
        </div>
      </div>
    </div>
  );
};

export default Menubar;
