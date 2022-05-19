const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
   
            file_url: String,
            width: Number,
            height: Number,
            date_captured: Date,
            gps_location:{	
                  latitude: Number,
                  longitude: Number
            },
            objects: [
                  {
                        class: String,	
                        polygon: [	
                              {	
                                    x: Number, 
                                    y: Number } 
                        ],
                        bbox: [Number, Number, Number, Number],
                  }
            ]
      
    
});

module.exports = mongoose.model('files',FileSchema);