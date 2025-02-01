const express = require("express");

const { addCategory ,getAllCategories,deleteCategoryById} = require("../controllers/category");
const authentication = require("../middleware/authentication");
const categoryRouter = express.Router();

categoryRouter.post("/addCategory" , addCategory);
categoryRouter.get("/getAllCategories" , getAllCategories);
categoryRouter.delete("/:id" , deleteCategoryById);

module.exports = categoryRouter;
