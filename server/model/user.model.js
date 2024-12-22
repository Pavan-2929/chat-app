import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
  },
  status: {
    type: String,
    default: "offline",
    enum: ["online", "offline"],
  },
  lastSeen: {
    type: Date,
    default: null,
  },
  about: {
    type: String,
    default: "Hey there! I am using this app.",
  },
  isTyping: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error generating token");
  }
};

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
