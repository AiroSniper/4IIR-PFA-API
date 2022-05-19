const express = require('express');
const router = express.Router();
const File = require('../models/File');
const fileUpload=require("express-fileupload");
router.use(fileUpload());



router.get('/',async (req,res)=>{
    try{
        const files =  await File.find();
        res.json(files);
       }
       catch(err){
        res.json({message:err});
       }
    
});
