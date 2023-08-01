import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.js";
import govRoute from "./routes/gov.js";
import blogRoute from "./routes/blog.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import restaurantRoute from "./routes/restaurant.js";
import destinationRoute from "./routes/Destination.js";
import SearchRoute from "./routes/search.js";
import planRoute from "./routes/reservation.js";

const app = express();
dotenv.config();

// Database connections
const db_connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to Mongo");
    } catch (error) {
        throw error;
    }
}

// app.use(cors(
//     {
//         "origin": "http://127.0.0.1:5503",
//         "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//         "preflightContinue": false,
//         "optionsSuccessStatus": 204
//       }
// ))
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", 'http://127.0.0.1:5503');
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     next();
//   });
// app.use(cors({
//     origin: 'http://localhost:5503/',
//     credentials: true
//   }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5503");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
// app.use(cors({
//   //origin: ["http://127.0.0.1:5173/", "http://127.0.0.1:5174/"],
//   origin: ["http://localhost:5503/"],
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true
// }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.text({ type: 'text/html' })); // parse an HTML body into a string
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static('public'));

// Parse incoming request bodies as JSON
app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/gov", govRoute);
app.use("/api/blog", blogRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/destination", destinationRoute);
app.use("/api/Search", SearchRoute);
app.use("/api/reservation", planRoute);
app.use("/api/plans", planRoute);
      
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(process.env.PORT, () => {
    db_connect();
    console.log(`this port is running on port ${process.env.PORT}`);
})