const propertyModel = require("../models/propertyModel")
const orgModel = require("../models/organizationModel")

//========create property=========
const createProperty = async function(req, res){
    try {
        
        const {organizationId, propertyName, location} = req.body

        if(req.loggedInOrgId != organizationId) return res.status(403).send({ status: true, message: "Not Authorized"});

        const data ={
            "organizationId" : organizationId,
            "propertyName" : propertyName, 
            "location" : location,
            "regions": [],
            "crop_cycle_property": []
        }

        let query = {
            "location.country" : location.country,
            "location.state" : location.state,
            "organizationId" : organizationId
        }
       
        const checkLocation = await propertyModel.findOne(query)

        if(checkLocation) return res.status(400).send({msg: "property already exist"})

        const savedData = await propertyModel.create(data)
        
        await orgModel.findOneAndUpdate(
            {_id: organizationId},
            {$push :{Properties: savedData._id}},
            {new: true})

        return res.status(201).send({msg: "successful", data: savedData})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}


//========= get property All/One==========
const getProperty = async function(req, res){
    try {
        let id = req.params.id
       
        if(id === "all"){
            const data = await propertyModel.find({})
            return res.status(200).send(data)
        }
        let data = await propertyModel.findById(id).populate("regions")

        if(req.loggedInOrgId != data.organizationId) return res.status(403).send({ status: true, message: "Not Authorized"});

        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

module.exports = {createProperty, getProperty}