const DB = require("../db.config");
const Site = DB.Site;
const User = DB.User;

exports.getAllSites = (_, res) => {
  Site.findAll({ paranoid: false })
    .then((sites) => res.json({ data: sites }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.getSiteById = async (req, res) => {
  let siteId = parseInt(req.params.id);

  if (!siteId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    let site = await Site.findOne({
      where: { id: siteId },
      // include: { model: User },
    });

    if (site === null) {
      return res.status(404).json({ message: "This site does not exist !" });
    }

    return res.json({ data: site });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addSite = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Missing Data" });
  }

  try {
    let site = await Site.create(req.body);

    return res.json({ message: "Site Created", data: site });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateSite = async (req, res) => {
  let siteId = parseInt(req.params.id);

  if (!siteId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    let site = await Site.findOne({ where: { id: siteId }, raw: true });

    if (site === null) {
      return res.status(404).json({ message: "This site does not exist !" });
    }

    await Site.update(req.body, { where: { id: siteId } });
    return res.json({ message: "Site Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteSite = (req, res) => {
  let siteId = parseInt(req.params.id);

  if (!siteId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Site.destroy({ where: { id: siteId }, force: false })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
