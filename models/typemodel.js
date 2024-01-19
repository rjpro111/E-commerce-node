const mongoose = require('mongoose');
const path = require('path');

const typeSchema = mongoose.Schema({
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


const type = mongoose.model('typemodel',typeSchema);
module.exports=type;