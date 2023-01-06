//mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./backend/routes/api/index");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/*const uri = "mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("BeautyStudio").collection("users");
   collection.find({}).toArray(function(err, documents) {
      if (err) throw err;
      console.log(documents);
      client.close();
   });
});*/

app.use(bodyParser.json());

app.use("/", routes);

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
