const User = require('../models/user');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const register = asyncErrorWrapper(async (req,res,next)=>{
    const name = "ela tonbul";
    const mail = "ela@gmail.com";
    const password = "123456";
    //async await
    const user = await User.create({
        name,
        mail,
        password
    });
    res.status(200).json({
        success:true,
        data:user
    });  
});
const errorTest = (req,res,next)=>{
    return next(new TypeError("Type Error"));   
}

module.exports = {
    register
};