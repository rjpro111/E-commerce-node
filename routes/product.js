
const express=require('express');
const routs=express.Router();
const productcontroller=require('../controller/productcontroller');
const productmodel= require('../models/productmodel')

routs.get('/addproduct',productcontroller.addproduct);
routs.get('/isactive/:id', productcontroller.isactive);
routs.get('/deactive/:id', productcontroller.deactive);

routs.post('/insertproductdata',productmodel.uploadimage,productcontroller.insertproductdata)
routs.get('/viewproduct',productcontroller.viewproduct);
routs.post("/deleteimg", productcontroller.deleteimg);
routs.get('/productupdateData/:id',productcontroller.productupdateData);
routs.post('/editproductdata',productmodel.uploadimage,productcontroller.editproductdata)

module.exports= routs;