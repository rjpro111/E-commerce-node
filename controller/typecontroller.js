const typemodel = require('../models/typemodel');
const catogrymodel = require('../models/catogrymodel');
const subcatogrymodel = require('../models/subcatogrymodel');
const extracatogrymodel = require('../models/extracatogerymodel');
const brandmodel = require('../models/brandmodel');



module.exports.addtype = async (req, res) => {
    const categoryData = await catogrymodel.find({});
    const subcategoryData = await subcatogrymodel.find({});
    const extracategoryData = await extracatogrymodel.find({});
    const brandData = await brandmodel.find({});
    return res.render('adminpages/addtype', {
        categoryData: categoryData,
        subcategoryData: subcategoryData,
        extracategoryData: extracategoryData,
        brandData: brandData
    })
}

module.exports.inserttypedata = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await typemodel.create(req.body);
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("something wronge");
        return res.redirect('back');
    }
}
module.exports.viewtype = async (req, res) => {

    const typedata = await typemodel.find().populate(['catogry', 'subcategory', 'extracategory', 'brand']).exec();
    return res.render('adminpages/typeview', {
        typedata: typedata
    })
}

module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await typemodel.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await typemodel.findByIdAndUpdate(req.params.id, { isActive: true });
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

module.exports.typeupdateData = async (req, res) => {
    try {
        if (req.params.id) {

            let types = await typemodel.findById(req.params.id).populate(['catogry', 'subcategory', 'extracategory', 'brand', 'type']).exec();
            if (types) {

                return res.render('adminpages/updatetype', {
                    tdata: types
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

module.exports.edittypedata = async (req, res) => {
    try {

        let oldData = await typemodel.findById(req.body.EditId);
        if (oldData) {
           // console.log(req.body);
            req.body.updateDate = new Date().toLocaleString();
            let ad = await typemodel.findByIdAndUpdate(req.body.EditId, req.body);

            if (ad) {
                console.log("Record & Image Update Succesfully");
                return res.redirect('/admin/type/viewtype');
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/type/viewtype');
            }
       
    }
}
catch (error) {
    console.log(error);
    return res.redirect('/admin/type/viewtype');
}
}