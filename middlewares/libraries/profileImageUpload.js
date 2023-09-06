const multer = require('multer');
const path = require('path');
const CustomError = require('../../helpers/error/CustomError');

//storage, filefilter

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));
    },
    filename:function(req,file,cb){
        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_"+req.user.id + "." + extension;
        cb(null,req.savedProfileImage);
    }
});
const fileFilter = (req,file,cb)=>{
    let allowedMimeTypes = ["image/jpg","image/jpeg","image/png","image/gif"];

    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("please provide a valid image file",400),false);
    }
    cb(null,true);
}
const profileImageUpload = multer({storage:storage,fileFilter:fileFilter});
module.exports = profileImageUpload;