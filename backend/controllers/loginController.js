const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');




const uri = "mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority";

const loginController = (req,res) => {
   let email = req.body.email;
   let pw = req.body.password;

   const users = loadUsersCollection();
   users.find({email:email},(err, docs)=>{
      if(err){
         res.redirect("/");
      }else{
         let user = docs[0];
         
      };

   })


   async function loadUsersCollection(){
      const client = await mongodb.MongoClient.connect("mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      return client.db('BeautyStudio').collection('users')
  }
}
module.exports = loginController;