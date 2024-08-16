const express = require("express");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.get("/users/:userId", isAuthenticated, (req, res) => {
    const {userId} = req.params
    
    User.findById(userId)
        .then((user) => {
            res.status(201).json(user)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Error while retrieving user" });
        });
})

module.exports = router