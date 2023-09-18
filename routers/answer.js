const express = require('express');
const {checkQuestionAndAnswerExist} = require('../middlewares/database/databaseErrorHelpers');
const router = express.Router({mergeParams:true});
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAnswerToQuestion,getSingleAnswer} = require('../controllers/answer');

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAnswerToQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
module.exports = router;