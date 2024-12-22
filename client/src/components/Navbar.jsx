import React from "react";
import ThemeToggler from "./ThemeToggler";
import UserButton from "./UserButton";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-card sticky top-0 left-0 z-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-5 py-3 sm:gap-y-0">
        <div className="text-2xl font-bold text-primary">
          <NavLink to="/">Alpha-chat</NavLink>
        </div>
        <div className="ms-auto lg:space-x-5 flex items-center">
          <ThemeToggler />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
