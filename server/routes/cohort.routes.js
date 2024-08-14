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

router.post("/cohort", (req, res) => {
  Cohort.create(req.body)
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((error) => {
      console.error(error);
      res.status(201).json({
        message: "Sorry, there was a problem with the server",
      });
    });
});

router.get("/cohort", (req,res) => {
    
  Cohort.find()
  .then((allCohort) => {
      res.json(allCohort);
  })
  .catch((error) => {
      console.error(error);
      res 
      .status(500)
      .json({
          message:
          "Sorry, there was a problem with the server"
      })
  })
})

router.get("/cohort/:id", (req,res) => {
   

  Cohort.findById(req.params.id)
  .then((cohort) => {
      res.status(200).json(cohort);
  })
  .catch((error) => {
      console.error(error);
      res 
      .status(500)
      .json({
          message:
          "Sorry, there was a problem with the server"
      })
  })
});


router.put("/cohort/:id", (req,res) => {
   

  Cohort.findByIdAndUpdate(req.params.id,req.body, {new:true})
  .then((updateCohort) => {
      res.status(200).json(updateCohort);
  })
  .catch((error) => {
      console.error(error);
      res 
      .status(500)
      .json({
          message:
          "Sorry, there was a problem with the server"
      })
  })
});

router.delete("/cohort/:id", (req,res) => {
   

  Cohort.findByIdAndDelete(req.params.id)
  .then(() => {
      res.status(204).send()
  })
  .catch((error) => {
      console.error(error);
      res 
      .status(500)
      .json({
          message:
          "Sorry, there was a problem with the server"
      })
  })
});

module.exports = router;
