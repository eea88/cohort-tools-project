const express = require("express");
const Student = require("../models/Student.model");
const Cohort = require("../models/Cohort.model")

const router = express.Router();

router.post("/students", (req, res) => {
  Student.create(req.body)
    .then((student) => {
      res.status(201).json(student)
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({message: "Error while creating a student"})
    })
})

router.get("/students", (req, res) => {
  Student.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ message: "Error while retrieving students" });
    });
});

router.get("/students/cohort/:cohortId", (req, res) => {
  const {cohortId} = req.params
  
  Student.find({cohort : cohortId})
    .then((cohortStudent) => {
      res.status(200).json(cohortStudent)
    })
    .catch((error) => {
      console.error("Error while retrieving student by cohort ->", error);
      res.status(500).json({ message: "Error while retrieving student by cohort" });
    })
})

router.get("/students/:studentId", (req, res) => {
  const {studentId} = req.params
  
  Student.findById(studentId)
    .then((student) => {
      res.status(200).json(student)
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).json({ message: "Error while retrieving student" });
    });
})

router.put("/students/:studentId", (req, res) => {
  const {studentId} = req.params
  const updatedStudent = req.body
  
  Student.findByIdAndUpdate(studentId, updatedStudent, {new : true})
    .then((student) => {
      res.status(200).json(student)
    })
    .catch((error) => {
      console.error("Error while updating student ->", error);
      res.status(500).json({ message: "Error while updating student" });
    });
})

router.delete("/students/:studentId", (req, res) => {
  const {studentId} = req.params

  Student.findByIdAndDelete(studentId)
    .then((student) => {
      res.status(204).json(student)
    })
    .catch((error) => {
      console.error("Error while deleting student ->", error);
      res.status(500).json({ message: "Error while deleting student" });
    });
})

module.exports = router;
