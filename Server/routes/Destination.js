import express from "express";
import { createDestination, updateDestination ,deleteDestination , getDestination , searchDestination , allDestination  , destinationsByGOV} from "../controllers/destination.js";
const router = express.Router();

// Create Hotel
router.post("/createDestination" , createDestination );
//Update Hotel
router.put("/updateDestination/:id" ,updateDestination );
// DELETE
router.delete("/deleteDestination/:id" ,deleteDestination );
//GET
router.get("/getDestination/:id" , getDestination);
//GET ALL
router.get("/Destination" , allDestination);
//search
router.get("/search" ,searchDestination);
router.get('/Destination/:govid',destinationsByGOV);

export default router;