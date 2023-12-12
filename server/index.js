const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Database connection succeeded"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});
