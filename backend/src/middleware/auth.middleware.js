const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async(req,res,next)=>{
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token= req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({
                success:true,
                message:'Not Authorized. No Token Provided',
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({
                success:false,
                message:'User no Longer Exist'
            });
        }

        req.user = user;
        next();
    }catch(error){
        return res.status(500).json({
            sucess:false,
            message:'Invalid or Expiry Token',
        });
    }
};

module.exports= protect;