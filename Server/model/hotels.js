import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  gov:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'GOV',
    //required:true
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  
  type: {
    type: String,
    //required: true,
  },
  distance:{
    type : [String],
  },
  Photos: {
    type : [String],
  },
  desc: {
    type : String,
    //required: true,
  },
  rating:{
    type: Number,
    min: 0,
    max:5,
  },
  price:{
    type:Number,
  },
  rooms: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Rooms",
  },
  
  featured: {
    type: Boolean,
    default: false,
  },
},
    {
        timestamps: true,
    },
);
export default mongoose.model("Hotel", hotelSchema);

