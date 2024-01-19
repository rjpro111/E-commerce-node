const express = require('express');
const routs = express.Router();
const catogerycontroller = require('../controller/catogrycontroller');

routs.get('/addcatogry', catogerycontroller.addcatogry);
routs.get('/viewcategory', catogerycontroller.viewcategory);
routs.post('/insertcatogrydata', catogerycontroller.insertcatogrydata);

routs.get('/isactive/:id', catogerycontroller.isactive);
routs.get('/deactive/:id', catogerycontroller.deactive);

routs.get('/updateData/:id', catogerycontroller.updateData);
routs.post('/editcatogrydata',catogerycontroller.editcatogrydata);


module.exports=routs