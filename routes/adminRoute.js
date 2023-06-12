const Admin = require('../models/adminModel');
const Movie = require('../models/movieModel')
const route = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {adminValidateSchema } = require('../validatator/validateSchema');



route.post('/adminRegister',async(req,res)=>{
    try{
        let Password = req.body.Password;
        const data = await adminValidateSchema.validateAsync(req.body)
        console.log(data);
        const admin = new Admin(data);
        const salt = await bcrypt.genSalt(4);
        admin.Password = bcrypt.hashSync(Password,salt);
    
        const result = await admin.save();
        if(result){
            res.status(200).json({status:true,message:'success',result:result});

        }else{
            res.json({status:false,message:'failed'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
        console.log(err);
    }
});

route.post('/adminLogin',async(req,res)=>{
    let email = req.body.Email;
    let password = req.body.Password;
    let userdetails;
    const user = await Admin.findOne({Email:email}).select("-Email-_id").exec();
    if(email){
         userdetails = await Admin.findOne({Email:email}).exec();

      if(userdetails){
            let match = await bcrypt.compare(password,userdetails.Password);
            let payload = { uuid:userdetails.uuid,role:userdetails.role};
            if(match){
                let userdetails = user.toObject();
                let jwttoken = jwt.sign(payload,process.env.secretkey);
                userdetails.jwttoken = jwttoken;
                res.status(200).json({result:userdetails.jwttoken})
            }
            else{
                res.send({Error:'Enter correct Password'});
            }
      }
        else{
              res.send({Error:'Enter valid Email'})
    }
    }
    else{
        res.send({Error:'Enter Email'});
    }
});


 

module.exports = route;