const express = require('express');
const question = require('./question');
const auth = require('./auth');
const user = require('./user');

// /api
const router = express.Router();

router.use("/questions",question);
router.use("/auth",auth);
router.use("/user",user);

module.exports = router;