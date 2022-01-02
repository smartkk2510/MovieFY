const express = require('express');
const router = express.Router();
const Directors = require('../model/director');

//all directors route
router.get("/",async (req,res)=>{
    const searchOption = {};
    //req.query in get method is just lke req.body in post method
    if(req.query.name != null && req.query.name !== '' ){
        searchOption.name = new RegExp(req.query.name,'i');
    }
    console.log(searchOption)
 console.log(req.query)
    try{
             const directors = await Directors.find(searchOption);
             res.render("directors/index",{director:directors,searchOption:req.query});
    }catch{
           res.redirect('/');
    }
  
})

//new directors route
router.get("/new",(req,res)=>{
    res.render("directors/new",{ director : new Directors() });//Director() i created his in model
})

//create new director
router.post("/",async (req,res)=>{
    const newDirector = new Directors({
        name : req.body.name
    })
    //console.log(newDirector)
    try{
          
          let Director = await newDirector.save(); //newDiretor is the obj of model "director" that i created.
          // res.redirect(`directors/${newDirector.id}`);
        //  console.log(Director)
          res.redirect('/directors');
    }
    catch
    {  
        let locals = {errorMessage: "Error Creating Director"}
        res.render("directors/new",{director:newDirector,  locals: locals})//newDirector is an obj
    }
   
})

module.exports = router;