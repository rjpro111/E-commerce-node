const path = require('path');
const catogrymodel = require('../models/catogrymodel');


module.exports.addcatogry = async (req, res) => {
    return res.render('adminpages/addcatogry')
}

module.exports.insertcatogrydata = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await catogrymodel.create(req.body);
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("something wronge");
    }
}

module.exports.viewcategory = async (req, res) => {


    const catogerydata = await catogrymodel.find({})
    return res.render('adminpages/viewcategory', {
        catdata: catogerydata
    })
}

module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await catogrymodel.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await catogrymodel.findByIdAndUpdate(req.params.id, { isActive: true });
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
        let catogerydata = await catogrymodel.findById(req.params.id);
        if (catogerydata) {
            return res.render('adminpages/editcatogery', {
                allcatogerydata: catogerydata
            })
        }
    }
    catch {
        console.log("something wronge");
        return redirect('back')
    }
}

module.exports.editcatogrydata = async (req, res) => {
    try {
            let oldData = await catogrymodel.findById(req.body.EditId);
            // console.log(oldData);
            if (oldData) {
                let ad = await catogrymodel.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record Update Succesfully");
                    return res.redirect('/admin/catogery/viewcategory');
                }
                else {
                    console.log("Record Not Updated1");
                    return res.redirect('/admin/catogery/viewcategory');
                }
            }
            else {
                console.log("olddata not found");
                return res.redirect('/admin/catogery/viewcategory');
            }
       
    }
    catch (error) {
        console.log("something wronge");
        return res.redirect('/admin/catogery/viewcategory');
    }
}

