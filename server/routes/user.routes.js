import express from "express";
import { getAllUsers, getUserData, updateProfile } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/get", verifyToken, getUserData);
userRouter.get("/get/all", verifyToken, getAllUsers);
userRouter.patch("/update", verifyToken, updateProfile);

export default userRouter;
