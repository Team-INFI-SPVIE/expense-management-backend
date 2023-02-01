const DB = require("../db.config");
const Product = DB.Product;
const User = DB.User;

exports.getAllProducts = (req, res) => {
  Product.findAll({ paranoid: false })
    .then((products) => res.json({ data: products }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.getProductById = async (req, res) => {
  let productId = parseInt(req.params.id);

  if (!productId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    let product = await Product.findOne({
      where: { id: productId },
      include: { model: User },
    });

    if (product === null) {
      return res.status(404).json({ message: "This product does not exist !" });
    }

    return res.json({ data: product });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addProduct = async (req, res) => {
  const { userId, name, description, status, price } = req.body;

  if (!userId || !name || !description || !status || !price) {
    return res.status(400).json({ message: "Missing Data" });
  }

  try {
    let product = await Product.create(req.body);

    return res.json({ message: "Product Created", data: product });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateProduct = async (req, res) => {
  let productId = parseInt(req.params.id);

  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    let product = await Product.findOne({
      where: { id: productId },
      raw: true,
    });

    if (product === null) {
      return res.status(404).json({ message: "This product does not exist !" });
    }

    await Product.update(req.body, { where: { id: productId } });
    return res.json({ message: "Product Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteProduct = (req, res) => {
  let productId = parseInt(req.params.id);

  if (!productId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  Product.destroy({ where: { id: productId }, force: false })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
