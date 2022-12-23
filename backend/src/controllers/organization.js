const orgModel = require("../models/organizationModel")
const validator = require("email-validator")
const jwt = require("jsonwebtoken")

//========create org=========
const createOrganization = async function(req, res){
    try {
        const {name, email, password, address} = req.body
        
        const data ={
            "name" : name,
            "email" : email,
            "password": password,
            "address": address,
            "Properties": []
        }

        const checkEmail = await orgModel.findOne({email : email})
        if(checkEmail) return res.status(400).send({msg: "email already present"})
        const checkName = await orgModel.findOne({name : name})
        if(checkName) return res.status(400).send({msg: "name already present"})


        const savedData = await orgModel.create(data)
        return res.status(201).send({msg: "organization created", data: savedData})
    } catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

const loginOrg = async function (req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;

        //email validation 
        if (!email) {
            return res.status(400).send({ status: false, message: "email is a required field" })
        }
        const validEmail = validator.validate(email)
        if (!validEmail) {
            return res.status(400).send({ status: false, message: "email is not valid" })
        }

        //password validation
        if (!password || password.trim().length == 0) {
            return res.status(400).send({ status: false, message: "password is a required field" })
        }

        const length = password.length
        if (length < 8 || length > 15) {
            return res.status(400).send({ status: false, message: "password length must be between 8 to 15 charecters long" })
        }

        let org = await orgModel.findOne({ email: email, password: password});

        if (!org) {
            return res.status(401).send({ status: false, message: "email or password is not correct"});
        }

        let token = jwt.sign({ orgId: org._id.toString() }, "sun", { expiresIn: "3d", });

        return res.status(200).send({ status: true, message: "Success", data: { token: token } });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


//========= get organization ==========
const getOrganization = async function(req, res){
    try {
        let id = req.params.id

        
        if(req.loggedInOrgId != id) return res.status(403).send({ status: true, message: "Not Authorized"});

        let data = await orgModel.findById(id).populate("Properties")
        if(!data) return res.status(404).send({ status: true, message: "Not found"});
        return res.status(200).send(data)
    }
    catch (error) {
        return res.status(500).send({msg: error.msg})
    }
}

module.exports = {createOrganization, getOrganization, loginOrg}