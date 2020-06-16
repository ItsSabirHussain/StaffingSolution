const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema({
  Name: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Email: {
    type: String,
  },
  Address: {
    type: String,
  },
  Specialisation: {
    type: String,
  },
  Password: {
    type: String,
  },
  CurrentJob: {
    type: String,
  },
  CurrentName: {
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
});
module.exports = User = mongoose.model("Staff", Staff);
