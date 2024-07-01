var express=require('express')
var mongoose=require('mongoose')
const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../client/second/public/images/')},
        filename:function(req,file,cb){
            cb(null,file.originalname)}
})
const upload=multer({storage})


const restaurantSchema = require('../models/restaurantSchema')
const auth = require('../middlewares/auth')

var restaurantRoutes=express.Router()

restaurantRoutes.post('/add_res',upload.single('image'),  async(req,res)=>{
    const rest={
        name:req.body.name,
        state:req.body.state,
        city:req.body.city,
        time:req.body.time,
        image:req.file.filename,
    }
    const save=await restaurantSchema(rest).save()
    console.log(save);
    if(save){
        res.status(201).json({
            success:true,
            error:false,
            message:'save successfully',
            data:save,
        })
    }
    else{
        res.status(400).json({
            success:true,
            error:false,
            message:'not saved'
        })
    }
})

restaurantRoutes.get('/view',auth,async(req,res)=>{
    const views=await restaurantSchema.find()
    if(views){
        res.status(200).json({
            success:true,
            error:false,
            message:'view successfully',
            data:views,
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'not viewed'
        })
    }
})

restaurantRoutes.get('/view/:id',async(req,res)=>{
    const views=await restaurantSchema.findOne({_id:req.params.id})
    if(views){
        res.status(200).json({
            success:true,
            error:false,
            message:'view successfully',
            data:views,
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'not viewed'
        })
    }
})

restaurantRoutes.delete('/delete/:id',async(req,res)=>{
    const deleted=await restaurantSchema.deleteOne({_id:req.params.id})
    if(deleted){
        res.status(200).json({
            success:true,
            error:false,
            message:'successfully deleted'
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'not deleted'
        })
    }
})

restaurantRoutes.put('/update/:id',upload.single('image'),async(req,res)=>{
    const data=await restaurantSchema.findOne({_id:req.params.id})
    const edits={
        name:req.body.name?req.body.name:data.name,
        state:req.body.state?req.body.state:data.state,
        city:req.body.city?req.body.city:data.city,
        time:req.body.time?req.body.time:data.time,
        image:req.file?req.file.filename:data.image,
    }
    const updation=await restaurantSchema.updateOne({_id:req.params.id},{$set:edits})
    if(updation){
        res.status(200).json({
            success:true,
            error:false,
            message:'update successfully',
            updatestatus:updation,
            data:edits,
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'error to update'
        })
    }
})


module.exports=restaurantRoutes;