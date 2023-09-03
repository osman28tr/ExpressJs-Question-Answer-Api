const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers/index');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');

//Environment variables
dotenv.config({
    path:"./config/env/config.env"
});

//Mongodb connection
connectDatabase();

const app = express();
//express - body middleware
app.use(express.json());

const PORT = process.env.PORT;

//Routers middleware
app.use("/api",routers);

//Error handling
app.use(customErrorHandler);

app.listen(PORT,()=>{
    console.log(`App started on ${process.env.PORT} : ${process.env.NODE_ENV}`);
});