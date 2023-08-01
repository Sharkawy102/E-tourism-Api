import express from "express";
import {
    createRoom,
    updateRoom,
    updateRoomAvailability,
    deleteRoom,
    getRoom,
    getRooms,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyTokens.js";

const router = express.Router();
//CREATE
router.post("/createRoom/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/updateRoom/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/deleteRoom/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

router.get("/getRoom/:id", getRoom);
//GET ALL

router.get("/getRooms", getRooms);

export default router;