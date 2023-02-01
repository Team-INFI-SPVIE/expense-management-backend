const express = require("express");
const checkTokenMiddleware = require("../jsonwebtoken/check");
const siteController = require("../controllers/site");

let router = express.Router();

router.get("", siteController.getAllSites);
router.get("/:id", siteController.getSiteById);
router.post("", siteController.addSite);
router.patch("/:id", siteController.updateSite);
router.delete("/:id", siteController.deleteSite);

module.exports = router;
