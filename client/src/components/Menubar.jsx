import React from "react";
import { Button } from "./ui/button";
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
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Menubar = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="sm:space-y-5 flex sm:block">
        <Button
          asChild
          variant="ghost"
          title="Chats"
          className="flex items-center justify-start gap-3"
        >
          <NavLink to="/">
            <MessageCircleIcon size={25} />
          </NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          title="Profile"
          className="flex items-center justify-start gap-3"
        >
          <NavLink to="/Profile">
            <User2Icon size={25} />
          </NavLink>
        </Button>
        <Button
          asChild
          variant="ghost"
          title="Logout"
          className="flex items-center justify-start gap-3"
        >
          <NavLink href="/logout">
            <LogOut size={25} />
          </NavLink>
        </Button>
      </div>
      <Button
        asChild
        variant="ghost"
        title="Logout"
        className="flex items-center justify-start gap-3"
      >
        <NavLink href="/logout">
          <Settings size={25} />
        </NavLink>
      </Button>
    </div>
  );
};

export default Menubar;
