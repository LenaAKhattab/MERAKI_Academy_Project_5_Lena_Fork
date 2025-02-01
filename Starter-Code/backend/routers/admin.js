const {getAllRequests}=require("../controllers/admin")
const express = require("express");
const AdminRouter=express.Router()

AdminRouter.get("/getAllRequests", getAllRequests)


module.exports=AdminRouter