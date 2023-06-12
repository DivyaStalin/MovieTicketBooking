const joi = require('joi');

const adminValidateSchema = joi.object({
    Name : joi.string().min(3).required(),
    Email:joi.string().email().required(),
    Password:joi.string().min(6).max(10).required(),
    Mobileno:joi.string().length(10).pattern(/^[0-9]+$/).required(),
});

const validateAddMovie = joi.object({
    Title : joi.string().required(),
    Description : joi.string().min(10).max(50).required(),
    Language : joi.string().required(),
    Duration:joi.string().required(),
    Cast:joi.string().required(),
    ReleaseDate:joi.string().required(),
    Rating:joi.string().required()
});

const validateBooking = joi.object({
    movie : joi.string().required(),
    date : joi.date().required(),
    seatNumber : joi.number().min(1).max(40).required(),
    user:joi.string().required()
});

module.exports = 
    { adminValidateSchema , validateAddMovie , validateBooking };
