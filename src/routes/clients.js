const express = require("express");
const router = express.Router();
const controller = require("../controllers/clients");
const { authToken } = require("../middleware/auth");
const { roleAuthorize } = require("../middleware/roleAuthorize");

// Menggunakan middleware
router.get("/", authToken, controller.get);
router.get("/:id", controller.getById);
router.post("/store", controller.post);
router.put("/edit/:id", controller.edit);
router.delete("/:id", controller.delete);
// router.post("/upload", controller.uploadImage);

module.exports = router;
