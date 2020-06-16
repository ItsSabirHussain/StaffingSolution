const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema({
  Representative: {
    type: String,
  },
  Designation: {
    type: String,
  },
  Address: {
    type: String,
  },
  Phone: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
});
module.exports = User = mongoose.model("Company", Company);
