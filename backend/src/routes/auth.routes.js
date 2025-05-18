import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { login, logout, signup, checkAuth, updateFullName, updateProfilePic } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profilePic', protectRoute, updateProfilePic);
router.put('/update-fullName', protectRoute, updateFullName);
router.get('/check', protectRoute, checkAuth);


export default router;