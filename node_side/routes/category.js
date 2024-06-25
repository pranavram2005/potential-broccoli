const express = require('express');
const router = express.Router();
const path = require('path')
let Category = require("../models/category");

router.route('/add_category').post(async(req,res)=>{

    const category = req.body.category;
    const Categ = {category}
    const existingCategory = await Category.findOne(Categ);
    if (existingCategory) {
    return res.status(400).send('Category already exists');
  }

    const NewCateg = new Category(Categ)
    NewCateg.save()
            .then(()=>res.json("Category Added"))
            .catch((err)=>res.status(400).json("Error:"+err)) 
})

router.route('/view_category').get(async(req,res)=>{
    try{
    const categories = await Category.find();
    res.status(201).json(categories)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.route('/delete_category/:id').delete(async(req,res)=>{
    try{
        const DeleteCategory = await Category.deleteOne({"_id": req.params.id});
        if (DeleteCategory.deletedCount === 0){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }catch (err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router