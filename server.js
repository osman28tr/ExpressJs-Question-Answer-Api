const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers/index');

//Environment variables
dotenv.config({
    path:"./config/env/config.env"
});
const app = express();
const PORT = process.env.PORT;

//Routers middleware
app.use("/api",routers);

app.listen(PORT,()=>{
    console.log(`App started on ${process.env.PORT} : ${process.env.NODE_ENV}`);
});