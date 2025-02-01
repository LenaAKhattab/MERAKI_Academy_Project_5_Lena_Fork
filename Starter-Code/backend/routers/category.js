const express = require("express");

const { addCategory ,getAllCategories} = require("../controllers/category");
const authentication = require("../middleware/authentication");
const categoryRouter = express.Router();

categoryRouter.post("/addCategory" , addCategory);
categoryRouter.get("/getAllCategories" , getAllCategories);

module.exports = categoryRouter;
