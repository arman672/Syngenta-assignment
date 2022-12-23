const express = require("express")
const router = express.Router();
const orgController = require("../controllers/organization")
const propertyController = require("../controllers/property")
const regionController = require("../controllers/region")
const fieldController = require("../controllers/field");
const cropController  = require("../controllers/crop");
const cropCycleController =require("../controllers/cropCycle")
const auth = require("../middlewares/authentication")

//organization routes
router.post("/createOrg", orgController.createOrganization)
router.post("/login", orgController.loginOrg)
router.get("/getOrg/:id", auth.authentication, orgController.getOrganization)

//property routes
router.post("/createProperty", auth.authentication, propertyController.createProperty)
router.get("/getProperty/:id", auth.authentication, propertyController.getProperty)

//region routes
router.post("/createRegion", auth.authentication, regionController.createRegion)
router.get("/getRegion", auth.authentication, regionController.getRegion)

//field routes
router.post("/createField", auth.authentication, fieldController.createField)
router.get("/getField", auth.authentication, fieldController.getField)

//crop routes
router.post("/createCrop", auth.authentication, cropController.createCrop)
router.get("/getCrop/:id", auth.authentication, cropController.getCrop)

//crop cycle routes
router.post("/createCropCycle", auth.authentication, cropCycleController.createCropCycle)
router.get("/getCropCycleField/:id", auth.authentication, cropCycleController.getCropCycleField)
router.get("/getCropCycleProperty/:id", auth.authentication, cropCycleController.getCropCycleProperty)

router.all("/*",(req,res)=>{
    res.status(404).send({msg: `${req.url} -- url does not exist`})
})
module.exports = router;