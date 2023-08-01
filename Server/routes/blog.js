import express from "express";
import { createBlog ,updateBlog , deleteBlog , getBlog ,allBlogs ,addComment  , blogsByGOV, searchBlogs} from "../controllers/blogs.js";
const router = express.Router();

// Create Hotel
router.post("/createBlogs" , createBlog );
//Update Hotel
router.put("/updateBlogs/:id" ,updateBlog );
// DELETE
router.delete("/deleteBlogs/:id" ,deleteBlog );
//GET
router.get("/getBlogs/:id" , getBlog);
//GET ALL
router.get("/Blogs" , allBlogs);
//search
router.get("/search" ,searchBlogs)
//ADD COMMENT
router.post("/addComment/:id" , addComment);

// Define a route to get all blogs in government by govid
router.get('/blogs/:govid',blogsByGOV);


export default router;