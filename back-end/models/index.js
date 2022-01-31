const Video = require("./Video");
const FavoriteList = require("./FavoriteList");

FavoriteList.hasMany(Video);
Video.belongsTo(FavoriteList);

module.exports = {
  Video: Video,
  FavoriteList: FavoriteList,
};
