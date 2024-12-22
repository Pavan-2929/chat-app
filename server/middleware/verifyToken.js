import User from "../model/UserModel.js";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(errorHandler(401, "Token not found"));
  }
  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(isVerified);

    const user = await User.findById(isVerified.id).select("-password");
    console.log(user);

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
