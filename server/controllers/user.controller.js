import User from "../model/UserModel.js";

export const getUserData = async (req, res, next) => {
  try {
    const userID = req.id.toString();

    const user = await User.findById(userID).select("-password");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
