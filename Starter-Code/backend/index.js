const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//routers
const userRouter = require("./routers/user");





//built-in middleware
app.use(cors());
app.use(express.json());

app.use("/user",userRouter)

// router middleware


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
