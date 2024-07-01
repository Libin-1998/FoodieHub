var mongoose=require('mongoose')
var regSchema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    mobile:{type:String,required:true},
    emailaddress:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true},
})
module.exports=mongoose.model('userReg',regSchema)