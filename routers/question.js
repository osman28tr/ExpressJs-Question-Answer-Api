const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {getAllQuestions,getSingleQuestion,askNewQuestion} = require('../controllers/question');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');
const router = express.Router();

router.get("/",getAllQuestions);
router.get('/:id',checkQuestionExist,getSingleQuestion)
router.post("/ask",getAccessToRoute,askNewQuestion);

module.exports = router;