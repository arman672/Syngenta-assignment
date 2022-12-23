const cropModel = require("../models/cropModel")
const createCrop = async function(req, res){
    try {
        
        const {name, botanicalName, cropDescription} = req.body
        const data ={
            "name" : name,
            "botanicalName" : botanicalName,
            "cropDescription": cropDescription
        }

        let query = {
            "name" : name,
        }
       
        const checkCrop = await cropModel.findOne(query)

        if(checkCrop) return res.status(400).send({msg: "crop with the same name already exist"})

        const savedData = await cropModel.create(data)
        return res.status(201).send({msg: "successful", data: savedData})

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

//get all crops or get crops by id
const getCrop = async function(req, res){
    try {
        let id = req.params.id
        if(id === "all"){
            const data = await cropModel.find({})
            return res.status(200).send(data)
        }
        let data = await cropModel.findById(id)
        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

module.exports = {createCrop, getCrop}