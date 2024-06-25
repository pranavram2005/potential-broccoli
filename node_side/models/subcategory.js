const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    category: String,
    subcategory: { type: String, unique: true }
})

module.exports = mongoose.model('SubCategory', SubCategorySchema);