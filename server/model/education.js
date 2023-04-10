const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const educationSchema = new Schema({
  userId: {
    type: String,
    require: true,
    unique:true,
  },
userEducation: {
    type: Array,
    require: true,
  },
  
});
module.exports = mongoose.model("education",educationSchema)