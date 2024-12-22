import User from "../model/user.model.js";

export const getUserData = async (req, res, next) => {
  try {
    const userID = req.id.toString();

    const user = await User.findById(userID).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.id.toString();

    const users = await User.find({ _id: { $ne: userId } });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
