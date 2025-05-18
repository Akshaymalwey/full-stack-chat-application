import jwt from "jsonwebtoken";
import User from "../modules/user.modules.js";

export const protectRoute = async (req, res, next) => {
  console.log("Protect Route is Hit")
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user
    next()
  } catch (e) {
    console.log("Error in the Auth-Middleware: ", e.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};
