import User from "../model/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(errorHandler(401, "Token not found"));
  }
  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(isVerified.id).select("-password");

    if (user) {
      req.id = user._id;
      next();
    } else {
      return next(errorHandler(404, "User not found"));
    }
  } catch (error) {
    return next(errorHandler(401, "Invalid token"));
  }
};

export default verifyToken;
