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
const logout = asyncErrorWrapper(async (req,res,next)=>{
    const {NODE_ENV} = process.env;
    return res.status(200)
    .cookie({
        httpOnly:true,
        expires:new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    })
    .json({
        status:true,
        message:"logout successfull"
    });
})
const getUser = (req,res,next)=>{
    res.json({
        success:true,
        message:{
            id:req.user.id,
            name:req.user.name
        }
    });
};
const imageUpload = asyncErrorWrapper(async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_image":req.savedProfileImage
    },
    {
        new:true,
        runValidators:true
    });
    res.status(200)
    .json({
        success:true,
        message:"Image upload successfull",
        data:user
    });
});
//forgot password
const forgotPassword = asyncErrorWrapper(async (req,res,next)=>{
    const resetEmail = req.body.email;

    const user = await User.findOne({mail:resetEmail});

    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();
    res.json({
        success:true,
        message:"Token sent your email"
    });
})

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword
};