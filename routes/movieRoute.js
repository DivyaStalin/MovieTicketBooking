const { default: mongoose } = require('mongoose');
const Movie = require('../models/movieModel')
const router = require('express').Router();
const path = require('path');
const upload = require('../middleware/upload');

const {validateAddMovie} = require('../validatator/validateSchema')


router.post('/addMovie',upload.single('Image'),async(req,res)=>{
    try{
       /*let {Title,Description,Language,Duration,Rating,Cast,ReleaseDate,Image} = req.body;
       if(Title.match(/^[a-z]+$/)){
          if(Description.length > 10 && Description.length < 50 )
          if(Language == 'Tamil' || Language == 'Hindi' || Language == 'English')
              if(Duration.trim())
                if(Rating.trim())
                  if(Cast.trim())
                   if(ReleaseDate.trim()){
                      const movie = new Movie({Title,Description,Language,Duration,Rating,Cast,ReleaseDate,Image});
                      const result = await movie.save();
                      res.status(200).json({message:'success',result:result})
              }else
              res.status(400).json({message:'need ReleaseDate'});
              else
              res.status(400).json({message:'need Cast'});
              else
              res.status(400).json({message:'need Rating'});
            else
                res.status(400).json({message:'need Duration'});
          else
            res.status(400).json({message:'need Language'});

         else
           res.status(400).json({message:'need Description'});
            }else
            res.status(400).json({message:'need Title'})*/
       const data =  await validateAddMovie.validateAsync(req.body);
       const movie = new Movie(data);
       if(req.file){
         movie.Image = req.file.filename;
       }
       const result = await movie.save();
       if(result){
       res.status(200).json({status:true,message:'success'});
       }else{
        res.status(400).json({status:false,message:'failed'});
       }
    }catch(err){
        res.status(400).json({message:err.message});
        console.log(err);
    }
});

router.get('/getAllMovies',async(req,res)=>{
    try{
        const result = await Movie.find().exec();
        if(result){
            res.status(200).json({message:'success',result:result});
        }else{
            res.status(400).json({message:'failed'});
        }

    }catch(err){
         console.log(err);
         res.status(400).json({Error:err.message});
    }
})

router.get('/getMovieById',async(req,res)=>{
    try{
        let id=req.query._id
        const result = await Movie.findOne({_id:req.query.id}).exec();
        if(result){
            res.status(200).json({message:'success',result:result});
        }else{
            res.status(400).json({message:'failed'});
        }

    }catch(err){
        console.log(err);
         res.status(400).json({Error:err.message});
   
    }
})


module.exports = router;