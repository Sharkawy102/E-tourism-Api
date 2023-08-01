import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    gov:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GOV',
        //required:true
    },
    title : {
        type : String,
        required: true
    },
    doc : {
        type : String,
        //required: true
    },
    image : {
        type : [String],
    }
    
},
{
    timestamps:true,
});
export default mongoose.model("Destination" , destinationSchema);