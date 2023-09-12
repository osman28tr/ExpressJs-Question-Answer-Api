const User = require('../models/user');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const getSingleUser = asyncErrorWrapper(async (req,res,next)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    
    return res.status(200)
    .json({
        status:true,
        data:user
    });
});
const getAllUsers = asyncErrorWrapper(async (req,res,next)=>{
    const users = await User.find();
    return res.status(200)
    .json({
        status:true,
        data:users
    });
});
module.exports = {
    getSingleUser,
    getAllUsers
};