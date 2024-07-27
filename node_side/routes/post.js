const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path')
const fs = require('fs');
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
    const rank = req.body.rank;

    const Prod = {title,category,sub_category,description,file_upload,file_type,video,rank}
    const newProd = new Product(Prod)

    newProd.save()
           .then(()=>res.json('Project Added'))
           .catch(err=>res.status(400).json('Error:'+err))
})

router.route('/delete/id/:id').delete(async(req,res)=>{
    const itemToDelete = await Product.findById(req.params.id)
    try{
        const DeleteProduct = await Product.deleteOne({"_id":req.params.id});
        if (DeleteProduct.deletedCount===0){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }catch (err){
        res.status(500).json({error:err.message})
    }
    await Product.updateMany(
        { rank: { $gt: itemToDelete.rank } },
        { $inc: { rank: -1 } }
      );
});


router.route('/delete/file/:filename').delete(async(req,res)=> {

    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'files', filename);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to delete file');
      }
      res.send('File deleted successfully');
    });
  });

router.route('/update/rank/:id').put(async(req,res)=>{
    const id = req.params.id;
    const { newRank } = req.body;
    try {
        const productToUpdate = await Product.findById(id);
        if (!productToUpdate) {
          return res.status(404).send('Product not found');
        }
        const oldRank = productToUpdate.rank;
        
        if (newRank < oldRank) {
            await Product.updateMany(
              { rank: { $gte: newRank, $lt: oldRank } },
              { $inc: { rank: 1 } }
            );
          } else if (newRank > oldRank) {
            await Product.updateMany(
              { rank: { $gt: oldRank, $lte: newRank } },
              { $inc: { rank: -1 } }
            );
          }
          productToUpdate.rank = newRank;
          await productToUpdate.save();
  
    
        const products = await Product.find().sort('rank');
        res.json(products);
      } catch (error) {
        console.error('Error updating rank:', error);
        res.status(500).send('Internal Server Error');
      }
    });

module.exports = router
