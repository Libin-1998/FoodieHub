var express=require('express')
var mongoose=require('mongoose')
const cartSchema = require('../models/cartSchema')

var cartRoutes=express.Router()

cartRoutes.post('/addcart/:loginId/:productId',async(req,res)=>{
    const add={
        loginId:req.params.loginId,
        productId:req.params.productId,
        quantity: req.body.quantity,

    }
    const saved=await cartSchema(add).save()
    if(saved){
        res.status(201).json({
            success: true,
            error: false,
            message: "successfully added",
            data: saved,
          });
    }
    else{
        res.status(400).json({
            success: false,
            error: true,
            message: "failed to add",
          });
    }
})


cartRoutes.get('/viewcart/:loginId',async(req,res)=>{
    const views=await cartSchema.find({loginId:req.params.loginId}).populate('productId').populate('loginId')
    if(views){
        res.status(200).json({
            success:true,
            error:false,
            message:'cart view success',
            data:views,
        })
    }
    else{
        res.status(400).json({
            success: false,
            error: true,
            message: "error to view",
          });
    }

})

cartRoutes.get('/increment/:id',async(req,res)=>{
    try {
        const plus= await cartSchema.findOne({_id:req.params.id})
        const oldvalues=plus.quantity

       const update=await cartSchema.updateOne({_id:req.params.id},{$set:{quantity:oldvalues +1}})
       console.log(update);

if(update.modifiedCount==1){
    return res.status(200).json({
        success:true,
        error:false,
        message:'cart quantity is incremented'
    })
}
else{
    return res.status(400).json({
        success:false,
        error:error,
        message:'cart quantity is not incremented'
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




cartRoutes.get('/decrement/:id',async(req,res)=>{
    try {
        const minus=await cartSchema.findOne({_id:req.params.id})
        const oldvalue=minus.quantity

       

        if(oldvalue !==1){
            const update=await cartSchema.updateOne({_id:req.params.id},{$set:{quantity:oldvalue - 1}})
            console.log(update);

        if(update.modifiedCount==1){
            return res.status(200).json({
                success:true,
                error:false,
                message:'cart quantity decrement'
            })
        }
        else{
            res.status(200).json({
                success:false,
                error:true,
                message:'cart quantity cannot be decremented below one'
            })
        }
    }
    else{
        const deleted = await cartSchema.deleteOne({ _id: req.params.id });
        console.log(deleted);

    }

    } catch (error) {
        res.status(500).json({
            success:false,
            error:true,
            message:'errorMessage'
        })
    }
})

cartRoutes.delete('/delete/:id',async(req,res)=>{
    const deleted=await cartSchema.deleteOne({_id:req.params.id})
    if(deleted){
        return res.status(200).json({
            success:true,
            error:false,
            message:'deleted successfully'
        })
    }
    else{
        return res.status(400).json({
            succees:false,
            error:true,
            message:'error to delete'
        })
    }
})


module.exports=cartRoutes