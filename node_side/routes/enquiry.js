const express = require("express");
const router = express.Router();
const EnquiryModel = require('../models/enquiry');

router.route('/add').post(async(req,res)=>{
    const title = req.body.title;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const occupation = req.body.occupation;
    const city = req.body.city;

    const Enq = {title,name,phone,email,occupation,city}
    const NewEnq = new EnquiryModel(Enq)
    NewEnq.save()
           .then(()=>res.json('Enquiry Added'))
           .catch(err=>res.status(400).json('Error:'+err))
})

router.route('/view').get(async(req,res)=>{
    EnquiryModel.find()
           .then(enq=>res.json(enq))
           .catch(err=>res.status(400).json('Error:'+err)); 
})
router.route('/delete/:id').delete(async(req,res)=>{
    try{
        const DeleteEnquiry = await EnquiryModel.deleteOne({"_id":req.params.id});
        if (DeleteEnquiry.deletedCount===0){
            return res.status(404).json({ error: 'Enquiry not found' });
        }
        res.status(200).json({ message: 'Enquiry deleted successfully' });
    }catch (err){
        res.status(500).json({error:err.message})
    }
})
module.exports = router
