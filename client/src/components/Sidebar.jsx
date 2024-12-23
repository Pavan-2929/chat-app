import React, { useState, useRef, useEffect } from "react";
import { Home, Settings, User, Menu, X } from "lucide-react";
import UserChats from "./Chats/UserChats";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex relative overflow-x-auto h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-accent text-foreground border-r border-muted-foreground w-80 p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
                  } md:translate-x-0 md:static z-50`}
              style={{zIndex: 10000}}
      >
        <div className="flex items-center justify-between mb-6">
          <NavLink to="/" className="text-xl text-primary font-bold">My App</NavLink>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-white hover:text-gray-400"
          >
            <Menu size={30} />
          </button>
        </div>
        <UserChats />
      </div>
    </div>
  );
};

export default Sidebar;
