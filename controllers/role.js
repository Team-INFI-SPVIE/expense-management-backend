const DB = require("../db.config");
const Role = DB.Role;

exports.getRoles = (_, res) => {
  Role.findAll({ paranoid: false })
    .then((roles) => res.json({ data: roles }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.getRoleById = async (req, res) => {
  let roleId = parseInt(req.params.id);

  if (!roleId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    let role = await Role.findOne({
      where: { id: roleId },
    });

    if (role === null) {
      return res.status(404).json({ message: "This role does not exist !" });
    }

    return res.json({ data: role });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Missing Data" });
  }

  try {
    const roleData = {
      name: name,
      createdAt: new Date(),
    };

    let role = await Role.create(roleData);

    return res.json({ message: "Role Created", data: role });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateRole = async (req, res) => {
  let roleId = parseInt(req.params.id);

  if (!roleId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    let role = await Role.findOne({ where: { id: roleId }, raw: true });

    if (role === null) {
      return res.status(404).json({ message: "This role does not exist !" });
    }

    await Role.update(req.body, { where: { id: roleId } });
    return res.json({ message: "Role Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteRole = (req, res) => {
  let roleId = parseInt(req.params.id);

  if (!roleId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Role.destroy({ where: { id: roleId }, force: false })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
