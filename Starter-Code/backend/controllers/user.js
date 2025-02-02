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
          roleid: result.rows[0].role_id,
        };
        const options = {
          expiresIn: "200m",
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        res.status(201).json({
          success: true,
          message: "you are log in successfully",
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
  const { category_id, weight, height, length, width, description, location } =
    req.body;

  const priceQuery = `
   select price_per_kg, price_per_dimensions, points_per_kg from category where id=$1
  `;
  pool
    .query(priceQuery, [category_id])
    .then((result) => {
      const { price_per_kg, price_per_dimensions, points_per_kg } =
        result.rows[0];
      console.log(price_per_kg, price_per_dimensions, points_per_kg);
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
      const requestQuery = `insert into orders (user_id,category_id,weight,height,length,width,description,location,predicted_price) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
      const values = [
        userId,
        category_id,
        weight,
        height,
        length,
        width,
        description,
        location,
        predicted_price,
      ];
      pool
        .query(requestQuery, values)
        .then((result) => {
          console.log("here");
          res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: result.rows,
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Failed to create order",
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
    SELECT * FROM orders WHERE user_id = $1
  `;

  const data = [userId];

  pool
    .query(query, data)
    .then((result) => {
      const orders = result.rows;

      if (orders.length === 0) {
        return res.status(200).json({
          message: `No orders found for user ${userId}`,
        });
      }

      res.status(200).json({
        message: `All orders for user ${userId}`,
        orders: orders,
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



module.exports = { login, register, createRequest, getRequestsById };






