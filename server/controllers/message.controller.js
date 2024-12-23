import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../Socket/server.js";
import errorHandler from "../utils/errorHandler.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { type, content } = req.body;
    const { receiverId } = req.params;
    const senderId = req.id.toString();

    if (!["text", "image", "video"].includes(type)) {
      return next(errorHandler(400, "Invalid message type"));
    }

    if (!content || content.trim() === "") {
      return next(errorHandler(400, "Message content cannot be empty"));
    }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      type,
      content,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Error in sending message"));
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.id.toString();

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages || [];
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Error retrieving messages"));
  }
};
