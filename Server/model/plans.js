import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Plan Name is Required"]

    },
    price:{
        type:Number,
        required: true
        }
        },{timestamps : true}
        );
const Plan=mongoose.model("plan",planSchema);
export default Plan;