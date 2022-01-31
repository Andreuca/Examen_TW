const express = require("express");
const router = express.Router();
const videoController = require("../controllers").video;

router.get("/", videoController.getAll);
router.get("/byFavorite/:favoriteId/:offset/", videoController.getVideoByFavorite);
router.get("/:id/", videoController.getVideo);
router.post("/", videoController.addVideo);
router.patch("/:id/", videoController.updateVideo);
router.delete("/:id/", videoController.deleteVideo);

module.exports = router;
