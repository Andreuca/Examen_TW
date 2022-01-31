const FavoriteList = require("../models/FavoriteList");
const Video = require("../models/Video");

const controller = {
  getAll: async (req, res) => {
    try {
      const favorite = await FavoriteList.findAll();
      return res.status(200).json({ favorite });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  getFavorite: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const favorite = await FavoriteList.findByPk(id);
      if (!favorite) {
        return res.sendStatus(404);
      }
      return res.status(200).json(favorite);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  addFavorite: async (req, res) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.sendStatus(400);
      }

      const favorite = await FavoriteList.create({
        description,
      });

      return res
        .status(201)
        .json({ message: "FavoriteList created!", favorite });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  updateFavorite: async (req, res) => {
    try {
      const { description } = req.body;
      const id = parseInt(req.params.id);
      let favorite = await FavoriteList.findByPk(id);
      if (!favorite) {
        return res.sendStatus(404);
      }
      favorite.description = description;
      await favorite.save();

      return res
        .status(200)
        .json({ message: "Data updated succesfully!", favorite });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  deleteFavorite: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const favorite = await FavoriteList.findByPk(id);
      if (!favorite) {
        return res.sendStatus(404);
      }
      await favorite.destroy();
      res.statusCode = 200;
      return res.json({ message: "Account deleted!" });
    } catch (error) {
      return res.sendStatus(500);
    }
  },
};

module.exports = controller;
