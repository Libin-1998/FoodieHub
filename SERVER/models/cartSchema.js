var mongoose=require('mongoose')
var cartSchema=new mongoose.Schema({
    loginId:{type:mongoose.Types.ObjectId,ref:'userlog'},
    productId:{type:mongoose.Types.ObjectId,ref:'fastfood'},
    quantity:{type:Number,default:1},
    status:{type:String,default:'pending'},

})

module.exports=mongoose.model('carts',cartSchema)