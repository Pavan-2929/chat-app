import React from "react";
import { useTheme } from "../components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="text-xl bg-accent px-4 py-2 cursor-pointer rounded-md transition-colors duration-200 text-muted-foreground hover:text-secondary-foreground hover:bg-secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </div>
  );
};

export default ThemeToggler;
