const express = require("express");
const router = express.Router();
const controller = require("../controllers/seniority");

router.get("/", controller.get);
router.post("/store", controller.post);
router.delete("/delete/:id", controller.delete);

module.exports = router;
