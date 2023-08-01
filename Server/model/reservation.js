import mongoose from "mongoose";
import Plan from "./plans.js";
const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  persons: {
    type: Number,
    enum:[1,2,3,4,5],
    required: true,
  },
  plan: {
    type: String,
    enum: ["Verginia Sharm Resort & Aqua Park", "NUP INN", "Nefertiti Hotel", "Jaz Almaza Beach Resort"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
  },
});




bookingSchema.virtual("totalPrice").get(function () {
    const planPrice = this.constructor.planPrices[this.plan] || 0;
    return planPrice * this.persons;
  });
  
  bookingSchema.statics.planPrices = {
    "Verginia Sharm Resort & Aqua Park": 80,
    "NUP INN": 90,
    "Nefertiti Hotel": 75,
    "Jaz Almaza Beach Resort": 65,
  };
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

