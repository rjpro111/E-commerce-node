const express = require('express');
const routs = express.Router();

const subcatogerycontroller = require('../controller/subcatogrycontroller');

routs.get('/addSubcategory', subcatogerycontroller.addSubcategory)
routs.post('/insertsubcatogrydata', subcatogerycontroller.insertsubcatogrydata);
routs.get('/viewSubcategory', subcatogerycontroller.viewSubcategory)
routs.post('/getsubcat', subcatogerycontroller.getsubcat);
routs.post('/getextracat',subcatogerycontroller.getextracat)
routs.post('/getbrand',subcatogerycontroller.getbrand);
routs.post('/gettype',subcatogerycontroller.gettype);

routs.get('/isactive/:id',subcatogerycontroller.isactive);
routs.get('/deactive/:id',subcatogerycontroller.deactive);

routs.get('/updateData/:id', subcatogerycontroller.updateData);
routs.post('/editsubcatogrydata',subcatogerycontroller.editsubcatogrydata);

module.exports=routs