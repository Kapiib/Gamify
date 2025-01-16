const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = parseInt(process.env.SALTROUNDS);    

const authController = {
    login: (async (req, res) => {
        // res.send("login")

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
            const jwToken = jwt.sign({email, role}, process.env.SUPERSECRETJWT);
    
            res.cookie(jwToken, { 
                httpOnly: true,
                maxAge: '5d',
                secure: process.env.NODE_ENV === "production"
            });

            res.status(202).send({msg: "User found!", user:user});
        } else {
            res.status(404).send({msg: "User not found"})
        };

    }),
    register: ((req, res) => {
        // res.send("Created")
        const {email, password, repeatPassword} = req.body;

        if(password === repeatPassword) {
            bcrypt.hash(password, saltRounds, function(err, hash) {

                if(err) console.log(err, "error");

                const user = new User({
                    email: email,
                    password: hash
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