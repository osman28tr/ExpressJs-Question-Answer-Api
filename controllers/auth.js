const User = require('../models/user');

const register = async (req,res,next)=>{
    const name = "ela tonbul";
    const mail = "ela.com";
    const password = "123456";
    try {
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
    } catch (error) {
        return next(error);   
    }   
}
module.exports = {
    register
};