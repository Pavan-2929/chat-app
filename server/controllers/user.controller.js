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

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.id.toString();
    const updates = req.body;

    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
      select: "-password", 
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
