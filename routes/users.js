const express = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user");

let router = express.Router();

router.get("", (req, res) => {
  User.findAll()
    .then((users) =>
      res.json({
        data: users,
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
  const userId = parseInt(req.params.id);

  if (!userId) {
    return res.json(400).json({ message: "Missing parameter" });
  }

  User.findOne({
    where: { id: userId },
    raw: true,
  })
    .then((user) => {
      if (user === null) {
        return res.status(400).json({ message: "This user does not exist" });
      }

      return res.json({ data: user });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Database Error",
        error: err,
      })
    );
});

router.post("", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing Data" });
  }

  User.findOne({ where: { email: email }, raw: true })
    .then((user) => {
      if (user !== null) {
        return res
          .status(409)
          .json({ message: `The user ${nom} already exists !` });
      }

      // Hashage du mot de passe utilisateur
      bcrypt
        .hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then((hash) => {
          req.body.password = hash;

          // Céation de l'utilisateur
          User.create(req.body)
            .then((user) => res.json({ message: "User Created", data: user }))
            .catch((err) =>
              res.status(500).json({ message: "Database Error", error: err })
            );
        })
        .catch((err) =>
          res.status(500).json({ message: "Hash Process Error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
});

router.patch("/:id", (req, res) => {
  let userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: "this user is not exist !" });
      }

      User.update(req.body, { where: { id: userId } })
        .then((user) => {
          res.json({ message: "User updated" });
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
  let userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.destroy({ where: { id: userId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database error", error: err })
    );
});

module.exports = router;
