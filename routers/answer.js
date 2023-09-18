const express = require('express');
const router = express.Router({mergeParams:true});
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAnswerToQuestion} = require('../controllers/answer');

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAnswerToQuestion);
module.exports = router;