const path = require('path');
const Admin = require('../models/admin');
const catogrymodel = require('../models/catogrymodel');
const subcatogrymodel = require('../models/subcatogrymodel');
const extracatmodel = require('../models/extracatogerymodel');
const brandmodel = require('../models/brandmodel');
const typemodel = require('../models/typemodel');




module.exports.isactive = async (req, res) => {
    console.log(req.params.id);
    try {
        if (req.params.id) {
            let active = await subcatogrymodel.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await subcatogrymodel.findByIdAndUpdate(req.params.id, { isActive: true });
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



module.exports.addSubcategory = async (req, res) => {
    let categoryData = await catogrymodel.find({});
    return res.render('adminpages/addSubcategory', {   //page subcategery nu load karvanu che pan data categery no sathe lai javanu che//
        cate: categoryData
    })
}

module.exports.viewSubcategory = async (req, res) => {
    const subcatogrydata = await subcatogrymodel.find().populate('catogry').exec();
    return res.render('adminpages/viewSubcategory', {
        subcatdata: subcatogrydata
    })
}


module.exports.insertsubcatogrydata = async (req, res) => {
    try {
        if (req.body) {
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await subcatogrymodel.create(req.body);
            return res.redirect('adminpages/viewSubcate');
        }
    }
    catch (err) {
        console.log("something wronge");
        return res.redirect('back');
    }
}


module.exports.getsubcat = async (req, res) => {
    let subcatdata = await subcatogrymodel.find({ catogry: req.body.catid });
    var optiondata = `<option value="">Select</option>`
    subcatdata.map((v, i) => {
        optiondata += `<option value="${v.id}">${v.subcategory}</option>`
    });
    return res.json(optiondata)
}


module.exports.getextracat = async (req, res) => {
    let extracatodata = await extracatmodel.find({ subcategory: req.body.subcatid });
    var optiondata1 = `<option value="">Select</option>`
    extracatodata.map((v, i) => {
        optiondata1 += `<option value="${v.id}">${v.extracategory}</option>`
    });
    return res.json(optiondata1)
}


module.exports.getbrand = async (req, res) => {
    console.log(req.body);
    let branddata = await brandmodel.find({ extracategory: req.body.extracatid });
    var optiondata2 = `<option value="">Select</option>`
    branddata.map((v, i) => {
        optiondata2 += `<option value="${v.id}">${v.brand}</option>`
    });
    return res.json(optiondata2)
}

module.exports.gettype = async (req, res) => {
    console.log(req.body);
    let typedata = await typemodel.find({ brand: req.body.brandid });
    var optiondata3 = `<option value="">Select</option>`
    typedata.map((v, i) => {
        optiondata3 += `<option value="${v.id}">${v.type}</option>`
    });
    return res.json(optiondata3)
}

module.exports.updateData= async(req,res)=>{
    try {
        if (req.params.id) {
            
            let subcatdata = await subcatogrymodel.findById(req.params.id).populate(['catogry','subcategory']).exec();
            if(subcatdata) {
               
                return res.render('adminpages/updatesubcatogery',{
                    subdata:subcatdata
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


module.exports.editsubcatogrydata = async(req,res)=>{
    try {
            let oldData = await subcatogrymodel.findById(req.body.EditId);
            if (oldData) {
               // console.log(req.body);
                req.body.updateDate = new Date().toLocaleString();
                let ad = await subcatogrymodel.findByIdAndUpdate(req.body.EditId, req.body);

                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/subcatogry/viewSubcategory');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/subcatogry/viewSubcategory');
                }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/subcatogry/viewSubcategory');
    }
}



















// const path = require('path');
// const Admin = require('../models/admin');
// const catogrymodel = require('../models/catogrymodel');
// const subcatogrymodel = require('../models/subcatogrymodel');
// const extracatmodel = require('../models/extracatogerymodel');
// const brandmodel = require('../models/brandmodel');
// const typemodel = require('../models/typemodel');




// module.exports.isactive = async (req, res) => {
//     console.log(req.params.id);
//     try {
//         if (req.params.id) {
//             let active = await subcatogrymodel.findByIdAndUpdate(req.params.id, { isActive: false });
//             if (active) {
//                 console.log("Data Deactive Successfully");
//                 return res.redirect('back');
//             }
//             else {
//                 console.log("Record Not Deactive");
//                 return res.redirect('back');
//             }
//         }
//         else {
//             console.log("Params Id not Found");
//             return res.redirect('back');
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return res.redirect('back');
//     }
// }

// module.exports.deactive = async (req, res) => {
//     try {
//         if (req.params.id) {
//             let active = await subcatogrymodel.findByIdAndUpdate(req.params.id, { isActive: true });
//             if (active) {
//                 console.log("Data Deactive Successfully");
//                 return res.redirect('back');
//             }
//             else {
//                 console.log("Record Not Deactive");
//                 return res.redirect('back');
//             }
//         }
//         else {
//             console.log("Params Id not Found");
//             return res.redirect('back');
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return res.redirect('back');
//     }
// }



// module.exports.addSubcategory = async (req, res) => {
//     let categoryData = await catogrymodel.find({});
//     return res.render('adminpages/addSubcategory', {   //page subcategery nu load karvanu che pan data categery no sathe lai javanu che//
//         cate: categoryData
//     })
// }

// module.exports.viewSubcategory = async (req, res) => {
//     const subcatogrydata = await subcatogrymodel.find().populate('catogry').exec();
//     return res.render('adminpages/viewSubcategory', {
//         subcatdata: subcatogrydata
//     })
// }


// module.exports.insertsubcatogrydata = async (req, res) => {
//     try {
//         if (req.body) {
//             req.body.isActive = true;
//             req.body.currentDate = new Date().toLocaleString();
//             req.body.updateDate = new Date().toLocaleString();
//             await subcatogrymodel.create(req.body);
//             return res.redirect('adminpages/viewSubcate');
//         }
//     }
//     catch (err) {
//         console.log("something wronge");
//         return res.redirect('back');
//     }
// }


// module.exports.getsubcat = async (req, res) => {
//     let subcatdata = await subcatogrymodel.find({ catogry: req.body.catid });
//     var optiondata = `<option value="">Select</option>`
//     subcatdata.map((v, i) => {
//         optiondata += `<option value="${v.id}">${v.subcategory}</option>`
//     });
//     return res.json(optiondata)
// }


// module.exports.getextracat = async (req, res) => {
//     let extracatodata = await extracatmodel.find({ subcategory: req.body.subcatid });
//     var optiondata1 = `<option value="">Select</option>`
//     extracatodata.map((v, i) => {
//         optiondata1 += `<option value="${v.id}">${v.extracategory}</option>`
//     });
//     return res.json(optiondata1)
// }


// module.exports.getbrand = async (req, res) => {
//     console.log(req.body);
//     let branddata = await brandmodel.find({ extracategory: req.body.extracatid });
//     var optiondata2 = `<option value="">Select</option>`
//     branddata.map((v, i) => {
//         optiondata2 += `<option value="${v.id}">${v.brand}</option>`
//     });
//     return res.json(optiondata2)
// }

// module.exports.gettype = async (req, res) => {
//     console.log(req.body);
//     let typedata = await typemodel.find({ brand: req.body.brandid });
//     var optiondata3 = `<option value="">Select</option>`
//     typedata.map((v, i) => {
//         optiondata3 += `<option value="${v.id}">${v.type}</option>`
//     });
//     return res.json(optiondata3)
// }

// module.exports.updateData= async(req,res)=>{
//     try {
//         if (req.params.id) {
            
//             let subcatdata = await subcatogrymodel.findById(req.params.id).populate(['catogry','subcategory']).exec();
//             if(subcatdata) {
               
//                 return res.render('adminpages/updatesubcatogery',{
//                     subdata:subcatdata
//                 });
//             }
//             else {
//                 console.log("Record Not Found");
//                 return res.redirect('back');
//             }
//         }
//         else {
//             console.log("Params Id not Found");
//             return res.redirect('back');
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return res.redirect('back');
//     }
// }


// module.exports.editsubcatogrydata = async(req,res)=>{
//     try {
//             let oldData = await subcatogrymodel.findById(req.body.EditId);
//             if (oldData) {
//                // console.log(req.body);
//                 req.body.updateDate = new Date().toLocaleString();
//                 let ad = await subcatogrymodel.findByIdAndUpdate(req.body.EditId, req.body);

//                 if (ad) {
//                     console.log("Record & Image Update Succesfully");
//                     return res.redirect('/admin/subcatogry/viewSubcategory');
//                 }
//                 else {
//                     console.log("Record Not Updated");
//                     return res.redirect('/admin/subcatogry/viewSubcategory');
//                 }
//         }
//     }
//     catch (error) {
//         console.log(error);
//         return res.redirect('/admin/subcatogry/viewSubcategory');
//     }
// }
