const express = require("express");
const router = express.Router();
const controller = require("../controllers/talent");
const { upload, fileUpload } = require("../middleware/uploadFile");

router.get("/", controller.get);
router.post(
  "/store",
  upload.fields([
    { name: "talent_image_path", maxCount: 1 },
    { name: "cv_file_path", maxCount: 1 },
  ]),
  controller.post
);
router.delete("/delete/:id", controller.delete);
module.exports = router;
