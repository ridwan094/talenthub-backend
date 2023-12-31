const express = require("express");
const router = express.Router();
const controller = require("../controllers/talentSkill");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/store", controller.post);

module.exports = router;
