const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const regionSchema = new mongoose.Schema({
    propertyID:{
        type: ObjectId,
    },
    regionName:{
        type: String,
        required: true
    },
    regionDescription:{
        type: String,
        required: true
    },
    fields:{
        type: [ObjectId],
        ref: "Field"
    }
},{timeStamp: true})

module.exports = mongoose.model("Region", regionSchema)