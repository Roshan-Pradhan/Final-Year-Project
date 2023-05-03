const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
  loggedInUserID: {
    type: String,
    required: true,
  },
  jobsData: {
    type: Array,
    required: true,
  },
  selectedValueProvince: {
    type: String,
    require: true,
  },
  selectedValueDistrict: {
    type: String,
    require: true,
  },
  selectedValueStreet: {
    type: String,
    required: true,
  },
  selectedValueQualification: {
    type: Array,
  },
  Skills: {
    type: Array,
  },
  Keyskills: {
    type: Array,
    required: true,
  },
  companyBcName: {
    type: String,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "companyProfile", // Reference to companyProfile
  },

  isApproved:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date
  },
});

module.exports = mongoose.model("addjobsDB", jobPostSchema);
