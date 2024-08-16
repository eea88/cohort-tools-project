// this file is going to contain all the routes for LOGIN SIGNUP and VERIFY (to verify if the token is correct)
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

const saltRounds = 10;

// on this route we are going to create a new user
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // we check if all the fields are there
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields must be completed" });
  }

  //we are going to check if the password is SAFE, 8 characters minimum, one lower one upper 
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const passwordIsSafe = regex.test(password);

  if (passwordIsSafe) {
    const salt = bcrypt.genSaltSync(saltRounds);

    // we MUST NOT store the password directly
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.create({ name, email, password: hashedPassword })
      .then((response) => res.json(response))
      .catch((error) => {
        console.error(error);

        res.status(500).json({ message: "Sorry, this didn't work" });
      });
  } else {
    res.status(400).json({
      message:
        "Your password has to contain at least one lower case, one upper case, one number and be at least 8 characters long",
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // we check if all the fields are there
  if (!email || !password) {
    res.status(400).json({ message: "All fields must be completed" });
  }

  User.find({ email })
    .then((response) => {
      if (response.length == 0) {
        return res.status(404).json({ message: "User NOT found" });
      }
      
      const correctPassword = bcrypt.compareSync(
        password,
        response[0].password
      );

      if (!correctPassword) {
        return res.status(401).json({ message: "Password is NOT correct" });
      }

      
      const { email, name, _id } = response[0];
      const payload = { email, name, _id };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "365d",
      });

      res.json({ authToken });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Sorry, this didn't work" });
    });
});

router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});

module.exports = router;
