const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    avatar:{
        type:String,
        default:''
    },
    isVerified:{
        type:Boolean,
        default:false
    },
},
{
    timestamps:true
});


userSchema.pre('save', async function() {
    if(!this.isModified('password')){
        return ; 
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
};


module.exports = mongoose.model('User',userSchema);