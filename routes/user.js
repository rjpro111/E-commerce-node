const express=require('express');
const routs=express.Router();
const categerymodel=require('../models/catogrymodel');
const subcategerymodel=require('../models/subcatogrymodel');


routs.get('/',async(req,res)=>{
    const categery= await categerymodel.find();
    const subcategery= await subcategerymodel.find();
    // console.log(categery); 
    return res.render('userpenal/homepage1',{
        categerydata:categery,
        subcatdata:subcategery
    })
})




module.exports=routs