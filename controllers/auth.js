const User = require('../models/user');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const register = asyncErrorWrapper(async (req,res,next)=>{
    const {name,mail,password,role} = req.body;
    const user = await User.create({
        name,
        mail,
        password,
        role
    });
    //console.log(req.body);

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