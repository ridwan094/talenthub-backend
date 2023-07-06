const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", controller.get);
router.post("/store", controller.post);
router.put("/edit/:id", controller.edit);
router.delete("/delete/:id", controller.delete);

module.exports = router;
