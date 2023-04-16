const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companyProfileSchema = new Schema({
    loggedInUserID:{
        type:String,
    },
    companyName:{
        type:String,
        require:true,
    },
    companyEmail:{
        type:String,
        require:true,
    },
    companyNumber:{
        type:String,
        require:true,
    },
    companyType:{
        type:String,
        require:true,
    },
    selectedValueProvince:{
        type:String,
        require:true,
    },
    selectedValueDistrict:{
        type:String,
        require:true,
    },
    selectedValueStreet:{
        type:String,
        require:true,
    },
    profileImg :{
        type: String,
        require:true,
    },
})

module.exports = mongoose.model("companyProfile",companyProfileSchema);