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
const editAnswer = asyncErrorWrapper(async (req,res,next) =>{
    const {answer_id} = req.params;

    const {content} = req.body;

    let answer = await Answer.findById(answer_id);
    answer.content = content;

    answer = await answer.save();

    return res.status(200)
    .json({
        success:true,
        data:answer
    });
});
const deleteAnswer = asyncErrorWrapper(async (req,res,next) =>{
    const {answer_id} = req.params;

    const {question_id} = req.params;

    await Answer.findByIdAndRemove(answer_id);

    const question = await Question.findById(question_id);

    question.answers.splice(question.answers.indexOf(question_id),1);

    await question.save();

    return res.status(200)
    .json({
        success:true,
        message:"Answer deleted successfully."
    });
});
module.exports = {
    addNewAnswerToQuestion,
    getAnswerToQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer
}