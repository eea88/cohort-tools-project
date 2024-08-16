const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const saltRounds = 10;

//SignUp route
router.post("/signup", (req, res, next) => {
    const {email, password, name} = req.body
    //Check if the credentials are empty
    if (email === "" || password === "" || name === "") {
        res.status(400).json({message: "Provide name, email and password"})
        return;
    } 

    //Check if it's a valid email
    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({message: "Provide a valid email address."})
        return;
    }
    //Check if it's a safe password
    const passwordRegex= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passwordRegex.test(password)) {
        res.status(400).json({message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."})
        return;
    }

    User.find({email})
        .then((foundUser) => { //Check if user exists
            if (foundUser[0]) {
                res.status(400).json({message: "User already exists."})
                return;
            }

            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({email, name, password: hashedPassword})//Create user
        })
        .then(({email, name, _id}) => {
            
            //const {email, name, _id} = createdUser; //destructure without password

            const user = {email, name, _id}; //new user object without password

            res.status(201).json({user: user})
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({message: "Internal Server Error"})
        })

})

//Login route
router.post("/login", (req, res, next) => {
    const {email, password} = req.body
    //Check if the credentials are empty
    if(email === "" || password === "") {
        res.status(400).json({message: "Provide an email and a password."})
        return;
    }

    User.find({email})
        .then((foundUser) => {
            if(foundUser[0] === "") {
                res.status(401).json({message: "User not found."})
                return;
            }
            //Check if password matches
            const correctPassword = bcrypt.compareSync(password, foundUser[0].password) 

            if(!correctPassword) { 
                res.status(401).json({message: "Password is incorrect."})
                return;
            }

            const {email, name, _id} = foundUser 
            const payload = {email, name, _id}

            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: "3h"
            })

            res.json({authToken})
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({message: "Internal Server Error"})
        })
})

router.get("/verify", isAuthenticated, (req, res) => {
    res.json(req.payload)
})

module.exports = router