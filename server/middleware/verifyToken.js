const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserSchema.js");

async function verifyJwt(req, res, next) {
    const jsonwebtoken = req.cookies.jwt;
    console.log(req.cookies);

    if (!jsonwebtoken) {
        return res.status(401).send({msg: "No token provided"});
    }

    jwt.verify(jsonwebtoken, process.env.SUPERSECRETJWT, async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({msg: "User not authenticated"});
        }

        let email = decoded.email;
        req.user = decoded;

        try {
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).send({msg: "User not found"});
            }
            console.log(user, "USER2");
            req.user.id = user._id;
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).send({msg: "Internal server error"});
        }
    });
}

module.exports = verifyJwt;