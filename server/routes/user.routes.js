const User = require("../models/User.model");
const express = require("express");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

const router = express.Router();

router.get("/user/:userId", isAuthenticated, (req, res) => {
   
    const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "sorry, there was a problem with the server. Contact Marina",
      });
    });
});

module.exports = router;