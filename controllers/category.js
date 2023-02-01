const DB = require("../db.config");
const Category = DB.Category;
const User = DB.User;

exports.getCategories = (_, res) => {
  Category.findAll({ paranoid: false })
    .then((categories) => res.json({ data: categories }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.getCategoryById = async (req, res) => {
  let categoryId = parseInt(req.params.id);

  if (!categoryId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    let category = await Category.findOne({
      where: { id: categoryId },
    });

    if (category === null) {
      return res
        .status(404)
        .json({ message: "This category does not exist !" });
    }

    return res.json({ data: category });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addCategory = async (req, res) => {
  const { name, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: "Missing Data" });
  }

  try {
    const categoryData = {
      name: name,
      userId,
      createdAt: new Date(),
    };

    let category = await Category.create(categoryData);

    return res.json({ message: "Category Created", data: category });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateCategory = async (req, res) => {
  let categoryId = parseInt(req.params.id);

  if (!categoryId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    let category = await Category.findOne({
      where: { id: categoryId },
      raw: true,
    });

    if (category === null) {
      return res
        .status(404)
        .json({ message: "This category does not exist !" });
    }

    await Category.update(req.body, { where: { id: categoryId } });
    return res.json({ message: "Category Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteCategory = (req, res) => {
  let categoryId = parseInt(req.params.id);

  if (!categoryId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Category.destroy({ where: { id: categoryId }, force: false })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
