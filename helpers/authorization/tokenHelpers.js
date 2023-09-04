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
const isTokenIncluded = (req)=>{
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer:');
};
const getAccessTokenFromHeader = (req)=>{
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
}

module.exports = {sendJwtToClient,isTokenIncluded,getAccessTokenFromHeader};