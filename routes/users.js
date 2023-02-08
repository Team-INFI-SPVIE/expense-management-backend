const express = require("express");
const userCtrl = require("../controllers/user");

let router = express.Router();

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);
router.post("", userCtrl.addUser);
router.put("/:id", userCtrl.updateUser);
router.post("/untrash/:id", userCtrl.untrashUser);
router.delete("/trash/:id", userCtrl.trashUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
