import express from "express";
import { updateUser , deleteUser , getUser ,allUsers } from "../controllers/users.js";
const router = express.Router();

import { verifyAdmin,  verifyUser } from "../utils/verifyTokens.js";

//Update user
router.put("/updateUser/:id", verifyUser ,updateUser );
// DELETE
router.delete("/deleteUser/:id", verifyUser ,deleteUser );
//GET
router.get("/getUser/:id" ,verifyUser , getUser);
//GET ALL
router.get("/allUsers" ,verifyAdmin , allUsers);
export default router;