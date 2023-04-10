const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    loggedInUserID:{
        type:String,
    },
    userName:{
        type:String,
        require:true,
    },
    userEmail:{
        type:String,
        require:true,
    },
    userNumber:{
        type:String,
        require:true,
    },
    userDOB:{
        type:String,
        require:true,
    },
    userGender:{
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

module.exports = mongoose.model("userProfile",userProfileSchema);