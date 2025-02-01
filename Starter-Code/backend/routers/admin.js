const {getAllRequests}=require("../controllers/admin")
const authorization=require("../middleware/authorization")
const express = require("express");
const AdminRouter=express.Router()

AdminRouter.get("/getAllRequests", authorization("VIEW_REQUESTS"), getAllRequests)


module.exports=AdminRouter