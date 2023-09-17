const express = require('express');
const {getAccessToRoute,getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const {getAllQuestions,getSingleQuestion,askNewQuestion,editQuestion,deleteQuestion,likeQuestion,undolikeQuestion} = require('../controllers/question');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');
const answer = require('./answer');

const router = express.Router();

router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion);
router.get("/:id/undo_like",[getAccessToRoute,checkQuestionExist],undolikeQuestion);
router.get("/",getAllQuestions);
router.get('/:id',checkQuestionExist,getSingleQuestion)
router.post("/ask",getAccessToRoute,askNewQuestion);
router.put('/:id/edit',[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete('/:id/delete',[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion)
router.use("/:question_id/answers",answer);

module.exports = router;