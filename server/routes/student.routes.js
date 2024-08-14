const express = require("express");
const Student = require("../models/Student.model");

const router = express.Router();

app.get("/students", (req, res) => {
  Student.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

module.exports = router;
