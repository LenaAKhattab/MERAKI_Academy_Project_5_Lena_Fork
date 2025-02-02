
const bcrypt = require("bcrypt");
const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const salt = 10;

const register = async (req, res) => {
  const { first_name, last_name, email, password, role_id, phone_number } =
    req.body;
  const passwordHashed = await bcrypt.hash(password, salt);
  const query = `INSERT INTO users (first_name,last_name,email,password,role_id,points,phone_number) VALUES($1 , $2 , $3 , $4,$5,$6,$7)`;
  const data = [
    first_name,
    last_name,
    email,
    passwordHashed,
    role_id,
    0,
    phone_number,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        result: result,
      });
    })
    .catch((error) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err: error,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  pool
    .query(`SELECT * FROM users WHERE email = '${email}'`)
    .then(async (result) => {
      const isValid = await bcrypt.compare(password, result.rows[0].password);
      if (isValid) {
        const payload = {
          userId: result.rows[0].id,
          firstName: result.rows[0].first_name,
          roleid: result.rows[0].role_id
        };
        const options = {
          expiresIn: "200m",
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        res.status(201).json({
          success: true,
          message: "you are log in successfully",
          result: result,
          token: token,
        });
      }
      res.status(403).json({
        success: false,
        message: "password or email is incorrect ",
      });
    })
    .catch((error) => {
      res.status(403).json({
        success: false,
        message: "password or email is incorrect ",
        err: error,
      });
    });
};

const createRequest = (req, res) => {
  const userId = req.token.userId; 
  const userName = req.token.firstName; 
  
  const { 
    category_id, 
    collector_id, 
    admin_id, 
    predicted_price, 
    last_price, 
    description, 
    status, 
    weight, 
    order_time, 
    arrive_time, 
    location 
  } = req.body;

  const query = `
    INSERT INTO orders (
      user_id, user_name, category_id, collector_id, admin_id, 
      predicted_price, last_price, description, 
      status, weight, order_time, arrive_time, location
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *`;  

  const values = [
    userId, 
    userName, 
    category_id, 
    collector_id, 
    admin_id, 
    predicted_price, 
    last_price, 
    description, 
    status, 
    weight, 
    order_time, 
    arrive_time, 
    location
  ];

  pool.query(query, values)
    .then(result => {
      const newOrder = result.rows[0]; 
      res.status(201).json({
        message: "Order created successfully",
        order: newOrder 
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        message: "Failed to create order",
        error: error.message
      });
    });
};

const getRequestsById = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT * FROM orders WHERE user_id = $1
  `;

  const data = [userId];

  pool.query(query, data)
    .then(result => {
      const orders = result.rows;

      if (orders.length === 0) {
        return res.status(200).json({
          message: `No orders found for user ${userId}`,
          orders: [] 
        });
      }

      res.status(200).json({
        message: `All orders for user ${userId}`,
        orders: orders
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        message: "Failed to retrieve orders",
        error: error.message
      });
    });
};
//cancel request by id
//get all orders 
 //take order id 
 // change status to canceled
const cancelRequestById = (req,res)=>{
  const{id} =req.params
  pool.query(`UPDATE orders  SET status = 'canceled' WHERE id = ${id}`)
  .then((result)=>{
    res.json(result)
  })
  .catch((error)=>{
    res.json(error)
  })

}




module.exports = { login, register , createRequest, getRequestsById,cancelRequestById};