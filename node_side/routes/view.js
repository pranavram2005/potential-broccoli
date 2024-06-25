const express = require('express');
const router = express.Router();
let Product = require('../models/models');
const path = require('path')


const dir = path.join(__dirname, 'files')

router.use('/files', express.static(dir));

router.route('/view_product').get((req,res)=>{
    Product.find()
           .then(pdt=>res.json(pdt))
           .catch(err=>res.status(400).json('Error:'+err)); 
})

module.exports = router

