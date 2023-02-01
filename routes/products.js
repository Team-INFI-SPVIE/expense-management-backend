const express = require("express");
const checkTokenMiddleware = require("../jsonwebtoken/check");
const productController = require("../controllers/product");

let router = express.Router();

router.get("", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("", productController.addProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
