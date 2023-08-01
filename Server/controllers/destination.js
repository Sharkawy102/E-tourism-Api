import Destination from "../model/Destination.js";
import createError from "../utils/error.js";
import GOV from "../model/gov.js"


export const createDestination = async(req, res)=>{
    const govID = req.body.goviD;
    const newDestination = new Destination(req.body);
    try {
        const savedDestination = await newDestination.save();
        try {
            await GOV.findByIdAndUpdate(govID,{
                $push: {Destination: savedDestination._id}
            });
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedDestination);
    } catch (err) {
        res.status(500).json(err);
    }
};


export const updateDestination = async(req, res)=>{
    try {
        const updateDestination = await Destination.findByIdAndUpdate(req.body.id, {$set: req.body} , {new :true});
        res.status(200).json(updateDestination);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteDestination = async(req, res)=>{
    try {
        const deletedDestination = await Destination.findByIdAndDelete(req.params.id);

        // Remove reference to deleted blog ID in GOV model
        await GOV.findOneAndRemove({ destination: deletedDestination._id  });

        res.status(200).json("Blog has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
};


export const getDestination =  async(req, res)=>{
    try {
        const getDestination = await Destination.findById(req.params.id);
        res.status(200).json(getDestination);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const searchDestination = async (req, res) => {
    try {
      const query = req.query.q; // Get the search query from the request query string
      const blogs = await Destination.find({ $text: { $title: query } }); // Find all blog posts that match the query using MongoDB's text search functionality
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  };

export const allDestination = async(req, res)=>{
    try {
        const blogs = await Destination.find(req.params.id);
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addComment = async(req , res,next)=>{
    const blogId =req.params.BlogID;
    const newComment = new COMMENT(req.body);
    try {
        const savedComment =await newComment.save();
        try {
            await Blogs.findByIdAndUpdate(blogId,
            {$push: {comment: savedComment._id}  } 
            )
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedComment);
    } catch (err) {
        next(err);
    }
}

export const destinationsByGOV =  async (req, res, next) => {
    try {
      const govId = req.params.govid;
      const gov = await GOV.findOne({_id:govId});
      const objectIds = await GOV.distinct('Destination', {_id: govId});
      const Destinations = [gov,];
      for (const destinationId of objectIds) {
        const destination = await Destination.findById(destinationId);
        Destinations.push(destination);
    }
    res.json(Destinations);
    } catch (error) {
      next(error);
    }
    
};
