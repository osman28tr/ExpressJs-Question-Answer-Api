const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const {isTokenIncluded,getAccessTokenFromHeader} = require('../../helpers/authorization/tokenHelpers');

const getAccessToRoute = (req,res,next)=>{
    const {JWT_SECRET_KEY} = process.env;
    //401 unauthorized: not token or expired
    //403 forbidden: not permission, have token
    if(!isTokenIncluded(req)){
        return next(new CustomError("you are not authorized to access this route",401));
    }
    const accessToken = getAccessTokenFromHeader(req);
    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return next(new CustomError("you are not authorized to access this route",401));
        }
        req.user = {
            id:decoded.id,
            name:decoded.name
        };
        console.log(decoded);
        next();
    });
    // const decoded = jwt.verify(accessToken,JWT_SECRET_KEY);
    // console.log(decoded);
}
module.exports = {
    getAccessToRoute
};