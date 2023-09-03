const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err,req,res,next)=>{
    let customError = err;

    if(err.name==="SyntaxError"){
        customError = new CustomError("Unexpected Syntax",400);
    }
    if(err.name==="ValidationError"){
        customError = new customError(err.message,400);
    }
    if(err.code === 11000){
        //duplicate key
        customError = new CustomError("Duplicate key found : Check your input",500);
    }
    res.status(customError.status ||500)
    .json({
        success:false,
        message:customError.message || "Internal Server Error"
    });
}

module.exports = customErrorHandler;