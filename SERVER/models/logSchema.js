var mongoose=require('mongoose')
var logSchema=new mongoose.Schema({
    mobile:{type:String,required:true},
    password:{type:String,required:true},
})

module.exports=mongoose.model('userlog',logSchema)