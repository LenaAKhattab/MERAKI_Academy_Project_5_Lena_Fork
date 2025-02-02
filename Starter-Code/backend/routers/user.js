
const express = require("express");

const {
  login,
  register,
  createRequest,
  getRequestsById,
} = require("../controllers/user");
const authentication = require("../middleware/authentication");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/createRequestByuserId", authentication, createRequest);
userRouter.get("/getRequestByuserId", authentication,getRequestsById);

module.exports = userRouter;



