var express=require('express')
var mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const regSchema = require('../models/regSchema')
var jwt=require('jsonwebtoken')
const logSchema = require('../models/logSchema')

var logRoutes=express.Router()

logRoutes.post('/login',async(req,res)=>{

    try {
        const mobile = req.body.mobile;
        const password = req.body.password;
        
        if (!mobile || !password) {
            return res.status(400).json({
              success: false,
              error: true,
              message: "All fields are required",
            });
          }

    const checknumber=await regSchema.findOne({mobile:req.body.mobile})
    const logdata=await logSchema.findOne({mobile:req.body.mobile})

if(!checknumber){
    return res.status(400).json({
        success: false,
        error: true,
        message: "mobile doesn't exist, register first",
      });
}
    const isPasswordCorrect=await bcrypt.compare(req.body.password,checknumber.password)
    if (isPasswordCorrect) {

      const token=jwt.sign({
        userId:checknumber._id,
        mobile:checknumber.mobile,
        role:logdata.role,

      },
      'secret_key',
      {
        expiresIn:'1h'
      }
    )

        return res.status(200).json({
          success: true,
          error: false,
          message: "login success",
          data: checknumber,
          logintoken:token,
          loginrole:logdata.role,
          userId:checknumber._id,

        });
      }
       else {
        return res.status(400).json({
          success: false,
          error: true,
          message: "incorrect password",
        });
      }


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Something went wrong",
            errorMessage: error.message,
          });
    }

})


logRoutes.get('/profile/:id',async(req,res)=>{
  const profileData=await regSchema.find({_id:req.params.id})
  if(profileData){
   return res.status(200).json({
      success:true,
      error:false,
      message:'profile view success',
      data:profileData,
    })
  }
  else{
    return res.status(400).json({
      success:false,
      error:true,
      message:'profile view error'
    })
  }
})


logRoutes.post('/update',async(req,res)=>{
  console.log(req.body._id);
  const edit=await regSchema.findOne({_id:req.body._id})
  const updation={
    firstname:req.body.firstname?req.body.firstname:edit.firstname,
    mobile:req.body.mobile?req.body.mobile:edit.mobile,
    emailaddress:req.body.emailaddress?req.body.emailaddress:edit.emailaddress,

  }
  if(req.body.mobile!=undefined){
    const dataUpdate=await logSchema.updateOne({_id:req.body._id},{$set:updation})
  }
  const dataUpdate=await regSchema.updateOne({_id:req.body._id},{$set:updation})
  console.log('dataUpdate',dataUpdate);
  if(dataUpdate){
    res.status(200).json({
      success:true,
      error:false,
      message:'updated succesfully',
      data:updation,
      updatestatus:dataUpdate,
      
    })
  }

    else{
      res.status(400).json({
        success:false,
        error:true,
        message:'not updated',

      })
    }
})



module.exports=logRoutes