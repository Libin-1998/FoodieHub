var mongoose=require('mongoose')
var fastfoodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    quality:{type:String,required:true},
    image:{type:String,required:true},
})

module.exports=mongoose.model('fastfood',fastfoodSchema)