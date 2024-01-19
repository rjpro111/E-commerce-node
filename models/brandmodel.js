const mongoose = require('mongoose');
const path = require('path');

const brandmodelSchema = mongoose.Schema({
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


const brand = mongoose.model('brandmodel',brandmodelSchema);
module.exports=brand;