const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');


//get all users

router.get('/user', async (req, res)=>{
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray())
})
//get one user
router.get('/user/:id', async (req, res)=>{
    const users = await loadUsersCollection();
    await users.find({_id: new mongodb.ObjectID(req.params.id)}).toArray();
    res.status(200).send();

})

//add user
router.post("/user", async (req, res)=>{
    const users = await loadUsersCollection();
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
//get one appointment
router.get('/appointment/:id', async (req, res)=>{
    const appointments = await loadAppointmentsCollection();
    await appointments.find({_id: new mongodb.ObjectID(req.params.id)}).toArray();
    res.status(200).send();

})

//add appointment
router.post("/appointment/:id", async (req, res)=>{
    let id = req.params.id;
    const appointments = await loadAppointmentsCollection();
    await appointments.insertOne({
        user_id: id,
        status: req.body.status,
        date: req.body.date,
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

router.use("/login", require("../../controllers/loginController"))
router.use("/register", require("../../controllers/registerController"))


module.exports = router;