const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const { createListing } = require("../controller/listing.controller");

// init router
const router = express.Router();

router.get("/create", verifyToken, createListing);

module.exports = router;
