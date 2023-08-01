import express from "express"
import { createGov ,updateGov , deleteGov , getGov , getGovWithBlogs ,allGOVs } from "../controllers/gov.js";
const router = express.Router();

// Create GOV
router.post("/createGOVs" , createGov );
//Update GOV
router.put("/updateGOVs/:id" ,updateGov );
// DELETE
router.delete("/deleteGOVs/:id" ,deleteGov );
//GET
router.get("/getGOVs/:id" , getGov);
router.get("/getGOVwithBlogs/:id" , getGovWithBlogs);
//GET ALL
router.get("/GOVs" , allGOVs);
export default router;