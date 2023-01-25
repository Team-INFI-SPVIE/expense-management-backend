const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routing
app.get("/", (req, res) => res.send("Welcome..."));

app.get("*", (req, res) => res.status(501).send("Error 501"));

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `This server is rouning on http://localhost:${process.env.SERVER_PORT}`
  );
});
