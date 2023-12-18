const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
