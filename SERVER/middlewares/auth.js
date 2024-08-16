const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{

    try {
        
    const token=req.headers.authorization.split(' ')[1]
    const decodedToken=jwt.verify(token,process.env.JWT_KEY)
    req.userData={
        userId:decodedToken.userId,
        mobile:decodedToken.mobile,
        role:decodedToken.role,
    }
    console.log(req.userData);
    next()
} catch (error) {
        return res.status(401).json({
            message:'auth failed'
        })
}
}