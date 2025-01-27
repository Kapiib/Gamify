const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createJwt = require("../utils/createJwt.js")
const createCookie = require("../utils/createCookie.js")

const saltRounds = parseInt(process.env.SALTROUNDS);    

const authController = {
    login: (async (req, res) => {

        try {
            const { email, password} = req.body;

        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(404).send({msg: "User not found"});
        }

        console.log(user);
        let hashedPassword = user.password;
        const isPassword = await bcrypt.compare(password, hashedPassword);
        console.log(isPassword);

        if(isPassword) {
            let role = "user";
            
            const jwtToken = createJwt(email, role);
            await createCookie(res, jwtToken);
            
            res.cookie("jwt", jwtToken, { 
                httpOnly: true, 
                maxAge: 5 * 60 * 1000,
                secure: process.env.NODE_ENV === "production"
            });

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

        const role = "user";   

        try {
            const exisitngUser = await user.findOne({email:email});
                if(existingUser) {
            }
        } catch (error) {
            return res.status(409).send({msg: "Email aleready in use"});
        }

        if(password === repeatPassword) {
            bcrypt.hash(password, saltRounds, async function(err, hash) {

                if(err) console.log(err, "error");

                const user = new User({
                    email: email,
                    password: hash,
                    role: role
                });
                console.log(user);
                user.save();
                res.status(201).send({msg: "Succesfully signed up", user:user, redirect: '/login'});

            })
        } else {
            res.status(300).send({msg: "Please check your signup"})
        }
    })
};

module.exports = authController;