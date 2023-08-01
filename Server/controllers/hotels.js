import Hotel from "../model/hotels.js";
import createError from "../utils/error.js";
import GOV from "../model/gov.js";

export const createHotel = async(req, res)=>{
    const govID = req.body.goviD;
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        try {
            await GOV.findByIdAndUpdate(govID,{
                $push: {hotels: savedHotel._id}
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateHotel = async(req, res)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body} , {new :true});
        res.status(200).json(updateHotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteHotel = async(req, res)=>{
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getHotel =  async(req, res)=>{
    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const allHotels = async(req, res)=>{
    try {
        const hotels = await Hotel.find(req.params.id);
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const searchHotels = async (req, res) => {
    const { name } = req.query; // Get the name from the request query string
    try {
      const hotels = await Hotel.find({ name: { $regex: new RegExp(name , "i") } }); // Find hotels with a name that matches the specified search term (case-insensitive)
      res.status(200).json(hotels);
    } catch (err) {
      res.status(500).json(err);
    }
  };



export const hotelsByGOV =  async (req, res, next) => {
    try {
      const govId = req.params.govid;
    //   const gov = await GOV.findOne({_id:govId});
      const objectIds = await GOV.distinct('hotels', {_id: govId});
      const hotels = [];
      for (const hotelId of objectIds) {
        const hotel = await Hotel.findById(hotelId);
        hotels.push(hotel);
    }
    res.json(hotels);
    } catch (error) {
      next(error);
    }
    
};