import User from "../model/user.js";
import createError from "../utils/error.js";



export const updateUser = async(req, res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body} , {new :true});
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteUser = async(req, res)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getUser =  async(req, res)=>{
    try {
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const allUsers = async(req, res)=>{
    try {
        const users = await User.find(req.params.id);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};