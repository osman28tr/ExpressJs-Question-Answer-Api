const Question = require('../models/question');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const getAllQuestions = asyncErrorWrapper(async (req,res,next) =>{
    const questions = await Question.find();
    res.status(200).json({
        success:true,
        data:questions
    });
});
const askNewQuestion = asyncErrorWrapper(async (req,res,next)=>{
    const information = req.body;
    console.log(req.user);
    const question = await Question.create({
        ...information,
        user:req.user.id
    });
    res.status(200)
    .json({
        success:true,
        data:question
    });
})
module.exports = {
    getAllQuestions,
    askNewQuestion
};