const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrentJobs = new Schema({
  JobID: {
    type: String,
  },
  JobTitle: {
    type: String,
  },
  Staff: [],
  ClientID: {
    type: String,
  },
  ClientName: {
    type: String,
  },
  Detail: {
    type: String,
  },
  Days: {
    type: String,
  },
  CheckIn: {
    type: String,
  },
  CheckOut: {
    type: String,
  },
  Date: { type: Date },
});
module.exports = User = mongoose.model("CurrentJobs", CurrentJobs);
