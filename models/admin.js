const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
  Name: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
});
module.exports = User = mongoose.model("Admin", Admin);
