const express = require('express');
const routs = express.Router();
const Admin = require('../models/admin');
const admincontroller = require('../controller/Admin');
const passport = require('passport');
// const catogerycontroller = require('../controller/catogrycontroller');
// const subcatogerycontroller = require('../controller/subcatogrycontroller');

// routs.get('/',admincontroller.loginpage)//khali//

routs.get('/', async (req, res) => {
    if (req.cookies.adminname) {
        return res.redirect('adminpages/deshboard');  //admin na '/' uper request chale che  aa deshboard load karse//
    }
    return res.render('adminpages/loginpage')
})

routs.get('/deshboard', passport.chekAuth, admincontroller.deshboard);



//admin routing-start//
routs.get('/addadmin', passport.chekAuth, admincontroller.addadmin);
routs.get('/viewadmin', passport.chekAuth, admincontroller.viewadmin);
routs.post('/insertadmindata', passport.chekAuth, Admin.uploadImage, admincontroller.insertadmindata);

routs.get('/isactive/:id', admincontroller.isactive);
routs.get('/deactive/:id', admincontroller.deactive);

routs.get('/deletData/:id', admincontroller.deletData);
routs.get('/updateData/:id', admincontroller.updateData);
routs.post('/editadminData', Admin.uploadImage, admincontroller.editadminData);
routs.post('/deleteall', admincontroller.deleteall);
routs.get('/profile/:id', passport.chekAuth, admincontroller.profile);
routs.get('/updateprofile/:id', passport.chekAuth, admincontroller.updateprofile);
routs.get('/editprofile/:id', passport.chekAuth, admincontroller.updateprofile);
routs.post('/editprofile', Admin.uploadImage, admincontroller.editprofile);

routs.get('/logout', async (req, res) => {
    res.clearCookie('admin');
    return res.redirect('/admin/');
})

//admin routing-close//


routs.post('/checklogin',passport.authenticate("local",{failureRedirect:"/admin/"}),passport.chekAuth,admincontroller.checklogin)


//catogery start//
routs.use('/catogery', passport.chekAuth, require('./catogery'));
//catogery close//



//subcatogry-start//
routs.use('/subcatogry',passport.chekAuth, require('./subcatogry'));
//subcatogry-close//

//extracatogry-start//
routs.use('/Extracatogry',passport.chekAuth, require('./Extracatogry'));
//extracatogry-close//

//brand-start//
routs.use('/brand',passport.chekAuth, require('./brand'));
//brand-close//

// typr-start//
routs.use('/type',passport.chekAuth, require('./type'));
routs.use('/product',passport.chekAuth, require('./product'));
// typr-close//

//forgate password-start//
routs.post('/sendemail',admincontroller.sendemail);
routs.post('/newpass',admincontroller.newpass);
routs.post('/verifyPass',admincontroller.verifyPass);
//forgate password-end//


module.exports = routs;