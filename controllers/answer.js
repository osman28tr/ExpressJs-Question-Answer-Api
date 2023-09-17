const Question = require('../models/question');
const Answer = require('../models/answer');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req,res,next) =>{
    const questionId = req.params.question_id;

    const userId = req.user.id;
    const information = req.body;
    
    const answer = await Answer.create({
        ...information,
        user:userId,
        question:questionId
    })

    return res.status(200)
    .json({
        success:true,
        data:answer
    });
    
});

module.exports = {
    addNewAnswerToQuestion
}