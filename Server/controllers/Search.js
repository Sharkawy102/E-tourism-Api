import GOV from "../model/gov.js"
import Blogs from "../model/blogs.js";
import Hotel from "../model/hotels.js";
import Destination from "../model/Destination.js";
import RESTAURANT from "../model/restaurant.js";

export const searchAllModels = async(req , res) =>{
    const models = [GOV, Blogs, Hotel, Destination, RESTAURANT];
    const query = new RegExp(req.body.q);
    const results = [];
    let count = 0;
  try {
    for (const model of models) {
      const modelResults = await model.find({ name: query });
      results.push(...modelResults);
      count++;
    }
    if (count === models.length) {
        results.sort(() => Math.random() - 0.5);
      res.json(results);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while searching the models.");
  } 
}

