const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnquiryDetails = new Schema({
    title: String,
    name: String,
    phone: String,
    email: String,
    occupation: String,
    city: String,
},{timestamps: true})

module.exports = mongoose.model('Enquiries', EnquiryDetails);