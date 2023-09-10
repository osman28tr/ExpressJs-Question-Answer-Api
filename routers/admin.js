const express = require('express');
const router = express.Router();
const {getAccessToRoute,getAdminAccess} = require('../middlewares/authorization/auth');
//block and delete users
router.use([getAccessToRoute,getAdminAccess]);
router.get("/",(req,res,next)=>{
    res.status(200)
    .json({
        status:true,
        message:"test"
    });
});
module.exports = router;