const express = require('express');
const {checkQuestionAndAnswerExist} = require('../middlewares/database/databaseErrorHelpers');
const router = express.Router({mergeParams:true});
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAnswerToQuestion,getSingleAnswer,editAnswer} = require('../controllers/answer');

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAnswerToQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
router.put("/:answer_id",[getAccessToRoute,checkQuestionAndAnswerExist],editAnswer);
module.exports = router;