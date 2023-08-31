const User = require('../models/user');

const register = async (req,res,next)=>{
    const name = "ela tonbul";
    const mail = "ela@gmail.com";
    const password = "123456";

    //async await
    const user = await User.create({
        name,
        mail,
        password
    });

    res.status(200).json({
        success:true,
        data:user
    });
}
module.exports = {
    register
};