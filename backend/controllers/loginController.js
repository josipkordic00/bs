const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');


const loginController = async (req,res) => {
   let email = req.body.email;
   let password = req.body.password;

   const usersCollection = await loadUsersCollection();
   const docs = await usersCollection.find({email:email, password:password}).toArray();
   if (docs.length === 0) {
      // No matching documents were found
      res.redirect("/");
   } else {
      res.send(docs[0]);
   }
};

async function loadUsersCollection(){
   const client = await mongodb.MongoClient.connect("mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   return client.db('BeautyStudio').collection('users')
}

module.exports = loginController;
