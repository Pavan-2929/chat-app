import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", verifyToken, sendMessage);
messageRouter.get("/get/:receiverId", verifyToken, getMessage);

export default messageRouter;
