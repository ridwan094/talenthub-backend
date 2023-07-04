const express = require("express");
const router = express.Router();
const controller = require("../controllers/talentSkill");

router.get("/", controller.get);
router.post("/store", controller.post);

module.exports = router;
