var mongoose=require('mongoose')
var restaurantSchema=new mongoose.Schema({
    name:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    time:{type:String,required:true},
    image:{type:String,required:true},
})
module.exports=mongoose.model('restaurants',restaurantSchema)