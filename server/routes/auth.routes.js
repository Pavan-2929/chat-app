import { Router } from "express";
import {
  google,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/google", google);

export default authRoutes;
