const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    appliedCompany: {
        type: Schema.Types.ObjectId,
        required: true,
      },
  appliedJobID: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  applicantID:{
    type:Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date
  },
});

module.exports = mongoose.model("applicantsDB", jobApplicationSchema);
