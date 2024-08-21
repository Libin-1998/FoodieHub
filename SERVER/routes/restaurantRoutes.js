var express=require('express')
var mongoose=require('mongoose')
const multer=require('multer')
const restaurantSchema = require('../models/restaurantSchema')
const auth = require('../middlewares/auth')

const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'../CLIENT/second/public/images/')
    },
        filename:function(req,file,cb){
            cb(null,file.originalname)
        },
})
const upload=multer({storage})

var restaurantRoutes=express.Router()

restaurantRoutes.post('/add_res', upload.single('image'), auth, async (req, res) => {
    try {
      console.log(req.body);
  
      const rest = {
        name: req.body.name,
        state: req.body.state,
        city: req.body.city,
        time: req.body.time,
        image:req.file.filename,
      };
  
      const save = await restaurantSchema(rest).save();
      if(save){
        res.status(201).json({
            success: true,
            error: false,
            message: 'Saved successfully',
            data: save,
          });
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
  });
  
  

restaurantRoutes.get('/view',auth,async(req,res)=>{
    const views=await restaurantSchema.find()
    if(views){
       return res.status(200).json({
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
       return res.status(200).json({
            success:true,
            error:false,
            message:'view successfully',
            data:views,
        })
    }
    else{
        return res.status(400).json({
            success:false,
            error:true,
            message:'not viewed'
        })
    }
})


restaurantRoutes.get('/viewdata/:name',auth,async(req,res)=>{
    const viewed= await restaurantSchema.findOne({name:req.params.name})
    if(viewed){
       return res.status(200).json({
            success:true,
            error:false,
            message:'single view success',
            data:viewed,
        })
    }
    else{
       return res.status(400).json({
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