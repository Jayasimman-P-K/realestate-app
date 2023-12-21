const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  createListing,
  deleteListing,
  updatelisting,
} = require("../controller/listing.controller");

// init router
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updatelisting);

module.exports = router;
