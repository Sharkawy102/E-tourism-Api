import express from "express"
import { createBook } from "../controllers/reservation.js";
const router = express.Router();

router.post("/bookings", createBook);

export default router;