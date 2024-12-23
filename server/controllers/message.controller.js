import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../Socket/server.js";
import errorHandler from "../utils/errorHandler.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    console.log(message);

    const { receiverId } = req.params;
    const senderId = req.id.toString();

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
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error in sending message"));
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
      return res.status(201).json([]);
    }

    const messages = conversation.messages || [];
    console.log(messages);

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Error retrieving messages"));
  }
};
