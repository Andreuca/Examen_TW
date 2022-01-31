const Video = require("../models").Video;

const controller = {
  getAll: async (req, res) => {
    try {
      const videos = await Video.findAll();
      return res.status(200).json({videos});
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getVideo: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = await Video.findByPk(id);
      if (!video) {
        return res.sendStatus(404);
      }
      return res.status(200).json(video);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getVideoByFavorite: async (req, res) => {
    try {
      const favoriteId = parseInt(req.params.favoriteId);
      const offset = parseInt(req.params.offset);
      const video = await Video.findAndCountAll({
        where: {
          favoriteListId: favoriteId,
        },
        limit: 1,
        offset,
      });
      if (!video) {
        return res.sendStatus(404);
      }
      return res.status(200).json(video);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  addVideo: async (req, res) => {
    try {
      const { description, title, url, favoriteListId } = req.body;
      if (!description || !title || !url) {
        return res.sendStatus(400);
      }
      let video = await Video.findOne({
        where: { url },
      });
      if (video) {
        return res.sendStatus(400);
      }
      video = await Video.create({
        description,
        title,
        url,
        favoriteListId
      });

      return res.status(201).json({ message: "Video created!", video });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  updateVideo: async (req, res) => {
    try {
      const { description, title, url, favoriteListId } = req.body;
      const id = parseInt(req.params.id);
      let video = await Video.findByPk(id);
      if (!video) {
        return res.sendStatus(404);
      }
      video.description = description;
      video.title = title;
      video.url = url;
      video.favoriteListId = favoriteListId;
      await video.save();

      return res
        .status(200)
        .json({ message: "Data updated succesfully!", video });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteVideo: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const video = await Video.findByPk(id);
      if (!video) {
        return res.sendStatus(404);
      }
      await video.destroy();
      res.statusCode = 200;
      return res.json({ message: "Video deleted!" });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = controller;
