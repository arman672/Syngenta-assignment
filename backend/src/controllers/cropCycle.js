const ccfModel = require("../models/crop-cycle-fieldModel")
const ccpModel = require("../models/crop-cycle-propetyModel")
const propertyModel = require("../models/propertyModel")
const fieldModel = require("../models/fieldModel")
const regionModel = require("../models/regionModel")

const createCropCycle = async function(req, res){
    try {
        const {fieldId, cropId, cycleStart, cycleEnd, orgId} = req.body

        if(req.loggedInOrgId != orgId) return res.status(403).send({ status: true, message: "Not Authorized"});
        
        const data ={
            "fieldId" : fieldId,
            "cropId" : cropId,
            "cycleStart": cycleStart,
            "cycleEnd": cycleEnd
        }

        const savedData = await ccfModel.create(data)

        const findRegion = await fieldModel.findOne({_id: fieldId}).select({regionId:1})

        let regionId = findRegion.regionId.toString()

        const findProperty = await regionModel.findOne({_id: regionId})
    
        data["propertyId"] = findProperty.propertyID;
        
        console.log(data)
        const savedCcp = await ccpModel.create(data)
        console.log(savedCcp)
    

        await propertyModel.findOneAndUpdate(
            {_id: data.propertyID},
            {$push :{crop_cycle_property: savedCcp._id}},
            {new: true})

        
        return res.status(201).send({msg: "cycle created", ccf: savedData, ccp: savedCcp})
    } catch (error) {
        return res.status(500).send({msg: error})
    }
}


const getCropCycleField = async function(req, res){
    try {
        let id = req.params.id
        if(id === "all"){
            const data = await ccfModel.find({})
            return res.status(200).send(data)
        }
        let data = await ccfModel.findById(id)
        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

const getCropCycleProperty = async function(req, res){
    try {
        let id = req.params.id
        if(id === "all"){
            const data = await ccpModel.find({})
            return res.status(200).send(data)
        }
        let data = await ccpModel.findById(id)
        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

module.exports = {createCropCycle, getCropCycleField,getCropCycleProperty}