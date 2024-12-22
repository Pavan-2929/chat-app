import React from "react";
import { Button } from "./ui/button";
import { Bell, Bookmark, Home, Compass, User, User2Icon, ListFilter } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Menubar = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Button
        asChild
        variant="ghost"
        title="Home"
        className="flex items-center justify-start gap-3"
      >
        <NavLink to="/">
          <Home />
          <p className="hidden lg:inline">Home</p>
        </NavLink>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Profile"
        className="flex items-center justify-start gap-3"
      >
        <NavLink to="/Profile">
          <User2Icon />
          <p className="hidden lg:inline">Profile</p>
        </NavLink>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Users"
        className="flex items-center justify-start gap-3"
      >
        <NavLink href="/users">
          <ListFilter />
          <p className="hidden lg:inline">Users</p>
        </NavLink>
      </Button>
    </div>
  );
};

export default Menubar;
