import express from "express"
import { verifyToken } from "../utils/verifyTokens.js";
import {register , login,  logout} from "../controllers/auth.js"
const router = express.Router();


router.post("/register" ,register);
router.post("/login" ,login);
router.post("/logout" , logout);
router.get('/profile', verifyToken, async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ user: { id: user._id, name: user.name, email: user.email ,isAdmin :user.isAdmin} });
    } catch (error) {
      next(error);
    }
  });

export default router;