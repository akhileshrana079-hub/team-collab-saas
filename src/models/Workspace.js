const mongoose = require('mongoose');

const workspaceSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:100,
    },
    description:{
        type:String,
        default:'',
        trim:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('Workspace',workspaceSchema);