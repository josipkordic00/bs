//mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "+");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})



const uri = "mongodb+srv://BeautyStudio:1234@cluster0.sjk4cop.mongodb.net/test";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("mongo db connected")
})
.catch(err => console.log(err))

app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send("hello")
})

//const bsRoute = require('./routes/BeautyStudio');
//app.use('/bs', bsRoute)

app.listen(3000, ()=>{
    console.log("Listening to port 3000")
});