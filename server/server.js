const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");
const gameRoutes = require("./routes/gameRoutes.js");
const tagRoute = require("./routes/tagRoute.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

const app = express();

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
console.log(process.env.CORS_ORIGIN, "ORIGIN");
let corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://10.12.52.82",
    methods: ["GET,PUT,POST,DELETE"],
    credentials: true,
}
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoute);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.send("Hello");
    
})

app.listen(process.env.PORT);