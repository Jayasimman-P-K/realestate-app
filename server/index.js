const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");
const listingRouter = require("./routes/listing.route.js");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Database connection succeeded"))
  .catch((err) => console.log(err));
//

// server connection
app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);
app.use("/server/listing", listingRouter);

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
