const express = require("express");
const router = express.Router();
const controller = require("../controllers/talent");
const { upload, fileUpload } = require("../middleware/uploadFile");
const { authToken } = require("../middleware/auth");
const { roleAuthorize } = require("../middleware/roleAuthorize");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.get("/:id/download", controller.download);
router.post(
  "/store",
  upload.fields([
    { name: "talent_image_path", maxCount: 1 },
    { name: "cv_file_path", maxCount: 1 },
  ]),
  controller.post
);
router.put(
  "/edit/:id",
  upload.fields([
    { name: "talent_image_path", maxCount: 1 },
    { name: "cv_file_path", maxCount: 1 },
  ]),
  controller.edit
);
router.delete("/delete/:id", controller.delete);

module.exports = router;
