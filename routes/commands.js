const express = require("express");
const checkTokenMiddleware = require("../jsonwebtoken/check");
const commandController = require("../controllers/command");

let router = express.Router();

router.get("", commandController.getAllCommands);
router.post("", commandController.addCommand);
router.put("/:id", commandController.updateCommand);
router.delete("/:id", commandController.deleteCommand);
// router.get("/:id", commandController.getCommandById);

module.exports = router;
