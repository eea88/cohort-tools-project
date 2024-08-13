
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {type:String, required:true},
  phone: {type:Number, required:true},
  program: {type:String, required:true},
  background: String,
  education: String,
  image: {type:String, required:true},
  currentCohort: Number,
  previousCohorts: Array,
  leadTeacher: {type:Boolean, required:true},
  assistantTeacher: {type:Boolean, required:true}
});

const Teacher = mongoose.model("Teacher", teacherSchema);

// EXPORT THE MODEL
module.exports = Teacher;