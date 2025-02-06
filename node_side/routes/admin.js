const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
let Admin = require("../models/admin");


router.route('/add_admin').post(async(req,res)=>{

    const {username,password} = req.body;
    const admin = {username,password}
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingAdmin = await Admin.findOne({username,hashedPassword});
    if (existingAdmin) {
    return res.status(400).send('Admin already exists');
  }

    const NewAdmin = new Admin({username,password: hashedPassword})
    NewAdmin.save()
            .then(()=>res.json("Admin Added"))
            .catch((err)=>res.status(400).json("Error:"+err)) 
})



router.route('/view_admin').get(async(req,res)=>{
    try{
    const admins = await Admin.find();
    res.status(201).json(admins)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.route('/delete_admin/:id').delete(async(req,res)=>{
    try{
        const DeleteAdmin = await Admin.deleteOne({"_id": req.params.id});
        if (DeleteAdmin.deletedCount === 0){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }catch (err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router