const express = require("express");
const router = express.Router();
const controller = require("../controllers/clients");
const { upload, fileUpload } = require("../middleware/uploadFile");
const { authToken } = require("../middleware/auth");
const { roleAuthorize } = require("../middleware/roleAuthorize");

// Menggunakan middleware
router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post(
    "/store",
    upload.fields([
        { name: "image_path", maxCount: 1 },
    ]),
    controller.post
);
router.put(
    "/edit/:id",
    upload.fields([
        { name: "image_path", maxCount: 1 },
    ]),
    controller.edit
);
router.delete("/delete/:id", controller.delete);

module.exports = router;
