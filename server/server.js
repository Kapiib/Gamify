const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const gameRoutes = require("./routes/gameRoutes.js");
const tagRoute = require("./routes/tagRoute.js");

const app = express();

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoute);

app.get("/", (req, res) => {
    res.send("Hello");
    
})

app.listen(process.env.PORT);