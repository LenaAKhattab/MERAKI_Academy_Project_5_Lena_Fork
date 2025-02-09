const bcrypt = require("bcrypt");
const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const salt = 10;

const register = async (req, res) => {
  const { first_name, last_name, email, password, role_id, phone_number } =
    req.body;
  const passwordHashed = await bcrypt.hash(password, salt);
  const query = `INSERT INTO users (first_name, last_name, email, password, role_id, phone_number) 
                     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const data = [
    first_name,
    last_name,
    email.toLowerCase(),
    passwordHashed,
    2,
    phone_number,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};
// const login = (req, res) => {
//   const { email, password } = req.body;

//   pool
//     .query(`SELECT * FROM users WHERE email = '${email}'`)
//     .then(async (result) => {
//       const isValid = await bcrypt.compare(password, result.rows[0].password);
//       if (isValid) {
//         const payload = {
//           userId: result.rows[0].id,
//           firstName: result.rows[0].first_name,
//           roleid: result.rows[0].role_id,
//         };
//         const options = {
//           expiresIn: "200m",
//         };
//         const token = await jwt.sign(payload, process.env.SECRET, options);
//         res.status(201).json({
//           success: true,
//           message: "you are log in successfully",
//           token: token,
//         });
//       }
//       res.status(403).json({
//         success: false,
//         message: "password or email is incorrect ",
//       });
//     })
//     .catch((error) => {
//       res.status(403).json({
//         success: false,
//         message: "password or email is incorrect ",
//         err: error,
//       });
//     });
// };
const login = (req, res) => {
  const { email, password } = req.body;


  pool
    .query(`SELECT * FROM users WHERE email = '${email}'`)
    .then(async (result) => {
      if (result.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: "password or email is incorrect",
        });
      }

      const isValid = await bcrypt.compare(password, result.rows[0].password);
      if (isValid) {
        const payload = {
          userId: result.rows[0].id,
          firstName: result.rows[0].first_name,
          roleid: result.rows[0].role_id,
        };
        const options = { expiresIn: "200m" };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        
        return res.status(201).json({
          success: true,
          message: "You are logged in successfully",
          token: token,
        });
      }

      return res.status(403).json({
        success: false,
        message: "password or email is incorrect",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    });
};


const createRequest = (req, res) => {
  const userId = req.token.userId;

  const { category_id, weight, height, length, width, description } = req.body;

  const priceQuery = `
   select price_per_kg, price_per_dimensions, points_per_kg from category where id=$1
  `;

  pool
    .query(priceQuery, [category_id])
    .then((result) => {
      const { price_per_kg, price_per_dimensions, points_per_kg } =
        result.rows[0];
      console.log(
        "price_per_kg;",
        price_per_kg,
        "price_per_dimensions:",
        price_per_dimensions,
        "points_per_kg:",
        points_per_kg
      );

      let predicted_price = 0;
      if (price_per_kg && weight) {
        predicted_price = weight * price_per_kg;
        console.log("a");
      }
      if (price_per_dimensions && width && height && length) {
        const volume = width * height * length;
        console.log("volume:", volume);
        console.log("b");

        predicted_price = volume * price_per_dimensions;
      }
      if (points_per_kg && weight) {
        predicted_price = weight * points_per_kg;
        console.log("c");
      }
      console.log("predicted_price:", predicted_price);
      const requestQuery = `insert into requests (user_id,category_id,weight,height,length,width,description,predicted_price) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *`;
      const values = [
        userId,
        category_id,
        weight,
        height,
        length,
        width,
        description,
        predicted_price,
      ];
      pool
        .query(requestQuery, values)
        .then((result) => {
          console.log("here");
          res.status(201).json({
            success: true,
            message: "request created successfully",
            order: result.rows,
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Failed to create request",
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "server error",
        error: error.message,
      });
    });
};

const getRequestsById = (req, res) => {
  const userId = req.token.userId;
  console.log(userId);

  const query = `
    SELECT * FROM requests WHERE status=$1 AND user_id = $2
  `;

  const data = ["draft", userId];

  pool
    .query(query, data)
    .then((result) => {
      let sumOfPredictedPrices = result.rows.reduce((sum, price) => {
        console.log(price.predicted_price);
        return sum + Number(price.predicted_price);
      }, 0);

      console.log(sumOfPredictedPrices);

      if (result.rows.length === 0) {
        return res.status(200).json({
          message: `No orders found for user ${userId}`,
        });
      }

      res.status(200).json({
        message: `All orders for user ${userId}`,
        result: result.rows,
        sumOfPredictedPrices: sumOfPredictedPrices,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to retrieve orders",
        error: error.message,
      });
    });
};

const updateRequestById = (req, res) => {
  const { id } = req.params;
  const user_id = req.token.userId;
  const {
    predicted_price,
    status,
    description,
    weight,
    length,
    width,
    height,
  } = req.body;

  const query = `
    UPDATE requests 
    SET 
      predicted_price = COALESCE($1, predicted_price),
      status = COALESCE($2, status),
      description = COALESCE($3, description),
      weight = COALESCE($4, weight),
      "length" = COALESCE($5, "length"),
      width = COALESCE($6, width),
      height = COALESCE($7, height)
    WHERE id = $8 AND user_id = $9 
    RETURNING *;
  `;

  const data = [
    predicted_price || null,
    status || null,
    description || null,
    weight || null,
    length || null,
    width || null,
    height || null,
    id,
    user_id,
  ];

  console.log("Data:", data);

  pool
    .query(query, data)
    .then((result) => {
      console.log("Updated rows:", result.rows);

      if (result.rows.length > 0) {
        return res.status(200).json({
          success: true,
          message: `Request with ID ${id} updated successfully`,
          result: result.rows[0],
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `No matching request found for ID ${id}`,
        });
      }
    })
    .catch((err) => {
      console.error("Error updating request:", err);
      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: err.message,
        });
      }
    });
};

const cancelOrderById = (req, res) => {
  const { id } = req.params;
  const checkTimeQuery = `select order_time from orders where id=$1`;

  pool.query(checkTimeQuery, [id]).then((result) => {
    // res.json(result.rows[0].order_time);
    const orderTime = result.rows[0].order_time;
    const nowTime = new Date();
    const timeDiff = (nowTime - new Date(orderTime)) / (1000 * 60 * 60);
    if (timeDiff > 24) {
      return res
        .status(400)
        .json({ message: "Cannot cancel order after 24 hours" });
    }
    console.log("timeDiff:", timeDiff);

    const cancelQuery = ` update orders SET status=$1 where id=$2 returning *`;
    const resetRequestsStatusQuery = `update requests SET status=$1 ,order_id=Null where order_id=$2 returning *`;
    pool
      .query(cancelQuery, ["canceled", id])
      .then((result) => {
        pool
          .query(resetRequestsStatusQuery, ["draft", id])
          .then((result) => {
            res
              .status(200)
              .json({ message: `Order ${id} has been canceled successfuly` });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Server Error",
              error: error.message,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Server Error",
          error: error.message,
        });
      });
  });
};
const getALLOrdersById = (req,res)=>{
  const userId = req.token.userId;
  pool.query(`SELECT * FROM orders WHERE user_id = ${userId}`)
  .then((result)=>{
    res.status(201).json({
      success:true,
      result : result.rows
    })

  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  });

}
const getAssignOrderById = (req,res)=>{
  const userId = req.token.userId;
  pool.query(`SELECT * FROM orders WHERE collector_id = ${userId}`)
  .then((result)=>{
    res.status(201).json({
      success:true,
      result : result.rows
    })

  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  });

}
const cancelRequestById = (req,res)=>{
  const {id} = req.params 
  console.log(id);
  pool.query(`DELETE FROM requests WHERE id = ${id} `)
  .then((result)=>{
    res.status(201).json({
      success:true,
      result:result,
      message:"the request has been deleted"
    })
  })
  .catch((error) => {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: "server error",
      error: error,
    });
  });
}
const assignOrderByCollectorId = (req,res)=>{
  const {id} = req.params
  const {collectorId} = req.body
  console.log("vvvv",collectorId,id);
  
  pool.query(`
    UPDATE orders
    SET collector_id = ${collectorId}
    WHERE id = ${id}`)
  .then((result)=>{
    res.status(201).json({
      result:result
    })
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
      error: error,
    })
  });
}



const createOrder = (req, res) => {
  const userId = req.token.userId;
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({
      success: false,
      message: "Location is required"
    });
  }

  const draftRequestsQuery = `
    SELECT * FROM requests 
    WHERE user_id = $1 AND status = 'draft'
  `;
  
  pool
    .query(draftRequestsQuery, [userId])
    .then((draftRequestsResult) => {
      if (draftRequestsResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No draft requests found"
        });
      }

      // this step is to calculate the total predicted price from all draft requests(for the user)
      let totalPredictedPrice = 0;
      draftRequestsResult.rows.forEach((draftRequest) => {
        const predictedPrice = parseFloat(draftRequest.predicted_price);
        totalPredictedPrice += predictedPrice;
      });

      const orderQuery = `
        INSERT INTO orders (user_id, location, predicted_price) 
        VALUES ($1, $2, $3) 
        RETURNING * 
      `;
      const orderData = [userId, location, totalPredictedPrice];

      pool
        .query(orderQuery, orderData)
        .then((orderResult) => {
          const order = orderResult.rows[0];

          const updateRequestsQuery = `
            UPDATE requests 
            SET status = 'active', order_id = $1 
            WHERE user_id = $2 AND status = 'draft'
            RETURNING *
          `;
          const updateRequestsData = [order.id, userId];

          pool
            .query(updateRequestsQuery, updateRequestsData)
            .then(() => {
              return res.status(201).json({
                success: true,
                message: "Order created successfully",
                order: order
              });
            })
            .catch((error) => {
              return res.status(500).json({
                success: false,
                message: "Error updating request status",
                error: error.message
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Error retrieving draft requests",
        error: error.message
      });
    });
};


module.exports = {
  login,
  register,
  createRequest,
  getRequestsById,
  updateRequestById,
  cancelOrderById,
  getALLOrdersById,
  getAssignOrderById,
  cancelRequestById,
  assignOrderByCollectorId,
  createOrder
};
