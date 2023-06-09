const Admin = require('../models/adminModel');
const Movie = require('../models/movieSchema')
const route = require('express').Router();
const path = require('path');
const upload = require('../middleware/upload');
 


route.post('/addAdmin',async(req,res)=>{
    try{
        let {Name,Email,Mobileno,Password,Role} = req.body;
        const admin = new Admin({Name,Email,Mobileno,Role,Password});
        const result = await admin.save();
        if(result){
            res.status(200).json({status:true,message:'success',result:result})

        }else{
            res.json({status:false,message:'failed'});
        }

    }catch(err){
        res.status(400).json({message:err.message});
        console.log(err);
    }
});

route.post('/addMovie',upload.single('Image'),async(req,res)=>{
    try{
       let {Title,Description,Language,Duration,Rating,Cast,ReleaseDate} = req.body;
       const movie = new Movie({Title,Description,Language,Rating,Duration,Cast,ReleaseDate});
       if(req.file){
        movie.Image=req.file.filename;
     }

       const result = await movie.save();
       console.log(result);
       if(result){
        res.status(200).json({status:true,message:'success'})
        
    }else{
        res.json({status:false,message:'failed'});
    }

    }catch(err){
        res.status(400).json({message:err.message});
        console.log(err);
    }
});

route.get('/logIn',async(req,res)=>{
    try{
         const result = await Movie.find({Email:req.body.Email}).exec();
         if(result)
         {
            const Password = await Movie.find({Password:req.body.Password}).exec();
            if(Password){
                res.render('addMovie')
            }else{
                res.send({Error:'Enter correct Password'});
            }

         }else{
            res.send({message:'Enter valid Email'})
         }
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

module.exports = route;