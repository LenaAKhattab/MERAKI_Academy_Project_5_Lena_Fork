const {getAllRequests, AcceptRequest, chooseCollector}=require("../controllers/admin")
const authorization=require("../middleware/authorization")
const express = require("express");
const AdminRouter=express.Router()

AdminRouter.get("/getAllRequests", getAllRequests)
AdminRouter.put("/AcceptRequest/:id",  AcceptRequest)
AdminRouter.put("/chooseCollector/:id",  chooseCollector)

module.exports=AdminRouter