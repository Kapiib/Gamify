require("dotenv").config();

function createCookie(res, jwtToken) {
     res.cookie("jwt", jwtToken, { 
        httpOnly: true, 
        maxAge: 5 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    });
}

module.exports = createCookie;