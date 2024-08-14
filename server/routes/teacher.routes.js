const express = require("express");
const Teacher = require("../models/Teacher.model");

const router = express.Router();

router.get("/teachers", (req, res) => {
  Teacher.find({})
    .then((teachers) => {
            res.json(teachers);
    })
    .catch((error) => {
      console.error("Error while retrieving teachers ->", error);
      res.status(500).json({ error: "Failed to retrieve teachers" });
    });
});

module.exports = router;

//creating new teacher
router.post("/teachers",(req,res)=>{
  Teacher.create(req.body)
  .then((teacher) =>{
      res.json(teacher);    
  })
  .catch((error) =>{
      console.error(error);
      res
          .status(500)
          .json({
              message:
                  "sorry, there was a problem with the server. Contact Marina"
          });
  })
})


router.get("/teachers/:teacherId",(req,res)=>{
  const teacherId = req.params.teacherId;
  Teacher.findById(teacherId)
      /* .populate("players") */
      .then((teacher) =>{
      res.json(teacher);    
  })
      .catch((error) =>{
          console.error(error);
          res
              .status(500)
              .json({
                  message:
                      "sorry, there was a problem with the server. Contact Marina"
              });
      })    
})

//deleting teachers
router.delete("/teachers/:teacherId",(req,res)=>{
  //we are desturcuting the params to get the playerId
  const {teacherId} = req.params;
  console.log(teacherId);
  
  Teacher.findByIdAndDelete(teacherId)
  .then(()=>{
      res.status(202).json({message:"The player has been deleted"});
  })
  .catch((error) =>{
      console.error(error);
      res
          .status(500)
          .json({
              message:
                  "sorry, there was a problem with the server. Contact Marina"
          });
  })
})

//updating teachers:
router.put("/teachers/:teacherId",(req,res)=>{
  //we are destructuring the params to get the teacherId
  const {teacherId} = req.params;
  const updatedTeacher = req.body;


  Teacher.findByIdAndUpdate(teacherId, updatedTeacher, {new: true})
  .then((teacher)=>{
      res.json({message:"The player has been updated", teacher});
  })
  .catch((error) =>{
      console.error(error);
      res
          .status(500)
          .json({
              message:
                  "sorry, there was a problem with the server. Contact Marina"
          });
  })
})
