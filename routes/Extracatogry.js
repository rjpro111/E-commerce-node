const express = require('express');
const routs = express.Router();
const extracatogrycontroller = require('../controller/extracatogrycontroller');

routs.get('/addExtracategory', extracatogrycontroller.addExtracategory);
routs.get('/viewExtracategory', extracatogrycontroller.viewExtracategory);
// routs.post('/insertcatogrydata', catogerycontroller.insertcatogrydata);

routs.get('/isactive/:id', extracatogrycontroller.isactive);
routs.get('/deactive/:id', extracatogrycontroller.deactive);
routs.get('/extraupdateData/:id', extracatogrycontroller.extraupdateData);

routs.post('/insertextrasubcatogrydata', extracatogrycontroller.insertextrasubcatogrydata);

routs.post('/editextracatData', extracatogrycontroller.editextracatData);
module.exports=routs