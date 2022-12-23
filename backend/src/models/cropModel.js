const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cropSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    botanicalName:{
        type: String,
        required: true
    },
    cropDescription:{
        type: String,
        required: true
    },
    
},{timeStamp: true})

module.exports = mongoose.model("Crop", cropSchema)