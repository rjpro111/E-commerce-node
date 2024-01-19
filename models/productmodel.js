const mongoose = require('mongoose');
const multer = require('multer');
const productsingleimgpath = "/uploads/productimages/productsingleimages";
const productmultiimgpath = "/uploads/productimages/productmultiimages";
const path = require('path');

const productSchema = mongoose.Schema({
    catogry:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'catogrymodel',
        required : true 
    },
    subcategory:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'subcatogrymodel',
        required : true 
    },
    extracategory :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'extracatogerymodel',
        required : true 
    },
    brand :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'brandmodel',
        required : true 
    },
    type :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'typemodel',
        required : true 
    },
    title :{
        type : String,
        required : true
    },
    productimg :{
        type : String,
        required : true
    },
    multipleproductimage :{
        type : Array,
        required : true
    },
    price :{
        type : String,
        required : true
    },
    oldprice:{
        type : String,
        required : true
    },
    productColour:{
        type : String,
        required : true
    },
    productsize:{
        type : String,
        required : true
    },
    discription:{
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
        if(file.fieldname=='productimg'){
            cb(null,path.join(__dirname,"..",productsingleimgpath));
        }
        else{
            cb(null,path.join(__dirname,"..",productmultiimgpath));
        }
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Math.random()*10000000);
    }
});

productSchema.statics.uploadimage = multer({storage : imgStorage}).fields([{name:"productimg",maxCount:1},{name:"multipleproductimage",maxCount:5}]);

productSchema.statics.productsingleImgpath = productsingleimgpath;
productSchema.statics.productmultiImgpath = productmultiimgpath;


const product = mongoose.model('productmodel',productSchema);
module.exports=product;