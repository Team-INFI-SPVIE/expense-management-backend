const express = require("express");
const checkTokenMiddleware = require("../jsonwebtoken/check");
const categoryController = require("../controllers/category");

let router = express.Router();

router.get("", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("", categoryController.addCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
