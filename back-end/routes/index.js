const express = require("express");
const router = express.Router();
const videoRouter = require("./video");
const dbRouter = require("./db");
const favoriteRouter = require("./favoriteList");

router.use("/video", videoRouter);
router.use("/favorite", favoriteRouter);
router.use("/", dbRouter);

module.exports = router;
