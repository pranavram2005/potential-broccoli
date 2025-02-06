const mongoose = require('mongoose')
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI
const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log('MongoDB connected');
    }catch (err){
        console.log(err.message)
    }

};
module.exports = connectDB;
