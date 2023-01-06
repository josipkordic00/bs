const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');



const registerController = (req,res) => {
   let email = req.body.email;
   

   const users = loadUsersCollection();
   let arr = users.find({}).toArray();

   if(email === arr[0].email){
      alert('ta e-mail adresa postoji')
      res.redirect("/register")
   }else{
      res.redirect("/login")
   }



   async function loadUsersCollection(){
      const client = await mongodb.MongoClient.connect("mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      return client.db('BeautyStudio').collection('users')
  }
}
module.exports = registerController;