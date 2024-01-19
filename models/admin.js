const mongoose = require('mongoose');
const multer = require('multer');
const imgPath = "/uploads/adminimages"
const path = require('path');

const AdminSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    discription :{
        type : String,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    gender :{
        type : String,
        required : true
    },
    hobby :{
        type : Array,
        required : true
    },
    adminImage :{
        type : String,
        required : true
    },
    isActive :{
        type : Boolean,
        required : true
    },
    currentDate :{
        type : String,
        required : true
    },
    updateDate :{
        type : String,
        required : true
    }
});
const imgStorage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,path.join(__dirname,'..',imgPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});
AdminSchema.statics.uploadImage = multer({storage : imgStorage}).single('adminImage');
AdminSchema.statics.adminImgpath = imgPath;
const Admin = mongoose.model('Admin',AdminSchema);
module.exports=Admin;