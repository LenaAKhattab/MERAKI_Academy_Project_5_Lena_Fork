const express = require('express');

const {login,register,createRequest,getRequestsById,cancelRequestById} = require("../controllers/user");
const authentication=require("../middleware/authentication")
const userRouter = express.Router()
userRouter.put("/cancelById/:id",cancelRequestById)
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/createRequestByuserId",authentication, createRequest)
userRouter.get("/getRequestByuserId/:userId", getRequestsById)








module.exports= userRouter