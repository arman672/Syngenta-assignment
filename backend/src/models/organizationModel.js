const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const organizationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    Properties:{
        type: [ObjectId],
        ref: "Property" 
    }
},{timeStamp: true})

module.exports = mongoose.model("Organization", organizationSchema)