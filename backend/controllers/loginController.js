const bcrypt = require("bcrypt");
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority";

const loginController = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("BeautyStudio").collection("users");
   collection.find({email:email,password:password}, function(err, documents) {
      if (err) throw err;
      
      client.close();
   });
});
}
module.exports = loginController;