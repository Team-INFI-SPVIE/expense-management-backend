const express = require("express");
const checkTokenMiddleware = require("../jsonwebtoken/check");
const roleController = require("../controllers/role");

let router = express.Router();

router.get("", roleController.getRoles);
router.get("/:id", roleController.getRoleById);
router.post("", roleController.addRole);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

module.exports = router;
