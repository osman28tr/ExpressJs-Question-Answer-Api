const express = require('express');
const dotenv = require('dotenv');

//Environment variables
dotenv.config({
    path:"./config/env/config.env"
});
const app = express();
const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hello question answer api");
})

app.get("/test",(req,res)=>{
    res.send("testing");
})

app.listen(PORT,()=>{
    console.log(`App started on ${process.env.PORT} : ${process.env.NODE_ENV}`);
});