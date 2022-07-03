const express = require("express");
const app = express();
const monggose = require("mongoose");
const boyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Middleware
app.use(boyParser.json());
app.use(cors());

//import routes
const makananRouter = require("./routes/makanan");
const userRouter = require("./routes/auth");

//routes
app.use("/makanan", makananRouter);
app.use("/user", userRouter);

//connect to mongodb
monggose.connect(process.env.DB_CONNECTION);
let db = monggose.connection;

//listen
app.listen(process.env.PORT, () => {
  console.log(`Listen on PORT http://localhost:${process.env.PORT}`);
});
