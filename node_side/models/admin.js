const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String, unique: true }
})

module.exports = mongoose.model('CSAdmin', AdminSchema);