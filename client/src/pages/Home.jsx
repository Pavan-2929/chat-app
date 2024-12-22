import React, { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/utils/Constant";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <div>
        <p>details</p>
        <p>{currentUser && currentUser.username}</p>
      </div>
    </div>
  );
};

export default Home;
