const express = require("express");
const cors = require("cors");

let DB = require("./db.config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import module routage
const user_router = require("./routes/users");
const product_router = require("./routes/products");
const category_router = require("./routes/categories");

//Routing
app.get("/", (req, res) => res.send("Welcome..."));
app.use("/users", user_router);
app.use("/products", product_router);
app.use("/categories", category_router);
app.get("*", (req, res) => res.status(501).send("Error 501"));

DB.authenticate()
  .then(() => console.log("Connected"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `This server is rouning on http://localhost:${process.env.SERVER_PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });
