const mongoose = require('mongoose');
const path = require('path');

const subcatogrymodelSchema = mongoose.Schema({
     catogry:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'catogrymodel',
        required : true 
    },
    subcategory :{
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


const subcatogry = mongoose.model('subcatogrymodel',subcatogrymodelSchema);
module.exports=subcatogry;