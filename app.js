const express = require('express');
const app = express();
const fileRoute = require('./routes/file');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


//MiddleWares
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
//app.use(bodyParser.json({limit: '50mb', parameterLimit: 5000000, extended: true}));
app.use('/files',fileRoute);
 


//Connect to DB

mongoose.connect("mongodb+srv://simo:sa9HnWtAvym6wZes@cluster0.j0sak.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("connected to db");
});


//How to we start listening to the server
app.listen(3000, () => {
    console.log("Serveur à l'écoute'")
  });