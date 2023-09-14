const express = require('express');
const {getAccessToRoute,getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const {getAllQuestions,getSingleQuestion,askNewQuestion,editQuestion} = require('../controllers/question');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');
const router = express.Router();

router.get("/",getAllQuestions);
router.get('/:id',checkQuestionExist,getSingleQuestion)
router.post("/ask",getAccessToRoute,askNewQuestion);
router.put('/:id/edit',[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);

module.exports = router;