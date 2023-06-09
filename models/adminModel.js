const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    Name : {
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Mobileno:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        enum:['user','admin'],
        required:false,
        default:'user'
    }
});

module.exports = mongoose.model('Admin',Admin);