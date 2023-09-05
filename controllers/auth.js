const User = require('../models/user');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');
const {validateUserInput,comparePassword} = require('../helpers/input/inputHelpers');

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
const login = asyncErrorWrapper(async (req,res,next)=>{
    const {mail,password} = req.body;
    if(!validateUserInput(mail,password)){
        return next(new CustomError("Please check your inputs",400))
    }
    const user = await User.findOne({mail}).select("+password");
    if(!comparePassword(password,user.password)){
        return next(new CustomError("Please check your credentials",400))
    }
    sendJwtToClient(user,res);
});
const getUser = (req,res,next)=>{
    res.json({
        success:true,
        message:{
            id:req.user.id,
            name:req.user.name
        }
    });
};

module.exports = {
    register,
    getUser,
    login
};