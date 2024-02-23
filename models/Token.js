const mongoose = require('mongoose');

//refreshToken,ip,userAgent
const tokenSchema = mongoose.Schema({
    refreshToken:{type:String,required:true},
    ip:{type:String,required:true},
    userAgent:{type:String},
    isValid:{type:Boolean,default:true},
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    }
},{ timestamps : true});

module.exports=mongoose.model('Token',tokenSchema);