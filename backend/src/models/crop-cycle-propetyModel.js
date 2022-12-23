const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cropCyclePropertySchema = new mongoose.Schema({
    propertyId:{
        type: ObjectId,
        required: true
    },
    fieldId:{
        type: ObjectId
    },
    cropId:{
        type: ObjectId,
        required: true,
        ref: "Crop"
    },
    cycleStart:{
        type: String,
        required: true
    },
    cycleEnd:{
        type: String,
        required: true
    }
},{timeStamp: true})

module.exports = mongoose.model("CropCycleProperty", cropCyclePropertySchema)