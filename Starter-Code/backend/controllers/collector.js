const { pool } = require("../models/db");

const updateRequestDetailsById = (req, res) => {
  const { id } = req.params;
  const collector_id=req.token.userId
  let { last_price, status, weight, length, width, height } = req.body;
  const query = `UPDATE orders SET last_price=COALESCE($1,last_price),status=COALESCE($2,status),weight=COALESCE($3,weight),length=COALESCE($4,length),width=COALESCE($5,width),height=COALESCE($6,height) where orders.id=$7 and orders.collector_id=$8 returning * `;

  const data = [
    last_price || null,
    status || "pending",
    weight || null,
    length || null,
    width || null,
    height || null,
    id,
    collector_id
  ];
  console.log("data:",data);
  
  pool
    .query(query, data)
    .then((result) => {
        console.log(result.rows);
        
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Order with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating order");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

module.exports = { updateRequestDetailsById };
