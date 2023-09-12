const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {getAllQuestions,askNewQuestion} = require('../controllers/question');
const router = express.Router();

router.get("/",getAllQuestions);
router.post("/ask",getAccessToRoute,askNewQuestion);

module.exports = router;