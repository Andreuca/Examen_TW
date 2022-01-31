const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers").favorite;

router.get("/", favoriteController.getAll);
router.get("/:id", favoriteController.getFavorite);
router.post("/", favoriteController.addFavorite);
router.patch("/:id", favoriteController.updateFavorite);
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;
