const mongoose = require('mongoose');
const path = require('path');

const catogrymodelSchema = mongoose.Schema({
    category :{
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


const catogry = mongoose.model('catogrymodel',catogrymodelSchema);
module.exports=catogry;