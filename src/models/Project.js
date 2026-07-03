const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    workspace:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Workspace',
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
    },
    description:{
        type:String,
        default:'',
        trim:true,
    },
    status:{
        type:String,
        enum:['ACTIVE','ARCHIVED'],
        default:'ACTIVE'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('Project',projectSchema);