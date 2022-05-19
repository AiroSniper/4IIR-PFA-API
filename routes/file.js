const express = require('express');
const router = express.Router();
const File = require('../models/File');
const fileUpload=require("express-fileupload");
router.use(fileUpload());


var fs = require("fs");

router.post('/', async (req,res)=>{
    const file = new File({
        file_url: req.body.file_url,
        width: req.body.width,
        height: req.body.height,
        date_captured: req.body.date_captured,
        gps_location:req.body.gps_location,
        objects:req.body.objects 
       });
       try{
        const savedFile = await file.save();
        res.json(savedFile);
       }
       catch(err){
        res.json({message:err});
       }
    
});

router.get('/',async (req,res)=>{
    try{
        const files =  await File.find();
        res.json(files);
       }
       catch(err){
        res.json({message:err});
       }
    
});
