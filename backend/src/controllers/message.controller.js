import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io, userSocketMap } from "../lib/socket.js";
import Messages from "../models/Messages.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getAllContacts", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Messages.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartner: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Messages.find({
      $or: [
        { senderId: userId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: userId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessageByUserId: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;

    const senderId = req.user._id;

    if (!text && !image)
      return res.status(400).json({ message: "Text or image is required" });

    if (senderId.equals(receiverId))
      return res
        .status(400)
        .json({ message: "Cannot send message to yourself" });

    const receiverExists = await User.find({ id: receiverId });
    if (!receiverExists)
      return res.status(404).json({ message: "Reciever not found" });

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Messages({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("Looking for receiver:", receiverId, "Type:", typeof receiverId);
    console.log("Current socket map:", userSocketMap);
    console.log("Receiver socket ID:", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message emitted to receiver:", receiverId);
    } else {
      console.log("Receiver not connected:", receiverId);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
