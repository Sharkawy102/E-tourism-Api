import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    room : {
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        enum:['single' , 'double' , 'triple','king'],
    },
    price : {
        type:Number,
        required : true
    },
    maxPeople: {
        type: Number
    },
    facilities:{
        type: [String],
        enum: ['Bar','Conference and meeting facilities','Fitness room',
        'Sauna','Non-smoking rooms','Pet friendly','Restaurant', 'Wi-Fi']
        //required : true
    },
    img: {
        type:[String],
        //required : true
    },
    roomNumber: [{ number : Number , unavailableDates: {type : Date}}],
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
       //required: true

    },
    
    },
    {
        timestamps: true,
    },
);
export default mongoose.model("Room" , roomSchema)
