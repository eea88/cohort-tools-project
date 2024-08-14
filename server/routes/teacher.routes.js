const express = require("express");
const Teacher = require("../models/Teacher.model");

const router = express.Router();

router.get("/teachers", (req, res) => {
  Teacher.find({})
    .then((teachers) => {
      console.log(newObjectId);
      res.json(teachers);
    })
    .catch((error) => {
      console.error("Error while retrieving teachers ->", error);
      res.status(500).json({ error: "Failed to retrieve teachers" });
    });
});

module.exports = router;
