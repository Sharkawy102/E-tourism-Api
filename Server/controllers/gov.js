import GOV from "../model/gov.js";
import Blogs from "../model/blogs.js";
import createError from "../utils/error.js";

export const createGov = async(req, res)=>{
    const newGOV = new GOV(req.body);
    try {
        const savedGOV = await newGOV.save();
        res.status(200).json(savedGOV);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateGov = async(req, res)=>{
    try {
        const updateGOV = await GOV.findByIdAndUpdate(req.params.id, {$set: req.body} , {new :true});
        res.status(200).json(updateGOV);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteGov = async(req, res)=>{
    try {
        const deleteGOV = await GOV.findByIdAndDelete(req.params.id);
        res.status(200).json("Government has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getGov =  async(req, res)=>{
    try {
        const getGOV = await GOV.findById(req.params.id);
        res.status(200).json(getGOV);
    } catch (err) {
        res.status(500).json(err);
    }
};
export const getGovWithBlogs =  async(req, res)=>{
    try {
        const getGOV = await GOV.findById(req.params.id).populate({path:'Blogs', select:[title , document , image]} );
        res.status(200).json(getGOV);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const allGOVs = async(req, res)=>{
    try {
        const GOVs = await GOV.find(req.params.id);
        res.status(200).json(GOVs);
    } catch (err) {
        res.status(500).json(err);
    }
};