
const express = require("express");

const {
  login,
  register,
  createRequest,
  getRequestsById,
  updateRequestById,
  cancelOrderById,
  getALLOrdersById,
  getAssignOrderById,
  cancelRequestById,
  assignOrderByCollectorId,
    createOrder

} = require("../controllers/user");
const authentication = require("../middleware/authentication");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/createRequestByuserId", authentication, createRequest);
userRouter.put("/updateRequestById/:id", authentication, updateRequestById);
userRouter.get("/getRequestByuserId", authentication,getRequestsById);
userRouter.put("/cancelOrderById/:id",cancelOrderById);

userRouter.get("/getOrderById", getALLOrdersById);//user
userRouter.get("/getAssignById", getAssignOrderById );//collector
userRouter.delete("/cancelRequestById/:id",cancelRequestById)

userRouter.get("/getOrderById/:id", getALLOrdersById);//user
userRouter.get("/getAssignById/:id", getAssignOrderById );//collector
userRouter.post("/createOrders", authentication, createOrder);



module.exports = userRouter;



