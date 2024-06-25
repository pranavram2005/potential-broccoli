const express = require('express');
const router = express.Router();
const path = require('path')
let SubCategory = require("../models/subcategory");

router.route('/add_subcategory').post(async(req,res)=>{
    const category = req.body.category
    const subcategory = req.body.subcategory;
    const SubCateg = {subcategory}
    const existingsubCategory = await SubCategory.findOne(SubCateg);
    if (existingsubCategory) {
    return res.status(400).send('SubCategory already exists');
  }
    const Subcategs = {category,subcategory}
    const NewSubCateg = new SubCategory(Subcategs)
    NewSubCateg.save()
            .then(()=>res.json("Sub Category Added"))
            .catch((err)=>res.status(400).json("Error:"+err)) 
})

router.route('/view_subcategory').get(async(req,res)=>{
    try{
    const subcategories = await SubCategory.find();
    res.status(201).json(subcategories)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.route('/delete_subcategory/:id').delete(async(req,res)=>{
    try{
        const DeleteSubCategory = await SubCategory.deleteOne({"_id": req.params.id});
        if (DeleteSubCategory.deletedCount === 0){
            return res.status(404).json({ error: 'Sub Category not found' });
        }
        res.status(200).json({ message: 'Sub Category successfully' });
    }catch (err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router