const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    category: String,
    sub_category: String,
    description: String,
    file_upload: String,
    file_type: String,
    video: String,
})

module.exports = mongoose.model('Product', ProductSchema);