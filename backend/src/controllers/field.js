const fieldModel = require("../models/fieldModel")
const regionModel = require("../models/regionModel")

const createField = async function(req, res){
    try {
        
        const {regionId, fieldName, location, address, size, orgId} = req.body
        if(req.loggedInOrgId != orgId) return res.status(403).send({ status: true, message: "Not Authorized"});

        const data ={
            "regionId" : regionId,
            "fieldName" : fieldName,
            "location" : location,
            "address": address,
            "size": size,
            "crop_cycle_fields": []
        }

        let query = {
            "location.Latitude" : location.Latitude,
            "location.Longitude" : location.Longitude,
            "regionId" : regionId
        }
       
        const checkField = await fieldModel.findOne(query)

        if(checkField) return res.status(400).send({msg: "Field already exist"})

        const savedData = await fieldModel.create(data)
        

        await regionModel.findOneAndUpdate(
            {_id: regionId},
            {$push :{fields: savedData._id}},
            {new: true})

       
        return res.status(201).send({msg: "successful", data: savedData})
    } catch (error) {
        return res.status(500).send(error)
    }
}


const getField = async function(req, res){
    try {
        let id = req.query.fieldId
        let orgId = req.query.orgId

        if(req.loggedInOrgId != orgId) return res.status(403).send({ status: true, message: "Not Authorized"});

        if(id === "all"){
            const data = await fieldModel.find({})
            return res.status(200).send(data)
        }
        let data = await fieldModel.findById(id)
        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

module.exports = {createField, getField}