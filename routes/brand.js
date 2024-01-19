const express = require('express');
const routs = express.Router();

const brandcontroller= require('../controller/brandcontroller');

routs.get('/addbrand',brandcontroller.addbrand);
routs.post('/insertbranddata',brandcontroller.insertbranddata);
routs.get('/viewbrand',brandcontroller.viewbrand);

routs.get('/isactive/:id',brandcontroller.isactive);
routs.get('/deactive/:id',brandcontroller.deactive);
routs.get('/updateData/:id',brandcontroller.updateData);

routs.post('/editbranddata',brandcontroller.editbranddata);
module.exports= routs;
