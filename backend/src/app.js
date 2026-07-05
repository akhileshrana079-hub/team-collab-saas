const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const dashboardRoutes = require("./routes/dashboard.routes");

const authRoutes = require('./routes/auth.routes');
const workspaceRoutes = require('./routes/workspace.routes');
const memberRoutes = require("./routes/member.routes");
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

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
app.use('/api/v1',memberRoutes);
app.use('/api/v1',projectRoutes);
app.use('/api/v1', taskRoutes);
app.use("/api/v1", dashboardRoutes);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));


module.exports= app;