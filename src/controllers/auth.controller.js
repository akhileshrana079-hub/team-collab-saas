const User = require('../models/User');
const generateToken = require('../utils/generateToken');


exports.register = async (req, res) => {
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:'All Fields are Required'
            });
        }
        const existingUser = await User.findOne({
            email:email.toLowerCase(),
        });

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:'User Already Exist',
            });
        }

        const user = await User.create({
            name,
            email:email.toLowerCase(),
            password
        });

        const token = generateToken(user._id);
        
        return res.status(201).json({
            success:true,
            message:'User Registered Successfully',
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                avatar:user.avatar
            },
        });
    }catch(error){
        console.error(error);

        res.status(500).json({
            success:false,
            message:'Internal Server Error',
        });
    }
};


exports.login = async (req, res) => {
    try{
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Email and Password is Required',
            });
        }

        const user = await User.findOne({
            email:email.toLowerCase(),
        }).select('+password');

        if(!user){
            return res.status(401).json({
                success:false,
                message:'Invalid Email or Password',
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
        return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
        const token = generateToken(user._id);

        return res.status(200).json({
            success:true,
            message:'Login Successful',
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                avatar:user.avatar,
            }
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            sucess:false,
            message:'Internal Server Error',
        })
    }
};


exports.me = async (req, res) => {
    return res.status(200).json({
        sucess:true,
        user:{
            id:req.user._id,
            name:req.user.name,
            email:req.user.email,
            avatar:req.user.avatar,
            isVerified:req.user.isVerified,
        },
    });
};

exports.logout = async (req, res) => {
    return res.status(200).json({
        success:true,
        message:'Logged out successfully. Please remove the token from the client'
    });
};
