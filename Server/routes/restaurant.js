import express from "express"
import { createRestaurant , updateRestaurant , deleteRestaurant, getRestaurant ,allRestaurants , restaurantsByGOV} from "../controllers/restaurant.js"
const router = express.Router();

// Create GOV
router.post("/createRestaurant" , createRestaurant );
//Update GOV
router.put("/updateRestaurant/:id" ,updateRestaurant );
// DELETE
router.delete("/deleteRestaurant/:id" ,deleteRestaurant );
//GET
router.get("/getRestaurant/:id" , getRestaurant);
//GET ALL
router.get("/Restaurants" , allRestaurants);
router.get('/Restaurants/:govid',restaurantsByGOV);
export default router;