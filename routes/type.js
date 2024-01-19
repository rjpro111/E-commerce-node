const express = require('express');
const routs = express.Router();

const typecontroller=require('../controller/typecontroller')


routs.get('/addtype',typecontroller.addtype);
routs.post('/inserttypedata',typecontroller.inserttypedata);
routs.get('/viewtype',typecontroller.viewtype);

routs.get('/isactive/:id', typecontroller.isactive);
routs.get('/deactive/:id', typecontroller.deactive);

routs.get('/typeupdateData/:id',typecontroller.typeupdateData);
routs.post('/edittypedata',typecontroller.edittypedata);

module.exports=routs