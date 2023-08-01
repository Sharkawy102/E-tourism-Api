import express from "express";
import { searchAllModels } from "../controllers/Search.js";
const router = express.Router();

router.get("/search" , searchAllModels);

export default router;