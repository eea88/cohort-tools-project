const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    background: {type: String, required: true},
    cohort: {type: mongoose.Schema.Types.ObjectId, required: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    image: {type: String, required: true},
    languages: {type: [String], required: true},
    lastName: {type: String, required: true},
    linkedinUrl: {type: String, required: true},
    phone: {type: String, required: true},
    program: {type: String, required: true},
    projects: {type: Array, required: true}
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;