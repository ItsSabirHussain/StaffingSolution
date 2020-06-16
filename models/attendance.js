const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attendance = new Schema({
  StaffID: {
    type: String,
  },
  StaffName: {
    type: String,
  },
  JobID: {
    type: String,
  },
  JobName: {
    type: String,
  },
  Date: {
    type: String,
  },
  CheckIn: {
    type: String,
  },
  CheckOut: {
    type: String,
  },
});
module.exports = User = mongoose.model("Attendance", Attendance);
