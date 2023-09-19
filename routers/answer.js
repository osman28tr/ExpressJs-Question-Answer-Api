const express = require('express');
const {checkQuestionAndAnswerExist} = require('../middlewares/database/databaseErrorHelpers');
const router = express.Router({mergeParams:true});
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAnswerToQuestion,getSingleAnswer,editAnswer,deleteAnswer} = require('../controllers/answer');
const {getAnswerOwnerAccess} = require('../middlewares/authorization/auth');

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAnswerToQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
router.put("/:answer_id",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);
module.exports = router;