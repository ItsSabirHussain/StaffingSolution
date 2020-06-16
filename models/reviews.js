const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema({
  ClientName: {
    type: String,
  },
  ClientID: {
    type: String,
  },
  JobID: {
    type: String,
  },
  JobName: {
    type: String,
  },
  Message: {
    type: String,
  },
  Date: {
    type: Date,
  },
  Phone: {
    type: String,
  },
  Email: {
    type: String,
  },
});

module.exports = User = mongoose.model("Review", Review);
