const mongoose = require('mongoose');
const crypto = require('crypto')
const Schema = mongoose.Schema;

const Admin = new Schema({
    uuid: { type:String,required:false},
    Name : {
        type:String,
       // required:true,
         },
    Email:{
        type:String,
       // required:true
    },
    Password:{
        type:String,
       // required:true
    },

    Mobileno:{
        type:String,
        //required:true
    },
    Role:{
        type:String,
        enum:['user','admin'],
        required:false,
        default:'user'
    },
    movies:{
        type:mongoose.Types.ObjectId,
        ref:'Movie'
    }
});

Admin.pre("save",function(next){
    this.uuid = "ADM-" + crypto.pseudoRandomBytes(4).toString('hex').toLocaleUpperCase();
    next();
});

module.exports = mongoose.model('Admin',Admin);