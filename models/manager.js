const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Manager = new Schema({
  Name: {
    type: String,
  },
  Password: {
    type: String,
  },
  Email: {
    type: String,
  },
});
module.exports = User = mongoose.model("Manager", Manager);
