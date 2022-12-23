const propertyModel = require("../models/propertyModel")
const regionModel = require("../models/regionModel")

//========create region=========
const createRegion = async function(req, res){
    try {
        
        const {propertyID, regionName, regionDescription} = req.body

        let property = await propertyModel.findById(propertyID)
        if(req.loggedInOrgId != property.organizationId) return res.status(403).send({ status: true, message: "Not Authorized"});

        const data ={
            "propertyID" : propertyID,
            "regionName" : regionName,
            "regionDescription": regionDescription,
            "fields": []
        }

        let query = {
            "regionName" : regionName,
            "propertyID" : propertyID
        }
       
        const checkRegion = await regionModel.findOne(query)
        console.log(checkRegion)
        if(checkRegion) return res.status(400).send({msg: "region already exist"})

        const savedData = await regionModel.create(data)
        

        await propertyModel.findOneAndUpdate(
            {_id: propertyID},
            {$push :{regions: savedData._id}},
            {new: true})

        return res.status(201).send({msg: "successful", data: savedData})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}


const getRegion = async function(req, res){
    try {
        let id = req.query.regionId
        let orgId = req.query.orgId

        if(req.loggedInOrgId != orgId) return res.status(403).send({ status: true, message: "Not Authorized"});

        if(id === "all"){
            const data = await regionModel.find({})
            return res.status(200).send(data)
        }
        let data = await regionModel.findById(id)
        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

module.exports = {createRegion, getRegion}