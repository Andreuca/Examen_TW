const db = require("../config/db");
const sequelize = require("sequelize");

const Video = db.define(
  "video",
  {
    description: {
      type: sequelize.STRING,
      validate: {
        len: [5, 200],
      },
    },
    title: {
      type: sequelize.STRING,
      validate: {
        len: [5, 200],
      },
    },
    url: {
      type: sequelize.STRING,
     
    },
  },
);

module.exports = Video
