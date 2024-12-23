import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/utils/Constant";
import { login, setUser } from "@/redux/auth/authSlice";
import googleImg from "../assets/google.png";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleClick = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${SERVER_URL}/api/auth/google`,
        {
          username: result.user.displayName,
          email: result.user.email,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(login());
        dispatch(setUser(response.data));
        toast({
          description: "Login Successful",
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "Error during login",
        variant: "error",
      });
    }
  };

  return (
    <Button
      type="submit"
      variant="ghost"
      onClick={handleGoogleClick}
      className="flex items-center justify-center gap-3 px-3 py-5 w-full border  rounded-md shadow-md transition duration-200"
    >
      <img src={googleImg} alt="Google Icon" className="w-14 h-8 bg-cover" />
      <span className="text-sm text-foreground">Continue with Google</span>
    </Button>
  );
};

export default GoogleAuth;
