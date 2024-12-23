import React from "react";
import UserButton from "./UserButton";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div className="bg-card sticky top-0 left-0 shadow-md min-w-[100vw]">
      <div className="flex justify-between items-center px-5 py-3">
        <div className="inline">
          <Sidebar />
        </div>
        <div className="z-50 flex items-center gap-4 sm:gap-6 pt-2">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
