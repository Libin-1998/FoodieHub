var express=require('express')
var mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const regSchema = require('../models/regSchema')
const logRoutes = require('./logRoutes')
const logSchema = require('../models/logSchema')

var regRoutes=express.Router()

regRoutes.post('/register',async(req,res)=>{
    const hashed=await bcrypt.hash(req.body.password,12)
    const reg={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        mobile:req.body.mobile,
        emailaddress:req.body.emailaddress,
        password:hashed,
        confirmpassword:req.body.confirmpassword,
    }
    const log ={
        mobile:req.body.mobile,
        password:hashed,
    }
    const save=await regSchema(reg).save()
    const savelog=await logSchema(log).save()

    if(save&&savelog){
        res.status(201).json({
            success:true,
            error:false,
            message:'save successfully'
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'not saved'
        })
    }
})

regRoutes.get('/views',async(req,res)=>{
    const view=await regSchema.find()
    if(view){
        res.status(200).json({
            success:true,
            error:false,
            message:'view successfully',
            data:view,
        })
    }
    else{
        res.status(400).json({
            success:false,
            error:true,
            message:'error to view'
        })
    }
})
module.exports=regRoutes