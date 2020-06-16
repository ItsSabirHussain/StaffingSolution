const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobRequest = new Schema({
  Title: {
    type: String,
  },
  Detail: {
    type: String,
  },
  RequiredStaff: {
    type: String,
  },
  RequiredDays: {
    type: String,
  },
  RequiredTime: {
    type: String,
  },
  ClientID: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
  Status: {
    type: String,
  },
  Reason: {
    type: String,
  },
  Concern: {
    type: String,
  },
  Date: {
    type: Date,
  },
});

module.exports = User = mongoose.model("JobRequest", JobRequest);
