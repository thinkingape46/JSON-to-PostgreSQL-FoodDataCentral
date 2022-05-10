const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const { port } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Node running");
});

app.get("/data", db.data);

app.get("/addfoods", db.addFoods);

app.listen(port, () => {
  console.log("listening at port " + process.env.PORT);
});
