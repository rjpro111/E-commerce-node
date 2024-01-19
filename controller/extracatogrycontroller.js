const path = require('path');
const catogrymodel = require('../models/catogrymodel');
const subcatogrymodel = require('../models/subcatogrymodel');
const extracatogrymodel = require('../models/extracatogerymodel');


module.exports.addExtracategory= async(req,res)=>{
    const categoryData = await catogrymodel.find({});        //extracatogery page load //
    const subcategoryData = await subcatogrymodel.find({});
    return res.render('adminpages/addextracatogery',{
        categoryData:categoryData,
        subcategoryData:subcategoryData
    })
}

module.exports.viewExtracategory=async(req,res)=>{
    const extracatogrydata = await extracatogrymodel.find().populate(['catogry','subcategory']).exec();
    return res.render('adminpages/viewExtracategory',{
        extracatogrydata:extracatogrydata
    })
}

module.exports.insertextrasubcatogrydata= async (req,res)=>{
    console.log(req.body);
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await extracatogrymodel.create(req.body);
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("something wronge");
        return res.redirect('back');
    }
}

module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await extracatogrymodel.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await extracatogrymodel.findByIdAndUpdate(req.params.id, { isActive: true });
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

module.exports.extraupdateData= async(req,res)=>{
    try {
        if (req.params.id) {
            
            let extracatdata = await extracatogrymodel.findById(req.params.id).populate(['catogry','subcategory','extracategory']).exec();
            if(extracatdata) {
               
                return res.render('adminpages/updateextracatogery',{
                    extradata:extracatdata
                });
            }
            else {
                console.log("Record Not Found");
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

module.exports.editextracatData= async(req,res)=>{
    try {
        let oldData = await extracatogrymodel.findById(req.body.EditId);
        if (oldData) {
           // console.log(req.body);
            req.body.updateDate = new Date().toLocaleString();
            let ad = await extracatogrymodel.findByIdAndUpdate(req.body.EditId, req.body);

            if (ad) {
                console.log("Record Update Succesfully");
                return res.redirect('/admin/Extracatogry/viewExtracategory');
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/Extracatogry/viewExtracategory');
            }
       
    }
}
catch (error) {
    console.log(error);
    return res.redirect('/admin/Extracatogry/viewExtracategory');
}
}