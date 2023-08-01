import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true,
    },
    typeFood:{
        type: String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    image:{
        type:[String],
    },
    rating:{
        type: Number,
        min: 0,
        max:5,
    },
    
},
{
    timestamps:true,
});
export default mongoose.model("RESTAURANT",restaurantSchema);
