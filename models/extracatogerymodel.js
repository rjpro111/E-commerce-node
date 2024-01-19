const mongoose = require('mongoose');
const path = require('path');

const extracatogrymodelSchema = mongoose.Schema({
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


const extracatogry = mongoose.model('extracatogerymodel',extracatogrymodelSchema);
module.exports=extracatogry;