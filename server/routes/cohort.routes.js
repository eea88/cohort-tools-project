const express = require("express");
const Cohort = require("../models/Cohort.model");

const router = express.Router();

router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log(("Retrieved cohorts:", cohorts));
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

module.exports = router;
