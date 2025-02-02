const { pool } = require("../models/db");

const getAllRequests = (req, res) => {
  pool
    .query("SELECT * FROM orders WHERE is_deleted = 0")
    .then((result) => {
      if (!result.rows.length) {
        return res.status(200).json({
          success: true,
          message: "No orders yet",
        });
      }
      res.status(200).json({
        success: true,
        orders: result.rows,
      });
    })
    .catch((err) => {
      console.error("Database error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

//Admin Accept/Reject user's order request

const AcceptRequest = (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (status !== "accepted" && status !== "rejected") {
    return res.status(400).json({
       message: "Invalid status value. Use 'accepted' or 'rejected'." 
      });
  }

  const query = `
        UPDATE orders
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `;

  const values = [status, orderId];

  pool
    .query(query, values)
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found." });
      }

      res.status(200).json({
        success: true,
        message: `Order ${orderId} status updated to ${status}.`,
        order: result.rows[0],
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error: " + error.message,
      });
    });
};

//Admin choose which collector will collect from user

const chooseCollector = (req, res) => {
  const orderId = req.params.id;
  const { collector_id } = req.body;

  if (![12, 13, 14,10].includes(collector_id)) {
    return res
      .status(400)
      .json({ message: "Invalid id value. Use '12', '13', or '14' only" });
  }

  const query = `
        UPDATE orders
        SET collector_id = $1
        WHERE id = $2
        RETURNING *
    `;

  pool
    .query(query, [collector_id, orderId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found." });
      }

      const updatedOrder = result.rows[0];

      // collector name from users table
      const collectorQuery = `
                SELECT first_name FROM users WHERE id = $1
            `;

      pool
        .query(collectorQuery, [collector_id])
        .then((collectorResult) => {
          const collectorName = collectorResult.rows[0].first_name;

          res.status(200).json({
            success: true,
            message: `Order ${orderId} updated with collector id ${collector_id}`,
            order: updatedOrder,
            collector_name: collectorName,
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
          });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error: " + error.message,
      });
    });
};

module.exports = { getAllRequests, AcceptRequest, chooseCollector };
