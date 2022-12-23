const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const fieldSchema = new mongoose.Schema({
    regionId:{
        type: ObjectId,
    },
    fieldName:{
        type: String,
        required: true
    },
    location:{
        Latitude: {
            type: Number,
            required: true
        },
        Longitude: {
            type: Number,
            required: true
        }
    },
    address:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    crop_cycle_fields:{
        type: [ObjectId],
        ref: "CropCycleField" 
    }
},{timeStamp: true})

module.exports = mongoose.model("Field", fieldSchema)