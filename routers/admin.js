const express = require('express');
const router = express.Router();
const {getAccessToRoute,getAdminAccess} = require('../middlewares/authorization/auth');
const {checkUserExist} = require('../middlewares/database/databaseErrorHelpers');
//block and delete users
const {blockUser} = require('../controllers/admin');
router.use([getAccessToRoute,getAdminAccess]);

router.get("/block/:id",checkUserExist,blockUser);
module.exports = router;