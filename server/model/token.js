const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"user",
        unique:true
    },

    token:{
        type:String,
        require:true,
    }
})

module.exports =mongoose.model("mailToken",tokenSchema)