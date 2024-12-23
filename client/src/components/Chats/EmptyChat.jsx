import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navbar from "../Navbar";

const EmptyChat = () => {
  return (
    <div style={{zIndex: 10}} className="w-full h-screen bg-background flex flex-col items-center sm:justify-center text-center  sm:p-6 ">
      <div className="sm:hidden inline-block mb-32">
        <Navbar />
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1.2 }}
        className="flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary-foreground shadow-lg"
      >
        <MessageCircle size={48} className="text-white" />
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-6 text-3xl font-bold text-foreground"
      >
        No Chats Yet
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="mt-4 text-lg text-muted-foreground px-6 sm:px-0"
      >
        Select a user to start chatting and share your thoughts instantly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="mt-10 hidden sm:inline"
      >
        <motion.div
          className="relative flex justify-center items-center w-64 h-64"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            type: "spring",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl"></div>
          <div className="absolute inset-0 animate-ping rounded-full bg-accent/30"></div>
          <div className="absolute w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center w-40 h-40 rounded-full bg-primary/20 shadow-lg"
            >
              <MessageCircle size={64} className="text-primary" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="mt-8 sm:inline hidden"
      >
        <button
          className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-lg rounded-lg shadow-lg hover:bg-primary/80 transition-transform transform hover:scale-105"
          onClick={() => alert("Please select a user to chat with!")}
        >
          Start Chatting
        </button>
      </motion.div>
    </div>
  );
};

export default EmptyChat;
