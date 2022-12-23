const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const cropCycleFieldSchema = new mongoose.Schema({
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

module.exports = mongoose.model("CropCycleField", cropCycleFieldSchema)