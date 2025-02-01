const { pool } = require("../models/db");

const addCategory = async (req, res) => {
  const { category_name, description, image } = req.body;
  const query = `INSERT INTO category ( category_name, description, image) VALUES($1 , $2 , $3 ) returning *`;
  const data = [category_name, description, image];
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

module.exports = { addCategory };
