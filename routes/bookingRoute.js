const bookingRoute = require('../models/movieBookingModel');
const bookRoute = require('express').Router();
const { validateBooking } = require('../validatator/validateSchema');

bookRoute.post('/addBooking',async(req,res)=>{
try{    
    const data = await validateBooking.validateAsync(req.body);
    const newbooking = new bookingRoute(data);
    console.log(newbooking);
    const result = await newbooking.save();
    console.log(result);
    if(result){
        res.status(200).json({status:true,message:'success',result:result});

    }else{
        res.json({status:false,message:'failed'});
    }
}catch(err){
    console.log(err);
}
});

module.exports = bookRoute;
