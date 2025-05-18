import User from "../modules/user.modules.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res
        .status(400)
        .json({ message: "Must provide an email, password and the full name" });
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must contain at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exist with this email." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (e) {
    console.log("Error in Signup Controller", e.message);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentionals" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid Credentionals" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (e) {
    console.log("Error in Login Controller ", e.message);
    res.status(500).json({ message: "Indernal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (e) {
    console.log("Error in Logout Controller ", e.message);
    res.status(500).json({ message: "Indernal Server Error" });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      res.status(400).json({ message: "Profile Pic is required" });
    }

    const uploadedResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadedResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (e) {
    console.log("Error in Update Profile: ", e.message);
    res.status(500).json({ message: "Internal Servr Error" });
  }
};

export const updateFullName = async (req, res) => {
  try {
    const { fullName } = req.body;
    const userId = req.user._id;

    if (!fullName) {
      res.status(400).json({ message: "Full Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating full name:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    console.log("Error in checkAuth controller: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
