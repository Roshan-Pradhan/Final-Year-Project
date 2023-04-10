const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  
    username:{
        type:String,
        require:true,
    },
    mobilenumber:{
        type:Number,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    gender: {
        type: String,
        required: true,
      },
      usertype:{
        type:String,
        required:true,
      },
      password:{
        type:String,
        required:true,
      },
      verified:{type:Boolean,default:false },

})

module.exports =  mongoose.model("registeredUser",registerSchema);