var express=require('express')
var mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const regSchema = require('../models/regSchema')
var jwt=require('jsonwebtoken')

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
          token:token,
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

module.exports=logRoutes