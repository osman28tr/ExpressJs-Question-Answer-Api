const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Questions home page");
});

router.get("/delete",(req,res)=>{
    res.send("Questions delete page");
});

module.exports = router;