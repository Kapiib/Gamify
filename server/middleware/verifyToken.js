const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserSchema.js");

async function verifyJwt(req, res, next) {
    const jsonwebtoken = req.cookies.jwt;

    await jwt.verify(jsonwebtoken, process.env.SUPERSECRETJWT, (async (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).send({msg: "user not autenticated"});
            return;
        }
        let email = decoded.email;
        req.user = decoded;

        try {
            const user = await User.findOne({email});
            console.log(user, "USER2");
            req.user.id = user._id;
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "no user found"});
            return;
        }

    })).then(() => {
        next();
    })
};

module.exports = verifyJwt;