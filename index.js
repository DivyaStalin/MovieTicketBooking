const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const path = require('path');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static('./img'));


app.set('views',path.join(__dirname,('./views')));
app.set('view engine','ejs');

const env = require("dotenv").config();
app.use(express.json());

app.get('/index',(req,res)=>{
    res.render('index.ejs')
})

app.get('/login',(req,res)=>{
    res.render('addMovie.ejs')
})


const port = 3000;
const uri = process.env.dburl;
mongoose.connect(
    uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Now Database is ready  ....");
})
.catch((err)=>{
    console.log("DB error",err);
});

const adminRoute = require('./routes/adminRoute');

app.use('/user',adminRoute);


app.listen(port,() => {
    console.log("App is listening port-",port);
});
