const mongoose = require('mongoose');
const path = require('path');

const posterImageBasePath = 'uploads/moviePosters'
//instead of hard coding the path we send it from here coz it may change in server
const movieSchema = mongoose.Schema(
    {
        name:{
            type : String,
          //  required: true,
            minlength: 2
        },
        description:{
            type:String
        },
        releaseDate:{
            type:Date,
           // required:true
        },
        duration:{
            type:Number,
         //  required:true
        },
        uploadedAt:{
            type:Date,
          // required:true,
            default:Date.now
            //above object automatically take current date it get uploaded
        },
        posterImageName:{
            type:String,
           // required:true
            //we actually stores the img in the file system => "public"
        },
        director:{
            type:mongoose.Schema.Types.ObjectId,
          //  required:true,
            ref:"Director"
            //this type refer's to the object id from the Director collection
        }
    }
)

//name of virtual property is posterImagePath
movieSchema.virtual('posterImagePath').get(function(){
     if(this.posterImageName != null){
         return path.join('/',posterImageBasePath,this.posterImageName)
         //'/' <= gives path of public folder 
     }
}) 
//virtual() is just like the other properties of movie model.you can call that like
//movie.posterImagePath <= when you call that get() will get executed 

module.exports = mongoose.model("Movie",movieSchema)
module.exports.posterImageBasePath = posterImageBasePath