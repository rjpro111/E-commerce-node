const productmodel = require('../models/productmodel');
const typemodel = require('../models/typemodel');
const catogrymodel = require('../models/catogrymodel');
const subcatogrymodel = require('../models/subcatogrymodel');
const extracatogrymodel = require('../models/extracatogerymodel');
const brandmodel = require('../models/brandmodel');
const path = require('path');
const fs = require('fs');



module.exports.addproduct = async (req, res) => {
    const categoryData = await catogrymodel.find({});
    const subcategoryData = await subcatogrymodel.find({});
    const extracategoryData = await extracatogrymodel.find({});
    const brandData = await brandmodel.find({});
    const typeData = await typemodel.find({});
    // console.log(typeData);
    return res.render('adminpages/addproduct', {
        categoryData: categoryData,
        subcategoryData: subcategoryData,
        extracategoryData: extracategoryData,
        brandData: brandData,
        typeData: typeData
    })
}

module.exports.insertproductdata = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    // console.log(req.files);

    try {
        let singleimag = '';
        let multipleimg = [];
        if (req.files) {
            singleimag = await productmodel.productsingleImgpath + '/' + req.files.productimg[0].filename;
        }
        for (var i = 0; i < req.files.multipleproductimage.length; i++) {
            multipleimg.push(productmodel.productmultiImgpath + "/" + req.files.multipleproductimage[i].filename);
        }
        req.body.productimg = singleimag;
        req.body.multipleproductimage = multipleimg;
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        let productdata = await productmodel.create(req.body);
        if (productdata) {
            console.log("product add..");
            return res.redirect('back');
        }
        else {
            console.log("product can't add..");
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log("product is not defind..!");
        return res.redirect('back')
    }
}

module.exports.viewproduct = async (req, res) => {
    const productdata = await productmodel.find().populate(['catogry', 'subcategory', 'extracategory', 'brand', 'type']).exec();
    return res.render('adminpages/viewproduct', {
        productdata: productdata
    });
}
module.exports.deleteimg = async (req, res) => {
    try {
        // console.log(req.body.img);
        var productsdata = await productmodel.findById(req.body.id);

        var de = productsdata.multipleproductimage.splice(req.body.i, 1);
        //console.log(de);

        var fullPath = path.join(__dirname, '..', req.body.img);
        //console.log(fullPath);
        //console.log(productsdata);
        await fs.unlinkSync(fullPath);
        var datas = await productmodel.findByIdAndUpdate(req.body.id, productsdata)
        // console.log(datas);
        if (datas) {
            console.log("Data Updated Successfully");
            return res.redirect('/admin/product/viewproduct');
        }
        else {
            console.log("Record Not Updated Successfully");
            return res.redirect('/admin/product/viewproduct');
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await productmodel.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await productmodel.findByIdAndUpdate(req.params.id, { isActive: true });
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

module.exports.productupdateData = async (req, res) => {
    
    try {
        let productRecord = await productmodel.findById(req.params.id).populate(['catogry', 'subcategory', 'extracategory', 'brand', 'type']).exec();;
        // console.log(productRecord);
        let catogrydata = await catogrymodel.find({});
        let subcatogrydata = await subcatogrymodel.find({});
        let extracatogrydata = await extracatogrymodel.find({});
        let branddata = await brandmodel.find({});
        let typedata = await typemodel.find({});
        if (productRecord) {
            return res.render('adminpages/productupdate', {
                productRecord: productRecord,
                cate: catogrydata,
                subcate: subcatogrydata,
                extracate: extracatogrydata,
                brand: branddata,
                typeData: typedata
            })
        }
        else {
            console.log('Record Not Found');
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.editproductdata= async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    // console.log(req.files);
        try {
        if (req.file) {
            let oldData = await productmodel.findById(req.body.EditId);
            if (oldData) {
                if (oldData.productimg) {
                    let fullPath = path.join(__dirname,'..',oldData.productimg);
                   await fs.unlinkSync(fullPath);
                }
                if(req.files){
                    let multipleimg = [];
                    let oldpro = await productmodel.findById(req.body.EditId);
                    
                   // console.log(oldpro.multipleproductimage[0]);
                     for(var j=0;j<oldpro.multipleproductimage.length;j++){
                         multipleimg.push(oldpro.multipleproductimage[j]); 
                     }
                    for(var i=0;i<req.files.multipleproductimage.length;i++){
                        multipleimg.push(productmodel.productmultiImgpath+"/"+req.files.multipleproductimage[i].filename); 
                    }
                    req.body.multipleproductimage = multipleimg;
                }
                var productImagePath = productmodel.productsingleImgpath+'/'+req.files.productimg[0].filename;
                req.body.ProductImage = productImagePath;
               
                req.body.updateDate = new Date().toLocaleString();
                let ad = await productmodel.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/viewproduct');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/viewproduct');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/viewproduct');
            }
        }
        else {
            let oldData = await productmodel.findById(req.body.EditId);
            if (oldData) {
                if(req.files){
                    let multipleimg = [];
                    let oldpro = await productmodel.findById(req.body.EditId);
                    
                   // console.log(oldpro.multipleproductimage[0]);
                     for(var j=0;j<oldpro.multipleproductimage.length;j++){
                         multipleimg.push(oldpro.multipleproductimage[j]); 
                     }
                    for(var i=0;i<req.files.multipleproductimage.length;i++){
                        multipleimg.push(productmodel.productmultiImgpath+"/"+req.files.multipleproductimage[i].filename); 
                    }
                    req.body.multipleproductimage = multipleimg;
                }
                req.body.productimg = oldData.productimg;
                
                req.body.updateDate = new Date().toLocaleString();
                let ad = await productmodel.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/viewproduct');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/viewproduct');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/viewproduct');
            }
        }   
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/product/viewproduct');
    }
}