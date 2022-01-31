const db = require("../config/db");
const sequelize = require("sequelize");
const Video = require("./Video");

const FavoriteList = db.define("favorite_list", {
  description: {
    type: sequelize.STRING,
    allownull: false,
    validate: {
      len: [3, 200]
    }
  },
});

FavoriteList.hasMany(Video);
Video.belongsTo(FavoriteList);

module.exports = FavoriteList;
