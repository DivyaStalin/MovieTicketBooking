const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieBooking = new Schema({
    movie:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    seatNumber:{
        type:Number,
        required:true
    },
    user:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Booking',movieBooking);