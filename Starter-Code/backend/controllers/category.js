const { pool } = require("../models/db");

const addCategory = async (req, res) => {
  const { category_name, description, image ,points_per_kg,price_per_dimensions,price_per_kg} = req.body;
  const query = `INSERT INTO category ( category_name, description, image,points_per_kg,price_per_dimensions,price_per_kg) VALUES($1 , $2 , $3,$4,$5,$6 ) returning *`;
  const data = [category_name, description, image,points_per_kg,price_per_dimensions,price_per_kg];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        category: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const getAllCategories = (req, res) => {
  const query = `SELECT * FROM category WHERE is_deleted=0;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the Categories",
        Categories: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const deleteCategoryById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE category SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Categiries with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting article");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = { addCategory, getAllCategories, deleteCategoryById };
