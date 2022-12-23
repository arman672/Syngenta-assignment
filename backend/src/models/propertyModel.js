const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const propertySchema = new mongoose.Schema({
    organizationId:{
        type: ObjectId,
    },
    propertyName:{
        type: String,
        required: true
    },
    location:{
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    regions:{
        type: [ObjectId],
        ref: "Region" 
    },
    crop_cycle_property:{
        type: [ObjectId],
        ref: "CropCycleProperty" 
    }
},{timeStamp: true})

module.exports = mongoose.model("Property", propertySchema)