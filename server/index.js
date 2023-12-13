const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Database connection succeeded"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});

// routes
app.use(express.json());
app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
