const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} = require("../controller/listing.controller");

// init router
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);

module.exports = router;
