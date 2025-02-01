const express = require("express");

const { addCategory } = require("../controllers/category");
const authentication = require("../middleware/authentication");
const categoryRouter = express.Router();

categoryRouter.post("/addCategory" , addCategory);

module.exports = categoryRouter;
