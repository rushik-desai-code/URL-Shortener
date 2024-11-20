const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortnedUrl:{
        type:String,
        unique:true,
        required:true    
    },
    actualUrl:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},
{timestamps:true}
)
const Url= new mongoose.model('UrlMap',urlSchema)

module.exports=Url