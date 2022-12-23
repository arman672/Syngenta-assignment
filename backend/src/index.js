const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/route")

let app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://Arman:W0ZPcEp2jiZXKgid@cluster0.ilfh6.mongodb.net/agriOrgDb")
    .then(()=>{
        console.log("mongodb is connected")
    })
    .catch((err)=>{
        console.log(err)
    })

app.use(router);

app.get("/app",(req, res)=>{
    res.send(req.url)
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`express app is running on port ${process.env.PORT || 3000}`)
})