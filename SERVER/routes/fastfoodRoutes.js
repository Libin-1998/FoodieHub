var express=require('express')
var mongoose=require('mongoose')
const fastfoodSchema = require('../models/fastfoodSchema')
const auth = require('../middlewares/auth')

const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../client/second/public/images/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    },
})
const upload=multer({storage})



var fastfoodRoutes=express.Router()

fastfoodRoutes.post('/add',upload.single('image'),auth,async(req,res)=>{
    try {
        
  
    const adding={
        name:req.body.name,
        price:req.body.price,
        details:req.body.details,
        image:req.file.filename,
    }
    const save=await fastfoodSchema(adding).save()
    if(save){
        res.status(201).json({
            success:true,
            error:false,
            message:'saved successfully'
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'not saved'
        })
    }
} catch (error) {
        return res.status(500).json({
            success:false,
            error:true,
            message:'something went wrong'
        })
}
})

fastfoodRoutes.get('/foodview',auth,async(req,res)=>{
    const views=await fastfoodSchema.find()
    if(views){
        res.status(200).json({
            success:true,
            error:false,
            message:'view successfully',
            data:views
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

fastfoodRoutes.get('/foodview/:id',async(req,res)=>{
    const views=await fastfoodSchema.findOne({_id:req.params.id})
    if(views){
        res.status(200).json({
            success:true,
            error:false,
            message:'view successfully',
            data:views
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

fastfoodRoutes.delete('/delete/:id',async(req,res)=>{
    const deletedata=await fastfoodSchema.deleteOne({_id:req.params.id})
    if(deletedata){
        res.status(200).json({
        success:true,
            error:false,
            message:'deleted successfully'
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:false,
            message:'not deleted'
        })
    }
})

fastfoodRoutes.put('/update/:id',upload.single('image'),async(req,res)=>{
    const olddata=await fastfoodSchema.findOne({_id:req.params.id})
    const edit={
        name:req.body.name?req.body.name:olddata.name,
        price:req.body.price?req.body.price:olddata.price,
        details:req.body.details?req.body.details:olddata.details,
        image:req.file?req.file.filename:olddata.image,
    }
    const updates=await fastfoodSchema.updateOne({_id:req.params.id},{$set:edit})
    if(updates){
        res.status(200).json({
            success:true,
            error:false,
            message:'update successfully',
            updatestatus:updates,
            data:edit,
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'not updated'
        })
    }
})

module.exports=fastfoodRoutes
