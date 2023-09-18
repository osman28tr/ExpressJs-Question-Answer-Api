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
const getAnswerToQuestion = asyncErrorWrapper(async (req,res,next) =>{
    const questionId = req.params.question_id;
    
    const question = await Question.findById(questionId).populate("answers");

    const answers = question.answers;

    return res.status(200)
    .json({
        success:true,
        count:answers.length,
        data:answers
    });
});
const getSingleAnswer = asyncErrorWrapper(async (req,res,next) =>{
    const {answer_id} = req.params;

    const answer = await Answer.findById(answer_id).populate({
        path:"question",
        select:"title"
    }).populate({
        path:"user",
        select:"name profile_image"
    });

    return res.status(200)
    .json({
        success:true,
        data:answer
    });
});
module.exports = {
    addNewAnswerToQuestion,
    getAnswerToQuestion,
    getSingleAnswer
}