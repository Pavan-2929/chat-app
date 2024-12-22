import express from "express";
import { getAllUsers, getUserData } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/get", verifyToken, getUserData);
userRouter.get("/get/all", verifyToken, getAllUsers);

export default userRouter;
