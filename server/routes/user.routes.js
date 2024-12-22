import express from "express";
import { getUserData } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/get", verifyToken, getUserData);

export default userRouter
