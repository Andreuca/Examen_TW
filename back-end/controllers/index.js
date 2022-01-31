const videoController = require("./video");
const favoriteController = require("./favoriteList");
const dbController = require("./db");

const controllers = {
  video: videoController,
  db: dbController,
  favorite: favoriteController,
};

module.exports = controllers;
