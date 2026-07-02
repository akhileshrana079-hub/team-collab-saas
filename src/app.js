const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const workspaceRoutes = require('./routes/workspace.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.json({
        sucess:true,
        message:'Team Collaboration SaaS API Running'
    });
});

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/workspaces',workspaceRoutes);


module.exports= app;