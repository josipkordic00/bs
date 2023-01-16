//importanje plugina
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./backend/routes/api/index");

//spremanje expressa u varijablu 
const app = express();

//postavljanje detalja o responseu




app.use(bodyParser.json());

//pocetna ruta
app.use("/", routes);

//slusanje servera na portu 3000
app.listen(3000, () => {
  console.log("Listening to port 3000");
});
