import mongoose from "mongoose";

const userSchema = 
    new mongoose.Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      country:{
        type: String,
      },
      img:{
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
      },
      date_of_birth:{
        type : Date,
        default: Date.now,  
      },
      gender : {
        type :String,
        enum:['male' , 'female']
      },
      phone:{
        type: String,
        required: false,
      },
      isAdmin:{
        type : Boolean,
        default: false
      }
    },
{
    timestamps: true,
}
);
  
export default mongoose.model("User", userSchema);