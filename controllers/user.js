const DB = require("../db.config");
const User = DB.User;
const Role = DB.Role;

exports.getAllUsers = (_, res) => {
  User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.getUser = async (req, res) => {
  let userId = parseInt(req.params.id);
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    let user = await User.findOne({
      where: { id: userId },
      include: { model: Role },
    });
    if (user === null) {
      return res.status(404).json({ message: "This user does not exist !" });
    }

    return res.json({ data: user });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addUser = async (req, res) => {
  const { firstName, lastName, email, password, roleId } = req.body;
  console.log(req.body);

  if (!firstName || !lastName || !email || !password || !roleId) {
    return res.status(400).json({ message: "Missing Data" });
  }

  try {
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (user !== null) {
      return res
        .status(409)
        .json({ message: `The user ${firstName} already exists !` });
    }

    let userc = await User.create(req.body);

    return res.json({ message: "User Created", data: userc });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Hash Process Error", error: err });
  }
};

exports.updateUser = async (req, res) => {
  let userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    let user = await User.findOne({ where: { id: userId }, raw: true });

    if (user === null) {
      return res.status(404).json({ message: "This user does not exist !" });
    }

    await User.update(req.body, { where: { id: userId } });
    return res.json({ message: "User Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.untrashUser = (req, res) => {
  let userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.restore({ where: { id: userId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.trashUser = (req, res) => {
  let userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.destroy({ where: { id: userId } })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.deleteUser = (req, res) => {
  let userId = parseInt(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.destroy({ where: { id: userId }, force: false })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
