const {getAllRequests, AcceptRequest}=require("../controllers/admin")
const authorization=require("../middleware/authorization")
const express = require("express");
const AdminRouter=express.Router()

AdminRouter.get("/getAllRequests", getAllRequests)
AdminRouter.put("/AcceptRequest/:id",  AcceptRequest)



module.exports=AdminRouter