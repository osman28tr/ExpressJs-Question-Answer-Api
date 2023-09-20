const Question = require('../models/question');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");

const getAllQuestions = asyncErrorWrapper(async (req,res,next) =>{
    let query = Question.find();
    const populate=true;
    const populateObject={
        path:"user",
        select:"name profile_image"
    };
    //Search
    if(req.query.search){
        const searchObject = {};
        
        const regex = new RegExp(req.query.search,"i");
        searchObject["title"] = regex;

        query = query.where(searchObject);
    }
    //Populate
    if(populate){
        query = query.populate(populateObject);
    }
    //Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page-1)*limit;
    const endIndex = page*limit;

    const pagination = {};
    const total = await Question.countDocuments();
    if(startIndex>0){
        pagination.previous={
            page:page-1,
            limit:limit
        }
    }
    if(endIndex<total){
        pagination.next={
            page:page+1,
            limit:limit
        }
    }
    query = query.skip(startIndex).limit(limit);
    //Sorting
    const sortKey = req.query.sortBy;
    if(sortKey == "most-answered"){
        query = query.sort("-answerCount -createdAt");
    }
    if(sortKey == "most-liked"){
        query = query.sort("-likeCount");
    }
    else{
        query = query.sort("-createdAt");
    }   
    const questions = await query;
    res.status(200).json({
        success:true,
        count:questions.length,
        pagination:pagination,
        data:questions
    });
});
const getSingleQuestion = asyncErrorWrapper(async (req,res,next) =>{
    const {id} = req.params;

    const question = await Question.findById(id);

    res.status(200).json({
        success:true,
        data:question
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
const editQuestion = asyncErrorWrapper(async (req,res,next) =>{
    const {id} = req.params;

    const {title,content} = req.body;

    let question = await Question.findById(id);

    question.title = title;
    question.content = content;

    question = await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    });
});
const deleteQuestion = asyncErrorWrapper(async (req,res,next) =>{
    const {id} = req.params;

    await Question.findByIdAndDelete(id);

    res.status(200)
    .json({
        success:true,
        message:"question delete operation successful"
    });
});
const likeQuestion = asyncErrorWrapper(async (req,res,next) =>{
    const {id} = req.params;

    const question = await Question.findById(id);

    if(question.likes.includes(req.user.id)){
        return next(new CustomError("You already liked this question",400));
    }
    question.likes.push(req.user.id);
    question.likeCount = question.likeCount + 1;
    await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    });
});
const undolikeQuestion = asyncErrorWrapper(async (req,res,next) =>{
    const {id} = req.params;

    const question = await Question.findById(id);

    if(question.likes.includes(req.user.id)){
        question.likes.pop(req.user.id);
        question.likeCount = question.likeCount - 1;
        await question.save();

        return res.status(200)
        .json({
            success:true,
            data:question
        })
    }
    return next(new CustomError("You already not liked",400));
});
module.exports = {
    getAllQuestions,
    askNewQuestion,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undolikeQuestion
};