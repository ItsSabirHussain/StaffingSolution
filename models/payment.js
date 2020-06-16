const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Payment = new Schema({
  JobID: {
    type: String,
  },
  JobName: {
    type: String,
  },
  Amount: {
    type: String,
  },
  PaymentDate: {
    type: String,
  },
  ClientID: {
    type: String,
  },
  ClientName: {
    type: String,
  },
  StaffID: {
    type: String,
  },
  StaffName: {
    type: String,
  },
  Concern: {
    type: String,
  },
  Date: { type: Date },
});
module.exports = User = mongoose.model("Payment", Payment);
