import RESTAURANT from "../model/restaurant.js";
import createError from "../utils/error.js";
import GOV from "../model/gov.js";

export const createRestaurant = async(req, res)=>{
    const govID = req.body.goviD;
    const newRestaurant = new RESTAURANT(req.body);
    try {
        const savedRestutant = await newRestaurant.save();
        try {
            await GOV.findByIdAndUpdate(govID,{
                $push: {Restaurant: savedRestutant._id}
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRestutant);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateRestaurant = async(req, res)=>{
    try {
        const updateRestaurant = await RESTAURANT.findByIdAndUpdate(req.params.id, {$set: req.body} , {new :true});
        res.status(200).json(updateRestaurant);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteRestaurant = async(req, res)=>{
    try {
        const deleteRestaurant = await RESTAURANT.findByIdAndDelete(req.params.id);
        res.status(200).json("Restaurant has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getRestaurant =  async(req, res)=>{
    try {
        const getRestaurant = await RESTAURANT.findById(req.params.id);
        res.status(200).json(getRestaurant);
    } catch (err) {
        res.status(500).json(err);
    }
};


export const allRestaurants = async(req, res)=>{
    try {
        const Restaurants = await RESTAURANT.find(req.params.id);
        res.status(200).json(Restaurants);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const restaurantsByGOV =  async (req, res, next) => {
    try {
      const govId = req.params.govid;
      const gov = await GOV.findOne({_id:govId});
      const objectIds = await GOV.distinct('Restaurant', {_id: govId});
      const RESTAURANTs = [];
      for (const restaurantId of objectIds) {
        const Restaurant = await RESTAURANT.findById(restaurantId);
        RESTAURANTs.push(Restaurant);
    }
    res.json(RESTAURANTs);
    } catch (error) {
      next(error);
    }
    
};