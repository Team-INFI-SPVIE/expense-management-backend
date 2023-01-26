const express = require("express");

const bcrypt = require("bcrypt");

const Category = require("../models/category");

let router = express.Router();

router.get("", (_, res) => {
  Category.findAll()
    .then((categories) =>
      res.json({
        data: categories,
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
  const categoryId = parseInt(req.params.id);

  if (!categoryId) {
    return res.json(400).json({ message: "Missing parameter" });
  }

  Category.findOne({
    where: { id: categoryId },
    raw: true,
  })
    .then((product) => {
      if (product === null) {
        return res
          .status(400)
          .json({ message: "This categories does not exist" });
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
  const { name, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: "Missing Data" });
  }

  Category.create({ name, userId })
    .then((category) =>
      res.json({ message: "category Created", data: category })
    )
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
});

router.patch("/:id", (req, res) => {
  let categoryId = parseInt(req.params.id);

  if (!categoryId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Category.findOne({ where: { id: categoryId }, raw: true })
    .then((product) => {
      if (product === null) {
        return res
          .status(404)
          .json({ message: "this category does not exist !" });
      }

      Category.update(req.body, { where: { id: categoryId } })
        .then((category) => {
          res.json({ message: "Category updated" });
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
  let categoryId = parseInt(req.params.id);

  if (!categoryId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Category.destroy({ where: { id: categoryId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database error", error: err })
    );
});

module.exports = router;
