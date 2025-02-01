const pool = require("../models/db");

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

module.exports = { getAllRequests };
