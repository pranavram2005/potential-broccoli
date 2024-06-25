const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path')
let Product = require('../models/models');

const dir = path.join(__dirname, 'files')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,dir)
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

let upload = multer({storage})

router.route('/add').post(upload.single('fileupload'),(req,res)=>{
    console.log(req.file)
    const title = req.body.title;
    const category = req.body.category;
    const sub_category = req.body.subcategory;
    const description = req.body.description;
    const file_upload = req.file.filename;
    const file_type = req.file.mimetype;
    const video = req.body.video;

    const Prod = {title,category,sub_category,description,file_upload,file_type,video}
    const newProd = new Product(Prod)

    newProd.save()
           .then(()=>res.json('Project Added'))
           .catch(err=>res.status(400).json('Error:'+err))
})
module.exports = router
