const path = require('path');
const Admin = require('../models/admin');
const fs = require('fs');
const nodemailer = require('nodemailer');
// const catogrymodel = require('../models/catogrymodel');
// const subcatogrymodel = require('../models/subcatogrymodel');

module.exports.deshboard = async (req, res) => {
    // return res.render('dashboard');
    // if (req.cookies.adminName == undefined) {
    //     return res.redirect('/admin/')
    // }
    // else {
    //     var adminrec = req.cookies.adminName;
    // }
    return res.render("adminpages/deshboard");
}

module.exports.addadmin = async (req, res) => {
    return res.render('adminpages/addadmin')
}

module.exports.insertadmindata = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    try {
        req.body.name = req.body.fname + ' ' + req.body.lname;
        adminImagePath = '';
        if (req.file) {
            adminImagePath = Admin.adminImgpath + '/' + req.file.filename;
            if (adminImagePath) {
                req.body.adminImage = adminImagePath;
            }
            else {
                console.log("Path Not Found");
            }
        }
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Admin.create(req.body);
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.viewadmin = async (req, res) => {
    let search = "";

    if (req.query.search) {               //req.query.search atla mate mukva ma aave che ke $or[{}] ni andar ni line te query thi mogodb ma search kare//
        search = req.query.search;
    }

    if (req.query.page) {
        page = req.query.page;
    }
    else {
        page = 0;
    }
    var perpage = 2;

    var admindata = await Admin.find({
        $or: [
            { "name": { $regex: ".*" + search + ".*", $options: "i" } },
            { "email": { $regex: ".*" + search + ".*", $options: "i" } },
        ]
    })

        .limit(perpage)
        .skip(perpage * page);

    var totaladmindata = await Admin.find({
        $or: [
            { "name": { $regex: ".*" + search + ".*", $options: "i" } },
            { "email": { $regex: ".*" + search + ".*", $options: "i" } },
        ]
    }).countDocuments();

    return res.render('adminpages/viewadmin', {
        admindatas: admindata,
        searchinput: search,
        totaldocument: Math.ceil(totaladmindata / perpage),
        curentpage: page
    });
}

module.exports.deleteall = async (req, res) => {
    // console.log(req.body);
    await Admin.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back');
}

module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Admin.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Data Deactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Admin.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Data Deactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deletData = async (req, res) => {
    try {
        const olddata = await Admin.findById(req.params.id);
        if (olddata) {
            var oldimg = olddata.adminImage;
            if (oldimg) {
                const fullpath = path.join(__dirname, '..', olddata.adminImage);
                await fs.unlinkSync(fullpath);
                let deletData = await Admin.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("admin record & image delete succefully");
                    return res.redirect('back');
                }
                else {
                    console.log("admin record and image not delete");
                    return res.redirect('back');
                }
            }

        }
        else {
            let deletData = await Admin.findByIdAndDelete(req.params.id);
            if (deletData) {
                console.log("admin record delete succefully");
                return res.redirect('back');
            }
            else {
                console.log("admin record not delete");
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log("something wronge");
    }
}

module.exports.updateData = async (req, res) => {
    try {
        let admindata = await Admin.findById(req.params.id);
        let splitName = await admindata.name.split(' ');
        if (admindata) {
            return res.render('adminpages/editadmin', {
                alladmindata: admindata,
                splitName: splitName
            })
        }
    }
    catch {
        console.log("something wronge");
        // return redirect('back')
    }
}

module.exports.profile = async (req, res) => {
    var adminrec = req.user;
    // console.log(adminrec);
    if (adminrec) {
        return res.render("adminpages/profile", {
            adminData: adminrec
        });
    }
    else {
        console.log("profilr data not found");
    }
}


module.exports.updateprofile = async (req, res) => {
    const admindata = await Admin.findById(req.params.id);
    let splitName = await admindata.name.split(' ');
    if (admindata) {
        return res.render('adminpages/updateprofile', {
            admindata: admindata,
            splitName:splitName
        })
    }
  
}

module.exports.editadminData = async (req, res) => {
    // console.log(req.body.EditId);
    try {
        if (req.file) {
            let oldData = await Admin.findById(req.body.EditId);
            // console.log(oldData);
            if (oldData) {
                if (oldData.adminImage) {
                    let fullPath = path.join(__dirname, '..', oldData.adminImage);
                    await fs.unlinkSync(fullPath);
                }
                var adminImagePath = Admin.adminImgpath + '/' + req.file.filename;
                req.body.adminImage = adminImagePath;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    // return res.redirect('/admin/logout');
                    return res.redirect('/admin/viewadmin');
                }
                else {
                    console.log("Record Not Updated1");
                    return res.redirect('/admin/viewadmin');
                }
            }
            else {
                console.log("Record Not Updated2");
                return res.redirect('/admin/viewadmin');
            }
        }
        else {
            let oldData = await Admin.findById(req.body.EditId);
            if (oldData) {
                req.body.adminImage = oldData.adminImage;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record Update Succesfully");
                    // return res.redirect('/admin/logout');
                    return res.redirect('/admin/viewadmin');
                }
                else {
                    console.log("Record Not Updated3");
                    return res.redirect('/admin/viewadmin');
                }
            }
            else {
                console.log("Record Not Updated4");
                return res.redirect('/admin/viewadmin');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/viewadmin');
    }
}

module.exports.deleteall = async (req, res) => {
    await Admin.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back');
}

module.exports.checklogin = async (req, res) => {
    return res.redirect('/admin/deshboard');
}

module.exports.editprofile= async(req,res)=>{
    //  console.log(req.body.EditId);
    try {
        if (req.file) {
            let oldData = await Admin.findById(req.body.EditId);
            console.log(oldData);
            if (oldData) {
                if (oldData.adminImage) {
                    let fullPath = path.join(__dirname, '..', oldData.adminImage);
                    await fs.unlinkSync(fullPath);
                }
                var adminImagePath = Admin.adminImgpath + '/' + req.file.filename;
                req.body.adminImage = adminImagePath;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    // return res.redirect('/admin/logout');
                    return res.redirect('/admin/viewadmin');
                }
                else {
                    console.log("Record Not Updated1");
                    return res.redirect('/admin/viewadmin');
                }
            }
            else {
                console.log("Record Not Updated2");
                return res.redirect('/admin/viewadmin');
            }
        }
        else {
            let oldData = await Admin.findById(req.body.EditId);
            if (oldData) {
                req.body.adminImage = oldData.adminImage;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record Update Succesfully");
                    // return res.redirect('/admin/logout');
                    return res.redirect('/admin/viewadmin');
                }
                else {
                    console.log("Record Not Updated3");
                    return res.redirect('/admin/viewadmin');
                }
            }
            else {
                console.log("Record Not Updated4");
                return res.redirect('/admin/viewadmin');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/viewadmin');
    }
}

module.exports.sendemail= async(req,res)=>{
    // return res.render('forgatepassword/verifyOtp');
    console.log(req.body);
    let checkMailData = await Admin.findOne({email : req.body.email});
        console.log(checkMailData);
    try {
        let checkMailData = await Admin.findOne({email : req.body.email});
        console.log(checkMailData);
        if(checkMailData){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: "jagatiyarupesh8@gmail.com",
                  pass: "xbtvfhltuobgescj",
                },
              });
              var OTP = Math.floor(100000 + Math.random() * 900000);
              res.cookie('otp',OTP);
              res.cookie('email',checkMailData.email);
              const info = await transporter.sendMail({
                from: 'jagatiyarupesh8@gmail.com', // sender address
                to: checkMailData.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<h1>You're Otp is ${OTP}</h1>`, // html body
              });
              if(info){
                console.log('Otp Sent Succesfully');
                return res.render('forgatepassword/verifyOtp');
              }
              else{
                console.log("Email Is Not Valid");
                return res.redirect('back');
              }
        }
        else{
            console.log("Email Not Found");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.newpass= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.body.otp);
    if(req.body.otp == req.cookies.otp){
        return res.render('forgatepassword/newpass')
    }
    else{
        console.log("Otp Not Match");
        return res.redirect('back');
    }
}

module.exports.verifyPass = async(req,res)=>{
    if(req.body.npass == req.body.cpass){
        let email = req.cookies.email;
        let checkEmail = await Admin.findOne({email:email});
        if(checkEmail){
            let resetPassword = await Admin.findByIdAndUpdate(checkEmail.id,{password:req.body.npass});
            if(resetPassword){
                res.clearCookie('otp');
                res.clearCookie('email');
                return res.redirect('/admin/');
            }
            else{
                console.log("Password Not Changed");
                return res.redirect('back');
            }
        }
        else{
            console.log("Email Not Found");
            return res.redirect('back');
        }
    }
    else{
        console.log("Password Not Matched");
        return res.redirect('back');
    }
}