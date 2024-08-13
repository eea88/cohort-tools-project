const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const PORT = 5005;
const dotenv = require("dotenv");
const Cohort = require("./models/Cohort.model")
const Student = require("./models/Student.model")
const Teacher = require("./models/Teacher.model")



dotenv.config();

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
mongoose
  .connect(process.env.MONGODB)
  .then((response) =>
    console.log(`Connected to Database: "${response.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to MongoDB", err));


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173','http://localhost:5174','http://localhost:5175','http://localhost:5176','http://localhost:5177' ]
  })
);



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
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

app.get("/api/students", (req, res) => {
  const newObjectId = new mongoose.Types.ObjectId();
  Student.updateOne({firstName : "Christine"}, {_id : newObjectId})
  .then((students) => {
    console.log(("Retrieved students:", students));
    res.json(students);
  })
  .catch((error) => {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  });
});

app.get("/api/teachers", (req, res) => {
  Teacher.find({})
    .then((teachers) => {
      
      console.log((newObjectId));
      res.json(teachers);
    })
    .catch((error) => {
      console.error("Error while retrieving teachers ->", error);
      res.status(500).json({ error: "Failed to retrieve teachers" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});