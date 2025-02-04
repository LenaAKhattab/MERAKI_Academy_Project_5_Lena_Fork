const { pool } = require("../models/db");

const updateOrdersDetailsById = (req, res) => {
  const { id } = req.params;
  const collector_id = req.token.userId;
  let { last_price, status } = req.body;

  const query = `
    UPDATE orders 
    SET 
      last_price = COALESCE($1, last_price),
      status = COALESCE($2, status)
    WHERE id = $3 AND collector_id = $4 
    RETURNING *;
  `;

  const data = [
    last_price || null,
    status || 'pending', 
    id,
    collector_id
  ];

  console.log("Data:", data);

  pool
    .query(query, data)
    .then((result) => {
      console.log("Updated rows:", result.rows);

      if (result.rows.length > 0) {
        return res.status(200).json({
          success: true,
          message: `Order with ID ${id} updated successfully`,
          result: result.rows[0],
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `No matching order found for ID ${id} or you are not authorized to update this order`,
        });
      }
    })
    .catch((err) => {
      console.error("Error updating order:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

module.exports = { updateOrdersDetailsById };
