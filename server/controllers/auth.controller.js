import User from "../model/UserModel.js";
import errorHandler from "../utils/errorHandler.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, mobileNumber, password } = req.body;

    const isUserExist = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (isUserExist) {
      return next(errorHandler(400, "User already exist"));
    }

    if (!username || !email || !password || !mobileNumber) {
      return next(errorHandler(400, "Enter all details"));
    }

    const newUser = await User.create({
      username,
      email,
      mobileNumber,
      password,
    });
    const token = await newUser.generateToken();
    const expiryTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    res.cookie("token", token, {
      expires: expiryTime,
      sameSite: "None",
      secure: true,
    });

    const userWithOutPassword = await User.findById(newUser._id).select(
      "-password"
    );

    res.status(200).json(userWithOutPassword);
  } catch (error) {
    console.log("error in registraion", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const validEmail = await User.findOne({ email });
    if (!validEmail) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await validEmail.comparePassword(password);
    if (!validPassword) {
      return next(errorHandler(400, "Enter valid password"));
    }

    const token = await validEmail.generateToken();
    const expiryTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    res.cookie("token", token, {
      expires: expiryTime,
      sameSite: "None",
      secure: true,
    });
    const userWithOutPassword = await User.findById(validEmail._id).select(
      "-password"
    );

    res.status(200).json(userWithOutPassword);
  } catch (error) {
    console.log("error in login", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await res.clearCookie("token");
    res.status(200).json({ message: "User logout" });
  } catch (error) {
    next(error);
  }
};
