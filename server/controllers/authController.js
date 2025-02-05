const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createJwt = require("../utils/createJwt.js")
const createCookie = require("../utils/createCookie.js")

const saltRounds = parseInt(process.env.SALTROUNDS);    

const authController = {
    login: (async (req, res) => {
        const { email, password} = req.body;

        console.log(req.body, "LOGIN")

        try {
        const user = await User.findOne({email: email});

        console.log(user);
        let hashedPassword = user.password;
        const isPassword = await bcrypt.compare(password, hashedPassword);
        console.log(isPassword);

        if(isPassword) {
            let role = "user";
            
            const jwtToken = await createJwt(email, role);
            await createCookie(res, jwtToken);

            res.status(202).send({msg: "User found!", user:user});
        } else {
            res.status(404).send({msg: "User not found"})
        };
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        };

    }),
    register: (async (req, res) => {
        const {email, password, repeatPassword} = req.body;

        try {
            const role = "user";   

            if (!email) {
                return res.status(400).send({msg: "Email is required"});
            }

            if(password === repeatPassword) {
                console.log("Repeat password test")
                bcrypt.hash(password, saltRounds, async function(err, hash) {

                    if(err) console.log(err, "error");

                    const user = new User({
                        email: email,
                        password: hash,
                        role: role
                    });
                    console.log(user);
                    user.save();
                    res.status(201).send({msg: "Succesfully signed up", user:user});

                })
            } else {
                res.status(300).send({msg: "Please check your signup"})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "internal server error"});
        }
    }),
    user: async (req, res) => {
        console.log(req.user, "USER");
        
        if (!req.user || !req.user.email) {
            return res.status(401).send({ msg: "User not authenticated" });
        }
        
        let email = req.user.email;
        
        try {
            const user = await User.findOne({ email });
    
            if (user) {
                res.status(200).send({ msg: "User found", user: user });
            } else {
                res.status(404).send({ msg: "User not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Internal server error", error: error });
        }
    }
};

module.exports = authController;