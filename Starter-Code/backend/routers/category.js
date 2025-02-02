const express = require("express");

const { addCategory ,getAllCategories,deleteCategoryById,updateCategoryById} = require("../controllers/category");
const authentication = require("../middleware/authentication");
const categoryRouter = express.Router();

categoryRouter.post("/addCategory" ,authentication, addCategory);
categoryRouter.get("/getAllCategories" ,authentication, getAllCategories);
categoryRouter.delete("/:id" ,authentication, deleteCategoryById);
categoryRouter.put("/:id" ,authentication, updateCategoryById);

module.exports = categoryRouter;
