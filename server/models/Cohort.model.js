const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const cohortSchema = new Schema ({
    campus:{ type: String, required:true},
    cohortName:{ type: String, required:true},
    cohortSlug:{ type: String, required:true},
    endDate:{ type: String, required:true},
    format:{ type: String, required:true},
    inProgress: {type: Boolean, default: true},
    leadTeacher:{ type: String, required:true},
    program:{ type: String, required:true},
    programManager:{ type: String, required:true},
    startDate:{ type: String, required:true},
    totalHours:{ type: Number,required:true},



})

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;