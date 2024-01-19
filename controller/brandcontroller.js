const catogrymodel = require('../models/catogrymodel');
const subcatogrymodel = require('../models/subcatogrymodel');
const extracatogrymodel = require('../models/extracatogerymodel');
const brandmodel = require('../models/brandmodel');

module.exports.addbrand = async (req, res) => {
    const categoryData = await catogrymodel.find({});
    const subcategoryData = await subcatogrymodel.find({});
    const extracategoryData = await extracatogrymodel.find({});
    return res.render('adminpages/addbrand', {
        cateData: categoryData,
        subcatData: subcategoryData,
        extracatData: extracategoryData
    });
}

module.exports.insertbranddata = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await brandmodel.create(req.body);
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("something wronge");
        return res.redirect('back');
    }
}


module.exports.viewbrand = async (req, res) => {
    const branddata = await brandmodel.find().populate(['catogry', 'subcategory', 'extracategory']).exec();
    return res.render('adminpages/viewbrand', {
        branddata: branddata
    })
}

module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await brandmodel.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await brandmodel.findByIdAndUpdate(req.params.id, { isActive: true });
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

module.exports.updateData = async (req, res) => {
    try {
        if (req.params.id) {
            let brands = await brandmodel.findById(req.params.id).populate(['catogry', 'subcategory', 'extracategory', 'brand']).exec();
            if (brands) {
                return res.render('adminpages/updatesbrand', {
                    bdata: brands
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

module.exports.editbranddata = async (req, res) => {
    try {
        let oldData = await brandmodel.findById(req.body.EditId);
        if (oldData) {
           // console.log(req.body);
            req.body.updateDate = new Date().toLocaleString();
            let ad = await brandmodel.findByIdAndUpdate(req.body.EditId, req.body);

            if (ad) {
                console.log("Record Update Succesfully");
                return res.redirect('/admin/brand/viewbrand');
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/brand/viewbrand');
            }
       
    }
}
catch (error) {
    console.log(error);
    return res.redirect('/admin/brand/viewbrand');
}
}