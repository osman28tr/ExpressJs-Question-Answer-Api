const sendJwtToClient = (user,res)=>{
    //generate jwt
    const token = user.generateJwtFromUser();

    const {JWT_EXPIRE,NODE_ENV} = process.env;
    return res.status(200)
    .cookie("access_token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + parseInt(JWT_EXPIRE) * 1000),
        secure:NODE_ENV === "development" ? false : true
    }) //response
    .json({
        success:true,
        access_token:token,
        data:{
            name:user.name,
            mail:user.mail
        }
    });
}
module.exports = sendJwtToClient;