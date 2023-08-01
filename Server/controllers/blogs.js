import Blogs from "../model/blogs.js";
import createError from "../utils/error.js";
import GOV from "../model/gov.js"


export const createBlog = async(req, res)=>{
    const govID = req.body.goviD;
    const newBlog = new Blogs(req.body);
    try {
        const savedBlog = await newBlog.save();
        try {
            await GOV.findByIdAndUpdate(govID,{
                $push: {blog: savedBlog._id}
            });
        } catch (error) {
            next(error);
            
        }
        res.status(200).json(savedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
};


export const updateBlog = async(req, res)=>{
    try {
        const updateBlog = await Blogs.findByIdAndUpdate(req.body.id, {$set: req.body} , {new :true});
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteBlog = async(req, res)=>{
    try {
        const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);

        // Remove reference to deleted blog ID in GOV model
        await GOV.findOneAndRemove({ blog: deletedBlog._id  });

        res.status(200).json("Blog has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
};


export const getBlog =  async(req, res)=>{
    try {
        const getBlog = await Blogs.findById(req.params.id);
        res.status(200).json(getBlog);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const searchBlogs = async (req, res) => {
    try {
      const query = req.query.q; // Get the search query from the request query string
      const blogs = await Blogs.find({ $text: { $title: query } }); // Find all blog posts that match the query using MongoDB's text search functionality
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  };

export const allBlogs = async(req, res)=>{
    try {
        const blogs = await Blogs.find(req.params.id);
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

export const blogsByGOV =  async (req, res, next) => {
    try {
      const govId = req.params.govid;
      const gov = await GOV.findOne({_id:govId});
      const objectIds = await GOV.distinct('blog', {_id: govId});
      const blogs = [gov,];
      for (const blogId of objectIds) {
        const blog = await Blogs.findById(blogId);
        blogs.push(blog);
    }
    res.json(blogs);
    } catch (error) {
      next(error);
    }
    
};

