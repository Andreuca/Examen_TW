const express = require("express");
const router = express.Router();
const dbController = require("../controllers").db;

router.get("/reset", dbController.reset);

module.exports = router;
