const User = require('../models/user');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');

const register = asyncErrorWrapper(async (req,res,next)=>{
    const {name,mail,password,role} = req.body;
    const user = await User.create({
        name,
        mail,
        password,
        role
    });
    sendJwtToClient(user,res);
    res.status(200).json({
        success:true,
        data:user
    });  
});

const tokentest = (req,res,next)=>{
    res.json({
        success:true,
        message:"welcome"
    });
};

module.exports = {
    register,
    tokentest
};