require("dotenv").config()
const express=require("express");
const cors = require("cors");
const connectWithDB = require('./config/db');
const cloudinary = require("cloudinary").v2;
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
//connect with database
connectWithDB();

//cloudinary configurations
cloudinary.config({
    cloud_name: 'dxik9wbus', 
    api_key: '954365877634353', 
    api_secret: 'wqlrzsU8fdkFKkcRnC3dn3F5kl4'
})

const app = express();

app.use(cookieParser());

//cookie session
app.use(
    cookieSession({
        name: "session",
        maxAge:process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
        keys: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === "production", // true only in production
        sameSite: "none",
        httpOnly : true,
    })
    );

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
    origin: "http://localhost:5186",
    credentials:true,
    })
);

// Routes
app.use("/",require("./routes/user"));
app.use("/places", require("./routes/place"));  // note: singular 'place'

//Strat server
app.listen(process.env.PORT || 8000,(err) => {
    if(err){
        console.log("Error is there while connecting the server:",err);
    }
    console.log(`Server is running on the port no.${process.env.PORT}`);
    });

module.exports = app;

