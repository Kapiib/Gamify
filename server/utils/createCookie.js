require("dotenv").config();

async function createCookie(res, jwtToken) {
    console.log(jwtToken);
     res.cookie("jwt", jwtToken, { 
        httpOnly: true, 
        maxAge: 10 * 60 * 1000,
        secure: process.env.NODE_ENV === "production"
    });
}

module.exports = createCookie;