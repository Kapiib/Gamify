const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createJwt(email, role) {
    const jwtToken = jwt.sign({email, role}, process.env.SUPERSECRETJWT);
    console.log(jwtToken, "JWT TOKEN")
    return jwtToken;
};

module.exports = createJwt;