const express = require('express');
const router = express.Router();
const File = require('../models/File');
const fileUpload=require("express-fileupload");
router.use(fileUpload());
const path= require('path');
const util=require("util");
const Jimp = require("jimp");
var fs = require("fs");
var bmp = require("bmp-js");


router.post('/upload', async (req,res)=>{
    try{
        const fichier=req.files.image;
        const fileName=fichier.name;
        const size=fichier.data.length;
        const extension=path.extname(fileName);
        const allowdExtension= /png|jpeg|jpg|gif/;
        if(!allowdExtension.test(extension)) throw 'Unsupported extension!';
        if(size>5000000) throw 'Unsupported size!';
        const md5=fichier.md5;
        const url='/uploads/'+fileName+extension;
        res.json("weeeeeeeeeeee");
        await util.promisify(fichier.mv)("./public/"+url);
           } catch(err){
                res.status(500).json({message:err});
       }
     
    });
    
    router.post('/webupload', async (req,res)=>{
      const code=req.body.image;
      const base64Image = code.split(';base64,').pop();
        fs.writeFile('./public/uploads/image.png', base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
        })
    });
    

    //fs.writeFileSync("./public/uploads/images.jpg", bitmap);
     /*  try{
         const fichier=req.files.file;
         const fileName=fichier.name;
         const size=fichier.data.length;
         const extension=path.extname(fileName);
         const allowdExtension= /png|jpeg|jpg|gif/;
         if(!allowdExtension.test(extension)) throw 'Unsupported extension!';
         if(size>5000000) throw 'Unsupported size!';
         const md5=fichier.md5;
         const url='/uploads/'+md5+extension;
         res.json("weeeeeeeeeeee");
         await util.promisify(fichier.mv)("./public/"+url);
            } catch(err){
                 res.status(500).json({message:err});
        }*/
        // fs.writeFileSync("./public/uploads/images.jpg", bitmap);
        /*
      const code=req.body.code;
      const width=req.body.width;
      const height=req.body.height;
      const name=req.body.name;
     const bitmap = Buffer.from(code, 'base64');
     Jimp.read(bitmap, function (err, test) {
         if (err) throw err;
         test.resize(width,height)
              .quality(100)                 
              .write("./public/uploads/ "+name+ ".jpg"); 
     });
    
     const multer = require('multer');
    var fs = require("fs");
    const Jimp = require("jimp");
    */


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

module.exports = router;
