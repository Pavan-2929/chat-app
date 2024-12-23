import React from "react";
import loginImage from "../../assets/login.png";
import { NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex h-full max-h-[40rem] w-full max-w-[60rem] overflow-hidden rounded-xl bg-card shadow-xl">
        <img
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
        <div></div>
        <div className="w-full space-y-8 overflow-y-auto bg-card px-8 py-6 md:w-1/2">
          <div className="text-center">
            <p className="text-2xl font-bold">Login to Alpha</p>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <NavLink
              to="/register"
              className="block text-sm text-center hover:underline"
            >
              Don't have an account? Register
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
