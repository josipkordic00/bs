const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');


//get all users
// endpoint koji kad se pozove dobavi iz baze sve korisnike
router.get('/user', async (req, res)=>{
    const users = await loadUsersCollection();
    let arr = await users.find({}).toArray();
    for (let i = 0; i <arr.length;i++){
        res.send({"_id":arr[i]._id,
            "first_name":arr[i].first_name,
            "last_name":arr[i].last_name,
            "email":arr[i].email,
            "role":arr[i].role
    })

    }
    
})
//get one user
//-II- ali samo jednog korisnika
router.get('/user/:id', async (req, res)=>{
    const users = await loadUsersCollection();
    let arr = await users.find({_id: new mongodb.ObjectID(req.params.id)}).toArray();
    
    res.status(200).send({"_id":arr[0]._id,
    "first_name":arr[0].first_name,
    "last_name":arr[0].last_name,
    "email":arr[0].email,
    "role":arr[0].role});

})

//add user
router.post("/user", async (req, res)=>{
    const users = await loadUsersCollection();

    let email = req.body.email;
   let arr = users.find({email:email}).toArray();

   if(arr){
      throw new Error("email vec postoji")
   }
    await users.insertOne({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    res.status(201).send();
})


//delete user
router.delete("/user/:id", async (req,res)=>{
    const users = await loadUsersCollection();
    await users.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

//get all appointments

router.get('/appointment', async (req, res)=>{
    const appointments = await loadAppointmentsCollection();
    res.send(await appointments.find({}).toArray())
})

//get all appointments from one user

router.get('/appointment/:id', async (req, res)=>{
    const appointments = await loadAppointmentsCollection();
    res.send(await appointments.find({user_id : req.params.id}).toArray())
})

//get one appointment
router.get('/appointment/:id', async (req, res)=>{
    const appointments = await loadAppointmentsCollection();
    await appointments.find({_id: new mongodb.ObjectID(req.params.id)}).toArray();
    res.status(200).send();

})

//add appointment
router.post("/appointment/", async (req, res)=>{
    const appointments = await loadAppointmentsCollection();
    await appointments.insertOne({
        date: req.body.date,
        status: req.body.status,
        user_id: req.body.id,
        type: req.body.type,
    })
    res.status(201).send();
})


//delete appointment
router.delete("/appointment/:id", async (req,res)=>{
    const appointments = await loadAppointmentsCollection();
    await appointments.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

//mongodb


async function loadAppointmentsCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return client.db('BeautyStudio').collection('termini')
}

//mongodb


async function loadUsersCollection(){
    const client = await mongodb.MongoClient.connect("mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return client.db('BeautyStudio').collection('users')
}

//setting routes

router.get("/login", async (req, res)=>{
    const users = await loadUsersCollection();
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
})


module.exports = router;