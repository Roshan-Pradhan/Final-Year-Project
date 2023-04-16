const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSkillsSchema = new Schema({

    loggedInUserID:{
        type:String,
    },
    skills:{
        type:Array,
    },
    training:{
        type:Array,
    },
    employee:{
        type:Array,
    }
})

module.exports = mongoose.model("userSkillsTraining",userSkillsSchema)