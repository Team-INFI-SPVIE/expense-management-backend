const DB = require("../db.config");
const Command = DB.Command;
const User = DB.User;
const Site = DB.Site;
const Product = DB.Product;

exports.getAllCommands = async (_, res) => {
  let users = await Command.findAll({
    // include: { model: User },
    // include: { model: Site },
    include: { model: Product },
  });

  return res.json({ data: users });
};

exports.addCommand = async (req, res) => {
  const { designation, status, amount, userId, siteId, productId, categoryId } =
    req.body;
  console.log(req.body);

  if (
    !designation ||
    !status ||
    !amount ||
    !userId ||
    !siteId ||
    !productId ||
    !categoryId
  ) {
    return res.status(400).json({ message: "Missing Data" });
  }

  try {
    let command = await Command.create(req.body);

    return res.json({ message: "Comand Created", data: command });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Hash Process Error", error: err });
  }
};

exports.updateCommand = async (req, res) => {
  let commandId = parseInt(req.params.id);

  console.log(req.body);
  if (!commandId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    let command = await Command.findOne({
      where: { id: commandId },
      raw: true,
    });

    if (command === null) {
      return res.status(404).json({ message: "This command does not exist !" });
    }

    await Command.update(req.body, { where: { id: commandId } });
    return res.json({ message: "Command Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteCommand = (req, res) => {
  let commandId = parseInt(req.params.id);

  if (!commandId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Command.destroy({ where: { id: commandId }, force: false })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
