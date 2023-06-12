const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movie = new Schema({
    Title:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true
    },
    Language:{
        type:String,
        required:true
    },
    Duration:{
        type:String,
        required:true
    },
    Cast:{
        type:String,
        required:true
    },
    ReleaseDate:{
        type:String,
        required:true
    },
    Rating:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Bookings:[{
        type:mongoose.Types.ObjectId,
        ref:'Admin'
    }]

});

module.exports = mongoose.model('Movie',movie);