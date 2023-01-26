const express = require("express");

const bcrypt = require("bcrypt");

const Product = require("../models/product");

let router = express.Router();

router.get("", (_, res) => {
  Product.findAll()
    .then((products) =>
      res.json({
        data: products,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: "Dtabase Error",
        error: err,
      })
    );
});

router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  if (!productId) {
    return res.json(400).json({ message: "Missing parameter" });
  }

  Product.findOne({
    where: { id: productId },
    raw: true,
  })
    .then((product) => {
      if (product === null) {
        return res.status(400).json({ message: "This product does not exist" });
      }

      return res.json({ data: product });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Database Error",
        error: err,
      })
    );
});

router.post("", (req, res) => {
  const { name, status, userId, categoryId } = req.body;

  if (!name || !status || !userId || !categoryId) {
    return res.status(400).json({ message: "Missing Data" });
  }

  Product.create({ name, status, userId, categoryId })
    .then((product) => res.json({ message: "product Created", data: product }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
});

router.patch("/:id", (req, res) => {
  let productId = parseInt(req.params.id);

  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Product.findOne({ where: { id: productId }, raw: true })
    .then((product) => {
      if (product === null) {
        return res
          .status(404)
          .json({ message: "this product does not exist !" });
      }

      Product.update(req.body, { where: { id: productId } })
        .then((user) => {
          res.json({ message: "Product updated" });
        })
        .catch((err) =>
          res.status(500).json({ message: "Database error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Database error", error: err })
    );
});

router.delete("/:id", (req, res) => {
  let productId = parseInt(req.params.id);

  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Product.destroy({ where: { id: productId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database error", error: err })
    );
});

module.exports = router;
