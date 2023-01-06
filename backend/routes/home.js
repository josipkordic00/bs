const express = require('express');
const router = express.Router();

//login form
router.get("/", (req,res)=>{
    res.send("HElloa");
});

module.exports = router;